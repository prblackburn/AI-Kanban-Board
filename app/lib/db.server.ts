import Database from 'better-sqlite3';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Database file path - relative to project root
const dbPath = join(__dirname, '../../database/kanban.db');

// Initialize SQLite database connection with error handling
let db: Database.Database;

try {
  db = new Database(dbPath);
  // Enable foreign key constraints
  db.pragma('foreign_keys = ON');
} catch (error) {
  console.error('Failed to initialize SQLite database:', error);
  console.error('Make sure better-sqlite3 is properly installed with: pnpm rebuild better-sqlite3');
  throw new Error('Database connection failed');
}

// Initialize database schema
export function initializeDatabase() {
  try {
    // Create tasks table if it doesn't exist
    const createTasksTable = db.prepare(`
      CREATE TABLE IF NOT EXISTS tasks (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        title TEXT NOT NULL,
        status TEXT NOT NULL CHECK (status IN ('todo', 'doing', 'done')),
        created_at DATETIME DEFAULT CURRENT_TIMESTAMP
      )
    `);

    createTasksTable.run();

    console.log('Database initialized successfully');
    console.log('Database file:', dbPath);
  } catch (error) {
    console.error('Failed to initialize database schema:', error);
    throw new Error('Database initialization failed');
  }
}

// Export database instance
export { db };

// Initialize database on module load
initializeDatabase();

// Graceful shutdown
process.on('exit', () => {
  try {
    db.close();
  } catch (error) {
    console.error('Error closing database:', error);
  }
});

process.on('SIGHUP', () => process.exit(128 + 1));
process.on('SIGINT', () => process.exit(128 + 2));
process.on('SIGTERM', () => process.exit(128 + 15));