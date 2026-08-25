# Session: Skeleton Documentation Architecture — 2026-08-25

## Prompts (verbatim, in order)
1. Read CLAUDE.md and PROJECT_SPEC.md completely before doing anything else. Once you have read both, summarize what you understand about this project and what you are being asked to build. Wait for my confirmation before proposing any work.
2. I want to insert a step before we build out the templates/python/ skeleton files. Let's create a docs/STRUCTURE_functions.md file. This should contain: -a list of common db functions that will be created in the skeleton files -a list of common file i/o functinos that will be created in the skeleton files -a list of common UI functions that will be created in the skeleton files
3. your suggestion "making that category API/Route handlers instead," is approved. For the file i/o I think it makes sense to make a few assumptions...
4. Stop. Decide on docs/PROMPT_session_review.md...
5. I have two more changes to make after looking over the repo structure in PROJECT_SPEC.md. Let's add the following folders for each skeleton: inputs/ and tests/
6. what if we generalize STRUCTURE_skeleton.md to the universal scope then make individual files for each individual target skeleton and create a new TEMPLATE_skeleton_target.md file for what those look like?
7. Stop. [Series of clarifying questions about design architecture and scope]
8. [Approvals on all architecture decisions and implementation approach]
9. approved. Go. [Execute all remaining work]

## Worked On
- Designed universal skeleton documentation architecture
- Created comprehensive skeleton implementation guides for Python/FastAPI and TypeScript/Express
- Refactored function definitions from language-specific to universal scope
- Extended template folder structures with inputs/ and tests/ folders
- Updated PROJECT_SPEC.md to reflect new documentation hierarchy and folder additions

## Completed
- **docs/STRUCTURE_skeleton.md** — Universal skeleton structure and functions (language/framework agnostic)
  - 200+ lines documenting universal folders, file purposes, function categories
  - Database Functions, File I/O Functions, API/Route Handlers, Logging Functions
  - Config structure and implementation notes
  - Extensible design for future template types
- **docs/TEMPLATE_SKELETON_target.md** — Template for creating skeleton implementation guides
  - Complete template with all sections documented
  - Instructions on how to copy, rename, and customize
  - Examples for both Python and TypeScript patterns
- **docs/SKELETON_python_fastapi.md** — Python/FastAPI specific implementation
  - Complete folder structure documentation
  - api/main.py, db/database.py, files/file_io.py, templates/index.html purposes and patterns
  - Function naming conventions (snake_case)
  - Error handling, logging, config patterns
  - Quick start guide for interview sessions
- **docs/SKELETON_typescript_express.md** — TypeScript/Express specific implementation
  - Complete folder structure documentation
  - src/api/server.ts, src/db/database.ts, src/files/fileIO.ts purposes and patterns
  - Function naming conventions (camelCase)
  - TypeScript type patterns and strict mode
  - Error handling, logging, config patterns
  - Quick start guide for interview sessions
- **PROJECT_SPEC.md updates:**
  - Repo Structure: added inputs/ and tests/ folders to both Python and TypeScript templates
  - docs/ folder: documented TEMPLATE_SKELETON_target.md, STRUCTURE_skeleton.md, SKELETON_python_fastapi.md, SKELETON_typescript_express.md
  - New "Skeleton Folder and File Structure" section (100+ lines)
    - Universal folders and files
    - Language/framework-specific folders with examples
    - Skeleton file purposes and why stubs-only approach
    - Documentation references
  - "Adding a New Template" section: updated to reference STRUCTURE_skeleton.md and new docs
  - "Build Instructions" section: updated to include all 4 new docs and inputs/, tests/, logs/ folders
- **docs/STRUCTURE_skeleton.md (renamed):** Changed default logging level from INFO to DEBUG
- **Deleted:** docs/STRUCTURE_functions.md (replaced by STRUCTURE_skeleton.md)

## In Progress
- None

## Decisions Made
- **Three-tier documentation architecture:**
  1. STRUCTURE_skeleton.md — Universal skeleton definitions (applies to ALL templates regardless of language/purpose)
  2. TEMPLATE_SKELETON_target.md — Template/guide for creating new skeleton implementation docs
  3. SKELETON_*.md files — Language/framework-specific implementation details (SKELETON_python_fastapi.md, SKELETON_typescript_express.md, etc.)
  - Rationale: Keeps universal definitions clean and language-agnostic; allows language-specific docs to grow without cluttering universal docs; extensible for new template types

- **Added two new universal folders:**
  1. inputs/ — For input data files (CSV, JSON, etc.) during session, separate from data/ which is for sample files
  2. tests/ — For test files (optional per template)
  - Rationale: Organizes files by purpose (inputs to process, outputs generated, tests for verification)

- **Default logging level: DEBUG** (not INFO)
  - Rationale: Interview prep environments benefit from detailed visibility into what's happening

- **Function categories in STRUCTURE_skeleton.md:**
  - Database Functions (universal across backends)
  - File I/O Functions (universal across all file-processing templates)
  - API/Route Handlers (universal pattern for web frameworks)
  - Logging Functions (universal across all templates)
  - Config Structure (universal)
  - Rationale: Each category applies to the template types that need it; allows future templates to pick and choose without forcing unnecessary categories

- **Folder order in Repo Structure:** data/, inputs/, outputs/, logs/, tests/, config.yaml
  - Rationale: Grouped by purpose (sample data, session inputs, session outputs, logs, tests, then config)

## Assumptions & Risks Flagged
- None

## Next Session Priorities
1. Build templates/python/ directory structure with all skeleton files
   - api/main.py — FastAPI entry point skeleton
   - db/database.py — SQLite database operations skeleton
   - files/file_io.py — File I/O operations skeleton
   - templates/index.html — Jinja2 template skeleton
   - plan/ folder files (scratch.md, plan.md, WORKORDER.md)
   - config.yaml (actual configuration file with defaults)
   - Empty folders: memory/, inputs/, outputs/, logs/, tests/, data/
   - requirements.txt with FastAPI, Uvicorn, and common dependencies
2. Build templates/typescript/ directory structure with all skeleton files
   - src/api/server.ts — Express entry point skeleton
   - src/db/database.ts — SQLite database operations skeleton
   - src/files/fileIO.ts — File I/O operations skeleton
   - plan/ folder files (scratch.md, plan.md, WORKORDER.md)
   - config.yaml (actual configuration file with defaults)
   - Empty folders: memory/, inputs/, outputs/, logs/, tests/, data/
   - package.json with Express, better-sqlite3, TypeScript dependencies
   - tsconfig.json with strict mode enabled
3. Update template CLAUDE.md files (Python and TypeScript) to reference config.yaml, inputs/outputs/logs structure, and new skeleton documentation
4. Build scripts/ folder
   - gen_session.sh — create new session from template
   - gen_session_log.sh — compile session log
   - gen_session_review.sh — run AI review
   - review_compiler.py — convert JSON review to markdown

## Notes
- Skeleton documentation is now extensible and language-agnostic. Adding a new template type (e.g., Go CLI, C# ASP.NET, Rust) requires:
  1. Creating SKELETON_[language]_[framework].md file following TEMPLATE_SKELETON_target.md pattern
  2. Copying relevant function categories from STRUCTURE_skeleton.md
  3. Documenting language-idiomatic implementations
  4. Updating references in PROJECT_SPEC.md
- The three-tier architecture successfully separates concerns: universal definitions, implementation templates, and language-specific guides
- All documentation references are now internally consistent across STRUCTURE_skeleton.md, TEMPLATE_SKELETON_target.md, SKELETON_*.md files, and PROJECT_SPEC.md
