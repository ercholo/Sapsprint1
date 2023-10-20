import { useState, forwardRef } from 'react';
import { Button, Stack, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Slide, AlertTitle, Snackbar } from '@mui/material';
import MuiAlert from '@mui/material/Alert';
import PropTypes from 'prop-types';
import { blue } from '@mui/material/colors';

const impresorasPapel = [
    {
        impresora: "01ALAV101",
        ip: "172.30.2.51"
    },
    {
        impresora: "01ALAV102",
        ip: "172.30.2.50"
    },
    {
        impresora: "01ALAV201",
        ip: "172.30.2.52"
    },
    {
        impresora: "01ALAV202",
        ip: "172.30.2.56"
    },
    {
        impresora: "01ALDEV01",
        ip: "172.30.2.91"
    },
    {
        impresora: "01ALENT01",
        ip: "172.30.2.40"
    },
    {
        impresora: "01ALJEF01",
        ip: "172.30.2.58"
    },
    {
        impresora: "01ALPSI01",
        ip: "172.30.2.46"
    },
    {
        impresora: "01ALPYE01",
        ip: "172.30.2.5"
    },
    {
        impresora: "01ALPYE02",
        ip: "172.30.2.34"
    },
    {
        impresora: "01ALSAA01",
        ip: "172.30.2.23"
    },
    {
        impresora: "01ALSAF01",
        ip: "172.30.2.33"
    },
    {
        impresora: "01ALSAL01",
        ip: "172.30.2.12"
    },
    {
        impresora: "01ATTOM01",
        ip: "172.30.2.35"
    },
    {
        impresora: "01ATTOM02",
        ip: "172.30.2.120"
    },
    {
        impresora: "03ADCOM01",
        ip: "172.30.30.247"
    },
    {
        impresora: "03ATTOM01",
        ip: "172.30.30.246"
    },
    {
        impresora: "03ALSAL01",
        ip: "172.30.30.245"
    },
    {
        impresora: "03ALAV101",
        ip: "172.30.30.248"
    },
    {
        impresora: "03ALAV102",
        ip: "172.30.30.249"
    }
]

//Esta función hace desplazarse el dialog
const Transition = forwardRef(function Transition(props, ref) {
    return <Slide direction="down" ref={ref} {...props} />;
});

const Alert = forwardRef(function Alert(props, ref) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

export const DialogDesviar = ({ setOpenDialog, openDialog, estado }) => {

    //Si existe la prop(cuando llega) coge los dos primeros caracteres para saber de que almacen es la imperesora que se quiere desviar.
    const almImp = estado?.impresora?.substring(0, 2) || '';

    const [showAlertSuccess, setShowAlertSuccess] = useState(false);
    const [showAlertError, setShowAlertError] = useState(false);

    const handleclick = async (impresoraDestino) => {

        console.log(`Desviar la impresora ${estado.impresora} por ${impresoraDestino}`);

        try {
            const res = await fetch(`http://172.30.5.181:8888/impresoras/${estado.impresora}/${impresoraDestino}/desviar`, {
                method: 'GET'
            });
            const { isDesviada } = await res.json();
            isDesviada ? setShowAlertSuccess(true) : setShowAlertError(true);

            console.log(isDesviada);
        } catch (error) {
            console.log(error);
        }
    }

    const handleClose = () => {
        setOpenDialog(false);
    };


    return (
        <div>
            <Dialog
                open={openDialog}
                TransitionComponent={Transition}
                keepMounted
                onClose={handleClose}
                aria-describedby="isDesviada-y-desviada"
            >
                <DialogTitle>
                    <span style={{ color: blue[500] }}>Pulsa botón para desviar la impresora {estado.impresora} </span>
                </DialogTitle>
                <DialogContent>
                    <DialogContentText id="isDesviada-y-desviada" component={'span'} sx={{ fontWeight: 'bold', fontSize: 16, color: blue }}>
                        {
                            estado.desviada ?
                                <div style={{ margin: '8px 0' }}>
                                    {/*Si la impresora está desviada no hacemos nada*/}
                                    <span style={{ color: blue[500] }}>DESVÍO:</span> {'LA IMPRESORA ESTÁ DESVIADA, PRIMERO HAY QUE DEVOLVERLA A SU SITIO ORIGINAL'}
                                </div>
                                :
                                <Stack spacing={{ xs: 1, sm: 2 }} direction="row" useFlexGap flexWrap="wrap">
                                    {
                                        // Mostrar botones para impresoras de papel
                                        impresorasPapel
                                            .filter((impresora) =>
                                                impresora.impresora.startsWith(almImp)
                                            )
                                            .map((impresora) => (
                                                // Excluir el botón con el mismo nombre que estado.impresora
                                                estado.impresora !== impresora.impresora && (
                                                    <Button
                                                        variant="outlined"
                                                        key={impresora.impresora}
                                                        onClick={() => handleclick(impresora.impresora)}
                                                        className="boton-desviar"
                                                        id={impresora.impresora}
                                                    >
                                                        {impresora.impresora}
                                                    </Button>
                                                )
                                            ))
                                    }
                                    {
                                        showAlertSuccess && (
                                            <Snackbar open={showAlertSuccess} autoHideDuration={3000} onClose={handleClose}>
                                                <Alert severity="success">
                                                    <AlertTitle>Desviada correctamente</AlertTitle>
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
                        }
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose}>Cerrar</Button>
                </DialogActions>
            </Dialog>
        </div >
    );
}

DialogDesviar.propTypes = {
    openDialog: PropTypes.bool,
    setOpenDialog: PropTypes.func,
    estado: PropTypes.object
};