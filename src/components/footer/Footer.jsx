import React from 'react';
import { Link } from 'react-router-dom';
import classes from './footer.module.css';

/**
 * Footer component
 * @returns {JSX.Element} - Rendered component
 */
function Footer() {
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className={classes.footer}>
      <div className={classes.container}>
        <div className={classes.copyright}>
          <p>&copy; {currentYear} Phone Book App. All rights reserved.</p>
        </div>
        <div className={classes.links}>
          <Link to="/terms" className={classes.link}>Terms</Link>
          <Link to="/privacy" className={classes.link}>Privacy</Link>
          <Link to="/help" className={classes.link}>Help</Link>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
