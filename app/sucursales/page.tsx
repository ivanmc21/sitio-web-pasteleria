"use client"

import { useState, useMemo, useEffect } from "react"
import dynamic from "next/dynamic"
import { Search, MapPin } from "lucide-react"
import { BranchCard, type Branch } from "@/components/branch-card"
import { BranchMapSkeleton } from "@/components/sucursales/branch-map-skeleton"
import { useDebounce } from "@/hooks/useDebounce"

// Carga diferida del mapa para mejorar el rendimiento inicial
const BranchMap = dynamic(
  () => import("@/components/sucursales/branch-map").then((mod) => mod.BranchMap),
  {
    loading: () => <BranchMapSkeleton />,
    ssr: false, // El mapa no se renderiza en el servidor
  }
)

type SucursalApi = {
  id: number
  nombre: string
  direccion: string
  telefono: string
  horario: string
  lat: number
  lng: number
  esPrincipal: boolean
  order: number
  neighborhood?: string
}

const mapSucursalToBranch = (sucursal: SucursalApi): Branch => ({
  id: sucursal.id.toString(),
  name: sucursal.nombre,
  address: sucursal.direccion,
  neighborhood: sucursal.neighborhood ?? "",
  schedule: sucursal.horario,
  phone: sucursal.telefono,
  isPrincipal: sucursal.esPrincipal,
  coordinates: { lat: sucursal.lat, lng: sucursal.lng },
})

export default function SucursalesPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedBranch, setSelectedBranch] = useState<Branch | null>(null)
  const [branches, setBranches] = useState<Branch[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState(false)
  const debouncedQuery = useDebounce(searchQuery, 800)

  useEffect(() => {
    const fetchBranches = async () => {
      setIsLoading(true)
      setError(false)

      try {
        const response = await fetch("/api/sucursales")

        if (!response.ok) {
          throw new Error(`Failed to load sucursales: ${response.status}`)
        }

        const data: SucursalApi[] = await response.json()
        setBranches(data.map(mapSucursalToBranch))
      } catch (fetchError) {
        console.error("Error fetching sucursales:", fetchError)
        setError(true)
      } finally {
        setIsLoading(false)
      }
    }

    fetchBranches()
  }, [])

  const filteredBranches = useMemo(() => {
    if (!debouncedQuery.trim()) return branches

    const query = debouncedQuery.toLowerCase().trim()
    return branches.filter(
      (branch) =>
        branch.name.toLowerCase().includes(query) ||
        branch.address.toLowerCase().includes(query) ||
        branch.neighborhood.toLowerCase().includes(query)
    )
  }, [debouncedQuery, branches])

  const handleBranchSelect = (branch: Branch) => {
    setSelectedBranch(branch)
  }

  const handleViewOnMap = (branch: Branch) => {
    setSelectedBranch(branch)
    // Scroll to map en móvil
    if (window.innerWidth < 768) {
      const mapElement = document.getElementById("branch-map")
      if (mapElement) {
        mapElement.scrollIntoView({ behavior: "smooth", block: "start" })
      }
    }
  }

  return (
    <>
      <main className="flex-1 bg-rosa-empolvado">
        <div className="mx-auto max-w-7xl px-4 py-8 md:px-8 md:py-12">
          {/* Page Header */}
          <header className="mb-8 text-center">
            <h1 className="font-serif text-3xl font-bold text-texto-principal md:text-4xl">
              Encuéntranos
            </h1>
            <p className="mt-2 font-sans text-texto-secundario md:text-lg">
              Estamos cerca de ti para endulzar tus momentos especiales
            </p>

            {/* Search Bar */}
            <div className="mx-auto mt-6 max-w-md">
              <div className="relative">
                <Search className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-texto-secundario" />
                <input
                  type="text"
                  placeholder="Buscar por colonia, dirección o código postal"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full rounded-full border border-border bg-blanco py-3 pl-12 pr-4 font-sans text-texto-principal placeholder:text-texto-secundario/60 focus:border-dorado focus:outline-none focus:ring-2 focus:ring-dorado/20"
                  aria-label="Buscar sucursales"
                />
              </div>
            </div>
          </header>

          {/* Main Layout */}
          <div className="grid gap-6 lg:grid-cols-2">
            {/* Map Column */}
            <div id="branch-map" className="order-1 lg:order-1">
              <BranchMap
                branches={branches}
                selectedBranch={selectedBranch}
                onMarkerClick={handleBranchSelect}
              />
            </div>

            {/* Branch List Column */}
            <div className="order-2 lg:order-2">
              <h2 className="mb-4 font-serif text-2xl font-semibold text-texto-principal">
                Nuestras Sucursales
                <span className="ml-2 text-sm font-normal text-texto-secundario">
                  ({filteredBranches.length})
                </span>
              </h2>

              {isLoading ? (
                <div className="flex items-center justify-center rounded-xl bg-blanco p-8 shadow-sm">
                  <p className="font-sans text-texto-secundario">Cargando sucursales…</p>
                </div>
              ) : error ? (
                <div className="flex flex-col items-center justify-center rounded-xl bg-blanco p-8 text-center shadow-sm">
                  <p className="font-sans text-texto-secundario">
                    No pudimos cargar las sucursales en este momento.
                  </p>
                </div>
              ) : filteredBranches.length > 0 ? (
                <div
                  className="flex max-h-125 flex-col gap-3 overflow-y-auto pr-2 scrollbar-thin scrollbar-track-transparent scrollbar-thumb-dorado/30"
                  role="list"
                  aria-label="Lista de sucursales"
                >
                  {filteredBranches.map((branch) => (
                    <BranchCard
                      key={branch.id}
                      branch={branch}
                      isSelected={selectedBranch?.id === branch.id}
                      onSelect={handleBranchSelect}
                      onViewOnMap={handleViewOnMap}
                    />
                  ))}
                </div>
              ) : (
                /* Empty State */
                <div className="flex flex-col items-center justify-center rounded-xl bg-blanco p-8 text-center shadow-sm">
                  <div className="flex h-16 w-16 items-center justify-center rounded-full bg-rosa-empolvado">
                    <MapPin className="h-8 w-8 text-dorado" />
                  </div>
                  <h3 className="mt-4 font-serif text-xl font-semibold text-texto-principal">
                    No encontramos sucursales
                  </h3>
                  <p className="mt-2 font-sans text-texto-secundario">
                    No hay sucursales que coincidan con &quot;{searchQuery}&quot;.
                    Intenta con otra colonia, dirección o código postal.
                  </p>
                  <button
                    type="button"
                    onClick={() => setSearchQuery("")}
                    className="mt-4 font-sans text-dorado transition-colors hover:text-dorado/80 focus:outline-none focus:underline cursor-pointer"
                  >
                    Ver todas las sucursales
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </main>
    </>
  )
}