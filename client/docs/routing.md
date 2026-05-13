# Routing

## Routes

- `/` → `Dashboard`
- `/map` → `MapPage`
- `/vehicles` → `Vehicles`
- `/history` → `History`

All routes render inside `AppShell` so layout stays persistent.

## Navigation

`Sidebar` defines links and highlights the active route using `useLocation`.

## Top bar behavior

`TopBar` derives title from current pathname and shows a live clock.
