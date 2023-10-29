import { useState, forwardRef, memo } from 'react';
import { Button, Stack, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Slide, AlertTitle, Snackbar } from '@mui/material';
import MuiAlert from '@mui/material/Alert';
import PropTypes from 'prop-types';
import { blue } from '@mui/material/colors';
import { useKeycloak } from '@react-keycloak/web';

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
    },
    {
        impresora: "06ADCOM01",
        ip: "172.30.60.247"
    },
    {
        impresora: "06ALAV101",
        ip: "172.30.60.245"
    },
    {
        impresora: "06ALAV102",
        ip: "172.30.60.249"
    },
    {
        impresora: "06ALDEV01",
        ip: "172.30.60.246"
    },
    {
        impresora: "06ALEXP01",
        ip: "172.30.60.101"
    },
    {
        impresora: "06ALJEF01",
        ip: "172.30.60.241"
    },
    {
        impresora: "06ATTOM01",
        ip: "172.30.60.248"
    },
    {
        impresora: "08ALAV101",
        ip: "172.30.41.240"
    },
    {
        impresora: "08ALAV102",
        ip: "172.30.41.241"
    },
    {
        impresora: "08ALAV201",
        ip: "172.30.41.242"
    },
    {
        impresora: "08ALAV202",
        ip: "172.30.41.243"
    },
    {
        impresora: "08ALDEV01",
        ip: "172.30.41.244"
    },
    {
        impresora: "08ALEXP01",
        ip: "172.30.41.245"
    },
    {
        impresora: "08ALJEF01",
        ip: "172.30.41.246"
    },
    {
        impresora: "12ALAV101",
        ip: "172.30.111.248"
    },
    {
        impresora: "12ALAV102",
        ip: "172.30.111.249"
    },
    {
        impresora: "12ALDEV01",
        ip: "172.30.111.247"
    },
    {
        impresora: "12ALEXP01",
        ip: "172.30.111.246"
    },
    {
        impresora: "12ALJEF01",
        ip: "172.30.111.245"
    },
]

//Esta función hace desplazarse el dialog
const Transition = forwardRef(function Transition(props, ref) {
    return <Slide direction="down" ref={ref} {...props} />;
});

const Alert = forwardRef(function Alert(props, ref) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

export const DialogDesviar = memo(({ setOpenDialog, openDialog, estado }) => {

    console.log("renderizo el dialogDesviar");

    //Si existe la prop(cuando llega) coge los dos primeros caracteres para saber de que almacen es la imperesora que se quiere desviar.
    const almImp = estado?.impresora?.substring(0, 2) || '';

    const [showAlertSuccess, setShowAlertSuccess] = useState(false);
    const [showAlertError, setShowAlertError] = useState(false);
    const { keycloak } = useKeycloak();

    const handleDesviar = async (impresoraDestino) => {

        console.log(`Desviar la impresora ${estado.impresora} por ${impresoraDestino}`);

        try {
            const res = await fetch(`http://172.30.5.181:8888/impresoras/${estado.impresora}/${impresoraDestino}/desviar`, {
                method: 'GET',
                headers: {
                    'Authorization': `Bearer ${keycloak.token}`
                }
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
                                                        onClick={() => handleDesviar(impresora.impresora)}
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
});

DialogDesviar.propTypes = {
    openDialog: PropTypes.bool,
    setOpenDialog: PropTypes.func,
    estado: PropTypes.object
};

DialogDesviar.displayName = 'DialogDesviar';