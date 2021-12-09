import { Grid } from '@mui/material'
import React, { Fragment } from 'react'
import Box from '@mui/material/Box';
import LogoutIcon from '@mui/icons-material/Logout';
import { Button } from '@mui/material';
import Logo from '../../../images/Logo_Mancomunidad de Mairaga.png'

const DestroySession = () => {

    sessionStorage.removeItem('user')
    window.location.href= 'https://campana-organicax.herokuapp.com/'

}
export function Logout() {
    return (
        <Fragment>
                <Grid 
                    container
                    spacing={{xs:30, md:140}}
                    >
                        <Grid item md={6} xs={3}>
                            <img src={Logo} style={{width: '70px'}}/>
                        </Grid>
                        <Grid item md={6} xs={6}>
                            <Button style={{color: 'white'}} onClick={DestroySession}>
                                <LogoutIcon></LogoutIcon>
                            </Button>
                        </Grid>
                </Grid>
        </Fragment>
    )
}
