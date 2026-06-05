const { Database } = require('node-sqlite3-wasm');
const fs = require('fs');
const path = require('path');

const DB_PATH = process.env.DB_PATH || './database/worldcup.db';
const SCHEMA_PATH = path.join(__dirname, 'schema.sql');

// Shared JOIN fragment — imported by every route that returns match rows with team names
const MATCH_WITH_TEAMS = `
  SELECT m.*,
    ht.name AS home_name, ht.code AS home_code, ht.flag AS home_flag,
    at.name AS away_name, at.code AS away_code, at.flag AS away_flag
  FROM matches m
  LEFT JOIN teams ht ON ht.id = m.home_team_id
  LEFT JOIN teams at ON at.id = m.away_team_id
`;

let db;

function getDb() {
  if (!db) {
    db = new Database(DB_PATH);
    db.exec('PRAGMA foreign_keys = ON');
    db.exec('PRAGMA journal_mode = WAL');
    const schema = fs.readFileSync(SCHEMA_PATH, 'utf8');
    db.exec(schema);
  }
  return db;
}

module.exports = { getDb, MATCH_WITH_TEAMS };
