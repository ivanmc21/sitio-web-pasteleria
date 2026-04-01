// app/productos/[id]/components/product-gallery.tsx
'use client'

import { useState } from 'react'
import Image from 'next/image'

interface ProductGalleryProps {
  imagenes: string[]
  nombre: string
}

export default function ProductGallery({ imagenes, nombre }: ProductGalleryProps) {
  const [imagenPrincipal, setImagenPrincipal] = useState(0)

  return (
    <div>
      {/* Imagen principal */}
      <div className="bg-white rounded-2xl overflow-hidden mb-4 aspect-square">
        <Image
          src={imagenes[imagenPrincipal] || '/placeholder-pastel.jpg'}
          alt={nombre}
          width={600}
          height={600}
          className="w-full h-full object-cover"
        />
      </div>

      {/* Miniaturas */}
      <div className="flex gap-2 overflow-x-auto pb-2">
        {imagenes.map((img, idx) => (
          <button
            key={idx}
            onClick={() => setImagenPrincipal(idx)}
            className={`shrink-0 w-20 h-20 rounded-lg overflow-hidden border-2 transition
              ${imagenPrincipal === idx 
                ? 'border-dorado' 
                : 'border-transparent hover:border-dorado/50'}`}
          >
            <Image
              src={img}
              alt={`${nombre} ${idx + 1}`}
              width={80}
              height={80}
              className="w-full h-full object-cover"
            />
          </button>
        ))}
      </div>
    </div>
  )
}