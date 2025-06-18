**IMPORTANT FOR CLAUDE: Reference this file before implementing anything**

# Project: AI Kanban Board

## Project Overview

A collaborative Kanban board web application built with Remix, React, TypeScript, and SQLite. Users can manage tasks across three columns (To Do, Doing, Done) with essential CRUD operations. Built for local development with a focus on simplicity and core functionality.

## Context Management

### Context refresh

Refresh your memory by checking in `docs/` folder. Then review the `ARCHITECTURE.md` and `FUNCTIONAL.md` to understand what we are building. Check current progress in `TICKETS.md`.

Check what the next ticket that needs implementing.

**Before implementing anything:**

1. Confirm you understand the current ticket requirements
2. Check `TICKETS.md` for any dependencies or related work completed by other tickets
3. Ask if you should reference any specific standards from `CLAUDE.md`
4. Only implement what's specified in this ticket

As you implement, explain:

- How the code works and why it meets our `FUNCTIONAL.md` requirements
- How it aligns with our `ARCHITECTURE.md`
- Why it complies with our standards in `CLAUDE.md`
- Any additional features or components you're implementing beyond the basic ticket requirements

### Context reset

Now we will reset the context window, before we do so, in `docs/` folder:

1. **Update `TICKETS.md`** for the ticket just completed:

   - Mark ticket as ✅ COMPLETE
   - Add any additional features/components implemented beyond original scope
   - Note any tasks from other tickets that were completed during this work
   - Update dependencies if this work enables other tickets to proceed
   - Add any important implementation notes or decisions

2. Create/update `HISTORY_[NAME].md` file summarising our progress:

   - List completed tickets with key implementation details
   - Note any important decisions or patterns established
   - Mention any deviations from original specs and why
   - Save current state of key variables/configurations

3. If applicable, update `CLAUDE.md` with any learned standards picked up from the review process

4. If there have been significant changes, update `FUNCTIONAL.md` or `ARCHITECTURE.md` as required

5. **IMPORTANT**: Be concise, don't repeat yourself, double check and remove duplication/reduce where possible

After updating these files, I'll reset the context window and we'll continue with a fresh session.

---


## Tech Stack

- Languages: TypeScript, SQL
- Frameworks: Remix (full-stack), React, Tailwind CSS
- Database: SQLite with better-sqlite3
- Tools: pnpm, ESLint, Prettier, TypeScript compiler

## Code Style & Conventions

### Import/Module Standards

- Use ES6 imports/exports
- Group imports: React/libraries first, then local components, then utilities
- Use named imports when possible
- Server-only modules use `.server.ts` suffix

### Naming Conventions

- Functions: camelCase (`getTasks`, `createTask`, `updateTaskStatus`)
- Components: PascalCase (`TaskCard`, `KanbanBoard`, `AddTaskForm`)
- Files: kebab-case for utilities, PascalCase for components (`tasks.server.ts`, `TaskCard.tsx`)
- Database functions: descriptive verbs (`getAllTasks`, `deleteTask`)
- Constants: UPPER_SNAKE_CASE for true constants

### Patterns to Follow

- Simple Remix patterns: loader/action functions directly in routes
- Component organization by feature (/board, /tasks, /ui)
- Remix built-in error handling with ErrorBoundary
- Raw SQL with parameterized queries
- Form-based interactions with progressive enhancement

## Development Workflow

- Branch strategy: feature branches (`feature/task-creation`) merged to main
- Commit message format: Conventional commits (`feat: add task creation form`)
- PR requirements: Basic review by teammate, working functionality

## Testing Strategy

- Test frameworks: Vitest (built into Remix), @testing-library/react
- Coverage requirements: Unit tests for core database functions, basic component tests
- Test naming conventions: `functionName.test.ts`, `ComponentName.test.tsx`

## Environment Setup

- Required environment variables: None (local SQLite database)
- Setup commands: `pnpm install`, database auto-initializes on first run
- Local development server: `pnpm run dev` (Remix dev server)

## Common Commands

```bash
# Development server
pnpm run dev

# Build command
pnpm run build

# Test command
pnpm run test

# Type check command
pnpm run typecheck

# Lint command
pnpm run lint
```

## Project Structure

Key directories and their purpose:

- `/app` - Remix application code (routes, components, utilities)
- `/app/components` - React components organized by feature (/board, /tasks, /ui)
- `/app/lib` - Server-side utilities and database functions
- `/app/routes` - Remix file-based routing
- `/docs` - Project documentation and specifications
- `/database` - SQLite database file location

## Review Process Guidelines

Before submitting any code, ensure the following steps are completed:

1. **Run all lint, check and test commands**
   - `pnpm run typecheck`
   - `pnpm run lint`
   - `pnpm run test`

2. **Review outputs and iterate until all issues are resolved**

3. **Assess compliance**:
   For each standard, explicitly state ✅ or ❌ and explain why:

   - Code style and formatting (Prettier/ESLint)
   - Naming conventions (camelCase functions, PascalCase components)
   - Architecture patterns (Remix loader/action, component organization)
   - Error handling (ErrorBoundary, form validation)
   - Basic test coverage (database functions, key components)
   - Minimal documentation (inline comments for complex logic)

4. **Self-review checklist**:
   - [ ] Code follows Remix patterns
   - [ ] TypeScript types are correct
   - [ ] Database operations use parameterized queries
   - [ ] Components are organized by feature
   - [ ] Forms handle validation and errors
   - [ ] Essential functionality is tested

## Known Issues & Workarounds

- Workshop timeframe limits features to core functionality only
- SQLite database file should be in `/database` directory (create if needed)
- Manual testing required for user workflows
- No real-time updates between users (local development only)

## References

- [Remix Documentation](https://remix.run/docs)
- [React TypeScript Guide](https://react-typescript-cheatsheet.netlify.app/)
- [better-sqlite3 API](https://github.com/WiseLibs/better-sqlite3/blob/master/docs/api.md)
- [Tailwind CSS Documentation](https://tailwindcss.com/docs)
