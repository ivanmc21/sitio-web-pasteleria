'use client'

import { useState } from 'react'

interface ProductTabsProps {
  descripcion: string
  ingredientes: string[]
  customizationOptions?: string[]
}

export default function ProductTabs({
  descripcion,
  ingredientes,
  customizationOptions = []
}: ProductTabsProps) {
  const [tabActiva, setTabActiva] = useState('descripcion')

  return (
    <div className="mt-16">
      {/* Tabs */}
      <div className="border-b flex gap-8">
        <button
          onClick={() => setTabActiva('descripcion')}
          className={`py-2 font-medium transition relative
            ${tabActiva === 'descripcion'
              ? 'text-dorado'
              : 'text-gray-500 hover:text-gray-700'}`}
        >
          Descripción
          {tabActiva === 'descripcion' && (
            <div className="absolute bottom-0 left-0 w-full h-0.5 bg-dorado" />
          )}
        </button>
        <button
          onClick={() => setTabActiva('ingredientes')}
          className={`py-2 font-medium transition relative
            ${tabActiva === 'ingredientes'
              ? 'text-dorado'
              : 'text-gray-500 hover:text-gray-700'}`}
        >
          Ingredientes
          {tabActiva === 'ingredientes' && (
            <div className="absolute bottom-0 left-0 w-full h-0.5 bg-dorado" />
          )}
        </button>
        {customizationOptions.length > 0 && (
          <button
            onClick={() => setTabActiva('personalizacion')}
            className={`py-2 font-medium transition relative
              ${tabActiva === 'personalizacion'
                ? 'text-dorado'
                : 'text-gray-500 hover:text-gray-700'}`}
          >
            Personalización
            {tabActiva === 'personalizacion' && (
              <div className="absolute bottom-0 left-0 w-full h-0.5 bg-dorado" />
            )}
          </button>
        )}
      </div>

      {/* Contenido de tabs */}
      <div className="py-6">
        {tabActiva === 'descripcion' && (
          <div className="prose max-w-none">
            <p className="text-gray-600 text-lg leading-relaxed">
              {descripcion}
            </p>
          </div>
        )}

        {tabActiva === 'ingredientes' && (
          <ul className="grid grid-cols-2 gap-2">
            {ingredientes.map((ingrediente, idx) => (
              <li key={idx} className="flex items-center gap-2 text-gray-600">
                <span className="text-dorado">•</span>
                {ingrediente}
              </li>
            ))}
          </ul>
        )}

        {tabActiva === 'personalizacion' && (
          <div>
            <ul className="space-y-2">
              {customizationOptions.map((opt, idx) => (
                <li key={idx} className="flex items-center gap-2 text-gray-600">
                  <span className="text-dorado">✨</span>
                  {opt}
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  )
}