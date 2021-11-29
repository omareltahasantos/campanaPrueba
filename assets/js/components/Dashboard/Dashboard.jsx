import React, {Fragment, useEffect, useState} from 'react'
import { Redirect } from 'react-router';
import { Login } from '../Login/Login';
import { BrowserRouter } from 'react-router-dom';
import { Route } from 'react-router';
import { useHistory } from "react-router-dom";
import {browserHistory} from "react-router";
import { GetDataUser } from '../GetDataUser';
import {Navbar} from './Navbar';
import {Sidebar} from './Sidebar'
export function Dashboard() {
    
   const [userExist, setuserExist] = useState();
    const roles = {
        role_admin: '',
        role_user: '',
    }

    const [user, setUser] = useState({
        id: 333,
        email: 'omar@gmail.com',
        password: '12345',
        roles: ['ROLE_PRUEBA'],
        token: '1212341526TGWRGF2',
        isLogged: false
    });

    //Función para desplegar un componente con los datos del usuario con su HTML
    const displayDataUser = () =>{

        user.roles.map( function (rol){

            if(rol === 'ROLE_ADMIN'){
                roles.role_admin = rol
            }

            if(rol === 'ROLE_USER'){
                 roles.role_user = rol
            }
        })

        if ( user.isLogged)  {
            //trabajar aquí con el rol y pasarlo al getDataUser para ver que se muestra
            
           // return <GetDataUser userdata ={user}></GetDataUser>
           
            
        }
  
    }

    useEffect(() => {
     
        const loggedInUser = sessionStorage.getItem("user");
     
        if (loggedInUser) {
            setuserExist(true)
            const foundUser = JSON.parse(loggedInUser);
            setUser(foundUser)
            
        }else if (!loggedInUser) {
            setuserExist(false)
            window.location.href='http://localhost:8000/login'
        }
        
        
      }, []); 

      //HE CAPADO LAS DOS RUTAS PARA QUE AUNQUE ACCEDAS SI NO ESTAS LOGEADO TE ECHE PARA ATRAS 
    return (
        <Fragment>
            {
                <Sidebar user={user} setUser={setUser}></Sidebar>
            }
           
        </Fragment>
    )
}
