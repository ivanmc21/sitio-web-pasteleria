// app/productos/[id]/components/related-products.tsx
import Link from 'next/link'
import Image from 'next/image'

interface RelatedProductsProps {
  categoria: string
  productoActual: number
  productos: Array<{
    id: number
    category: string
    image: string
    name: string
    price: number
  }>
}

export default function RelatedProducts({ categoria, productoActual, productos }: RelatedProductsProps) {
  const relacionados = productos
    .filter((p) => p.category === categoria && p.id !== productoActual)
    .slice(0, 4)

  if (relacionados.length === 0) return null

  return (
    <div className="mt-16">
      <h2 className="font-playfair text-2xl md:text-3xl mb-6">
        También te puede gustar
      </h2>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {relacionados.map(p => (
          <Link 
            key={p.id} 
            href={`/productos/${p.id}`}
            className="group"
          >
            <div className="bg-white rounded-xl p-3 shadow-sm hover:shadow-md transition">
              <div className="aspect-square rounded-lg overflow-hidden mb-2">
                <Image
                  src={p.image}
                  alt={p.name}
                  width={200}
                  height={200}
                  className="w-full h-full object-cover group-hover:scale-105 transition"
                />
              </div>
              <h3 className="font-playfair font-semibold truncate">
                {p.name}
              </h3>
              <p className="text-dorado font-bold mt-1">
                ${p.price}
              </p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  )
}