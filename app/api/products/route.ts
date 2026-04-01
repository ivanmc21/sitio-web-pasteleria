import { NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"

function normalizeProduct(product: any) {
  return {
    ...product,
    slug: product.slug ?? undefined,
    badge: product.badge ?? undefined,
    images: product.images?.length ? product.images : undefined,
    capacity: product.capacity ?? undefined,
    ingredients: product.ingredients?.length ? product.ingredients : undefined,
    nutritionalInfo: product.nutritionalInfo ?? undefined,
    customizationOptions: product.customizationOptions?.length ? product.customizationOptions : undefined,
  }
}

export async function GET() {
  const products = await prisma.product.findMany({
    orderBy: { id: "asc" },
  })

  return NextResponse.json(products.map(normalizeProduct))
}
