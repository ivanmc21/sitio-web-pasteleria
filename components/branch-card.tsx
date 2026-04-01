"use client"

import { MapPin, Clock, Phone, ExternalLink } from "lucide-react"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

export interface Branch {
  id: string
  name: string
  address: string
  neighborhood: string
  schedule: string
  phone: string
  isPrincipal?: boolean
  coordinates: { lat: number; lng: number }
}

interface BranchCardProps {
  branch: Branch
  isSelected?: boolean
  onSelect?: (branch: Branch) => void
  onViewOnMap?: (branch: Branch) => void
}

export function BranchCard({ 
  branch, 
  isSelected = false, 
  onSelect,
  onViewOnMap 
}: BranchCardProps) {
  return (
    <article
      className={cn(
        "cursor-pointer rounded-xl bg-blanco p-4 shadow-sm transition-all duration-200",
        "hover:shadow-md hover:border-l-4 hover:border-l-dorado",
        isSelected && "border-l-4 border-l-dorado shadow-md bg-dorado/5"
      )}
      onClick={() => onSelect?.(branch)}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault()
          onSelect?.(branch)
        }
      }}
      aria-selected={isSelected}
    >
      {/* Principal Badge */}
      {branch.isPrincipal && (
        <span className="mb-2 inline-block rounded-full bg-dorado px-3 py-1 font-sans text-xs font-medium text-blanco">
          Principal
        </span>
      )}

      {/* Branch Name */}
      <h3 className="font-serif text-xl font-semibold text-texto-principal">
        {branch.name}
      </h3>

      {/* Address */}
      <div className="mt-3 flex items-start gap-2">
        <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-dorado" />
        <p className="font-sans text-sm text-texto-secundario">
          {branch.address}, {branch.neighborhood}
        </p>
      </div>

      {/* Schedule */}
      <div className="mt-2 flex items-start gap-2">
        <Clock className="mt-0.5 h-4 w-4 shrink-0 text-dorado" />
        <p className="font-sans text-sm text-texto-secundario">
          {branch.schedule}
        </p>
      </div>

      {/* Phone */}
      <div className="mt-2 flex items-center gap-2">
        <Phone className="h-4 w-4 shrink-0 text-dorado" />
        <a 
          href={`tel:${branch.phone.replace(/[^0-9+]/g, '')}`}
          className="font-sans text-sm text-texto-secundario hover:text-dorado transition-colors"
          onClick={(e) => e.stopPropagation()}
        >
          {branch.phone}
        </a>
      </div>

      {/* Action Buttons */}
      <div className="mt-4 flex flex-wrap items-center gap-3">
        <Button
          variant="outline"
          size="sm"
          className="border-dorado text-dorado hover:bg-dorado/10 cursor-pointer"
          onClick={(e) => {
            e.stopPropagation()
            window.open(
              `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(branch.address + ', ' + branch.neighborhood)}`,
              '_blank'
            )
          }}
        >
          <ExternalLink className="mr-1.5 h-3.5 w-3.5" />
          Como llegar
        </Button>
        <button
          type="button"
          className="flex items-center gap-1 font-sans text-sm text-dorado transition-colors hover:text-dorado/80 cursor-pointer"
          onClick={(e) => {
            e.stopPropagation()
            onViewOnMap?.(branch)
          }}
        >
          <MapPin className="h-3.5 w-3.5" />
          Ver en mapa
        </button>
      </div>
    </article>
  )
}
