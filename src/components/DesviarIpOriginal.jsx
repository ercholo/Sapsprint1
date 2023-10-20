import { Button } from '@mui/material';
import PropTypes from 'prop-types';
import MergeIcon from '@mui/icons-material/Merge';
import { useState, useEffect, memo } from 'react';

export const BotonDesviaIpOriginal = memo(({ printer, isDisabled }) => {

    const [disabled, setDisabled] = useState(isDisabled)

    useEffect(() => {
        setDisabled(isDisabled);
    }, [isDisabled]);

    const onDesvioOriginal = async (printer) => {

        console.log(`Impresora devuelta a su sitio original ${printer}`);

        try {
            const res = await fetch(`http://172.30.5.181:8888/impresoras/${printer}/desviarImpresoraOriginal`, {
                method: 'GET'
            });
            const { desviadaOriginal } = await res.json();

            console.log(desviadaOriginal);
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
    isDisabled: PropTypes.bool
}

BotonDesviaIpOriginal.displayName = 'BotonActualizar';

export default BotonDesviaIpOriginal;