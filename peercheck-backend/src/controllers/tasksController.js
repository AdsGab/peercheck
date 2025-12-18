console.log("✅ tasksController.js is loaded!");
const { v4: uuidv4 } = require('uuid');

const knex = require('../db/knex');
// Add to src/controllers/tasksController.js

exports.getMyAnswer = async (req, res) => {
  try {
    const { id } = req.params; // Task ID
    const user_id = req.user.id; // My User ID

    const answer = await knex('answers')
      .where({ task_id: id, user_id: user_id })
      .first();

    res.json(answer || null); // Return the answer object or null
  } catch (err) {
    console.error("Get Answer Error:", err);
    res.status(500).json({ error: "Server Error" });
  }
};
exports.createTask = async (req, res) => {
  try {
    const { description, jurusan, mataKuliah, tingkat, deadline } = req.body;

    if (!description || !jurusan || !mataKuliah || !tingkat || !deadline) {
      return res.status(400).json({ error: 'Missing fields' });
    }

    if (!req.user || !req.user.id) {
      return res.status(401).json({ error: 'Unauthorized' });
    }

    // ✅ GENERATE UUID FOR TASK
    const taskId = uuidv4();

    // ✅ INSERT WITH ID
    await knex('tasks').insert({
      id: taskId,                 // 🔥 THIS WAS MISSING
      uploader_id: req.user.id,
      description,
      jurusan,
      mata_kuliah: mataKuliah,
      tingkat,
      deadline
    });

    // Insert attached files
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

    res.json({
      success: true,
      taskId,
      files: fileRecords
    });

  } catch (err) {
    console.error('Task creation error:', err);
    res.status(500).json({ error: 'Server Error' });
  }
};

exports.getTaskById = async (req, res) => {
  try {
    const { id } = req.params;
    console.log("➡️ Fetching Task ID:", id); // LOG 1

    const task = await knex('tasks')
      .join('users', 'tasks.uploader_id', '=', 'users.id')
      .where('tasks.id', id)
      .select(
        'tasks.*', 
        'users.name as uploader_name', 
        'users.email as uploader_email'
      )
      .first();

    console.log("⬅️ Database Result:", task); // LOG 2: Check this output!

    if (!task) {
      console.log("❌ Task not found in DB");
      return res.status(404).json({ error: 'Task not found' });
    }

    const files = await knex('task_files')
      .where('task_id', id)
      .select('*');

    task.files = files; 

    res.json(task);
  } catch (err) {
    console.error("Get Task Error:", err);
    res.status(500).json({ error: 'Server Error' });
  }
};
exports.createAnswer = async (req, res) => {
  try {
    const { id } = req.params; // The Task ID from URL
    const { content } = req.body; // The text answer
    const user_id = req.user.id; // The User ID from Auth middleware

    if (!content) {
      return res.status(400).json({ error: "Answer content cannot be empty" });
    }

    // Insert into 'answers' table
    await knex('answers').insert({
      task_id: id,
      user_id: user_id,
      content: content
    });

    res.json({ success: true, message: "Answer submitted successfully" });

  } catch (err) {
    console.error("Submit Answer Error:", err);
    res.status(500).json({ error: "Server Error" });
  }
};
exports.updateAnswer = async (req, res) => {
  try {
    const { id } = req.params; // Task ID
    const { content } = req.body;
    const user_id = req.user.id;

    if (!content) return res.status(400).json({ error: "Content cannot be empty" });

    // Update the existing answer
    const count = await knex('answers')
      .where({ task_id: id, user_id: user_id })
      .update({ content: content, updated_at: knex.fn.now() });

    if (count === 0) {
      return res.status(404).json({ error: "Answer not found to update" });
    }

    res.json({ success: true, message: "Answer updated successfully" });
  } catch (err) {
    console.error("Update Answer Error:", err);
    res.status(500).json({ error: "Server Error" });
  }
};

exports.deleteAnswer = async (req, res) => {
  try {
    const { id } = req.params; // Task ID
    const user_id = req.user.id;

    const count = await knex('answers')
      .where({ task_id: id, user_id: user_id })
      .del(); // Delete query

    if (count === 0) {
      return res.status(404).json({ error: "Answer not found to delete" });
    }

    res.json({ success: true, message: "Answer deleted" });
  } catch (err) {
    console.error("Delete Answer Error:", err);
    res.status(500).json({ error: "Server Error" });
  }
};