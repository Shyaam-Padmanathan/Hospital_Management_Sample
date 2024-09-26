// eslint-disable-next-line no-unused-vars
import React from 'react';
import { AppBar, Toolbar, Button, Typography } from '@mui/material';
import { Link } from 'react-router-dom';

const navItems = [
    { to: "/hospitals", label: "Hospitals" },
    { to: "/doctors", label: "Doctors" },
    { to: "/patients", label: "Patients" }
];

const Navigation = () => (
    <AppBar position="absolute" sx={{width:'100vw', top:0, backgroundColor:'transparent',color:'black'}}>
        <Toolbar>
            <Typography variant="h6" style={{ flexGrow: 1 }}>
                Hospital Management System
            </Typography>
            {navItems.map(({ to, label }) => (
                <Button key={to} color="inherit" sx={{marginRight:'20px'}} component={Link} to={to}>
                    {label}
                </Button>
            ))}
        </Toolbar>
    </AppBar>
);

export default Navigation;
