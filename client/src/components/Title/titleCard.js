import React, { useState } from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import { Avatar } from '@mui/material';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';

export default function ButtonAppBar({userId, setUserId, userName, userImage}) {
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);  // Open the dropdown menu
  };

  const handleClose = () => {
    setAnchorEl(null);  // Close the dropdown menu
  };

  const handleLogout = () => {
    // Logic for logging out the user, e.g., clearing session/local storage, etc.
    setUserId(null);
    window.location.href = 'http://localhost:3000';
    setAnchorEl(null);
    // Add your logout logic here, such as removing token, clearing state, etc.
  };
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2 }}
          >
            <img src = 'leetjournal.png' alt = 'LeetJournal' style={{ width: "50px", height: "50px", borderRadius: "8px" }}/>
          </IconButton>
          <Typography variant="h3" component="div" sx={{ flexGrow: 1 }}>
            LeetJournal
          </Typography>
          <Button color="inherit" onClick={handleClick}>{!userName ? "Login" : 
          <>
            <Avatar
            src={userImage}
            alt="Profile Image"
            style={{ width: "40px", height: "40px" }}
          />
          <Typography padding='13px'>  {`  ${userName}`}</Typography>
          </>}</Button>
          <Menu
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'center',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'center',
        }}
      >
        <MenuItem onClick={handleLogout}>Logout</MenuItem>
      </Menu>
        </Toolbar>
      </AppBar>
    </Box>
  );
}
