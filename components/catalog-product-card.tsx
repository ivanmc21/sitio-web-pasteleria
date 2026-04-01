"use client"

import Link from "next/link"
import { ArrowRight, Sparkles, Users } from "lucide-react"

export type ProductSize = "pequeno" | "mediano" | "grande" | "extra-grande"

export type CatalogProduct = {
  id: number
  slug?: string

  name: string
  description: string
  price: number
  category: string
  categorySlug: string

  image: string
  images?: string[]

  badge?: "destacado" | "nuevo" | "personalizable" | "envio-gratis"
  available: boolean

  size: ProductSize
  capacity?: string

  ingredients?: string[]
  nutritionalInfo?: string
  customizationOptions?: string[]

  createdAt?: Date
  updatedAt?: Date
}

interface CatalogProductCardProps {
  product: CatalogProduct
}

//  HELPERS

const sizeLevels: Record<ProductSize, number> = {
  pequeno: 1,
  mediano: 2,
  grande: 3,
  "extra-grande": 4,
}

function getBadgeStyles(badge?: string) {
  switch (badge) {
    case "nuevo":
      return "bg-green-500 text-white"
    case "destacado":
      return "bg-dorado text-white"
    case "personalizable":
      return "bg-rosa-empolvado text-texto-principal border border-dorado"
    case "envio-gratis":
      return "bg-blue-500 text-white"
    default:
      return ""
  }
}

function getBadgeText(badge?: string) {
  switch (badge) {
    case "nuevo":
      return "Nuevo"
    case "destacado":
      return "Destacado"
    case "personalizable":
      return "Personalizable"
    case "envio-gratis":
      return "Envío gratis"
    default:
      return null
  }
}

export function CatalogProductCard({ product }: CatalogProductCardProps) {
  const isAvailable = product.available !== false

  return (
    <article
      className={`group relative rounded-3xl bg-white p-4 shadow-md transition-all duration-300 hover:-translate-y-1 hover:shadow-xl ${!isAvailable ? "opacity-70" : ""
        }`}
    >
      {/* Imagen */}
      <div className="relative aspect-square overflow-hidden rounded-2xl">
        <img
          src={product.image}
          alt={product.name}
          className={`w-full h-full object-cover transition-transform duration-300 ${isAvailable ? "group-hover:scale-105" : "grayscale"
            }`}
        />

        {/* Categoría */}
        <span className="absolute left-2 top-2 rounded-full bg-rosa-empolvado px-3 py-1 text-xs font-medium text-texto-principal">
          {product.category}
        </span>

        {/* Badge */}
        {product.badge && (
          <span
            className={`absolute right-2 top-2 flex items-center gap-1 rounded-full px-3 py-1 text-xs font-semibold shadow-sm ${getBadgeStyles(
              product.badge
            )}`}
          >
            {product.badge === "personalizable" && (
              <Sparkles className="h-3 w-3" />
            )}
            {getBadgeText(product.badge)}
          </span>
        )}

        {/* Overlay hover */}
        {isAvailable && (
          <div className="absolute inset-0 flex items-center justify-center bg-black/40 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
            <span className="rounded-full bg-white px-6 py-2 text-sm font-semibold text-dorado shadow-lg">
              Vista rápida
            </span>
          </div>
        )}
      </div>

      {/* Contenido */}
      <div className="mt-3">
        <h3 className="font-serif text-lg font-semibold text-texto-principal">
          {product.name}
        </h3>

        <p className="mt-1 line-clamp-2 text-sm text-texto-secundario">
          {product.description}
        </p>

        {/* Precio */}
        <p className="mt-2 text-xl font-bold text-dorado">
          ${product.price.toFixed(2)}
        </p>

        {/* Capacidad + tamaño */}
        <div className="mt-2 flex items-center justify-between">
          {product.capacity && (
            <div className="flex items-center gap-2">
              <Users className="h-4 w-4 text-texto-secundario" />
              <span className="text-xs text-texto-secundario">
                {product.capacity}
              </span>
            </div>
          )}

          {/* Indicador visual 🎂 */}
          <div className="flex items-center gap-0.5">
            {Array.from({ length: 4 }).map((_, i) => (
              <span
                key={i}
                className={`text-sm ${i < sizeLevels[product.size]
                  ? "opacity-100"
                  : "opacity-25"
                  }`}
              >
                🎂
              </span>
            ))}
          </div>
        </div>

        {/* Footer */}
        <div className="mt-3 flex justify-between items-center border-t pt-3">
          {!isAvailable ? (
            <span className="text-sm text-gray-500">No disponible</span>
          ) : (
            <Link
              href={`/productos/${product.id}`}
              className="inline-flex items-center gap-1 text-sm font-medium text-dorado transition-all hover:gap-2"
            >
              Ver detalles
              <ArrowRight className="h-4 w-4" />
            </Link>
          )}
        </div>
      </div>
    </article>
  )
}

export function CatalogProductCardSkeleton() {
  return (
    <div className="rounded-3xl bg-white p-4 shadow-md animate-pulse">
      <div className="aspect-square bg-gray-200 rounded-2xl mb-3"></div>

      <div className="space-y-2">
        <div className="h-5 w-3/4 bg-gray-200 rounded"></div>
        <div className="h-4 w-full bg-gray-200 rounded"></div>
        <div className="h-4 w-2/3 bg-gray-200 rounded"></div>

        <div className="h-6 w-24 bg-gray-200 rounded"></div>

        <div className="flex justify-between">
          <div className="h-4 w-24 bg-gray-200 rounded"></div>
          <div className="h-4 w-16 bg-gray-200 rounded"></div>
        </div>
      </div>
    </div>
  )
}