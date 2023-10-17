import { Button } from '@mui/material';
import PropTypes from 'prop-types';
import { useState, useCallback, memo } from 'react';
import { DialogEstado } from './DialogEstado';
import styles from '../styles/loader.module.css';
import CircularProgress from '@mui/material/CircularProgress';
import GradeIcon from '@mui/icons-material/Grade';

export const BotonEstado = memo(({ printer }) => {

    const [openDialog, setOpenDialog] = useState(false);
    const [estado, setEstado] = useState({});
    const [isDisabled, setDisabled] = useState(false);
    const [isLoading, setIsLoading] = useState(false)

    console.log('renderizo boton actualizar')

    const consultarEstado = useCallback(async (printer) => {

        setDisabled(true);
        setIsLoading(true);

        try {
            const res = await fetch(`http://172.30.5.181:8888/impresoras/${printer}/estado`, {
                method: 'GET'
            });
            const data = await res.json();
            console.log(data);
            setEstado(data);
        } catch (error) {
            console.log(error);
        } finally {
            setIsLoading(false);
        }
    },[],)

    const onAbrirDialogo = async () => {
        await consultarEstado(printer);
        setOpenDialog(true);
        setDisabled(false);
    };

    return (
        <>
            {
                isLoading && (
                    <div className={styles.overlay}>
                        <CircularProgress style={{ 'color': 'yellow' }} size={60} />
                    </div>
                )
            }
            <Button
                variant="contained"
                startIcon={<GradeIcon />}
                disabled={isDisabled}
                onClick={onAbrirDialogo}>
                {isLoading ? 'Cargando...' : 'Estado'}
            </Button>
            <DialogEstado openDialog={openDialog} setOpenDialog={setOpenDialog} estado={estado}/>
        </>
    )
});

BotonEstado.propTypes = {
    printer: PropTypes.string
}

BotonEstado.displayName = 'BotonActualizar';

export default BotonEstado;