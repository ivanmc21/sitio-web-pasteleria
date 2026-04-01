"use client"

import { ChevronLeft, ChevronRight } from "lucide-react"

interface PaginationProps {
  currentPage: number
  totalPages: number
  totalProducts: number
  productsPerPage: number
  onPageChange: (page: number) => void
  onPerPageChange: (perPage: number) => void
}

export function CatalogPagination({
  currentPage,
  totalPages,
  totalProducts,
  productsPerPage,
  onPageChange,
  onPerPageChange,
}: PaginationProps) {
  const startProduct = (currentPage - 1) * productsPerPage + 1
  const endProduct = Math.min(currentPage * productsPerPage, totalProducts)

  const getPageNumbers = () => {
    const pages: (number | string)[] = []
    
    if (totalPages <= 5) {
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i)
      }
    } else {
      if (currentPage <= 3) {
        pages.push(1, 2, 3, 4, "...", totalPages)
      } else if (currentPage >= totalPages - 2) {
        pages.push(1, "...", totalPages - 3, totalPages - 2, totalPages - 1, totalPages)
      } else {
        pages.push(1, "...", currentPage - 1, currentPage, currentPage + 1, "...", totalPages)
      }
    }
    
    return pages
  }

  return (
    <div className="mt-12 flex flex-col items-center gap-4 sm:flex-row sm:justify-between">
      {/* Products Info */}
      <p className="font-sans text-sm text-texto-secundario">
        Mostrando <span className="font-semibold text-texto-principal">{startProduct}-{endProduct}</span> de{" "}
        <span className="font-semibold text-texto-principal">{totalProducts}</span> productos
      </p>

      {/* Page Numbers */}
      <div className="flex items-center gap-1">
        <button
          onClick={() => onPageChange(currentPage - 1)}
          disabled={currentPage === 1}
          className="flex h-10 w-10 items-center justify-center rounded-full border border-gray-200 text-texto-principal transition-all hover:border-dorado hover:bg-dorado/10 disabled:cursor-not-allowed disabled:opacity-50 disabled:hover:border-gray-200 disabled:hover:bg-transparent"
          aria-label="Pagina anterior"
        >
          <ChevronLeft className="h-5 w-5" />
        </button>

        {getPageNumbers().map((page, index) => (
          <button
            key={index}
            onClick={() => typeof page === "number" && onPageChange(page)}
            disabled={page === "..."}
            className={`flex h-10 w-10 items-center justify-center rounded-full font-sans text-sm font-medium transition-all ${
              page === currentPage
                ? "bg-dorado text-blanco shadow-md"
                : page === "..."
                ? "cursor-default text-texto-secundario"
                : "border border-gray-200 text-texto-principal hover:border-dorado hover:bg-dorado/10"
            }`}
          >
            {page}
          </button>
        ))}

        <button
          onClick={() => onPageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
          className="flex h-10 w-10 items-center justify-center rounded-full border border-gray-200 text-texto-principal transition-all hover:border-dorado hover:bg-dorado/10 disabled:cursor-not-allowed disabled:opacity-50 disabled:hover:border-gray-200 disabled:hover:bg-transparent"
          aria-label="Pagina siguiente"
        >
          <ChevronRight className="h-5 w-5" />
        </button>
      </div>

      {/* Per Page Selector */}
      <div className="flex items-center gap-2">
        <span className="font-sans text-sm text-texto-secundario">Mostrar:</span>
        <select
          value={productsPerPage}
          onChange={(e) => onPerPageChange(Number(e.target.value))}
          className="rounded-lg border border-gray-200 bg-blanco px-3 py-2 font-sans text-sm text-texto-principal focus:border-dorado focus:outline-none focus:ring-1 focus:ring-dorado"
        >
          <option value={9}>9</option>
          <option value={12}>12</option>
          <option value={24}>24</option>
          <option value={36}>36</option>
        </select>
      </div>
    </div>
  )
}
