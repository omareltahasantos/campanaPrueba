import React, { Fragment, useState, useEffect } from 'react'
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Button from '@mui/material/Button';
import { Añadir } from '../Vivienda/Modals/Añadir'
import axios from 'axios'
import { Editar } from './Modals/Editar';
import { makeStyles } from '@mui/styles';
import Box from '@mui/material/Box';
import { CSVLink, CSVDownload } from "react-csv";

import TablePagination from '@mui/material/TablePagination';


export function SearchTable({searchResult, changeArrayEditar, countResults, nextResults, prevResults}) {
    //Este debe recibir en un inicio los primeros 10 resultados de la busqueda que haya hecho el usuario

    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(10);
    const [secondParamNextResults, setSecondParamNextResults] = useState(0)
    const [user, setUser] = useState({
        id: 333,
        email: 'omar@gmail.com',
        password: '12345',
        roles: ['ROLE_PRUEBA'],
        token: '1212341526TGWRGF2',
        isLogged: false
    })
   //const [secondParamPrevResults, setSecondParamPrevResults] = useState(0)

   useEffect(() => {
    const loggedInUser = sessionStorage.getItem("user");
    const foundUser = JSON.parse(loggedInUser);
    setUser(foundUser);

  }, [])
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const handleChangePage = (event, newPage) => {
    setPage(newPage);

    //Condicion para cuando el usuario le da a la flecha de la derecha
    if (newPage > page ) {



        nextResults(rowsPerPage, secondParamNextResults + rowsPerPage);

        setSecondParamNextResults(secondParamNextResults + rowsPerPage)


        //Condicion para cuando el usuario le da a la flecha de la izquierda
    }else if (newPage < page) {
        

        nextResults(rowsPerPage, secondParamNextResults - rowsPerPage)
        setSecondParamNextResults(secondParamNextResults - rowsPerPage)

    }




  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value));
    setPage(0);
  };


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
       
  
      //Añade una vivienda
    //const getNewHousing = (newHousing) =>{ 
      //setViviendas([...viviendas, newHousing])
      //getUserData()
    //}
      

    return (
        <Fragment>
            <Box
                style={{marginLeft: '0px', marginRight: '0px', marginBottom: '3px'}}
                sx={{
                justifyContent: 'center',
                p: 1,
                m: 1,
                bgcolor: 'background.paper',
                }}
            >
                <h3 style={{padding: '5px'}}>+{countResults} resultados encontrados</h3>
                {
                    user.roles[0] === 'ROLE_ADMIN' ? (
                      <Fragment>
                        <CSVLink data={searchResult} filename={'ExportResultsSearch.csv'}><Button variant="contained" size='medium' style={{background: '#522F10', fontWeight: 'bold'}} className='mb-3'>exportar</Button></CSVLink>
                        <Button variant="contained" size='medium' style={{background: '#522F10', fontWeight: 'bold'}} className='ml-2 mr-5 mb-3' onClick={handleShow}>Añadir vivienda</Button>
                      </Fragment>
                  ) : (
                    <Fragment>
                      <Button variant="contained" size='medium' style={{background: '#522F10', fontWeight: 'bold'}} className='ml-2 mr-5' onClick={handleShow}>Añadir vivienda</Button>
                      <Añadir show={show} setShow={setShow} handleClose={handleClose} handleShow={handleShow}></Añadir>
                    </Fragment>
                  )
                  }
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
                            <TableCell align="center">Acciones(g)</TableCell>
                        </TableRow>
                        </TableHead>
                        <TableBody>
                        {
                        searchResult.map((result) => (
                            <TableRow
                            key={result.id}
                            sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                            hover classes={{hover: classes.hover}}
                            >
                            <TableCell component="th" scope="row" style={hover} >
                                {result.titular}
                            </TableCell>
                            <TableCell align='left'>{result.cp}</TableCell>
                            <TableCell align='left'>{result.num_portal}</TableCell>
                            <TableCell align='left'>{result.bloque}</TableCell>
                            <TableCell align='left'>{result.escalera}</TableCell>
                            <TableCell align='left'>{result.piso}</TableCell>
                            <TableCell align='left'>{result.puerta}</TableCell>
                            {
                             result.fecha_visita ? (
                                 
                                <TableCell align='left'>{result.fecha_visita.date}</TableCell>
                             ) : (
                                <TableCell align='left'></TableCell>

                             )
                            }
                            <TableCell align="center"><Editar result = {result} changeArrayEditar={changeArrayEditar}></Editar></TableCell>
                            </TableRow>
                        ))
                        }
                        </TableBody>
                    </Table>
                </TableContainer>
                <Box sx={{
                    display: 'flex',
                    justifyContent: 'flex-start'
                    }}>
                      <TablePagination
                      component="div"
                      count={countResults}
                      page={page}
                      onPageChange={handleChangePage}
                      rowsPerPage={rowsPerPage}
                      onRowsPerPageChange={handleChangeRowsPerPage}
                      rowsPerPageOptions = {-1}
                 />
                </Box>

            </Box>
        </Fragment>
    )
}
