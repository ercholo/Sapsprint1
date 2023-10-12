
import { AppBar, Box, Toolbar, Typography, Button, IconButton } from '@mui/material/';
import MenuIcon from '@mui/icons-material/Menu';
import { useKeycloak } from '@react-keycloak/web'

export const Navbar = () => {

    const { keycloak, initialized } = useKeycloak()

    const onLogOut = () => {
        keycloak.logout()
    }

    return (
        <Box sx={{ flexGrow: 1 }}>
            <AppBar position="static" sx={{ bgcolor: '#FACD01' }}>
                <Toolbar >
                    <IconButton
                        size="large"
                        edge="start"
                        color="inherit"
                        aria-label="menu"
                        sx={{ mr: 2 }}
                    >
                        <MenuIcon />
                    </IconButton>
                    <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                        Santomera
                    </Typography>
                    {!!keycloak.authenticated && (
                        <>
                            <Button
                                sx={{ fontWeight: 'bold', color: 'red', fontSize: 18, textTransform: 'none' }}
                                onClick={onLogOut}
                            >
                                Logout
                            </Button>

                            <Typography 
                            variant="h6" 
                            component="div" 
                            sx={{ color: 'blue', fontSize: 16 }}
                            >
                                {keycloak.idTokenParsed.given_name}
                            </Typography>
                        </>
                    )}
                </Toolbar>
            </AppBar>
        </Box>
    );
}