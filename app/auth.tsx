'use client'

import { signIn, signOut } from 'next-auth/react'
import { Button } from '@mui/material';

export const LoginButton = () => {
  return (
    <Button
      color="inherit"
      sx={{
        fontFamily: 'Helvetica, Arial, sans-serif',
        marginRight: '5px',
        '&:hover': { backgroundColor: 'rgba(255, 255, 255, 0.1)' },
      }}
      onClick={() => signIn()}
    >
      Sign in
    </Button>
  );
}

export const LogoutButton = () => {
  return (
    <Button
      color="inherit"
      sx={{
        fontFamily: 'Helvetica, Arial, sans-serif',
        marginRight: '5px',
        '&:hover': { backgroundColor: 'rgba(255, 255, 255, 0.1)' },
      }}
      onClick={() => signOut()}
    >
      Log Out
    </Button>
  );
}
