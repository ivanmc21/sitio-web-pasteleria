// components/featured-carousel-advanced.tsx
"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  CatalogProductCard,
  type CatalogProduct,
} from "@/components/catalog-product-card";
import Link from "next/link";

interface FeaturedCarouselProps {
  products: CatalogProduct[];
}

export function FeaturedCarousel({ products }: FeaturedCarouselProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);
  const [itemsPerView, setItemsPerView] = useState(4);
  const [isTransitioning, setIsTransitioning] = useState(true);
  const carouselRef = useRef<HTMLDivElement>(null);
  const autoPlayRef = useRef<NodeJS.Timeout | undefined>(undefined);

  // Duplicar productos al inicio y al final para efecto de bucle infinito
  const extendedProducts = [...products, ...products, ...products];
  const totalProducts = products.length;
  const startIndex = totalProducts;
  const endIndex = totalProducts * 2;

  useEffect(() => {
    // Resetear índice después de la transición para crear efecto de bucle
    if (currentIndex >= endIndex) {
      setTimeout(() => {
        setIsTransitioning(false);
        setCurrentIndex(startIndex);
        setTimeout(() => setIsTransitioning(true), 50);
      }, 500);
    } else if (currentIndex < startIndex && currentIndex >= 0) {
      setTimeout(() => {
        setIsTransitioning(false);
        setCurrentIndex(endIndex - itemsPerView);
        setTimeout(() => setIsTransitioning(true), 50);
      }, 500);
    }
  }, [currentIndex, endIndex, startIndex, itemsPerView]);

  // Calcular items por vista según el tamaño de pantalla
  useEffect(() => {
    const handleResize = () => {
      let newItemsPerView = 4;
      if (window.innerWidth < 640) {
        newItemsPerView = 1;
      } else if (window.innerWidth < 1024) {
        newItemsPerView = 2;
      } else {
        newItemsPerView = 4;
      }
      setItemsPerView(newItemsPerView);
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Autoplay
  useEffect(() => {
    if (isAutoPlaying && totalProducts > itemsPerView) {
      autoPlayRef.current = setInterval(() => {
        nextSlide();
      }, 2000);
    }

    return () => {
      if (autoPlayRef.current) {
        clearInterval(autoPlayRef.current);
      }
    };
  }, [isAutoPlaying, totalProducts, itemsPerView]);

  const nextSlide = useCallback(() => {
    setCurrentIndex((prev) => prev + 1);
    resetAutoPlay();
  }, []);

  const prevSlide = useCallback(() => {
    setCurrentIndex((prev) => prev - 1);
    resetAutoPlay();
  }, []);

  const resetAutoPlay = useCallback(() => {
    if (autoPlayRef.current) {
      clearInterval(autoPlayRef.current);
    }
    if (isAutoPlaying && totalProducts > itemsPerView) {
      autoPlayRef.current = setInterval(() => {
        nextSlide();
      }, 5000);
    }
  }, [isAutoPlaying, totalProducts, itemsPerView, nextSlide]);

  const goToSlide = (index: number) => {
    setCurrentIndex(startIndex + index);
    resetAutoPlay();
  };

  const handleMouseEnter = () => {
    setIsAutoPlaying(false);
  };

  const handleMouseLeave = () => {
    setIsAutoPlaying(true);
  };

  const cardWidth = `${100 / itemsPerView}%`;
  const maxVisibleIndex = totalProducts - itemsPerView;

  if (totalProducts === 0) return null;

  return (
    <div
      className="relative"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {/* Carrusel Container */}
      <div className="overflow-hidden">
        <div
          ref={carouselRef}
          className="flex"
          style={{
            transform: `translateX(-${currentIndex * (100 / itemsPerView)}%)`,
            transition: isTransitioning ? "transform 0.5s ease-in-out" : "none",
          }}
        >
          {extendedProducts.map((product, idx) => (
            <div
              key={`${product.id}-${idx}`}
              className="shrink-0 px-3"
              style={{ width: cardWidth }}
            >
              <Link
                href={`/productos/${product.id}`}
                className="block transition-transform hover:scale-[1.02] focus:outline-none focus:ring-2 focus:ring-dorado focus:ring-offset-2 rounded-2xl"
              >
                <CatalogProductCard product={product} />
              </Link>
            </div>
          ))}
        </div>
      </div>

      {/* Botones de navegación */}
      {totalProducts > itemsPerView && (
        <>
          <Button
            variant="outline"
            size="icon"
            className="absolute left-2 top-1/2 -translate-y-1/2 rounded-full bg-blanco/80 shadow-lg backdrop-blur-sm hover:bg-blanco"
            onClick={prevSlide}
            aria-label="Anterior"
          >
            <ChevronLeft className="h-6 w-6" />
          </Button>

          <Button
            variant="outline"
            size="icon"
            className="absolute right-2 top-1/2 -translate-y-1/2 rounded-full bg-blanco/80 shadow-lg backdrop-blur-sm hover:bg-blanco"
            onClick={nextSlide}
            aria-label="Siguiente"
          >
            <ChevronRight className="h-6 w-6" />
          </Button>
        </>
      )}

      {/* Indicadores de página */}
      {totalProducts > itemsPerView && (
        <div className="mt-8 flex justify-center gap-2">
          {Array.from({ length: maxVisibleIndex + 1 }).map((_, index) => (
            <button
              key={index}
              onClick={() => goToSlide(index)}
              className={`h-2 rounded-full transition-all ${
                currentIndex - startIndex === index
                  ? "w-8 bg-dorado"
                  : "w-2 bg-gray-300 hover:bg-gray-400"
              }`}
              aria-label={`Ir al grupo ${index + 1}`}
            />
          ))}
        </div>
      )}
    </div>
  );
}
