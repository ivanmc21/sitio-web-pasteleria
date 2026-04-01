"use client"

import { useState } from "react"
import Link from "next/link"
import { Search, ShoppingCart, User, Menu, X } from "lucide-react"
import { Button } from "@/components/ui/button"

const navLinks = [
  { href: "/", label: "Inicio" },
  { href: "/productos", label: "Productos" },
  { href: "/sucursales", label: "Sucursales" },
  { href: "/contacto", label: "Contacto" },
]

export function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  return (
    <header className="sticky top-0 z-50 w-full bg-blanco shadow-sm">
      <nav className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4 md:px-8">
        {/* Logo */}
        <Link href="/" className="shrink-0">
          <span className="font-serif text-2xl font-bold text-dorado md:text-3xl">
            Dulce Arte
          </span>
        </Link>

        {/* Desktop Navigation */}
        <ul className="hidden items-center gap-8 md:flex">
          {navLinks.map((link) => (
            <li key={link.href}>
              <Link
                href={link.href}
                className="font-sans text-texto-principal transition-colors hover:text-dorado"
              >
                {link.label}
              </Link>
            </li>
          ))}
        </ul>

        {/* Desktop Icons */}
        <div className="hidden items-center gap-4 md:flex">
          <button
            type="button"
            aria-label="Buscar"
            className="text-texto-principal transition-colors hover:text-dorado"
          >
            <Search className="h-5 w-5" />
          </button>
          <button
            type="button"
            aria-label="Carrito de compras"
            className="text-texto-principal transition-colors hover:text-dorado"
          >
            <ShoppingCart className="h-5 w-5" />
          </button>
          <button
            type="button"
            aria-label="Mi cuenta"
            className="text-texto-principal transition-colors hover:text-dorado"
          >
            <User className="h-5 w-5" />
          </button>
        </div>

        {/* Mobile Menu Button */}
        <Button
          variant="ghost"
          size="icon"
          className="md:hidden"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          aria-label={isMenuOpen ? "Cerrar menú" : "Abrir menú"}
          aria-expanded={isMenuOpen}
        >
          {isMenuOpen ? (
            <X className="h-6 w-6 text-texto-principal" />
          ) : (
            <Menu className="h-6 w-6 text-texto-principal" />
          )}
        </Button>
      </nav>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="border-t border-border bg-blanco md:hidden">
          <ul className="flex flex-col px-4 py-4">
            {navLinks.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className="block py-3 font-sans text-texto-principal transition-colors hover:text-dorado"
                  onClick={() => setIsMenuOpen(false)}
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
          <div className="flex items-center gap-6 border-t border-border px-4 py-4">
            <button
              type="button"
              aria-label="Buscar"
              className="text-texto-principal transition-colors hover:text-dorado"
            >
              <Search className="h-5 w-5" />
            </button>
            <button
              type="button"
              aria-label="Carrito de compras"
              className="text-texto-principal transition-colors hover:text-dorado"
            >
              <ShoppingCart className="h-5 w-5" />
            </button>
            <button
              type="button"
              aria-label="Mi cuenta"
              className="text-texto-principal transition-colors hover:text-dorado"
            >
              <User className="h-5 w-5" />
            </button>
          </div>
        </div>
      )}
    </header>
  )
}
