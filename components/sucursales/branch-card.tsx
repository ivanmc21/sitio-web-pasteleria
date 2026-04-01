// components/branch-card.tsx
"use client"

import { MapPin, Phone, Clock, Star } from "lucide-react"
import { cn } from "@/lib/utils"

export interface Branch {
  id: string
  name: string
  address: string
  neighborhood: string
  schedule: string
  phone: string
  isPrincipal?: boolean
  coordinates: {
    lat: number
    lng: number
  }
}

interface BranchCardProps {
  branch: Branch
  isSelected: boolean
  onSelect: (branch: Branch) => void
  onViewOnMap: (branch: Branch) => void
}

export function BranchCard({ branch, isSelected, onSelect, onViewOnMap }: BranchCardProps) {
  return (
    <div
      className={cn(
        "group relative rounded-xl border-2 bg-blanco p-4 transition-all hover:shadow-md",
        isSelected 
          ? "border-dorado shadow-md" 
          : "border-transparent hover:border-dorado/30"
      )}
      onClick={() => onSelect(branch)}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          onSelect(branch)
        }
      }}
    >
      {branch.isPrincipal && (
        <div className="absolute right-4 top-4 flex items-center gap-1 rounded-full bg-dorado/10 px-3 py-1">
          <Star className="h-4 w-4 fill-dorado text-dorado" />
          <span className="text-xs font-semibold text-dorado">Principal</span>
        </div>
      )}

      <h3 className="font-serif text-xl font-semibold text-texto-principal pr-24">
        {branch.name}
      </h3>
      
      <div className="mt-3 space-y-2">
        <div className="flex items-start gap-2">
          <MapPin className="mt-1 h-4 w-4 flex-shrink-0 text-dorado" />
          <div className="font-sans text-sm text-texto-secundario">
            <p>{branch.address}</p>
            <p className="text-xs">{branch.neighborhood}</p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <Clock className="h-4 w-4 flex-shrink-0 text-dorado" />
          <span className="font-sans text-sm text-texto-secundario">
            {branch.schedule}
          </span>
        </div>

        <div className="flex items-center gap-2">
          <Phone className="h-4 w-4 flex-shrink-0 text-dorado" />
          <a 
            href={`tel:${branch.phone}`}
            className="font-sans text-sm text-dorado hover:underline"
            onClick={(e) => e.stopPropagation()}
          >
            {branch.phone}
          </a>
        </div>
      </div>

      <div className="mt-4 flex gap-2">
        <button
          onClick={(e) => {
            e.stopPropagation()
            onViewOnMap(branch)
          }}
          className="flex-1 rounded-lg border border-dorado bg-transparent px-3 py-2 font-sans text-sm text-dorado transition-colors hover:bg-dorado/10"
        >
          Ver en mapa
        </button>
        <a
          href={`https://www.google.com/maps/dir/?api=1&destination=${branch.coordinates.lat},${branch.coordinates.lng}`}
          target="_blank"
          rel="noopener noreferrer"
          onClick={(e) => e.stopPropagation()}
          className="flex-1 rounded-lg bg-dorado px-3 py-2 text-center font-sans text-sm text-blanco transition-colors hover:bg-dorado/90"
        >
          Cómo llegar
        </a>
      </div>
    </div>
  )
}