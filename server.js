const express = require("express");
const axios = require("axios");

// Temporary in-memory storage for notes
// Later, we'll replace this with SQLite
const notes = [];

const app = express();


// Configuration
// NODE_NAME:
//     The identity of this node
// PEER_URL:
//     The address of another node that this node can communicate with later
const NODE_NAME = process.env.NODE_NAME || "unknown-node";
const PEER_URL = process.env.PEER_URL || null;

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
    peer: PEER_URL
  });
});



// POST /notes
// Creates a new note and stores it in memory
// Right now we ONLY store the note locally
app.post("/notes", async (req, res) => {
  const note = {
    id: Date.now(),
    text: req.body.text
  };
  notes.push(note);
  let replicationStatus = "no peer configured";
if (PEER_URL) {
  try {
    await axios.post(`${PEER_URL}/notes`, note);
    replicationStatus = `replicated to ${PEER_URL}`;
  } catch (error) {
    replicationStatus = `failed to replicate to ${PEER_URL}`;
  }
}
// Returns Node with fields, like a reciept
  res.status(201).json({
    message: "Note created",
    node: NODE_NAME,
    note: note,
    replication: replicationStatus
  });
});



// Get All Notes
// Returns every note currently stored on THIS node
// Right now:
// Node 1 only returns Node 1's notes. Node 2 only returns Node 2's notes
// Later will replicate notes so they'll eventually contain the same data
app.get("/notes", (req, res) => {
  res.json(notes);
});



// Start Server
app.listen(3000, () => {
  console.log(`${NODE_NAME} running on port 3000`);

  if (PEER_URL) {
    console.log(`Peer configured at ${PEER_URL}`);
  }
});