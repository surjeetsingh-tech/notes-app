const express = require("express");
const router = express.Router();

const Note = require("../models/Note");
const authMiddleware = require("../middleware/authmiddleware");


// CREATE NOTE
router.post("/", authMiddleware, async (req, res) => {
  try {

    const note = await Note.create({
      title: req.body.title,
      content: req.body.content,
      user: req.user,
    });

    res.status(201).json(note);

  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
});


// GET NOTES
router.get("/", authMiddleware, async (req, res) => {
  try {

    const notes = await Note.find({
      user: req.user,
    });

    res.json(notes);

  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
});


// DELETE NOTE
router.delete("/:id", authMiddleware, async (req, res) => {
  try {

    await Note.findByIdAndDelete(req.params.id);

    res.json({
      message: "Note deleted",
    });

  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
});

module.exports = router;
