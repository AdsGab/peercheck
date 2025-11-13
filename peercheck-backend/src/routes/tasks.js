const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const multer = require('multer');
const path = require('path');
const fs = require('fs');
const knex = require('../db/knex');
const { v4: uuidv4 } = require('uuid');

const UPLOAD_DIR = process.env.UPLOAD_DIR || './uploads';
if (!fs.existsSync(UPLOAD_DIR)) fs.mkdirSync(UPLOAD_DIR, { recursive: true });

const storage = multer.diskStorage({
  destination: (req,file,cb)=>cb(null,UPLOAD_DIR),
  filename: (req,file,cb)=>cb(null,`${Date.now()}-${file.originalname}`)
});
const upload = multer({
  storage,
  limits:{ fileSize:10*1024*1024 },
  fileFilter:(req,file,cb)=>{
    const allowed = ['application/pdf','application/vnd.openxmlformats-officedocument.wordprocessingml.document'];
    if (!allowed.includes(file.mimetype)) return cb(new Error('Invalid file type'));
    cb(null,true);
  }
});

router.post('/', auth, upload.single('file'), async (req,res)=>{
  const { title, course } = req.body;
  if (!title) return res.status(400).json({error:'Missing title'});
  const file = req.file;
  const id = uuidv4();
  await knex('tasks').insert({
    id,
    uploader_id: req.user.id,
    title,
    course,
    filename: file.originalname,
    file_path: path.join(UPLOAD_DIR, file.filename),
    filesize: file.size
  });
  res.json({ok:true, id});
});

router.get('/', auth, async (req,res)=>{
  const tasks = await knex('tasks').where('uploader_id', req.user.id);
  res.json({tasks});
});

module.exports = router;
