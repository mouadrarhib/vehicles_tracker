# Vehicle Tracker Frontend Docs

## Overview

This frontend is a React + Vite application for live vehicle tracking. It renders map positions, vehicle tables, dashboard stats, and a right-side vehicle details drawer. Data comes from the backend REST API and live WebSocket updates.

## Tech stack

- React + Vite
- MUI (Material UI)
- React Router
- React Leaflet
- Axios
- Native WebSocket

## Folder structure

```text
client/src/
├── components/
├── context/
├── hooks/
├── pages/
├── services/
├── theme/
├── utils/
├── App.jsx
└── main.jsx
```

## Quick start

1. Ensure backend is running on `http://localhost:3001`.
2. Install dependencies:

```bash
npm install
```

3. Start frontend:

```bash
npm run dev
```

4. Open app:

`http://localhost:5173`

## Docs index

- [architecture.md](./architecture.md)
- [routing.md](./routing.md)
- [services.md](./services.md)
- [hooks.md](./hooks.md)
- [map.md](./map.md)
- [drawer.md](./drawer.md)
- [state.md](./state.md)
- [realtime.md](./realtime.md)
