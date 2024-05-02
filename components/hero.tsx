'use client'

import React from 'react';
import { Grid, Typography, Button } from '@mui/material';
import Link from 'next/link';
import KeyboardDoubleArrowDownIcon from '@mui/icons-material/KeyboardDoubleArrowDown';

const styles: { [key: string]: React.CSSProperties } = {
  container: {
    width: '100%',
    minHeight: '100vh',
    position: 'relative',
    backgroundColor: 'black',
  },

  videoContainer: {
    position: 'relative',
    width: '100%',
    height: '100vh',
  },

  video: {
    width: '100%',
    height: '100%',
    objectFit: 'cover',
  },

  heroTextContainer: {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    textAlign: 'center',
    whiteSpace: 'nowrap',
    color: 'white',
  },

  heroButtonContainer: {
    position: 'absolute',
    bottom: '5%',
    left: '50%',
    transform: 'translateX(-50%)',
    textAlign: 'center',
  },

  heroButton: {
    height: '64px',
    width: '250px',
    margin: '10px',
    padding: '20px 40px',
    color: 'white',
    backgroundColor: 'rgba(0, 0, 0, 0.0)',
    border: '2px solid white',
    borderRadius: '10px',
    fontWeight: 'bold',
    transition: 'background-color 0.3s, border-color 0.3s',
  },

  typeButtonContainer: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },

  typeButton: {
    margin: '5px',
    padding: '10px',
    color: 'white',
    backgroundColor: 'transparent',
    width: '150px',
    height: '100px',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    textAlign: 'center',
    whiteSpace: 'nowrap',
  },

  typeButtonText: {
    marginTop: '10px',
  },
  
  manufButton: {
    marginBottom: '5%',
    margin: '5px',
    padding: '10px 30px',
    color: 'white',
    backgroundColor: 'transparent',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    whiteSpace: 'nowrap',
  },

  gridContainer: {
    display: 'grid',
    gridTemplateColumns: 'repeat(5, 1fr)',
    margin: '0 auto',
  },
};

const carTypes = [
  "Sports Cars", "Convertibles", "Coupes", "Hatchbacks", "Saloons", "Estate Cars", "People Carriers", "SUVs"
];

const manufacturers = [
  "Audi", "BMW", "Mercedes", "Porsche", "Volkswagen"
];

const Hero: React.FC = () => {
  return (
    <Grid container className="contain" style={styles.container}>
      <Grid item xs={12}>
        <div className="hero__video-container" style={styles.videoContainer}>
          <video src="/video/hero.mp4" autoPlay loop muted style={styles.video} />
          
          {/* Centered text */}
          <div className="hero__text" style={styles.heroTextContainer}>
            <Typography variant="h1" component="h1" style={{ fontFamily: 'Helvetica, Arial, sans-serif', fontWeight: 'bold' }}>
            Driven by<span className="mobile-break"></span> Excellence
            </Typography>
          </div>
          
          {/* Buttons at the bottom */}
          <div className="hero__buttons" style={styles.heroButtonContainer}>
            <KeyboardDoubleArrowDownIcon style={{ fontSize: '32px', color: 'white', animation: 'bounce 2s infinite' }} />
          </div>
        </div>
      </Grid>
    </Grid>
  );
};

export default Hero;