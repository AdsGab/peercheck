const knex = require('../db/knex');

exports.createTask = async (req, res) => {
  try {
    const { description, jurusan, mataKuliah, tingkat, deadline } = req.body;

    // Validate required fields
    if (!description || !jurusan || !mataKuliah || !tingkat || !deadline) {
      return res.status(400).json({ error: 'Missing fields' });
    }

    if (!req.user || !req.user.id) {
      return res.status(401).json({ error: 'Unauthorized' });
    }

    // Insert task (MySQL fix: use returning fallback)
    const inserted = await knex('tasks').insert({
      uploader_id: req.user.id,
      description,
      jurusan,
      mata_kuliah: mataKuliah,
      tingkat,
      deadline
    });

    // MySQL returns [insertId], PostgreSQL returns [{ id }]
    const taskId = inserted[0]?.id ?? inserted[0];

    // Insert attached files if any
    let fileRecords = [];

    if (req.files && req.files.length > 0) {
      fileRecords = req.files.map(f => ({
        task_id: taskId,
        filename: f.filename,
        original_name: f.originalname,
        path: f.path
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
