const Database = require("better-sqlite3");
const path = require("path");

const db = new Database(
  path.join(__dirname, "habit_tracker.db")
);

// Table for days
db.prepare(`
  CREATE TABLE IF NOT EXISTS daily_logs (
    date TEXT PRIMARY KEY
  )
`).run();

// Table for habits
db.prepare(`
  CREATE TABLE IF NOT EXISTS habits (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    date TEXT,
    name TEXT,
    completed INTEGER
  )
`).run();

module.exports = db;
