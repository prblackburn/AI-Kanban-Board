**IMPORTANT FOR CLAUDE: Reference this file before implementing anything**

# Project: [Project Name]

## Project Overview

A brief description of the project, its purpose, and key goals.

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

**NOTE FOR CLAUDE: Fill in the below**

## Tech Stack

- Languages: [list primary languages]
- Frameworks: [list frameworks]
- Tools: [list tools]

## Code Style & Conventions

### Import/Module Standards

- [Specify import standards]

### Naming Conventions

- [Functions naming convention]
- [Classes/Components naming convention]
- [Constants naming convention]
- [Files naming convention]

### Patterns to Follow

- [Key architectural patterns]
- [Error handling approaches]
- [Code organisation principles]

## Development Workflow

- Branch strategy
- Commit message format
- PR requirements

## Testing Strategy

- Test frameworks
- Coverage requirements
- Test naming conventions

## Environment Setup

- Required environment variables
- Setup commands
- Local development server

## Common Commands

```bash
# Build command
[command]

# Test command
[command]

# Lint command
[command]

# Check command
[command]

# Development server
[command]
```

## Project Structure

Key directories and their purpose:

- `/src` - [description]
- `/tests` - [description]
- [other important directories]

## Review Process Guidelines

Before submitting any code, ensure the following steps are completed:

1. **Run all lint, check and test commands**

2. **Review outputs and iterate until all issues are resolved**

3. **Assess compliance**:
   For each standard, explicitly state ✅ or ❌ and explain why:

   - Code style and formatting
   - Naming conventions
   - Architecture patterns (refer to `ARCHITECTURE.md`)
   - Error handling
   - Test coverage
   - Documentation

4. **Self-review checklist**:
   - [ ] Code follows defined patterns
   - [ ] No debug/commented code
   - [ ] Error handling implemented
   - [ ] Tests written and passing
   - [ ] Documentation updated

## Known Issues & Workarounds

Document any current limitations or workarounds Claude should be aware of.

## References

Links to relevant external documentation, design docs, or resources.
