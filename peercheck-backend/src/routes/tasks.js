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

const upload = multer({
  storage,
  limits: { fileSize: 10 * 1024 * 1024 },
  fileFilter: (req, file, cb) => {
    cb(null, true);
  }
});

// --- ROUTES ---

// 1. Create Task (Upload)
router.post('/', auth, upload.array("files"), taskController.createTask);

// 2. Get All Tasks (Feed) - ⭐ UPDATED to use Controller
router.get('/', auth, taskController.getAllTasks);

// 3. Download File - ⭐ UPDATED to use Controller
router.get('/file/:filename', auth, taskController.downloadFile);

// 4. Get MY Tasks (Profile) - ⭐ UPDATED (Crucial for Review Counts)
router.get('/my', auth, taskController.getMyTasks);

// 5. Get Single Task Details
router.get('/:id', auth, taskController.getTaskById);

// 6. Answers (Reviews)
router.post('/:id/answer', auth, taskController.createAnswer);
router.get('/:id/answer', auth, taskController.getMyAnswer);
router.put('/:id/answer', auth, taskController.updateAnswer);
router.delete('/:id/answer', auth, taskController.deleteAnswer);

// 7. Comments & Ratings
router.post('/answers/:answerId/comments', auth, taskController.createComment);
router.post('/answers/:answerId/rate', auth, taskController.submitRating);

module.exports = router;