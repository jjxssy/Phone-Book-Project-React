import React from 'react';
import { Link } from 'react-router-dom';
import { FaExclamationTriangle, FaHome, FaArrowLeft } from 'react-icons/fa';
import classes from './errorPage.module.css';

/**
 * Error 404 page component
 * @returns {JSX.Element} - Rendered component
 */
function ErrorPage() {
  return (
    <div className={classes.errorPageContainer}>
      <div className={classes.errorContent}>
        <div className={classes.iconContainer}>
          <FaExclamationTriangle className={classes.errorIcon} />
        </div>
        
        <h1 className={classes.errorTitle}>404</h1>
        <h2 className={classes.errorSubtitle}>Page Not Found</h2>
        
        <p className={classes.errorMessage}>
          Oops! The page you are looking for doesn't exist or has been moved.
        </p>
        
        <div className={classes.actionButtons}>
          <Link to="/" className={classes.homeButton}>
            <FaHome /> Go to Home
          </Link>
          <button 
            onClick={() => window.history.back()} 
            className={classes.backButton}
          >
            <FaArrowLeft /> Go Back
          </button>
        </div>
      </div>
    </div>
  );
}

export default ErrorPage; 