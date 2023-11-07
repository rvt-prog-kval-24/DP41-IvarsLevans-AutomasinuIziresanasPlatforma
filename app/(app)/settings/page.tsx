import Link from 'next/link'
import { Form as SettingsForm } from './form'

export default function Settings() {
  return (
    <div className="h-screen w-screen flex justify-center items-center bg-black">
      <div className="sm:shadow-xl px-8 pb-8 pt-12 sm:bg-white rounded-xl space-y-12">
        <h1 className="font-semibold text-2xl">Settings</h1>
        <SettingsForm/>
        <p className="text-center">
          Return back to{' '}
          <Link className="text-blue-500 hover:underline" href="/">
            home
          </Link>{' '}
        </p>
      </div>
    </div>
  )
}
