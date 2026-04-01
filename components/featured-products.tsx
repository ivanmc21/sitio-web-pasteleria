// components/featured-products.tsx
"use client";

import { useState, useEffect } from "react";
import { AlertCircle, RefreshCw } from "lucide-react";
import { Button } from "@/components/ui/button";
import { FeaturedCarousel } from "./featured-carousel"; // O el que prefieras
import { CatalogProductCardSkeleton } from "@/components/catalog-product-card";
import Link from "next/link";
import type { CatalogProduct } from "@/components/catalog-product-card";

export function FeaturedProducts() {
  const [featuredProducts, setFeaturedProducts] = useState<CatalogProduct[]>(
    [],
  );
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(false);

  const fetchFeaturedProducts = async () => {
    setIsLoading(true);
    setError(false);

    try {
      const response = await fetch("/api/products/featured");

      if (!response.ok) {
        throw new Error(`Failed to load featured products: ${response.status}`);
      }

      const data: CatalogProduct[] = await response.json();
      setFeaturedProducts(data);
    } catch (error) {
      setError(true);
      console.error("Error fetching featured products:", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchFeaturedProducts();
  }, []);

  const handleRetry = () => {
    fetchFeaturedProducts();
  };

  if (isLoading) {
    return (
      <section className="bg-rosa-empolvado py-16">
        <div className="mx-auto max-w-7xl px-4 md:px-8">
          <div className="text-center">
            <h2 className="font-serif text-4xl font-bold text-texto-principal">
              Nuestros Favoritos
            </h2>
            <p className="mt-3 font-sans text-texto-secundario">
              Los más pedidos por nuestros clientes
            </p>
          </div>

          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {Array.from({ length: 4 }).map((_, i) => (
              <CatalogProductCardSkeleton key={i} />
            ))}
          </div>
        </div>
      </section>
    );
  }

  if (error) {
    return (
      <section className="bg-rosa-empolvado py-16">
        <div className="mx-auto max-w-7xl px-4 md:px-8">
          <div className="text-center">
            <h2 className="font-serif text-4xl font-bold text-texto-principal">
              Nuestros Favoritos
            </h2>
            <p className="mt-3 font-sans text-texto-secundario">
              Los más pedidos por nuestros clientes
            </p>
          </div>

          <div className="mt-12 flex flex-col items-center justify-center rounded-2xl bg-blanco py-16 text-center shadow-md">
            <AlertCircle className="h-16 w-16 text-red-400" />
            <h3 className="mt-4 font-serif text-xl font-semibold text-texto-principal">
              Algo salió mal
            </h3>
            <p className="mt-2 font-sans text-texto-secundario">
              No pudimos cargar los productos destacados. Por favor intenta de
              nuevo.
            </p>
            <Button
              onClick={handleRetry}
              className="mt-6 bg-dorado text-blanco hover:bg-dorado/90"
            >
              <RefreshCw className="mr-2 h-4 w-4" />
              Reintentar
            </Button>
          </div>
        </div>
      </section>
    );
  }

  if (featuredProducts.length === 0) {
    return (
      <section className="bg-rosa-empolvado py-16">
        <div className="mx-auto max-w-7xl px-4 md:px-8">
          <div className="text-center">
            <h2 className="font-serif text-4xl font-bold text-texto-principal">
              Nuestros Favoritos
            </h2>
            <p className="mt-3 font-sans text-texto-secundario">
              Los más pedidos por nuestros clientes
            </p>
          </div>

          <div className="mt-12 flex flex-col items-center justify-center rounded-2xl bg-blanco py-16 text-center shadow-md">
            <p className="font-sans text-texto-secundario">
              No hay productos destacados disponibles en este momento.
            </p>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="bg-rosa-empolvado py-16">
      <div className="mx-auto max-w-7xl px-4 md:px-8">
        {/* Header */}
        <div className="text-center">
          <h2 className="font-serif text-4xl font-bold text-texto-principal">
            Nuestros Favoritos
          </h2>
          <p className="mt-3 font-sans text-texto-secundario">
            Los más pedidos por nuestros clientes
          </p>
        </div>

        {/* Carrusel de Productos */}
        <div className="mt-12">
          <FeaturedCarousel products={featuredProducts} />
        </div>

        {/* Footer CTA */}
        <div className="mt-12 text-center">
          <Button
            variant="outline"
            className="border-2 border-dorado bg-transparent px-8 py-6 text-base font-semibold text-dorado transition-all hover:bg-dorado/10"
            asChild
          >
            <Link href="/productos">Ver todos los productos</Link>
          </Button>
        </div>
      </div>
    </section>
  );
}