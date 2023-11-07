'use client'

import { Alert } from '@/components/ui/alert'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { signIn } from 'next-auth/react'
import { useState } from 'react'

export const Form = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [firstName, setFirstname] = useState('')
  const [lastName, setLastname] = useState('')
  const [error, setError] = useState<string | null>(null)

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (password !== confirmPassword) {
      setError('Passwords do not match')
      return
    }

    try {
      const res = await fetch('/api/register', {
        method: 'POST',
        body: JSON.stringify({
          email,
          password,
          firstName,
          lastName
        }),
        headers: {
          'Content-Type': 'application/json'
        }
      })
      if (res.ok) {
        signIn()
      } else {
        setError((await res.json()).error)
      }
    } catch (error: any) {
      setError(error?.message)
    }
  }

  return (
    <form onSubmit={onSubmit} className="space-y-8 w-full sm:w-[400px]">
      <div className="grid grid-cols-2 gap-1.5">
        <div className="grid w-full items-center gap-1.5">
          <Label htmlFor="firstName">Old First Name</Label>
          <Input
            className="w-full"
            required
            value={firstName}
            onChange={(e) => setFirstname(e.target.value)}
            id="firstName"
            type="text"
          />
        </div>
        <div className="grid w-full items-center gap-1.5">
          <Label htmlFor="firstName">New First Name</Label>
          <Input
            className="w-full"
            required
            value={firstName}
            onChange={(e) => setLastname(e.target.value)}
            id="firstName"
            type="text"
          />
        </div>
      </div>
      <div className="grid grid-cols-2 gap-1.5">
        <div className="grid w-full items-center gap-1.5">
          <Label htmlFor="lastName">Old Last Name</Label>
          <Input
            className="w-full"
            required
            value={firstName}
            onChange={(e) => setFirstname(e.target.value)}
            id="lastName"
            type="text"
          />
        </div>
        <div className="grid w-full items-center gap-1.5">
          <Label htmlFor="firstName">New Last Name</Label>
          <Input
            className="w-full"
            required
            value={lastName}
            onChange={(e) => setLastname(e.target.value)}
            id="lastName"
            type="text"
          />
        </div>
      </div>
      <div className="grid grid-cols-2 gap-1.5">
        <div className="grid w-full items-center gap-1.5">
          <Label htmlFor="email">Old Email</Label>
          <Input
            className="w-full"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            id="email"
            type="text"
          />
        </div>
        <div className="grid w-full items-center gap-1.5">
          <Label htmlFor="email">New Email</Label>
          <Input
            className="w-full"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            id="email"
            type="text"
          />
        </div>
      </div>
      <div className="grid grid-cols-2 gap-1.5">
        <div className="grid w-full items-center gap-1.5">
          <Label htmlFor="password">New Password</Label>
          <Input
            className="w-full"
            required
            value={email}
            onChange={(e) => setPassword(e.target.value)}
            id="password"
            type="text"
          />
        </div>
        <div className="grid w-full items-center gap-1.5">
          <Label htmlFor="password">Confirm Password</Label>
          <Input
            className="w-full"
            required
            value={email}
            onChange={(e) => setConfirmPassword(e.target.value)}
            id="password"
            type="text"
          />
        </div>
      </div>
      {error && <Alert>{error}</Alert>}
      <div className="w-full">
        <Button className="w-full" size="lg">
          Save
        </Button>
      </div>
    </form>
  )
}
