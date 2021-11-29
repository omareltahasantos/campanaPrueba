import React from 'react'
import { Fragment, useState, useEffect } from 'react'
import axios from 'axios'
import {UserDataList} from './UserDataList'
import { Añadir } from './Modals/Añadir'
import { CSVLink, CSVDownload } from "react-csv";
import Box from '@mui/material/Box';
import { Grid } from '@mui/material';
import { Button } from '@mui/material';
import TextField from '@mui/material/TextField';
import SearchTwoToneIcon from '@mui/icons-material/SearchTwoTone';
import MenuItem from '@mui/material/MenuItem';
import uso_residuos from './Jsons/uso_residuos.json'

export function Account({user, listItemPressed}) {

const [show, setShow] = useState(false);
const handleClose = () => setShow(false);
const handleShow = () => setShow(true);
const [viviendas, setViviendas] = useState([])
const [fechaVivienda, setfechaVivienda] = useState([])
const [localidad, setLocalidad] = useState('')
const [usoResiduos, setUsoResiduos] = useState('')
useEffect(() => {
  
    getUserData()
}, [])

//Recibe todas las viviendas
const getUserData = () => {

    axios.get('http://localhost:8000/api/Viviendas', {

    })
    .then(function (response) {
             
      if (response.data) {

        const viviendas = response.data;

        for (let index = 0; index < viviendas.length; index++) {

          if (viviendas[index].fecha_visita !== null) {

            //Creo un objeto fecha con el timestamp que llega del backend.
            var a = new Date(viviendas[index].fecha_visita * 1000);
            var year = a.getFullYear();
            var month = a.getMonth();
            var date = a.getDate();
            var hour = a.getHours();
            var min = a.getMinutes();
            var sec = a.getSeconds();
            var formattedTime = date + '-' + month + '-' + year + ' ' + hour + ':' + min + ':' + sec ;

            viviendas[index].fecha_visita = formattedTime
            
          }
          
        }
        setViviendas(viviendas)
      }

    })
    .catch(function (error) {
      console.log(error);
    })
}
  //Editar vivienda seleccionada
const changeArrayEditar= (housingUpdated) =>{

  
  const newHouse = viviendas.map( (vivienda) => {

    if (vivienda.id === housingUpdated.id) {
      
      return {
        ...vivienda,
        id: housingUpdated.id,
        titular: housingUpdated.titular,
        contrato: housingUpdated.contrato,
        cp: housingUpdated.cp,
        municipio: housingUpdated.municipio,
        localidad: housingUpdated.localidad,
        tipo_via: housingUpdated.tipo_via,
        nombre_via: housingUpdated.nombre_via,
        num_portal: housingUpdated.num_portal,
        bloque: housingUpdated.bloque,
        escalera: housingUpdated.escalera,
        piso: housingUpdated.piso,
        puerta: housingUpdated.puerta,
        observaciones_direccion: housingUpdated.observaciones_direccion,
        telefono1: housingUpdated.telefono1,
        telefono2: housingUpdated.telefono2,
        telefono3: housingUpdated.telefono3,
        telefono4: housingUpdated.telefono4,
        complemento1: housingUpdated.complemento1,
        complemento2: housingUpdated.complemento2,
        uso_residuos: housingUpdated.uso_residuos,
        campaña_anterior: housingUpdated.campaña_anterior,
        campaña_actual: housingUpdated.campaña_actual,
        primera_visita: housingUpdated.primera_visita,
        segunda_visita: housingUpdated.segunda_visita,
        fecha_visita: housingUpdated.fecha_visita,
        observaciones: housingUpdated.observaciones
      }

    }

    return vivienda
  })

  setViviendas(newHouse)
  
}

//Añade una vivienda
const getNewHousing = (newHousing) =>{ 
  setViviendas([...viviendas, newHousing])
  getUserData()
}

    return (
        <Fragment>
          <Fragment>
            <Box sx={{ flexGrow: 1 }} className='pb-3'>
              <Grid container spacing={2}>
                <Grid item md={3}>
                  <h4>{listItemPressed}</h4 >
                </Grid>
               
                <Grid item md={4} justify= "">
                  <Box sx={{
                    display: 'flex',
                    justifyContent: 'flex-end'
                    }}>
                  {
                    user.roles[0] === 'ROLE_ADMIN' ? (
                      <Fragment>
                        <CSVLink data={viviendas} filename={'Tabla-viviendas.csv'}><Button variant="contained" size='medium' style={{background: '#522F10', fontWeight: 'bold'}} className=''>exportar</Button></CSVLink>
                        <Button variant="contained" size='medium' style={{background: '#522F10', fontWeight: 'bold'}} className='ml-2 mr-5' onClick={handleShow}>Añadir vivienda</Button>
                      </Fragment>
                  ) : (
                    <Button variant="contained" size='medium' style={{background: '#522F10', fontWeight: 'bold'}} className='ml-5' onClick={handleShow}>Añadir vivienda</Button>
                  )
                  }
                  </Box>            
                </Grid>
              </Grid>
            </Box>
            <UserDataList viviendas = {viviendas} changeArrayEditar = {changeArrayEditar}></UserDataList>
            <Añadir show={show} setShow={setShow} handleClose={handleClose} handleShow={handleShow} getNewHousing={getNewHousing}></Añadir>
          </Fragment>
        </Fragment>
      )
}
