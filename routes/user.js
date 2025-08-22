const express = require('express');
const auth = require('../middleware/auth');
const router = express.Router();

// Get user profile
router.get('/profile', auth, async (req, res) => {
  res.json({ username: req.user.username });
});

// Change password
router.post('/change-password', auth, async (req, res) => {
  const { password } = req.body;
  req.user.password = password;
  await req.user.save();
  res.json({ message: 'Password updated' });
});

module.exports = router;