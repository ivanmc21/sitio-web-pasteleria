import { NextRequest, NextResponse } from "next/server"
import { z } from "zod"
import { prisma } from "@/lib/prisma"

const contactSchema = z.object({
  firstName: z.string().min(1, "Por favor ingresa tu nombre"),
  lastName: z.string().min(1, "Por favor ingresa tu apellido paterno"),
  secondLastName: z.string().min(1, "Por favor ingresa tu apellido materno"),
  email: z.string().email("Ingresa un correo electrónico válido"),
  phone: z.string().optional(),
  message: z.string().min(10, "El mensaje debe tener al menos 10 caracteres"),
})

type ContactInput = z.infer<typeof contactSchema>

export async function POST(request: NextRequest) {
  try {
    const payload = await request.json()
    const parsed = contactSchema.safeParse(payload)

    if (!parsed.success) {
      return NextResponse.json(
        { error: "Datos inválidos", issues: parsed.error.format() },
        { status: 400 }
      )
    }

    const contactData: ContactInput = parsed.data

    await prisma.contactMessage.create({
      data: {
        firstName: contactData.firstName,
        lastName: contactData.lastName,
        secondLastName: contactData.secondLastName,
        email: contactData.email,
        phone: contactData.phone,
        message: contactData.message,
      },
    })

    return NextResponse.json(
      { message: "Tu mensaje ha sido enviado correctamente" },
      { status: 201 }
    )
  } catch (error) {
    console.error("Error en POST /api/contact:", error)
    return NextResponse.json(
      { error: "No se pudo enviar el mensaje. Intenta de nuevo más tarde." },
      { status: 500 }
    )
  }
}
