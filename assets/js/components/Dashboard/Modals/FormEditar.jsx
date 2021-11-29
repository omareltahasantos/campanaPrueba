import React from 'react'
import { Fragment, useState, useEffect } from 'react';
import axios from 'axios';
export  function FormEditar({user, handleClose, changeArrayEditar}) {


    const [email, setEmail] = useState(user.email)
    const [password, setPassword] = useState(user.password)

    useEffect(() => {

        
        
    })

    const editarCambios = (e) =>{

        e.preventDefault();

        const userParams = {
            email: email,
            password: password,
            id: user.id
        }
         

        axios.get('http://localhost:8000/api/updateUser', {
            params: {
              email: JSON.stringify(userParams.email),
              password: JSON.stringify(userParams.password),
              id: userParams.id
            }
          })
          .then(function (response) {
           
            if (response.data.error === 'null') {
                              
                changeArrayEditar(response.data)
                
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
    

    

        

        //Captar los valores que se han metido

            //Variable email y password del estado ya són el valor que necesito

        //Enviarlos con axios a una API

        //Validar esos datos y actualizar el registro pasandole el id
        //Finalmente que se actualice la tabla


       

        //Hacemos todos los cambios[Como llamar a una api para que gestione los datos etc]
    }
    return (
        <Fragment>
              <div className='container text-center'>
                <form onSubmit={editarCambios}>
                    <input
                        type="email"
                        placeholder="Ingrese Email"
                        className="form-control mb-2"
                        value= {email}
                        onChange={ (e) => setEmail(e.target.value) }
                    />
                    <input 
                        type="password"
                        placeholder="Ingrese Contraseña"
                        className="form-control mb-2"
                        value= {password}
                        onChange={ e => setPassword(e.target.value) }
                    />
                    <button className="btn btn-primary btn-block" type="submit" style={{background: '#522F10', border: '#522F10'}}>Editar usuario</button>
                </form>
            </div>
        </Fragment>
    )
}
