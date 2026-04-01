"use client"

import Link from "next/link"
import { useState } from "react"
import { Button } from "@/components/ui/button"

const quickLinks = [
  { label: "Inicio", href: "/" },
  { label: "Productos", href: "/productos" },
  { label: "Sucursales", href: "/sucursales" },
  { label: "Contacto", href: "/contacto" },
  // { label: "Blog/Recetas", href: "/blog" },
]

const scheduleItems = [
  { icon: "clock", label: "Lunes a Viernes", value: "9:00 - 20:00" },
  { icon: "clock", label: "Sábados", value: "10:00 - 18:00" },
  { icon: "closed", label: "Domingos", value: "Cerrado" },
  { icon: "phone", label: "Teléfono", value: "+52 55 1234 5678" },
]

function InstagramIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor">
      <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
    </svg>
  )
}

function FacebookIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor">
      <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
    </svg>
  )
}

function PinterestIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor">
      <path d="M12 0C5.373 0 0 5.372 0 12c0 5.084 3.163 9.426 7.627 11.174-.105-.949-.2-2.405.042-3.441.218-.937 1.407-5.965 1.407-5.965s-.359-.719-.359-1.782c0-1.668.967-2.914 2.171-2.914 1.023 0 1.518.769 1.518 1.69 0 1.029-.655 2.568-.994 3.995-.283 1.194.599 2.169 1.777 2.169 2.133 0 3.772-2.249 3.772-5.495 0-2.873-2.064-4.882-5.012-4.882-3.414 0-5.418 2.561-5.418 5.207 0 1.031.397 2.138.893 2.738.098.119.112.224.083.345l-.333 1.36c-.053.22-.174.267-.402.161-1.499-.698-2.436-2.889-2.436-4.649 0-3.785 2.75-7.262 7.929-7.262 4.163 0 7.398 2.967 7.398 6.931 0 4.136-2.607 7.464-6.227 7.464-1.216 0-2.359-.632-2.75-1.378l-.748 2.853c-.271 1.043-1.002 2.35-1.492 3.146C9.57 23.812 10.763 24 12 24c6.627 0 12-5.373 12-12 0-6.628-5.373-12-12-12z"/>
    </svg>
  )
}

function TikTokIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor">
      <path d="M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-.93-.01 2.92.01 5.84-.02 8.75-.08 1.4-.54 2.79-1.35 3.94-1.31 1.92-3.58 3.17-5.91 3.21-1.43.08-2.86-.31-4.08-1.03-2.02-1.19-3.44-3.37-3.65-5.71-.02-.5-.03-1-.01-1.49.18-1.9 1.12-3.72 2.58-4.96 1.66-1.44 3.98-2.13 6.15-1.72.02 1.48-.04 2.96-.04 4.44-.99-.32-2.15-.23-3.02.37-.63.41-1.11 1.04-1.36 1.75-.21.51-.15 1.07-.14 1.61.24 1.64 1.82 3.02 3.5 2.87 1.12-.01 2.19-.66 2.77-1.61.19-.33.4-.67.41-1.06.1-1.79.06-3.57.07-5.36.01-4.03-.01-8.05.02-12.07z"/>
    </svg>
  )
}

function ClockIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="10"/>
      <polyline points="12,6 12,12 16,14"/>
    </svg>
  )
}

function PhoneIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/>
    </svg>
  )
}

function XIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <line x1="18" y1="6" x2="6" y2="18"/>
      <line x1="6" y1="6" x2="18" y2="18"/>
    </svg>
  )
}

const socialLinks = [
  { icon: InstagramIcon, href: "https://instagram.com/dulcearte", label: "Instagram" },
  { icon: FacebookIcon, href: "https://facebook.com/dulcearte", label: "Facebook" },
  { icon: PinterestIcon, href: "https://pinterest.com/dulcearte", label: "Pinterest" },
  { icon: TikTokIcon, href: "https://tiktok.com/@dulcearte", label: "TikTok" },
]

