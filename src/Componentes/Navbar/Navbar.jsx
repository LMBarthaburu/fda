import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Logo from '../../Recursos/Img/fda.png'
import { Avatar, IconButton } from '@mui/material';

export default function Navbar() {
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar
          sx={{
            justifyContent: 'space-between'
          }}
        >
          <IconButton 
            sx={{ 
              p: 0,
              borderRadius: '0',
              '&:hover':{
                backgroundColor: 'transparent',
                opacity: '0.9'              
              }
            }}
            href='/'
          >
            <Avatar alt="FDA logotipo" src={Logo} 
            sx={{
              borderRadius: '0',
              width: {sx:'70px', md:'100px'},
              height: 'auto ',
            }}/>
          </IconButton>          
        </Toolbar>
      </AppBar>
    </Box>
  );  
}
