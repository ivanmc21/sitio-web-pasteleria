"use client"

import { useState } from "react"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { WhatsAppFloatButton } from "@/components/whatsapp-float-button"
import { ContactInfo } from "@/components/contacto/contact-info"
import { ContactForm } from "@/components/contacto/contact-form"
import { ContactSuccess } from "@/components/contacto/contact-success"

export default function ContactoPage() {
  const [isSuccessOpen, setIsSuccessOpen] = useState(false)

  return (
    <div className="min-h-screen bg-[#FDF2F2] text-texto-principal">
   

      <main className="bg-rosa-empolvado py-12">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-3xl text-center">
            {/* <p className="text-sm uppercase tracking-[0.28em] text-dorado">Contacto</p> */}
            <h1 className="mt-4 font-serif text-4xl font-bold tracking-tight text-texto-principal sm:text-5xl">
              Contáctanos
            </h1>
            <p className="mt-4 text-base leading-7 text-texto-secundario sm:text-lg">
              ¿Tienes dudas sobre un pedido, una celebración o un producto personalizado? Escríbenos y nuestro equipo te responderá a la brevedad.
            </p>
          </div>

          <div className="mt-12 grid gap-8 lg:grid-cols-[1fr_1.1fr]">
            <ContactInfo />
            <ContactForm onSuccess={() => setIsSuccessOpen(true)} />
          </div>
        </div>
      </main>

      <ContactSuccess open={isSuccessOpen} onClose={() => setIsSuccessOpen(false)} />
    </div>
  )
}
