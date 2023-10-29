import { Button } from '@mui/material';
import PropTypes from 'prop-types';
import MergeIcon from '@mui/icons-material/Merge';
import { useState, useEffect, memo } from 'react';
import { useKeycloak } from '@react-keycloak/web';

export const BotonDesviaIpOriginal = memo(({ printer, isDisabled, handleClose, setShowAlertSuccess }) => {

    const [disabled, setDisabled] = useState(isDisabled);
    const { keycloak } = useKeycloak();

    useEffect(() => {
        setDisabled(isDisabled);
    }, [isDisabled]);

    const onDesvioOriginal = async (printer) => {

        try {
            const res = await fetch(`http://172.30.5.181:8888/impresoras/${printer}/desviarImpresoraOriginal`, {
                method: 'GET',
                headers: {
                    'Authorization': `Bearer ${keycloak.token}`
                }
            });
            const { desviadaOriginal } = await res.json();
            
            //Si desviadaOriginal es true (Si ha hecho correcto el restablecer) mando cerrar el dialog
            // desviadaOriginal ? setShowAlertSuccess(true) : null;

            if (desviadaOriginal) {
                setShowAlertSuccess(true);
                handleClose();
            }
        
        } catch (error) {
            console.log(error);
        } finally {
            setDisabled(true);
        }
    }

    return (
        <>
            <Button
                startIcon={<MergeIcon />}
                disabled={disabled}
                onClick={() =>
                    onDesvioOriginal(printer)}>
                Restablecer a su sitio original
            </Button>
        </>
    )
});

BotonDesviaIpOriginal.propTypes = {
    printer: PropTypes.string,
    isDisabled: PropTypes.bool,
    handleClose: PropTypes.func,
    setShowAlertSuccess: PropTypes.func,
}

BotonDesviaIpOriginal.displayName = 'BotonDesviaIpOriginal';

export default BotonDesviaIpOriginal;