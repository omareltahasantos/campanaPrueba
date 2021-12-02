import React, { Fragment } from 'react'
import HouseSharpIcon from '@mui/icons-material/HouseSharp';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import SearchTwoToneIcon from '@mui/icons-material/SearchTwoTone';
import LogoutIcon from '@mui/icons-material/Logout';
import Divider from '@mui/material/Divider';

export function ListItemSidebar() {

    const listItem = [
        {
          text: 'Buscador',
          icon: <SearchTwoToneIcon></SearchTwoToneIcon>
        },
        {
            text: 'Cerrar sesión',
            icon: <LogoutIcon></LogoutIcon>
        },
    
    ]
    const changeShowComponent = (component) => {

        if (component === 'Usuarios') {
          setShowUserList(true)
          setShowBuscador(false)
          setListItemPressed('Listado de usuarios')
        }else if (component === 'Viviendas') {
          
          setShowUserList(false)
          setShowBuscador(false)
          setListItemPressed('Listado de las últimas viviendas')
        }else if (component === 'Buscador') {
          
          setShowUserList(false)
          setShowBuscador(true)
          setListItemPressed(component)
        }else if(component === 'Cerrar sesión'){
          sessionStorage.removeItem('user')
          window.location.href= 'https://campana-organicax.herokuapp.com/'
          
        }
      }

    return (
        <Fragment>
            <Divider />
                <List>
                    {listItem.map((item, index) => (
                        <ListItem button key={index } onClick={() => changeShowComponent(item.text)}>
                            <ListItemIcon>
                            {item.icon}
                            </ListItemIcon>
                            <ListItemText primary={item.text} />
                        </ListItem>
                        ))}
                </List>
            <Divider />
        </Fragment>
    )
}
