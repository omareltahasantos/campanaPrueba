import React, { Fragment, useState, useEffect } from 'react'
import { BrowserRouter, Redirect } from "react-router-dom";
import { Route } from 'react-router';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOpenIcon from '@mui/icons-material/LockOpen';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import axios from 'axios';
import logo from '../../../images/LogoMarrones_transparente_redimensionado.png';
const theme = createTheme({
  palette: {
    brown: {
      main: '#522F10',
      contrastText: '#fff',
    },
  },
});


export function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [user, setUser] = useState({
        id: 333,
        email: 'omar@gmail.com',
        password: '12345',
        roles: ['ROLE_PRUEBA'],
        token: '1212341526TGWRGF2',
        isLogged: false
    });
    //Cuando reciba todos los datos del usuario, tengo que crear array de user en su estado
    useEffect(() => {
        const loggedInUser = sessionStorage.getItem("user");
        if (loggedInUser) {
          const foundUser = JSON.parse(loggedInUser);
          setUser(foundUser);
        

         window.location.href='http://localhost:8000/'
          
          
         
        }
        
        
      }, []); 

      //Se ejecutará cuando el estado de usuario cambié (Solo ocurrirá al intentar iniciar sesión)


    const handleSubmit = (event) => {
      event.preventDefault();
      const data = new FormData(event.currentTarget);
    
      const userJson = {
        email: email,
        password: password,
      }
      const URL_API = 'http://localhost:8000/api/checkUser'
      sendDataToApi(userJson, URL_API);
    };


    const sendDataToApi = (userJson, API) =>{

        //console.log(userJson)

        const emailConverted = JSON.stringify(userJson.email)
        const passwordConverted = JSON.stringify(userJson.password)

        axios.get('http://localhost:8000/api/checkifUserExists', {
        params: {
          email: emailConverted,
          password: passwordConverted
        }
      })
      .then(function (response) {
               
        if (response.data.error === 'null') {

            //get and save response from the API
            const roles = JSON.parse(response.data.roles)
            const jsonResponse = {
                id: response.data.id,
                email: response.data.email,
                password: response.data.password,
                roles: roles,
                token: response.data.token,
                isLogged: true
            }

            // set the state of the user
            setUser(jsonResponse);

            //store user in session storage
            sessionStorage.setItem('user', JSON.stringify(jsonResponse) )

            window.location.href='http://localhost:8000/'

           

        }
       


      })
      .catch(function (error) {
        console.log(error);
      })

    }



  
    return (
      <ThemeProvider theme={theme}>
        <Container component="main" maxWidth="xs">
           
          <CssBaseline />
          <Box
            sx={{
              marginTop: 8,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
            }}
          >
            <img src={logo} alt='logo'/>
            <Avatar sx={{ m: 1, bgcolor: '#522F10' }}>
              <LockOpenIcon />
            </Avatar>
            <Typography component="h1" variant="h5">
              Iniciar sesión
            </Typography>
            <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
              <TextField
                color='brown'
                margin="normal"
                required
                fullWidth
                id="email"
                label="Correo electrónico"
                name="email"
                autoComplete="email"
                autoFocus
                onChange={ (e) => setEmail(e.target.value) }
              />
              <TextField
                color="brown"
                margin="normal"
                required
                fullWidth
                name="password"
                label="Contraseña"
                type="password"
                id="password"
                autoComplete="current-password"
                onChange={ (e) => setPassword(e.target.value) }
              />
              <FormControlLabel
                control={<Checkbox value="remember" color="brown" />}
                label="Recuérdame"
              />
              <Button
                color="brown"
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
              >
                Inicia sesión
              </Button>
             
            </Box>
          </Box>
          
        </Container>
      </ThemeProvider>
    );
  }
