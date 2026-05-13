# Vehicules Tracker

Full-stack vehicle tracking project with real-time map updates.

## Project Structure

```text
Vehicules_Tracker/
├── client/    # React + Vite + MUI frontend
├── server/    # Node.js + Express backend (PostgreSQL, Redis, WebSocket)
└── docker-compose.yml  # Redis container
```

## Prerequisites

- Node.js 20+
- Docker (for Redis)
- PostgreSQL running locally

## Quick Start

1. Start Redis:

```bash
docker compose up -d
```

2. Configure backend env:

- Edit `server/.env` with your PostgreSQL settings.

3. Start backend:

```bash
cd server
npm install
npm run dev
```

4. Start frontend:

```bash
cd client
npm install
npm run dev
```

5. (Optional) Run simulator for live movement:

```bash
cd server
npm run simulate
```

## Useful URLs

- Frontend: `http://localhost:5173`
- Backend API: `http://localhost:3001`
- Swagger UI: `http://localhost:3001/docs`
- Swagger JSON: `http://localhost:3001/docs.json`
- WebSocket stats: `http://localhost:3001/ws/stats`
- RedisInsight (if running): `http://localhost:8001`

## Documentation

- Backend docs: `server/docs/`
- Frontend docs: `client/docs/`
