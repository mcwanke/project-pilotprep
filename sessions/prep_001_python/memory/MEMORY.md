# Session Memory

Append session memory to this file. Auto-written by Claude Code at END SESSION.

---

## Session 2026-08-25 Python

### Prompts (verbatim, in order)
- Read memory/MEMORY.md first to understand session history, then read CLAUDE.md and plan/session_context.md. Once you have read these, ask any currently open questions then ask what we are building in this session.
- permit_application_attempts table: Should this log all attempts - yes, log all attempts. logic added to plan.md, re-read. Case number format - suggest a way to improve this logic that doesn't add complexity for me to review, if approved then use that in WORKORDER generation. HTML error display - format it, human readable display on the HTML page. Form submission - suggest a simple but reliable approach here for me to review. Any other questions or gaps? Do you have enough to create the WORKORDER?
- approved, write the WORKORDER
- END SESSION

### Worked On
- Session context and requirements review (interview prompt for permit application intake API)
- Open questions and clarifications on case number generation, error display, form submission approach
- WORKORDER generation and approval

### Completed
- WORKORDER written to plan/WORKORDER.md with complete problem statement, assumptions, scope, approach, and implementation steps
- Skeleton project structure reviewed (db/database.py, api/main.py, templates/index.html verified as present)
- All design decisions documented

### In Progress
- Implementation of database layer (permits and permit_application_attempts tables)
- Implementation of API endpoint (POST /api/application/)
- Implementation of HTML form and JavaScript handler
- Server startup and testing

### Decisions Made
- Use auto-increment ID from permits table for case number generation (format: CASE-{id:04d}) — cleaner than counting rows, no extra query needed
- Log all attempts (success and failure) to permit_application_attempts table; failed attempts have permit_id = NULL
- Use vanilla fetch() for form submission (no external dependencies, reliable)
- Color-coded response display (green for success, red for errors) on HTML page
- JSON request/response format for API
- Single endpoint: POST /api/application/ with JSON body and JSON response

### Assumptions & Risks Flagged
- Single-user system, no concurrency handling required
- Only permit_type requires validation; name/address accepted as-is
- No authentication or CSRF protection needed
- Permit types fixed: building, electrical, plumbing
- Case numbers must be unique (guaranteed by auto-increment ID)
- HTML form uses Jinja2 template with embedded JavaScript fetch handler
