# Advanced Todo App

Next.js (app router) todo app with MongoDB, JWT auth, and drag-and-drop ordering. Demo: https://advanced-todo-app-zeta.vercel.app/. Run locally or via Docker.

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

Deployed on Vercel. Docker is for local/on-prem use or portfolio demos; never bake secrets into the image.
