import * as React from 'react';
import { useEffect, useState } from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Button from '@mui/material/Button';
import axios from 'axios'
import {Editar} from './Modals/Editar'
import { makeStyles } from '@mui/styles';
import { setInterval } from 'core-js';
//Hacer una llamada Axios a la API del backend para que me devuelva los usuarios

export function UserDataList({viviendas, changeArrayEditar}) {
  
  const useStyles = makeStyles((theme) => ({
    hover: {
      "&:hover": {
        backgroundColor: "#f5f5f5 !important",
      },
    },
  }));
  const classes = useStyles();


  const hover = {
   hover: {
     background: '#cfd8dc'
   }
  };

  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell align='left'>Titular</TableCell>
            <TableCell align='left'>Código postal</TableCell>
            <TableCell align='left'>Nº portal</TableCell>
            <TableCell align='left'>Bloque</TableCell>
            <TableCell align='left'>Escalera</TableCell>
            <TableCell align='left'>Piso</TableCell>
            <TableCell align='left'>Puerta</TableCell>
            <TableCell align='left'>Fecha visita</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
        {
          viviendas.map((vivienda) => (
            <TableRow
              key={vivienda.id}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
              hover classes={{hover: classes.hover}}
            >
              <TableCell align='left'>{vivienda.titular}</TableCell>
              <TableCell align='left'>{vivienda.cp}</TableCell>
              <TableCell align='left'>{vivienda.num_portal}</TableCell>
              <TableCell align='left'>{vivienda.bloque}</TableCell>
              <TableCell align='left'>{vivienda.escalera}</TableCell>
              <TableCell align='left'>{vivienda.piso}</TableCell>
              <TableCell align='left'>{vivienda.puerta}</TableCell>
              <TableCell align='left'>{vivienda.fecha_visita}</TableCell>
            </TableRow>
          ))
        }
        </TableBody>
      </Table>
    </TableContainer>
  );
}