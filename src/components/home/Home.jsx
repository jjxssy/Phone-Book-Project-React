// Import necessary dependencies and styles
import React from 'react';
import classes from './home.module.css';
import pageClasses from '../../app/page.module.css';
import LoginForm from './LoginForm';

// Home component that serves as the landing page
// @param {function} onLogin - Callback function to handle user login
function Home({ onLogin }) {
  return (
    // Main container for the home page
    <div className={classes.homeContainer}>
      // Wrapper for content alignment
      <div className={classes.contentWrapper}>
        // Left panel containing app information and features
        <div className={classes.leftPanel}>
          // App title
          <h1>Phone Book App</h1>
          // App tagline
          <p className={classes.tagline}>
            Manage your contacts with ease
          </p>
          // Features section containing key app capabilities
          <div className={classes.features}>
            // Store Contacts feature
            <div className={classes.feature}>
              <span className={classes.featureIcon}>📱</span>
              <div>
                <h3>Store Contacts</h3>
                <p>Keep all your important contacts in one place</p>
              </div>
            </div>
            // Search feature
            <div className={classes.feature}>
              <span className={classes.featureIcon}>🔍</span>
              <div>
                <h3>Easy Search</h3>
                <p>Find contacts quickly with powerful search</p>
              </div>
            </div>
            // Categorization feature
            <div className={classes.feature}>
              <span className={classes.featureIcon}>🏷️</span>
              <div>
                <h3>Tag & Categorize</h3>
                <p>Organize contacts with custom tags</p>
              </div>
            </div>
          </div>
        </div>

        // Right panel containing the login form
        <div className={classes.rightPanel}>
          <div className={classes.loginCard}>
            // Login form component with login callback
            <LoginForm onLogin={onLogin} />
          </div>
        </div>
      </div>
    </div>
  );
}

// Export the Home component as the default export
export default Home;
