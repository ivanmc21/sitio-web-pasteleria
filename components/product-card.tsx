"use client"

import Image from "next/image"
import { ArrowRight } from "lucide-react"

export interface ProductCardProps {
  id: string
  name: string
  description: string
  price: number
  image: string
  badge?: "nuevo" | "mas-vendido"
}

export function ProductCard({
  name,
  description,
  price,
  image,
  badge,
}: ProductCardProps) {
  const badgeText = badge === "nuevo" ? "Nuevo" : badge === "mas-vendido" ? "Más vendido" : null

  return (
    <article className="group rounded-3xl bg-blanco p-4 shadow-md transition-all duration-300 ease-in-out hover:-translate-y-1 hover:shadow-xl">
      {/* Image Container */}
      <div className="relative aspect-square overflow-hidden rounded-2xl">
        <Image
          src={image}
          alt={name}
          fill
          className="object-cover transition-transform duration-300 group-hover:scale-105"
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
        />
        
        {/* Badge */}
        {badgeText && (
          <span className="absolute right-2 top-2 rounded-full bg-dorado px-3 py-1 text-xs font-semibold text-blanco shadow-sm">
            {badgeText}
          </span>
        )}
      </div>

      {/* Content */}
      <div className="mt-3">
        <h3 className="font-serif text-lg font-semibold text-texto-principal">
          {name}
        </h3>
        
        <p className="mt-1 line-clamp-2 font-sans text-sm text-texto-secundario">
          {description}
        </p>
        
        <p className="mt-2 font-sans text-xl font-bold text-dorado">
          ${price.toLocaleString("es-MX")}
        </p>
        
        {/* View Details Link */}
        <button className="mt-3 inline-flex items-center gap-1 border-b border-dorado pb-0.5 font-sans text-sm font-medium text-dorado transition-all duration-200 hover:gap-2">
          Ver detalles
          <ArrowRight className="h-4 w-4" />
        </button>
      </div>
    </article>
  )
}
