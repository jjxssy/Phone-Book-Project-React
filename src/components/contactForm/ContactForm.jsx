import React, { useState, useEffect, useRef } from 'react';
import { FaImage, FaUpload } from 'react-icons/fa';
import classes from './contactForm.module.css';

/**
 * ContactForm component for adding or editing contacts
 * @param {Object} props - Component props
 * @param {Object} props.initialData - Initial contact data for editing
 * @param {Array} props.groups - Available contact groups
 * @param {Function} props.onSubmit - Function to call on form submission
 * @param {Function} props.onCancel - Function to call on form cancel
 * @returns {JSX.Element} - Rendered component
 */
function ContactForm({ initialData = null, groups = [], onSubmit, onCancel }) {
  // Default form data
  const defaultFormData = {
    name: '',
    phone: '',
    email: '',
    favorite: false,
    tags: [],
    avatar: 'https://randomuser.me/api/portraits/lego/1.jpg' // Default avatar
  };
  
  // State for form data
  const [formData, setFormData] = useState(initialData || defaultFormData);
  const [errors, setErrors] = useState({});
  const [previewUrl, setPreviewUrl] = useState(initialData?.avatar || defaultFormData.avatar);
  
  // Ref for file input
  const fileInputRef = useRef(null);
  
  // Update form data when initialData changes
  useEffect(() => {
    if (initialData) {
      setFormData({
        ...initialData,
        tags: [...(initialData.tags || [])]
      });
      setPreviewUrl(initialData.avatar);
    }
  }, [initialData]);
  
  /**
   * Handle form input changes
   * @param {Event} e - Input change event
   */
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    
    // Handle different input types
    const inputValue = type === 'checkbox' ? checked : value;
    
    setFormData(prev => ({
      ...prev,
      [name]: inputValue
    }));
    
    // Clear error for the field being edited
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };
  
  /**
   * Handle image file selection
   * @param {Event} e - File input change event
   */
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    
    if (file) {
      // Image size validation (max 2MB)
      if (file.size > 2 * 1024 * 1024) {
        setErrors(prev => ({
          ...prev,
          avatar: 'Image size should be less than 2MB'
        }));
        return;
      }
      
      // Check if file is an image
      if (!file.type.match('image.*')) {
        setErrors(prev => ({
          ...prev,
          avatar: 'Please select an image file'
        }));
        return;
      }
      
      // Create object URL for preview
      const fileUrl = URL.createObjectURL(file);
      setPreviewUrl(fileUrl);
      
      // Convert image to base64 for storage
      const reader = new FileReader();
      reader.onloadend = () => {
        setFormData(prev => ({
          ...prev,
          avatar: reader.result
        }));
      };
      reader.readAsDataURL(file);
      
      // Clear any previous errors
      if (errors.avatar) {
        setErrors(prev => ({
          ...prev,
          avatar: ''
        }));
      }
    }
  };
  
  /**
   * Open file dialog when clicking on the avatar
   */
  const handleAvatarClick = () => {
    fileInputRef.current.click();
  };
  
  /**
   * Toggle a group tag selection
   * @param {string} tag - Tag to toggle
   */
  const handleTagToggle = (tag) => {
    setFormData(prev => {
      // If tag is already selected, remove it
      if (prev.tags.includes(tag)) {
        return {
          ...prev,
          tags: prev.tags.filter(t => t !== tag)
        };
      } 
      // Otherwise, add it
      return {
        ...prev,
        tags: [...prev.tags, tag]
      };
    });
  };
  
  /**
   * Validate form data
   * @returns {boolean} - True if form is valid
   */
  const validateForm = () => {
    const newErrors = {};
    
    // Name validation - required
    if (!formData.name.trim()) {
      newErrors.name = 'Name is required';
    }
    
    // Phone validation - required and format check
    if (!formData.phone.trim()) {
      newErrors.phone = 'Phone number is required';
    } else if (!/^\d{3}-\d{7}$/.test(formData.phone)) {
      newErrors.phone = 'Phone should be in format: 050-1234567';
    }
    
    // Email validation - required and format check
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Email is invalid';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };
  
  /**
   * Handle form submission
   * @param {Event} e - Form submission event
   */
  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Validate form data
    if (!validateForm()) {
      return;
    }
    
    // Call onSubmit with form data
    onSubmit(formData);
  };

  return (
    <form onSubmit={handleSubmit} className={classes.contactForm}>
      <div className={classes.avatarSection}>
        <div 
          className={classes.avatarContainer}
          onClick={handleAvatarClick}
        >
          <img 
            src={previewUrl} 
            alt="Contact avatar" 
            className={classes.avatarPreview}
          />
          <div className={classes.avatarOverlay}>
            <FaUpload />
            <span>Upload Image</span>
          </div>
        </div>
        <input
          type="file"
          ref={fileInputRef}
          onChange={handleImageChange}
          accept="image/*"
          className={classes.hiddenFileInput}
        />
        {errors.avatar && <span className={classes.errorText}>{errors.avatar}</span>}
      </div>
      
      <div className={classes.formGroup}>
        <label htmlFor="name">Name</label>
        <input
          type="text"
          id="name"
          name="name"
          value={formData.name}
          onChange={handleChange}
          className={errors.name ? classes.inputError : ''}
          placeholder="Enter name"
        />
        {errors.name && <span className={classes.errorText}>{errors.name}</span>}
      </div>
      
      <div className={classes.formGroup}>
        <label htmlFor="phone">Phone</label>
        <input
          type="text"
          id="phone"
          name="phone"
          value={formData.phone}
          onChange={handleChange}
          className={errors.phone ? classes.inputError : ''}
          placeholder="Format: 050-1234567"
        />
        {errors.phone && <span className={classes.errorText}>{errors.phone}</span>}
      </div>
      
      <div className={classes.formGroup}>
        <label htmlFor="email">Email</label>
        <input
          type="email"
          id="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          className={errors.email ? classes.inputError : ''}
          placeholder="example@example.com"
        />
        {errors.email && <span className={classes.errorText}>{errors.email}</span>}
      </div>
      
      <div className={classes.formGroup}>
        <label className={classes.checkboxLabel}>
          <input
            type="checkbox"
            name="favorite"
            checked={formData.favorite}
            onChange={handleChange}
          />
          <span className={classes.checkboxText}>Mark as favorite</span>
        </label>
      </div>
      
      <div className={classes.formGroup}>
        <label>Groups</label>
        <div className={classes.tagsContainer}>
          {groups.map(tag => (
            <button
              key={tag}
              type="button"
              className={`${classes.tagButton} ${formData.tags.includes(tag) ? classes.tagButtonSelected : ''}`}
              onClick={() => handleTagToggle(tag)}
            >
              {tag}
            </button>
          ))}
        </div>
      </div>
      
      <div className={classes.formActions}>
        <button 
          type="button" 
          className={classes.cancelButton} 
          onClick={onCancel}
        >
          Cancel
        </button>
        <button 
          type="submit" 
          className={classes.submitButton}
        >
          {initialData ? 'Update Contact' : 'Add Contact'}
        </button>
      </div>
    </form>
  );
}

export default ContactForm; 