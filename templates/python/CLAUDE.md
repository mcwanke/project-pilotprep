# CLAUDE.md — Interview Session

## What This Session Is

A timed interview coding session. The goal is to demonstrate how I think,
decompose problems, and direct AI tooling — not just produce working code.

This session is being documented. A hiring manager may read this folder.
Every decision, redirect, and course correction is part of the artifact.

See plan/ for my working notes. Build nothing until I say so.

---

## How to Work With Me

**No filler.** Never open responses with "Great!", "Of course!", "Certainly!",
or similar. Start with the answer.

**Match length to complexity.** Short answers for simple questions. Full
responses for complex tasks. Never pad.

**Propose before executing.** Before any task, state the intended approach
with rationale. Wait for my confirmation before touching any file.

**Flag uncertainty explicitly and proactively.** If uncertain about any fact,
approach, or technical detail — say so before proceeding. Never fill gaps with
plausible-sounding information. Before executing, surface assumptions, risks,
and anything that could be wrong. Do not wait to be asked.

**Never touch unrelated code.** Only modify files directly related to the
current task. Note anything worth fixing elsewhere at the end. Do not touch it.

---

## Session Workflow

This is the required sequence. Do not skip or reorder steps.

1. **Read plan/scratch.md** — understand my initial notes before anything else
2. **Read plan/plan.md** — understand my intended approach
3. **Generate WORKORDER** — produce a detailed implementation plan and write
   it to plan/WORKORDER.md. Wait for my approval before writing any code.
4. **Execute** — implement the WORKORDER in focused chunks. After each chunk,
   report what was done before moving to the next.
5. **END SESSION** — when I say this, execute the END SESSION procedure below.

---

## WORKORDER Format

When generating the WORKORDER, structure it as follows:

### Problem Statement
One paragraph restatement of the prompt in my own words.

### Assumptions
Explicit list of anything assumed that is not stated in the prompt.

### Scope
What is included. What is explicitly out of scope for this session.

### Approach
High-level technical approach with rationale.

### Implementation Steps
Ordered list of discrete tasks. Each step should be small enough to
complete and verify independently.

### Risks & Open Questions
Anything that could go wrong or needs a decision before proceeding.

---

## Behavior Rules

**Confirmation required before:**
- Creating, modifying, or deleting any file
- Running any shell command
- Any action with irreversible side effects

**After every coding task, end with:**
- Files changed (list every file touched)
- What was modified (one line per file)
- Files intentionally not touched
- Any follow-up notes or flagged concerns

**Scope discipline:**
- If the WORKORDER feels too large for 45 minutes, flag it before executing
- Prefer a working subset over an incomplete whole
- If scope needs to be cut mid-session, propose what to cut and why

---

## Memory

Session context lives in memory/. Read memory/MEMORY.md at the start of
the session if it exists. It may contain context from a prior session.

**END SESSION:** When I say "END SESSION" —
Write immediately to memory/MEMORY.md without waiting for confirmation.
Use this format:

---
## Session [date] [stack]

### Prompts (verbatim, in order)
- [prompt 1]
- [prompt 2]

### Worked On

### Completed

### In Progress

### Decisions Made

### Assumptions & Risks Flagged
---

---

## What NOT to Do

- Never write code before the WORKORDER is approved
- Never modify files outside the current task scope
- Never assume a prior confirmation carries forward
- Never exceed the scope defined in the WORKORDER without flagging it first
- Never skip the WORKORDER step even if the task seems simple

---

## Stack-Specific Conventions

===============================================================
PYTHON VERSION — replace everything below this line with the
TypeScript version when using the typescript template
===============================================================

### Stack
- Backend: FastAPI + Uvicorn
- Templates: Jinja2 served through FastAPI
- Database: SQLite via Python sqlite3 stdlib
- No ORM

### Key Files
- api/main.py — application entry point, routes live here
- db/database.py — all database logic lives here, nowhere else
- files/file_io.py — all file I/O logic lives here
- templates/index.html — base HTML template

### To Start the Server
pip install -r requirements.txt
uvicorn api.main:app --reload --port 8000

### Conventions
- All business logic in the backend — keep templates thin
- All DB access through db/database.py — no SQL anywhere else
- All file I/O through files/file_io.py
- Type hints on all function signatures
- Docstrings on all public functions
