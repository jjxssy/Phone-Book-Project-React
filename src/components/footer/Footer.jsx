import React from 'react';
import classes from './footer.module.css';

/**
 * Footer component with copyright information
 * @returns {JSX.Element} - Rendered component
 */
function Footer() {
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className={classes.footer}>
      <div className={classes.footerContainer}>
        <div className={classes.footerContent}>
          <p className={classes.copyright}>
            &copy; {currentYear} Phone Book Application. All rights reserved.
          </p>
          <p className={classes.projectInfo}>
            Created as a React course project
          </p>
          <p className={classes.projectInfo}>
            Made by Yasmin Bits & Samya Bahouth
          </p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
