import { Home } from '@/components'
import Image from 'next/image'

export default function Page() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between">
      <div className="overflow-hidden">
        <Home />
      </div>
    </main>
  )
}