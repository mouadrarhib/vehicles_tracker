# Vehicle Tracker Backend Docs

## Overview

This backend ingests GPS telemetry payloads, persists full data in PostgreSQL, caches latest vehicle state in Redis, and broadcasts real-time updates over WebSocket for the React frontend.

## Tech stack

- Node.js + Express
- PostgreSQL (`pg`)
- Redis (`ioredis`)
- WebSocket (`ws`)
- Environment config with `dotenv`

## Folder structure

```text
server/
├── config/
├── controllers/
├── db/
├── docs/
├── middleware/
├── routes/
├── services/
├── ws/
├── index.js
└── simulate.js
```

## Quick start

1. Configure `server/.env` (PostgreSQL + Redis + PORT).
2. Install dependencies:

```bash
npm install
```

3. Start backend:

```bash
npm start
```

4. Start simulator (separate terminal):

```bash
npm run simulate
```

## Documentation index

- [architecture.md](./architecture.md)
- [database.md](./database.md)
- [redis.md](./redis.md)
- [api.md](./api.md)
- [websocket.md](./websocket.md)
- [services.md](./services.md)
- [middleware.md](./middleware.md)
- [simulation.md](./simulation.md)
