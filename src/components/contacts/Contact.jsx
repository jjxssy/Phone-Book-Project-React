import React, { useState } from 'react';
import classes from './contact.module.css';

/**
 * Contact component for displaying individual contact information
 * @param {Object} props - Component props
 * @param {Object} props.contact - Contact data object
 * @param {Function} props.onViewInfo - Function to handle viewing contact info
 * @param {Function} props.onEdit - Function to handle editing contact
 * @returns {JSX.Element} - Rendered component
 */
const Contact = ({ contact, onViewInfo, onEdit }) => {
  const [expanded, setExpanded] = useState(false);
  
  const toggleExpand = () => {
    setExpanded(!expanded);
  };

  const handleViewInfo = (e) => {
    e.stopPropagation();
    if (onViewInfo) {
      onViewInfo(contact);
    }
  };
  
  const handleEdit = (e) => {
    e.stopPropagation();
    if (onEdit) {
      onEdit(contact);
    }
  };

  return (
    <div className={`${classes.contact} ${expanded ? classes.expanded : ''}`}>
      <div className={classes.contactHeader} onClick={toggleExpand}>
        <div className={classes.avatarContainer}>
          <img 
            src={contact.avatar} 
            alt={`${contact.name}'s avatar`} 
            className={classes.avatar} 
          />
          {contact.favorite && <span className={classes.favorite}>★</span>}
        </div>
        
        <div className={classes.contactInfo}>
          <h3 className={classes.name}>{contact.name}</h3>
          <p className={classes.phone}>{contact.phone}</p>
        </div>
        
        <button 
          className={classes.expandButton}
          aria-label={expanded ? "Collapse contact" : "Expand contact"}
        >
          ▼
        </button>
      </div>
      
      <div className={classes.contactDetails}>
        <div className={classes.detailRow}>
          <span className={classes.detailLabel}>Email:</span>
          <a href={`mailto:${contact.email}`} className={classes.detailValue}>
            {contact.email}
          </a>
        </div>
        
        {contact.tags && contact.tags.length > 0 && (
          <div className={classes.tags}>
            {contact.tags.map((tag, index) => (
              <span key={index} className={classes.tag}>
                {tag}
              </span>
            ))}
          </div>
        )}
        
        <div className={classes.actions}>
          <button 
            className={classes.actionButton}
            onClick={handleViewInfo}
          >
            <span role="img" aria-label="Info">ℹ️</span> Info
          </button>
          <button 
            className={classes.actionButton}
            onClick={handleEdit}
          >
            <span role="img" aria-label="Edit">✏️</span> Edit
          </button>
        </div>
      </div>
    </div>
  );
};

export default Contact;
