import { DatabaseSync } from 'node:sqlite';
import fs from 'node:fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const dbFolder = process.env.DB_DIR || __dirname;
const dbPath = path.join(dbFolder, 'csp_portal.sqlite');
const sourceDbPath = path.join(__dirname, 'csp_portal.sqlite');
const schemaPath = path.join(__dirname, 'schema.sql');

// Auto-seed persistent disk if it's empty
if (process.env.DB_DIR && !fs.existsSync(dbPath)) {
  try {
    console.log(`[Database] Creating persistent directory at: ${dbFolder}`);
    fs.mkdirSync(dbFolder, { recursive: true });
    if (fs.existsSync(sourceDbPath)) {
      console.log(`[Database] Copying pre-seeded database to: ${dbPath}`);
      fs.copyFileSync(sourceDbPath, dbPath);
    }
  } catch (err) {
    console.error('[Database] Failed to copy pre-seeded database:', err);
  }
}

console.log(`[Database] Connecting to database at: ${dbPath}`);
const db = new DatabaseSync(dbPath);

// Enable foreign keys
db.exec('PRAGMA foreign_keys = ON;');

export function initDatabase() {
  try {
    const schemaSql = fs.readFileSync(schemaPath, 'utf8');
    db.exec(schemaSql);
    console.log('[Database] Schema initialized successfully.');
  } catch (error) {
    console.error('[Database] Failed to initialize schema:', error);
    throw error;
  }
}

/**
 * Executes a SELECT query that returns multiple rows.
 */
export function query(sql, params = []) {
  try {
    const stmt = db.prepare(sql);
    return stmt.all(...params);
  } catch (error) {
    console.error(`[Database] Query error for SQL: ${sql}`, error);
    throw error;
  }
}

/**
 * Executes a SELECT query that returns a single row.
 */
export function queryOne(sql, params = []) {
  try {
    const stmt = db.prepare(sql);
    return stmt.get(...params);
  } catch (error) {
    console.error(`[Database] QueryOne error for SQL: ${sql}`, error);
    throw error;
  }
}

/**
 * Executes a modifying query (INSERT, UPDATE, DELETE).
 * Returns { changes: number, lastInsertRowid: number | bigint }
 */
export function run(sql, params = []) {
  try {
    const stmt = db.prepare(sql);
    return stmt.run(...params);
  } catch (error) {
    console.error(`[Database] Run error for SQL: ${sql}`, error);
    throw error;
  }
}

// Automatically initialize database tables on import
initDatabase();

export default {
  query,
  queryOne,
  run,
  db
};
