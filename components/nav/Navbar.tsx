import React from 'react';
import { AppBar, Toolbar, Typography, Box, Button } from '@mui/material';
import PermIdentityIcon from '@mui/icons-material/PermIdentity';
import MenuIcon from '@mui/icons-material/Menu';
import Link from 'next/link'
import { LoginButton, LogoutButton } from '../../app/auth'
import { User } from '../../app/user'

const Navbar: React.FC = () => {
  return (
    <AppBar position="fixed" style={{ backgroundColor: 'rgba(0, 0, 0, 0.5)' }}>
      <Toolbar>
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            width: '100%',
          }}
        >
        <Box sx={{ flex: '1' }}>
          <MenuIcon /> {/* Menu icon on the left */}
        </Box>
        <img src="image/logo.png" width="20%" height="20%" alt="Logo" />
          <Box
            sx={{
              flex: '1',
              display: 'flex',
              justifyContent: 'flex-end',
              alignItems: 'center',
            }}
          >
          <Link href="/login">
            <Button
              color="inherit"
              sx={{
                fontFamily: 'Helvetica, Arial, sans-serif',
                '&:hover': { backgroundColor: 'rgba(255, 255, 255, 0.1)' },
              }}
            >
              Log in
            </Button>
          </Link>
          <Typography
            variant="body1"
            sx={{
            color: 'white',
            mx: 1,
            fontFamily: 'Helvetica, Arial, sans-serif',
            userSelect: 'none', 
            }}
          >
            |
          </Typography>
          <Link href="/register">
            <Button
              color="inherit"
              sx={{
                fontFamily: 'Helvetica, Arial, sans-serif',
                marginRight: '5px',
                '&:hover': { backgroundColor: 'rgba(255, 255, 255, 0.1)' },
              }}
            >
              Register
            </Button>
            <LoginButton />
            <LogoutButton />
          </Link>
            <PermIdentityIcon />
          </Box>
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
