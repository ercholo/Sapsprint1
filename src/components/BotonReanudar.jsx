import { Button, Stack, AlertTitle, Snackbar } from '@mui/material';
import { useState, forwardRef, memo } from 'react';
import MuiAlert from '@mui/material/Alert';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import PropTypes from 'prop-types';
import { useKeycloak } from '@react-keycloak/web';

const Alert = forwardRef(function Alert(props, ref) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});


//uso el memo para que no renderice los botones cuando el componente padre (tablaPrincipal) cambia el estado actualizando la tabla
export const BotonReanudar = memo(({ printer }) => {


    const [showAlertSuccess, setShowAlertSuccess] = useState(false);
    const [showAlertError, setShowAlertError] = useState(false);
    const { keycloak } = useKeycloak();

    const onReanuda = async (printer) => {

        // La función para manejar el punchar el botón ¿fetch?
        try {
            const res = await fetch(`http://172.30.5.181:8888/impresoras/${printer}/reanuda`, {
                method: 'GET',
                headers: {
                    'Authorization': `Bearer ${keycloak.token}`
                }
            })
            const data = await res.json();
            data.reanuda ? setShowAlertSuccess(true) : setShowAlertError(true);

        } catch (error) {
            console.log(error);
        }
    }

    const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }
        setShowAlertSuccess(false);
    };

    return (
        <Stack spacing={2} sx={{ width: '100%' }}>
            <Button
                variant="contained"
                startIcon={<PlayArrowIcon />}
                onClick={() =>
                    onReanuda(printer)
                }>
                Reanudar
            </Button>
            {
                showAlertSuccess && (
                    <Snackbar open={showAlertSuccess} autoHideDuration={3000} onClose={handleClose}>
                        <Alert severity="success">
                            <AlertTitle>Reanuda impresión correcta</AlertTitle>
                        </Alert>
                    </Snackbar>
                )}
            {
                showAlertError && (
                    <Snackbar open={showAlertError} autoHideDuration={3000} onClose={handleClose}>
                        <Alert severity="error">
                            <AlertTitle>Error</AlertTitle>
                            This is an error alert — <strong>check it out!</strong>
                        </Alert>
                    </Snackbar>
                )}
        </Stack>
    )
});


BotonReanudar.displayName = 'BotonActualizar';

export default BotonReanudar;

BotonReanudar.propTypes = {
    printer: PropTypes.string
}