# Approach and Plan


Prompt:
Build a simple inspection scheduling API. A user can request a new 
inspection by providing an address and inspection type (one of: electrical, 
plumbing, structural). The API should validate the input, schedule the 
inspection for the next available weekday (no weekends), store it in 
SQLite, and return the scheduled date and a confirmation ID. Expose a 
second endpoint that returns all scheduled inspections sorted by date.

Provided Notes:
- Greenfield, no existing codebase
- No authentication required
- Weekdays only for scheduling — Monday through Friday
- Assume "next available" means the next weekday from today's date
- Confirmation ID format: INS-XXXX, sequential
- No time slots needed — date only
- Inspection types are fixed: electrical, plumbing, structural
- Return dates in ISO 8601 format (YYYY-MM-DD)


Plan to implement:
- Type:API - build POST /api/inspection/ endpoint that passes in structured json with an address (text) and inspection type (text) and returns structured json with a status code, confirmation id, and message
  - Logic: API needs to validate the input. For address (text) 
  - Push to phase 2: handle Address matching against actual address records, skip for phase 1. This is being done due to time constraints. For phase 1 address should be the simple "<number> <streetname>" then for phase 2 we will add city, state, zip, country, and validation of these against a known dataset
  - Logic: for inspection type API validates incoming string is one of: electrical, plumbing, structural. Return an error status if no match is found. API logic can hardcode these for phase 1
  - Push to phase 2: move hardcoded inspection types out of code into a database table for lookup validation. Also research downstream use to see what other data fields would be good to have alongside the string name of the inspection type
  - Logic: generate a unique ID (confirmation_id) as a response if validations on address and inspection type are validated to return in response. The uniqueness should be in the form of ELEC-XXXX, PLMB-XXXX, STRT-XXXX depending on the type of inspection. For these, XXXX is a 4-digit number, incrementing, for each inspection type. Propose a method to generate this as a unique identifier
  - Logic: After generating confirmation id, we need to determine the inspection date. Logic to use: take today's date (scoped to day), add 1 to it. Then check if that date is a saturday or sunday: if it is a saturday, add 2 more days to it, if it is a sunday, add 1 more day to it. This will be stored as the inspection_date
  -API response: message for success should include text similar to: "Inspection Scheduled! YOur inspection date is: <inspection_date>. Confirmation Number: <confirmation_id>". Message for errors or validation failures should return a human-readable message regarding the error

- Type:DB - build a sqlite table to store inspections. Name: "inspections". Columns needed: id, address (text), inspection_date (date scoped to a day), confirmation_id, created_at (timestamp)
