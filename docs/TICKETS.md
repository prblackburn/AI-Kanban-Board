# Project Tickets: AI Kanban Board

## Ticket Organization

**Frontend Developer**: Paul
**Backend Developer**: James

Tickets are ordered by dependency and designed to minimize blocking between developers.

---

## Ticket Template (for status tracking during implementation)

```
Status: ⏳ PENDING / 🚧 IN PROGRESS / ✅ COMPLETE
Additional Features Added: [list any extras beyond scope]
Cross-Ticket Dependencies Resolved: [list any blocking issues resolved]
Implementation Notes: [key decisions or patterns established]
```

---

## BACKEND TICKETS

### TICKET-001: Database Setup and Schema
**Assignee**: James  
**Dependencies**: None  

**Description**: Set up SQLite database with better-sqlite3 and create the tasks table schema.

**Deliverables**:
- Install `better-sqlite3` dependency
- Create `/database` directory
- Create `app/lib/db.server.ts` with database connection
- Implement database initialization with tasks table schema
- Add error handling for database operations

**Definition of Done**:
- Database file created at `/database/kanban.db`
- Tasks table created with correct schema (id, title, status, created_at)
- Database connection module exports working database instance
- Initial database setup runs without errors

**Status Tracking**:
```
Status: ⏳ PENDING
Additional Features Added: 
Cross-Ticket Dependencies Resolved: 
Implementation Notes: 
```

---

### TICKET-002: Core Database Operations
**Assignee**: James  
**Dependencies**: TICKET-001  

**Description**: Implement server-side database functions for task CRUD operations.

**Deliverables**:
- Create `app/lib/tasks.server.ts` with database functions
- Implement `getAllTasks()` function
- Implement `createTask(title)` function
- Implement `updateTaskStatus(id, status)` function
- Implement `deleteTask(id)` function
- Add proper TypeScript types for Task interface

**Definition of Done**:
- All CRUD functions work correctly with SQLite
- Functions use parameterized queries for security
- Proper error handling and validation
- TypeScript types defined for Task interface
- Functions follow naming conventions from CLAUDE.md

**Status Tracking**:
```
Status: ⏳ PENDING
Additional Features Added: 
Cross-Ticket Dependencies Resolved: 
Implementation Notes: 
```

---

### TICKET-003: Remix Route Setup
**Assignee**: James  
**Dependencies**: TICKET-002  

**Description**: Set up Remix loader and action functions in the main route for handling data fetching and form submissions.

**Deliverables**:
- Update `app/routes/_index.tsx` with loader function
- Implement action function to handle form submissions
- Set up proper request handling for different intents (create, updateStatus, delete)
- Add error handling and validation
- Update page meta information

**Definition of Done**:
- Loader fetches and returns all tasks from database
- Action handles create, update, and delete operations
- Proper error responses and redirects
- Form data validation implemented
- Route follows Remix patterns from ARCHITECTURE.md

**Status Tracking**:
```
Status: ⏳ PENDING
Additional Features Added: 
Cross-Ticket Dependencies Resolved: 
Implementation Notes: 
```

---

## FRONTEND TICKETS

### TICKET-004: Base Component Structure
**Assignee**: Paul  
**Dependencies**: None  

**Description**: Create the foundational React components for the Kanban board layout without data integration.

**Deliverables**:
- Create `app/components/board/KanbanBoard.tsx`
- Create `app/components/board/ColumnHeader.tsx`
- Create `app/components/tasks/TaskCard.tsx`
- Create `app/components/tasks/AddTaskForm.tsx`
- Implement basic layout with Tailwind CSS
- Add TypeScript props interfaces

**Definition of Done**:
- All components render without errors
- Three-column layout displays correctly
- Components follow naming conventions from CLAUDE.md
- Proper TypeScript typing for all props
- Components organized in correct directory structure

**Status Tracking**:
```
Status: ✅ COMPLETE
Additional Features Added: Added TypeScript types file (~/types.ts), included form actions in TaskCard and AddTaskForm for future integration
Cross-Ticket Dependencies Resolved: None
Implementation Notes: All components follow CLAUDE.md naming conventions (PascalCase), organized by feature (/board, /tasks), include proper TypeScript interfaces, ready for data integration
```

---

### TICKET-005: Static UI Implementation
**Assignee**: Paul  
**Dependencies**: TICKET-004  

**Description**: Implement the complete static UI with styling, using placeholder data to show the intended design.

**Deliverables**:
- Style KanbanBoard with three equal-width columns
- Style ColumnHeader with title and task count
- Style TaskCard with title, timestamp, and action buttons
- Style AddTaskForm with proper form controls
- Add responsive design with Tailwind CSS
- Create mock task data for development

**Definition of Done**:
- UI matches design requirements from FUNCTIONAL.md
- All components properly styled with Tailwind CSS
- Layout works with placeholder task data
- Form elements have proper styling and accessibility
- Components follow UI requirements from specification

**Status Tracking**:
```
Status: ⏳ PENDING
Additional Features Added: 
Cross-Ticket Dependencies Resolved: 
Implementation Notes: 
```

---

## INTEGRATION TICKETS

### TICKET-006: Data Integration
**Assignee**: Paul  
**Dependencies**: TICKET-003, TICKET-005  

**Description**: Connect frontend components to Remix loader data and implement task display functionality.

**Deliverables**:
- Update KanbanBoard to receive and use loader data
- Implement task filtering by status for each column
- Update TaskCard to display real task data
- Handle empty states when no tasks exist
- Add proper TypeScript typing for loader data

