# Approach Plan

Your intended approach before prompting Claude Code. Populate this before requesting the WORKORDER.

## Approach
FastAPI POST endpoint at /api/permits/generate. Database initializes 
on startup. Each call inserts a new record and returns the generated ID.

## What I'm building
- database.py: permits table, init on startup, insert and get last ID
- main.py: single POST route, calls database, returns JSON response

## What I'm NOT building
- GET lookup endpoint
- Frontend display
- File I/O

## Assumptions
- XXXX resets to 0001 if table is empty
- No auth needed
- created_at is UTC timestamp
- Table created automatically on first run