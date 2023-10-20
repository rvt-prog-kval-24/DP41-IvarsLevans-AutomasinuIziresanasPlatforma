"use client"
import { Footer, Navbar } from '@/components'
import './globals.css'
import type { Metadata } from 'next'
export const metadata: Metadata = {
  title: 'Drive Wise',
  description: 'Driven by Excellence.',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <Navbar />
        <main>
          {children}
        </main>
      <Footer />
    </html>
  )
}
