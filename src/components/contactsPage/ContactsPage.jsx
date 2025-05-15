import React, { useState, useEffect } from 'react';
import { FaSort, FaSortUp, FaSortDown, FaPlus, FaTrashAlt } from 'react-icons/fa';
import { Contact } from '../contact';
import { Modal } from '../modal';
import { ContactForm } from '../contactForm';
import { fetchContacts, fetchGroups } from '../../services/contactService';
import classes from './contactsPage.module.css';

/**
 * ContactsPage component for displaying contacts without grouping
 * @param {Object} props - Component props
 * @param {Object} props.user - User information
 * @returns {JSX.Element} - Rendered component
 */
function ContactsPage({ user }) {
  // State for contacts and UI
  const [contacts, setContacts] = useState([]);
  const [groups, setGroups] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  // Filter states
  const [searchTerm, setSearchTerm] = useState('');
  const [showFavorites, setShowFavorites] = useState(false);
  const [compactView, setCompactView] = useState(false);
  
  // Sorting states
  const [sortField, setSortField] = useState('name');
  const [sortDirection, setSortDirection] = useState('asc');
  
  // Modal states
  const [showAddModal, setShowAddModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showClearModal, setShowClearModal] = useState(false);
  const [selectedContact, setSelectedContact] = useState(null);
  
  // Fetch contacts and groups on mount
  useEffect(() => {
    const getContacts = async () => {
      try {
        setLoading(true);
        const contactsData = await fetchContacts();
        const groupsData = await fetchGroups();
        
        setContacts(contactsData);
        setGroups(groupsData);
        setError(null);
      } catch (err) {
        setError('Failed to load contacts. Please try again.');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    
    getContacts();
  }, []);
  
  // Apply filters and sorting to contacts
  const filteredAndSortedContacts = contacts
    // Apply search filter
    .filter(contact => {
      const matchesSearch = 
        contact.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        contact.phone.includes(searchTerm) ||
        contact.email.toLowerCase().includes(searchTerm.toLowerCase());
      
      return matchesSearch && (showFavorites ? contact.favorite : true);
    })
    // Apply sorting
    .sort((a, b) => {
      let comparison = 0;
      
      if (sortField === 'name') {
        comparison = a.name.localeCompare(b.name);
      } else if (sortField === 'phone') {
        comparison = a.phone.localeCompare(b.phone);
      } else if (sortField === 'email') {
        comparison = a.email.localeCompare(b.email);
      }
      
      return sortDirection === 'asc' ? comparison : -comparison;
    });
  
  /**
   * Handle toggling the sort direction for a field
   * @param {string} field - Field to sort by
   */
  const handleSort = (field) => {
    if (sortField === field) {
      // Toggle direction if same field
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      // Set new field and default to ascending
      setSortField(field);
      setSortDirection('asc');
    }
  };
  
  /**
   * Get sort icon for a field
   * @param {string} field - Field to get icon for
   * @returns {JSX.Element} - Sort icon
   */
  const getSortIcon = (field) => {
    if (sortField !== field) {
      return <FaSort className={classes.sortIcon} />;
    }
    return sortDirection === 'asc' ? (
      <FaSortUp className={classes.sortIcon} />
    ) : (
      <FaSortDown className={classes.sortIcon} />
    );
  };
  
  /**
   * Handle toggling the favorite status of a contact
   * @param {number} contactId - ID of contact to toggle
   */
  const handleToggleFavorite = (contactId) => {
    setContacts(prevContacts => 
      prevContacts.map(contact => 
        contact.id === contactId 
          ? { ...contact, favorite: !contact.favorite } 
          : contact
      )
    );
  };
  
  /**
   * Handle adding a new contact
   * @param {Object} contactData - New contact data
   */
  const handleAddContact = (contactData) => {
    const newContact = {
      ...contactData,
      id: Date.now(), // Simple way to generate a unique ID
      // Only generate random avatar if one wasn't uploaded
      avatar: contactData.avatar || `https://randomuser.me/api/portraits/${Math.random() > 0.5 ? 'men' : 'women'}/${Math.floor(Math.random() * 99) + 1}.jpg`
    };
    
    setContacts(prevContacts => [...prevContacts, newContact]);
    setShowAddModal(false);
  };
  
  /**
   * Handle editing a contact
   * @param {Object} contactData - Updated contact data
   */
  const handleEditContact = (contactData) => {
    setContacts(prevContacts => 
      prevContacts.map(contact => 
        contact.id === contactData.id 
          ? { ...contact, ...contactData } 
          : contact
      )
    );
    setShowEditModal(false);
  };
  
  /**
   * Handle deleting a contact
   */
  const handleDeleteContact = () => {
    if (!selectedContact) return;
    
    setContacts(prevContacts => 
      prevContacts.filter(contact => contact.id !== selectedContact.id)
    );
    setShowDeleteModal(false);
  };
  
  /**
   * Handle clearing all contacts
   */
  const handleClearContacts = () => {
    setContacts([]);
    setShowClearModal(false);
  };
  
  // Open edit modal for a contact
  const openEditModal = (contact) => {
    setSelectedContact(contact);
    setShowEditModal(true);
  };
  
  // Open delete modal for a contact
  const openDeleteModal = (contactId) => {
    const contact = contacts.find(c => c.id === contactId);
    setSelectedContact(contact);
    setShowDeleteModal(true);
  };

  return (
    <div className={classes.contactsPageContainer}>
      <div className={classes.pageHeader}>
        <h1>Contacts</h1>
        
        {user.role === 'admin' && (
          <div className={classes.adminActions}>
            <button 
              className={classes.addButton}
              onClick={() => setShowAddModal(true)}
            >
              <FaPlus /> Add Contact
            </button>
            <button 
              className={classes.clearButton}
              onClick={() => setShowClearModal(true)}
              disabled={contacts.length === 0}
            >
              <FaTrashAlt /> Clear All
            </button>
          </div>
        )}
      </div>
      
      <div className={classes.toolbarSection}>
        <div className={classes.searchContainer}>
          <input
            type="text"
            placeholder="Search contacts..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className={classes.searchInput}
          />
        </div>
        
        <div className={classes.filterActions}>
          <button
            className={`${classes.filterButton} ${showFavorites ? classes.activeFilter : ''}`}
            onClick={() => setShowFavorites(!showFavorites)}
          >
            {showFavorites ? 'Show All' : 'Show Favorites'}
          </button>
          
          <button
            className={`${classes.filterButton} ${compactView ? classes.activeFilter : ''}`}
            onClick={() => setCompactView(!compactView)}
          >
            {compactView ? 'Detailed View' : 'Compact View'}
          </button>
        </div>
      </div>
      
      {loading ? (
        <div className={classes.loadingMessage}>Loading contacts...</div>
      ) : error ? (
        <div className={classes.errorMessage}>{error}</div>
      ) : filteredAndSortedContacts.length === 0 ? (
        <div className={classes.emptyMessage}>
          {searchTerm 
            ? 'No contacts found matching your search.' 
            : showFavorites 
              ? 'No favorite contacts.' 
              : 'No contacts in your phonebook.'}
        </div>
      ) : (
        <>
          <div className={classes.sortingHeader}>
            <div 
              className={classes.sortButton}
              onClick={() => handleSort('name')}
            >
              Name {getSortIcon('name')}
            </div>
            <div 
              className={classes.sortButton}
              onClick={() => handleSort('phone')}
            >
              Phone {getSortIcon('phone')}
            </div>
            {!compactView && (
              <div 
                className={classes.sortButton}
                onClick={() => handleSort('email')}
              >
                Email {getSortIcon('email')}
              </div>
            )}
          </div>
          
          <div className={classes.contactsList}>
            {filteredAndSortedContacts.map(contact => (
              <Contact
                key={contact.id}
                contact={contact}
                isCompact={compactView}
                isAdmin={user.role === 'admin'}
                onEdit={openEditModal}
                onDelete={openDeleteModal}
                onToggleFavorite={handleToggleFavorite}
              />
            ))}
          </div>
        </>
      )}
      
      {/* Add Contact Modal */}
      <Modal
        isOpen={showAddModal}
        onClose={() => setShowAddModal(false)}
        title="Add New Contact"
      >
        <ContactForm
          groups={groups}
          onSubmit={handleAddContact}
          onCancel={() => setShowAddModal(false)}
        />
      </Modal>
      
      {/* Edit Contact Modal */}
      <Modal
        isOpen={showEditModal}
        onClose={() => setShowEditModal(false)}
        title="Edit Contact"
      >
        <ContactForm
          initialData={selectedContact}
          groups={groups}
          onSubmit={handleEditContact}
          onCancel={() => setShowEditModal(false)}
        />
      </Modal>
      
      {/* Delete Contact Modal */}
      <Modal
        isOpen={showDeleteModal}
        onClose={() => setShowDeleteModal(false)}
        title="Delete Contact"
      >
        <div className={classes.confirmationModal}>
          <p>Are you sure you want to delete {selectedContact?.name}?</p>
          <p>This action cannot be undone.</p>
          
          <div className={classes.modalButtons}>
            <button 
              className={classes.cancelButton}
              onClick={() => setShowDeleteModal(false)}
            >
              Cancel
            </button>
            <button 
              className={classes.deleteButton}
              onClick={handleDeleteContact}
            >
              Delete
            </button>
          </div>
        </div>
      </Modal>
      
      {/* Clear All Contacts Modal */}
      <Modal
        isOpen={showClearModal}
        onClose={() => setShowClearModal(false)}
        title="Clear All Contacts"
      >
        <div className={classes.confirmationModal}>
          <p>Are you sure you want to delete all contacts?</p>
          <p>This action cannot be undone.</p>
          
          <div className={classes.modalButtons}>
            <button 
              className={classes.cancelButton}
              onClick={() => setShowClearModal(false)}
            >
              Cancel
            </button>
            <button 
              className={classes.deleteButton}
              onClick={handleClearContacts}
            >
              Delete All
            </button>
          </div>
        </div>
      </Modal>
    </div>
  );
}

export default ContactsPage; 