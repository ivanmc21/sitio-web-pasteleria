export function buildWhatsAppLink(message?: string) {
  const phone = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER
  const defaultMessage = process.env.NEXT_PUBLIC_WHATSAPP_DEFAULT_MESSAGE

  const text = encodeURIComponent(message || defaultMessage || "")

  return `https://wa.me/${phone}?text=${text}`
}