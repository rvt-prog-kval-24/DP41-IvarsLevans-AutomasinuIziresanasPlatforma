'use client'

import { Button } from "@/components/ui/button"
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { useState } from "react"

export const RegisterForm = () => {
    console.log('RegisterForm function executed!')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    
    const onSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        console.log('Submitting form...')
         
        try {
            const res = await fetch('/api/register', {
                method: 'POST',
                body: JSON.stringify({
                    email,
                    password
                }),
                headers: {
                    'Content-Type': 'application/json'
                }
            })
            console.log('Response:', res)
            if (res.ok) {
                console.log('Registration successful!')
                //redirect
            } else {
                console.log('Registration failed:', res.status)
            }
        } catch (error) {
            console.error('Error:', error)
        }

        console.log('Fetch request executed!')
    }
    return (
        <form onSubmit={onSubmit} className='space-y-8 space-h-8'>
            <div className='grid w-full max-w-sm items-center gap-1.5'>
                <Label htmlFor='email'>Email</Label>
                <Input 
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    id='email' type='email' className='rounded'
                />
            </div>
            <div className='grid w-full max-w-sm items-center gap-1.5'>
                <Label htmlFor='password'>Password</Label>
                <Input 
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    id='password' type='password' className='rounded'
                />
            </div>
            <div className="w-full">
                <Button type='submit' className='w-full rounded  bg-[#444] text-white 
                hover:bg-[#333]' style={{fontWeight: 'bold'}}>Register</Button>
            </div>
        </form>
    )
}
