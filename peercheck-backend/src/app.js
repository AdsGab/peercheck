const express = require('express');
const helmet = require('helmet');
const app = express();

app.use(helmet());
app.use(express.json());
app.get('/', (req,res) => res.json({ok:true, name:'PeerCheck API'}));

const authRoutes = require('./routes/auth');
app.use('/api/auth', authRoutes);

const taskRoutes = require('./routes/tasks');
app.use('/api/tasks', taskRoutes);

module.exports = app;
