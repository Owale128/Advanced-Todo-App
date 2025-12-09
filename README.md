# Advanced Todo App

Next.js-baserad todo-app (app router) med MongoDB och JWT. Skapa, uppdatera och sortera todos med drag-and-drop, samt autentisering med JWT. Demo: https://advanced-todo-app-zeta.vercel.app/. Kan köras lokalt eller via Docker.

## Miljövariabler

Kopiera `.env.example` till `.env.local` och fyll i:

```
MONGODB_URI=<din-connection-string>
JWT_SECRET=<valfritt-hemligt värde>
```

## Lokal utveckling

```bash
npm install
npm run dev
```

Appen startar på `http://localhost:3000`.

## Köra med Docker

1) Installera en Docker-runtime (Docker Desktop eller Colima).  
2) Bygg bilden:
```bash
docker build -t advanced-todo-app .
```
3) Kör med egna env-variabler:
```bash
docker run -p 3000:3000 \
  -e MONGODB_URI=<din-connection-string> \
  -e JWT_SECRET=<hemligt-värde> \
  advanced-todo-app
```
Eller använd en fil:
```bash
docker run -p 3000:3000 --env-file .env.local advanced-todo-app
```

## Köra via public image (GHCR)

Vill du slippa bygga själv, dra den publicerade imagen:
```bash
docker pull ghcr.io/owale128/advanced-todo-app:latest
docker run -p 3000:3000 --env-file .env.local ghcr.io/owale128/advanced-todo-app:latest
```
(eller sätt env med `-e MONGODB_URI=... -e JWT_SECRET=...`).

## Deploy

Deployad på Vercel. Docker används bara för lokalt/egen drift eller portfolio-demo; inga secrets ska bakas in i bilden.
