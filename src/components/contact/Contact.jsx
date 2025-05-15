import React from 'react';
import { FaStar, FaRegStar, FaEdit, FaTrash, FaEnvelope, FaPhone, FaTag } from 'react-icons/fa';
import classes from './contact.module.css';

/**
 * Contact component for displaying a single contact
 * @param {Object} props - Component props
 * @param {Object} props.contact - Contact data
 * @param {boolean} props.isCompact - Whether to show compact view
 * @param {boolean} props.isAdmin - Whether the user is an admin
 * @param {Function} props.onEdit - Function to call on edit
 * @param {Function} props.onDelete - Function to call on delete
 * @param {Function} props.onToggleFavorite - Function to call on favorite toggle
 * @returns {JSX.Element} - Rendered component
 */
function Contact({ 
  contact, 
  isCompact = false, 
  isAdmin = false, 
  onEdit, 
  onDelete, 
  onToggleFavorite 
}) {
  // Determine card class based on compact mode
  const cardClass = isCompact 
    ? `${classes.contactCard} ${classes.compactCard}` 
    : classes.contactCard;

  return (
    <div className={cardClass}>
      {/* Avatar and Favorite Icon */}
      <div className={classes.avatarContainer}>
        <img 
          src={contact.avatar} 
          alt={`${contact.name} avatar`} 
          className={classes.avatar}
        />
        <button 
          className={classes.favoriteButton}
          onClick={() => onToggleFavorite(contact.id)}
          aria-label={contact.favorite ? "Remove from favorites" : "Add to favorites"}
        >
          {contact.favorite ? (
            <FaStar className={classes.starIcon} />
          ) : (
            <FaRegStar className={classes.starIcon} />
          )}
        </button>
      </div>

      {/* Contact Info */}
      <div className={classes.contactInfo}>
        <h3 className={classes.contactName}>{contact.name}</h3>
        
        <div className={classes.contactDetail}>
          <FaPhone className={classes.contactIcon} />
          <span>{contact.phone}</span>
        </div>
        
        {/* Only show email in full view */}
        {!isCompact && (
          <div className={classes.contactDetail}>
            <FaEnvelope className={classes.contactIcon} />
            <span>{contact.email}</span>
          </div>
        )}
        
        {/* Only show tags in full view */}
        {!isCompact && contact.tags && contact.tags.length > 0 && (
          <div className={classes.tagsContainer}>
            <FaTag className={classes.contactIcon} />
            <div className={classes.tags}>
              {contact.tags.map(tag => (
                <span key={tag} className={classes.tag}>{tag}</span>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Admin Actions */}
      {isAdmin && (
        <div className={classes.actions}>
          <button 
            className={classes.editButton}
            onClick={() => onEdit(contact)}
            aria-label="Edit contact"
          >
            <FaEdit />
          </button>
          <button 
            className={classes.deleteButton}
            onClick={() => onDelete(contact.id)}
            aria-label="Delete contact"
          >
            <FaTrash />
          </button>
        </div>
      )}
    </div>
  );
}

export default Contact; 