import { AppBar, Toolbar, Typography, Box } from '@mui/material';

const Navbar = () => {
  return (
    <AppBar position="fixed" style={{ backgroundColor: 'rgba(0, 0, 0, 0.5)' }}>
      <Toolbar sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
        <img src="image/logo.png" width="20%" height="20%" alt="Logo" />
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