**Definition of Done**:
- Tasks load from database and display in correct columns
- Empty states show appropriate messages
- Task data properly typed and validated
- No console errors or warnings
- UI updates correctly when data changes

**Status Tracking**:
```
Status: ⏳ PENDING
Additional Features Added: 
Cross-Ticket Dependencies Resolved: 
Implementation Notes: 
```

---

### TICKET-007: Task Creation
**Assignee**: Paul  
**Dependencies**: TICKET-006  

**Description**: Implement task creation functionality using Remix forms and actions.

**Deliverables**:
- Connect AddTaskForm to Remix action
- Implement form validation (required title field)
- Add form submission handling with proper UX feedback
- Handle form errors and display error messages
- Implement form reset after successful submission

**Definition of Done**:
- New tasks can be created via form submission
- Form validation prevents empty submissions
- Error states display helpful messages
- Form resets after successful creation
- New tasks appear immediately in "To Do" column

**Status Tracking**:
```
Status: ⏳ PENDING
Additional Features Added: 
Cross-Ticket Dependencies Resolved: 
Implementation Notes: 
```

---

### TICKET-008: Task Status Updates
**Assignee**: Paul  
**Dependencies**: TICKET-007  

**Description**: Implement task status change functionality allowing tasks to move between columns.

**Deliverables**:
- Add status update buttons/actions to TaskCard
- Implement form submission for status changes
- Add visual feedback for status transitions
- Handle status update errors gracefully
- Ensure tasks move to correct columns after status change

**Definition of Done**:
- Tasks can be moved between all three columns
- Status changes persist to database
- UI updates immediately after status change
- Error handling works for failed updates
- Status transitions follow logical flow (todo → doing → done)

**Status Tracking**:
```
Status: ⏳ PENDING
Additional Features Added: 
Cross-Ticket Dependencies Resolved: 
Implementation Notes: 
```

---

### TICKET-009: Task Deletion
**Assignee**: Paul  
**Dependencies**: TICKET-008  

**Description**: Implement task deletion functionality with user confirmation.

**Deliverables**:
- Add delete button/action to TaskCard
- Implement confirmation dialog or prompt
- Connect delete action to Remix form submission
- Handle deletion errors and provide feedback
- Ensure tasks are removed from UI immediately

**Definition of Done**:
- Tasks can be deleted with confirmation step
- Deletion persists to database
- Tasks removed from UI immediately after deletion
- Error handling for failed deletions
- User cannot accidentally delete tasks

**Status Tracking**:
```
Status: ⏳ PENDING
Additional Features Added: 
Cross-Ticket Dependencies Resolved: 
Implementation Notes: 
```

---

## QUALITY ASSURANCE TICKETS

### TICKET-010: Testing and Lint Compliance
**Assignee**: James  
**Dependencies**: TICKET-009  

**Description**: Ensure code quality and implement essential tests for database operations.

**Deliverables**:
- Run and fix all TypeScript errors (`pnpm run typecheck`)
- Run and fix all lint errors (`pnpm run lint`)
- Write unit tests for core database functions
- Test error handling scenarios
- Document any testing patterns established

**Definition of Done**:
- All TypeScript checks pass without errors
- All lint checks pass without errors  
- Database functions have unit test coverage
- Error scenarios are tested
- Code follows all standards from CLAUDE.md

**Status Tracking**:
```
Status: ⏳ PENDING
Additional Features Added: 
Cross-Ticket Dependencies Resolved: 
Implementation Notes: 
```

---

### TICKET-011: End-to-End Functionality Verification
**Assignee**: Paul and James  
**Dependencies**: TICKET-010  

**Description**: Complete manual testing of all user workflows and ensure full functionality.

**Deliverables**:
- Test complete task creation workflow
- Test task status changes across all columns
- Test task deletion with confirmation
- Test error scenarios and edge cases
- Verify data persistence across page refreshes
- Update documentation with any discovered issues

**Definition of Done**:
- All user stories from FUNCTIONAL.md work correctly
- Data persists correctly across page refreshes
- Error states display helpful messages
- All success criteria from FUNCTIONAL.md are met
- Application ready for demonstration

**Status Tracking**:
```
Status: ⏳ PENDING
Additional Features Added: 
Cross-Ticket Dependencies Resolved: 
Implementation Notes: 
```

---

## Dependency Chain Summary

**Phase 1 - Foundation (Parallel Work)**
- TICKET-001 (James): Database Setup
- TICKET-004 (Paul): Base Components

**Phase 2 - Core Implementation (Sequential)**
- TICKET-002 (James): Database Operations (depends on TICKET-001)
- TICKET-005 (Paul): Static UI (depends on TICKET-004)

**Phase 3 - Backend Integration**
- TICKET-003 (James): Remix Routes (depends on TICKET-002)

**Phase 4 - Frontend Integration (Sequential)**
- TICKET-006 (Paul): Data Integration (depends on TICKET-003, TICKET-005)
- TICKET-007 (Paul): Task Creation (depends on TICKET-006)
- TICKET-008 (Paul): Status Updates (depends on TICKET-007)
- TICKET-009 (Paul): Task Deletion (depends on TICKET-008)

**Phase 5 - Quality Assurance**
- TICKET-010 (James): Testing & Lint (depends on TICKET-009)
- TICKET-011 (Both): E2E Verification (depends on TICKET-010)

This structure allows Paul and James to work efficiently with minimal blocking while ensuring proper dependency management and code quality.