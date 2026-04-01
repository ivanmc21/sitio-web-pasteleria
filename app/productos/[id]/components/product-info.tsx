'use client'

import { useState } from 'react'
import { CatalogProduct, ProductSize } from '@/components/catalog-product-card'

interface ProductInfoProps {
  producto: CatalogProduct
}

export default function ProductInfo({ producto }: ProductInfoProps) {
  const [cantidad, setCantidad] = useState(1)
  const [tamañoSeleccionado, setTamañoSeleccionado] = useState<ProductSize>(producto.size)

  // Precios por tamaño (simulado - en DB real esto vendría de la BD)
  const multiplicadorTamaño = {
    pequeno: 0.8,
    mediano: 1,
    grande: 1.3,
    "extra-grande": 1.6
  }

  const capacidadPorTamaño: Record<ProductSize, string> = {
    pequeno: "10-15 personas",
    mediano: "20-30 personas",
    grande: "40-60 personas",
    "extra-grande": "80+ personas"
  }

  const precioBase = producto.price
  const precioActual = precioBase * multiplicadorTamaño[tamañoSeleccionado]

  return (
    <div>
      {/* Badges */}
      <div className="flex gap-2 mb-4">
        {producto.badge && (
          <span className="bg-dorado text-white px-3 py-1 rounded-full text-sm">
            {producto.badge === 'destacado' && '⭐ Destacado'}
            {producto.badge === 'nuevo' && '🆕 Nuevo'}
            {producto.badge === 'personalizable' && '✨ Personalizable'}
            {producto.badge === 'envio-gratis' && '🚚 Envío gratis'}
          </span>
        )}
        <span className="bg-rosa-empolvado text-gray-600 px-3 py-1 rounded-full text-sm">
          {producto.category}
        </span>
      </div>

      {/* Título */}
      <h1 className="font-playfair text-4xl md:text-5xl text-gray-800 mb-4">
        {producto.name}
      </h1>

      {/* Descripción */}
      <p className="text-gray-600 mb-6 text-lg">
        {producto.description}
      </p>

      {/* Capacidad base */}
      {producto.capacity && (
        <div className="bg-crema p-4 rounded-xl mb-6">
          <p className="text-sm text-gray-500 mb-1">Capacidad</p>
          <p className="font-semibold text-lg">{producto.capacity}</p>
        </div>
      )}

      {/* Selector de Tamaño */}
      <div className="mb-6">
        <p className="font-semibold mb-3">Elige el tamaño:</p>
        <div className="grid grid-cols-2 gap-2">
          {(Object.keys(multiplicadorTamaño) as ProductSize[]).map((tamaño) => {
            const precioTamaño = precioBase * multiplicadorTamaño[tamaño]
            return (
              <button
                key={tamaño}
                onClick={() => setTamañoSeleccionado(tamaño)}
                className={`p-3 rounded-lg border-2 transition text-left
                  ${tamañoSeleccionado === tamaño
                    ? 'border-dorado bg-dorado/5'
                    : 'border-gray-200 hover:border-dorado/50'}`}
              >
                <p className="font-semibold capitalize">{tamaño}</p>
                <p className="text-sm text-gray-500">{capacidadPorTamaño[tamaño]}</p>
                <p className="text-dorado font-bold mt-1">${precioTamaño.toFixed(2)}</p>
              </button>
            )
          })}
        </div>
      </div>

      {/* Selector de Cantidad */}
      <div className="flex items-center gap-4 mb-8">
        <p className="font-semibold">Cantidad:</p>
        <div className="flex items-center border-2 rounded-lg">
          <button
            onClick={() => setCantidad(Math.max(1, cantidad - 1))}
            className="px-4 py-2 hover:bg-gray-100 text-lg font-semibold"
          >-</button>
          <span className="px-6 py-2 border-x text-lg font-medium">{cantidad}</span>
          <button
            onClick={() => setCantidad(cantidad + 1)}
            className="px-4 py-2 hover:bg-gray-100 text-lg font-semibold"
          >+</button>
        </div>
      </div>

      {/* Precio Total */}
      <div className="mb-8 p-4 bg-white rounded-xl">
        <p className="text-sm text-gray-500 mb-1">Total</p>
        <p className="text-3xl font-bold text-dorado">
          ${(precioActual * cantidad).toFixed(2)}
        </p>
        <p className="text-sm text-gray-500">IVA incluido</p>
      </div>

      {/* Botones de Acción */}
      <div className="flex flex-col sm:flex-row gap-4">
        <button className="flex-1 bg-dorado text-white py-4 rounded-lg hover:opacity-90 transition font-semibold text-lg">
          Agregar al carrito
        </button>
        <button className="flex-1 border-2 border-dorado text-dorado py-4 rounded-lg hover:bg-dorado/10 transition font-semibold text-lg">
          Comprar ahora
        </button>
      </div>

      {/* Información adicional */}
      {producto.customizationOptions && producto.customizationOptions.length > 0 && (
        <div className="mt-8 border-t pt-6">
          <p className="font-semibold mb-2">✨ Opciones de personalización:</p>
          <ul className="list-disc list-inside text-gray-600 space-y-1">
            {producto.customizationOptions.map((opt, idx) => (
              <li key={idx}>{opt}</li>
            ))}
          </ul>
        </div>
      )}
    </div>
  )
}