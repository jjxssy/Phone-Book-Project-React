import React from 'react';
import classes from './home.module.css';
import pageClasses from '../../app/page.module.css';
import LoginForm from './LoginForm'; // ✅ Add this import

function Home({ onLogin }) {
  return (
    <div className={classes.homeContainer}>
      <div className={classes.contentWrapper}>
        <div className={classes.leftPanel}>
          <h1>Phone Book App</h1>
          <p className={classes.tagline}>
            Manage your contacts with ease
          </p>
          <div className={classes.features}>
            <div className={classes.feature}>
              <span className={classes.featureIcon}>📱</span>
              <div>
                <h3>Store Contacts</h3>
                <p>Keep all your important contacts in one place</p>
              </div>
            </div>
            <div className={classes.feature}>
              <span className={classes.featureIcon}>🔍</span>
              <div>
                <h3>Easy Search</h3>
                <p>Find contacts quickly with powerful search</p>
              </div>
            </div>
            <div className={classes.feature}>
              <span className={classes.featureIcon}>🏷️</span>
              <div>
                <h3>Tag & Categorize</h3>
                <p>Organize contacts with custom tags</p>
              </div>
            </div>
          </div>
        </div>

        <div className={classes.rightPanel}>
          <div className={classes.loginCard}>
            <LoginForm onLogin={onLogin} /> {/* ✅ Replace the form with the component */}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Home;
