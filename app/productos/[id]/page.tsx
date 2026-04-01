// app/productos/[id]/page.tsx
import { notFound } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { WhatsAppFloatButton } from "@/components/whatsapp-float-button";
import ProductGallery from "./components/product-gallery";
import ProductInfo from "./components/product-info";
import ProductTabs from "./components/product-tabs";
import RelatedProducts from "./components/related-products";
import type { CatalogProduct } from "@/components/catalog-product-card";

interface PageProps {
  params: Promise<{
    id: string;
  }>;
}

function normalizeProduct(product: any): CatalogProduct {
  return {
    ...product,
    slug: product.slug ?? undefined,
    badge: product.badge ?? undefined,
    images: product.images?.length ? product.images : undefined,
    capacity: product.capacity ?? undefined,
    ingredients: product.ingredients?.length ? product.ingredients : undefined,
    nutritionalInfo: product.nutritionalInfo ?? undefined,
    customizationOptions: product.customizationOptions?.length
      ? product.customizationOptions
      : undefined,
  };
}

export default async function ProductoDetallePage({ params }: PageProps) {
  const id = Number((await params).id);

  if (!Number.isInteger(id) || id <= 0) {
    notFound();
  }

  const productoDb = await prisma.product.findUnique({
    where: { id },
  });

  if (!productoDb) {
    notFound();
  }

  const producto: CatalogProduct = normalizeProduct({
    ...productoDb,
    slug: productoDb.slug ?? undefined,
    badge: productoDb.badge
      ? (productoDb.badge as CatalogProduct["badge"])
      : undefined,
    size: productoDb.size as CatalogProduct["size"],
  });

  const relatedProductsDb = await prisma.product.findMany({
    where: {
      category: producto.category,
      id: { not: id },
    },
    take: 4,
  });

  const relatedProducts: CatalogProduct[] = relatedProductsDb.map((product) =>
    normalizeProduct({
      ...product,
      slug: product.slug ?? undefined,
      badge: product.badge
        ? (product.badge as CatalogProduct["badge"])
        : undefined,
      size: product.size as CatalogProduct["size"],
    }),
  );

  return (
    <div className="bg-rosa-empolvado min-h-screen">
      <main className="mx-auto max-w-7xl px-4 py-8">
        {/* Breadcrumbs */}
        {/* <div className="mb-6 font-sans text-sm text-texto-secundario">
          <span>Inicio</span> {">"} <span>Productos</span> {">"}
          <span className="ml-1 text-dorado">{producto.name}</span>
        </div> */}

        {/* Grid principal */}
        <div className="grid gap-8 md:grid-cols-2 lg:gap-12">
          {/* Galería de imágenes */}
          <ProductGallery
            imagenes={producto.images || [producto.image]}
            nombre={producto.name}
          />

          {/* Información del producto */}
          <ProductInfo producto={producto} />
        </div>

        {/* Pestañas de información */}
        <ProductTabs
          descripcion={producto.description}
          ingredientes={producto.ingredients || []}
          customizationOptions={producto.customizationOptions || []}
        />

        {/* Productos relacionados */}
        <RelatedProducts
          categoria={producto.category}
          productoActual={producto.id}
          productos={relatedProducts}
        />
      </main>
      <WhatsAppFloatButton />
    </div>
  );
}
