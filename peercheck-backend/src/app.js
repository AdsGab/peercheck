// app.js (FINAL DIAGNOSTIC CODE)

const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const path = require('path'); // Add path module for robust path resolution

// ⭐ Aggressively define the path to knex.js using path.join()
const KNEX_PATH = path.join(__dirname, 'db', 'knex'); 
const db = require(KNEX_PATH); 

console.log('--- DB Initialization Check ---');
if (db && db.promise) {
    console.log('SUCCESS: DB object appears initialized and ready for use.');
} else {
    // This will now print if the DB import failed.
    console.log('FAILURE: DB object is NOT correctly initialized on import.');
    console.log('DB object received:', db);
}
console.log('-----------------------------');


const app = express();

// Middleware
app.use(helmet());
app.use(express.json());
app.use(
  cors({
    origin: 'http://localhost:5173',
    credentials: true,
  })
);

// Middleware to attach the database connection object
app.use((req, res, next) => {
    if (db) {
        req.db = db;
    } else {
        // If the import failed, this path is hit.
        console.error("CRITICAL ERROR: DB object is null/undefined when middleware runs.");
    }
    next();
});

// Health check
app.get('/', (req, res) => res.json({ ok: true, name: 'PeerCheck API' }));

// Routes
const authRoutes = require('./routes/auth');
const taskRoutes = require('./routes/tasks');

app.use('/api/auth', authRoutes);
app.use('/api/tasks', taskRoutes);

module.exports = app;