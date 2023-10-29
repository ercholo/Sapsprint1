import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from '@mui/material';
import { useCallback, useEffect, useState } from "react";
import { BotonPausa, BotonReanudar, BotonActualizar, BotonEstado } from '.';
import { BotonDesviar } from './BotonDesviar';

//Definimos las columnas
const columns = [
    {
        id: 'impresoras',
        label: 'Impresoras',
        minWidth: 130,
        align: 'left',
        format: (value) => value.toLocaleString('en-US'),
    },
    {
        id: 'trabajos',
        label: 'Trabajos',
        minWidth: 10,
        align: 'left',
        format: (value) => value.toLocaleString('en-US'),
    },
    {
        id: 'almacen',
        label: 'Almacén',
        minWidth: 60,
        align: 'left',
        format: (value) => value.toFixed(2),
    },
    {
        id: 'gris',
        label: '',
        minWidth: 60,
        align: 'left',
        format: (value) => value.toFixed(2),
    },
    {
        id: 'gris1',
        label: '',
        minWidth: 60,
        align: 'left',
        format: (value) => value.toFixed(2),
    },
    {
        id: 'gris2',
        label: '',
        minWidth: 60,
        align: 'left',
        format: (value) => value.toFixed(2),
    },
    {
        id: 'gris3',
        label: '',
        minWidth: 60,
        align: 'left',
        format: (value) => value.toFixed(2),
    },
    {
        id: 'gris4',
        label: '',
        minWidth: 60,
        align: 'left',
        format: (value) => value.toFixed(2),
    }
];

//Funcion para crear las futuras filas (rows)
function createData(nameImpresora, numTrabajos, numAlmacen, tipo) {
    return { nameImpresora, numTrabajos, numAlmacen, tipo };
}

//Llamada a la funcion que genera las filas pasándole datos de relleno iniciales
const rows = [
    createData('07ADCOM01', 0, 'RG07', 'papel'),
    createData('07ALESP01', 0, 'RG07', 'papel'),
    createData('07ALPAR01', 0, 'RG07', 'papel'),
    createData('07ALJEF01', 0, 'RG07', 'papel'),
]

//Funcion donde se definie la tabla con stickyhead
export const TablaAlmeria = () => {

    const [ , setValor ] = useState({});
    
    const recibirDatosActualizados = useCallback((data) => {
        
        console.log(data);
        
        rows.find(printer => {
            //Si la impresora coincide y los datos son distintos de los que ya teníamos entonces tralarí 
            if (data?.impresora === printer.nameImpresora) {
                printer.numTrabajos = data.valor        
            }
            setValor(() => data)
        });
    }, []);

    useEffect(() => {
        recibirDatosActualizados();
    }, [recibirDatosActualizados]);


    return (
        <>
            <Paper sx={{ width: '100%', overflow: 'hidden' }}>
                <TableContainer sx={{ maxHeight: 1500 }}>
                    <Table stickyHeader aria-label="sticky table">
                        <TableHead sw={{ bgcolor: 'primary.main' }}>
                            <TableRow >
                                {columns.map((column) => (
                                    <TableCell
                                        key={column.id}
                                        align={column.align}
                                        style={{ minWidth: column.minWidth }}
                                        sx={{ fontWeight: 'bold', fontSize: 20, bgcolor: '#b8b8b8' }}
                                    >
                                        {column.label}
                                    </TableCell>
                                ))}
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {rows.map((row) => (

                                <TableRow key={row.nameImpresora} hover={true}>
                                    <TableCell sx={{ fontWeight: 'bold', color: '#1563B0', fontSize: 18 }} component="th" scope="row" >
                                        {row.nameImpresora}
                                    </TableCell>
                                    <TableCell sx={{ fontWeight: 'bold', color: '#1873CC', fontSize: 18 }} style={{ width: 10 }} align="center" fontWeight="bold">
                                        {row.numTrabajos}
                                    </TableCell>
                                    <TableCell sx={{ fontWeight: 'bold', color: '#1873CC', fontSize: 18 }} style={{ width: 10 }} align="left">
                                        {row.numAlmacen}
                                    </TableCell>
                                    <TableCell sx={{ fontWeight: 'bold' }} style={{ width: 60 }} align="left">
                                        <BotonActualizar printer={row.nameImpresora} recibirDatos={recibirDatosActualizados} />
                                    </TableCell>
                                    <TableCell sx={{ fontWeight: 'bold' }} style={{ width: 60 }} align="left">
                                        <BotonPausa printer={row.nameImpresora} />
                                    </TableCell>
                                    <TableCell sx={{ fontWeight: 'bold' }} style={{ width: 60 }} align="left">
                                        <BotonReanudar printer={row.nameImpresora} />
                                    </TableCell>
                                    <TableCell sx={{ fontWeight: 'bold' }} style={{ width: 60 }} align="left">
                                        <BotonEstado printer={row.nameImpresora} />
                                    </TableCell>
                                    <TableCell sx={{ fontWeight: 'bold' }} style={{ width: 60 }} align="left">
                                        <BotonDesviar printer={row.nameImpresora} />
                                    </TableCell>
                                </TableRow>

                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            </Paper>
        </>
    );
}