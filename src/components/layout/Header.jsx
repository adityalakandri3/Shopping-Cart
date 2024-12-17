import { AppBar, Box, Button, Toolbar, Typography } from '@mui/material'
import React from 'react'
import { Link } from 'react-router-dom'


const Header = () => {
  return (
    <>
    <Box sx={{flexGrow:1}}>
        <AppBar position='static'>
        <Toolbar>
            <Typography variant='h6'component='div' sx={{ flexGrow: 1 }}>
            Shop
            </Typography>
            <Button color='inherit' component={Link} to='/'>Products</Button>
            <Button color='inherit' component={Link} to='/cart'>Cart</Button>
            
            </Toolbar>
        </AppBar>
    </Box>
    </>
  )
}

export default Header
