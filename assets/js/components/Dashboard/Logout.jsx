import { Grid } from '@mui/material'
import React, { Fragment } from 'react'
import Box from '@mui/material/Box';
import LogoutIcon from '@mui/icons-material/Logout';
import { Button } from '@mui/material';


const DestroySession = () => {

    sessionStorage.removeItem('user')
    window.location.href= 'https://campana-organicax.herokuapp.com/'

}
export function Logout() {
    return (
        <Fragment>
            <Box sx={{ flexGrow: 1}}>
                <Grid container spacing={12}>
                    <Grid item md={6} sm={6} xs={8} >
                        <h5 className='pt-2'>Panel de administración</h5>
                    </Grid>
                    <Grid item md={1} sm={6} xs={3}>
                        <Button style={{color: 'white'}} onClick={DestroySession}>
                            <LogoutIcon></LogoutIcon>
                        </Button>
                    </Grid>
                </Grid>
            </Box>
        </Fragment>
    )
}
