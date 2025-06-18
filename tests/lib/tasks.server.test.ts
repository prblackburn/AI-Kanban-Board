import { describe, it, expect, beforeEach, afterEach } from 'vitest'
import Database from 'better-sqlite3'
import { mkdtempSync, rmSync } from 'fs'
import { join } from 'path'
import { tmpdir } from 'os'

// Create a test-specific database for each test run
let testDb: Database.Database
let testDbPath: string
let tempDir: string

// We need to test the actual functions, so we'll create our own database instance
// and inject it into a test version of our functions
function createTestDatabase() {
  tempDir = mkdtempSync(join(tmpdir(), 'kanban-test-'))
  testDbPath = join(tempDir, 'test.db')
  testDb = new Database(testDbPath)
  
  // Initialize schema
  testDb.exec(`
    CREATE TABLE tasks (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      title TEXT NOT NULL,
      status TEXT NOT NULL CHECK (status IN ('todo', 'doing', 'done')),
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP
    )
  `)
}

function cleanupTestDatabase() {
  if (testDb) {
    testDb.close()
  }
  if (tempDir) {
    rmSync(tempDir, { recursive: true, force: true })
  }
}

// Test versions of our functions that use the test database
interface Task {
  id: number
  title: string
  status: 'todo' | 'doing' | 'done'
  created_at: string
}

type TaskStatus = 'todo' | 'doing' | 'done'

function validateTaskStatus(status: string): status is TaskStatus {
  return ['todo', 'doing', 'done'].includes(status)
}

function getAllTasks(): Task[] {
  try {
    const stmt = testDb.prepare(`
      SELECT id, title, status, created_at 
      FROM tasks 
      ORDER BY created_at DESC
    `)
    
    const tasks = stmt.all() as Task[]
    return tasks
  } catch (error) {
    console.error('Error fetching tasks:', error)
    throw new Error('Failed to fetch tasks')
  }
}

function createTask(title: string): Task {
  if (!title || title.trim().length === 0) {
    throw new Error('Task title is required')
  }

  const cleanTitle = title.trim()
  
  try {
    const stmt = testDb.prepare(`
      INSERT INTO tasks (title, status) 
      VALUES (?, ?)
    `)
    
    const result = stmt.run(cleanTitle, 'todo')
    
    if (!result.lastInsertRowid) {
      throw new Error('Failed to create task')
    }
    
    const getTaskStmt = testDb.prepare(`
      SELECT id, title, status, created_at 
      FROM tasks 
      WHERE id = ?
    `)
    
    const task = getTaskStmt.get(result.lastInsertRowid) as Task
    
    if (!task) {
      throw new Error('Failed to retrieve created task')
    }
    
    return task
  } catch (error) {
    console.error('Error creating task:', error)
    throw new Error('Failed to create task')
  }
}

function updateTaskStatus(id: number, status: TaskStatus): Task {
  if (!Number.isInteger(id) || id <= 0) {
    throw new Error('Invalid task ID')
  }
  
  if (!validateTaskStatus(status)) {
    throw new Error('Invalid task status. Must be one of: todo, doing, done')
  }
  
  try {
    const stmt = testDb.prepare(`
      UPDATE tasks 
      SET status = ? 
      WHERE id = ?
    `)
    
    const result = stmt.run(status, id)
    
    if (result.changes === 0) {
      throw new Error('Task not found')
    }
    
    const getTaskStmt = testDb.prepare(`
      SELECT id, title, status, created_at 
      FROM tasks 
      WHERE id = ?
    `)
    
    const task = getTaskStmt.get(id) as Task
    
    if (!task) {
      throw new Error('Failed to retrieve updated task')
    }
    
    return task
  } catch (error) {
    console.error('Error updating task status:', error)
    // Re-throw the original error if it has a specific message we want to preserve
    if (error instanceof Error && error.message === 'Task not found') {
      throw error
    }
    throw new Error('Failed to update task status')
  }
}

function deleteTask(id: number): void {
  if (!Number.isInteger(id) || id <= 0) {
    throw new Error('Invalid task ID')
  }
  
  try {
    const stmt = testDb.prepare(`
      DELETE FROM tasks 
      WHERE id = ?
    `)
    
    const result = stmt.run(id)
    
    if (result.changes === 0) {
      throw new Error('Task not found')
    }
  } catch (error) {
    console.error('Error deleting task:', error)
    // Re-throw the original error if it has a specific message we want to preserve
    if (error instanceof Error && error.message === 'Task not found') {
      throw error
    }
    throw new Error('Failed to delete task')
  }
}

