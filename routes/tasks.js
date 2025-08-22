const express = require('express');
const Task = require('../models/Task');
const auth = require('../middleware/auth');
const router = express.Router();

// Get all tasks for user
router.get('/', auth, async (req, res) => {
  const tasks = await Task.find({ user: req.user._id });
  res.json(tasks);
});

// Add task
router.post('/', auth, async (req, res) => {
  const { title, category, dueDate, priority } = req.body;
  const task = new Task({
    user: req.user._id,
    title,
    category,
    dueDate,
    priority,
  });
  await task.save();
  res.json(task);
});

// Edit task
router.put('/:id', auth, async (req, res) => {
  const { title, category, dueDate, priority, status } = req.body;
  const task = await Task.findOneAndUpdate(
    { _id: req.params.id, user: req.user._id },
    { title, category, dueDate, priority, status },
    { new: true }
  );
  res.json(task);
});

// Delete task
router.delete('/:id', auth, async (req, res) => {
  await Task.deleteOne({ _id: req.params.id, user: req.user._id });
  res.json({ success: true });
});

module.exports = router;