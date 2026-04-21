import { useState, useCallback } from 'react'
import type { LatLng } from '../types'

type GeoState =
  | { status: 'idle' }
  | { status: 'loading' }
  | { status: 'success'; coords: LatLng; address: string }
  | { status: 'error'; message: string }

export function useGeolocation() {
  const [state, setState] = useState<GeoState>({ status: 'idle' })

  const request = useCallback(async (): Promise<{ coords: LatLng; address: string } | null> => {
    setState({ status: 'loading' })

    return new Promise((resolve) => {
      navigator.geolocation.getCurrentPosition(
        async (pos) => {
          const coords: LatLng = { lat: pos.coords.latitude, lng: pos.coords.longitude }
          let address = `${coords.lat.toFixed(4)}, ${coords.lng.toFixed(4)}`
          try {
            const res = await fetch(
              `https://nominatim.openstreetmap.org/reverse?lat=${coords.lat}&lon=${coords.lng}&format=json`,
              { headers: { 'Accept-Language': 'en' } }
            )
            const data = await res.json()
            address =
              data.address?.suburb ||
              data.address?.neighbourhood ||
              data.address?.town ||
              data.address?.city ||
              data.display_name ||
              address
          } catch {
            // fallback to raw coords
          }
          setState({ status: 'success', coords, address })
          resolve({ coords, address })
        },
        (err) => {
          setState({ status: 'error', message: err.message })
          resolve(null)
        },
        { timeout: 8000 }
      )
    })
  }, [])

  return { state, request }
}
