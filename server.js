const express = require("express");
const axios = require("axios");

// Temporary in-memory storage for notes
// Later, we'll replace this with SQLite
const notes = [];

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

app.use(express.json());



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
// Creates a new note and stores it in memory
// Replicates the note to peers only if it was not already replicated
app.post("/notes", async (req, res) => {
  const note = {
    id: req.body.id || Date.now(),
    text: req.body.text,
    sourceNode: req.body.sourceNode || NODE_NAME,
    replicated: req.body.replicated || false
  };

  notes.push(note);

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



// Get All Notes
// Returns every note currently stored on THIS node
// Later will replicate notes so they'll eventually contain the same data
app.get("/notes", (req, res) => {
  res.json(notes);
});



// Start Server
app.listen(3000, () => {
  console.log(`${NODE_NAME} running on port 3000`);

  if (PEERS.length > 0) {
    console.log(`Peers configured at ${PEERS.join(", ")}`);
  }
});