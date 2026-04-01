"use client"

import { useCallback, useState, useEffect } from "react"
import { GoogleMap, Marker, InfoWindow } from "@react-google-maps/api"
import { Branch } from "./branch-card"
import { useGoogleMaps } from "@/hooks/useGoogleMaps"
import { Loader2, MapPin, AlertCircle } from "lucide-react"

interface BranchMapProps {
  branches: Branch[]
  selectedBranch: Branch | null
  onMarkerClick: (branch: Branch) => void
}

const mapContainerStyle = {
  width: '100%',
  height: '500px',
  borderRadius: '0.75rem',
}

const center = {
  lat: 19.4326, // Centro de CDMX como default
  lng: -99.1332,
}

const mapOptions = {
  disableDefaultUI: false,
  zoomControl: true,
  mapTypeControl: false,
  streetViewControl: false,
  fullscreenControl: true,
  styles: [
    {
      featureType: "poi",
      elementType: "labels",
      stylers: [{ visibility: "off" }],
    },
  ],
}

export function BranchMap({ branches, selectedBranch, onMarkerClick }: BranchMapProps) {
  const { isLoaded, loadError } = useGoogleMaps()
  const [map, setMap] = useState<google.maps.Map | null>(null)
  const [infoOpen, setInfoOpen] = useState<string | null>(null)
  const [mapError, setMapError] = useState<string | null>(null)

  const onLoad = useCallback((map: google.maps.Map) => {
    setMap(map)
    
    // Si hay una sucursal seleccionada, centrar el mapa en ella
    if (selectedBranch?.coordinates) {
      map.panTo(selectedBranch.coordinates)
      map.setZoom(15)
    } else if (branches.length > 0) {
      // Ajustar bounds para mostrar todas las sucursales
      const bounds = new google.maps.LatLngBounds()
      branches.forEach(branch => {
        if (branch.coordinates) {
          bounds.extend(branch.coordinates)
        }
      })
      map.fitBounds(bounds)
    }
  }, [branches, selectedBranch])

  // Actualizar mapa cuando se selecciona una sucursal
  useEffect(() => {
    if (map && selectedBranch?.coordinates) {
      map.panTo(selectedBranch.coordinates)
      map.setZoom(17)
      setInfoOpen(selectedBranch.id)
    }
  }, [map, selectedBranch])

  const handleMarkerClick = (branch: Branch) => {
    onMarkerClick(branch)
    setInfoOpen(branch.id)
  }

  if (loadError || mapError) {
    return (
      <div className="flex h-125 w-full flex-col items-center justify-center rounded-xl bg-rosa-empolvado p-8 text-center">
        <div className="flex h-16 w-16 items-center justify-center rounded-full bg-red-100">
          <AlertCircle className="h-8 w-8 text-red-600" />
        </div>
        <h3 className="mt-4 font-serif text-xl font-semibold text-texto-principal">
          Error al cargar el mapa
        </h3>
        <p className="mt-2 font-sans text-texto-secundario">
          No pudimos cargar el mapa en este momento. Por favor, intenta más tarde.
        </p>
      </div>
    )
  }

  if (!isLoaded) {
    return (
      <div className="flex h-125 w-full flex-col items-center justify-center rounded-xl bg-rosa-empolvado">
        <Loader2 className="h-12 w-12 animate-spin text-dorado" />
        <p className="mt-4 font-sans text-texto-secundario">Cargando mapa...</p>
      </div>
    )
  }

  return (
    <GoogleMap
      mapContainerStyle={mapContainerStyle}
      center={center}
      zoom={11}
      options={mapOptions}
      onLoad={onLoad}
      onUnmount={() => setMap(null)}
    >
      {branches.map((branch) => (
        <Marker
          key={branch.id}
          position={branch.coordinates}
          onClick={() => handleMarkerClick(branch)}
          icon={{
            url: branch.isPrincipal
              ? "https://maps.google.com/mapfiles/ms/icons/gold-dot.png"
              : "https://maps.google.com/mapfiles/ms/icons/red-dot.png",
            scaledSize: new google.maps.Size(40, 40),
          }}
          animation={google.maps.Animation.DROP}
        />
      ))}

      {infoOpen && selectedBranch && (
        <InfoWindow
          position={selectedBranch.coordinates}
          onCloseClick={() => setInfoOpen(null)}
        >
          <div className="max-w-50 p-2">
            <h3 className="font-serif font-semibold text-texto-principal">
              {selectedBranch.name}
            </h3>
            <p className="mt-1 text-sm text-texto-secundario">
              {selectedBranch.address}
            </p>
            <p className="mt-1 text-sm text-texto-secundario">
              {selectedBranch.neighborhood}
            </p>
            <a
              href={`https://www.google.com/maps/dir/?api=1&destination=${selectedBranch.coordinates.lat},${selectedBranch.coordinates.lng}`}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-2 inline-block text-sm text-dorado hover:underline"
            >
              Cómo llegar
            </a>
          </div>
        </InfoWindow>
      )}
    </GoogleMap>
  )
}