# PROJECT_SPEC.md — Interview Prep Repo

## Purpose

This document is the authoritative build specification for this repository.
It exists to give Claude Code (or any future contributor) everything needed
to build, understand, and maintain this repo without needing external context.

Every design decision is documented with its reasoning. Do not second-guess
decisions already made here — if something needs to change, flag it explicitly
rather than silently working around it.

---

## What This Repo Is

A structured interview preparation environment for AI-assisted coding sessions.

This person is preparing for a 45-minute technical interview that works as
follows: a prompt is given, the candidate can use any AI tooling, and the
interviewer wants to see how the candidate puts together a solution.

This repo exists to:
1. Provide reusable, pre-configured template environments so zero setup time
   is lost during the actual interview
2. Document practice runs so iteration and improvement are visible over time
3. Demonstrate — through the repo itself — how this person thinks about and uses
   AI tooling as an engineering leader

The repo is public. A hiring manager may read it. Every design decision,
practice run, and session log is intentionally visible. This is a feature,
not an oversight.

---

## Repo Structure

```
/
├── CLAUDE.md                       — root Claude Code context
├── README.md                       — human-facing repo introduction
├── PROJECT_SPEC.md                 — this file, Claude Code build document
├── memory/                         — root session memory, NOT gitignored
│   ├── MEMORY.md                   — session log, written by Claude Code
│   └── ERRORS.md                   — failed approaches log
├── docs/
│   ├── TEMPLATE_CLAUDE.md                   — source document for template CLAUDE.mds
│   ├── TEMPLATE_session_log.md              — session log template for practice runs
│   ├── TEMPLATE_SKELETON_target.md          — template for skeleton implementation guides
│   ├── PROMPT_session_review.md             — scoring prompt piped to claude -p
│   ├── STRUCTURE_skeleton.md                — universal skeleton structure and functions
│   ├── SKELETON_python_fastapi.md           — Python/FastAPI skeleton implementation
│   └── SKELETON_typescript_express.md       — TypeScript/Express skeleton implementation
├── scripts/
│   ├── gen_session.sh              — creates a new session folder
│   ├── gen_session_log.sh          — compiles session log from artifacts
│   ├── gen_session_review.sh       — runs AI review, produces review.md
│   └── review_compiler.py          — converts JSON review output to markdown
├── templates/
│   ├── python/                     — Python/FastAPI template environment
│   │   ├── CLAUDE.md               — interview session Claude Code context
│   │   ├── README.md               — quick reference for this template
│   │   ├── requirements.txt        — pinned Python dependencies
│   │   ├── memory/                 — empty, populated during session
│   │   │   └── MEMORY.md           — placeholder, overwritten at END SESSION
│   │   ├── plan/                   — candidate thinking artifacts
│   │   │   ├── scratch.md          — empty, quick notes during session
│   │   │   ├── plan.md             — empty, candidate approach before prompting
│   │   │   ├── session_context.md  — interview prompt and session context
│   │   │   ├── initial_prompt.md   — standardized prompt for starting session
│   │   │   └── WORKORDER.md        — empty, Claude Code generates this
│   │   ├── api/
│   │   │   └── main.py             — FastAPI entry point skeleton
│   │   ├── db/
│   │   │   └── database.py         — SQLite logic skeleton
│   │   ├── files/
│   │   │   └── file_io.py          — file I/O skeleton
│   │   ├── templates/
│   │   │   └── index.html          — base Jinja2 template skeleton
│   │   ├── data/                   — empty, for sample input files
│   │   ├── inputs/                 — empty, for input data files (CSV, JSON, etc.)
│   │   ├── outputs/                — empty, where file I/O functions write results
│   │   ├── logs/                   — empty, created at runtime by logging system
│   │   ├── tests/                  — empty, for test files (optional)
│   │   └── config.yaml             — application configuration (logging, db, api, outputs)
│   └── typescript/                 — TypeScript/Node template environment
│       ├── CLAUDE.md               — interview session Claude Code context
│       ├── README.md               — quick reference for this template
│       ├── package.json            — Node dependencies
│       ├── tsconfig.json           — TypeScript config
│       ├── memory/                 — empty, populated during session
│       │   └── MEMORY.md           — placeholder, overwritten at END SESSION
│       ├── plan/                   — candidate thinking artifacts
│       │   ├── scratch.md          — empty, quick notes during session
│       │   ├── plan.md             — empty, candidate approach before prompting
│       │   ├── session_context.md  — interview prompt and session context
│       │   ├── initial_prompt.md   — standardized prompt for starting session
│       │   └── WORKORDER.md        — empty, Claude Code generates this
│       ├── src/
│       │   ├── api/
│       │   │   └── server.ts       — Express entry point skeleton
│       │   ├── db/
│       │   │   └── database.ts     — SQLite logic skeleton
│       │   └── files/
│       │       └── fileIO.ts       — file I/O skeleton
│       ├── data/                   — empty, for sample input files
│       ├── inputs/                 — empty, for input data files (CSV, JSON, etc.)
│       ├── outputs/                — empty, where file I/O functions write results
│       ├── logs/                   — empty, created at runtime by logging system
│       ├── tests/                  — empty, for test files (optional)
│       └── config.yaml             — application configuration (logging, db, api, outputs)
└── sessions/                       — generated practice runs
    └── prep_001_python/            — example session folder (generated)
        ├── session_log.md          — candidate reflection, written after session
        ├── review.md               — AI review output, generated by scripts
        ├── memory/
        │   └── MEMORY.md           — auto-written by Claude Code at END SESSION
        ├── plan/
        │   ├── scratch.md          — candidate notes from session
        │   ├── plan.md             — candidate plan from session
        │   ├── session_context.md  — interview prompt and session context (from template)
        │   ├── initial_prompt.md   — standardized prompt (from template)
        │   └── WORKORDER.md        — Claude Code generated plan from session
        ├── api/                    — code files from session (Python example)
        ├── db/
        ├── files/
        └── data/
```

