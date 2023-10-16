import { Button, Stack, AlertTitle, Snackbar } from '@mui/material';
import { useState, forwardRef, memo } from 'react';
import PropTypes from 'prop-types';
import PauseIcon from '@mui/icons-material/Pause';
import MuiAlert from '@mui/material/Alert';

const Alert = forwardRef(function Alert(props, ref) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});


//uso el memo para que no renderice los botones cuando el componente padre (tablaPrincipal) cambia el estado actualizando la tabla
export const BotonPausa = memo(({ printer }) => {


    console.log('renderizo boton pausar')

    const [buttonText, setButtonText] = useState('Pausar');
    const [showAlertSuccess, setShowAlertSuccess] = useState(false);
    const [showAlertError, setShowAlertError] = useState(false);

    const onPausa = async (printer) => {

        // La función para manejar el punchar el botón ¿fetch?
        try {
            const res = await fetch(`http://172.30.5.181:8888/impresoras/${printer}/pausa/`, {
                method: 'GET'
            })
            const data = await res.json();
            data.pausa ? setShowAlertSuccess(true) : setShowAlertError(true);

        } catch (error) {
            console.log(error);
        } finally {
            setButtonText('Pausar');
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
                startIcon={<PauseIcon />}
                onClick={() =>
                    onPausa(printer)
                }>
                {buttonText}
            </Button>
            {
                showAlertSuccess ?
                    <Snackbar open={showAlertSuccess} autoHideDuration={3000} onClose={handleClose}>
                        <Alert severity="success">
                            <AlertTitle>Pausada correctamente</AlertTitle>
                        </Alert>
                    </Snackbar>
                    :
                    <Snackbar open={showAlertError} autoHideDuration={3000} onClose={handleClose}>
                        <Alert severity="error">
                            <AlertTitle>Error</AlertTitle>
                            This is an error alert — <strong>check it out!</strong>
                        </Alert>
                    </Snackbar>
            }
        </Stack>
    )
});

BotonPausa.propTypes = {
    printer: PropTypes.string
}

BotonPausa.displayName = 'BotonActualizar';

export default BotonPausa;