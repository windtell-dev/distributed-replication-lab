const express = require("express");

// Temporary in-memory storage for notes.
// Later, we'll replace this with SQLite.
const notes = [];

const app = express();

// This tells Express how to read JSON sent in HTTP requests.
app.use(express.json());

// =========================
// Home Route
// =========================
app.get("/", (req, res) => {
  res.send("Hello from Express running in Docker!");
});

// =========================
// Health Check Route
// =========================
// This is how other servers (or we) can check if this node is alive.
// Notice that the node name comes from an environment variable.
app.get("/health", (req, res) => {
  res.json({
    status: "healthy",
    node: process.env.NODE_NAME || "unknown-node"
  });
});

// =========================
// Create Note
// =========================
// POST /notes
//
// Creates a new note and stores it in memory.
//
app.post("/notes", (req, res) => {
  const note = {
    id: Date.now(),
    text: req.body.text
  };

  notes.push(note);

  res.status(201).json({
    message: "Note created",
    note: note
  });
});

// =========================
// Get All Notes
// =========================
// GET /notes
//
// Returns every note currently stored.
//
app.get("/notes", (req, res) => {
  res.json(notes);
});

// =========================
// Start Server
// =========================
app.listen(3000, () => {
  console.log("Express server running on port 3000");
});