import React, { useState, useEffect } from 'react';
import { FaSort, FaSortUp, FaSortDown, FaPlus, FaTrashAlt, FaTag, FaLayerGroup } from 'react-icons/fa';
import { Contact } from '../contact';
import { Modal } from '../modal';
import { ContactForm } from '../contactForm';
import { fetchContacts, fetchGroups } from '../../services/contactService';
import classes from './groupedContactsPage.module.css';

/**
 * GroupedContactsPage component for displaying contacts with grouping
 * @param {Object} props - Component props
 * @param {Object} props.user - User information
 * @returns {JSX.Element} - Rendered component
 */
function GroupedContactsPage({ user }) {
  // State for contacts and UI
  const [contacts, setContacts] = useState([]);
  const [groups, setGroups] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  // Filter states
  const [searchTerm, setSearchTerm] = useState('');
  const [activeGroup, setActiveGroup] = useState('');
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
  const [showAddGroupModal, setShowAddGroupModal] = useState(false);
  const [showDeleteGroupModal, setShowDeleteGroupModal] = useState(false);
  const [selectedContact, setSelectedContact] = useState(null);
  const [newGroupName, setNewGroupName] = useState('');
  
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
  
  // Filter contacts by active group, search term, and favorites
  const filteredContacts = contacts.filter(contact => {
    // Check if contact belongs to active group
    const matchesGroup = !activeGroup || 
      (contact.tags && contact.tags.includes(activeGroup));
    
    // Check if contact matches search term
    const matchesSearch = 
      contact.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      contact.phone.includes(searchTerm) ||
      contact.email.toLowerCase().includes(searchTerm.toLowerCase());
    
    // Check if contact is a favorite (if showing favorites only)
    const matchesFavorites = !showFavorites || contact.favorite;
    
    return matchesGroup && matchesSearch && matchesFavorites;
  });
  
  // Sort filtered contacts
  const sortedContacts = [...filteredContacts].sort((a, b) => {
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
  
  /**
   * Handle clearing all contacts in a group
   */
  const handleClearGroupContacts = () => {
    if (!activeGroup) return;
    
    setContacts(prevContacts => 
      prevContacts.map(contact => {
        if (contact.tags && contact.tags.includes(activeGroup)) {
          // Remove this group from the contact's tags
          return {
            ...contact,
            tags: contact.tags.filter(tag => tag !== activeGroup)
          };
        }
        return contact;
      })
    );
    
    setShowDeleteGroupModal(false);
  };
  
  /**
   * Handle adding a new group
   */
  const handleAddGroup = () => {
    if (!newGroupName.trim()) return;
    
    // Check if group already exists
    if (groups.includes(newGroupName.trim())) {
      return; // Group already exists
    }
    
    setGroups(prevGroups => [...prevGroups, newGroupName.trim()]);
    setNewGroupName('');
    setShowAddGroupModal(false);
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
    <div className={classes.groupedContactsPageContainer}>
      <div className={classes.pageHeader}>
        <h1>Grouped Contacts</h1>
        
        {user.role === 'admin' && (
          <div className={classes.adminActions}>
            <button 
              className={classes.addButton}
              onClick={() => setShowAddModal(true)}
            >
              <FaPlus /> Add Contact
            </button>
            <button 
              className={classes.addGroupButton}
              onClick={() => setShowAddGroupModal(true)}
            >
              <FaLayerGroup /> Add Group
            </button>
            {activeGroup && (
              <button 
                className={classes.clearGroupButton}
                onClick={() => setShowDeleteGroupModal(true)}
              >
                <FaTrashAlt /> Clear Group
              </button>
            )}
          </div>
        )}
      </div>
      
      <div className={classes.pageContent}>
        <div className={classes.groupsSidebar}>
          <h3 className={classes.groupsHeader}>Groups</h3>
          <button 
            className={`${classes.groupButton} ${!activeGroup ? classes.activeGroup : ''}`}
            onClick={() => setActiveGroup('')}
          >
            All Contacts
          </button>
          
          {groups.map(group => (
            <button 
              key={group}
              className={`${classes.groupButton} ${activeGroup === group ? classes.activeGroup : ''}`}
              onClick={() => setActiveGroup(group)}
            >
              <FaTag className={classes.groupIcon} />
              {group}
            </button>
          ))}
        </div>
        
        <div className={classes.contactsSection}>
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
          ) : sortedContacts.length === 0 ? (
            <div className={classes.emptyMessage}>
              {activeGroup 
                ? `No contacts in "${activeGroup}" group.` 
                : searchTerm 
                  ? 'No contacts found matching your search.' 
                  : showFavorites 
                    ? 'No favorite contacts.' 
                    : 'No contacts in your phonebook.'}
            </div>
          ) : (
            <>
              <div className={classes.activeGroupHeader}>
                {activeGroup 
                  ? `${activeGroup} Contacts (${sortedContacts.length})` 
                  : `All Contacts (${sortedContacts.length})`}
              </div>
              
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
                {sortedContacts.map(contact => (
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
        </div>
      </div>
      
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
      
      {/* Add Group Modal */}
      <Modal
        isOpen={showAddGroupModal}
        onClose={() => setShowAddGroupModal(false)}
        title="Add New Group"
      >
        <div className={classes.addGroupModal}>
          <div className={classes.formGroup}>
            <label htmlFor="groupName">Group Name</label>
            <input
              type="text"
              id="groupName"
              value={newGroupName}
              onChange={(e) => setNewGroupName(e.target.value)}
              placeholder="Enter group name"
            />
          </div>
          
          <div className={classes.modalButtons}>
            <button 
              className={classes.cancelButton}
              onClick={() => setShowAddGroupModal(false)}
            >
              Cancel
            </button>
            <button 
              className={classes.submitButton}
              onClick={handleAddGroup}
              disabled={!newGroupName.trim()}
            >
              Add Group
            </button>
          </div>
        </div>
      </Modal>
      
      {/* Delete Group Modal */}
      <Modal
        isOpen={showDeleteGroupModal}
        onClose={() => setShowDeleteGroupModal(false)}
        title={`Clear "${activeGroup}" Group`}
      >
        <div className={classes.confirmationModal}>
          <p>Are you sure you want to remove all contacts from the "{activeGroup}" group?</p>
          <p>This action will not delete the contacts, but will remove them from this group.</p>
          
          <div className={classes.modalButtons}>
            <button 
              className={classes.cancelButton}
              onClick={() => setShowDeleteGroupModal(false)}
            >
              Cancel
            </button>
            <button 
              className={classes.deleteButton}
              onClick={handleClearGroupContacts}
            >
              Clear Group
            </button>
          </div>
        </div>
      </Modal>
    </div>
  );
}

export default GroupedContactsPage; 