# Testing Guide — Inspection Scheduling API

## Prerequisites

Install dependencies and start the server:
```bash
npm install
npm run dev
```

Server will run on `http://127.0.0.1:8006` (configured in config.yaml)

**Note:** Database is automatically initialized on startup using sql.js. SQLite file is persisted to `./data/database.db`

---

## Test Scenarios

### 1. POST with valid address and valid inspection type

```bash
curl -X POST http://127.0.0.1:8006/api/inspections \
  -H "Content-Type: application/json" \
  -d '{
    "address": "123 Main Street",
    "inspection_type": "electrical"
  }'
```

**Expected response (200):**
```json
{
  "status": "success",
  "confirmationId": "INS-0001",
  "scheduledDate": "2026-08-27",
  "message": "Inspection Scheduled! Your inspection date is: 2026-08-27. Confirmation Number: INS-0001"
}
```

---

### 2. POST with valid address and invalid inspection type

```bash
curl -X POST http://127.0.0.1:8006/api/inspections \
  -H "Content-Type: application/json" \
  -d '{
    "address": "456 Oak Avenue",
    "inspection_type": "hvac"
  }'
```

**Expected response (400):**
```json
{
  "status": "error",
  "message": "Inspection type must be one of: electrical, plumbing, structural"
}
```

---

## Additional Test Scenarios

### 3. POST with empty address

```bash
curl -X POST http://127.0.0.1:8006/api/inspections \
  -H "Content-Type: application/json" \
  -d '{
    "address": "",
    "inspection_type": "plumbing"
  }'
```

**Expected response (400):**
```json
{
  "status": "error",
  "message": "Address is required and must be a non-empty string"
}
```

---

### 4. POST with missing address field

```bash
curl -X POST http://127.0.0.1:8006/api/inspections \
  -H "Content-Type: application/json" \
  -d '{
    "inspection_type": "structural"
  }'
```

**Expected response (400):**
```json
{
  "status": "error",
  "message": "Address is required and must be a non-empty string"
}
```

---

### 5. GET all inspections

```bash
curl http://127.0.0.1:8006/api/inspections
```

**Expected response (200):**
```json
{
  "inspections": [
    {
      "id": 1,
      "address": "123 Main Street",
      "inspection_date": "2026-08-27",
      "confirmation_id": "INS-0001",
      "created_at": "2026-08-26T..."
    }
  ]
}
```

---

## Edge Case Testing

### 6. POST on Friday (should schedule for Monday)

Run this on a Friday to verify next weekday calculation:
```bash
curl -X POST http://127.0.0.1:8000/api/inspections \
  -H "Content-Type: application/json" \
  -d '{
    "address": "789 Elm Road",
    "inspection_type": "electrical"
  }'
```

**Expected:** `scheduledDate` should be 3 days later (Monday)

---

### 7. Sequential confirmation IDs

Run multiple POST requests to verify ID increments:
```bash
# First inspection
curl -X POST http://127.0.0.1:8006/api/inspections \
  -H "Content-Type: application/json" \
  -d '{"address": "111 A St", "inspection_type": "electrical"}'

# Second inspection
curl -X POST http://127.0.0.1:8006/api/inspections \
  -H "Content-Type: application/json" \
  -d '{"address": "222 B St", "inspection_type": "plumbing"}'
```

**Expected:** First returns `INS-0001`, second returns `INS-0002`

---

## Test Execution Checklist

- [ ] Valid request returns 200 with confirmation ID and scheduled date
- [ ] Invalid inspection type returns 400 with error message
- [ ] Empty/missing address returns 400 with error message
- [ ] GET returns all inspections sorted by date
- [ ] Confirmation IDs are sequential (INS-0001, INS-0002, etc.)
- [ ] Weekday scheduling skips Saturday/Sunday
- [ ] Multiple requests increment ID correctly
