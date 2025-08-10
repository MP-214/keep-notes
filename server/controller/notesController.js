const Note = require("../models/notes");
const getAllNotes = async (req, res) => {
  const userId = req.user.userId;
  const notes = await Note.find({ user: userId }).sort({ createdAt: -1 });
  res.json(notes);
};

const createNotes = async (req, res) => {
  const { title, content } = req.body;
  const userId = req.user?.userId;
  if (!title || !content) {
    return res.status(400).json({ msg: "Title and content are required" });
  }
  if (!userId) {
    return res.status(401).json({ msg: "Unauthorized: No user ID" });
  }

  const newNote = new Note({ title, content, user: userId });
  await newNote.save();
  res.status(201).json(newNote);
};

const deleteNotes = async (req, res) => {
  await Note.findByIdAndDelete(req.params.id);
  res.json({ msg: "Note deleted" });
};

const updateNotes = async (req, res) => {
  const { id } = req.params;
  const { title, content } = req.body;
  const userId = req.user.userId;
  try {
    const note = await Note.findOne({ _id: id, user: userId });
    if (!note) {
      return res.status(404).json({ msg: "Note not found or unauthorized" });
    }

    note.title = title || note.title;
    note.content = content || note.content;

    await note.save();
    res.json(note);
  } catch (err) {
    res.status(400).json({ msg: "Failed to update note", error: err });
  }
};
module.exports = {
  getAllNotes,
  createNotes,
  deleteNotes,
  updateNotes,
};
