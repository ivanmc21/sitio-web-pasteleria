import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma"; 

export async function GET() {
  try {
    // Obtener productos donde badge sea "destacado" o "nuevo"
    const featuredProducts = await prisma.product.findMany({
      where: {
        badge: {
          in: ["destacado", "nuevo"],
        },
      },
      orderBy: [
        // Ordenar primero por badge destacado, luego por fecha de creación
        {
          badge: "desc",
        },
        {
          createdAt: "desc",
        },
      ],
      take: 8, // Limitar a 8 productos para el carrusel
    });

    return NextResponse.json(featuredProducts);
  } catch (error) {
    console.error("Error fetching featured products:", error);
    return NextResponse.json(
      { error: "Failed to fetch featured products" },
      { status: 500 }
    );
  }
}