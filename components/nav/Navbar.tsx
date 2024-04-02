"use client";

import React from "react";
import { AppBar, Toolbar, Typography, Box, Button } from "@mui/material";
import PermIdentityIcon from "@mui/icons-material/PermIdentity";
import MenuIcon from "@mui/icons-material/Menu";
import Link from "next/link";
import { signIn, signOut } from "next-auth/react";
import { useSession } from 'next-auth/react';
import Image from 'next/image';

const Navbar: React.FC = () => {
    const { data: session } = useSession();
    return (
        <AppBar position="fixed" style={{ backgroundColor: "rgba(1, 1, 1, 1)" }}>
            <Toolbar>
                <Box
                    sx={{
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                        width: "100%",
                    }}
                >
                    <Box sx={{ flex: "1" }}>
                        <MenuIcon /> {/* Menu icon on the left */}
                    </Box>
                    <Box sx={{ flex: "1", display: "flex", justifyContent: "center" }}>
                        <Link href="/">
                            <Typography variant="h4" component="div" style={{ display: "block", margin: "auto", fontWeight: "bold", fontStyle: "italic", textDecoration: "line-through", textDecorationColor: "black" }}>
                                DRIVE WISE.
                            </Typography>
                        </Link>
                    </Box>
                    <Box
                        sx={{
                            flex: "1",
                            display: "flex",
                            justifyContent: "flex-end",
                            alignItems: "center",
                        }}
                    >
                        {session ? (
                            <>
                                <Button
                                    color="inherit"
                                    sx={{
                                        fontFamily: "Helvetica, Arial, sans-serif",
                                        marginRight: "5px",
                                        "&:hover": { backgroundColor: "rgba(255, 255, 255, 0.1)" },
                                    }}
                                    onClick={() => signOut()}
                                >
                                    Sign Out
                                </Button>
                                <PermIdentityIcon />
                            </>
                        ) : (
                            <>
                                <Button
                                    color="inherit"
                                    sx={{
                                        fontFamily: "Helvetica, Arial, sans-serif",
                                        marginRight: "5px",
                                        "&:hover": { backgroundColor: "rgba(255, 255, 255, 0.1)" },
                                    }}
                                    onClick={() => signIn()}
                                >
                                    Sign in
                                </Button>
                                <Typography
                                    variant="body1"
                                    sx={{
                                        color: "white",
                                        mx: 1,
                                        fontFamily: "Helvetica, Arial, sans-serif",
                                        userSelect: "none",
                                    }}
                                >
                                    |
                                </Typography>
                                <Link href="/register">
                                    <Button
                                        color="inherit"
                                        sx={{
                                            fontFamily: "Helvetica, Arial, sans-serif",
                                            marginRight: "5px",
                                            "&:hover": { backgroundColor: "rgba(255, 255, 255, 0.1)" },
                                        }}
                                    >
                                        Register
                                    </Button>
                                </Link>
                            </>
                        )}
                    </Box>
                </Box>
            </Toolbar>
        </AppBar>
    );
};

export default Navbar;
