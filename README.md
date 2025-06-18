# Agentic Workflows & Human–AI Pair Programming in Real Development

## Table of Contents

- [Workshop](#workshop)
  - [Overview](#overview)
  - [What to Expect](#what-to-expect)
  - [Getting Started](#getting-started)
- [Task](#task)
- [Human-AI Pair-Programming: A Rough Guide](#human-ai-pair-programming-a-rough-guide)
  - [IQRE Process](#iqre-process)
  - [Workshop Phases](#workshop-phases)
    - [Conception](#conception)
    - [Environment & Tickets](#environment--tickets)
    - [Implementation](#implementation)
    - [Context Management](#context-management)
    - [Final Presentation](#final-presentation)
  - [Key Guidelines](#key-guidelines)
    - [AI Collaboration](#ai-collaboration)
    - [Team Coordination](#team-coordination)
    - [Quality Assurance](#quality-assurance)
    - [Success Criteria](#success-criteria-1)
  - [Best Practices from Experience](#best-practices-from-experience)

## Workshop

### Overview

In this workshop, you will work in human-AI pairs to build a Kanban board application using Claude Code or Codex as your AI partner. The focus is on practicing effective AI-assisted development, improving prompt hygiene, and fostering human oversight while collaborating with AI.

**Key Feature**: Regular milestone presentations where teams share progress, code, and learnings with the entire group for collaborative review and feedback.

### What to Expect

You will:

- Collaborate with both human teammates and AI partners
- Develop a Kanban board application as a team
- Practice prompt refinement and iterative AI guidance
- Present progress at key milestones for group review and feedback
- Learn from other teams' approaches and solutions

### Getting Started

One developer on your team should create a new repository [using this repository as a template](https://github.com/new?template_name=fac-ws_ai_pair-programming&template_owner=TandemCreativeDev). After this, add your other team member [as a collaborator](https://docs.github.com/en/account-and-profile/setting-up-and-managing-your-personal-account-on-github/managing-access-to-your-personal-repositories/inviting-collaborators-to-a-personal-repository) for that repo.

## Task

Details of the task are contained in the [brief](docs/BRIEF.md).

## Human-AI Pair-Programming: A Rough Guide

### IQRE Process

Follow these four steps consistently throughout the workshop:

1. **Iterate**: Share ideas/request code from AI and develop specifications or features through iteration
2. **Question**: Review AI proposal, identify gaps, and refine through follow-up questions
3. **Accept**: If AI proposal is acceptable, allow it to generate the code or specs
4. **Review/Create**: Understand generated code/specs. If inspired, create a new, enhanced solution based on AI's output
5. **Explain**: Present outputs to teammates, emphasising clear foundations and alignment

---

### Workshop Phases

> [!NOTE]
> All prompts referred to in the below section are available [here](PROMPTS.md).

#### CONCEPTION

- **Pair Formation**: Form teams (1 frontend + 1 backend developer)
- **Repository Setup**: Following [Getting Started](#getting-started)
- **Specification Development**:
  - Once you have completed [Getting Started](#getting-started), both developers should work together on one computer for the rest of the Conception phase
  - Sitting on the same computer, you should initialise a new instance of Claude Code or Codex. Use the [GENERATE SPECS](PROMPTS.md#generate-specs) prompt to have a conversation with AI and determine the specifications of your project. You should be discussing each answer with each other before responding. This is a collaborative effort!
  - Use [SPEC WRAP-UP](PROMPTS.md#spec-wrap-up) prompt - this should create `FUNCTIONAL.md`, `ARCHITECTURE.md`, and `CLAUDE.md` files
  - Push everything to your repo

**🎯 MILESTONE 1: Specification Review** (15 minutes)

- Each team presents their architecture decisions and coding standards
- Group discusses different approaches and trade-offs
- Teams can refine specs based on feedback

> **Output**: Initial documentation pushed to repo

#### ENVIRONMENT & TICKETS

> [!WARNING]  
> Set up your environment, install your dependencies etc. **manually**. AI can be terrible at this and using AI for setup could add a lot of config issues to your project before you can even get started.

- **Parallel Setup (now working on separate machines, using normal Git practices e.g. working on different branches)**:

  - **Frontend Dev**: Use the [GENERATE TICKETS](PROMPTS.md#generate-tickets) prompt to create `TICKETS.md`. Remember to follow the IQRE methodology! Check that your tickets actually make sense so that you don't end up with a lot of vague, impossibly scoped tickets that no one could follow!
  - **Backend Dev**: Set up environment, frameworks, folder structure, install dependencies

- **Coordination**: Review tickets for dependencies and overlaps

**🎯 MILESTONE 2: Ticket & Architecture Review** (10 minutes)

- Teams share their ticket breakdown and implementation strategy
- Group reviews project structures and identifies common patterns
- Quick troubleshooting of any setup issues

> **Output**: Ready-to-code environment with structured tickets

#### IMPLEMENTATION

Work on individual machines with separate Claude Code or Codex instances.

**Per Ticket Process**:

1. Use [KICKOFF/REFRESH MEMORY](PROMPTS.md#kickoff--refresh-memory) prompt
2. Implement features following IQRE methodology
3. Review constantly - understand every line AI generates
4. Use [CONTEXT RESET](PROMPTS.md#context-reset) after ticket completion
5. Update `TICKETS.md` with completion status and any additional work done

**🎯 MILESTONE 3: Mid-Implementation Review** (15 minutes)

- Teams demo their current progress and working features
- Review updated `TICKETS.md` to show progress and cross-dependencies resolved
- Show examples of effective AI collaboration (prompts, iterations, code review)
- Group code review: examine specific implementations and discuss alternatives
- Share challenges and solutions discovered so far

**Between Sessions**:

- Coordinate dependencies with teammate using updated `TICKETS.md`
- Update `CLAUDE.md` with learned standards

> **Output**: Incremental feature completion with documented progress

#### CONTEXT MANAGEMENT

- Reset the LLM's context window after each ticket
- Update `TICKETS.md` as living document after each completion
- Maintain clean workspace
- Document evolved best practices

> **Output**: Archived context for reference, updated ticket status, clean workspace

#### FINAL PRESENTATION

**🎯 MILESTONE 4: Final Demo & Retrospective** (20 minutes)

- Each team demos their complete Kanban board (5 minutes)
- Show most effective AI collaboration examples (2 minutes)
- Present evolved standards and architectural decisions (3 minutes)
- Group retrospective: what worked, what didn't, key learnings

> **Output**: Complete project with documented learnings

---

### Key Guidelines

#### AI Collaboration

- **Explicit Prompting**: Always tell the LLM which files to reference (it won't do this automatically)
- **Context Management**: Use [CONTEXT RESET](PROMPTS.md#context-reset) prompt to maintain clarity
- **Standards Evolution**: Update `CLAUDE.md` when discovering new patterns
- **Code Understanding**: Never accept code you don't understand - question everything

#### Team Coordination

- **Sync Regularly**: During designated milestone sessions
- **Check Dependencies**: Use [DEPENDENCY CHECK](PROMPTS.md#dependency-check) prompt when unclear
- **Share Learnings**: Document architectural decisions and standard updates
- **Cross-Team Learning**: Pay attention to other teams' approaches during milestones

#### Quality Assurance

- **Follow IQRE**: Apply the four steps consistently
- **Review Obsessively**: You need to know everything the AI is generating
- **Maintain Standards**: Keep `CLAUDE.md` current and concise
- **Question AI Decisions**: Challenge architectural and implementation choices

#### Success Criteria

- Functional Kanban board with task management
- Effective AI collaboration patterns demonstrated
- Evolved standards documented in `CLAUDE.md`
- Clear architectural decisions with rationale
- Evidence of critical thinking about AI-generated code

### Best Practices from Experience

#### Prompt Engineering

- **Be Specific**: "Create a function that..." vs "Make something that works"
- **Reference Standards**: Always point the LLM to your `CLAUDE.md` file
- **Iterate Deliberately**: Don't accept first solution - refine through questions
- **Context Boundaries**: Reset context when switching major features

#### Code Review with AI

- **Understand Before Accepting**: Ask AI to explain complex implementations
- **Challenge Decisions**: "Why did you choose this pattern over X?"
- **Test Edge Cases**: AI often misses boundary conditions
- **Verify Against Requirements**: Does this actually solve the ticket?

#### Team Collaboration

- **Sync Early, Sync Often**: Don't let integration become a surprise
- **Share Failures**: Failed prompts teach as much as successful ones
- **Document Decisions**: Your future self will thank you
- **Trust but Verify**: AI is powerful but not infallible

#### Context Management

- **Small Chunks**: One ticket per context window works best
- **Clean Handoffs**: Use CONTEXT RESET religiously
- **State Preservation**: `TICKETS.md` is your lifeline
- **Live Documentation**: Keep `TICKETS.md` updated after each completion
- **Standards Evolution**: Update `CLAUDE.md` as you learn

**Remember**: You're the human-in-the-loop. Guide the AI, don't just accept its output. Question everything, understand everything, own everything.
