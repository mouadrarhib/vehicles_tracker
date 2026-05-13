# State Management

## VehicleContext

`context/VehicleContext.jsx` manages drawer UI state.

State:

- `selectedVehicle`
- `drawerOpen`

Actions:

- `openDrawer(vehicle)`
- `closeDrawer()`

`closeDrawer` delays vehicle clear by 300ms for smooth close transition.

## Data state

- Vehicle list state is owned by `useVehicles`.
- Live updates are merged into existing list by `ident`.
