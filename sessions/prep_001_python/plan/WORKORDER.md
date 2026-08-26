# WORKORDER

## Problem Statement
Build a permit intake system where citizens submit applications (name, address, permit type). The backend validates permit type against an allowed list, generates a unique case number, logs all attempts to the database, persists successful applications, and returns confirmation. A simple HTML form collects input and displays results.

## Assumptions
- Single user, no concurrency
- Only permit type requires validation; name/address accepted as-is
- Auto-increment ID from permits table is used for case number generation
- All attempts (success and failure) are logged to permit_application_attempts
- Successful applications link back via permit_id; failed attempts have permit_id = NULL
- JSON responses; simple fetch() for client-side HTTP

## Scope

### In
- Database schema (permits, permit_application_attempts tables)
- POST /api/application/ endpoint
- HTML form + result display
- Case number generation from rowid
- Permit type validation
- Attempt logging
- Human-readable error formatting

### Out
- Email notifications
- File uploads
- Multi-user features
- UI styling beyond functional
- CSRF protection

## Approach
1. **Database**: Initialize `permits` table (id, applicant_name, address, permit_type, case_num, created_at) and `permit_application_attempts` table (id, status_code, response_message, permit_id) on startup
2. **API endpoint**: Accept JSON; validate permit_type; on success: insert permit row, get its ID, format case_num as CASE-{id:04d}, log attempt with permit_id; on failure: log attempt with permit_id=NULL and error message; return JSON
3. **HTML form**: Three text inputs, submit button, response `<div>` with color-coded display (green for success, red for errors)
4. **JavaScript**: Fetch-based submit handler; parse response; display message; clear form on success

## Implementation Steps

1. Update `db/database.py`: Create both tables, add insert function for permits (returns ID), add insert function for attempts
2. Update `api/main.py`: Add POST /api/application/ endpoint with validation and dual logging
3. Create/update `templates/index.html`: Form, response display div, submit handler JavaScript
4. Start server and test via browser

## Risks & Open Questions
None — ready to execute.