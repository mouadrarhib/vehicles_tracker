import axios from 'axios'

const apiClient = axios.create({
  baseURL: import.meta.env.VITE_API_URL || 'http://localhost:3001',
})

apiClient.interceptors.request.use((config) => {
  console.log('[API REQUEST]', config.method?.toUpperCase(), config.url)
  return config
})

apiClient.interceptors.response.use(
  (response) => {
    console.log('[API RESPONSE]', response.status, response.config.url)
    return response
  },
  (error) => {
    console.error('[API ERROR]', error.response?.status || 0, error.message)
    return Promise.reject(error)
  },
)

export function getVehicles() {
  return apiClient.get('/vehicles')
}

export function getVehicle(ident) {
  return apiClient.get(`/vehicles/${ident}`)
}

export function getVehicleHistory(ident, params) {
  return apiClient.get(`/vehicles/${ident}/history`, { params })
}

export function ingest(payload) {
  return apiClient.post('/gps/ingest', payload)
}

export default apiClient
