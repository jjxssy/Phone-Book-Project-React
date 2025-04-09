import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { Header, Footer, Navbar } from '../components/';
import { ContactList } from '../components/contactList/';
import { Home } from '../components/home/';
import { Terms } from '../components/terms/';
import { Privacy } from '../components/privacy/';
import { Help } from '../components/help/';
import classes from './app.module.css';
import pageClasses from './page.module.css';

function App() {
  const [user, setUser] = useState(null);
  
  const handleLogin = (userData) => {
    setUser(userData);
  };
  
  const handleLogout = () => {
    setUser(null);
  };

  return (
    <Router>
      <div className={pageClasses.page}>
        <Header user={user} onLogout={handleLogout} />
        
        <main className={pageClasses.main}>
          <Routes>
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

            <Route path="/terms" element={<Terms />} />
            <Route path="/privacy" element={<Privacy />} />
            <Route path="/help" element={<Help />} />
          </Routes>
        </main>
        
        <Footer />
      </div>
    </Router>
  );
}

export default App;
