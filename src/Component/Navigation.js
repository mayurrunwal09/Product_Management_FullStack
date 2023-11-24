// Navigation.js
import React from 'react';
import { Link } from 'react-router-dom';
import { AppBar, Toolbar, Typography, Button } from '@mui/material';

const Navigation = () => {
  return (
    <AppBar position="sticky" sx={{ top: 0, zIndex: 1000, backgroundColor: '#333' }}>
      <Toolbar>
        <Typography variant="h1" component="div" sx={{ flexGrow: 1 }}>
      Product  App 
        </Typography>
        <Button color="inherit" component={Link} to="/" sx={{ marginRight: 2 }}>
          Home
        </Button>
        <Button color="inherit" component={Link} to="/Product" sx={{ marginRight: 2 }}>
          Product
        </Button>
        <Button color="inherit" component={Link} to="/Category">
          Category
        </Button>
      
        <Button color="inherit" component={Link} to="/Order">
          Order
        </Button>
        <Button color="inherit" component={Link} to="/OrderItem">
          OrderItem
        </Button>
        <Button color="inherit" component={Link} to="/CartProduct">
          CartList
        </Button>
        <Button color="inherit" component={Link} to="/OrderSearch">
          Get_Product_By_OrderId
        </Button>


        <Button color="inherit" component={Link} to="/SearchCategory">
          Catagory_By_CartId
        </Button>
   
      </Toolbar>
    </AppBar>
  );
};

export default Navigation;
