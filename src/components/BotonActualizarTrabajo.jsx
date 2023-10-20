import { Button, Stack, AlertTitle, Snackbar } from '@mui/material';
import { useState, forwardRef, memo } from 'react';
import MuiAlert from '@mui/material/Alert';
import UpdateIcon from '@mui/icons-material/Update';
import PropTypes from 'prop-types';

const Alert = forwardRef(function Alert(props, ref) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});


//uso el memo para que no renderice los botones cuando el componente padre (tablaPrincipal) cambia el estado actualizando la tabla
export const BotonActualizar = memo(({ printer, recibirDatos }) => {

    const [showAlertSuccess, setShowAlertSuccess] = useState(false);
    const [showAlertError, setShowAlertError] = useState(false);

    console.log('renderizo boton actualizar')

    const onActualiza = async (printer) => {

        console.log("hago llamada para actualizar")

        try {
            const res = await fetch(`http://172.30.5.181:8888/impresoras/${printer}/`, {
                method: 'GET'
            })
            const data = await res.json();
            // console.log(data)
            if (data.ok) {
                setShowAlertSuccess(true);
                // Llamar a la función recibirDatos para enviar los datos al componente padre
                recibirDatos(data); // Esto envía los datos al componente padre (TablaPrincipal)
            } else {
                setShowAlertError(true);
            }

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
                startIcon={<UpdateIcon />}
                onClick={() =>
                    onActualiza(printer)
                }>
                Actualizar
            </Button>
            {
                showAlertSuccess && (
                    <Snackbar open={showAlertSuccess} autoHideDuration={3000} onClose={handleClose}>
                        <Alert severity="success">
                            <AlertTitle>Datos actualizados</AlertTitle>
                        </Alert>
                    </Snackbar>
                )}
            {
                showAlertError && (
                    <Snackbar open={showAlertError} autoHideDuration={2000} onClose={handleClose}>
                        <Alert severity="error">
                            <AlertTitle>Error</AlertTitle>
                            This is an error alert — <strong>check it out!</strong>
                        </Alert>
                    </Snackbar>
                )}
        </Stack>
    )
})

BotonActualizar.displayName = 'BotonActualizar';

export default BotonActualizar;

BotonActualizar.propTypes = {
    printer: PropTypes.string,
    recibirDatos: PropTypes.func
}