import Link from "next/link"
import { Phone, MessageCircle, Mail, MapPin } from "lucide-react"

const contactCards = [
  {
    icon: Phone,
    label: "Teléfono",
    value: "+52 55 1234 5678",
    href: "tel:+525512345678",
  },
  {
    icon: Mail,
    label: "Correo",
    value: "hola@dulcearte.com",
    href: "mailto:hola@dulcearte.com",
  },
  {
    icon: MessageCircle,
    label: "WhatsApp",
    value: "+52 55 9876 5432",
    href: "https://wa.me/525598765432?text=Hola%20Dulce%20Arte%2C%20quiero%20hacer%20una%20consulta",
  },
]

export function ContactInfo() {
  return (
    <section className="rounded-4xl border border-dorado/20 bg-blanco p-8 shadow-lg shadow-dorado/10">
      <div className="flex items-center gap-4 rounded-3xl bg-rosa-claro p-6">
        <div className="flex h-14 w-14 items-center justify-center rounded-3xl bg-dorado text-blanco">
          <MapPin className="h-7 w-7" />
        </div>
        <div>
          {/* <p className="text-sm uppercase tracking-[0.28em] text-dorado">Atención</p> */}
          <p className="mt-0 font-serif text-2xl font-semibold text-texto-principal">
            Estamos aquí para ayudarte
          </p>
        </div>
      </div>

      <div className="mt-8 space-y-6">
        <div>
          <h2 className="text-lg font-semibold text-texto-principal">Horario de atención</h2>
          <p className="mt-3 text-sm leading-7 text-texto-secundario">
            Lunes a viernes: 09:00 - 20:00
            <br />
            Sábados: 10:00 - 18:00
            <br />
            Domingos: Cerrado
          </p>
        </div>

        <div className="grid gap-4 sm:grid-cols-2">
          {contactCards.map((card) => {
            const Icon = card.icon
            return (
              <Link
                key={card.label}
                href={card.href}
                target="_blank"
                rel="noreferrer"
                className="group rounded-3xl border border-dorado/10 bg-rosa-empolvado p-5 transition-all duration-200 hover:-translate-y-1 hover:border-dorado/40"
              >
                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-dorado text-blanco transition-colors group-hover:bg-texto-principal">
                  <Icon className="h-6 w-6" />
                </div>
                <p className="mt-5 text-sm font-medium text-texto-principal">{card.label}</p>
                <p className="mt-2 text-sm leading-6 text-texto-secundario">{card.value}</p>
              </Link>
            )
          })}
        </div>
      </div>
    </section>
  )
}
