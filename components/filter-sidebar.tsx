"use client"

import { X, SlidersHorizontal } from "lucide-react"
import { Button } from "@/components/ui/button"
import type { ProductSize } from "@/components/catalog-product-card"

export interface Filters {
  priceRange: string[]
  size: ProductSize | null
}

interface SizeOption {
  id: ProductSize
  label: string
  capacity: string
}

interface FilterSidebarProps {
  filters: Filters
  onFiltersChange: (filters: Filters) => void
  onClear: () => void
  isMobile?: boolean
  onClose?: () => void
  sizeCounts?: Record<ProductSize, number>
}

const priceRanges = [
  { id: "0-500", label: "$0 - $500" },
  { id: "500-1000", label: "$500 - $1,000" },
  { id: "1000-2000", label: "$1,000 - $2,000" },
  { id: "2000+", label: "$2,000+" },
]

const sizes: SizeOption[] = [
  { id: "pequeno", label: "Pequeno", capacity: "10-15 personas" },
  { id: "mediano", label: "Mediano", capacity: "20-30 personas" },
  { id: "grande", label: "Grande", capacity: "40-60 personas" },
  { id: "extra-grande", label: "Extra grande", capacity: "80+ personas" },
]

export function FilterSidebar({ 
  filters, 
  onFiltersChange, 
  onClear,
  isMobile = false,
  onClose,
  sizeCounts = { "pequeno": 0, "mediano": 0, "grande": 0, "extra-grande": 0 }
}: FilterSidebarProps) {
  const handlePriceChange = (rangeId: string) => {
    const newPriceRange = filters.priceRange.includes(rangeId)
      ? filters.priceRange.filter((r) => r !== rangeId)
      : [...filters.priceRange, rangeId]
    onFiltersChange({ ...filters, priceRange: newPriceRange })
  }

  const handleSizeChange = (sizeId: ProductSize) => {
    // Radio button behavior - toggle off if same is selected
    const newSize = filters.size === sizeId ? null : sizeId
    onFiltersChange({ ...filters, size: newSize })
  }

  const hasFilters = filters.priceRange.length > 0 || filters.size !== null

  return (
    <div className={`${isMobile ? "" : "sticky top-24"}`}>
      {/* Header */}
      <div className="mb-6 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <SlidersHorizontal className="h-5 w-5 text-dorado" />
          <h2 className="font-serif text-xl font-semibold text-texto-principal">
            Filtros
          </h2>
        </div>
        {isMobile && onClose && (
          <button
            onClick={onClose}
            className="rounded-full p-2 text-texto-secundario transition-colors hover:bg-gray-100"
            aria-label="Cerrar filtros"
          >
            <X className="h-5 w-5" />
          </button>
        )}
      </div>

      {/* Active Filters Badges */}
      {hasFilters && (
        <div className="mb-4 flex flex-wrap gap-2">
          {filters.priceRange.map((range) => {
            const rangeData = priceRanges.find((r) => r.id === range)
            return (
              <span
                key={range}
                className="inline-flex items-center gap-1 rounded-full bg-dorado/10 px-3 py-1 text-xs font-medium text-dorado"
              >
                {rangeData?.label}
                <button
                  onClick={() => handlePriceChange(range)}
                  className="ml-1 rounded-full p-0.5 hover:bg-dorado/20"
                  aria-label={`Quitar filtro ${rangeData?.label}`}
                >
                  <X className="h-3 w-3" />
                </button>
              </span>
            )
          })}
          {filters.size && (
            <span className="inline-flex items-center gap-1 rounded-full bg-dorado/10 px-3 py-1 text-xs font-medium text-dorado">
              {sizes.find((s) => s.id === filters.size)?.label}
              <button
                onClick={() => onFiltersChange({ ...filters, size: null })}
                className="ml-1 rounded-full p-0.5 hover:bg-dorado/20"
                aria-label="Quitar filtro de tamano"
              >
                <X className="h-3 w-3" />
              </button>
            </span>
          )}
        </div>
      )}

      {/* Price Range */}
      <div className="mb-6">
        <h3 className="mb-3 font-sans text-sm font-semibold uppercase tracking-wide text-texto-secundario">
          Rango de precio
        </h3>
        <div className="space-y-2">
          {priceRanges.map((range) => (
            <label
              key={range.id}
              className="flex cursor-pointer items-center gap-3"
            >
              <input
                type="checkbox"
                checked={filters.priceRange.includes(range.id)}
                onChange={() => handlePriceChange(range.id)}
                className="h-4 w-4 rounded border-gray-300 text-dorado focus:ring-dorado"
              />
              <span className="font-sans text-sm text-texto-principal">
                {range.label}
              </span>
            </label>
          ))}
        </div>
      </div>

      {/* Size - Radio Buttons */}
      <div className="mb-6">
        <h3 className="mb-3 font-sans text-sm font-semibold uppercase tracking-wide text-texto-secundario">
          Tamano
        </h3>
        <div className="space-y-2">
          {sizes.map((size) => {
            const count = sizeCounts[size.id]
            return (
              <label
                key={size.id}
                className={`flex cursor-pointer items-center gap-3 rounded-lg p-2 transition-colors ${
                  filters.size === size.id
                    ? "bg-dorado/10"
                    : "hover:bg-gray-50"
                }`}
              >
                <input
                  type="radio"
                  name="size"
                  checked={filters.size === size.id}
                  onChange={() => handleSizeChange(size.id)}
                  className="h-4 w-4 border-gray-300 text-dorado focus:ring-dorado"
                />
                <div className="flex flex-1 flex-col">
                  <span className="font-sans text-sm font-medium text-texto-principal">
                    {size.label}
                    <span className="ml-2 rounded-full bg-gray-100 px-2 py-0.5 text-xs text-texto-secundario">
                      {count}
                    </span>
                  </span>
                  <span className="font-sans text-xs text-texto-secundario">
                    {size.capacity}
                  </span>
                </div>
              </label>
            )
          })}
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex flex-col gap-2">
        {isMobile && (
          <Button
            className="w-full bg-dorado text-blanco hover:bg-dorado/90"
            onClick={() => onClose?.()}
          >
            Aplicar filtros
          </Button>
        )}
        {hasFilters && (
          <Button
            variant="outline"
            className="w-full border-dorado text-dorado hover:bg-dorado/10"
            onClick={onClear}
          >
            Limpiar filtros
          </Button>
        )}
      </div>
    </div>
  )
}

// Mobile Filter Button
export function MobileFilterButton({ 
  onClick, 
  activeCount 
}: { 
  onClick: () => void
  activeCount: number 
}) {
  return (
    <button
      onClick={onClick}
      className="flex items-center gap-2 rounded-full border border-gray-200 bg-blanco px-4 py-2 font-sans text-sm font-medium text-texto-principal shadow-sm transition-all hover:border-dorado hover:bg-dorado/10 lg:hidden"
    >
      <SlidersHorizontal className="h-4 w-4" />
      Filtros
      {activeCount > 0 && (
        <span className="flex h-5 w-5 items-center justify-center rounded-full bg-dorado text-xs text-blanco">
          {activeCount}
        </span>
      )}
    </button>
  )
}
