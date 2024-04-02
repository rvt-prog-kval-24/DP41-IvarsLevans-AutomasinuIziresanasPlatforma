import './globals.css'
import { Providers } from './providers'
import { Footer, Navbar } from '../components/nav'

export const metadata = {
  title: 'Drive Wise',
  description: 'Driven by Excellence'
}

export default function RootLayout({
  children
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <head>
        <title>{metadata.title}</title>
        <meta name="description" content={metadata.description} />
      </head>
      <body>
        <header>
          <Providers>
          <Navbar />
          </Providers>
        </header>
        <Providers>{children}</Providers>
        <Footer />
      </body>
    </html>
  )
}