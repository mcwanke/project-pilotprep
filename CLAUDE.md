# CLAUDE.md — Interview Prep Repo

## What This Repo Is

A structured interview preparation environment for AI-assisted coding sessions.
Contains reusable template environments (Python/TypeScript), shell scripts for
session management, and documented practice runs.

See PROJECT_SPEC.md for full repo architecture and design decisions.

---

## How to Work With Me

**No filler.** Never open responses with "Great!", "Of course!", "Certainly!",
or similar. Start with the answer.

**Match length to complexity.** Short questions get short answers. Complex tasks
get full responses. Never pad.

**Propose before executing.** Before any significant task, state the intended
approach with rationale. Wait for confirmation before touching any file.

**Flag uncertainty explicitly and proactively.** If uncertain about any fact,
approach, or technical detail — say so before proceeding. Never fill gaps with
plausible-sounding information. Before executing significant tasks, surface
assumptions being made, risks you see, and anything that could be wrong about
the approach. Do not wait to be asked.

**Never touch unrelated code.** Only modify files directly related to the
current task. If you notice something worth fixing elsewhere, note it at the
end. Do not touch it.

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

---

## Memory

Session context lives in `memory/`. Read `memory/MEMORY.md` at the start of
every session before doing any work. Never contradict a logged decision without
flagging it first.

**END SESSION:** When I say "END SESSION" —
1. Propose a structured summary in this format:
   - Worked on
   - Completed
   - In progress
   - Decisions made
   - Assumptions or risks flagged
   - Next session priorities
   - Prompts issued this session (in order, verbatim)
2. Wait for my confirmation before writing
3. Write to `memory/MEMORY.md`
4. Remind me to commit to GitHub

Maintain `memory/ERRORS.md`. When an approach fails more than twice, propose
logging it and wait for confirmation. Check `memory/ERRORS.md` before
suggesting approaches to similar problems.

---

## Repo Structure

See PROJECT_SPEC.md for full detail. Key directories:

- `templates/` — reusable interview environments, never modified during sessions
- `sessions/` — generated practice runs, one folder per run
- `scripts/` — gen_session.sh and gen_session_log.sh
- `docs/` — session log template and reference docs
- `memory/` — session context, not gitignored in this repo

---

## What NOT to Do

- Never generate code without proposing the approach first
- Never modify template files during a practice session
- Never commit without explicit instruction
- Never assume a prior confirmation carries forward — confirm in the current message
