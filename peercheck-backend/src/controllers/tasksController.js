const { v4: uuidv4 } = require('uuid');
const knex = require('../db/knex');
const path = require('path');
const fs = require('fs');

// Use environment variable or default
const UPLOAD_DIR = process.env.UPLOAD_DIR || './uploads';

// --- TASKS ---

// 1. Create Task (Upload Assignment)
exports.createTask = async (req, res) => {
  try {
    const { description, jurusan, mataKuliah, tingkat, deadline } = req.body;

    if (!description || !jurusan || !mataKuliah || !tingkat || !deadline) {
      return res.status(400).json({ error: 'Missing fields' });
    }

    if (!req.user || !req.user.id) {
      return res.status(401).json({ error: 'Unauthorized' });
    }

    const taskId = uuidv4();

    await knex('tasks').insert({
      id: taskId,
      uploader_id: req.user.id,
      description,
      jurusan,
      mata_kuliah: mataKuliah,
      tingkat,
      deadline
    });

    let fileRecords = [];
    if (req.files && req.files.length > 0) {
      fileRecords = req.files.map(f => ({
        task_id: taskId,
        file_path: f.path,
        original_name: f.originalname,
        mime_type: f.mimetype
      }));
      await knex('task_files').insert(fileRecords);
    }

    await knex('users')
      .where('id', req.user.id)
      .increment('contribution_points', 20);

    res.json({
      success: true,
      taskId,
      files: fileRecords,
      message: "Assignment uploaded! You earned 20 points."
    });

  } catch (err) {
    console.error('Task creation error:', err);
    res.status(500).json({ error: 'Server Error' });
  }
};

// 2. Get All Tasks (Feed)
exports.getAllTasks = async (req, res) => {
  try {
    const tasks = await knex('tasks').select('*').orderBy('created_at', 'desc');
    res.json(tasks); 
  } catch (err) {
    console.error("Get All Tasks Error:", err);
    res.status(500).json({ error: "Server Error" });
  }
};

// 3. Get My Tasks (Profile - with Review Counts)
exports.getMyTasks = async (req, res) => {
  try {
    const user_id = req.user.id;

    const tasks = await knex('tasks')
      .leftJoin('answers', 'tasks.id', 'answers.task_id')
      .select(
        'tasks.*',
        knex.raw('COUNT(answers.id) as review_count')
      )
      .where('tasks.uploader_id', user_id)
      .groupBy('tasks.id')
      .orderBy('tasks.created_at', 'desc');

    res.json(tasks);
  } catch (err) {
    console.error("Get My Tasks Error:", err);
    res.status(500).json({ error: "Server Error" });
  }
};

// 4. Get Task Details (Includes Files, Answers, Comments, Ratings)
exports.getTaskById = async (req, res) => {
  try {
    const { id } = req.params;

    const task = await knex('tasks')
      .join('users', 'tasks.uploader_id', '=', 'users.id')
      .where('tasks.id', id)
      .select('tasks.*', 'users.name as uploader_name', 'users.email as uploader_email')
      .first();

    if (!task) return res.status(404).json({ error: 'Task not found' });

    const files = await knex('task_files').where('task_id', id).select('*');

    const answers = await knex('answers')
      .join('users', 'answers.user_id', '=', 'users.id')
      .where('answers.task_id', id)
      .select(
        'answers.*',
        'users.name as reviewer_name',
        'users.contribution_points as reviewer_points'
      );

    if (answers.length > 0) {
      const answerIds = answers.map(a => a.id);
      
      const comments = await knex('comments')
        .join('users', 'comments.user_id', '=', 'users.id')
        .whereIn('comments.answer_id', answerIds)
        .select('comments.*', 'users.name as commenter_name')
        .orderBy('comments.created_at', 'asc');

      const ratings = await knex('ratings').whereIn('answer_id', answerIds).select('*');

      answers.forEach(answer => {
        answer.comments = comments.filter(c => c.answer_id === answer.id);
        const answerRatings = ratings.filter(r => r.answer_id === answer.id);
        const totalScore = answerRatings.reduce((sum, r) => sum + r.score, 0);
        answer.rating_count = answerRatings.length;
        answer.average_rating = answer.rating_count > 0 
          ? Math.round(totalScore / answer.rating_count) 
          : 0;
      });
    } else {
      answers.forEach(a => { a.comments = []; a.rating_count = 0; a.average_rating = 0; });
    }

    task.files = files;
    task.answers = answers;

    res.json(task);
  } catch (err) {
    console.error("Get Task Error:", err);
    res.status(500).json({ error: 'Server Error' });
  }
};