export function Footer() {
  const [email, setEmail] = useState("")

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Handle newsletter subscription
    console.log("Subscribe:", email)
    setEmail("")
  }

  return (
    <footer className="mt-auto bg-[#FDF2F2]">
      {/* Top divider line */}
      <div className="h-px bg-dorado/30" />
      
      <div className="mx-auto max-w-7xl px-4 py-8 md:px-8 md:py-12">
        <div className="grid grid-cols-1 gap-8 text-center sm:grid-cols-2 sm:text-left lg:grid-cols-4 lg:gap-8">
          
          {/* Column 1 - Brand & Social */}
          <div className="flex flex-col items-center sm:items-start">
            <Link href="/" className="font-serif text-2xl font-bold text-dorado">
              Dulce Arte
            </Link>
            <p className="mt-2 max-w-50 font-sans text-sm text-gray-600">
              Pastelería artesanal con ingredientes locales. Endulzamos tus momentos especiales desde 2015.
            </p>
            <div className="mt-4 flex gap-3">
              {socialLinks.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={social.label}
                  className="flex h-9 w-9 items-center justify-center rounded-full bg-dorado text-blanco transition-transform hover:scale-110"
                >
                  <social.icon className="h-4 w-4" />
                </a>
              ))}
            </div>
          </div>

          {/* Column 2 - Quick Links */}
          <div className="flex flex-col items-center sm:items-start">
            <h3 className="font-serif text-lg font-semibold text-texto-principal">
              Explora
            </h3>
            <ul className="mt-4 flex flex-col gap-2">
              {quickLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="font-sans text-sm text-gray-600 transition-all hover:translate-x-1 hover:text-dorado"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3 - Schedule */}
          <div className="flex flex-col items-center sm:items-start">
            <h3 className="font-serif text-lg font-semibold text-texto-principal">
              Horarios
            </h3>
            <ul className="mt-4 flex flex-col gap-2">
              {scheduleItems.map((item, index) => (
                <li key={index} className="flex items-center gap-2 font-sans text-sm text-gray-600">
                  {item.icon === "clock" && <ClockIcon className="h-4 w-4 shrink-0 text-dorado" />}
                  {item.icon === "closed" && <XIcon className="h-4 w-4 shrink-0 text-red-500" />}
                  {item.icon === "phone" && <PhoneIcon className="h-4 w-4 shrink-0 text-dorado" />}
                  <span>
                    <span className="font-medium">{item.label}:</span> {item.value}
                  </span>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 4 - Newsletter */}
          <div className="flex flex-col items-center sm:items-start">
            <h3 className="font-serif text-lg font-semibold text-texto-principal">
              Dulces Noticias
            </h3>
            <p className="mt-4 font-sans text-sm text-gray-600">
              Suscríbete para recibir promociones y novedades
            </p>
            <form onSubmit={handleSubmit} className="mt-3 w-full max-w-70">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="tu@email.com"
                required
                className="w-full rounded-lg border border-gray-300 bg-blanco p-3 font-sans text-sm text-texto-principal placeholder:text-gray-400 focus:border-dorado focus:outline-none focus:ring-1 focus:ring-dorado"
              />
              <Button
                type="submit"
                className="mt-2 w-full bg-dorado py-2 text-sm font-semibold text-blanco hover:bg-dorado/90 cursor-pointer"
              >
                Suscribirme
              </Button>
            </form>
            <p className="mt-2 font-sans text-xs text-gray-500">
              Sin spam, solo cosas dulces
            </p>
          </div>
        </div>

        {/* Bottom copyright section */}
        <div className="mt-8 border-t border-dorado/30 pt-6">
          <div className="flex flex-col items-center gap-2 text-center">
            <p className="font-sans text-xs text-gray-500">
              © {new Date().getFullYear()} Dulce Arte. Todos los derechos reservados.
            </p>
            <div className="flex gap-4">
              <Link
                href="/terminos"
                className="font-sans text-xs text-gray-500 transition-colors hover:text-dorado"
              >
                Términos y condiciones
              </Link>
              <span className="text-gray-400">|</span>
              <Link
                href="/privacidad"
                className="font-sans text-xs text-gray-500 transition-colors hover:text-dorado"
              >
                Política de privacidad
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
