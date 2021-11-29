import React from 'react'
import { Fragment, useState, useEffect, useMemo, useCallback } from 'react'
import DataListInput from "react-datalist-input";
import Box from '@mui/material/Box';
import { Button } from '@mui/material';
import { Grid } from '@mui/material';
import { Añadir } from '../Modals/Añadir'
import TextField from '@mui/material/TextField';
import MenuItem from '@mui/material/MenuItem';
import uso_residuos from '../Vivienda/Jsons/uso_residuos.json'
import TipoVia from '../Vivienda/Jsons/tipo_via.json'
import CampañaAnterior from '../Vivienda/Jsons/campaña_anterior.json'
import Localidades from '../Vivienda/Jsons/localidades.json'
import { CSVLink, CSVDownload } from "react-csv";
import { createTheme, ThemeProvider } from '@mui/material/styles';
import axios from 'axios';
import { makeStyles } from '@mui/styles';
import { grey } from '@mui/material/colors';
import '../../../../styles/app.css'
import { SendAndArchiveOutlined } from '@mui/icons-material';
import { SearchTable } from './SearchTable';






const theme = createTheme({
    palette: {
      brown: {
        main: '#522F10',
        contrastText: '#fff'
      },
     
    },
  });

  const useStyles = makeStyles({
    inputDataList: {
        width: '90%',
        marginTop: '15px',
        paddingTop: '7px',
        paddingBottom: '7px',
        paddingLeft: '14px',
        paddingRight: '32px',
        borderRadius: '4px',
        border: '1px solid #bfbfbf',
        "&:hover": {
            border: "1px solid #522F10"
        }
    },
    submitButton: {
        color: 'red',
        "&:active" : {
            border: '10px solid red'
        }
    }
    
  
  
  
  })


