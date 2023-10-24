import Link from 'next/link'
import { RegisterForm } from './form'

export default function RegisterPage() {
  return (
    <div className="h-screen w-screen flex justify-center items-center">
      <div className="shadow-hl p-6 py-6 bg-black rounded-xl flex flex-col items-center border-[#333] border-2 h-[fit-content]">
        <h1 className="font-semibold text-2xl mb-8 text-white">Create your Account</h1>
        <RegisterForm />
        <p className='mt-6 text-center'>
          Already registered? <Link className="text-blue-500 hover:underline" href="../login">Login</Link>
        </p>
      </div>
    </div>
  )
}
