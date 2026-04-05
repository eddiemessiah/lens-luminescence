import './globals.css'
import type { Metadata } from 'next'
import { Playfair_Display, Inter } from 'next/font/google'
import CustomCursor from '@/components/CustomCursor'

const playfair = Playfair_Display({ 
  subsets: ['latin'], 
  variable: '--font-playfair' 
})

const inter = Inter({ 
  subsets: ['latin'], 
  variable: '--font-inter' 
})

export const metadata: Metadata = {
  title: 'Lens & Luminescence | Bespoke Visual Storytelling',
  description: 'Capturing the Elegance of the Unseen. High-end, luxury photography studio.',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={`${playfair.variable} ${inter.variable}`}>
      <body className="bg-obsidian text-alabaster font-sans selection:bg-champagne/30 selection:text-champagne overflow-x-hidden">
        <CustomCursor />
        {children}
      </body>
    </html>
  )
}
