import {Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from '@mui/material';
import { useKeycloak } from "@react-keycloak/web";
import { useState } from "react";

//Definimos las columnas
const columns = [
    {
        id: 'impresoras',
        label: 'Impresoras',
        minWidth: 170,
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
        minWidth: 170,
        align: 'left',
        format: (value) => value.toFixed(2),
    },
];

//Funcion para crear las futuras filas (rows)
function createData(nameImpresora, numTrabajos, numAlmacen, tipo) {
    return { nameImpresora, numTrabajos, numAlmacen, tipo };
}

//Llamada a la funcion que genera las filas pasándole datos de relleno iniciales
const rows = [
    createData('01ALAV101', 0, 'RG01', 'papel'),
    createData('01ALAV102', 0, 'RG01', 'papel'),
    createData('01ALAV201', 0, 'RG01', 'papel'),
    createData('01ALAV202', 0, 'RG01', 'papel'),
    createData('01ALDEV01', 0, 'RG01', 'papel'),
    createData('01ALENT01', 0, 'RG01', 'papel'),
    createData('01ALJEF01', 0, 'RG01', 'papel'),
    createData('01ALPSI01', 0, 'RG01', 'papel'),
    createData('01ALPYE01', 0, 'RG01', 'papel'),
    createData('01ALPYE02', 0, 'RG01', 'papel'),
    createData('01ALSAA01', 0, 'RG01', 'papel'),
    createData('01ALSAF01', 0, 'RG01', 'papel'),
    createData('01ALSAL01', 0, 'RG01', 'papel'),
    createData('01ATTOM01', 0, 'RG01', 'papel'),
    createData('01ATTOM02', 0, 'RG01', 'papel')
]

//Funcion donde se definie la tabla con stickyhead
export const TablaPrincipal = () => {

    const { keycloak } = useKeycloak();

	useState(() => {
		console.log(keycloak);
		if (keycloak?.authenticated) return;
		keycloak?.login();
	}, [keycloak]);

    return (
        <>
            <Paper sx={{ width: '100%', overflow: 'hidden' }}>
                <TableContainer sx={{ maxHeight: 1600 }}>
                    <Table stickyHeader aria-label="sticky table">
                        <TableHead>
                            <TableRow>
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
                                    <TableCell sx={{ fontWeight: 'bold', color: '#1873CC', fontSize: 18 }} style={{ width: 160 }} align="center" fontWeight= "bold">
                                        {row.numTrabajos}
                                    </TableCell>
                                    <TableCell sx={{ fontWeight: 'bold', color: '#1873CC', fontSize: 18 }} style={{ width: 160 }} align="left">
                                        {row.numAlmacen}
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