# Scratch Notes

Quick notes during session. Populate this as you think through the problem.

Copying the prompt in here for visibility:
Build a permit application intake API. A citizen can submit a new permit 
application with the following fields: applicant name, address, and permit 
type (one of: building, electrical, plumbing). The API should validate the 
required fields, reject invalid permit types with a clear error, assign a 
generated case number in the format CASE-XXXX, store the application in 
SQLite, and return the case number and a confirmation message. Build a 
simple HTML page served through FastAPI that lets a user submit the form 
and see the result.

What I am seeing from this prompt:
- we are building the API, but also need to build a simple html frontend to validate the API buildout
- html needs the following: a form with input fields, and have output data/text fields that can show errors and/or the generated case number and confirmation message
-sqlite is the db. We should have the following fields in the db: id, applicant_name (text), address (text), permit type (text), case_num (text), created_at (timestamp)
-i was initially going to use a dropdown for permit type, but the prompt calls for a rejection of invalid permit types, so this implies an entry field for freeform text
-it also says that the API will validate, so for this effort we will skip UI validation. This means that we will skip injection checking and other data validation and assume other than the permit type, we will just accept and store the text for other fields. In a production system this should be a lot more robust and check more on the entry side and do things like address verification
-notes state no auth required and this is a single user system. We avoid complexities, but again, this is another area that we would want a lot more validation on for a production system