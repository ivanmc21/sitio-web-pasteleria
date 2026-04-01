"use client"

import { useState } from "react"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"

const contactFormSchema = z.object({
  firstName: z.string().min(1, "Por favor ingresa tu nombre"),
  lastName: z.string().min(1, "Por favor ingresa tu apellido paterno"),
  secondLastName: z.string().min(1, "Por favor ingresa tu apellido materno"),
  email: z.string().email("Ingresa un correo electrónico válido"),
  phone: z.string().optional(),
  message: z.string().min(10, "El mensaje debe tener al menos 10 caracteres"),
})

type ContactFormValues = z.infer<typeof contactFormSchema>

interface ContactFormProps {
  onSuccess: () => void
}

export function ContactForm({ onSuccess }: ContactFormProps) {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitError, setSubmitError] = useState<string | null>(null)

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ContactFormValues>({
    resolver: zodResolver(contactFormSchema),
  })

  const onSubmit = async (values: ContactFormValues) => {
    setSubmitError(null)
    setIsSubmitting(true)

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(values),
      })

      if (!response.ok) {
        const result = await response.json().catch(() => null)
        const message = result?.error || "No se pudo enviar el mensaje"
        throw new Error(message)
      }

      reset()
      onSuccess()
    } catch (error) {
      setSubmitError(
        error instanceof Error ? error.message : "Error inesperado. Intenta de nuevo"
      )
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <section className="rounded-4xl border border-dorado/20 bg-blanco p-8 shadow-lg shadow-dorado/10">
      <div className="mb-8">
        <h2 className="font-serif text-2xl font-semibold text-texto-principal">Escríbenos</h2>
        <p className="mt-3 text-sm leading-6 text-texto-secundario">
          Completa el formulario y nos pondremos en contacto contigo lo antes posible.
        </p>
      </div>

      <form className="space-y-6" onSubmit={handleSubmit(onSubmit)} noValidate>
        <div className="grid gap-4 sm:grid-cols-2">
          <label className="block">
            <span className="text-sm font-medium text-texto-principal">Nombre(s)</span>
            <input
              type="text"
              placeholder="Ana"
              {...register("firstName")}
              className="mt-2 w-full rounded-3xl border border-border bg-[#FCF6F6] px-4 py-3 text-sm text-texto-principal outline-none transition focus:border-dorado focus:ring-2 focus:ring-dorado/20"
            />
            {errors.firstName && (
              <p className="mt-2 text-sm text-red-500">{errors.firstName.message}</p>
            )}
          </label>

          <label className="block">
            <span className="text-sm font-medium text-texto-principal">Apellido paterno</span>
            <input
              type="text"
              placeholder="López"
              {...register("lastName")}
              className="mt-2 w-full rounded-3xl border border-border bg-[#FCF6F6] px-4 py-3 text-sm text-texto-principal outline-none transition focus:border-dorado focus:ring-2 focus:ring-dorado/20"
            />
            {errors.lastName && (
              <p className="mt-2 text-sm text-red-500">{errors.lastName.message}</p>
            )}
          </label>
        </div>

        <label className="block">
          <span className="text-sm font-medium text-texto-principal">Apellido materno</span>
          <input
            type="text"
            placeholder="García"
            {...register("secondLastName")}
            className="mt-2 w-full rounded-3xl border border-border bg-[#FCF6F6] px-4 py-3 text-sm text-texto-principal outline-none transition focus:border-dorado focus:ring-2 focus:ring-dorado/20"
          />
          {errors.secondLastName && (
            <p className="mt-2 text-sm text-red-500">{errors.secondLastName.message}</p>
          )}
        </label>

        <div className="grid gap-4 sm:grid-cols-2">
          <label className="block">
            <span className="text-sm font-medium text-texto-principal">Correo electrónico</span>
            <input
              type="email"
              placeholder="correo@ejemplo.com"
              {...register("email")}
              className="mt-2 w-full rounded-3xl border border-border bg-[#FCF6F6] px-4 py-3 text-sm text-texto-principal outline-none transition focus:border-dorado focus:ring-2 focus:ring-dorado/20"
            />
            {errors.email && (
              <p className="mt-2 text-sm text-red-500">{errors.email.message}</p>
            )}
          </label>

          <label className="block">
            <span className="text-sm font-medium text-texto-principal">Teléfono</span>
            <input
              type="tel"
              placeholder="55 1234 5678"
              {...register("phone")}
              className="mt-2 w-full rounded-3xl border border-border bg-[#FCF6F6] px-4 py-3 text-sm text-texto-principal outline-none transition focus:border-dorado focus:ring-2 focus:ring-dorado/20"
            />
            {errors.phone && (
              <p className="mt-2 text-sm text-red-500">{errors.phone.message}</p>
            )}
          </label>
        </div>

        <label className="block">
          <span className="text-sm font-medium text-texto-principal">Mensaje</span>
          <textarea
            rows={6}
            placeholder="Cuéntanos sobre tu evento o pregunta"
            {...register("message")}
            className="mt-2 w-full rounded-3xl border border-border bg-[#FCF6F6] px-4 py-4 text-sm text-texto-principal outline-none transition focus:border-dorado focus:ring-2 focus:ring-dorado/20"
          />
          {errors.message && (
            <p className="mt-2 text-sm text-red-500">{errors.message.message}</p>
          )}
        </label>

        {submitError && (
          <div className="rounded-3xl bg-red-50 p-4 text-sm text-red-700">
            {submitError}
          </div>
        )}

        <button
          type="submit"
          disabled={isSubmitting}
          className="inline-flex w-full items-center justify-center rounded-3xl bg-dorado px-6 py-3 text-sm font-semibold text-white transition hover:bg-dorado/90 disabled:cursor-not-allowed disabled:opacity-60 cursor-pointer"
        >
          {isSubmitting ? "Enviando mensaje..." : "Enviar mensaje"}
        </button>
      </form>
    </section>
  )
}
