import React from 'react';
import { Grid, Typography, Button } from '@mui/material';

const styles = {
  heroContainer: {
    width: '100%',
    minHeight: '100vh',
    position: 'relative',
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
  },

  heroButtonContainer: {
    position: 'absolute',
    bottom: '10%',
    left: '50%',
    transform: 'translateX(-50%)',
    textAlign: 'center',
  },

  heroButton: {
    margin: '10px',
    padding: '20px 40px',
    color: 'white',
    backgroundColor: 'rgba(0, 0, 0, 0.0)',
    border: '2px solid white',
    borderRadius: '10px',
    fontWeight: 'bold',
    transition: 'background-color 0.3s, border-color 0.3s',
    '&:hover': {
      backgroundColor: 'rgba(255, 255, 255, 0.1)',
      borderColor: 'rgba(246, 190, 0)',
    },
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
  "Abarath", "Dacia", "Kia", "Mini", "Skoda", "Alfa Romeo", "DS", "Lamborghini", "Mitsubishi", "Smart",
  "Alpine", "Fiat", "Land Rover", "Nissan", "SsangYong", "Aston Martin", "Ford", "Lexus", "ORA", "Subaru", "Audi",
  "Genesis", "Lotus", "Peugeot", "Suzuki", "Bentley", "Honda", "Maserati", "Polestar", "Tesla", "BMW",
  "Hyundai", "Mazda", "Porsche", "Toyota", "BYD", "Infiniti", "McLaren", "Renault", "Vauxhall", "Citroen", "Jaguar",
  "Mercedes", "Rolls-Royce", "Volkswagen", "Cupra", "Jeep", "MG", "Seat", "Volvo"
];

const Hero = () => {
  return (
    <Grid container className="hero" style={styles.heroContainer}>
      <Grid item xs={12}>
        <div className="hero__video-container" style={styles.videoContainer}>
          <video src="/video/hero.mp4" autoPlay loop muted style={styles.video} />
          
          {/* Centered text */}
          <div className="hero__text" style={styles.heroTextContainer}>
            <Typography variant="h1" component="h1" style={{ fontFamily: 'Helvetica, Arial, sans-serif', fontWeight: 'bold' }}>
              Driven by Excellence.
            </Typography>
          </div>
          
          {/* Buttons at the bottom */}
          <div className="hero__buttons" style={styles.heroButtonContainer}>
            <Button variant="contained" color="primary" sx={styles.heroButton}>
              Buy a car
            </Button>
            <Button variant="contained" color="primary" sx={styles.heroButton}>
              Sell my car
            </Button>
          </div>
        </div>
      </Grid>
  
      <Grid item xs={12} style={{ textAlign: 'center', marginTop: '5%' }}>
        <Typography variant="h4" component="h2" style={{ fontFamily: 'Helvetica, Arial, sans-serif', color: 'white', fontWeight: 'bold', marginBottom: '1%' }}>
          Explore Our Selection
        </Typography>
        <Typography variant="h6" component="h2" style={{ fontFamily: 'Helvetica, Arial, sans-serif', color: 'white', fontWeight: 'bold', marginBottom: '5%' }}>
          Browse by Type
        </Typography>
        <div style={styles.typeButtonContainer}>
          {carTypes.map((carType, index) => (
            <div key={index} style={styles.typeButton}>
              <img src={`icon/car-type/${carType}.svg`} alt={carType} />
              <p style={styles.typeButtonText}>{carType}</p>
            </div>
          ))}
        </div>

        <Typography variant="h6" component="h2" style={{ fontFamily: 'Helvetica, Arial, sans-serif', color: 'white', fontWeight: 'bold', marginBottom: '2.5%', marginTop: '5%' }}>
          Browse by Manufacturer
        </Typography>
        <div style={{ display: 'flex', justifyContent: 'center' }}>
          <div style={styles.gridContainer}>
            {manufacturers.map((manufacturer, index) => (
              <div key={index} style={styles.manufButton}>
                <div style={{ display: 'flex', alignItems: 'center' }}>
                  <img src={`icon/car-manuf/${manufacturer}.svg`} alt={manufacturer} />
                  <p style={{ marginLeft: '10px' }}>{manufacturer}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </Grid>
    </Grid>
  );
};

export default Hero;