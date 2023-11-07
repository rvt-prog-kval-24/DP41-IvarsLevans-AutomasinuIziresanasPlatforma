import React from 'react';
import { AppBar, Toolbar, Typography, Box, Button } from '@mui/material';
import PermIdentityIcon from '@mui/icons-material/PermIdentity';
import MenuIcon from '@mui/icons-material/Menu';
import Link from 'next/link'
import { LogoutButton } from '../../app/auth'

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
                    <Box sx={{ flex: '1', display: 'flex', justifyContent: 'center' }}>
                        <Link href="/">
                            <img src="image/logo.png" width="50%" height="50%" alt="Logo" style={{ display: 'block', margin: 'auto' }} />
                        </Link>
                    </Box>
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
                        </Link>
                        <LogoutButton />
                        <PermIdentityIcon />
                    </Box>
                </Box>
            </Toolbar>
        </AppBar>
    );
};

export default Navbar;
