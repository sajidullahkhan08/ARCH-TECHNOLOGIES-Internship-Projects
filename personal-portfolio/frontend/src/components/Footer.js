import React from 'react';
import './Footer.css';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-content">
          <p>&copy; {new Date().getFullYear()} Personal Portfolio. All rights reserved.</p>
          <p>Built with React, Node.js, Express & MongoDB</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;