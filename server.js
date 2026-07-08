const cors = require("cors");
const express = require("express");
const axios = require("axios");
const Database = require("better-sqlite3");

// Database storage for notes - using SQLite
// Each node owns its own SQLite database, database filename matches the node name
let db;

const app = express();


// Configuration
// NODE_NAME:
//     The identity of this node
// PEERS:
//     A comma-separated list of other nodes this node can communicate with
const NODE_NAME = process.env.NODE_NAME || "unknown-node";
const PEERS = process.env.PEERS
  ? process.env.PEERS.split(",")
  : [];



// Database
// Creates the notes table if it does not already exist
function setupDatabase() {
  db = new Database(`${NODE_NAME}.db`);

  db.prepare(`
    CREATE TABLE IF NOT EXISTS notes (
      id INTEGER PRIMARY KEY,
      text TEXT NOT NULL,
      sourceNode TEXT NOT NULL,
      replicated INTEGER NOT NULL
    )
  `).run();

  console.log(`${NODE_NAME} database ready`);
}

app.use(express.json());
app.use(cors());
app.use(express.static("public"));


// Home Route
app.get("/", (req, res) => {
  res.send(`Hello from ${NODE_NAME}!`);
});



// Health Check Route
// Other nodes (or we) can call this endpoint to verify this node is alive
app.get("/health", (req, res) => {
  res.json({
    status: "healthy",
    node: NODE_NAME,
    peers: PEERS
  });
});



// POST /notes
// Creates a new note and stores it in SQLite
// Replicates the note to peers only if it was not already replicated
app.post("/notes", async (req, res) => {
  const note = {
    id: req.body.id || Date.now(),
    text: req.body.text,
    sourceNode: req.body.sourceNode || NODE_NAME,
    replicated: req.body.replicated || false
  };

  db.prepare(`
    INSERT OR IGNORE INTO notes (id, text, sourceNode, replicated)
    VALUES (?, ?, ?, ?)
  `).run(
    note.id,
    note.text,
    note.sourceNode,
    note.replicated ? 1 : 0
  );

  let replicationStatus = [];

  // Only replicates if incoming note was not already replicated
  if (PEERS.length > 0 && !note.replicated) {
    for (const peer of PEERS) {
      try {
        await axios.post(`${peer}/notes`, {
          ...note,
          replicated: true,
          sourceNode: NODE_NAME
        });

        replicationStatus.push(`replicated to ${peer}`);
      } catch (error) {
        replicationStatus.push(`failed to replicate to ${peer}`);
      }
    }
  } else if (note.replicated) {
    replicationStatus.push("received replicated note; not forwarding");
  } else {
    replicationStatus.push("no peers configured");
  }

  res.status(201).json({
    message: "Note created",
    node: NODE_NAME,
    note: note,
    replication: replicationStatus
  });
});



// POST /sync
// Pulls notes from a peer and stores any notes this node does not already have
app.post("/sync", async (req, res) => {
  const peer = req.body.peer;

  if (!peer) {
    return res.status(400).json({
      message: "Missing peer URL"
    });
  }

  try {
    const response = await axios.get(`${peer}/notes`);
    const peerNotes = response.data;

    let added = 0;

    for (const peerNote of peerNotes) {
      const alreadyExists = db.prepare(
        "SELECT id FROM notes WHERE id = ?"
      ).get(peerNote.id);

      if (!alreadyExists) {
        db.prepare(`
          INSERT INTO notes (id, text, sourceNode, replicated)
          VALUES (?, ?, ?, ?)
        `).run(
          peerNote.id,
          peerNote.text,
          peerNote.sourceNode,
          1
        );

        added++;
      }
    }

    const allNotes = db.prepare("SELECT * FROM notes ORDER BY id ASC").all();

    res.json({
      message: "Sync complete",
      node: NODE_NAME,
      peer: peer,
      added: added,
      totalNotes: allNotes.length
    });
  } catch (error) {
    res.status(500).json({
      message: "Sync failed",
      node: NODE_NAME,
      peer: peer
    });
  }
});



// Syncs this node from one peer
async function syncFromPeer(peer) {
  try {
    const response = await axios.get(`${peer}/notes`);
    const peerNotes = response.data;

    let added = 0;

    for (const peerNote of peerNotes) {
      const alreadyExists = db.prepare(
        "SELECT id FROM notes WHERE id = ?"
      ).get(peerNote.id);

      if (!alreadyExists) {
        db.prepare(`
          INSERT INTO notes (id, text, sourceNode, replicated)
          VALUES (?, ?, ?, ?)
        `).run(
          peerNote.id,
          peerNote.text,
          peerNote.sourceNode,
          1
        );

        added++;
      }
    }

    console.log(`${NODE_NAME} synced ${added} note(s) from ${peer}`);
  } catch (error) {
    console.log(`${NODE_NAME} failed to sync from ${peer}`);
  }
}



// Get All Notes
// Returns every note currently stored on THIS node
// Notes are now loaded from this node's SQLite database
app.get("/notes", (req, res) => {
  const notes = db.prepare("SELECT * FROM notes ORDER BY id ASC").all();

  res.json(notes.map(note => ({
    ...note,
    replicated: Boolean(note.replicated)
  })));
});



// Start Server
app.listen(3000, async () => {
  console.log(`${NODE_NAME} running on port 3000`);

  setupDatabase();

  if (PEERS.length > 0) {
    console.log(`Peers configured at ${PEERS.join(", ")}`);

    for (const peer of PEERS) {
      await syncFromPeer(peer);
    }
  }
});