import { db } from './db.server';

// TypeScript interfaces
export interface Task {
  id: number;
  title: string;
  status: TaskStatus;
  created_at: string;
}

export type TaskStatus = 'todo' | 'doing' | 'done';

// Validation helper
function validateTaskStatus(status: string): status is TaskStatus {
  return ['todo', 'doing', 'done'].includes(status);
}

// Get all tasks ordered by creation date
export function getAllTasks(): Task[] {
  try {
    const stmt = db.prepare(`
      SELECT id, title, status, created_at 
      FROM tasks 
      ORDER BY created_at DESC
    `);
    
    const tasks = stmt.all() as Task[];
    return tasks;
  } catch (error) {
    console.error('Error fetching tasks:', error);
    throw new Error('Failed to fetch tasks');
  }
}

// Create a new task with default 'todo' status
export function createTask(title: string): Task {
  if (!title || title.trim().length === 0) {
    throw new Error('Task title is required');
  }

  const cleanTitle = title.trim();
  
  try {
    const stmt = db.prepare(`
      INSERT INTO tasks (title, status) 
      VALUES (?, ?)
    `);
    
    const result = stmt.run(cleanTitle, 'todo');
    
    if (!result.lastInsertRowid) {
      throw new Error('Failed to create task');
    }
    
    // Fetch and return the created task
    const getTaskStmt = db.prepare(`
      SELECT id, title, status, created_at 
      FROM tasks 
      WHERE id = ?
    `);
    
    const task = getTaskStmt.get(result.lastInsertRowid) as Task;
    
    if (!task) {
      throw new Error('Failed to retrieve created task');
    }
    
    return task;
  } catch (error) {
    console.error('Error creating task:', error);
    throw new Error('Failed to create task');
  }
}

// Update task status
export function updateTaskStatus(id: number, status: TaskStatus): Task {
  if (!Number.isInteger(id) || id <= 0) {
    throw new Error('Invalid task ID');
  }
  
  if (!validateTaskStatus(status)) {
    throw new Error('Invalid task status. Must be one of: todo, doing, done');
  }
  
  try {
    const stmt = db.prepare(`
      UPDATE tasks 
      SET status = ? 
      WHERE id = ?
    `);
    
    const result = stmt.run(status, id);
    
    if (result.changes === 0) {
      throw new Error('Task not found');
    }
    
    // Fetch and return the updated task
    const getTaskStmt = db.prepare(`
      SELECT id, title, status, created_at 
      FROM tasks 
      WHERE id = ?
    `);
    
    const task = getTaskStmt.get(id) as Task;
    
    if (!task) {
      throw new Error('Failed to retrieve updated task');
    }
    
    return task;
  } catch (error) {
    console.error('Error updating task status:', error);
    throw new Error('Failed to update task status');
  }
}

// Delete a task
export function deleteTask(id: number): void {
  if (!Number.isInteger(id) || id <= 0) {
    throw new Error('Invalid task ID');
  }
  
  try {
    const stmt = db.prepare(`
      DELETE FROM tasks 
      WHERE id = ?
    `);
    
    const result = stmt.run(id);
    
    if (result.changes === 0) {
      throw new Error('Task not found');
    }
  } catch (error) {
    console.error('Error deleting task:', error);
    throw new Error('Failed to delete task');
  }
}

// Get task by ID (utility function)
export function getTaskById(id: number): Task | null {
  if (!Number.isInteger(id) || id <= 0) {
    return null;
  }
  
  try {
    const stmt = db.prepare(`
      SELECT id, title, status, created_at 
      FROM tasks 
      WHERE id = ?
    `);
    
    const task = stmt.get(id) as Task | undefined;
    return task || null;
  } catch (error) {
    console.error('Error fetching task by ID:', error);
    return null;
  }
}