// routes/notes.ts
const express = require("express");
const { authenticate } = require("../middleware/index");
const router = express.Router();
const {
  getAllNotes,
  createNotes,
  deleteNotes,
  updateNotes,
} = require("../controller/notesController");
router.use(authenticate); // all /notes routes now require a token

// Get all notes
router.get("/all", getAllNotes);

// Create a note
router.post("/create", createNotes);

// Delete a note
router.delete("/:id", deleteNotes);

//update a note
router.put("/:id", updateNotes);

module.exports = router;
