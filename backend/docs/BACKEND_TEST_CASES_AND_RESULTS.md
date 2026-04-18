# BlockCert Backend — Test Cases and Expected Results

Use this section in your major project documentation (System Testing / API Testing).  
**Base URL (local):** `http://localhost:5000` or `http://<LAN-IP>:5000`  
**API prefix:** `/api`

---

## 0. Testing coverage — what was actually executed vs documented

| Category | Status | Notes |
| -------- | ------ | ----- |
| **Automated (Jest)** | Only **`src/services/hashService.js`** (`generateFileHash`) | 4 unit tests in `tests/hashService.test.js`. **No HTTP calls**, no DB, no blockchain. |
| **HTTP / controller endpoints** | **Not automated** in this repo | Endpoints below are **manual test cases** or **integration/UAT** scenarios. Expected results are derived from route + controller behaviour; they were **not** all executed by Jest in CI. |
| **This document** | Mix of **automated** (hash unit tests), **manual / UAT** tables, and **illustrative dummy data** | Dummy tokens, IDs, and sample JSON in §9 are **for documentation only** — replace with real values during your own UAT. |

**For your report you can write:**  
*“Automated tests cover certificate file hashing (SHA-256). Remaining API endpoints were documented and validated through manual / environment-based integration testing as per the test case tables below.”*

**Note:** Jest and other **devDependencies** do **not** block `npm start` or `npm run dev`; they are only used when you run `npm test`.

---

## 1. Automated unit tests (Jest) — verified execution

| Test ID | Module / Feature | Description | Expected result |
| ------- | ---------------- | ----------- | ----------------- |
| **TC-H01** | `hashService` | Same file hashed twice | Identical 64-character lowercase hex |
| **TC-H02** | `hashService` | Different file contents | Two different hashes |
| **TC-H03** | `hashService` | Empty file SHA-256 | `e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855` |
| **TC-H04** | `hashService` | File content `hello` | `2cf24dba5fb0a30e26e83b2ac5b9e29e1b161e5c1fa7425e73043362938b9824` |

**How to run (from `backend` folder):**

```bash
npm install
npm test
```

**Sample pass output (documentation-ready):**

```
PASS tests/hashService.test.js
  hashService — generateFileHash
    ✓ TC-H01: returns deterministic SHA-256 hex for same file content
    ✓ TC-H02: different file content produces different hash
    ✓ TC-H03: known vector — empty file SHA-256
    ✓ TC-H04: known vector — string 'hello'

Test Suites: 1 passed, 1 total
Tests:       4 passed, 4 total
```

---

## 2. Full API route inventory (from `src/routes` + `app.js`) — manual / UAT

HTTP rows below: **no automated Jest coverage** (add supertest/mocks later if desired). **Exception:** `hashService` is covered by `tests/hashService.test.js` (not an HTTP route).

| # | Method | Full path | Auth | Controller area |
|---|--------|-----------|------|-------------------|
| 1 | GET | `/` | No | App root — health |
| 2 | GET | `/api/blockchain/status` | No | Blockchain status |
| 3 | POST | `/api/admin/login` | No | Admin auth |
| 4 | GET | `/api/admin/institutes` | Admin JWT | Admin |
| 5 | POST | `/api/admin/approve/:id` | Admin JWT | Admin |
| 6 | POST | `/api/institutes/register` | No | Institute register |
| 7 | POST | `/api/institutes/login` | No | Institute auth |
| 8 | POST | `/api/institute-auth/login` | No | Institute auth (alt route) |
| 9 | POST | `/api/students/create` | Institute JWT | Student create |
| 10 | GET | `/api/students/` | Institute JWT | List students |
| 11 | POST | `/api/student-auth/login` | No | Student auth |
| 12 | GET | `/api/student/certificates` | Student JWT | Student dashboard |
| 13 | GET | `/api/public/verify/:certId` | No | Public verify |
| 14 | POST | `/api/public/verify-file/:certId` | No (multipart) | Verify with uploaded PDF |
| 15 | GET | `/api/institute-dashboard/certificates` | Institute JWT | Institute dashboard |
| 16 | POST | `/api/institute-dashboard/revoke/:certId` | Institute JWT | Institute revoke |
| 17 | POST | `/api/certificates/issue` | Institute JWT + multipart | Issue certificate |
| 18 | GET | `/api/certificates/test` | No | Smoke test route |
| 19 | GET | `/api/verify/:certId` | No | Authenticated-style verify (see `verifyRoutes`) |
| 20 | POST | `/api/revoke/:certId` | See `revokeController` | Revoke certificate |

*If any route uses middleware not listed here, confirm in the corresponding `routes/*.js` file before final submission.*

---

## 3. Server health

| Test ID | Method | Endpoint | Preconditions | Expected HTTP | Expected body / behaviour |
| ------- | ------ | -------- | --------------- | ------------- | ------------------------- |
| **TC-S01** | GET | `/` | Server running | 200 | Plain text: `Backend is running` |

---

## 4. Certificate routes (smoke)

| Test ID | Method | Endpoint | Auth | Expected HTTP | Expected body (success path) |
| ------- | ------ | -------- | ---- | ------------- | ---------------------------- |
| **TC-C01** | GET | `/api/certificates/test` | No | 200 | JSON: `{ "message": "Certificate routes working" }` |

---

## 5. Public certificate verification

| Test ID | Method | Endpoint | Preconditions | Expected HTTP | Expected result (summary) |
| ------- | ------ | -------- | --------------- | ------------- | ------------------------- |
| **TC-P01** | GET | `/api/public/verify/:certId` | Valid `certId` in DB + chain readable | 200 | JSON with `valid`, `certId`, `status`, `student`, `institute`, `certificate`, `ipfsURL`, `blockchain`, `hashes` |
| **TC-P02** | GET | `/api/public/verify/INVALID-CERT-ID` | ID not in database | 404 | JSON: `{ "valid": false, "message": "Certificate not found" }` |
| **TC-P03** | GET | `/api/public/verify/:certId` | DB record exists but student/institute missing | 500 | JSON: `{ "valid": false, "message": "Related data missing" }` |

