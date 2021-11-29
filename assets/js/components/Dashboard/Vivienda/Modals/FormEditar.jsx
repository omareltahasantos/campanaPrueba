import React from 'react'
import { Fragment, useState, useEffect } from 'react';
import axios from 'axios';
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import TextField from '@mui/material/TextField';
import TipoVia from '../Jsons/tipo_via.json'
import UsoResiduos from '../Jsons/uso_residuos.json'
import CampañaAnterior from '../Jsons/campaña_anterior.json'
import MenuItem from '@mui/material/MenuItem';
import Button from '@mui/material/Button';

import { createTheme, ThemeProvider } from '@mui/material/styles';

const theme = createTheme({
    palette: {
      brown: {
        main: '#522F10',
        contrastText: '#fff',
      },
    },
  });
export function FormEditar({vivienda, handleClose, changeArrayEditar}) {
    //user.id tiene el id del usuario para editarlo
    
    const [titular, setTitular] = useState(vivienda.titular)
    const [contrato, setContrato] = useState(vivienda.contrato)
    const [cp, setCp] = useState(vivienda.cp)
    const [municipio, setMunicipio ] = useState(vivienda.municipio)
    const [localidad, setLocalidad] = useState(vivienda.localidad)
    const [tipoVia, setTipoVia] = useState(vivienda.tipo_via)
    const [nombreVia, setNombreVia ] = useState(vivienda.nombre_via)
    const [numPortal, setNumPortal ] = useState(vivienda.num_portal)
    const [bloque, setBloque ] = useState(vivienda.bloque)
    const [escalera, setEscalera] = useState(vivienda.escalera)
    const [piso, setPiso ] = useState(vivienda.piso)
    const [puerta, setPuerta] = useState(vivienda.puerta)
    const [obserDireccion, setObserDireccion] = useState(vivienda.observaciones_direccion)
    const [telefono1, setTel1] = useState(vivienda.telefono1)
    const [telefono2, setTel2] = useState(vivienda.telefono2)
    const [telefono3, setTel3] = useState(vivienda.telefono3)
    const [telefono4, setTel4] = useState(vivienda.telefono4)
    const [complemento1, setComplemento1] = useState(vivienda.complemento1)
    const [complemento2, setComplemento2] = useState(vivienda.complemento2)
    const [usoResiduos, setUsoResiduos] = useState(vivienda.uso_residuos)
    const [campañaAnterior, setCampañaAnterior] = useState(vivienda.campaña_anterior)
    const [campañaActual, setCampañaActual] = useState(vivienda.campaña_actual)
    const [primeraVisita, setPrimeraVisita] = useState(vivienda.primera_visita)
    const [segundaVisita, setSegundaVisita] = useState(vivienda.segunda_visita)
    const [observaciones, setObservaciones] = useState(vivienda.observaciones)
    //const [dateCreated, setDataCreated] = useState()

    const editarVivienda = (e) =>{

        e.preventDefault();

        const dataVivienda = {
            id: vivienda.id,
            titular: JSON.stringify(titular),
            contrato: contrato,
            cp: cp,
            municipio: JSON.stringify(municipio),
            localidad: JSON.stringify(localidad),
            tipoVia: JSON.stringify(tipoVia),
            nombreVia: JSON.stringify(nombreVia),
            numPortal: JSON.stringify(numPortal),
            bloque: bloque,
            escalera: JSON.stringify(escalera),
            piso: JSON.stringify(piso),
            puerta: JSON.stringify(puerta),
            observacion_direccion: JSON.stringify(obserDireccion),
            tel1: JSON.stringify(telefono1),
            tel2: JSON.stringify(telefono2),
            tel3: JSON.stringify(telefono3),
            tel4: JSON.stringify(telefono4),
            complemento1: JSON.stringify(complemento1),
            complemento2: JSON.stringify(complemento2),
            usoResiduos: JSON.stringify(usoResiduos),
            campañaAnterior: JSON.stringify(campañaAnterior),
            campañaActual: JSON.stringify(campañaActual),
            primeraVisita: JSON.stringify(primeraVisita),
            segundaVisita: JSON.stringify(segundaVisita),
            observaciones: JSON.stringify(observaciones)
        }
         

        axios.get('http://localhost:8000/api/updateVivienda', {
            params: dataVivienda
          })
          .then(function (response) {
            if (response.data.error === 'null') {       
                changeArrayEditar(response.data)
                
                handleClose();
    
            }else{
    
                const jsonResponse = {
                    error: response.data.error
                }
                handleClose();
            }
          })
          .catch(function (error) {
            console.log(error);
          })
    }

    return (
        <Fragment>
        <ThemeProvider theme={theme}>
            <div className='container text-center'>
            <Box component="form" onSubmit={editarVivienda} noValidate sx={{ mt: 1 }}>
              <Grid container spacing={2}>
                <Grid item md={3}>
                  <TextField
                    size="small"
                    color='brown'
                    margin="normal"
                    required
                    id="titular"
                    label="Titular"
                    name="titular"
                    type="text"
                    autoComplete="titular"
                    autoFocus
                    value={titular}
                    onChange={ (e) => setTitular(e.target.value) }
                  />
                  <TextField
                    size="small"
                    color='brown'
                    margin="normal"
                    required
                    id="contrato"
                    label="Contrato"
                    name="contrato"
                    type="number"
                    autoComplete="contrato"
                    autoFocus
                    value={contrato}
                    onChange={ (e) => setContrato(e.target.value) }
                  />
                  <TextField
                    size="small"
                    color='brown'
                    margin="normal"
                    required
                    id="cp"
                    label="Código postal"
                    name="cp"
                    type="number"
                    autoComplete="cp"
                    autoFocus
                    value={cp}
                    onChange={ (e) => setCp(e.target.value) }
                  />
                  <TextField
                    size="small"
                    color='brown'
                    margin="normal"
                    required
                    id="municipio"
                    label="Municipio"
                    name="municipio"
                    type="text"
                    autoComplete="municipio"
                    autoFocus
                    value={municipio}
                    onChange={ (e) => setMunicipio(e.target.value) }
                  />
                  <TextField
                    size="small"
                    color='brown'
                    margin="normal"
                    required
                    id="localidad"
                    label="Localidad"
                    name="localidad"
                    type="text"
                    autoComplete="localidad"
                    autoFocus
                    value={localidad}
                    onChange={ (e) => setLocalidad(e.target.value) }
                  />
                  <TextField
                  size='small'
                  color="brown"
                  margin="normal"
                  select
                  fullWidth
                  label= 'Tipo de Vía'
                  value={tipoVia}
                  onChange={(e) => setTipoVia(e.target.value)}
                >
                  {TipoVia.map((via) => (
                    <MenuItem key={via.value} value={via.value}>
                      {via.label}
                    </MenuItem>
                  ))}
                </TextField>
                </Grid>
                <Grid item md={3} className=''>
                
                  <TextField
                    size="small"
                    color="brown"
                    margin="normal"
                    required
                    name="nombreVia"
                    label="Nombre de vía"
                    type="text"
                    id="nombreVia"
                    autoComplete="nombreVia"
                    value={nombreVia}
                    onChange={ (e) => setNombreVia(e.target.value) }
                  />
                  <TextField
                    size="small"
                    color='brown'
                    margin="normal"
                    required
                    id="numPortal"
                    label="Portal"
                    name="numPortal"
                    type="text"
                    autoComplete="numPortal"
                    autoFocus
                    value={numPortal}
                    onChange={ (e) => setNumPortal(e.target.value) }
                  />
                  <TextField
                    size="small"
                    color='brown'
                    margin="normal"
                    required
                    id="bloque"
                    label="Bloque"
                    name="bloque"
                    type="number"
                    autoComplete="bloque"
                    autoFocus
                    value={bloque}
                    onChange={ (e) => setBloque(e.target.value) }
                  />
                  <TextField
                    size="small"
                    color='brown'
                    margin="normal"
                    required
                    id="escalera"
                    label="Escalera"
                    name="escalera"
                    type="text"
                    autoComplete="escalera"
                    autoFocus
                    value={escalera}
                    onChange={ (e) => setEscalera(e.target.value) }
                  />
                  <TextField
                    size="small"
                    color='brown'
                    margin="normal"
                    required
                    id="piso"
                    label="Piso"
                    name="piso"
                    type="text"
                    autoComplete="piso"
                    autoFocus
                    value={piso}
                    onChange={ (e) => setPiso(e.target.value) }
                  />
                  <TextField
                    size="small"
                    color='brown'
                    margin="normal"
                    required
                    id="puerta"
                    label="Puerta"
                    name="puerta"
                    type="text"
                    autoComplete="puerta"
                    autoFocus
                    value={puerta}
                    onChange={ (e) => setPuerta(e.target.value) }
                  />
                  <TextField
                    size="small"
                    color='brown'
                    margin="normal"
                    required
                    id="obsDireccion"
                    label="Observ.dirección"
                    name="obsDireccion"
                    type="text"
                    autoComplete="obsdireccion"
                    autoFocus
                    value={obserDireccion}
                    onChange={ (e) => setObserDireccion(e.target.value) }
                  />
                </Grid>
                <Grid item md={3}>
                  <TextField
                    size="small"
                    color='brown'
                    margin="normal"
                    required
                    id="telefono1"
                    label="Telefono 1"
                    name="telefono1"
                    type="text"
                    autoComplete="telefono1"
                    autoFocus
                    value={telefono1}
                    onChange={ (e) => setTel1(e.target.value) }
                  />
                  <TextField
                    size="small"
                    color='brown'
                    margin="normal"
                    required
                    id="tel2"
                    label="Telefono 2"
                    name="tel2"
                    type="text"
                    autoComplete="tel2"
                    autoFocus
                    value={telefono2}
                    onChange={ (e) => setTel2(e.target.value) }
                  />
                  <TextField
                    size="small"
                    color='brown'
                    margin="normal"
                    required
                    id="tel3"
                    label="Telefono 3"
                    name="tel3"
                    type="text"
                    autoComplete="tel3"
                    autoFocus
                    value={telefono3}
                    onChange={ (e) => setTel3(e.target.value) }
                  />
                  <TextField
                    size="small"
                    color='brown'
                    margin="normal"
                    required
                    id="tel4"
                    label="Telefono 4"
                    name="tel4"
                    type="text"
                    autoComplete="tel4"
                    autoFocus
                    value={telefono4}
                    onChange={ (e) => setTel4(e.target.value) }
                  />
                  <TextField
                    size="small"
                    color='brown'
                    margin="normal"
                    required
                    id="complemento1"
                    label="Complemento 1"
                    name="complemento1"
                    type="text"
                    autoComplete="complemento1"
                    autoFocus
                    value={complemento1}
                    onChange={ (e) => setComplemento1(e.target.value) }
                  />
                  <TextField
                    size="small"
                    color='brown'
                    margin="normal"
                    required
                    id="complemento2"
                    label="Complemento 2"
                    name="complemento2"
                    type="text"
                    autoComplete="complemento2"
                    autoFocus
                    value={complemento2}
                    onChange={ (e) => setComplemento2(e.target.value) }
                  />
                </Grid>
                <Grid item md={3}>
                <TextField
                  size='small'
                  color="brown"
                  margin="normal"
                  select
                  fullWidth
                  label= 'Campaña anterior'
                  value={campañaAnterior}
                  onChange={(e) => setCampañaAnterior(e.target.value)}
                >
                  {CampañaAnterior.map((prevCamp) => (
                    <MenuItem key={prevCamp.value} value={prevCamp.value}>
                      {prevCamp.label}
                    </MenuItem>
                  ))}
                </TextField>
                  <TextField
                    size="small"
                    color='brown'
                    margin="normal"
                    required
                    id="campaña_actual"
                    label="CampañaActual"
                    name="campaña_actul"
                    type="text"
                    autoComplete="campaña Actual"
                    autoFocus
                    value={campañaActual}
                    onChange={ (e) => setCampañaActual(e.target.value) }
                  />
                  <TextField
                  size='small'
                  color="brown"
                  margin="normal"
                  select
                  fullWidth
                  label= 'Uso de resíduos'
                  value={usoResiduos}
                  onChange={(e) => setUsoResiduos(e.target.value)}
                >
                  {UsoResiduos.map((res) => (
                    <MenuItem key={res.value} value={res.value}>
                      {res.label}
                    </MenuItem>
                  ))}
                </TextField>
                  <TextField
                    size="small"
                    color='brown'
                    margin="normal"
                    required
                    id="primera_visita"
                    label="Primera visita"
                    name="primera_visita"
                    type="text"
                    autoComplete="primera_visita"
                    autoFocus
                    value={primeraVisita}
                    onChange={ (e) => setPrimeraVisita(e.target.value) }
                  />
                    <TextField
                    size="small"
                    color='brown'
                    margin="normal"
                    required
                    id="segunda_visita"
                    label="Segunda visita"
                    name="segunda_visita"
                    type="text"
                    autoComplete="segunda_visita"
                    autoFocus
                    value={segundaVisita}
                    onChange={ (e) => setSegundaVisita(e.target.value) }
                  />
                  <TextField
                    size="small"
                    color='brown'
                    margin="normal"
                    required
                    id="observaciones"
                    label="Observaciones"
                    name="observaciones"
                    type="text"
                    autoComplete="observaciones"
                    autoFocus
                    value={observaciones}
                    onChange={ (e) => setObservaciones(e.target.value) }
                  />
                </Grid>
              </Grid>
              <Button
                color="brown"
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
              >
                Editar vivienda
              </Button>
          </Box>
          </div>
        </ThemeProvider>
      </Fragment>
    )
}
