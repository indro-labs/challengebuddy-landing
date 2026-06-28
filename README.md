# ChallengeBuddy Landing

React + TypeScript frontend with a Go backend that stores waitlist emails in PostgreSQL.

---

## Prerequisites

- [Node.js](https://nodejs.org/) (v18+)
- [Go](https://go.dev/) (v1.22+)
- [PostgreSQL 17](https://www.postgresql.org/) via Homebrew (`brew install postgresql@17`)

---

## First-time setup

### 1. Start PostgreSQL

PostgreSQL needs to be running before the backend can connect.

```bash
brew services start postgresql@17
```

Verify it's up:

```bash
pg_isready -h localhost -p 5432
# expected: localhost:5432 - accepting connections
```

### 2. Create the database and table

Only needed once. The database `challengebuddy_waitlist` and the `waitlist_emails` table were already created during initial setup, so skip this if you've done it before.

```bash
createdb challengebuddy_waitlist
psql -d challengebuddy_waitlist -f server/database/migrations/001_create_waitlist_emails.sql
```

### 3. Configure environment variables

**Frontend** — `challengebuddy-landing/.env` (already present):
```
VITE_API_URL=http://localhost:3001
```

**Backend** — `challengebuddy-landing/server/.env` (already present):
```
PORT=3001
ENV=development
DATABASE_URL=postgres://challengebuddy:challengebuddy@localhost:5432/challengebuddy_waitlist?sslmode=disable
CORS_ORIGIN=http://localhost:5173
ADMIN_API_KEY=<your admin key>
```

> Neither `.env` file is committed to git. If you're setting up on a new machine, copy `server/.env.example` to `server/.env` and fill in the values.

### 4. Install frontend dependencies

```bash
npm install
```

### 5. Install backend dependencies

```bash
cd server
go mod tidy
cd ..
```

---

## Running locally

Open two terminal windows from the `challengebuddy-landing/` directory.

**Terminal 1 — Go backend:**
```bash
cd server
go run ./cmd/api
# server listening on :3001 (env=development)
```

**Terminal 2 — React frontend:**
```bash
npm run dev
# http://localhost:5173
```

The waitlist form on the landing page will POST emails directly to the backend, which stores them in PostgreSQL.

---

## API endpoints

| Method | Path | Auth | Description |
|--------|------|------|-------------|
| `GET` | `/api/health` | none | Server + database status |
| `POST` | `/api/waitlist` | none | Add an email to the waitlist |
| `GET` | `/api/waitlist` | admin | List all waitlist emails |
| `DELETE` | `/api/waitlist/{id}` | admin | Remove a waitlist entry by ID |

### Admin authentication

Admin routes require an `X-Admin-Key` header matching the `ADMIN_API_KEY` in `server/.env`.

**List all emails:**
```bash
curl http://localhost:3001/api/waitlist \
  -H "X-Admin-Key: <your admin key>"
```

**Delete an entry:**
```bash
curl -X DELETE http://localhost:3001/api/waitlist/<id> \
  -H "X-Admin-Key: <your admin key>"
```

---

## Stopping services

Stop the Go server and frontend with `Ctrl+C` in each terminal.

Stop PostgreSQL when you're done:
```bash
brew services stop postgresql@17
```

---

## Project structure

```
challengebuddy-landing/
├── src/                        # React frontend
│   └── components/
│       └── WaitlistForm.tsx    # Submits to backend /api/waitlist
├── server/                     # Go backend
│   ├── cmd/api/main.go         # Entrypoint
│   ├── internal/
│   │   ├── config/             # Env var loading
│   │   ├── db/                 # PostgreSQL connection pool
│   │   ├── middleware/         # CORS
│   │   ├── health/             # GET /api/health
│   │   ├── waitlist/           # Waitlist handlers, service, routes
│   │   └── server/             # Router setup
│   ├── database/migrations/    # SQL migration files
│   ├── .env                    # Secrets (gitignored)
│   ├── .env.example            # Template for new machines
│   └── Makefile                # make run / make build / make migrate
├── .env                        # Frontend env vars (gitignored)
└── README.md
```
