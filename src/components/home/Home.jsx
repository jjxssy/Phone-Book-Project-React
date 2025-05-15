import React, { useEffect, useState, useRef } from 'react';
import classes from './home.module.css';
import pageClasses from '../../app/page.module.css';
import { FaSearch, FaStar, FaTags, FaSort } from 'react-icons/fa';

/**
 * Home component - displays project description with animation effect
 * @param {Object} props - Component props
 * @param {Object} props.user - User data
 * @returns {JSX.Element} - Rendered component
 */
function Home({ user }) {
  const [isLoaded, setIsLoaded] = useState(false);
  const [welcomeText, setWelcomeText] = useState('');
  const featureRefs = useRef([]);

  // Set up intersection observer for scroll animations
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add(classes.visible);
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.2 }
    );

    // Observe all feature cards
    const featureElements = document.querySelectorAll(`.${classes.featureCard}`);
    featureElements.forEach((el) => {
      observer.observe(el);
    });

    // Cleanup
    return () => {
      featureElements.forEach((el) => {
        observer.unobserve(el);
      });
    };
  }, []);

  // Welcome message animation with modern approach
  useEffect(() => {
    setIsLoaded(true);
    
    const message = `Welcome to Phone Book, ${user.username}!`;
    let currentIndex = 0;
    
    const typeWriter = () => {
      if (currentIndex < message.length) {
        setWelcomeText(message.substring(0, currentIndex + 1));
        currentIndex++;
        setTimeout(typeWriter, 50 + Math.random() * 50); // Variable speed for more natural typing
      }
    };
    
    setTimeout(typeWriter, 500);
  }, [user.username]);

  return (
    <div className={classes.homeContainer}>
      <div className={`${classes.header} ${isLoaded ? classes.animate : ''}`}>
        <h1 className={classes.welcomeTitle}>
          <span className={classes.typingText}>{welcomeText}</span>
          <span className={classes.cursor}></span>
        </h1>
        <p className={classes.role}>You are logged in as: <span>{user.role}</span></p>
      </div>
      
      <section className={`${classes.description} ${isLoaded ? classes.animate : ''}`}>
        <h2>About This Project</h2>
        <p>
          This Phone Book application was developed as part of a web development course project.
          It allows users to manage their contacts efficiently, with features for searching,
          filtering, grouping, and managing favorites.
        </p>
        <p>
          The project is built using React and follows modern web development practices including
          component-based architecture, responsive design, and controlled forms.
        </p>
      </section>
      
      <section className={`${classes.features} ${isLoaded ? classes.animate : ''}`}>
        <h2>Key Features</h2>
        
        <div className={classes.featureCards}>
          <div className={`${classes.featureCard} ${classes.card1}`}>
            <div className={classes.iconContainer}>
              <FaSearch className={classes.icon} />
            </div>
            <h3>Search &amp; Filter</h3>
            <p>
              Easily search for contacts by name, phone, or email. 
              Filter contacts by groups to quickly find who you're looking for.
            </p>
          </div>
          
          <div className={`${classes.featureCard} ${classes.card2}`}>
            <div className={classes.iconContainer}>
              <FaStar className={classes.icon} />
            </div>
            <h3>Favorites</h3>
            <p>
              Mark your most important contacts as favorites for quick access.
              Toggle between all contacts and favorites view.
            </p>
          </div>
          
          <div className={`${classes.featureCard} ${classes.card3}`}>
            <div className={classes.iconContainer}>
              <FaTags className={classes.icon} />
            </div>
            <h3>Groups</h3>
            <p>
              Organize contacts into groups like Family, Friends, Work, etc.
              Each contact can belong to multiple groups.
            </p>
          </div>
          
          <div className={`${classes.featureCard} ${classes.card4}`}>
            <div className={classes.iconContainer}>
              <FaSort className={classes.icon} />
            </div>
            <h3>Sorting</h3>
            <p>
              Sort contacts by name, phone, or email in ascending or descending order.
              Maintain sort order when filtering by groups.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}

export default Home;
