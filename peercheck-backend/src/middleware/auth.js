const jwt = require('jsonwebtoken');
const knex = require('../db/knex');

module.exports = async (req,res,next)=>{
  const header = req.headers.authorization;
  if (!header) return res.status(401).json({error:'Missing token'});
  const token = header.split(' ')[1];
  try {
    const payload = jwt.verify(token, process.env.JWT_SECRET);
    const user = await knex('users').where('id', payload.sub).first();
    if (!user) return res.status(401).json({error:'Invalid token'});
    req.user = user;
    next();
  } catch(e){
    res.status(401).json({error:'Invalid token'});
  }
};
