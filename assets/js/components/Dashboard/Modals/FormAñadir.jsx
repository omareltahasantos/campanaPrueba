import React from 'react'
import { Fragment, useState } from 'react';
import axios from 'axios';
export  function FormAñadir({handleClose, getUsers}) {


    const [email, setEmail] = useState()
    const [password, setPassword] = useState()

    const getDataList = () =>{

    
        axios.get('http://localhost:8000/api/UsersList', {
    
          })
          .then(function (response) {
                   
            if (response.data) {
    
    
              //console.log(response.data);
    
              const usuarios = response.data;
              const lastItem = usuarios[usuarios.length - 1]

               console.log(lastItem)

              getUsers(lastItem)
    
             // setUsers(usuarios);
          
    
            }
           
    
    
          })
          .catch(function (error) {
            console.log(error);
          })
    
    
      
    
        
      }

    const añadirUsuario = (e) =>{

        e.preventDefault();

        const userParams = {
            email: email,
            password: password
        }

        const emailConverted = JSON.stringify(userParams.email)
        const passwordConverted = JSON.stringify(userParams.password)

        axios.get('http://localhost:8000/api/newUser', {
        params: {
          email: emailConverted,
          password: passwordConverted
        }
      })
      .then(function (response) {
               
        if (response.data.error === 'null') {
            //Recibir json con todos los usuarios que tiene la tabla
            getDataList();
            handleClose();

            

        }else{

            const jsonResponse = {
                error: response.data.error
            }
            console.log(jsonResponse.error)
            handleClose();
        }
       


      })
      .catch(function (error) {
        console.log(error);
      })

       

        

    
    }
    return (
        <Fragment>
              <div className='container text-center'>
                <form onSubmit={añadirUsuario}>
                    <input
                        type="email"
                        placeholder="Ingrese Email"
                        className="form-control mb-2"
                        onChange={ (e) => setEmail(e.target.value) }
                    />
                    <input 
                        type="password"
                        placeholder="Ingrese Contraseña"
                        className="form-control mb-2"
                        onChange={ e => setPassword(e.target.value) }
                    />
                    <button className="btn btn-primary btn-block" type="submit" style={{background: '#522F10', border: '#522F10'}}>Añadir usuario</button>
                </form>
            </div>
        </Fragment>
    )
}
