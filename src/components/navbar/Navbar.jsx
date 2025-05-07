import React from 'react';
import { Link } from 'react-router-dom';
import classes from './navbar.module.css';
const Navbar = () => {
  return (
    <nav className={classes.navbar}>
      <div className={classes.container}>
        <Link to="/" className={classes.logo}>
          Phone Book
        </Link>
        <div className={classes.links}>
          <Link to="/terms" className={classes.link}>Terms</Link>
          <Link to="/privacy" className={classes.link}>Privacy</Link>
          <Link to="/help" className={classes.link}>Help</Link>
        </div>
      </div>
    </nav>
  );
};
export default Navbar;