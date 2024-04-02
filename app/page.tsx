import React from 'react';
import { Grid, Typography, Button } from '@mui/material';
import Link from 'next/link'
import { getServerSession } from 'next-auth';
import { authOptions } from './api/auth/[...nextauth]/route';
import DoubleArrowIcon from '@mui/icons-material/DoubleArrow';

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
    bottom: '10%',
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

const Home: React.FC = () => {
  return (
    <Grid container className="contain" style={styles.container}>
      <Grid item xs={12}>
        <div className="hero__video-container" style={styles.videoContainer}>
          <video src="/video/hero.mp4" autoPlay loop muted style={styles.video} />
          
          {/* Centered text */}
          <div className="hero__text" style={styles.heroTextContainer}>
            <Typography variant="h1" component="h1" style={{ fontFamily: 'Helvetica, Arial, sans-serif', fontWeight: 'bold' }}>
              Driven by Excellence
            </Typography>
          </div>
          
              {/* Buttons at the bottom */}
              <div className="hero__buttons" style={styles.heroButtonContainer}>
                <Link href="/catalog">
                  <Button variant="contained" color="primary" sx={{ ...styles.heroButton, '&:hover': { backgroundColor: 'rgba(255, 255, 255, 0.1)' } }}>
                    Browse Catalog
                    <DoubleArrowIcon style={{ marginLeft: '10px' }} />
                  </Button>
                </Link>
              </div>
            </div>
          </Grid>
  
      <Grid item xs={12} style={{ textAlign: 'center', marginTop: '5%' }}>
        <Typography variant="h4" component="h2" style={{ fontFamily: 'Helvetica, Arial, sans-serif', color: 'white', fontWeight: 'bold', marginBottom: '1%' }}>
          Explore Our Selection
        </Typography>
        <Typography variant="h6" component="h2" style={{ fontFamily: 'Helvetica, Arial, sans-serif', color: 'white', fontWeight: 'bold', marginBottom: '4%' }}>
          Browse by Type
        </Typography>
          <div style={styles.typeButtonContainer}>
            {carTypes.map((carType, index) => {
              // Replace spaces with hyphens in the car type
              const urlCarType = encodeURIComponent(carType.toLowerCase().replace(/\s+/g, '-'));

              return (
                <div key={index} style={styles.typeButton}>
                  <Link href={urlCarType}>
                    <img src={`icon/car-type/${carType}.svg`} alt={carType} />
                    <p style={styles.typeButtonText}>{carType}</p>
                  </Link>
                </div>
              );
            })}
          </div>
          <Typography variant="h6" component="h2" style={{ fontFamily: 'Helvetica, Arial, sans-serif', color: 'white', fontWeight: 'bold', marginBottom: '2%', marginTop: '4%' }}>
          Browse by Manufacturer
        </Typography>
        <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '4%' }}>
          <div style={styles.gridContainer}>
            {manufacturers.map((manufacturer, index) => {
              // Replace spaces with hyphens in the manufacturer name
              const urlManufacturer = manufacturer.toLowerCase().replace(/\s+/g, '-');

              return (
                <div key={index} style={styles.manufButton}>
                  <Link href={urlManufacturer}>
                    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                      <img src={`icon/car-manuf/${manufacturer}.svg`} alt={manufacturer} style={{ width: '50px', height: '50px' }} />
                      <p style={{ marginTop: '10px' }}>{manufacturer}</p>
                    </div>
                  </Link>
                </div>
              );
            })}
          </div>
        </div>
      </Grid>
    </Grid>
  );
};

export default Home;