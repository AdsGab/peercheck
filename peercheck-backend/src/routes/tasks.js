// tasks.js

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

// Multer storage config (unchanged)
const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, UPLOAD_DIR),
  filename: (req, file, cb) => {
    const unique = `${Date.now()}-${uuidv4()}${path.extname(file.originalname)}`;
    cb(null, unique);
  }
});

// Accept PDF + Word files (unchanged)
const upload = multer({
  storage,
  limits: { fileSize: 10 * 1024 * 1024 },
  fileFilter: (req, file, cb) => {
    const allowed = [
      "application/pdf",
      "application/vnd.openxmlformats-officedocument.wordprocessingml.document"
    ];
    if (!allowed.includes(file.mimetype)) {
      return cb(new Error("Invalid file type"));
    }
    cb(null, true);
  }
});

// --------------------------- ROUTES ------------------------------

// Create task + upload files
router.post('/', auth, upload.array("files"), taskController.createTask);

// Get all tasks (for peer review)
// NOTE: This endpoint is protected by 'auth' but returns ALL tasks, not just the uploader's.
router.get('/', auth, async (req, res) => {
  try {
    // Check for Knex object existence (for robust debugging)
    if (!req.db || typeof req.db !== 'function') { 
        throw new Error("Database connection object (req.db) is missing or incorrectly configured.");
    }

    // ⭐ FINAL FIX: Use knex.raw() and remove the WHERE clause to fetch all tasks.
    const [tasks] = await req.db.raw(
      "SELECT * FROM tasks ORDER BY created_at DESC"
    );

    // Knex's .raw() often returns [results, fields] for MySQL, so we return the results array.
    res.json(tasks); 
  } catch (err) {
    console.error("Task fetch error:", err);
    res.status(500).json({ error: err.message || "Server Error" });
  }
});

// Download file
router.get('/file/:filename', auth, (req, res) => {
  const filePath = path.join(UPLOAD_DIR, req.params.filename);
  if (!fs.existsSync(filePath)) {
    return res.status(404).json({ error: "File not found" });
  }
  res.download(filePath);
});

router.get('/my', auth, async (req, res) => {
  try {
    if (!req.db || typeof req.db !== 'function') { 
        throw new Error("Database connection object (req.db) is missing or incorrectly configured.");
    }

    // ⭐ FIX 1: Check for the actual database ID property (`id`)
    if (!req.user || !req.user.id) { 
        // We know req.user.sub is undefined because middleware overwrote it
        return res.status(401).json({ error: "Unauthorized: User data not attached to request (Auth middleware failure)." });
    }
    
    // ⭐ FIX 2: Use req.user.id (the database row's ID field) instead of req.user.sub (the JWT claim field)
    const uploaderId = req.user.id;

    const [tasks] = await req.db.raw(
      "SELECT * FROM tasks WHERE uploader_id = ? ORDER BY created_at DESC",
      [uploaderId] 
    );

    res.json(tasks);
  } catch (err) {
    console.error("User Task fetch error:", err);
    res.status(500).json({ error: err.message || "Server Error" });
  }
});

module.exports = router;