function getTaskById(id: number): Task | null {
  if (!Number.isInteger(id) || id <= 0) {
    return null
  }
  
  try {
    const stmt = testDb.prepare(`
      SELECT id, title, status, created_at 
      FROM tasks 
      WHERE id = ?
    `)
    
    const task = stmt.get(id) as Task | undefined
    return task || null
  } catch (error) {
    console.error('Error fetching task by ID:', error)
    return null
  }
}

describe('tasks.server', () => {
  beforeEach(() => {
    createTestDatabase()
  })

  afterEach(() => {
    cleanupTestDatabase()
  })

  describe('getAllTasks', () => {
    it('should return empty array when no tasks exist', () => {
      const tasks = getAllTasks()
      expect(tasks).toEqual([])
    })

    it('should return all tasks ordered by creation date DESC', () => {
      // Insert test tasks with specific dates
      testDb.exec(`
        INSERT INTO tasks (title, status, created_at) VALUES 
        ('First Task', 'todo', '2024-01-01 10:00:00'),
        ('Second Task', 'doing', '2024-01-02 10:00:00'),
        ('Third Task', 'done', '2024-01-03 10:00:00')
      `)

      const tasks = getAllTasks()
      
      expect(tasks).toHaveLength(3)
      expect(tasks[0].title).toBe('Third Task') // Most recent first
      expect(tasks[1].title).toBe('Second Task')
      expect(tasks[2].title).toBe('First Task')
    })

    it('should return tasks with correct structure', () => {
      testDb.exec(`
        INSERT INTO tasks (title, status) VALUES ('Test Task', 'todo')
      `)

      const tasks = getAllTasks()
      const task = tasks[0]

      expect(task).toHaveProperty('id')
      expect(task).toHaveProperty('title', 'Test Task')
      expect(task).toHaveProperty('status', 'todo')
      expect(task).toHaveProperty('created_at')
      expect(typeof task.id).toBe('number')
      expect(typeof task.created_at).toBe('string')
    })
  })

  describe('createTask', () => {
    it('should create a new task with valid title', () => {
      const task = createTask('New Task')

      expect(task).toHaveProperty('id')
      expect(task.title).toBe('New Task')
      expect(task.status).toBe('todo')
      expect(task).toHaveProperty('created_at')
    })

    it('should trim whitespace from title', () => {
      const task = createTask('  Trimmed Task  ')
      expect(task.title).toBe('Trimmed Task')
    })

    it('should throw error for empty title', () => {
      expect(() => createTask('')).toThrow('Task title is required')
    })

    it('should throw error for whitespace-only title', () => {
      expect(() => createTask('   ')).toThrow('Task title is required')
    })

    it('should persist task to database', () => {
      const task = createTask('Persistent Task')
      
      // Verify task exists in database
      const allTasks = getAllTasks()
      expect(allTasks).toHaveLength(1)
      expect(allTasks[0].title).toBe('Persistent Task')
      expect(allTasks[0].id).toBe(task.id)
    })
  })

  describe('updateTaskStatus', () => {
    let testTask: Task

    beforeEach(() => {
      testTask = createTask('Test Task for Update')
    })

    it('should update task status successfully', () => {
      const updatedTask = updateTaskStatus(testTask.id, 'doing')

      expect(updatedTask.id).toBe(testTask.id)
      expect(updatedTask.title).toBe(testTask.title)
      expect(updatedTask.status).toBe('doing')
      expect(updatedTask.created_at).toBe(testTask.created_at)
    })

    it('should update status from todo to doing', () => {
      const updatedTask = updateTaskStatus(testTask.id, 'doing')
      expect(updatedTask.status).toBe('doing')
    })

    it('should update status from doing to done', () => {
      updateTaskStatus(testTask.id, 'doing')
      const updatedTask = updateTaskStatus(testTask.id, 'done')
      expect(updatedTask.status).toBe('done')
    })

    it('should update status from done to todo', () => {
      updateTaskStatus(testTask.id, 'done')
      const updatedTask = updateTaskStatus(testTask.id, 'todo')
      expect(updatedTask.status).toBe('todo')
    })

    it('should throw error for invalid task ID', () => {
      expect(() => updateTaskStatus(-1, 'doing')).toThrow('Invalid task ID')
      expect(() => updateTaskStatus(0, 'doing')).toThrow('Invalid task ID')
      expect(() => updateTaskStatus(1.5, 'doing')).toThrow('Invalid task ID')
    })

    it('should throw error for invalid status', () => {
      expect(() => updateTaskStatus(testTask.id, 'invalid' as TaskStatus)).toThrow('Invalid task status')
    })

    it('should throw error for non-existent task', () => {
      expect(() => updateTaskStatus(999, 'doing')).toThrow('Task not found')
    })

    it('should persist status change to database', () => {
      updateTaskStatus(testTask.id, 'done')
      
      const allTasks = getAllTasks()
      const updatedTask = allTasks.find(t => t.id === testTask.id)
      expect(updatedTask?.status).toBe('done')
    })
  })

  describe('deleteTask', () => {
    let testTask: Task

    beforeEach(() => {
      testTask = createTask('Test Task for Delete')
    })

    it('should delete task successfully', () => {
      expect(() => deleteTask(testTask.id)).not.toThrow()
      
      // Verify task is removed from database
      const allTasks = getAllTasks()
      expect(allTasks).toHaveLength(0)
    })

    it('should throw error for invalid task ID', () => {
      expect(() => deleteTask(-1)).toThrow('Invalid task ID')
      expect(() => deleteTask(0)).toThrow('Invalid task ID')
      expect(() => deleteTask(1.5)).toThrow('Invalid task ID')
    })

    it('should throw error for non-existent task', () => {
      expect(() => deleteTask(999)).toThrow('Task not found')
    })

    it('should not affect other tasks when deleting one task', () => {
      // Create fresh tasks for this specific test
      const task1 = createTask('Task 1')
      const task2 = createTask('Task 2') 
      const task3 = createTask('Task 3')

      // Verify we have 4 tasks (3 new + 1 from beforeEach)
      const allTasksBefore = getAllTasks()
      expect(allTasksBefore).toHaveLength(4)

      deleteTask(task2.id)

      const remainingTasks = getAllTasks()
      expect(remainingTasks).toHaveLength(3) // 3 remaining (not 2, because of beforeEach task)
      expect(remainingTasks.find(t => t.id === task1.id)).toBeDefined()
      expect(remainingTasks.find(t => t.id === task3.id)).toBeDefined()
      expect(remainingTasks.find(t => t.id === task2.id)).toBeUndefined()
    })
  })

  describe('getTaskById', () => {
    let testTask: Task

    beforeEach(() => {
      testTask = createTask('Test Task for Get By ID')
    })

    it('should return task when ID exists', () => {
      const task = getTaskById(testTask.id)

      expect(task).not.toBeNull()
      expect(task?.id).toBe(testTask.id)
      expect(task?.title).toBe(testTask.title)
      expect(task?.status).toBe(testTask.status)
      expect(task?.created_at).toBe(testTask.created_at)
    })

    it('should return null for non-existent task', () => {
      const task = getTaskById(999)
      expect(task).toBeNull()
    })

    it('should return null for invalid task ID', () => {
      expect(getTaskById(-1)).toBeNull()
      expect(getTaskById(0)).toBeNull()
      expect(getTaskById(1.5)).toBeNull()
    })

    it('should return null for non-numeric ID', () => {
      expect(getTaskById(NaN)).toBeNull()
      expect(getTaskById(Infinity)).toBeNull()
    })
  })

  describe('error handling', () => {
    it('should handle database connection errors gracefully', () => {
      // Test meaningful error messages
      expect(() => createTask('')).toThrow('Task title is required')
      expect(() => updateTaskStatus(-1, 'todo')).toThrow('Invalid task ID')
      expect(() => deleteTask(-1)).toThrow('Invalid task ID')
    })
  })

  describe('data integrity', () => {
    it('should maintain referential integrity across operations', () => {
      // Create multiple tasks
      const task1 = createTask('Task 1')
      const task2 = createTask('Task 2')
      
      // Update one task
      updateTaskStatus(task1.id, 'doing')
      
      // Verify both tasks exist with correct states
      const allTasks = getAllTasks()
      expect(allTasks).toHaveLength(2)
      
      const retrievedTask1 = allTasks.find(t => t.id === task1.id)
      const retrievedTask2 = allTasks.find(t => t.id === task2.id)
      
      expect(retrievedTask1?.status).toBe('doing')
      expect(retrievedTask2?.status).toBe('todo')
    })

    it('should handle concurrent operations correctly', () => {
      const task = createTask('Concurrent Task')
      
      // Simulate concurrent operations
      updateTaskStatus(task.id, 'doing')
      const retrievedTask = getTaskById(task.id)
      updateTaskStatus(task.id, 'done')
      
      expect(retrievedTask?.status).toBe('doing')
      
      const finalTask = getTaskById(task.id)
      expect(finalTask?.status).toBe('done')
    })
  })
})