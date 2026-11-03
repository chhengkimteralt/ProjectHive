# ProjectHive

A collaborative project and task management web application designed for students working in teams.

- **Author:** CHHENG Kimter (`p20240007`)
- **Repository:** https://github.com/chhengkimteralt/ProjectHive
- **Course:** Internet Programming

## Repository Structure

```
ProjectHive/
├── web/                  # Vue 3 frontend application (Vite, Pinia, Vue Router)
├── api/                  # NestJS backend REST API (Prisma ORM, PostgreSQL)
├── docs/                 # Documentation, wireframes, ERD, API contracts
├── PROPOSAL.md           # Project proposal and MVP scope definition
├── MILESTONES.md         # Milestone progress checklists & design defense notes
├── .gitignore            # Git ignore file (excluding secrets like .env)
└── README.md             # Project overview & running instructions
```

## Architecture
Diagram or short description: `web (Vue 3 + Vite)` -> `api (NestJS)` -> `PostgreSQL (via Prisma)`.

## Run it locally
*(Instructions will be updated as the services are implemented)*
1. `cp api/.env.example api/.env`
2. `docker compose up`
3. Open `http://localhost:5173`

## Environment variables
*(Keep all secrets in `.env` and never commit them to git)*

| Name | Purpose | Example |
|---|---|---|
| `DATABASE_URL` | PostgreSQL connection string | `postgresql://user:password@localhost:5432/projecthive?schema=public` |
| `JWT_SECRET` | Secret key for signing authentication tokens | `your-secret-key` |
| `PORT` | API server listening port | `3000` |

## Test accounts
| Role | Email | Password |
|---|---|---|
| Leader | `leader@projecthive.local` | `Password123!` |
| Member | `member@projecthive.local` | `Password123!` |

## API documentation
Swagger will be available at `/api/docs` once the API is running.

## Tests
- Frontend tests: `npm test` inside `web/`
- Backend unit & e2e tests: `npm test` and `npm run test:e2e` inside `api/`
