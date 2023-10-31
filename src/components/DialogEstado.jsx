import { forwardRef, memo, useState } from 'react';
// import { BotonDesviaIpOriginal, BotonPagPrueba } from './index';
import { Alert, AlertTitle, Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Slide, Snackbar } from '@mui/material/';
import { blue } from '@mui/material/colors';
import PropTypes from 'prop-types';
import BotonDesviaIpOriginal from './DesviarIpOriginal';

const Transition = forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});

export const DialogEstado = memo(({ openDialog, setOpenDialog, estado }) => {

    const [showAlertSuccess, setShowAlertSuccess] = useState(false);
    const [showAlertError, setShowAlertError] = useState(false);

    const handleClose = () => {
        setOpenDialog(false);
        setShowAlertSuccess(false);
        setShowAlertError(false);
    };

    return (
        <div>
            <Dialog
                open={openDialog}
                TransitionComponent={Transition}
                keepMounted
                onClose={handleClose}
                aria-describedby="estado-y-ultimo-trabajo"
            >
                <DialogTitle style={{ backgroundColor: '#FACD01' }}>
                    <span style={{ color: '#1563B0' }}>Estado impresora {estado.impresora} </span>
                </DialogTitle>
                <DialogContent>
                    <DialogContentText id="estado-y-ultimo-trabajo" component={'span'} sx={{ fontWeight: 'bold', fontSize: 16, color: blue }}>
                        <div style={{ margin: '8px 0' }}>
                            <span style={{ color: '#1563B0' }}>Estado:</span> {estado.estado}
                        </div>
                        <div style={{ margin: '8px 0' }}>
                            <span style={{ color: '#1563B0' }}>Desvío:</span> {estado.desviada ? 'DESVIADA' : 'Sin desvío'}
                        </div>
                        <div style={{ margin: '8px 0' }}>
                            <span style={{ color: '#1563B0' }}>IP actual: </span> {estado.ip}
                        </div>
                        <div style={{ margin: '8px 0' }}>
                            <span style={{ color: '#1563B0' }}>Impresora desviada:</span> {estado.desviada ? estado.impresoraDesvio : 'Sin desvío'}
                        </div>
                        {
                            showAlertSuccess && (
                                <Snackbar open={showAlertSuccess} autoHideDuration={3000} onClose={handleClose}>
                                    <Alert severity="success">
                                        <AlertTitle>Restablecida correctamente</AlertTitle>
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
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <BotonDesviaIpOriginal printer={estado.impresora} isDisabled={estado.desviada ? false : true} handleClose={handleClose} setShowAlertError={setShowAlertError} />
                    {/* <BotonPagPrueba printer={estado.impresora} /> */}
                    <Button onClick={handleClose}>Cerrar</Button>
                </DialogActions>
            </Dialog>
        </div>
    );
});

DialogEstado.propTypes = {
    openDialog: PropTypes.bool,
    setOpenDialog: PropTypes.func,
    estado: PropTypes.object,
};

DialogEstado.displayName = 'DialogEstado';
export default DialogEstado;