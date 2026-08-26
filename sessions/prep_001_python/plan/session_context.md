# Session Context

Paste the interview prompt and any session-specific context here.

## Session Prompt

Build a permit application intake API. A citizen can submit a new permit 
application with the following fields: applicant name, address, and permit 
type (one of: building, electrical, plumbing). The API should validate the 
required fields, reject invalid permit types with a clear error, assign a 
generated case number in the format CASE-XXXX, store the application in 
SQLite, and return the case number and a confirmation message. Build a 
simple HTML page served through FastAPI that lets a user submit the form 
and see the result.

## Session Context Notes

- This is a greenfield application, no existing codebase
- No authentication required
- Assume single user, no multi-tenancy
- The HTML form should be simple and functional — no design requirements
- Permit types are fixed: building, electrical, plumbing — no others
- Case numbers must be unique and sequential
- No file uploads required
- SQLite is the expected persistence layer

## Session Inputs

None — no input files provided for this session