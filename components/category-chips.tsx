"use client"

import { 
  Gem, 
  Cake, 
  Paintbrush, 
  CakeSlice, 
  Cherry,
  Briefcase,
  LayoutGrid
} from "lucide-react"

export interface Category {
  id: string
  name: string
  slug: string
  icon: React.ReactNode
}

export const categories: Category[] = [
  { id: "all", name: "Todos", slug: "todos", icon: <LayoutGrid className="h-4 w-4" /> },
  { id: "bodas", name: "Bodas", slug: "bodas", icon: <Gem className="h-4 w-4" /> },
  { id: "cumpleanos", name: "Cumpleanos", slug: "cumpleanos", icon: <Cake className="h-4 w-4" /> },
  { id: "personalizados", name: "Personalizados", slug: "personalizados", icon: <Paintbrush className="h-4 w-4" /> },
  { id: "tradicionales", name: "Tradicionales", slug: "tradicionales", icon: <CakeSlice className="h-4 w-4" /> },
  { id: "cupcakes", name: "Cupcakes", slug: "cupcakes", icon: <Cherry className="h-4 w-4" /> },
  { id: "corporativos", name: "Corporativos", slug: "corporativos", icon: <Briefcase className="h-4 w-4" /> },
]

interface CategoryChipsProps {
  activeCategory: string
  onCategoryChange: (slug: string) => void
}

export function CategoryChips({ activeCategory, onCategoryChange }: CategoryChipsProps) {
  return (
    <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide">
      {categories.map((category) => {
        const isActive = activeCategory === category.slug
        return (
          <button
            key={category.id}
            onClick={() => onCategoryChange(category.slug)}
            className={`flex shrink-0 items-center gap-2 rounded-full border px-4 py-2 font-sans text-sm font-medium transition-all duration-200 ${
              isActive
                ? "border-dorado bg-dorado text-blanco shadow-md"
                : "border-gray-200 bg-blanco text-texto-principal hover:border-dorado hover:bg-dorado/10"
            }`}
          >
            {category.icon}
            {category.name}
          </button>
        )
      })}
    </div>
  )
}
