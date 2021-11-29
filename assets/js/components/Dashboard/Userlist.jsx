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
import {Editar} from '../Dashboard/Modals/Editar'
import { makeStyles } from '@mui/styles';
import { setInterval } from 'core-js';
//Hacer una llamada Axios a la API del backend para que me devuelva los usuarios





function createData(email, identificador, password) {
  return { email, identificador, password};
}

const rows = [
  createData('omar@gmail.com', 1, 'APTItude01'),
  createData('paula@gmail.com', 2, 'APTItude01'),
  createData('nelson@gmail.com', 3, 'APTItude01'),
  createData('sulaiman@gmail.com', 4, 'APTItude01'),
  createData('nur@gmail.com', 5, 'APTItude01'),
];

export function Userlist({usersState, changeArrayEditar}) {
  
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
            <TableCell>Correo electrónico</TableCell>
            <TableCell align='left'>ID</TableCell>
            <TableCell align='left'>Password</TableCell>
            <TableCell align="center">Acciones(g)</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
        {
          usersState.map((user) => (
            <TableRow
              key={user.id}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
              hover classes={{hover: classes.hover}}
            >
              <TableCell component="th" scope="row" style={hover} >
                {user.email}
              </TableCell>
              <TableCell align='left'>{user.id}</TableCell>
              <TableCell align='left'>{user.password}</TableCell>
              <TableCell align="center"><Editar user = {user} changeArrayEditar={changeArrayEditar}></Editar></TableCell>
            </TableRow>
          ))
        }
        </TableBody>
      </Table>
    </TableContainer>
  );
}