export function Search({user, listItemPressed}) {
    const classes = useStyles();

    //States
    const [viviendas, setViviendas] = useState('')
    const [show, setShow] = useState(false);
    const [usoResiduos, setUsoResiduos] = useState('')
    const [tipoVia, setTipoVia] = useState('')
    const [localidades, setLocalidades] = useState('')
    const [campañaAnterior, setCampañaAnterior] = useState('')
    const [nombreVia, setNombreVia] = useState([])
    const [contrato, setContrato] = useState()
    const [numPortal, setNumPortal] = useState('')
    const [bloque, setBloque] = useState('')
    const [escalera, setEscalera] = useState('')
    const [piso, setPiso] = useState('')
    const [puerta, setPuerta] = useState('')
    const [municipio, setMunicipio] = useState('')
    const [searchResult, setSearchResult] = useState([])
    const [displayTable, setDisplayTable] = useState(false)
    const [noResults, setNoResults] = useState('')
    //states para input data list
    const [nombreViaSelected ,  setNombreViaSelected ]  =  useState ('') ;
    const [countResults, setCountResults] = useState(0)


    //Methods
   

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true); 

    //Para nombre de vias
    const  onSelect  =  useCallback ( ( selectedItem )  =>  { 
        
        setNombreViaSelected(selectedItem.nombre_via)
        
      } ,  [ ] ) ;
     const itemsNombreVia = useMemo(() => 

            
          nombreVia.map((via) => ({
            // required: what to show to the user
            label: via.nombre_via,
            // required: key to identify the item within the array
            key: via.nombre_via,
            // feel free to add your own app logic to access those properties in the onSelect function
            nombre_via: via.nombre_via,
            // or just keep everything
            ...via,
          })),
        [nombreVia]
      );
    const getNombreVias = () => {

        axios.get('http://localhost:8000/api/NombreVias', {

    })
    .then(function (response) {
             
        setNombreVia(response.data)

    })
    .catch(function (error) {
      console.log(error);
    })
    //Para nombre de vias unicamente
    


    const lookingForResults = (e) => {

        e.preventDefault()
    }
    }
    //Para nombre de vías únicamente
    

     const lookingForResults = (event) => {

        event.preventDefault();

        const jsonStates = {
            usoResiduos : JSON.stringify(usoResiduos),
            tipoVia :  JSON.stringify(tipoVia),
            localidades : JSON.stringify(localidades),
            campañaAnterior : JSON.stringify(campañaAnterior),
            contrato : contrato,
            numPortal : JSON.stringify(numPortal),
            bloque : bloque,
            escalera : JSON.stringify(escalera),
            piso : JSON.stringify(piso),
            puerta : JSON.stringify(puerta),
            municipio : JSON.stringify(municipio),
            nombreViaSelected : JSON.stringify(nombreViaSelected),
        }

        axios.get('http://localhost:8000/api/search', {
            params: jsonStates
          })
          .then(function (response) {
                   
            if (response.data) {

                if (response.data.length === 0) {

                    setDisplayTable(false)
                    setNoResults('No se han encontrado resultados')
                }else{
                    for (let index = 0; index < response.data.length; index++) {

                        if (response.data[index].fecha_visita) {
                            var fecha = response.data[index].fecha_visita.date

                            var fechaSplit = fecha.split(' ')

                            var fechaUnica = fechaSplit[0]; //Fecha
                            var tiempo  = fechaSplit[1];

                            var tiempoSplit = tiempo.split(':')

                            var horas = (parseInt(tiempoSplit[0]) + 1); //Horas transformadas
                            var minutos = tiempoSplit[1] //Minutos

                            var dataFormated = fechaUnica + ' ' + horas + ':' + minutos
                            
                            response.data[index].fecha_visita.date = dataFormated
                            
                        }
                       
                    }
                    setDisplayTable(true)
                    setSearchResult(response.data)
                    setCountResults(response.data.length)
                    countAll(jsonStates);
                    


                }
          
            }
           
          })
          .catch(function (error) {
            console.log(error);
          })


     }

     ///Funciones para la paginacion///

     const countAll = (jsonStates) => {
        axios.get('http://localhost:8000/api/countSearch', {
            params: jsonStates
          })
          .then(function (response) {
                   
            if (response.data) {

                setCountResults(response.data.length)
          
            }
           
          })
          .catch(function (error) {
            console.log(error);
          })
     }

     const nextResults = (rowsPerPage, secondParamNextResults) => {
        const jsonStates = {
            usoResiduos : JSON.stringify(usoResiduos),
            tipoVia :  JSON.stringify(tipoVia),
            localidades : JSON.stringify(localidades),
            campañaAnterior : JSON.stringify(campañaAnterior),
            contrato : contrato,
            numPortal : JSON.stringify(numPortal),
            bloque : bloque,
            escalera : JSON.stringify(escalera),
            piso : JSON.stringify(piso),
            puerta : JSON.stringify(puerta),
            municipio : JSON.stringify(municipio),
            nombreViaSelected : JSON.stringify(nombreViaSelected),
            rowsPerPage: rowsPerPage,
            secondParamNextResults: secondParamNextResults
        }
        axios.get('http://localhost:8000/api/nextSearch', {
            params: jsonStates
          })
          .then(function (response) {
                   
            if (response.data) {

                setSearchResult(response.data)
            }
           
          })
          .catch(function (error) {
            console.log(error);
          })
    }
    
     const prevResults = (rowsPerPage, secondParamPrevResults) => {
        const jsonStates = {
            usoResiduos : JSON.stringify(usoResiduos),
            tipoVia :  JSON.stringify(tipoVia),
            localidades : JSON.stringify(localidades),
            campañaAnterior : JSON.stringify(campañaAnterior),
            contrato : contrato,
            numPortal : JSON.stringify(numPortal),
            bloque : bloque,
            escalera : JSON.stringify(escalera),
            piso : JSON.stringify(piso),
            puerta : JSON.stringify(puerta),
            municipio : JSON.stringify(municipio),
            nombreViaSelected : JSON.stringify(nombreViaSelected),
            rowsPerPage: rowsPerPage,
            secondParamPrevResults: secondParamPrevResults
        }
        axios.get('http://localhost:8000/api/prevSearch', {
            params: jsonStates
          })
          .then(function (response) {
                   
            if (response.data) {

                setSearchResult(response.data)
            }
           
          })
          .catch(function (error) {
            console.log(error);
          })
     }
     //////////////////////////////////

     const changeArrayEditar= (housingUpdated) =>{

        console.log(housingUpdated.campana_anterior);
  
        const newHouse = searchResult.map( (result) => {
      
          if (result.id === housingUpdated.id) {
            

    
              if (housingUpdated.fecha_visita !== null) {
    
                //Creo un objeto fecha con el timestamp que llega del backend.
                var a = new Date(housingUpdated.fecha_visita * 1000);
                var year = a.getFullYear();
                var month = a.getMonth();
                var date = a.getDate();
                var hour = a.getHours();
                var min = a.getMinutes();
                var sec = a.getSeconds();
                var formattedTime = date + '-' + month + '-' + year + ' ' + hour + ':' + min + ':' + sec ;
    
                housingUpdated.fecha_visita = formattedTime
                
              }
              
            return {
              ...result,
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
              campaña_anterior: housingUpdated.campana_anterior,
              campaña_actual: housingUpdated.campana_actual,
              primera_visita: housingUpdated.primera_visita,
              segunda_visita: housingUpdated.segunda_visita,
              fecha_visita: housingUpdated.fecha_visita,
              observaciones: housingUpdated.observaciones
            }

      
          }
      
          return result
        })
        
        setSearchResult(newHouse)
        lookingForResults(event)
        
      }
  
  
  
    //Efectos al cargar página

    useEffect(() => {
       
        getNombreVias()
    }, [])


    return (
        <Fragment>
            <Box sx={{ flexGrow: 1 }} className='pb-3'>
                <Grid container spacing={2}>
                    <Grid item md={12}>
                        <Box
                            style={{marginLeft: '0px', marginRight: '0px', marginBottom: '3px'}}
                            sx={{
                            justifyContent: 'center',
                            p: 1,
                            m: 1,
                            bgcolor: 'background.paper',
                            }}
                        >
                            <Grid container spacing={2}>
                                <Grid item md={12}>
                                    <h4 style={{textAlign: 'center'}}>{listItemPressed}</h4>
                                </Grid>
                            </Grid>
                            <ThemeProvider theme={theme}>
                                <div className='container text-center'>
                                    <Box component="form" onSubmit={lookingForResults} noValidate sx={{ mt: 1 }}>
                                        <Grid container spacing={2}>
                                            <Grid item md={3}>
                                                <TextField
                                                    size='small'
                                                    color="brown"
                                                    margin="normal"
                                                    select
                                                    fullWidth
                                                    label= 'Uso de resíduos'
                                                    onChange={(e) => setUsoResiduos(e.target.value)}
                                                >
                                                    {uso_residuos.map((res) => (
                                                        <MenuItem key={res.value} value={res.value}>
                                                        {res.label}
                                                        </MenuItem>
                                                    ))}
                                                </TextField>
                                            </Grid>
                                            <Grid item md={3}>
                                                <TextField
                                                    size='small'
                                                    color="brown"
                                                    margin="normal"
                                                    select
                                                    fullWidth
                                                    label= 'Tipo de Vía'
                                                    onChange={(e) => setTipoVia(e.target.value)}
                                                    >
                                                    {TipoVia.map((via) => (
                                                        <MenuItem key={via.value} value={via.value}>
                                                        {via.label}
                                                        </MenuItem>
                                                    ))}
                                                </TextField>
                                            </Grid>
                                            <Grid item md={3}>
                                                <TextField
                                                    size='small'
                                                    color="brown"
                                                    margin="normal"
                                                    select
                                                    fullWidth
                                                    label= 'Localidades'
                                                    onChange={(e) => setLocalidades(e.target.value)}
                                                >
                                                    {Localidades.map((localidad) => (
                                                        <MenuItem key={localidad.value} value={localidad.value}>
                                                        {localidad.label}
                                                        </MenuItem>
                                                    ))}
                                                </TextField>
                                            </Grid>
                                            <Grid item md={3}>
                                                <TextField
                                                    size='small'
                                                    color="brown"
                                                    margin="normal"
                                                    select
                                                    fullWidth
                                                    label= 'Campaña anterior'
                                                    onChange={(e) => setCampañaAnterior(e.target.value)}
                                                >
                                                    {CampañaAnterior.map((campAnt) => (
                                                        <MenuItem key={campAnt.value} value={campAnt.value}>
                                                        {campAnt.label}
                                                        </MenuItem>
                                                    ))}
                                                </TextField>
                                            </Grid>
                                        </Grid>
                                        <Grid container spacing={2}>
                                            <Grid item md={3}>
                                            <DataListInput
                                                placeholder="Nombre de las vías"
                                                items={itemsNombreVia}
                                                onSelect={onSelect}
                                                requiredInputLength = {1}
                                                inputClassName={classes.inputDataList}

                                                />
                                            </Grid>
                                            <Grid item md={3}>
                                            <TextField
                                                size="small"
                                                color='brown'
                                                margin="normal"
                                                required
                                                fullWidth
                                                id="contrato"
                                                label="Contrato"
                                                name="Contrato"
                                                type="number"
                                                autoComplete="Contrato"
                                                autoFocus
                                                onChange={ (e) => setContrato(e.target.value)}
                                            />
                                            </Grid>
                                            <Grid item md={3}>
                                                <TextField
                                                    size="small"
                                                    color='brown'
                                                    margin="normal"
                                                    required
                                                    fullWidth
                                                    id="Nº PORTAL"
                                                    label="Nº Portal"
                                                    name="Nº Portal"
                                                    type="text"
                                                    autoComplete="Nº Portal"
                                                    autoFocus
                                                    onChange={ (e) => setNumPortal(e.target.value)}
                                                />
                                            </Grid>
                                            <Grid item md={3}>
                                                <TextField
                                                    size="small"
                                                    color='brown'
                                                    margin="normal"
                                                    required
                                                    fullWidth
                                                    id="Bloque"
                                                    label="Bloque"
                                                    name="Bloque"
                                                    type="number"
                                                    autoComplete="Bloque"
                                                    autoFocus
                                                    onChange={ (e) => setBloque(e.target.value)}
                                                />
                                            </Grid>
                                        </Grid>
                                        <Grid container spacing={2}>
                                            <Grid item md={3}>
                                                <TextField
                                                    size="small"
                                                    color='brown'
                                                    margin="normal"
                                                    required
                                                    fullWidth
                                                    id="escalera"
                                                    label="Escalera"
                                                    name="Escalera"
                                                    type="text"
                                                    autoComplete="Escalera"
                                                    autoFocus
                                                    onChange={ (e) => setEscalera(e.target.value)}
                                                />
                                            </Grid>
                                            <Grid item md={3}>
                                                <TextField
                                                    size="small"
                                                    color='brown'
                                                    margin="normal"
                                                    required
                                                    fullWidth
                                                    id="piso"
                                                    label="Piso"
                                                    name="Piso"
                                                    type="text"
                                                    autoComplete="Piso"
                                                    autoFocus
                                                    onChange={ (e) => setPiso(e.target.value)}
                                                />
                                            </Grid>
                                            <Grid item md={3}>
                                                <TextField
                                                    size="small"
                                                    color='brown'
                                                    margin="normal"
                                                    required
                                                    fullWidth
                                                    id="Puerta"
                                                    label="Puerta"
                                                    name="Puerta"
                                                    type="text"
                                                    autoComplete="Puerta"
                                                    autoFocus
                                                    onChange={ (e) => setPuerta(e.target.value)}
                                                />
                                            </Grid>
                                            <Grid item md={3}>
                                                <TextField
                                                    size="small"
                                                    color='brown'
                                                    margin="normal"
                                                    required
                                                    fullWidth
                                                    id="Municipio"
                                                    label="Municipio"
                                                    name="Municipio"
                                                    type="text"
                                                    autoComplete="Municipio"
                                                    autoFocus
                                                    onChange={ (e) => setMunicipio(e.target.value)}
                                                />
                                            </Grid>
                                        </Grid>
                                        <Grid container spacing={2}>
                                            <Grid item md={12}>
                                                <Button
                                                    type="submit"
                                                    color="brown"
                                                    variant="contained"
                                                    sx={{ mt: 4, mb: 3, }}
                                                >
                                                    Buscar
                                                </Button>
                                            </Grid>
                                        </Grid>
                                    </Box>
                                </div>
                            </ThemeProvider>
                        </Box>
                    </Grid>
                </Grid>
                {
                    displayTable ? (
                        <Fragment>
                             <SearchTable searchResult={searchResult} changeArrayEditar={changeArrayEditar} countResults={countResults} nextResults={nextResults} prevResults={prevResults}></SearchTable>
                        </Fragment>
                    ):
                    <h1>{noResults}</h1>
                }
            </Box>
        </Fragment>
    )
}
