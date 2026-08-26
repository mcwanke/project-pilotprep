# Approach Plan

Goal to achieve:
Build a permit application intake API. A citizen can submit a new permit 
application with the following fields: applicant name, address, and permit 
type (one of: building, electrical, plumbing). The API should validate the 
required fields, reject invalid permit types with a clear error, assign a 
generated case number in the format CASE-XXXX, store the application in 
SQLite, and return the case number and a confirmation message. Build a 
simple HTML page served through FastAPI that lets a user submit the form 
and see the result.

Work to do here:

For the Database:
-create a table in the database. This code will go into database.py and instantiate the table on startup if it doesn't exist. Call the table "permits" and it should contain: id, applicant_name (text), address (text), permit type (text), case_num (text), created_at (timestamp)
-create a table called permit_application_attempts. This should have: id, status_code, response_message, and permit_id

For the HTML:
-create a simple form with single row inputs for Applicant Name, Address, Permit Type. These are all freeform text input fields. Add a "Submit" button underneath. Make sure there is a <hr> and some space under the form and add a text area for displaying the response from the API

For the API:
-create an endpoint /api/application/ that takes in applicant_name (text), address (text), permit type (text) and returns a status code (200 success, 400 failure), and message (text)

Logic:
-user access the html page, fills in the fields, hits submit. Button action calls the API endpoint with the form data, receives response, displays response to the user
-for generation of the case number, the logic should be: count the number of rows in the permits table and add 1 to it. That forms the XXX number in CASE-XXXX
-the API endpoint should validate the text input for the Permit Type data. If it is in ["building", "electrical", "plumbing"] then success and generate a case number and generate a message like "Permit Application successfully submitted. Your Case Number is: CASE-XXXX"". If it is not in that list then failure and return a message like: "Permit Application not successful. Invalid Permit Type: <permit_type_text>"
-log all permit application attempts in permit_application_attempts table. if successful, once the permits record is created add that id to the permit_id column for this attempt row