# Scratch Notes

Quick notes during session. Populate this as you think through the problem.
- POST endpoint, no input needed
- generates ID in format YYYY-PERMIT-XXXX
- auto-increment the XXXX part
- store in SQLite: id, created_at, status
- status defaults to "submitted"
- return the new ID and status
- what if db is empty? start at 0001