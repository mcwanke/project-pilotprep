# WORKORDER — Inspection Scheduling API

## Problem Statement

Build a simple inspection scheduling API where users can request inspections by providing an address and inspection type. The system validates inputs, automatically schedules for the next available weekday, stores records in SQLite, stores records in SQLite, and provides a confirmation ID. A second endpoint returns all scheduled inspections sorted by date.

## Assumptions

- Express + TypeScript template already exists with database and server entry points
- "Next available weekday" means starting from tomorrow and skipping weekends
- Confirmation IDs are globally sequential across all inspection types (INS-0001, INS-0002, etc.)
- No concurrent request handling issues need to be addressed (single process, phase 1)
- HTTP status codes: 200 for success, 400 for validation errors, 500 for server errors

## Scope

### Included (Phase 1)
- POST `/api/inspections` endpoint: accept address (any non-empty string) and inspection_type (electrical, plumbing, structural)
- Input validation: non-empty address, valid inspection type
- Confirmation ID generation: query max ID from DB, increment by 1, format as INS-XXXX
- Weekday scheduling logic: start from tomorrow, skip Saturday/Sunday
- SQLite table: `inspections` with columns (id, address, inspection_date, confirmation_id, created_at)
- GET `/api/inspections` endpoint: return all inspections sorted by inspection_date
- JSON request/response format with clear success/error messages

### Explicitly Out of Scope (Phase 2+)
- Address validation against known datasets (city, state, zip, country)
- Inspection type lookup from database table (currently hardcoded)
- Time slots or time-of-day scheduling
- Authentication / authorization
- Concurrent ID generation optimization
- Rate limiting or abuse prevention
- API documentation / Swagger
- Unit tests or integration tests
- **Timezone handling**: Phase 2 should consider timezone-aware date calculations (currently using system timezone)

## Approach

1. **Database Layer** (src/db/database.ts)
   - Create `inspections` table if not exists on startup
   - Implement function to query max confirmation ID and return next sequential ID
   - Implement function to insert new inspection record
   - Implement function to fetch all inspections sorted by date

2. **Weekday Scheduling Logic**
   - Create utility function: given today's date, return next available weekday
   - Algorithm: start from tomorrow, if Saturday add 2 days, if Sunday add 1 day, else use as-is

3. **API Endpoints** (src/api/server.ts)
   - POST `/api/inspections`: validate inputs → generate ID → calculate date → insert → return response
   - GET `/api/inspections`: fetch all records → sort by date → return as JSON array

4. **Error Handling**
   - Validation failures return 400 with descriptive message
   - DB errors return 500 with generic message

## Implementation Steps

1. Create `inspections` table in SQLite with proper schema (id, address, inspection_date, confirmation_id, created_at)
2. Implement `getNextConfirmationId()` function in database.ts
3. Implement `insertInspection()` function in database.ts
4. Implement `getAllInspections()` function in database.ts
5. Implement `getNextWeekday(date)` utility function (weekday scheduling logic)
6. Implement POST `/api/inspections` endpoint with validation, ID generation, scheduling, and insertion
7. Implement GET `/api/inspections` endpoint with sorting
8. Manual testing: POST with valid inputs, verify response and DB storage; POST with invalid inputs, verify error responses; GET, verify sorted output
9. Edge case testing: posting on Friday (next weekday = Monday), Saturday (Monday), Sunday (Monday)

## Risks & Open Questions

- **Concurrency risk**: If multiple requests arrive simultaneously, ID generation via max query could generate duplicates. Mitigation for phase 1: single-threaded Node assumption holds. Phase 2: use DB constraints (UNIQUE on confirmation_id) to catch collisions.
- **Date format assumption**: Using ISO 8601 (YYYY-MM-DD) for all date storage and responses. Confirm this matches expectations.
- **JSON response format**: Exact structure not specified in prompt. Assuming standard format: `{ status: "success"|"error", confirmationId?: string, scheduledDate?: string, message: string }` for POST; `{ inspections: [...] }` for GET.
- **Timezone handling**: Using system/node timezone for "today". If multi-region needed, phase 2 should clarify.
- **Initial ID counter**: First inspection gets INS-0001. If DB is empty, max query returns null; need to handle this edge case.

---

**Estimated scope:** This fits within 45 minutes. Steps 1-7 are straightforward; steps 8-9 will verify correctness.
