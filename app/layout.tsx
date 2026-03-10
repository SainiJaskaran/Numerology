import type React from "react"
import type { Metadata } from "next"
import { Playfair_Display, Inter } from "next/font/google"
import { Analytics } from "@vercel/analytics/next"
import "./globals.css"

const _playfairDisplay = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-heading",
})
const _inter = Inter({
  subsets: ["latin"],
  variable: "--font-body",
})

export const metadata: Metadata = {
  title: "Numerology Consultations | Discover Your Spiritual Path",
  description: "Personalized numerology consultations to guide your life journey",
  generator: "v0.app",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className={`${_playfairDisplay.variable} ${_inter.variable} font-body antialiased`}>
        {children}
        <Analytics />
      </body>
    </html>
  )
}
