import React from 'react'
import { Fragment, useState } from 'react';
import axios from 'axios';
import Grid from '@mui/material/Grid';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import MenuItem from '@mui/material/MenuItem';
import TipoVia from '../Jsons/tipo_via.json'
import UsoResiduos from '../Jsons/uso_residuos.json'
import CampañaAnterior from '../Jsons/campaña_anterior.json'
import PrimeraVisita from '../Jsons/primera_visita.json'
import SegundaVisita from '../Jsons/segunda_visita.json'
import CampañaActual from '../Jsons/campaña_actual.json'
import Box from '@mui/material/Box';

const theme = createTheme({
  palette: {
    brown: {
      main: '#522F10',
      contrastText: '#fff',
    },
  },
});

export  function FormAñadir({handleClose, getNewHousing}) {

  //Estados

  const [titular, setTitular] = useState()
    const [contrato, setContrato] = useState()
    const [cp, setCp] = useState()
    const [municipio, setMunicipio ] = useState()
    const [localidad, setLocalidad] = useState()
    const [tipoVia, setTipoVia] = useState('')
    const [nombreVia, setNombreVia ] = useState()
    const [numPortal, setNumPortal ] = useState()
    const [bloque, setBloque ] = useState()
    const [escalera, setEscalera] = useState()
    const [piso, setPiso ] = useState()
    const [puerta, setPuerta] = useState()
    const [obserDireccion, setObserDireccion] = useState()
    const [telefono1, setTel1] = useState()
    const [telefono2, setTel2] = useState()
    const [telefono3, setTel3] = useState()
    const [telefono4, setTel4] = useState()
    const [complemento1, setComplemento1] = useState()
    const [complemento2, setComplemento2] = useState()
    const [usoResiduos, setUsoResiduos] = useState()
    const [campañaAnterior, setCampañaAnterior] = useState()
    const [campañaActual, setCampañaActual] = useState()
    const [primeraVisita, setPrimeraVisita] = useState()
    const [segundaVisita, setSegundaVisita] = useState()
    const [observaciones, setObservaciones] = useState()


  //Métodos
  const dataVivienda = {
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

      const añadirVivienda = (e) =>{

        e.preventDefault();

        axios.get('http://localhost:8000/api/newHousing', {
        params: dataVivienda
      })
      .then(function (response) {
               
        if (response.data.error === 'null') {
            //Recibir json con todos los usuarios que tiene la tabla
            getNewHousing(response.data)
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
            <Box component="form" onSubmit={añadirVivienda} noValidate sx={{ mt: 1 }}>
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
                    size='small'
                    color="brown"
                    margin="normal"
                    select
                    fullWidth
                    label= 'Campaña actual'
                    value={campañaActual}
                    onChange={(e) => setCampañaActual(e.target.value)}
                  >
                    {CampañaActual.map((thisCamp) => (
                      <MenuItem key={thisCamp.value} value={thisCamp.value}>
                        {thisCamp.label}
                      </MenuItem>
                    ))}
                  </TextField>
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
                      size='small'
                      color="brown"
                      margin="normal"
                      select
                      fullWidth
                      label= 'Primera visita'
                      value={primeraVisita}
                      onChange={(e) => setPrimeraVisita(e.target.value)}
                    >
                      {PrimeraVisita.map((primeraVisita) => (
                        <MenuItem key={primeraVisita.value} value={primeraVisita.value}>
                          {primeraVisita.label}
                        </MenuItem>
                      ))}
                    </TextField>
                    <TextField
                      size='small'
                      color="brown"
                      margin="normal"
                      select
                      fullWidth
                      label= 'Segunda visita'
                      value={segundaVisita}
                      onChange={(e) => setSegundaVisita(e.target.value)}
                    >
                      {SegundaVisita.map((segundaVisita) => (
                        <MenuItem key={segundaVisita.value} value={segundaVisita.value}>
                          {segundaVisita.label}
                        </MenuItem>
                      ))}
                    </TextField>
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
                Añadir vivienda
              </Button>
          </Box>
          </div>
        </ThemeProvider>
        </Fragment>
    )
}
