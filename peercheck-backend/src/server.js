require('dotenv').config();
const express = require('express');
const cors = require('cors');
const app = express();

// Middleware
app.use(cors({
  origin: 'http://localhost:5173', // React dev server
  credentials: true
}));
app.use(express.json());

// Import your auth routes
const authRoutes = require('./routes/auth');
app.use('/api', authRoutes);

const port = process.env.PORT || 4000;
app.listen(port, () => console.log(` PeerCheck API running on port ${port}`));
