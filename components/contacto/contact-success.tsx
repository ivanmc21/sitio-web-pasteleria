"use client"

import { X, CheckCircle2 } from "lucide-react"

interface ContactSuccessProps {
  open: boolean
  onClose: () => void
}

export function ContactSuccess({ open, onClose }: ContactSuccessProps) {
  if (!open) return null

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 px-4 py-6">
      <div className="w-full max-w-xl rounded-4xl bg-blanco p-8 shadow-2xl ring-1 ring-dorado/20 animate-fade-in">
        <div className="flex items-start justify-between gap-4">
          <div className="flex items-center gap-3">
            <span className="grid h-12 w-12 place-items-center rounded-2xl bg-exito-whatsapp text-white">
              <CheckCircle2 className="h-6 w-6" />
            </span>
            <div>
              <p className="text-lg font-semibold text-texto-principal">¡Mensaje enviado!</p>
              <p className="mt-2 text-sm text-texto-secundario">
                Gracias por contactarnos. Pronto te responderemos por correo o WhatsApp.
              </p>
            </div>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="rounded-full border border-border p-2 text-texto-secundario transition hover:bg-rosa-empolvado cursor-pointer"
            aria-label="Cerrar mensaje de éxito"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        <div className="mt-8 flex justify-end">
          <button
            type="button"
            onClick={onClose}
            className="rounded-3xl bg-dorado px-6 py-3 text-sm font-semibold text-white transition hover:bg-dorado/90 cursor-pointer"
          >
            Cerrar
          </button>
        </div>
      </div>
    </div>
  )
}
