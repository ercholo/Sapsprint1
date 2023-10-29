import { AppBar, Box, Toolbar, Typography, Button, IconButton } from '@mui/material/';
import PrintIcon from '@mui/icons-material/Print';
import { useKeycloak } from '@react-keycloak/web'
import { useState } from 'react';
import { NavLink } from 'react-router-dom';

export const Navbar = () => {

    const { keycloak } = useKeycloak()

    useState(() => {
        if (keycloak?.authenticated) return;
        keycloak?.login();
    }, [keycloak]);

    // useEffect(() => {

    //     const interval = setInterval(() => {
    //         console.log("token "+keycloak.token )
    //         console.log("initialized "+initialized )
    //         console.log("authenticated "+keycloak.authenticated )
    //         console.log("isTokenExpired "+keycloak.isTokenExpired(50))
            
    //     }, 6000);
    //     return () => clearInterval(interval);
    // }, [keycloak, initialized]);
   

    // useEffect(() => {
    //     if (initialized) {
    //         // Establece el manejador de eventos onTokenExpired
    //         keycloak.onTokenExpired = () => {
    //             console.log('Españoles el token ha expirado.');
    //             // Renueva el token
    //             keycloak.updateToken(50)
    //                 .then((refreshed) => {
    //                     if (refreshed) {
    //                         console.log('Token refreshhhcado');
    //                     } else {
    //                         console.log('No ha podido renovarse el token');                        
    //                     }
    //                 })
    //                 .catch((error) => {
    //                     console.error('Error al intentar renovar el token:', error);
                        
    //                 });
    //         };
    //     }
    // }, [keycloak, initialized]);

    const onLogOut = () => {
        keycloak.logout()
    }

    return (
        <Box style={{ marginTop: 80 }}>
            <AppBar position="fixed" sx={{ bgcolor: '#FACD01' }}>
                <Toolbar >
                    <IconButton
                        size="large"
                        edge="start"
                        color="inherit"
                        aria-label="menu"
                        sx={{ mr: 2 }}
                    >
                        <PrintIcon />
                    </IconButton>
                    <Box sx={{ display: 'flex', alignItems: 'center', flexGrow: 1 }}>
                        <NavLink to="/albacete" style={{ textDecoration: "none" }}>
                            <Typography variant="h6" component="div" align="left" sx={{ mr: 2 }}>
                                Albacete
                            </Typography>
                        </NavLink>
                        <NavLink to="/alicante" style={{ textDecoration: "none" }}>
                            <Typography variant="h6" component="div" align="left" sx={{ mr: 2 }}>
                                Alicante
                            </Typography>
                        </NavLink>
                        <NavLink to="/almeria" style={{ textDecoration: "none" }}>
                            <Typography variant="h6" component="div" align="left" sx={{ mr: 2 }}>
                                Almeria
                            </Typography>
                        </NavLink>
                        <NavLink to="/cartagena" style={{ textDecoration: "none" }}>
                            <Typography variant="h6" component="div" align="left" sx={{ mr: 2 }}>
                                Cartagena
                            </Typography>
                        </NavLink>
                        <NavLink to="/gerona" style={{ textDecoration: "none" }}>
                            <Typography variant="h6" component="div" align="left" sx={{ mr: 2 }}>
                                Gerona
                            </Typography>
                        </NavLink>
                        <NavLink to="/santomera" style={{ textDecoration: "none" }}>
                            <Typography variant="h6" component="div" align="left" sx={{ mr: 2 }}>
                                Santomera
                            </Typography>
                        </NavLink>
                        <NavLink to="/token" style={{ textDecoration: "none" }}>
                            <Typography variant="h6" component="div" align="left" sx={{ mr: 2 }}>
                                Token
                            </Typography>
                        </NavLink>
                    </Box>

                    {!!keycloak.authenticated && (
                        <>
                            <Typography
                                variant="h6"
                                component="div"
                                sx={{ color: 'blue', fontSize: 18, marginRight: 2 }}
                                align="right"
                            >
                                ¡ Hola {keycloak.idTokenParsed.given_name} !
                            </Typography>
                            <Button
                                sx={{ fontWeight: 'bold', color: 'red', fontSize: 18, textTransform: 'none' }}
                                onClick={onLogOut}
                                align="right"
                            >
                                Logout
                            </Button>
                        </>
                    )}

                </Toolbar>
            </AppBar>
        </Box>
    );
}