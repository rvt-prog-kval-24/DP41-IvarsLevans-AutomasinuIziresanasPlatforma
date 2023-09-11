import React from 'react';
import { Grid, Typography, Button } from '@mui/material';

const Hero = () => {
  const heroTextStyle = {
    position: 'absolute',
    top: '30%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    padding: '80px',
    textAlign: 'center',
    whiteSpace: 'nowrap',
  };

  const buttonStyle = {
    margin: '30px',
    padding: '150px 150px',
    color: 'white',
    border: '2px solid white'
  };

  const heroButtonsContainer = {
    position: 'absolute',
    top: '150%',
    bottom: '20px',
    left: '50%',
    transform: 'translateX(-50%)',
    textAlign: 'center',
  };

  const heroButtonStyle = {
    margin: '10px',
    padding: '20px 40px',
    color: 'white',
    backgroundColor: 'transparent',
    border: '2px solid white',
    fontWeight: 'bold',
  };

  return (
    <Grid container className="hero" style={{ width: '100%', minHeight: '100vh', position: 'relative' }}>
      <Grid item xs={12}>
        <div className="hero__video-container" style={{ position: 'relative', width: '100%', height: '100vh' }}>
          <video src="/video/hero.mp4" autoPlay loop muted style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
        </div>

        <div className="hero__text" style={heroTextStyle}>
          <Typography variant="h1" component="h1" sx={{ fontFamily: 'Helvetica, Arial, sans-serif', fontWeight: 'bold' }}>
            Discover & make your bid.
          </Typography>

          <Grid item xs={12} style={heroButtonsContainer}>
            <Button variant="outlined" color="primary" style={heroButtonStyle}>
              Buy a car
            </Button>
            <Button variant="outlined" color="primary" style={heroButtonStyle}>
              Sell my car
            </Button>
          </Grid>
        </div>
      </Grid>

      <Grid item xs={12} style={{ textAlign: 'center', marginTop: '30px' }}>
        <Typography variant="h4" component="h2" sx={{ fontFamily: 'Helvetica, Arial, sans-serif', color: 'white', fontWeight: 'bold' }}>
          Discover
        </Typography>
        <Button variant="outlined" color="primary" style={buttonStyle}>
          Button 1
        </Button>
        <Button variant="outlined" color="primary" style={buttonStyle}>
          Button 2
        </Button>
        <Button variant="outlined" color="primary" style={buttonStyle}>
          Button 3
        </Button>
      </Grid>
    </Grid>
  );
};

export default Hero;