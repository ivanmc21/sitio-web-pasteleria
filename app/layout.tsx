import type { Metadata } from 'next'
import { Playfair_Display, Montserrat } from 'next/font/google'
import { Analytics } from '@vercel/analytics/next'
import { WhatsAppFloatButton } from '@/components/whatsapp-float-button'
import { Navbar } from '@/components/navbar' 
import { Footer } from '@/components/footer' 
import './globals.css'

const playfairDisplay = Playfair_Display({ 
  subsets: ["latin"],
  variable: '--font-playfair-display',
  display: 'swap',
});

const montserrat = Montserrat({ 
  subsets: ["latin"],
  variable: '--font-montserrat',
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'Dulce Arte | Pastelería Artesanal',
  description: 'Pastelería artesanal con los mejores pasteles, postres y dulces. Descubre nuestras creaciones hechas con amor y los mejores ingredientes.',
  generator: 'v0.app',
  icons: {
    icon: [
      {
        url: '/icon-light-32x32.png',
        media: '(prefers-color-scheme: light)',
      },
      {
        url: '/icon-dark-32x32.png',
        media: '(prefers-color-scheme: dark)',
      },
      {
        url: '/icon.svg',
        type: 'image/svg+xml',
      },
    ],
    apple: '/apple-icon.png',
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="es" className={`${playfairDisplay.variable} ${montserrat.variable}`}>
      <body className="font-sans antialiased min-h-screen flex flex-col">
        <Navbar />
        <main className="flex-1">
          {children}
        </main>
        <Footer />
        <WhatsAppFloatButton />
        <Analytics />
      </body>
    </html>
  )
}