---

## Build Status

**Overall Progress: 100% complete** (7 of 7 build sections done)

### Completed
- **CLAUDE.md** (2026-08-25, updated 2026-08-25) — root context, behavior rules, memory structure; updated prompt/work pair capture format
- **PROJECT_SPEC.md** (2026-08-25, updated 2026-08-25) — build specification with skeleton architecture updates
- **README.md** (2026-08-25) — human-facing repo introduction for visitors and hiring managers
- **memory/** (2026-08-25) — MEMORY.md (index) and ERRORS.md (failed approaches log)
- **docs/** all 7 files (2026-08-25):
  - TEMPLATE_CLAUDE.md
  - TEMPLATE_session_log.md
  - PROMPT_session_review.md
  - TEMPLATE_SKELETON_target.md
  - STRUCTURE_skeleton.md (universal skeleton definitions)
  - SKELETON_python_fastapi.md (language-specific implementation guide)
  - SKELETON_typescript_express.md (language-specific implementation guide)
- **templates/python/** (2026-08-25) — complete FastAPI template with 12 files and skeleton code
  - CLAUDE.md (Python-specific), README.md, requirements.txt, config.yaml
  - memory/MEMORY.md (placeholder), plan/ files (3 placeholders)
  - api/main.py (FastAPI skeleton with 6 route handlers)
  - db/database.py (SQLite skeleton with 8 database operations)
  - files/file_io.py (File I/O skeleton with 13 operations)
  - templates/index.html (Jinja2 template skeleton)
  - Empty directories: data/, inputs/, outputs/, logs/, tests/
- **templates/typescript/** (2026-08-25) — complete Express template with skeleton files (6 directories, 14 files)
  - CLAUDE.md (TypeScript-specific), README.md, package.json, tsconfig.json, config.yaml
  - memory/MEMORY.md (placeholder), plan/ files (3 placeholders)
  - src/api/server.ts, src/db/database.ts, src/files/fileIO.ts (skeleton stubs)
  - Empty directories: data/, inputs/, outputs/, logs/, tests/
- **scripts/** (2026-08-25, completed 2026-08-25):
  - gen_session.sh (creates new session folders from templates)
  - gen_session_log.sh (compiles session log from artifacts)
  - gen_session_review.sh (runs AI review on completed session)
  - review_compiler.py (converts JSON review to formatted markdown)
- **sessions/** (2026-08-25) — empty folder for generated practice runs

---

## Template Environments

Two template environments exist. Both cover the same three problem shapes:
file I/O, database I/O via SQLite, and a backend API. The templates are
pre-configured so zero setup time is lost during an interview.

### Why two environments?
Python is the primary stack — most comfortable for rapid prototyping. 
TypeScript/Node exists as an alternative for interviews where a 
JavaScript-friendly stack is preferred or requested. Having both ready 
removes a decision point under pressure.

### Why these three skeleton files?
File I/O, database I/O, and a backend API cover the vast majority of
likely interview prompt types for a GovTech SaaS company. Pre-built
skeletons with commented function stubs mean Claude Code starts with
a working scaffold rather than a blank file.

### Python Stack
- Backend: FastAPI + Uvicorn
- Templates: Jinja2 served through FastAPI (not static files)
- Database: SQLite via Python sqlite3 stdlib — no ORM
- Why FastAPI over Flask: more modern, automatic API docs via /docs,
  cleaner async story, better signals modern Python thinking

### TypeScript Stack
- Runtime: Node.js
- Backend: Express + TypeScript
- Database: SQLite via better-sqlite3
- Why better-sqlite3: synchronous API, simpler mental model under
  time pressure than async alternatives

### Template Conventions (both stacks)
- All business logic lives in the backend — templates and HTML stay thin
- All DB access through the database skeleton file — no SQL elsewhere
- All file I/O through the file_io skeleton — no raw file handling elsewhere
- Templates are never modified during a practice session — gen_session.sh
  copies them; the originals stay clean

---

## Configuration and Logging System

### config.yaml
Each template includes a `config.yaml` file that is NOT a stub—it contains actual configuration
values. It gets copied as part of the template and is used at runtime when code runs in a session 
folder. Configuration sections include:

- **logging:** level (INFO/DEBUG/ERROR), output file path, format string
- **database:** SQLite database file path
- **api:** host and port for web framework templates
- **outputs:** directory where file I/O functions write results

See docs/STRUCTURE_functions.md for complete config schema and defaults.

### Logging Format
All modules log via standardized functions with consistent formatting:
```
2026-08-25T14:32:15.123456 | module.function_name | log message
```
Logging level controls verbosity: INFO (all operations), DEBUG (structured detail), ERROR (errors only).
Default logging level is DEBUG for interview prep environments.

### outputs/ Folder
All file I/O write operations (CSV, JSON, markdown exports) write to the `outputs/` folder defined 
in config.yaml. This keeps generated files organized separately from code and makes them easy to 
review after a session.

---

## Skeleton Folder and File Structure

Every template environment contains a consistent folder structure with universal folders and 
language-specific code folders. This section describes both.

### Universal Folders and Files

These exist in EVERY template, regardless of language or purpose:

```
template/
├── CLAUDE.md                   — interview session context and behavior rules
├── README.md                   — quick reference for this template
├── config.yaml                 — application configuration (actual values, not a stub)
├── memory/
│   └── MEMORY.md               — placeholder, auto-written by Claude Code at END SESSION
├── plan/
│   ├── scratch.md              — empty, candidate fills in during session
│   ├── plan.md                 — empty, candidate fills in during session
│   └── WORKORDER.md            — empty, Claude Code generates this
├── inputs/                     — empty, for input data files (CSV, JSON, etc.)
├── outputs/                    — empty, created at runtime, where file I/O writes results
├── logs/                       — empty, created at runtime by logging system
└── tests/                      — empty, for test files (optional per template)
```

### Language/Framework-Specific Folders

These vary based on what the skeleton does. The current templates are web/API skeletons:

**Python/FastAPI example:**
```
├── requirements.txt            — Python dependencies
├── api/
│   └── main.py                 — FastAPI entry point and route handlers
├── db/
│   └── database.py             — SQLite database operations
├── files/
│   └── file_io.py              — file I/O operations
├── templates/
│   └── index.html              — Jinja2 template skeleton
└── data/                       — empty, for sample input files
```

**TypeScript/Express example:**
```
├── package.json                — Node.js dependencies
├── tsconfig.json               — TypeScript configuration
├── src/
│   ├── api/
│   │   └── server.ts           — Express entry point and route handlers
│   ├── db/
│   │   └── database.ts         — SQLite database operations
│   └── files/
│       └── fileIO.ts           — file I/O operations
└── data/                       — empty, for sample input files
```

### Skeleton File Purposes

All code skeleton files are STUBS ONLY — they contain function definitions with docstrings and 
comments, but NO implementation code. The candidate fills in implementations during the session.

**Why stubs?**
- Remove setup friction (no blank files to start with)
- Demonstrate expected function signatures and patterns
- Constrain scope (focus on solving the interview problem, not framework setup)
- Scaffold the solution space without pre-solving it

### Skeleton Documentation

Each language/framework has a dedicated skeleton guide:

- **docs/STRUCTURE_skeleton.md** — Universal skeleton structure and function categories (applies to ALL templates)
- **docs/SKELETON_python_fastapi.md** — Python/FastAPI specific implementation details
- **docs/SKELETON_typescript_express.md** — TypeScript/Express specific implementation details
- **docs/TEMPLATE_SKELETON_target.md** — Template for creating new skeleton implementation guides

When adding a new template type, create a new SKELETON_*.md file following the TEMPLATE pattern.

---

## Session Workflow

### Starting a session
Run gen_session.sh with the stack type:
```
./scripts/gen_session.sh python
./scripts/gen_session.sh typescript
```
This creates a new numbered session folder under sessions/ by copying
the matching template. Open the generated folder in VSCode with Claude
Code. Never open the template folder directly for a practice run.

### During a session
The required sequence inside a session is:
1. Copy interview prompt into plan/session_context.md (if not already provided)
2. Paste the initial prompt from plan/initial_prompt.md into Claude Code
3. Write notes in plan/scratch.md
4. Write approach in plan/plan.md
5. Prompt Claude Code to generate plan/WORKORDER.md — wait for approval
6. Execute the WORKORDER in chunks
7. Say END SESSION when done

### Ending a session
When you say END SESSION, Claude Code proposes a structured summary with:
- Worked on, Completed, In progress sections
- Decisions made, Assumptions/risks flagged
- Next session priorities
- **Prompt/work pairs** — one entry per prompt/response in the session:
  ```
  ---
  Prompt: <verbatim prompt text>
  Work: <summary of what was proposed/worked on>
  ---
  ```

Wait for confirmation, then Claude Code auto-writes memory/MEMORY.md with this
content — no second confirmation step. This is intentional: time is short,
the output is scoped to the session folder, and the auto-write behavior
is itself a demonstration artifact.

**Prompt/work pairs must be written every time, never omitted or summarized.**
These pairs are the backbone of the session log for later review and analysis.

### After a session
1. Run gen_session_log.sh to compile the session log:
   ```
   ./scripts/gen_session_log.sh prep_001_python
   ```
2. Open sessions/prep_001_python/session_log.md and fill in the
   sections that require your voice (Initial Read, The Why, How the
   Session Went, What I Would Do Next, What I Would Harden, Score Yourself)
3. Run gen_session_review.sh to get the AI review:
   ```
   ./scripts/gen_session_review.sh prep_001_python
   ```
4. Commit everything to GitHub

---

## Scripts

### gen_session.sh
**Input:** stack type — "python" or "typescript"
**Behavior:**
1. Scan sessions/ and determine the next session number (zero-padded: 001, 002)
2. Create sessions/prep_00X_[stack]/
3. Copy the matching template into the new session folder
4. Optionally open the new folder in VSCode

**Why zero-padded numbering:** keeps sessions sorted chronologically in
the file browser automatically without requiring date-based naming.

**Adding a new template type:** add the template folder under templates/,
then add the new type as a valid argument in gen_session.sh. No other
changes needed — the script is stack-agnostic by design.

---

### gen_session_log.sh
**Input:** session folder name — e.g. "prep_001_python"
**Behavior:**
1. Read sessions/[name]/plan/scratch.md
2. Read sessions/[name]/plan/plan.md
3. Read sessions/[name]/plan/WORKORDER.md
4. Read sessions/[name]/memory/MEMORY.md
5. Compile into sessions/[name]/session_log.md using TEMPLATE_session_log.md
   as the structure — pre-populating The Prompt, The WORKORDER reference,
   and the Claude Code Session Log reference
6. Leave candidate reflection sections blank for manual completion

**Why not paste WORKORDER and memory content into the log:**
Both files already exist in the session folder. Duplicating content
creates maintenance overhead and makes the repo heavier than needed.
The session log references them; it does not replace them.

---

### gen_session_review.sh
**Input:** session folder name — e.g. "prep_001_python"
**Behavior:**
1. Read the review prompt from docs/PROMPT_session_review.md
2. Read sessions/[name]/plan/WORKORDER.md
3. Read sessions/[name]/session_log.md
4. Read sessions/[name]/memory/MEMORY.md
5. Assemble all artifacts into the prompt, injecting the JSON schema
6. Pipe to claude -p
7. Capture JSON output
8. Pass to review_compiler.py
9. Write output to sessions/[name]/review.md

**Why claude -p:** consistent with the tooling used in sessions,
simple, no additional dependencies or API key management needed.

**Why JSON + review_compiler.py instead of asking Claude to write
the file directly:** structured JSON output is predictable and
parseable. review_compiler.py controls the final presentation exactly.
Consistent schema across sessions makes runs comparable over time.
Asking Claude to format markdown directly produces inconsistent results.

---

### review_compiler.py
**Input:** JSON string (piped from gen_session_review.sh)
**Output:** formatted markdown written to sessions/[name]/review.md

**Behavior:**
1. Parse JSON
2. Render scoring dimensions as a table with scores and feedback
3. Render reviewer perspectives as named sections with would_hire verdict
4. Render verdict block as the closing section
5. Write to the session folder passed as argument

---

## Memory System

### Root memory/
Lives at the repo root. Tracks meta-work — building the repo, designing
templates, design decisions made during construction. Committed and visible.
Written by Claude Code at END SESSION with confirmation step (root context
only — no time pressure).

Contains:
- MEMORY.md — session log index
- ERRORS.md — failed approaches, checked before trying similar tasks

### Template memory/
Each template folder contains an empty memory/ with a placeholder MEMORY.md.
This gets copied into each session folder by gen_session.sh. The session's
memory/ is populated by Claude Code at END SESSION — auto-write, no
confirmation. Scoped entirely to that session.

---

## Review System

### Scoring dimensions
The AI reviewer evaluates six dimensions, each scored 0-10:

1. **problem_decomposition** — did the candidate break the problem down
   clearly before touching anything? High = clear restatement, explicit
   assumptions, scope decision before any code.

2. **question_quality** — did they ask the right questions before building?
   High = identified ambiguity, named what a real engineer would need to know.

3. **ai_direction** — did they lead the AI or follow it? High = approved
   plans, redirected when needed, pushed back on output.

4. **scope_judgment** — smart tradeoffs under time pressure. High = finished
   something coherent rather than attempting everything and finishing nothing.

5. **production_thinking** — awareness beyond the happy path. High = named
   what's missing, fragile, or assumed.

6. **communication_clarity** — session log readable by any audience.
   High = thinking is visible and followable.

### Reviewer perspectives
Two named reviewer lenses provide independent feedback:
- VP of Engineering — would I trust this person to lead a team through
  ambiguous, time-boxed problems?
- Software Architect — did they demonstrate sound structural thinking
  within a constrained scope?

Each perspective includes a would_hire boolean. This forces a position
rather than a hedge.

### Verdict
A narrative "Is this person awesome?" assessment — one paragraph, holistic,
not derived from the score average. Plus: strongest signal, biggest gap,
one thing to improve next time.

### What is NOT scored
Code quality, syntax, or whether the solution is fully working. A complete,
fully working solution is not the goal or expectation of a 45-minute session.
The scoring reflects judgment, thinking, and leadership — not implementation.

---

## JSON Review Schema

```json
{
  "session": "prep_001_python",
  "date": "[date]",
  "stack": "python",
  "scoring": {
    "problem_decomposition": { "score": 0, "max": 10, "feedback": "" },
    "question_quality": { "score": 0, "max": 10, "feedback": "" },
    "ai_direction": { "score": 0, "max": 10, "feedback": "" },
    "scope_judgment": { "score": 0, "max": 10, "feedback": "" },
    "production_thinking": { "score": 0, "max": 10, "feedback": "" },
    "communication_clarity": { "score": 0, "max": 10, "feedback": "" },
    "overall": { "score": 0, "max": 10 }
  },
  "reviewer_perspectives": {
    "vp_engineering": { "feedback": "", "would_hire": true },
    "software_architect": { "feedback": "", "would_hire": true }
  },
  "verdict": {
    "is_this_person_awesome": "",
    "strongest_signal": "",
    "biggest_gap": "",
    "one_thing_to_improve": ""
  }
}
```

---

## Design Decisions

### Why public repo
Transparency is the point. Showing a hiring manager not just the templates
but the full design process, practice runs, and iteration is a stronger
signal than a polished artifact with no visible history. 

### Why sessions keep code
Early design considered log-only sessions to keep the repo lighter. Rejected
because the code is the concrete evidence of what was produced in 45 minutes.
A hiring manager who wants to dig deep can read both the reflection and the
output. The log describes; the code proves.

### Why the WORKORDER step is required
The WORKORDER forces problem decomposition before implementation. Skipping it
— even for simple prompts — removes the most visible signal that the candidate
is directing the AI rather than following it. The CLAUDE.md instruction
"never skip the WORKORDER step even if the task seems simple" exists because
the temptation to skip it under time pressure is exactly when it matters most.

### Why END SESSION is auto-write in template sessions
The root END SESSION has a confirmation step because decisions made there
affect a public repo and carry weight. Template session END SESSION is
auto-write because the output is scoped to one practice run folder, time
is short, and the write behavior itself is a demonstration artifact —
showing a smooth, practiced workflow matters.

### Why two reviewer perspectives
The interview panel includes a VP of Engineering and a Software Architect.
These are real people with real perspectives. The scoring lenses reflect 
common engineering interview panel roles.

### Why overall score is not an average
A candidate can score unevenly across dimensions and still be excellent.
The overall score is a holistic assessment — the reviewer's judgment, not
arithmetic. This prevents a weak dimension from mathematically dragging
down a strong overall impression.

---

## Skeleton File Conventions

### What skeleton files contain
Each skeleton file provides:
- Module docstring explaining the file's role and how to use it
- Import block with common dependencies pre-imported, others commented out
- Function stubs with docstrings, typed signatures, and inline comments
  explaining what each function should do
- No implementation — stubs only

### Why stubs not implementations
The skeletons exist to remove setup friction, not to pre-solve problems.
Claude Code fills in implementations based on the actual prompt. Pre-built
implementations would constrain the solution space and make the skeleton
feel like a starting template rather than a scaffold.

### plan/ files
All three plan/ files (scratch.md, plan.md, WORKORDER.md) ship as empty
files with a single comment line explaining their purpose. They are
populated during the session.

### config.yaml and output directories
Unlike skeleton code files, `config.yaml` is a configuration file with actual values (not function 
stubs). It gets copied as part of the template and is used at runtime when code runs in a session 
folder. The `outputs/` and `logs/` directories are created empty and populated at runtime by the 
application.

---

## Adding a New Template

To add a new template environment (e.g. C#):
1. Create templates/csharp/ following the same structure as python/ and
   typescript/
2. Write a CLAUDE.md for that stack using TEMPLATE_CLAUDE.md as the source
3. Create skeleton files based on relevant categories in docs/STRUCTURE_skeleton.md
4. Create config.yaml with applicable sections (logging always, database/api/outputs as needed)
5. Create empty outputs/ directory
6. Add "csharp" as a valid argument in gen_session.sh
7. No other changes needed — gen_session_log.sh and gen_session_review.sh
   are stack-agnostic

---

## Build Instructions for Claude Code

When handed this document, build in this order:

1. Root files: CLAUDE.md (already written — do not overwrite),
   README.md (see README section below — build from scratch)
2. memory/ folder with empty MEMORY.md and ERRORS.md
3. docs/ files: TEMPLATE_CLAUDE.md, TEMPLATE_session_log.md, PROMPT_session_review.md,
   TEMPLATE_SKELETON_target.md, STRUCTURE_skeleton.md, SKELETON_python_fastapi.md, and
   SKELETON_typescript_express.md already exist — do not overwrite.
4. templates/python/ — all folders, CLAUDE.md (Python stack variant),
   requirements.txt, config.yaml, skeleton files, empty plan/ files, empty data/,
   empty inputs/, empty outputs/, empty logs/, empty tests/
5. templates/typescript/ — all folders, CLAUDE.md (TypeScript stack variant),
   package.json, tsconfig.json, config.yaml, skeleton files, empty plan/ files,
   empty data/, empty inputs/, empty outputs/, empty logs/, empty tests/
6. scripts/ — gen_session.sh, gen_session_log.sh, gen_session_review.sh,
   review_compiler.py
7. sessions/ — empty folder only, no contents

Propose each section before building. Wait for confirmation. Never build
more than one section at a time without confirmation.
