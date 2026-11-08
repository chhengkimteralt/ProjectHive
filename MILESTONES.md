# ProjectHive: Milestones & Design Notes

**Course:** Internet Programming  
**Student:** CHHENG Kimter (`p20240007`)  
**Repository:** https://github.com/chhengkimteralt/ProjectHive  

---

## M0: Proposal (Week 3)

### Checklist
- [x] `PROPOSAL.md` follows the template in Appendix A
- [x] Problem stated in two sentences; target users and at least 2 roles named
- [x] 6–10 user stories, with acceptance criteria for the 3 most important
- [x] MVP scope split into must-have and nice-to-have
- [x] Entity list with main attributes and relations; at least 3 entities
- [x] Chosen stretch feature named

### Explain your design
**Which story did you cut from the MVP, and why?**

> I cut *Schedule Meetings* and *Select Meeting Availability*. The core of this project is task assignment, so meeting scheduling is only a bonus, and finding shared time slots is complicated to build.  
> 
> I merged the invitation stories, the task and deadline stories, and the task viewing and progress stories, because each pair describes one flow for the user. *Update Task Progress* is folded into *View My Tasks*, since a status update is needed for tracking tasks. *Monitor Project Progress* and *Project Dashboard* are reduced to one read-only leader overview, which is a nice-to-have and the first thing I would drop if time runs short.  
> 
> I also removed accepting and rejecting tasks, because the team decides tasks together in a meeting, so the leader's assignment is already agreed.

---

## M1: Frontend Prototype (Week 5)

### Checklist
- [x] Wireframes (photo or tool) of the main screens in `docs/`
- [x] Vue 3 + TypeScript app created with Vite; strict mode on; ESLint passes
- [ ] At least 4 routes, including a detail page with a route parameter
- [ ] At least one form with client-side validation
- [ ] A Pinia store and a service layer calling a mock API (json-server or local JSON)
- [ ] Loading, empty and error states visible

### Explain your design
**What state lives in the store and what stays inside a component? Why?**
*(To be completed during M1 submission)*

---

## M2: Backend API (Week 7)

### Checklist
- [ ] API contract (Appendix B) and ERD in `docs/`
- [ ] NestJS API with one module per resource (controller, service, DTOs)
- [ ] Prisma schema, migrations and a seed script; PostgreSQL runs in Docker
- [ ] CRUD endpoints for at least 3 entities, with server-side validation
- [ ] Correct status codes (200, 201, 204, 400, 404) and consistent error JSON

### Explain your design
**Why did you choose this relation (1-N or N-N) between two of your entities?**
*(To be completed during M2 submission)*

---

## M3: Integrated App (Week 9)

### Checklist
- [ ] Frontend calls the real API; the mock is gone
- [ ] Registration, login, logout; passwords hashed
- [ ] Guards on the API for authentication, roles and ownership
- [ ] Route guards in Vue; the UI hides what a role cannot do
- [ ] Security checklist from week 9 run on your app; findings fixed or listed
- [ ] 3-minute demo in the practice session

### Explain your design
**Where is the token stored in the browser, and what attack does that choice protect against or expose?**
*(To be completed during M3 submission)*

---

## M4: Feature Complete (Week 12)

### Checklist
- [ ] Every MVP user story works end to end
- [ ] Stretch feature implemented
- [ ] Unit tests for core services; e2e tests for the main endpoints; all green
- [ ] Swagger documentation available

### Explain your design
**Pick one test. What bug would it catch?**
*(To be completed during M4 submission)*

---

## M5: Deployed (Week 14)

### Checklist
- [ ] Dockerfiles for frontend and backend; docker-compose.yml for the whole stack
- [ ] Running on the school server with HTTPS, or starting locally with one `docker compose up`
- [ ] GitHub Actions workflow runs lint, tests and build on every push
- [ ] README complete (Appendix B); no secrets in the repository

### Explain your design
**What happens, step by step, between git push and your change being live?**
*(To be completed during M5 submission)*
