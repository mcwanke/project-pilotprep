# WORKORDER

## Problem Statement
Build a FastAPI endpoint that generates unique permit IDs in the format `YYYY-PERMIT-XXXX` (e.g., `2026-PERMIT-0001`), stores them in SQLite with a creation timestamp and default status of "submitted", and returns the generated ID and status to the caller.

## Assumptions
- Year component is the current year (2026 in test context)
- XXXX increments sequentially; starts at 0001 if the database is empty
- No input required—endpoint accepts a simple POST with no request body
- No authentication or validation needed
- `created_at` timestamps are in UTC
- Table is created automatically on first application startup
- Application follows existing stack conventions: type hints, docstrings, business logic in db/database.py

## Scope
**In Scope:**
- Modify `db/database.py`: add `permits` table schema and functions to initialize, insert, and retrieve last permit ID
- Modify `api/main.py`: add POST `/api/permits/generate` endpoint that calls database and returns response
- Application starts cleanly with database initialization

**Out of Scope:**
- GET endpoint to retrieve permits
- Frontend display or UI
- File I/O operations
- Authentication or authorization
- Request validation beyond what FastAPI provides automatically

## Approach
1. **Database Setup**: Create `permits` table with columns: `id` (integer PK), `permit_id` (text, unique), `created_at` (timestamp), `status` (text)
2. **Startup**: Initialize table on app startup if it doesn't exist
3. **Generation Logic**: Query the last permit ID from the database, extract the XXXX component, increment it, format the new ID, and insert the new record
4. **Endpoint**: Create POST `/api/permits/generate` that calls the generation function and returns `{"permit_id": "...", "status": "submitted"}`

## Implementation Steps
1. Update `db/database.py`: add `init_db()`, `get_last_permit_number()`, and `create_permit()` functions
2. Update `api/main.py`: add app startup event to initialize database, add POST route
3. Test the endpoint with a curl or client call
4. Verify response format and database state

## Risks & Open Questions
- None identified. All requirements are clear and scope is well-defined.
