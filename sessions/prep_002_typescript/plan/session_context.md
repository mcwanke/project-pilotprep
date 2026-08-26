# Session Context

Paste the interview prompt and any session-specific context here.

## Session Prompt

Build a simple inspection scheduling API. A user can request a new 
inspection by providing an address and inspection type (one of: electrical, 
plumbing, structural). The API should validate the input, schedule the 
inspection for the next available weekday (no weekends), store it in 
SQLite, and return the scheduled date and a confirmation ID. Expose a 
second endpoint that returns all scheduled inspections sorted by date.

## Session Context Notes

## Session Context Notes
- Greenfield, no existing codebase
- No authentication required
- Weekdays only for scheduling — Monday through Friday
- Assume "next available" means the next weekday from today's date
- Confirmation ID format: INS-XXXX, sequential
- No time slots needed — date only
- Inspection types are fixed: electrical, plumbing, structural
- Return dates in ISO 8601 format (YYYY-MM-DD)

## Session Inputs

None
