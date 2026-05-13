import { Route, Routes } from 'react-router-dom'
import AppShell from './components/layout/AppShell.jsx'
import VehicleDrawer from './components/vehicle/VehicleDrawer.jsx'
import { useVehicleContext, VehicleProvider } from './context/VehicleContext.jsx'
import { useSocket } from './hooks/useSocket.js'
import { useVehicles } from './hooks/useVehicles.js'
import Dashboard from './pages/Dashboard.jsx'
import History from './pages/History.jsx'
import MapPage from './pages/MapPage.jsx'
import Vehicles from './pages/Vehicles.jsx'

function AppContent() {
  const { selectedVehicle, drawerOpen, closeDrawer } = useVehicleContext()
  const { lastUpdate } = useSocket()
  const { vehicles, loading } = useVehicles(lastUpdate)

  return (
    <>
      <AppShell>
        <Routes>
          <Route path="/" element={<Dashboard vehicles={vehicles} loading={loading} />} />
          <Route path="/map" element={<MapPage vehicles={vehicles} loading={loading} />} />
          <Route path="/vehicles" element={<Vehicles vehicles={vehicles} loading={loading} />} />
          <Route path="/history" element={<History vehicles={vehicles} loading={loading} />} />
        </Routes>
      </AppShell>

      <VehicleDrawer open={drawerOpen} vehicle={selectedVehicle} onClose={closeDrawer} />
    </>
  )
}

function App() {
  return (
    <VehicleProvider>
      <AppContent />
    </VehicleProvider>
  )
}

export default App
