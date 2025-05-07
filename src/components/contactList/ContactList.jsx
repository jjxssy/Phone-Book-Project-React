import React, { useState } from 'react';
import { Contact } from '../contacts/';
import { contacts as contactsData } from '../contacts/contacts';
import classes from './contactList.module.css';

/**
 * ContactList component for displaying a list of contacts
 * @returns {JSX.Element} - Rendered component
 */
const ContactList = () => {
  const [contacts, setContacts] = useState(contactsData);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterTag, setFilterTag] = useState('');
  const [selectedContact, setSelectedContact] = useState(null);
  const [showInfoModal, setShowInfoModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showNewContactModal, setShowNewContactModal] = useState(false);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [editFormData, setEditFormData] = useState({
    name: '',
    phone: '',
    email: '',
    favorite: false,
    tags: []
  });
  
  // Get all unique tags from contacts
  const allTags = [...new Set(contacts.flatMap(contact => contact.tags || []))];
  
  // Filter contacts based on search term and tag filter
  const filteredContacts = contacts.filter(contact => {
    const matchesSearch = contact.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                         contact.phone.includes(searchTerm) ||
                         contact.email.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesTag = filterTag === '' || (contact.tags && contact.tags.includes(filterTag));
    
    return matchesSearch && matchesTag;
  });

  /**
   * Displays the info modal for a selected contact
   * @param {Object} contact - The contact to display info for
   */
  const handleViewInfo = (contact) => {
    setSelectedContact(contact);
    setShowInfoModal(true);
  };

  /**
   * Closes the info modal
   */
  const handleCloseInfoModal = () => {
    setShowInfoModal(false);
  };

  /**
   * Opens edit modal and populates form with contact data
   * @param {Object} contact - The contact to edit
   */
  const handleEdit = (contact) => {
    setSelectedContact(contact);
    setEditFormData({
      name: contact.name,
      phone: contact.phone,
      email: contact.email,
      favorite: contact.favorite,
      tags: [...(contact.tags || [])]
    });
    setShowEditModal(true);
  };

  /**
   * Closes the edit modal and resets delete confirmation
   */
  const handleCloseEditModal = () => {
    setShowEditModal(false);
    setShowDeleteConfirm(false);
  };

  /**
   * Handles changes in the edit form inputs
   * @param {Event} e - The change event
   */
  const handleEditFormChange = (e) => {
    const { name, value, type, checked } = e.target;
    
    if (type === 'checkbox') {
      setEditFormData({
        ...editFormData,
        [name]: checked
      });
    } else {
      setEditFormData({
        ...editFormData,
        [name]: value
      });
    }
  };

  /**
   * Toggles a tag in the edit form
   * @param {string} tag - The tag to toggle
   */
  const handleTagToggle = (tag) => {
    const updatedTags = editFormData.tags.includes(tag)
      ? editFormData.tags.filter(t => t !== tag)
      : [...editFormData.tags, tag];
    
    setEditFormData({
      ...editFormData,
      tags: updatedTags
    });
  };

  /**
   * Saves the edited contact
   * @param {Event} e - The form submit event
   */
  const handleSaveEdit = (e) => {
    e.preventDefault();
    
    if (!selectedContact) return;
    
    const updatedContacts = contacts.map(contact => {
      if (contact.id === selectedContact.id) {
        return {
          ...contact,
          name: editFormData.name,
          phone: editFormData.phone,
          email: editFormData.email,
          favorite: editFormData.favorite,
          tags: editFormData.tags
        };
      }
      return contact;
    });
    
    setContacts(updatedContacts);
    setShowEditModal(false);
  };

  /**
   * Opens the new contact modal with empty form
   */
  const handleAddNewContact = () => {
    // Reset form data for new contact
    setEditFormData({
      name: '',
      phone: '',
      email: '',
      favorite: false,
      tags: []
    });
    setSelectedContact(null);
    setShowNewContactModal(true);
  };

  /**
   * Closes the new contact modal
   */
  const handleCloseNewContactModal = () => {
    setShowNewContactModal(false);
  };

  /**
   * Saves a new contact
   * @param {Event} e - The form submit event
   */
  const handleSaveNewContact = (e) => {
    e.preventDefault();
    
    // Simple validation
    if (!editFormData.name || !editFormData.phone || !editFormData.email) {
      return; // Could add error handling here
    }
    
    // Create new contact with unique ID
    const newContact = {
      id: Date.now(), // Simple way to generate unique ID
      name: editFormData.name,
      phone: editFormData.phone,
      email: editFormData.email,
      favorite: editFormData.favorite,
      tags: editFormData.tags,
      avatar: `https://randomuser.me/api/portraits/${Math.random() > 0.5 ? 'men' : 'women'}/${Math.floor(Math.random() * 99) + 1}.jpg`
    };
    
    // Add to contacts list
    setContacts([...contacts, newContact]);
    setShowNewContactModal(false);
  };

  /**
   * Deletes the selected contact
   */
  const handleDeleteContact = () => {
    if (!selectedContact) return;
    
    // Filter out the selected contact
    const updatedContacts = contacts.filter(contact => contact.id !== selectedContact.id);
    setContacts(updatedContacts);
    setShowEditModal(false);
    setShowDeleteConfirm(false);
  };

  /**
   * Toggles the delete confirmation dialog
   */
  const toggleDeleteConfirm = () => {
    setShowDeleteConfirm(!showDeleteConfirm);
  };

  return (
    <div className={classes.contactListContainer}>
      <div className={classes.contactListHeader}>
        <div className={classes.headerTop}>
          <h2>My Contacts</h2>
          <button 
            className={classes.addButton}
            onClick={handleAddNewContact}
          >
            <span>+</span> New Contact
          </button>
        </div>
        
        <div className={classes.searchBar}>
          <input 
            type="text"
            placeholder="Search contacts..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className={classes.searchInput}
          />
        </div>
        
        {allTags.length > 0 && (
          <div className={classes.tagFilters}>
            <button 
              className={`${classes.tagFilter} ${filterTag === '' ? classes.active : ''}`}
              onClick={() => setFilterTag('')}
            >
              All
            </button>
            {allTags.map((tag, index) => (
              <button 
                key={index}
                className={`${classes.tagFilter} ${filterTag === tag ? classes.active : ''}`}
                onClick={() => setFilterTag(tag)}
              >
                {tag}
              </button>
            ))}
          </div>
        )}
      </div>
      
      <div className={classes.contactList}>
        {filteredContacts.length > 0 ? (
          filteredContacts.map(contact => (
            <Contact 
              key={contact.id} 
              contact={contact} 
              onViewInfo={handleViewInfo}
              onEdit={handleEdit}
            />
          ))
        ) : (
          <div className={classes.noContacts}>
            <p>No contacts found</p>
          </div>
        )}
      </div>

      {/* Info Modal */}
      {showInfoModal && selectedContact && (
        <div className={classes.modalOverlay} onClick={handleCloseInfoModal}>
          <div className={classes.modal} onClick={e => e.stopPropagation()}>
            <button className={classes.closeButton} onClick={handleCloseInfoModal}>×</button>
            <div className={classes.modalContent}>
              <div className={classes.modalHeader}>
                <img 
                  src={selectedContact.avatar} 
                  alt={`${selectedContact.name}'s avatar`}
                  className={classes.modalAvatar} 
                />
                <h3>{selectedContact.name}</h3>
                {selectedContact.favorite && <span className={classes.modalFavorite}>★ Favorite</span>}
              </div>
              
              <div className={classes.modalDetails}>
                <div className={classes.modalDetailRow}>
                  <span className={classes.modalDetailIcon}>📱</span>
                  <div>
                    <h4>Phone</h4>
                    <p>{selectedContact.phone}</p>
                  </div>
                </div>
                
                <div className={classes.modalDetailRow}>
                  <span className={classes.modalDetailIcon}>✉️</span>
                  <div>
                    <h4>Email</h4>
                    <p>{selectedContact.email}</p>
                  </div>
                </div>
                
                {selectedContact.tags && selectedContact.tags.length > 0 && (
                  <div className={classes.modalDetailRow}>
                    <span className={classes.modalDetailIcon}>🏷️</span>
                    <div>
                      <h4>Tags</h4>
                      <div className={classes.modalTags}>
                        {selectedContact.tags.map((tag, index) => (
                          <span key={index} className={classes.modalTag}>{tag}</span>
                        ))}
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Edit Modal */}
      {showEditModal && selectedContact && (
        <div className={classes.modalOverlay} onClick={handleCloseEditModal}>
          <div className={`${classes.modal} ${classes.editModal}`} onClick={e => e.stopPropagation()}>
            <button className={classes.closeButton} onClick={handleCloseEditModal}>×</button>
            <div className={classes.modalContent}>
              <h3 className={classes.editModalTitle}>Edit Contact</h3>
              
              {showDeleteConfirm ? (
                <div className={classes.deleteConfirmation}>
                  <p>Are you sure you want to delete this contact?</p>
                  <div className={classes.deleteActions}>
                    <button 
                      className={classes.cancelDeleteButton}
                      onClick={toggleDeleteConfirm}
                    >
                      Cancel
                    </button>
                    <button 
                      className={classes.confirmDeleteButton}
                      onClick={handleDeleteContact}
                    >
                      Delete
                    </button>
                  </div>
                </div>
              ) : (
                <form onSubmit={handleSaveEdit} className={classes.editForm}>
                  <div className={classes.formGroup}>
                    <label htmlFor="name">Name</label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={editFormData.name}
                      onChange={handleEditFormChange}
                      required
                    />
                  </div>
                  
                  <div className={classes.formGroup}>
                    <label htmlFor="phone">Phone</label>
                    <input
                      type="text"
                      id="phone"
                      name="phone"
                      value={editFormData.phone}
                      onChange={handleEditFormChange}
                      required
                    />
                  </div>
                  
                  <div className={classes.formGroup}>
                    <label htmlFor="email">Email</label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={editFormData.email}
                      onChange={handleEditFormChange}
                      required
                    />
                  </div>
                  
                  <div className={classes.formGroup}>
                    <div className={classes.checkboxGroup}>
                      <input
                        type="checkbox"
                        id="favorite"
                        name="favorite"
                        checked={editFormData.favorite}
                        onChange={handleEditFormChange}
                      />
                      <label htmlFor="favorite">Mark as favorite</label>
                    </div>
                  </div>
                  
                  <div className={classes.formGroup}>
                    <label>Tags</label>
                    <div className={classes.tagOptions}>
                      {allTags.map((tag, index) => (
                        <div 
                          key={index} 
                          className={`${classes.tagOption} ${editFormData.tags.includes(tag) ? classes.tagSelected : ''}`}
                          onClick={() => handleTagToggle(tag)}
                        >
                          {tag}
                        </div>
                      ))}
                    </div>
                  </div>
                  
                  <div className={classes.formActions}>
                    <button 
                      type="button" 
                      className={classes.deleteButton}
                      onClick={toggleDeleteConfirm}
                    >
                      Delete
                    </button>
                    <div>
                      <button 
                        type="button" 
                        className={classes.cancelButton}
                        onClick={handleCloseEditModal}
                      >
                        Cancel
                      </button>
                      <button 
                        type="submit" 
                        className={classes.saveButton}
                      >
                        Save Changes
                      </button>
                    </div>
                  </div>
                </form>
              )}
            </div>
          </div>
        </div>
      )}

      {/* New Contact Modal */}
      {showNewContactModal && (
        <div className={classes.modalOverlay} onClick={handleCloseNewContactModal}>
          <div className={`${classes.modal} ${classes.editModal}`} onClick={e => e.stopPropagation()}>
            <button className={classes.closeButton} onClick={handleCloseNewContactModal}>×</button>
            <div className={classes.modalContent}>
              <h3 className={classes.editModalTitle}>Add New Contact</h3>
              
              <form onSubmit={handleSaveNewContact} className={classes.editForm}>
                <div className={classes.formGroup}>
                  <label htmlFor="newName">Name</label>
                  <input
                    type="text"
                    id="newName"
                    name="name"
                    value={editFormData.name}
                    onChange={handleEditFormChange}
                    required
                  />
                </div>
                
                <div className={classes.formGroup}>
                  <label htmlFor="newPhone">Phone</label>
                  <input
                    type="text"
                    id="newPhone"
                    name="phone"
                    value={editFormData.phone}
                    onChange={handleEditFormChange}
                    required
                  />
                </div>
                
                <div className={classes.formGroup}>
                  <label htmlFor="newEmail">Email</label>
                  <input
                    type="email"
                    id="newEmail"
                    name="email"
                    value={editFormData.email}
                    onChange={handleEditFormChange}
                    required
                  />
                </div>
                
                <div className={classes.formGroup}>
                  <div className={classes.checkboxGroup}>
                    <input
                      type="checkbox"
                      id="newFavorite"
                      name="favorite"
                      checked={editFormData.favorite}
                      onChange={handleEditFormChange}
                    />
                    <label htmlFor="newFavorite">Mark as favorite</label>
                  </div>
                </div>
                
                <div className={classes.formGroup}>
                  <label>Tags</label>
                  <div className={classes.tagOptions}>
                    {allTags.map((tag, index) => (
                      <div 
                        key={index} 
                        className={`${classes.tagOption} ${editFormData.tags.includes(tag) ? classes.tagSelected : ''}`}
                        onClick={() => handleTagToggle(tag)}
                      >
                        {tag}
                      </div>
                    ))}
                  </div>
                </div>
                
                <div className={classes.formActions}>
                  <button 
                    type="button" 
                    className={classes.cancelButton}
                    onClick={handleCloseNewContactModal}
                  >
                    Cancel
                  </button>
                  <button 
                    type="submit" 
                    className={classes.saveButton}
                  >
                    Add Contact
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ContactList;
