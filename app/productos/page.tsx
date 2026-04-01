"use client"

import { useState, useMemo, useEffect } from "react"
import { Search, X, AlertCircle, RefreshCw } from "lucide-react"
import { CatalogProductCard, CatalogProductCardSkeleton, type CatalogProduct, type ProductSize } from "@/components/catalog-product-card"
import { CategoryChips } from "@/components/category-chips"
import { FilterSidebar, MobileFilterButton, type Filters } from "@/components/filter-sidebar"
import { CatalogPagination } from "@/components/catalog-pagination"
import { Button } from "@/components/ui/button"
import Link from "next/link"


export default function ProductosPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [activeCategory, setActiveCategory] = useState("todos")
  const [filters, setFilters] = useState<Filters>({ priceRange: [], size: null })
  const [currentPage, setCurrentPage] = useState(1)
  const [productsPerPage, setProductsPerPage] = useState(9)
  const [isFilterOpen, setIsFilterOpen] = useState(false)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState(false)
  const [allProducts, setAllProducts] = useState<CatalogProduct[]>([])

  const fetchProducts = async () => {
    setIsLoading(true)
    setError(false)

    try {
      const response = await fetch("/api/products")

      if (!response.ok) {
        throw new Error(`Failed to load products: ${response.status}`)
      }

      const data: CatalogProduct[] = await response.json()
      setAllProducts(data)
    } catch (error) {
      setError(true)
      console.error("Error fetching products:", error)
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    fetchProducts()
  }, [])

  // Calculate size counts based on current category and search filters (before size filter)
  const sizeCounts = useMemo(() => {
    let baseProducts = allProducts

    // Filter by search query
    if (searchQuery) {
      const query = searchQuery.toLowerCase()
      baseProducts = baseProducts.filter(
        (product) =>
          product.name.toLowerCase().includes(query) ||
          product.description.toLowerCase().includes(query) ||
          product.category.toLowerCase().includes(query)
      )
    }

    // Filter by category
    if (activeCategory !== "todos") {
      baseProducts = baseProducts.filter((product) => product.categorySlug === activeCategory)
    }

    // Filter by price range
    if (filters.priceRange.length > 0) {
      baseProducts = baseProducts.filter((product) => {
        return filters.priceRange.some((range) => {
          switch (range) {
            case "0-500":
              return product.price >= 0 && product.price <= 500
            case "500-1000":
              return product.price > 500 && product.price <= 1000
            case "1000-2000":
              return product.price > 1000 && product.price <= 2000
            case "2000+":
              return product.price > 2000
            default:
              return true
          }
        })
      })
    }

    // Count products by size
    const counts: Record<ProductSize, number> = {
      "pequeno": 0,
      "mediano": 0,
      "grande": 0,
      "extra-grande": 0,
    }

    baseProducts.forEach((product) => {
      counts[product.size]++
    })

    return counts
  }, [allProducts, searchQuery, activeCategory, filters.priceRange])

  // Filter products based on search, category, and filters
  const filteredProducts = useMemo(() => {
    let result = allProducts

    // Filter by search query
    if (searchQuery) {
      const query = searchQuery.toLowerCase()
      result = result.filter(
        (product) =>
          product.name.toLowerCase().includes(query) ||
          product.description.toLowerCase().includes(query) ||
          product.category.toLowerCase().includes(query)
      )
    }

    // Filter by category
    if (activeCategory !== "todos") {
      result = result.filter((product) => product.categorySlug === activeCategory)
    }

    // Filter by price range
    if (filters.priceRange.length > 0) {
      result = result.filter((product) => {
        return filters.priceRange.some((range) => {
          switch (range) {
            case "0-500":
              return product.price >= 0 && product.price <= 500
            case "500-1000":
              return product.price > 500 && product.price <= 1000
            case "1000-2000":
              return product.price > 1000 && product.price <= 2000
            case "2000+":
              return product.price > 2000
            default:
              return true
          }
        })
      })
    }

    // Filter by size (radio button - single selection)
    if (filters.size) {
      result = result.filter((product) => product.size === filters.size)
    }

    return result
  }, [allProducts, searchQuery, activeCategory, filters])

  // Paginate products
  const paginatedProducts = useMemo(() => {
    const start = (currentPage - 1) * productsPerPage
    return filteredProducts.slice(start, start + productsPerPage)
  }, [filteredProducts, currentPage, productsPerPage])

  const totalPages = Math.ceil(filteredProducts.length / productsPerPage)

  const handleCategoryChange = (slug: string) => {
    setActiveCategory(slug)
    setCurrentPage(1)
  }

  const handleClearFilters = () => {
    setFilters({ priceRange: [], size: null })
    setSearchQuery("")
    setActiveCategory("todos")
    setCurrentPage(1)
  }

  const handlePageChange = (page: number) => {
    setCurrentPage(page)
    window.scrollTo({ top: 0, behavior: "smooth" })
  }

  const handlePerPageChange = (perPage: number) => {
    setProductsPerPage(perPage)
    setCurrentPage(1)
  }

  const activeFilterCount = filters.priceRange.length + (filters.size ? 1 : 0)

  // Simulated error retry
  const handleRetry = () => {
    fetchProducts()
  }

  // Get size label for empty state message
  const getSizeLabel = (size: ProductSize | null): string => {
    if (!size) return ""
    const labels: Record<ProductSize, string> = {
      "pequeno": "pequeno (10-15 personas)",
      "mediano": "mediano (20-30 personas)",
      "grande": "grande (40-60 personas)",
      "extra-grande": "extra grande (80+ personas)",
    }
    return labels[size]
  }

  return (
    <>
      <main className="min-h-screen bg-rosa-empolvado">
        {/* Page Header */}
        <section className="bg-crema py-12">
          <div className="mx-auto max-w-7xl px-4 text-center md:px-8">
            <h1 className="font-serif text-4xl font-bold text-texto-principal md:text-5xl text-balance">
              Nuestros Pasteles
            </h1>
            <p className="mx-auto mt-4 max-w-2xl font-sans text-texto-secundario text-pretty">
              Selecciona la categoria y encuentra el pastel perfecto para tu ocasion
            </p>

            {/* Search Bar */}
            <div className="mx-auto mt-6 max-w-md">
              <div className="relative">
                <Search className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-texto-secundario" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => {
                    setSearchQuery(e.target.value)
                    setCurrentPage(1)
                  }}
                  placeholder="Buscar pastel por nombre u ocasion..."
                  className="w-full rounded-full border border-gray-200 bg-blanco py-3 pl-12 pr-10 font-sans text-texto-principal shadow-sm transition-all placeholder:text-texto-secundario focus:border-dorado focus:outline-none focus:ring-2 focus:ring-dorado/20"
                />
                {searchQuery && (
                  <button
                    onClick={() => setSearchQuery("")}
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-texto-secundario hover:text-texto-principal"
                    aria-label="Limpiar busqueda"
                  >
                    <X className="h-5 w-5" />
                  </button>
                )}
              </div>
            </div>
          </div>
        </section>

        {/* Category Chips */}
        <section className="border-b border-gray-200 bg-blanco py-4">
          <div className="mx-auto max-w-7xl px-4 md:px-8">
            <CategoryChips
              activeCategory={activeCategory}
              onCategoryChange={handleCategoryChange}
            />
          </div>
        </section>

        {/* Main Content */}
        <section className="py-8">
          <div className="mx-auto max-w-7xl px-4 md:px-8">
            <div className="flex gap-8">
              {/* Desktop Filter Sidebar */}
              <aside className="hidden w-64 shrink-0 lg:block">
                <div className="rounded-2xl bg-blanco p-6 shadow-md">
                  <FilterSidebar
                    filters={filters}
                    onFiltersChange={(newFilters) => {
                      setFilters(newFilters)
                      setCurrentPage(1)
                    }}
                    onClear={handleClearFilters}
                    sizeCounts={sizeCounts}
                  />
                </div>
              </aside>

              {/* Products Grid */}
              <div className="flex-1">
                {/* Mobile Filter Button & Results Count */}
                <div className="mb-6 flex items-center justify-between">
                  <p className="font-sans text-sm text-texto-secundario">
                    Mostrando{" "}
                    <span className="font-semibold text-texto-principal">{filteredProducts.length}</span>
                    {" "}de{" "}
                    <span className="font-semibold text-texto-principal">{allProducts.length}</span>
                    {" "}productos
                  </p>
                  <MobileFilterButton
                    onClick={() => setIsFilterOpen(true)}
                    activeCount={activeFilterCount}
                  />
                </div>

                {/* Error State */}
                {error && (
                  <div className="flex flex-col items-center justify-center rounded-2xl bg-blanco py-16 text-center shadow-md">
                    <AlertCircle className="h-16 w-16 text-red-400" />
                    <h3 className="mt-4 font-serif text-xl font-semibold text-texto-principal">
                      Algo salio mal
                    </h3>
                    <p className="mt-2 font-sans text-texto-secundario">
                      No pudimos cargar los productos. Por favor intenta de nuevo.
                    </p>
                    <Button
                      onClick={handleRetry}
                      className="mt-6 bg-dorado text-blanco hover:bg-dorado/90"
                    >
                      <RefreshCw className="mr-2 h-4 w-4" />
                      Reintentar
                    </Button>
                  </div>
                )}

                {/* Loading State */}
                {isLoading && !error && (
                  <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 xl:grid-cols-3">
                    {Array.from({ length: 6 }).map((_, i) => (
                      <CatalogProductCardSkeleton key={i} />
                    ))}
                  </div>
                )}

                {/* Empty State */}
                {!isLoading && !error && filteredProducts.length === 0 && (
                  <div className="flex flex-col items-center justify-center rounded-2xl bg-blanco py-16 text-center shadow-md">
                    <Search className="h-16 w-16 text-gray-300" />
                    <h3 className="mt-4 font-serif text-xl font-semibold text-texto-principal">
                      {filters.size
                        ? `No hay pasteles de tamano ${getSizeLabel(filters.size)}`
                        : "No encontramos productos"}
                    </h3>
                    <p className="mt-2 font-sans text-texto-secundario">
                      {filters.size
                        ? "Intenta con otro tamano o categoria"
                        : "Intenta con otra busqueda o categoria"}
                    </p>
                    <Button
                      onClick={handleClearFilters}
                      className="mt-6 bg-dorado text-blanco hover:bg-dorado/90"
                    >
                      Limpiar filtros
                    </Button>
                  </div>
                )}

                {/* Products Grid */}
                {!isLoading && !error && filteredProducts.length > 0 && (
                  <>
                    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 xl:grid-cols-3">
                      {paginatedProducts.map((product) => (
                        <Link
                          key={product.id}
                          href={`/productos/${product.id}`}
                          className="block transition-transform hover:scale-[1.02] focus:outline-none focus:ring-2 focus:ring-dorado focus:ring-offset-2 rounded-2xl"
                        >
                          <CatalogProductCard product={product} />
                        </Link>
                      ))}
                    </div>

                    {/* Pagination */}
                    {totalPages > 1 && (
                      <CatalogPagination
                        currentPage={currentPage}
                        totalPages={totalPages}
                        totalProducts={filteredProducts.length}
                        productsPerPage={productsPerPage}
                        onPageChange={handlePageChange}
                        onPerPageChange={handlePerPageChange}
                      />
                    )}
                  </>
                )}
              </div>
            </div>
          </div>
        </section>

        {/* Mobile Filter Modal */}
        {isFilterOpen && (
          <div className="fixed inset-0 z-50 lg:hidden">
            <div
              className="absolute inset-0 bg-texto-principal/50"
              onClick={() => setIsFilterOpen(false)}
            />
            <div className="absolute bottom-0 left-0 right-0 max-h-[80vh] overflow-y-auto rounded-t-3xl bg-blanco p-6">
              <FilterSidebar
                filters={filters}
                onFiltersChange={(newFilters) => {
                  setFilters(newFilters)
                  setCurrentPage(1)
                }}
                onClear={handleClearFilters}
                sizeCounts={sizeCounts}
                isMobile
                onClose={() => setIsFilterOpen(false)}
              />
            </div>
          </div>
        )}
      </main>
    </>
  )
}
