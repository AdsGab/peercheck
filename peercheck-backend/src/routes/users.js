const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const knex = require('../db/knex');

/**
 * Get top users for leaderboard
 */
router.get('/leaderboard', auth, async (req, res) => {
  try {
    const users = await knex('users')
      .select('id', 'name', 'contribution_points')
      .orderBy('contribution_points', 'desc')
      .limit(10);

    res.json(users);
  } catch (err) {
    console.error('Get leaderboard error:', err);
    res.status(500).json({ error: 'Server error' });
  }
});

/**
 * Get user profile with contribution points
 */
router.get('/:userId', auth, async (req, res) => {
  try {
    const { userId } = req.params;

    const user = await knex('users')
      .where({ id: userId })
      .select('id', 'name', 'email', 'contribution_points', 'created_at')
      .first();

    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    res.json(user);
  } catch (err) {
    console.error('Get user error:', err);
    res.status(500).json({ error: 'Server error' });
  }
});

/**
 * Get user's answers (reviews submitted by this user)
 * Filters: user_id from answers table matches the userId from users table
 */
router.get('/:userId/answers', auth, async (req, res) => {
  try {
    const { userId } = req.params;

    // Verify the user exists
    const user = await knex('users')
      .where({ id: userId })
      .first();

    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    // Get all answers where user_id matches the userId parameter
    const answers = await knex('answers')
      .where({ user_id: userId })
      .orderBy('created_at', 'desc')
      .select('*');

    res.json(answers);
  } catch (err) {
    console.error('Get user answers error:', err);
    res.status(500).json({ error: 'Server error' });
  }
});

module.exports = router;
