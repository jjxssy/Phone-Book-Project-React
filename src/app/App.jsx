import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { Header, Footer, Navbar } from '../components/';
import { Login } from '../components/login/';
import { Home } from '../components/home/';
import { ContactsPage } from '../components/contactsPage/';
import { GroupedContactsPage } from '../components/groupedContactsPage/';
import { Terms } from '../components/terms/';
import { Privacy } from '../components/privacy/';
import { Help } from '../components/help/';
import { ErrorPage } from '../components/errorPage/';
import classes from './app.module.css';
import pageClasses from './page.module.css';

/**
 * Main App component that handles routing and authentication
 * @returns {JSX.Element} - Rendered component
 */
function App() {
  const [user, setUser] = useState(null);
  
  const handleLogin = (userData) => {
    setUser(userData);
  };
  
  const handleLogout = () => {
    setUser(null);
  };

  // Demo effect for Home page
  useEffect(() => {
    if (user) {
      console.log(`Welcome, ${user.username}! Role: ${user.role}`);
    }
  }, [user]);

  return (
    <Router>
      <div className={classes.appContainer}>
        {user && <Header user={user} onLogout={handleLogout} />}
        {user && <Navbar />}
        
        <main className={classes.mainContent}>
          <Routes>
            {/* Login page - first page shown, can't access other pages without authentication */}
            <Route 
              path="/" 
              element={
                user ? (
                  <Navigate to="/home" replace />
                ) : (
                  <Login onLogin={handleLogin} />
                )
              } 
            />

            {/* Home page - project description page */}
            <Route 
              path="/home" 
              element={
                user ? (
                  <div className={classes.container}>
                    <Home user={user} />
                  </div>
                ) : (
                  <Navigate to="/" replace />
                )
              } 
            />
            
            {/* Contacts page - shows all contacts without groups */}
            <Route 
              path="/contacts" 
              element={
                user ? (
                  <div className={classes.container}>
                    <ContactsPage user={user} />
                  </div>
                ) : (
                  <Navigate to="/" replace />
                )
              } 
            />

            {/* Grouped contacts page - contacts organized by groups */}
            <Route 
              path="/grouped-contacts" 
              element={
                user ? (
                  <div className={classes.container}>
                    <GroupedContactsPage user={user} />
                  </div>
                ) : (
                  <Navigate to="/" replace />
                )
              } 
            />

            <Route path="/terms" element={<Terms />} />
            <Route path="/privacy" element={<Privacy />} />
            <Route path="/help" element={<Help />} />
            
            {/* 404 Error page - shown for all undefined routes */}
            <Route path="*" element={<ErrorPage />} />
          </Routes>
        </main>
        
        {user && <Footer />}
      </div>
    </Router>
  );
}

export default App;
