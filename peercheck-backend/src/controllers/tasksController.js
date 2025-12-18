const { v4: uuidv4 } = require('uuid');

const knex = require('../db/knex');

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
