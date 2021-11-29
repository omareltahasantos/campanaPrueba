import React, {Fragment, useState} from 'react'

export function GetDataUser({userdata}) {

   // const [userState, setUserState] = useState(userdata);

    return (
        <Fragment>
            <div>
                <h1>Dashboard de Campaña orgánica</h1>
                <p>Email: {userdata.email}</p>
                <p>Token: {userdata.token}</p>
                ROLES:
                <ul>
                    {
                        userdata.roles.map( rol => (    

                            <li>{rol}</li>
                        ))
                    }
                   
                </ul>
            </div>
         
        </Fragment>
    )
}
