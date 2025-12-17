# Advanced Todo App

Next.js (app router) todo app with MongoDB, JWT auth, priority levels and drag-and-drop ordering. Run locally or via Docker.

## Environment variables

Copy `.env.example` to `.env.local` and fill in:

```
MONGODB_URI=<your-connection-string>
JWT_SECRET=<your-secret>
```

## Local development

```bash
npm install
npm run dev
```

App runs on `http://localhost:3000`.

## Testing

### Unit & Integration Tests

Jest and React Testing Library for component and utility testing. Core functionality was developed using TDD.

```bash
npm test
```

**26 tests across 9 test suites** covering:
- Authentication (login/register)
- Todo CRUD operations
- Priority cycling
- Delete confirmation dialog
- Form validation

### E2E Tests

Cypress for end-to-end testing of complete user flows.

```bash
npm run dev

npm run cypress

npm run cypress:headless
```

**E2E test coverage:**
- User registration and login
- Adding, toggling, and deleting todos
- Priority management
- Confirmation dialogs

## Run with Docker (build it yourself)

1) Install a Docker runtime (Docker Desktop or Colima).  
2) Build:
```bash
docker build -t advanced-todo-app .
```
3) Run with your envs:
```bash
docker run -p 3000:3000 \
  -e MONGODB_URI=<your-connection-string> \
  -e JWT_SECRET=<your-secret> \
  advanced-todo-app
```
Or use a file:
```bash
docker run -p 3000:3000 --env-file .env.local advanced-todo-app
```

## Run from public image (GHCR)

Skip building, pull the published image:
```bash
docker pull ghcr.io/owale128/advanced-todo-app:latest
docker run -p 3000:3000 --env-file .env.local ghcr.io/owale128/advanced-todo-app:latest
```
(or set envs with `-e MONGODB_URI=... -e JWT_SECRET=...`).

## Deploy

Deployed on Vercel, demo: https://advanced-todo-app-zeta.vercel.app/. Never bake secrets into the image.
