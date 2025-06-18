# Prompts for Claude

> [!IMPORTANT]  
> There are plenty of placeholders throughout these prompts which need to be filled before use.

## Conception

The first step is to develop your own set of specifications, requirements and standards for this project. To do this you will converse as a team with Claude and produce 4 structured outputs:

1. **FUNCTIONAL.md** - Complete functional requirements
2. **ARCHITECTURE.md** - Detailed project architecture
3. **CLAUDE.md** - Compact standards and guidelines
4. **TICKETS.md** - Ordered tasks/features to complete the project collaboratively

These are the prompts you can use to do so:

---

### GENERATE SPECS

> [!NOTE]
> Resist the urge of being too ambitious here, remember you must finish building this and fully understand, be able to explain it by the end of the day. This is _just_ a simple kanban board. The aim is simply to make sure it is built the way you want/dictate.

```markdown
We're going to discuss the specification for a software project. I am working in team of 2 people, each pair-programming with an AI (we each have the workshop repo cloned to our machines, and each have an instance of Claude Code / Codex running inside that repo) in the context of an AI-assisted development workshop. The project details are contained in the `docs/` folder: `BRIEF.md` and workshop details are in `README.md`.

Ask me one question at a time so we can develop thorough, step-by-step specs. Each question should build on my previous answers, and our end goal is to have a detailed specification I can hand off to a developer. This will be built in only a few hours so try and keep the conversation short, apply KISS principles and use logical inference based on previous answers when possible.

We should cover: language (ask this first), frameworks, libraries, package managers, styling choices, data structure options (SQL/NoSQL/Graph) BEFORE data storage, architecture, project structure, components, interfaces, design patterns, error handling, UI features, user experience, coding standards, naming conventions, agreed principles, version control, commit standards, testing and documentation requirements.

Do not wrap up until you have answers from me for each of these topics. There will be three outputs at the end: a functional spec, an architectural spec, and our code standards specification for `CLAUDE.md`, review the template for this file currently in the repo to understand what we must cover.

**Important**: When asking questions about technical choices, present 2-3 specific options (ranked from most relevant) with brief explanations rather than leaving it open-ended. This speeds up decision-making. When there are more viable options available, verbalise this and ask if I want to see more options. Only one question at a time, stay within scope, and don't generate anything until requested.
```

### SPEC WRAP-UP

```markdown
Now that we've wrapped up the brainstorming process, compile our findings into three comprehensive, developer-ready specifications in the `docs/` folder:

1. **FUNCTIONAL.md** - Complete functional requirements
2. **ARCHITECTURE.md** - Detailed project architecture
3. **CLAUDE.md** - Compact standards and guidelines

For `CLAUDE.md`, follow the existing template but ensure each section includes specific, actionable directives that we can reference explicitly during development. Be very concise, this should be a compact standards document you will refer to each time you write any code.

Make each specification modular and cross-referenced so developers can quickly find relevant information when prompted to check these files. Do not repeat yourself.
```

### GENERATE TICKETS

> [!IMPORTANT]  
> This prompt contains placeholders `DEV1_NAME` and `DEV2_NAME` to be filled in.

```markdown
In the `docs/` folder, review `CLAUDE.md` first to understand our standards. Then review `FUNCTIONAL.md` and `ARCHITECTURE.md` to understand what we're building.

Break the project down into manageable, atomic tickets that:

- Split cleanly between frontend and backend
- Build on each other logically
- Minimise overlap for simultaneous development
- Are small enough to complete in one session

Generate `TICKETS.md` with:

1. Clear dependencies between tickets
2. Frontend tickets assigned to [DEV1_NAME]
3. Backend tickets assigned to [DEV2_NAME]
4. Explicit prerequisites listed

Each ticket should include:

- Brief description
- Specific deliverables
- Dependencies (if any)
- Assignee
- Definition of done
- Status tracking section (to be updated during implementation)

**Important**: Order tickets by dependency, ensuring both developers can work efficiently and logically through the tickets in order, without blocking each other. Include a template for tracking completion, additional features added, and cross-ticket dependencies resolved.
```

## Implementation

During implementation, there are a number of prompts you can use at the start of each ticket (KICKOFF / REFRESH MEMORY) or after each ticket (CONTEXT RESET). Included is also a DEPENDENCY CHECK prompt to be used if anything is unclear, remember to also check in with your teammate regularly to iron out anything that is unclear or overlapping.

### KICKOFF / REFRESH MEMORY

> [!IMPORTANT]  
> This prompt contains placeholders `NAME` to be filled in.

> [!NOTE]
> Always clear context window before using this prompt.

```markdown
**First, review documentation in `docs/`.**

Follow instructions to '### Context refresh' in `CLAUDE.md`, I'm [NAME].
```

### DEPENDENCY CHECK

> [!IMPORTANT]
> This prompt contains variable `TICKET_NUMBER` to be filled in.

> [!NOTE]
> Use this prompt if ticket dependencies or scope is unclear or overlapping.

```markdown
Before starting this ticket [TICKET_NUMBER], check `TICKETS.md` for dependencies and current status. Then:

1. Verify all prerequisite tickets are complete by checking their status in `TICKETS.md`
2. Confirm our implementation aligns with dependent tickets
3. Check if any shared interfaces or data structures need coordination with your teammate
4. Look for any tickets that might have already addressed parts of this work
5. Flag any potential conflicts with work in progress

Only proceed when dependencies are satisfied and coordination is clear. If you discover work has already been completed in other tickets, note this for the ticket update.
```

### CONTEXT RESET

> [!NOTE]
> You must use this prompt after each ticket.

```markdown
Follow instructions to '### Context reset' in `docs/CLAUDE.md`
```

### TICKET STATUS UPDATE

> [!NOTE]
> Use this prompt if you need to update tickets without a full context reset, or to check cross-ticket impacts.

```markdown
Review the work I've just completed and update `TICKETS.md` accordingly:

1. Mark the current ticket as complete with details of what was implemented
2. Check if this work has resolved or partially completed any other tickets
3. Update any tickets that can now proceed due to dependencies being resolved
4. Note any additional features or components that were implemented
5. Flag any new dependencies or blockers that have emerged

Be specific about what was delivered beyond the original ticket scope, as this helps coordinate with the other developer.
```
