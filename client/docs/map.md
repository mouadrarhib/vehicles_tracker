# Map

## Components

- `MapView`: Leaflet map container and tile layer.
- `VehicleMarker`: custom status marker per vehicle.
- `MapControls`: fit-all + zoom controls.

## Marker behavior

- Position comes from:
  - `vehicle['position.latitude']`
  - `vehicle['position.longitude']`
- Invalid coordinates are filtered to avoid Leaflet runtime errors.
- Marker click opens the global vehicle drawer.

## Map center

Default center is Casablanca:

- Latitude: `33.5731`
- Longitude: `-7.5898`
- Zoom: `12`
