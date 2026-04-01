"use client"

import { Plus, Minus } from "lucide-react"
import { cn } from "@/lib/utils"
import type { Branch } from "./branch-card"

interface MapMarkerProps {
  branch: Branch
  isSelected?: boolean
  onClick?: () => void
}

function MapMarker({ branch, isSelected, onClick }: MapMarkerProps) {
  return (
    <button
      type="button"
      className={cn(
        "group absolute flex flex-col items-center transition-all duration-200",
        isSelected && "z-10"
      )}
      style={{
        left: `${30 + (branch.coordinates.lng * 20)}%`,
        top: `${30 + (branch.coordinates.lat * 20)}%`,
      }}
      onClick={onClick}
      aria-label={`Ver ${branch.name}`}
    >
      {/* Tooltip */}
      <div className={cn(
        "absolute -top-10 left-1/2 -translate-x-1/2 whitespace-nowrap rounded-lg bg-texto-principal px-3 py-1.5 font-sans text-xs text-blanco opacity-0 transition-opacity",
        "group-hover:opacity-100",
        isSelected && "opacity-100"
      )}>
        {branch.name}
        <div className="absolute -bottom-1 left-1/2 h-2 w-2 -translate-x-1/2 rotate-45 bg-texto-principal" />
      </div>
      
      {/* Marker Pin */}
      <div className={cn(
        "flex h-8 w-8 items-center justify-center rounded-full border-2 border-blanco shadow-lg transition-all",
        isSelected 
          ? "h-10 w-10 bg-dorado scale-110" 
          : "bg-rosa-empolvado hover:bg-dorado hover:scale-110",
        branch.isPrincipal && !isSelected && "bg-dorado"
      )}>
        <div className={cn(
          "h-2 w-2 rounded-full",
          isSelected || branch.isPrincipal ? "bg-blanco" : "bg-dorado"
        )} />
      </div>
      
      {/* Pulse effect for selected */}
      {isSelected && (
        <div className="absolute h-10 w-10 animate-ping rounded-full bg-dorado/30" />
      )}
    </button>
  )
}

interface BranchMapPlaceholderProps {
  branches: Branch[]
  selectedBranch?: Branch | null
  onMarkerClick?: (branch: Branch) => void
}

export function BranchMapPlaceholder({ 
  branches, 
  selectedBranch,
  onMarkerClick 
}: BranchMapPlaceholderProps) {
  return (
    <div className="relative h-[300px] w-full overflow-hidden rounded-2xl bg-gray-200 md:h-[500px]">
      {/* Simulated Map Grid */}
      <div className="absolute inset-0">
        {/* Horizontal Lines */}
        {Array.from({ length: 12 }).map((_, i) => (
          <div
            key={`h-${i}`}
            className="absolute left-0 right-0 h-px bg-gray-300"
            style={{ top: `${(i + 1) * 8}%` }}
          />
        ))}
        {/* Vertical Lines */}
        {Array.from({ length: 12 }).map((_, i) => (
          <div
            key={`v-${i}`}
            className="absolute top-0 bottom-0 w-px bg-gray-300"
            style={{ left: `${(i + 1) * 8}%` }}
          />
        ))}
        
        {/* Simulated Streets (thicker lines) */}
        <div className="absolute left-[20%] right-[20%] top-1/2 h-1 -translate-y-1/2 bg-gray-300" />
        <div className="absolute top-[25%] bottom-[25%] left-1/2 w-1 -translate-x-1/2 bg-gray-300" />
        <div className="absolute left-[10%] right-[40%] top-[30%] h-0.5 bg-gray-300" />
        <div className="absolute left-[50%] right-[10%] top-[70%] h-0.5 bg-gray-300" />
      </div>

      {/* Map Markers */}
      {branches.map((branch) => (
        <MapMarker
          key={branch.id}
          branch={branch}
          isSelected={selectedBranch?.id === branch.id}
          onClick={() => onMarkerClick?.(branch)}
        />
      ))}

      {/* Zoom Controls */}
      <div className="absolute right-4 top-4 flex flex-col gap-1">
        <button
          type="button"
          className="flex h-8 w-8 items-center justify-center rounded-lg bg-blanco shadow-md transition-colors hover:bg-gray-100"
          aria-label="Acercar"
        >
          <Plus className="h-4 w-4 text-texto-principal" />
        </button>
        <button
          type="button"
          className="flex h-8 w-8 items-center justify-center rounded-lg bg-blanco shadow-md transition-colors hover:bg-gray-100"
          aria-label="Alejar"
        >
          <Minus className="h-4 w-4 text-texto-principal" />
        </button>
      </div>

      {/* Bottom Info Bar */}
      <div className="absolute bottom-0 left-0 right-0 bg-texto-principal/80 px-4 py-3 backdrop-blur-sm">
        <p className="text-center font-sans text-sm text-blanco">
          {selectedBranch 
            ? `Mostrando: ${selectedBranch.name}` 
            : "Usa el buscador para encontrar tu sucursal mas cercana"
          }
        </p>
      </div>
    </div>
  )
}
