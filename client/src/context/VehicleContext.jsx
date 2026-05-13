import { createContext, useContext, useMemo, useState } from 'react'

export const VehicleContext = createContext(null)

export function VehicleProvider({ children }) {
  const [selectedVehicle, setSelectedVehicle] = useState(null)
  const [drawerOpen, setDrawerOpen] = useState(false)

  const openDrawer = (vehicle) => {
    setSelectedVehicle(vehicle)
    setDrawerOpen(true)
  }

  const closeDrawer = () => {
    setDrawerOpen(false)
    setTimeout(() => setSelectedVehicle(null), 300)
  }

  const value = useMemo(
    () => ({ selectedVehicle, drawerOpen, openDrawer, closeDrawer }),
    [selectedVehicle, drawerOpen],
  )

  return <VehicleContext.Provider value={value}>{children}</VehicleContext.Provider>
}

export function useVehicleContext() {
  const context = useContext(VehicleContext)
  if (!context) {
    throw new Error('useVehicleContext must be used within VehicleProvider')
  }
  return context
}
