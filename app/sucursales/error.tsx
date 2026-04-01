'use client'

import { useEffect } from 'react'
import { AlertCircle } from 'lucide-react'

export default function SucursalesError({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  useEffect(() => {
    console.error('Error en sucursales:', error)
  }, [error])

  return (
    <div className="flex min-h-100 flex-1 items-center justify-center bg-rosa-empolvado">
      <div className="max-w-md rounded-xl bg-blanco p-8 text-center shadow-lg">
        <div className="flex justify-center">
          <div className="flex h-16 w-16 items-center justify-center rounded-full bg-red-100">
            <AlertCircle className="h-8 w-8 text-red-600" />
          </div>
        </div>
        <h2 className="mt-4 font-serif text-2xl font-bold text-texto-principal">
          ¡Ups! Algo salió mal
        </h2>
        <p className="mt-2 font-sans text-texto-secundario">
          No pudimos cargar la información de las sucursales. Por favor, intenta de nuevo.
        </p>
        <button
          onClick={reset}
          className="mt-6 rounded-lg bg-dorado px-6 py-3 font-sans text-blanco transition-colors hover:bg-dorado/90"
        >
          Intentar nuevamente
        </button>
      </div>
    </div>
  )
}