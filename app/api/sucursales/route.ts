import { NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"

export async function GET() {
  const sucursales = await prisma.sucursal.findMany({
    orderBy: { order: "asc" },
  })

  return NextResponse.json(sucursales)
}
