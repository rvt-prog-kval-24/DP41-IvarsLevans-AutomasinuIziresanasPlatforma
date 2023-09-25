import React from 'react';

const Footer: React.FC = () => {
  return (
    <footer style={{ padding: '20px 0', textAlign: 'center' }}>
      <p>&copy; {new Date().getFullYear()} Drive Wise</p>
    </footer>
  );
};

export default Footer;