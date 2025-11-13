const express = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const knex = require('../db/knex');
const { v4: uuidv4 } = require('uuid');
const router = express.Router();

router.post('/register', async (req,res)=>{
  const { name, email, password } = req.body;
  if (!name || !email || !password) return res.status(400).json({error:'Missing fields'});
  const existing = await knex('users').where({email}).first();
  if (existing) return res.status(400).json({error:'Email already used'});
  const hash = await bcrypt.hash(password,10);
  const id = uuidv4();
  await knex('users').insert({id, name, email, password_hash:hash});
  const token = jwt.sign({sub:id,email}, process.env.JWT_SECRET);
  res.json({token});
});

router.post('/login', async (req,res)=>{
  const { email, password } = req.body;
  const user = await knex('users').where({email}).first();
  if (!user) return res.status(400).json({error:'Invalid credentials'});
  const valid = await bcrypt.compare(password, user.password_hash);
  if (!valid) return res.status(400).json({error:'Invalid credentials'});
  const token = jwt.sign({sub:user.id,email}, process.env.JWT_SECRET);
  res.json({token});
});

module.exports = router;
