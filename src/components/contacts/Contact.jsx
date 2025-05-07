import React, { useState } from 'react';
import classes from './contact.module.css';

/**
 * Contact component for displaying individual contact information
 * @param {Object} props - Component props
 * @param {Object} props.contact - Contact data object containing name, phone, email, avatar, and tags
 * @param {Function} props.onViewInfo - Callback function for viewing detailed contact information
 * @param {Function} props.onEdit - Callback function for editing contact
 * @returns {JSX.Element} - Rendered contact card component
 */
const Contact = ({ contact, onViewInfo, onEdit }) => {
  // State to track if the contact card is expanded
  const [expanded, setExpanded] = useState(false);
  
  // Toggle the expanded state of the contact card
  const toggleExpand = () => {
    setExpanded(!expanded);
  };

  // Handle click on view info button, preventing event propagation
  const handleViewInfo = (e) => {
    e.stopPropagation();
    if (onViewInfo) {
      onViewInfo(contact);
    }
  };
  
  // Handle click on edit button, preventing event propagation
  const handleEdit = (e) => {
    e.stopPropagation();
    if (onEdit) {
      onEdit(contact);
    }
  };

  return (
    // Main contact card container with dynamic expansion class
    <div className={`${classes.contact} ${expanded ? classes.expanded : ''}`}>
      {/* Contact header section with avatar and basic info */}
      <div className={classes.contactHeader} onClick={toggleExpand}>
        {/* Avatar section with optional favorite star */}
        <div className={classes.avatarContainer}>
          <img 
            src={contact.avatar} 
            alt={`${contact.name}'s avatar`} 
            className={classes.avatar} 
          />
          {/* Render star icon if contact is marked as favorite */}
          {contact.favorite && <span className={classes.favorite}>★</span>}
        </div>
        
        {/* Basic contact information display */}
        <div className={classes.contactInfo}>
          <h3 className={classes.name}>{contact.name}</h3>
          <p className={classes.phone}>{contact.phone}</p>
        </div>
        
        {/* Expand/collapse button */}
        <button 
          className={classes.expandButton}
          aria-label={expanded ? "Collapse contact" : "Expand contact"}
        >
          ▼
        </button>
      </div>
      
      {/* Expandable details section */}
      <div className={classes.contactDetails}>
        {/* Email information row */}
        <div className={classes.detailRow}>
          <span className={classes.detailLabel}>Email:</span>
          <a href={`mailto:${contact.email}`} className={classes.detailValue}>
            {contact.email}
          </a>
        </div>
        
        {/* Tags section - only rendered if tags exist */}
        {contact.tags && contact.tags.length > 0 && (
          <div className={classes.tags}>
            {contact.tags.map((tag, index) => (
              <span key={index} className={classes.tag}>
                {tag}
              </span>
            ))}
          </div>
        )}
        
        {/* Action buttons section */}
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
