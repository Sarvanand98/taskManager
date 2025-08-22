const express = require('express');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const router = express.Router();

// Register
router.post('/register', async (req, res) => {
  try {
  const { email, password } = req.body;
  const user = new User({ email, password });
    await user.save();
    const token = jwt.sign({ id: user._id }, 'SECRET_KEY');
  res.json({ token, email: user.email });
  } catch (err) {
    res.status(400).json({ message: 'Registration failed' });
  }
});

// Login
router.post('/login', async (req, res) => {
  try {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
    if (!user || !(await user.comparePassword(password)))
      return res.status(400).json({ message: 'Invalid credentials' });
    const token = jwt.sign({ id: user._id }, 'SECRET_KEY');
  res.json({ token, email: user.email });
  } catch (err) {
    res.status(400).json({ message: 'Login failed' });
  }
});

module.exports = router;