import * as React from 'react';
import PropTypes from 'prop-types';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import CssBaseline from '@mui/material/CssBaseline';
import Divider from '@mui/material/Divider';
import Drawer from '@mui/material/Drawer';
import IconButton from '@mui/material/IconButton';
import InboxIcon from '@mui/icons-material/MoveToInbox';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import MailIcon from '@mui/icons-material/Mail';
import MenuIcon from '@mui/icons-material/Menu';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import LogoutIcon from '@mui/icons-material/Logout';
import logo from '../../../images/Logo_Consorcio_Residuos_Navarra.png'
import HouseSharpIcon from '@mui/icons-material/HouseSharp';
import { ListItemSidebar } from './ListItemSidebar';
import SearchTwoToneIcon from '@mui/icons-material/SearchTwoTone';
import { Logout } from './Logout';

const drawerWidth = 240;

function ResponsiveDrawer(props) {
  const { window } = props;
  const [mobileOpen, setMobileOpen] = React.useState(false);


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
      //window.location.href= 'https://campana-organicax.herokuapp.com/'
      
    }
  }

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };
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
  const drawer = (
    <div>
      <ListItemSidebar></ListItemSidebar>
    </div>
  );

  const container = window !== undefined ? () => window().document.body : undefined;

  return (
    <Box sx={{ display: 'flex', padding: '0px', margin: '0px' }}>
      <CssBaseline />
      <AppBar
        position="fixed"
        sx={{
          width: { sm: `calc(100%)` },
          ml: { sm: `${drawerWidth}px` },
        }}
        style={{backgroundColor: '#522F10'}}
      >
        
        <Toolbar>
          <Typography variant="h6" noWrap component="div">
            <Logout/>
          </Typography>
        </Toolbar>
      </AppBar>

    </Box>
  );
}

ResponsiveDrawer.propTypes = {
  /**
   * Injected by the documentation to work in an iframe.
   * You won't need it on your project.
   */
  window: PropTypes.func,
};

export default ResponsiveDrawer;