// 5. Download File
exports.downloadFile = async (req, res) => {
  try {
    const filename = req.params.filename;
    const filePath = path.join(UPLOAD_DIR, filename);
    
    if (!fs.existsSync(filePath)) {
      return res.status(404).json({ error: "File not found" });
    }
    
    res.download(filePath);
  } catch (err) {
    console.error("Download Error:", err);
    res.status(500).json({ error: "Server Error" });
  }
};

// --- ANSWERS ---

exports.createAnswer = async (req, res) => {
  try {
    const { id } = req.params; 
    const { content } = req.body; 
    const user_id = req.user.id; 

    if (!content) return res.status(400).json({ error: "Answer content cannot be empty" });

    await knex('answers').insert({
      task_id: id,
      user_id: user_id,
      content: content
    });
    
    await knex('users').where('id', user_id).increment('contribution_points', 20);

    res.json({ success: true, message: "Answer submitted successfully! You earned 20 points." });
  } catch (err) {
    console.error("Submit Answer Error:", err);
    res.status(500).json({ error: "Server Error" });
  }
};

exports.getMyAnswer = async (req, res) => {
  try {
    const { id } = req.params;
    const user_id = req.user.id;
    const answer = await knex('answers').where({ task_id: id, user_id: user_id }).first();
    res.json(answer || null);
  } catch (err) {
    console.error("Get Answer Error:", err);
    res.status(500).json({ error: "Server Error" });
  }
};

exports.updateAnswer = async (req, res) => {
  try {
    const { id } = req.params;
    const { content } = req.body;
    const user_id = req.user.id;

    if (!content) return res.status(400).json({ error: "Content cannot be empty" });

    const count = await knex('answers')
      .where({ task_id: id, user_id: user_id })
      .update({ content: content, updated_at: knex.fn.now() });

    if (count === 0) return res.status(404).json({ error: "Answer not found to update" });

    res.json({ success: true, message: "Answer updated successfully" });
  } catch (err) {
    console.error("Update Answer Error:", err);
    res.status(500).json({ error: "Server Error" });
  }
};

exports.deleteAnswer = async (req, res) => {
  try {
    const { id } = req.params;
    const user_id = req.user.id;
    const count = await knex('answers').where({ task_id: id, user_id: user_id }).del();
    if (count === 0) return res.status(404).json({ error: "Answer not found to delete" });
    res.json({ success: true, message: "Answer deleted" });
  } catch (err) {
    console.error("Delete Answer Error:", err);
    res.status(500).json({ error: "Server Error" });
  }
};

// --- COMMENTS ---

exports.createComment = async (req, res) => {
  try {
    const { answerId } = req.params;
    const { content } = req.body;
    const user_id = req.user.id;

    if (!content) return res.status(400).json({ error: "Comment cannot be empty" });

    const commentId = uuidv4();
    await knex('comments').insert({ id: commentId, answer_id: answerId, user_id: user_id, content: content });
    await knex('users').where('id', user_id).increment('contribution_points', 5);

    res.json({ success: true, message: "Comment posted! +5 Points" });
  } catch (err) {
    console.error("Create Comment Error:", err);
    res.status(500).json({ error: "Server Error" });
  }
};

// --- RATINGS ---

exports.submitRating = async (req, res) => {
  try {
    const { answerId } = req.params;
    const { score } = req.body;
    const user_id = req.user.id;

    if (!score || score < 1 || score > 5) return res.status(400).json({ error: "Invalid score (1-5)" });

    const existing = await knex('ratings').where({ answer_id: answerId, user_id: user_id }).first();

    if (existing) {
      await knex('ratings').where({ id: existing.id }).update({ score, updated_at: knex.fn.now() });
    } else {
      await knex('ratings').insert({ id: uuidv4(), answer_id: answerId, user_id: user_id, score: score });
      await knex('users').where('id', user_id).increment('contribution_points', 5);
    }

    res.json({ success: true, message: "Rating submitted! +5 Points" });
  } catch (err) {
    console.error("Submit Rating Error:", err);
    res.status(500).json({ error: "Server Error" });
  }
};