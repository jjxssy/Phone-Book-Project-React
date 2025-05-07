import React, { useState } from 'react';
// React Router components for client-side routing
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';

// Layout and shared UI components
import { Header, Footer, Navbar } from '../components/';
// Application-specific pages/components
import { ContactList } from '../components/contactList/';
import { Home } from '../components/home/';
import { Terms } from '../components/terms/';
import { Privacy } from '../components/privacy/';
import { Help } from '../components/help/';

// CSS Modules for styling
import classes from './app.module.css';
import pageClasses from './page.module.css';

/**
 * Main App component that handles routing and authentication state
 * @returns {JSX.Element}
 */
function App() {
  // Authentication state
  const [user, setUser] = useState(null);

  // Called when a user logs in
  const handleLogin = (userData) => {
    setUser(userData);
  };

  // Called when a user logs out
  const handleLogout = () => {
    setUser(null);
  };

  return (
    <Router>
      <div className={pageClasses.page}>
        {/* Header receives current user and logout function */}
        <Header user={user} onLogout={handleLogout} />
        
        {/* Main content area where routed components will appear */}
        <main className={pageClasses.main}>
          <Routes>
            {/* Redirect logged-in users to /contacts; otherwise show Home */}
            <Route 
              path="/" 
              element={
                user ? (
                  <Navigate to="/contacts" replace />
                ) : (
                  <Home onLogin={handleLogin} />
                )
              } 
            />

            {/* "/home" is an alias for the root route */}
            <Route 
              path="/home" 
              element={
                user ? (
                  <Navigate to="/contacts" replace />
                ) : (
                  <Home onLogin={handleLogin} />
                )
              } 
            />
            
            {/* Only show ContactList if user is logged in */}
            <Route 
              path="/contacts" 
              element={
                user ? (
                  <div className={pageClasses.container}>
                    <ContactList />
                  </div>
                ) : (
                  <Navigate to="/" replace />
                )
              } 
            />

            {/* Public static informational pages */}
            <Route path="/terms" element={<Terms />} />
            <Route path="/privacy" element={<Privacy />} />
            <Route path="/help" element={<Help />} />
          </Routes>
        </main>

        {/* Footer is always visible */}
        <Footer />
      </div>
    </Router>
  );
}

export default App;
