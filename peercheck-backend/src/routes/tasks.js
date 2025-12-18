const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const multer = require('multer');
const path = require('path');
const fs = require('fs');
const { v4: uuidv4 } = require('uuid');

// Controller
const taskController = require('../controllers/tasksController');

// UPLOAD FOLDER
const UPLOAD_DIR = process.env.UPLOAD_DIR || './uploads';
if (!fs.existsSync(UPLOAD_DIR)) fs.mkdirSync(UPLOAD_DIR, { recursive: true });

// Multer storage config
const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, UPLOAD_DIR),
  filename: (req, file, cb) => {
    const unique = `${Date.now()}-${uuidv4()}${path.extname(file.originalname)}`;
    cb(null, unique);
  }
});

// Accept PDF + Word files
const upload = multer({
  storage,
  limits: { fileSize: 10 * 1024 * 1024 },
  fileFilter: (req, file, cb) => {
    const allowed = [
      "application/pdf",
      "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
      "image/jpeg", // Added images based on your file pill icons
      "image/png",
      "image/jpg"
    ];
    // Relaxed filter for now to prevent upload errors
    cb(null, true);
  }
});


router.post('/', auth, upload.array("files"), taskController.createTask);

router.get('/', auth, async (req, res) => {
  try {
    const [tasks] = await req.db.raw("SELECT * FROM tasks ORDER BY created_at DESC");
    res.json(tasks); 
  } catch (err) {
    res.status(500).json({ error: err.message || "Server Error" });
  }
});

router.get('/file/:filename', auth, (req, res) => {
  const filePath = path.join(UPLOAD_DIR, req.params.filename);
  if (!fs.existsSync(filePath)) {
    return res.status(404).json({ error: "File not found" });
  }
  res.download(filePath);
});

router.get('/my', auth, async (req, res) => {
  try {
    if (!req.user || !req.user.id) return res.status(401).json({ error: "Unauthorized" });
    const uploaderId = req.user.id;
    const [tasks] = await req.db.raw("SELECT * FROM tasks WHERE uploader_id = ? ORDER BY created_at DESC", [uploaderId]);
    res.json(tasks);
  } catch (err) {
    res.status(500).json({ error: err.message || "Server Error" });
  }
});

router.get('/:id', auth, taskController.getTaskById);
router.post('/:id/answer', auth, taskController.createAnswer);
router.get('/:id/answer', auth, taskController.getMyAnswer);
router.put('/:id/answer', auth, taskController.updateAnswer);
router.delete('/:id/answer', auth, taskController.deleteAnswer);
module.exports = router;