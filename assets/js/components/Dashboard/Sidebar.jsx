import * as React from 'react';
import { useEffect, Fragment, useState } from 'react';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import CssBaseline from '@mui/material/CssBaseline';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import List from '@mui/material/List';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import ListItem from '@mui/material/ListItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import InboxIcon from '@mui/icons-material/MoveToInbox';
import MailIcon from '@mui/icons-material/Mail';
import { Navbar } from './Navbar';
import LogoutIcon from '@mui/icons-material/Logout';
import GroupIcon from '@mui/icons-material/Group';
import SettingsIcon from '@mui/icons-material/Settings';
import PersonIcon from '@mui/icons-material/Person';
import HouseSharpIcon from '@mui/icons-material/HouseSharp';
import { Userlist } from './Userlist';
import logo from '../../../images/Logo_Consorcio_Residuos_Navarra.png'
import { makeStyles } from '@mui/styles';
import { Button } from '@mui/material';
import { Grid } from '@mui/material';
import {styled} from '@mui/styles';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import { Añadir } from './Modals/Añadir';
import { Modal } from 'react-bootstrap';
import axios from 'axios';
import { Account } from './Vivienda/Account';
import { CSVLink, CSVDownload } from "react-csv";
import SearchTwoToneIcon from '@mui/icons-material/SearchTwoTone';
import {Search} from './Buscador/Search';

const useStyles = makeStyles({
  navbarColor: {
    background: '#522F10',
  },

  backGrey: {
    background: '#F4F6F8'
  },  

  spacingBetweenButtons: {
    color: 'red'
  },
  



})



const drawerWidth = 240;

export function Sidebar({user, setUser}) {
  const classes = useStyles();


  useEffect(() => {
     
    const loggedInUser = sessionStorage.getItem("user");
 
    if (loggedInUser) {

        const foundUser = JSON.parse(loggedInUser);
        setUser(foundUser)


        //Ejecutamos getAllUsers porque nos dará todos los usuarios de la base de datos

       getAllUsers();
        
    }
  }, []);

    const listItem = [
        {
            text: 'Viviendas',
            icon: <HouseSharpIcon></HouseSharpIcon>
        },
        {
          text: 'Buscador',
          icon: <SearchTwoToneIcon></SearchTwoToneIcon>
        },
        {
            text: 'Cerrar sesión',
            icon: <LogoutIcon></LogoutIcon>
        },
    
    ]

    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    const [usersState, setUsers] = useState([]);
    const [listItemPressed, setListItemPressed] = useState('Listado de las últimas viviendas')

    const [showUserList, setShowUserList] = useState(false)
    const [showAccount, setShowAccount] = useState(true)
    const [showBuscador, setShowBuscador] = useState(false)
    const changeShowComponent = (component) => {

      if (component === 'Usuarios') {
        setShowUserList(true)
        setShowAccount(false)
        setShowBuscador(false)
        setListItemPressed('Listado de usuarios')
      }else if (component === 'Viviendas') {
        
        setShowAccount(true)
        setShowUserList(false)
        setShowBuscador(false)
        setListItemPressed('Listado de las últimas viviendas')
      }else if (component === 'Buscador') {
        
        setShowAccount(false)
        setShowUserList(false)
        setShowBuscador(true)
        setListItemPressed(component)
      }else if(component === 'Cerrar sesión'){
        sessionStorage.removeItem('user')
        window.location.reload();
      }
    }

    const getAllUsers = () => {

      axios.get('http://localhost:8000/api/UsersList', {

      })
      .then(function (response) {
               
        if (response.data) {

          const users = response.data;

          setUsers(users);
        }

      })
      .catch(function (error) {
        console.log(error);
      })
    
    }


    const getUsers = (newUser) =>{ //Va a recibir los usuarios que vengan desde FormAñadir->Añadir->Actual(Sidebar)->UserList

      //Seteare el estado y se lo pasare al componente userlist para que haga set

      setUsers([...usersState, newUser])
    }

    const changeArrayEditar= (usersUpdated) =>{


      
      const newUsers = usersState.map( (user) => {
  
        if (user.id === usersUpdated.id) {
          
          return {
            ...user,
            id: usersUpdated.id,
            email: usersUpdated.email,
            password: usersUpdated.password
          }
  
        }
  
        return user
      })
  
      setUsers(newUsers)
      
    }

  

   

  return (
    <Box sx={{ display: 'flex' }} className={classes.backGrey}>
      <CssBaseline />
      
      <AppBar
        position="fixed"
        
        sx={{ width: `calc(100% - ${drawerWidth}px)`, ml: `${drawerWidth}px` }}
      >
        <Toolbar className={classes.navbarColor}> 
          <Typography variant="h6" noWrap component="div">
            <Navbar></Navbar>
          </Typography>
        </Toolbar>
      </AppBar>
      <Drawer
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          '& .MuiDrawer-paper': {
            width: drawerWidth,
            boxSizing: 'border-box',
          },
        }}
        variant="permanent"
        anchor="left"
      > 
      
        <Toolbar><span><img src={logo} alt='logo'/></span></Toolbar>
        
        <Divider />
      
        <Divider />
        <List >

          {listItem.map((item, index) => (
            <ListItem button key={index } onClick={() => changeShowComponent(item.text)}>
              <ListItemIcon>
                {item.icon}
              </ListItemIcon>
              <ListItemText primary={item.text} />
            </ListItem>
          ))}
        </List>
      </Drawer>

     
      <Box
        component="main"
        sx={{ flexGrow: 1, p: 3 }}
        className={classes.backGrey}
      >
        <Toolbar />

        {
          showUserList ? (
          <Fragment>
             <Box sx={{ flexGrow: 1, justifyContent: 'flex-end' }} className='pb-3'>
              <Grid container spacing={2}>
                <Grid item md={4}>
                  <h4>{listItemPressed}</h4>
                </Grid>
                <Grid item md={4}>
                </Grid>
                <Grid item md={4}>
                  {
                    user.roles[0] === 'ROLE_ADMIN' ? (
                      <Fragment>
                        <CSVLink data={usersState} filename={'Tabla-users.csv'}><Button variant="contained" size='medium' style={{background: '#522F10', fontWeight: 'bold', justifyContent: 'flex-end'}} className='ml-3'>exportar</Button></CSVLink>
                        <Button variant="contained" size='medium' style={{background: '#522F10', fontWeight: 'bold'}} className='ml-2' onClick={handleShow}>Añadir usuario</Button>
                      </Fragment>
                  ) : (
                    <Button variant="contained" size='medium' style={{background: '#522F10', fontWeight: 'bold'}} className='ml-5' onClick={handleShow}>Añadir usuario</Button>
                  )
                  }
                
                </Grid>
              </Grid>
            </Box>
          </Fragment>
         
          ) : ''
        }
        {
          showAccount ? (
            <Account user={user} listItemPressed={listItemPressed}></Account>
          ): ''
        }
        
        {
          showBuscador ? (
            <Search user={user} listItemPressed={listItemPressed}></Search>
          ): ''
        }
        <br></br>
        <br></br>
        <br></br>
        <br></br>
        <br></br>
        <br></br>
        <br></br>
        <br></br>
      </Box>
    </Box>
  );
}