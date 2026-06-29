# ChallengeBuddy Landing

React + TypeScript frontend with a Go backend that stores waitlist emails in PostgreSQL.

**Deployed stack:**
- Frontend → [Netlify](https://challengebuddy.netlify.app)
- Backend → [Render](https://challengebuddy-backend.onrender.com)
- Database → [Neon](https://neon.tech) (hosted PostgreSQL)

---

## Prerequisites

- [Node.js](https://nodejs.org/) (v18+)
- [Go](https://go.dev/) (v1.22+)

No local PostgreSQL needed — the database is hosted on Neon.

---

## First-time setup

### 1. Configure environment variables

**Frontend** — create `challengebuddy-landing/.env`:
```
VITE_API_URL=http://localhost:3001
```

**Backend** — create `challengebuddy-landing/server/.env` (copy from `server/.env.example`):
```
PORT=3001
ENV=development
DATABASE_URL=<neon connection string>
CORS_ORIGIN=http://localhost:5173
ADMIN_API_KEY=<your admin key>
```

> Neither `.env` file is committed to git. Get the Neon connection string and admin key from the team.

### 2. Install frontend dependencies

```bash
npm install
```

### 3. Install backend dependencies

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

The local backend connects to the hosted Neon database, so any emails submitted locally are stored in the same database as production.

---

## Deployment

Pushes to `main` auto-deploy on both Netlify and Render.

| Service | What it does | Auto-deploy |
|---------|-------------|-------------|
| Netlify | Builds and serves the React frontend | Yes, on push to `main` |
| Render | Runs the Go backend API | Yes, on push to `main` |
| Neon | Hosts the PostgreSQL database | Manual migrations only |

**If you add a new database migration**, run it manually against Neon:
```bash
psql $DATABASE_URL -f server/database/migrations/<migration-file>.sql
```

---

## API endpoints

| Method | Path | Auth | Description |
|--------|------|------|-------------|
| `GET` | `/api/health` | none | Server + database status |
| `POST` | `/api/waitlist` | none | Add an email to the waitlist |
| `GET` | `/api/waitlist` | admin | List all waitlist emails |
| `DELETE` | `/api/waitlist/{id}` | admin | Remove a waitlist entry by ID |

### Checking waitlist emails

```bash
curl https://challengebuddy-backend.onrender.com/api/waitlist \
  -H "X-Admin-Key: <your admin key>"
```

### Deleting an entry

```bash
curl -X DELETE https://challengebuddy-backend.onrender.com/api/waitlist/<id> \
  -H "X-Admin-Key: <your admin key>"
```

---

## Project structure

```
challengebuddy-landing/
├── src/                        # React frontend
│   └── components/
│       └── WaitlistForm.tsx    # Submits to /api/waitlist
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
