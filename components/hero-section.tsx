"use client";

import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";
import { ChevronDown } from "lucide-react";

export function HeroSection() {
  return (
    <section className="relative overflow-hidden bg-rosa-empolvado py-12 md:py-16 lg:py-20">
      {/* Subtle decorative pattern */}
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage: `radial-gradient(circle, #D4AF37 1px, transparent 1px)`,
          backgroundSize: "24px 24px",
        }}
      />

      <div className="relative mx-auto max-w-7xl px-4 md:px-8">
        <div className="flex flex-col items-center gap-10 lg:flex-row lg:items-center lg:justify-between lg:gap-16">
          {/* Left Column - Text and CTAs */}
          <div className="flex flex-col items-center text-center lg:items-start lg:text-left">
            {/* Badge */}
            <span className="inline-flex items-center gap-1.5 rounded-full border border-dorado/30 bg-dorado/10 px-4 py-1.5 text-sm font-medium text-dorado">
              <span aria-hidden="true">&#10024;</span>
              Pastelería Artesanal
            </span>

            {/* Main Title */}
            <h1 className="mt-6 font-serif text-[2.5rem] font-bold leading-[1.2] text-texto-principal md:text-5xl lg:text-[4rem] text-balance">
              Arte que se Come
            </h1>

            {/* Subtitle */}
            <p className="mt-6 max-w-125 font-sans text-lg leading-relaxed text-texto-secundario text-pretty">
              Pasteles hechos con ingredientes locales y amor por cada detalle.
              Personalizamos tus celebraciones.
            </p>

            {/* CTA Buttons */}
            <div className="mt-8 flex w-full flex-col gap-4 sm:w-auto sm:flex-row">
              <Button
                variant="outline"
                className="w-full bg-dorado px-8 py-6 text-base font-semibold text-blanco shadow-lg transition-all hover:bg-dorado/90 hover:shadow-xl sm:w-auto"
              >
                <Link href="/productos">Ver productos</Link>
              </Button>

              <Button
                variant="outline"
                className="w-full border-2 border-dorado bg-transparent px-8 py-6 text-base font-semibold text-dorado transition-all hover:bg-dorado/10 sm:w-auto"
              >
                Contactar
              </Button>
            </div>

            {/* Stats */}
            <div className="mt-10 flex flex-wrap items-center justify-center gap-8 lg:justify-start">
              <div className="text-center lg:text-left">
                <p className="font-serif text-2xl font-bold text-dorado md:text-3xl">
                  +500
                </p>
                <p className="text-sm text-texto-secundario">
                  Clientes felices
                </p>
              </div>
              <div className="h-10 w-px bg-dorado/20" aria-hidden="true" />
              <div className="text-center lg:text-left">
                <p className="font-serif text-2xl font-bold text-dorado md:text-3xl">
                  +10
                </p>
                <p className="text-sm text-texto-secundario">
                  Años de experiencia
                </p>
              </div>
              <div className="h-10 w-px bg-dorado/20" aria-hidden="true" />
              <div className="text-center lg:text-left">
                <p className="font-serif text-2xl font-bold text-dorado md:text-3xl">
                  100%
                </p>
                <p className="text-sm text-texto-secundario">
                  Ingredientes naturales
                </p>
              </div>
            </div>
          </div>

          {/* Right Column - Image */}
          <div className="relative shrink-0">
            <div className="group relative h-75 w-75 overflow-hidden rounded-full border-4 border-dorado shadow-[0_20px_40px_rgba(0,0,0,0.1)] transition-transform duration-300 hover:scale-105 md:h-100 md:w-100">
              <Image
                src="/images/hero-cake.jpg"
                alt="Pastel artesanal elegante de Dulce Arte"
                fill
                className="object-cover transition-transform duration-500 group-hover:scale-110"
                priority
              />
            </div>
            {/* Decorative elements */}
            <div
              className="absolute -right-4 -top-4 h-24 w-24 rounded-full bg-dorado/10 md:-right-8 md:-top-8 md:h-32 md:w-32"
              aria-hidden="true"
            />
            <div
              className="absolute -bottom-4 -left-4 h-16 w-16 rounded-full bg-dorado/15 md:-bottom-6 md:-left-6 md:h-24 md:w-24"
              aria-hidden="true"
            />
          </div>
        </div>

        {/* Scroll indicator */}
        <div className="mt-12 flex justify-center lg:mt-16">
          <button
            onClick={() =>
              window.scrollTo({ top: window.innerHeight, behavior: "smooth" })
            }
            className="flex flex-col items-center gap-2 text-texto-secundario transition-colors hover:text-dorado"
            aria-label="Desplazarse hacia abajo"
          >
            <span className="text-sm">Descubre más</span>
            <ChevronDown className="h-5 w-5 animate-bounce" />
          </button>
        </div>
      </div>
    </section>
  );
}
