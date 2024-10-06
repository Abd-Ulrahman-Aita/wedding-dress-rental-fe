import React, { useEffect, useState } from 'react';
import { AppBar, Toolbar, Typography, Button, Box, IconButton, Drawer, List, ListItem } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

const Navbar: React.FC = () => {
    const { user, logout } = useAuth();
    const navigate = useNavigate();
    
    // State to manage the drawer visibility
    const [drawerOpen, setDrawerOpen] = useState(false);
    const [userName, setUserName] = useState<string | null>(null);

    // Retrieve user name from local storage
    useEffect(() => {
        // const user = JSON.parse(localStorage.getItem('user')!); 
        setUserName(user!.name); 
    }, []);

    const handleLogout = () => {
        logout();
        navigate('/login');
    };

    // Toggle the drawer open/close
    const toggleDrawer = (open: boolean) => () => {
        setDrawerOpen(open);
    };

    const menuItems = (
        <Box
            sx={{ width: 250 }}
            role="presentation"
            onClick={toggleDrawer(false)} // Close the drawer on item click
            onKeyDown={toggleDrawer(false)}
        >
            {userName && (
                <Typography
                    variant="body1"
                    sx={{ paddingX: "16px", paddingTop: "8px" }}
                >
                    Welcome, {userName}
                </Typography>
            )}
            <List>
                <ListItem component={Link} to="/">
                    Home
                </ListItem>
                <ListItem component={Link} to="/account">
                    Account
                </ListItem>
                <ListItem onClick={handleLogout}>
                    Logout
                </ListItem>
            </List>
        </Box>
    );

    return (
        <AppBar position="static">
            <Toolbar>
                <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                    Wedding Dress Rental
                </Typography>

                {userName && (
                    <Typography
                        variant="body1"
                        sx={{ display: { xs: 'none', md: 'block' }}}>
                        Welcome, {userName} |
                    </Typography>
                )}

                <Box sx={{ display: { xs: 'none', md: 'flex' } }}>
                    <Button color="inherit" component={Link} to="/">
                        Home
                    </Button>
                    <Button color="inherit" component={Link} to="/account">
                        Account
                    </Button>
                    <Button color="inherit" onClick={handleLogout}>
                        Logout
                    </Button>
                </Box>
                {/* Mobile Menu Icon */}
                <IconButton
                    color="inherit"
                    aria-label="open drawer"
                    onClick={toggleDrawer(true)}
                    sx={{ display: { xs: 'flex', md: 'none' } }}
                >
                    <MenuIcon />
                </IconButton>
            </Toolbar>
            {/* Drawer for mobile view */}
            <Drawer anchor="right" open={drawerOpen} onClose={toggleDrawer(false)}>
                {menuItems}
            </Drawer>
        </AppBar>
    );
};

export default Navbar;