**Sample success response shape (for documentation):**

- `valid`: `true` if certificate `status` is `ACTIVE`, else reflects invalidity for verification UI.
- `hashes.matched`: `true` when stored file hash equals on-chain hash.

---

## 6. Institute — create student (`POST /api/students/create`)

**Headers:** `Authorization: Bearer <institute_jwt>`, `Content-Type: application/json`

| Test ID | Scenario | Request body (fields) | Expected HTTP | Expected message / result |
| ------- | -------- | --------------------- | ------------- | --------------------------- |
| **TC-ST01** | All required fields valid | `name`, `email`, `password`, `studentId`, `program`, `department`, `admissionYear` | 200 | `Student created successfully` + student summary |
| **TC-ST02** | Missing any required field | Omit one or more fields | 400 | `All fields are required` |
| **TC-ST03** | Institute not APPROVED | Valid body, unapproved institute token | 403 | `Institute not approved` |
| **TC-ST04** | Duplicate roll for same institute | Same `studentId` as existing student for that institute | 409 | `Student with this roll number already exists` |
| **TC-ST05** | No / invalid JWT | Valid body, no token | 401 | Unauthorized (middleware) |

---

## 7. Institute — issue certificate (`POST /api/certificates/issue`)

**Headers:** `Authorization: Bearer <institute_jwt>`  
**Body:** `multipart/form-data` — `certificate` (PDF), `studentId`, `type`, `title`, `certificateCategory`

| Test ID | Scenario | Preconditions / input | Expected HTTP | Expected result (summary) |
| ------- | -------- | ---------------------- | ------------- | --------------------------- |
| **TC-IS01** | Success path | Approved institute, wallet matches contract, valid student, valid PDF | 200 | Success message, `certId`, `verifyURL`, `qrCode`, IPFS + tx details |
| **TC-IS02** | No PDF uploaded | Missing `certificate` file | 400 | `Certificate PDF required` |
| **TC-IS03** | Institute not approved | Token for non-approved institute | 403 | `Institute not approved` |
| **TC-IS04** | Wallet mismatch | Issuer wallet ≠ configured contract signer | 403 | `Wallet mismatch. Unauthorized issuer` |
| **TC-IS05** | Missing body fields | Missing `studentId`, `type`, or `certificateCategory` | 400 | Required fields message |
| **TC-IS06** | Student not in institute | `studentId` not linked to institute | 404 | `Student not found in this institute` |

---

## 8. Additional manual test ideas (not run by current Jest suite)

| Test ID | Endpoint (pattern) | Purpose |
| ------- | ------------------ | ------- |
| **TC-B01** | `GET /api/blockchain/status` | Chain connectivity |
| **TC-A01** | `POST /api/admin/login` | Admin token issuance |
| **TC-A02** | `GET /api/admin/institutes` | List pending institutes |
| **TC-A03** | `POST /api/admin/approve/:id` | Approve institute |
| **TC-I01** | `POST /api/institutes/register` | New institute registration |
| **TC-I02** | `POST /api/institutes/login` | Institute login |
| **TC-L01** | `GET /api/students/` | List students for institute |
| **TC-U01** | `POST /api/public/verify-file/:certId` | Verify uploaded PDF against stored hash |
| **TC-R01** | `POST /api/revoke/:certId` or institute revoke | Revocation flow |
| **TC-V02** | `GET /api/verify/:certId` | Non-public verify route behaviour |

---

## 9. Dummy data for documentation / manual Postman runs (illustrative only)

**Do not commit real secrets.** Replace placeholders during UAT.

| Item | Dummy value (example) |
| ---- | ---------------------- |
| Base URL | `http://localhost:5000` |
| Admin JWT | `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.DUMMY_ADMIN_PAYLOAD.SIGNATURE` |
| Institute JWT | `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.DUMMY_INSTITUTE_PAYLOAD.SIGNATURE` |
| Student JWT | `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.DUMMY_STUDENT_PAYLOAD.SIGNATURE` |
| MongoDB ObjectId (institute) | `507f1f77bcf86cd799439011` |
| Certificate ID | `CERT-1776406026256` |
| Student roll (`studentId` in forms) | `22XW1A0551` |

**Dummy JSON — create student (`POST /api/students/create`):**

```json
{
  "name": "Demo Student",
  "email": "demo.student@example.edu",
  "password": "DemoPass123!",
  "studentId": "22XW1A0999",
  "program": "B.Tech",
  "department": "CSE",
  "admissionYear": "2024"
}
```

**Dummy success response shape (illustrative — actual fields depend on controller):**

```json
{
  "message": "Student created successfully",
  "student": {
    "id": "507f191e810c19729de860ea",
    "name": "Demo Student",
    "rollNumber": "22XW1A0999",
    "email": "demo.student@example.edu"
  }
}
```

**Dummy public verify URL:**

`GET http://localhost:5000/api/public/verify/CERT-1776406026256`

---

## 10. Notes for your report

1. **Automated scope:** `hashService` unit tests in `backend/tests/` do **not** call Express, MongoDB, IPFS, or Ethereum.
2. **Endpoint tables:** Describe **intended** behaviour aligned with routes/controllers; full execution requires your deployed `.env`, DB, and chain.
3. **Production:** Replace `localhost` and dummy JWTs with real UAT evidence (screenshots, Postman export, redacted tokens).

---

*BlockCert backend — test documentation. Align test IDs with your SRS / test plan if required.*
