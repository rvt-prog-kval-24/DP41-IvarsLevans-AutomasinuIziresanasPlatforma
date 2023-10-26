'use client'

import { useSession, SessionProvider } from 'next-auth/react'
import React from 'react'

export const User = () => {
  const { data: session } = useSession()
  console.log('Client Session', session)
  return <pre>{JSON.stringify(session)}</pre>
}

const UserWrapper = () => {
  return (
    <SessionProvider>
      <User />
    </SessionProvider>
  )
}

export default UserWrapper


