# Architecture Specification: AI Kanban Board

## Technology Stack

### Core Technologies
- **Runtime**: Node.js
- **Language**: TypeScript
- **Frontend Framework**: React
- **Full-Stack Framework**: Remix
- **Package Manager**: pnpm
- **Database**: SQLite with better-sqlite3
- **Styling**: Tailwind CSS

### Development Tools
- **Type Checking**: TypeScript compiler
- **Code Formatting**: Prettier (via Remix defaults)
- **Linting**: ESLint (via Remix defaults)

## Project Structure

```
/app
  /components
    /board
      - KanbanBoard.tsx
      - ColumnHeader.tsx
    /tasks
      - TaskCard.tsx
      - AddTaskForm.tsx
    /ui
      - (shared UI components if needed)
  /lib
    - db.server.ts
    - tasks.server.ts
  /routes
    - _index.tsx (main kanban board page)
  /styles
    - tailwind.css
  - root.tsx
  - entry.client.tsx
  - entry.server.tsx

/docs
  - FUNCTIONAL.md
  - ARCHITECTURE.md
  - CLAUDE.md
  - BRIEF.md

/database
  - kanban.db (SQLite file)

- package.json
- remix.config.js
- tailwind.config.js
- tsconfig.json
```

## System Architecture

### Overall Pattern
- **Remix Full-Stack Application**: Single codebase handling both frontend and backend
- **Server-Side Rendering**: Pages rendered on server with progressive enhancement
- **File-Based Routing**: Remix convention for page organization
- **Simple Data Flow**: Direct loader/action pattern without additional abstraction layers

### Data Flow
1. **Page Load**: Remix loader fetches tasks from SQLite → React components render
2. **User Action**: Form submission → Remix action updates database → redirect with fresh data
3. **Error Handling**: Remix ErrorBoundary catches and displays errors

## Database Design

### Schema
```sql
CREATE TABLE tasks (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  title TEXT NOT NULL,
  status TEXT NOT NULL CHECK (status IN ('todo', 'doing', 'done')),
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP
);
```

### Database Connection
- **File Location**: `/database/kanban.db`
- **Connection**: better-sqlite3 with synchronous operations
- **Initialization**: Database and tables created on first run
- **Transactions**: Simple operations, no complex transaction management needed

## Component Architecture

### Component Hierarchy
```
KanbanBoard
├── ColumnHeader (x3: Todo, Doing, Done)
├── TaskCard (multiple per column)
└── AddTaskForm
```

### Component Responsibilities

**KanbanBoard**
- Main container component
- Receives tasks from Remix loader
- Renders three columns with filtered tasks
- Handles overall layout

**ColumnHeader**
- Displays column title
- Shows task count for column
- Static presentation component

**TaskCard**
- Displays individual task information
- Handles task status updates via form submission
- Handles task deletion
- Contains action buttons/forms

**AddTaskForm**
- Task creation form
- Form validation
- Submits to Remix action

## API Design

### Remix Routes and Actions

**Root Route (`/app/routes/_index.tsx`)**
```typescript
// Loader: Fetch all tasks
export async function loader() {
  const tasks = await getAllTasks();
  return json({ tasks });
}

// Action: Handle form submissions
export async function action({ request }) {
  const formData = await request.formData();
  const intent = formData.get('intent');
  
  switch (intent) {
    case 'create':
      // Create new task
    case 'updateStatus':
      // Update task status
    case 'delete':
      // Delete task
  }
}
```

### Database Functions (`/app/lib/tasks.server.ts`)
- `getAllTasks()`: Fetch all tasks ordered by created_at
- `createTask(title: string)`: Insert new task with 'todo' status
- `updateTaskStatus(id: number, status: TaskStatus)`: Update task status
- `deleteTask(id: number)`: Remove task from database

## Error Handling Strategy

### Remix Built-in Error Handling
- **ErrorBoundary**: Catch component errors and display fallback UI
- **Loader/Action Errors**: Throw Response objects for HTTP errors
- **Form Validation**: Return validation errors from actions
- **Database Errors**: Catch and throw appropriate HTTP responses

### Error Types
1. **Database Connection Errors**: Display generic error message
2. **Validation Errors**: Show specific field errors in forms
3. **Not Found Errors**: 404 for missing tasks
4. **Server Errors**: 500 with generic message

## Performance Considerations

### Optimization Strategies
- **Server-Side Rendering**: Fast initial page loads
- **Progressive Enhancement**: Forms work without JavaScript
- **Minimal JavaScript**: Remix handles most interactivity server-side
- **SQLite Performance**: Fast local database operations
- **Tailwind CSS**: Utility-first CSS with purging

### Scalability Notes
- Current architecture suitable for single-user local development
- SQLite appropriate for hundreds of tasks
- No caching layer needed for workshop scope
- Real-time features not implemented

## Security Considerations

### Local Development Security
- **Input Validation**: Sanitize all form inputs
- **SQL Injection Prevention**: Use parameterized queries
- **XSS Prevention**: React's built-in escaping
- **CSRF Protection**: Remix's built-in CSRF handling

### Data Protection
- **Local Storage Only**: No external data transmission
- **File Permissions**: Standard file system permissions for database
- **No Authentication**: Not implemented for workshop scope

## Development Workflow

### Branch Strategy
- **Feature Branches**: `feature/task-creation`, `feature/status-updates`
- **Main Branch**: Stable, working code
- **Direct Merges**: Simple workflow for two-person team

### Build Process
- **Development**: `remix dev` for hot reloading
- **Type Checking**: `tsc --noEmit` for type validation
- **Linting**: `eslint` with Remix defaults
- **Database Setup**: Initialize on first run

## Deployment Architecture

### Local Development Only
- **Environment**: Node.js local development server
- **Database**: SQLite file in project directory
- **Assets**: Served by Remix development server
- **No Production Deployment**: Workshop scope only

## Testing Strategy

### Testing Approach
- **Unit Tests**: Key database functions (createTask, updateTaskStatus, deleteTask)
- **Component Tests**: Form validation and rendering
- **Manual Testing**: User workflows and error scenarios
- **No E2E Tests**: Keep testing scope manageable for workshop

### Test Structure
```
/tests
  /lib
    - tasks.server.test.ts
  /components
    - AddTaskForm test.tsx
```

## Integration Points

### External Dependencies
- **better-sqlite3**: Database operations
- **Remix**: Full-stack framework
- **React**: UI components
- **Tailwind CSS**: Styling utilities

### Internal Integration
- **Database ↔ Routes**: Via server-only functions
- **Routes ↔ Components**: Via Remix loader/action data
- **Components ↔ Forms**: Via Remix Form component

## Future Considerations

### Potential Enhancements
- **Drag and Drop**: React DnD library
- **Real-time Updates**: WebSocket integration
- **Task Editing**: Additional form fields and validation
- **User Authentication**: Remix auth strategies
- **Deployment**: Docker containerization

### Architecture Evolution
- Current architecture supports incremental enhancement
- Remix patterns scale well for additional features
- SQLite can be swapped for PostgreSQL if needed
- Component structure allows for easy extension