import { HeroSection } from "@/components/hero-section"
import { FeaturedProducts } from "@/components/featured-products"
import { Button } from "@/components/ui/button"
import Link from "next/link"

export default function HomePage() {
  return (
    <>      
      <main className="flex-1">
        {/* Hero Section */}
        <HeroSection />

        {/* Featured Products Section */}
        <FeaturedProducts />

        {/* Features Section */}
        <section className="bg-crema">
          <div className="mx-auto max-w-7xl px-4 py-16 md:px-8 md:py-20">
            <h2 className="text-center font-serif text-3xl font-bold text-texto-principal md:text-4xl">
              ¿Por qué elegirnos?
            </h2>
            <div className="mt-12 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
              {/* Feature Card 1 */}
              <div className="rounded-lg bg-blanco p-6 shadow-sm">
                <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-dorado/10">
                  <span className="text-2xl">🎂</span>
                </div>
                <h3 className="font-serif text-xl font-semibold text-texto-principal">
                  Recetas Artesanales
                </h3>
                <p className="mt-2 font-sans text-texto-secundario">
                  Cada producto es elaborado siguiendo recetas tradicionales 
                  con un toque de innovación.
                </p>
              </div>

              {/* Feature Card 2 */}
              <div className="rounded-lg bg-blanco p-6 shadow-sm">
                <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-dorado/10">
                  <span className="text-2xl">✨</span>
                </div>
                <h3 className="font-serif text-xl font-semibold text-texto-principal">
                  Ingredientes Premium
                </h3>
                <p className="mt-2 font-sans text-texto-secundario">
                  Utilizamos solo los mejores ingredientes para garantizar 
                  la calidad en cada bocado.
                </p>
              </div>

              {/* Feature Card 3 */}
              <div className="rounded-lg bg-blanco p-6 shadow-sm sm:col-span-2 lg:col-span-1">
                <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-dorado/10">
                  <span className="text-2xl">💝</span>
                </div>
                <h3 className="font-serif text-xl font-semibold text-texto-principal">
                  Hecho con Amor
                </h3>
                <p className="mt-2 font-sans text-texto-secundario">
                  Cada creación está hecha con dedicación y pasión por 
                  nuestro equipo de pasteleros.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="bg-rosa-empolvado">
          <div className="mx-auto max-w-7xl px-4 py-16 md:px-8 md:py-20">
            <div className="rounded-xl bg-blanco p-8 text-center shadow-sm md:p-12">
              <h2 className="font-serif text-2xl font-bold text-texto-principal md:text-3xl text-balance">
                ¿Listo para endulzar tu día?
              </h2>
              <p className="mx-auto mt-4 max-w-xl font-sans text-texto-secundario text-pretty">
                Visita cualquiera de nuestras sucursales o realiza tu pedido 
                personalizado. ¡Te esperamos!
              </p>
              <div className="mt-8 flex flex-col items-center justify-center gap-4 sm:flex-row">
                <Button className="bg-dorado px-6 py-3 text-blanco hover:bg-dorado/90">
                  <Link href="/sucursales">Ver Sucursales</Link>
                </Button>
                <Button 
                  className="bg-exito-whatsapp px-6 py-3 text-blanco hover:bg-exito-whatsapp/90"
                >
                  WhatsApp
                </Button>
              </div>
            </div>
          </div>
        </section>
      </main>

    </>
  )
}
