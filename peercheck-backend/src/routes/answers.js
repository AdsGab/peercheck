const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const { v4: uuidv4 } = require('uuid');
const knex = require('../db/knex');

/**
 * Create or update answer
 */
router.post('/:taskId', auth, async (req, res) => {
  try {
    const { taskId } = req.params;
    const { content } = req.body;
    const userId = req.user.id;

    if (!content) {
      return res.status(400).json({ error: 'Content is required' });
    }

    const existing = await knex('answers')
      .where({ task_id: taskId, user_id: userId })
      .first();

    if (existing) {
      // UPDATE
      await knex('answers')
        .where({ id: existing.id })
        .update({ content, updated_at: knex.fn.now() });

      return res.json({ success: true, updated: true });
    }

    // CREATE
    await knex('answers').insert({
      id: uuidv4(),
      task_id: taskId,
      user_id: userId,
      content
    });

    res.json({ success: true, created: true });

  } catch (err) {
    console.error('Answer submit error:', err);
    res.status(500).json({ error: 'Server error' });
  }
});

/**
 * Get my answer for a task
 */
router.get('/:taskId/my', auth, async (req, res) => {
  try {
    const answer = await knex('answers')
      .where({
        task_id: req.params.taskId,
        user_id: req.user.id
      })
      .first();

    res.json(answer || null);
  } catch (err) {
    res.status(500).json({ error: 'Server error' });
  }
});

/**
 * Delete my answer
 */
router.delete('/:taskId', auth, async (req, res) => {
  try {
    await knex('answers')
      .where({
        task_id: req.params.taskId,
        user_id: req.user.id
      })
      .del();

    res.json({ success: true });
  } catch (err) {
    res.status(500).json({ error: 'Server error' });
  }
});

module.exports = router;
