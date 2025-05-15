import React, { useEffect, useState } from 'react';
import { createPortal } from 'react-dom';
import { FaTimes } from 'react-icons/fa';
import classes from './modal.module.css';

/**
 * Modal component for displaying content in a popup
 * @param {Object} props - Component props
 * @param {boolean} props.isOpen - Whether the modal is open
 * @param {Function} props.onClose - Function to call on close
 * @param {string} props.title - Modal title
 * @param {ReactNode} props.children - Modal content
 * @returns {JSX.Element|null} - Rendered component or null if closed
 */
function Modal({ isOpen, onClose, title, children }) {
  const [isClosing, setIsClosing] = useState(false);
  // Close modal on escape key
  useEffect(() => {
    const handleEsc = (e) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };
    
    if (isOpen) {
      document.addEventListener('keydown', handleEsc);
      // Prevent scrolling on the body when modal is open
      document.body.style.overflow = 'hidden';
    }
    
    return () => {
      document.removeEventListener('keydown', handleEsc);
      // Re-enable scrolling when modal is closed
      document.body.style.overflow = 'auto';
    };
  }, [isOpen, onClose]);

  // Handle backdrop click
  const handleBackdropClick = (e) => {
    if (e.target === e.currentTarget) {
      handleClose();
    }
  };

  // Handle closing with animation
  const handleClose = () => {
    setIsClosing(true);
    setTimeout(() => {
      setIsClosing(false);
      onClose();
    }, 400); // Match the animation duration
  };

  // Don't render anything if modal is not open and not closing
  if (!isOpen && !isClosing) return null;

  return createPortal(
    <div className={`${classes.modalBackdrop} ${isClosing ? classes.backdropClosing : ''}`} onClick={handleBackdropClick}>
      <div className={`${classes.modalContent} ${isClosing ? classes.modalClosing : ''}`} aria-modal="true" role="dialog">
        <div className={classes.modalHeader}>
          <h2 className={classes.modalTitle}>{title}</h2>
          <button 
            className={classes.closeButton} 
            onClick={handleClose}
            aria-label="Close modal"
          >
            <FaTimes />
          </button>
        </div>
        <div className={classes.modalBody}>
          {children}
        </div>
      </div>
    </div>,
    document.body
  );
}

export default Modal; 