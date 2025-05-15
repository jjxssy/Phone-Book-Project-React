import { contacts as mockContacts, defaultGroups as mockGroups } from '../data/contacts';

/**
 * Simulates API call to fetch contacts
 * @returns {Promise<Array>} - Promise resolving to contacts array
 */
export const fetchContacts = () => {
  return new Promise((resolve) => {
    // Simulate network delay
    setTimeout(() => {
      resolve([...mockContacts]); // Return a copy to avoid mutation
    }, 500);
  });
};

/**
 * Simulates API call to fetch contact groups
 * @returns {Promise<Array>} - Promise resolving to groups array
 */
export const fetchGroups = () => {
  return new Promise((resolve) => {
    // Simulate network delay
    setTimeout(() => {
      resolve([...mockGroups]); // Return a copy to avoid mutation
    }, 300);
  });
}; 