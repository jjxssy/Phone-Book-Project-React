import React, { useState } from 'react';
import classes from './help.module.css';
import pageClasses from '../../app/page.module.css';

/**
 * Help page component
 * @returns {JSX.Element} - Rendered component
 */
function Help() {
  const [activeSection, setActiveSection] = useState('getting-started');
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [formErrors, setFormErrors] = useState({});
  const [submitStatus, setSubmitStatus] = useState(null);

  const handleSectionClick = (sectionId) => {
    setActiveSection(sectionId);
    
    // Scroll to section
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleInputChange = (e) => {
    const { id, value } = e.target;
    setFormData({
      ...formData,
      [id]: value
    });
    
    // Clear error for this field when user starts typing
    if (formErrors[id]) {
      setFormErrors({
        ...formErrors,
        [id]: ''
      });
    }
  };

  const validateForm = () => {
    const errors = {};
    
    if (!formData.name.trim()) {
      errors.name = 'Name is required';
    }
    
    if (!formData.email.trim()) {
      errors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      errors.email = 'Email is invalid';
    }
    
    if (!formData.subject.trim()) {
      errors.subject = 'Subject is required';
    }
    
    if (!formData.message.trim()) {
      errors.message = 'Message is required';
    }
    
    return errors;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Validate form
    const errors = validateForm();
    
    if (Object.keys(errors).length > 0) {
      setFormErrors(errors);
      setSubmitStatus('error');
      return;
    }
    
    // Form is valid, proceed with submission
    // In a real app, you would send this data to your backend
    console.log('Form submitted:', formData);
    
    // Show success message
    setSubmitStatus('success');
    
    // Reset form after successful submission
    setFormData({
      name: '',
      email: '',
      subject: '',
      message: ''
    });
    
    // Clear success message after 5 seconds
    setTimeout(() => {
      setSubmitStatus(null);
    }, 5000);
  };

  return (
    <div className={`${pageClasses.container} ${classes.helpContainer}`}>
      <h1 className={classes.title}>Help Center</h1>
      
      <div className={classes.helpContent}>
        <aside className={classes.sidebar}>
          <nav className={classes.nav}>
            <ul className={classes.navList}>
              <li className={classes.navItem}>
                <button 
                  className={`${classes.navButton} ${activeSection === 'getting-started' ? classes.active : ''}`}
                  onClick={() => handleSectionClick('getting-started')}
                >
                  Getting Started
                </button>
              </li>
              <li className={classes.navItem}>
                <button 
                  className={`${classes.navButton} ${activeSection === 'managing-contacts' ? classes.active : ''}`}
                  onClick={() => handleSectionClick('managing-contacts')}
                >
                  Managing Contacts
                </button>
              </li>
              <li className={classes.navItem}>
                <button 
                  className={`${classes.navButton} ${activeSection === 'searching' ? classes.active : ''}`}
                  onClick={() => handleSectionClick('searching')}
                >
                  Searching & Filtering
                </button>
              </li>
              <li className={classes.navItem}>
                <button 
                  className={`${classes.navButton} ${activeSection === 'account' ? classes.active : ''}`}
                  onClick={() => handleSectionClick('account')}
                >
                  Account Settings
                </button>
              </li>
              <li className={classes.navItem}>
                <button 
                  className={`${classes.navButton} ${activeSection === 'troubleshooting' ? classes.active : ''}`}
                  onClick={() => handleSectionClick('troubleshooting')}
                >
                  Troubleshooting
                </button>
              </li>
              <li className={classes.navItem}>
                <button 
                  className={`${classes.navButton} ${activeSection === 'faq' ? classes.active : ''}`}
                  onClick={() => handleSectionClick('faq')}
                >
                  FAQ
                </button>
              </li>
              <li className={classes.navItem}>
                <button 
                  className={`${classes.navButton} ${activeSection === 'contact-support' ? classes.active : ''}`}
                  onClick={() => handleSectionClick('contact-support')}
                >
                  Contact Support
                </button>
              </li>
            </ul>
          </nav>
        </aside>
        
        <main className={classes.mainContent}>
          <section id="getting-started" className={classes.section}>
            <h2>Getting Started</h2>
            <div className={classes.sectionContent}>
              <div className={classes.helpCard}>
                <h3>Creating an Account</h3>
                <p>
                  To get started with Phone Book App, you need to create an account. 
                  Visit our homepage and click on the "Sign Up" button. Fill in your details 
                  and follow the instructions to complete the registration process.
                </p>
              </div>
              
              <div className={classes.helpCard}>
                <h3>Logging In</h3>
                <p>
                  Once you have created an account, you can log in by entering your email 
                  and password on the login page. If you've forgotten your password, 
                  click on the "Forgot Password" link to reset it.
                </p>
              </div>
              
              <div className={classes.helpCard}>
                <h3>Navigating the App</h3>
                <p>
                  After logging in, you'll be directed to your contacts page. The main navigation 
                  is located at the top of the page, allowing you to access different sections of the app.
                </p>
                <ul className={classes.stepsList}>
                  <li>
                    <span className={classes.stepNumber}>1</span>
                    <span className={classes.stepText}>Use the top navigation bar to switch between different sections</span>
                  </li>
                  <li>
                    <span className={classes.stepNumber}>2</span>
                    <span className={classes.stepText}>Click on your profile icon to access account settings</span>
                  </li>
                  <li>
                    <span className={classes.stepNumber}>3</span>
                    <span className={classes.stepText}>Use the search bar to quickly find contacts</span>
                  </li>
                </ul>
              </div>
            </div>
          </section>
          
          <section id="managing-contacts" className={classes.section}>
            <h2>Managing Contacts</h2>
            <div className={classes.sectionContent}>
              <div className={classes.helpCard}>
                <h3>Adding a New Contact</h3>
                <p>
                  To add a new contact, click on the "+ Add Contact" button at the top of your contacts page. 
                  Fill in the contact details in the form that appears and click "Save" to add the contact to your list.
                </p>
                <div className={classes.tipBox}>
                  <div className={classes.tipIcon}>💡</div>
                  <div className={classes.tipContent}>
                    <strong>Pro Tip:</strong> You can mark important contacts as "Favorites" for quick access.
                  </div>
                </div>
              </div>
              
              <div className={classes.helpCard}>
                <h3>Editing a Contact</h3>
                <p>
                  To edit a contact, click on the contact card and then click the "Edit" button. 
                  Make your changes in the edit form and click "Save" to update the contact information.
                </p>
              </div>
              
              <div className={classes.helpCard}>
                <h3>Deleting a Contact</h3>
                <p>
                  To delete a contact, open the contact details and click the "Delete" button. 
                  You will be asked to confirm the deletion. Once confirmed, the contact will be permanently removed.
                </p>
                <div className={classes.warningBox}>
                  <div className={classes.warningIcon}>⚠️</div>
                  <div className={classes.warningContent}>
                    <strong>Warning:</strong> Deleted contacts cannot be recovered. Make sure you want to delete a contact before confirming.
                  </div>
                </div>
              </div>
              
              <div className={classes.helpCard}>
                <h3>Organizing Contacts with Tags</h3>
                <p>
                  You can organize your contacts by adding tags. When adding or editing a contact, 
                  you can select from predefined tags or create your own. Tags make it easier to filter and find contacts.
                </p>
              </div>
            </div>
          </section>
          
          <section id="searching" className={classes.section}>
            <h2>Searching & Filtering</h2>
            <div className={classes.sectionContent}>
              <div className={classes.helpCard}>
                <h3>Using the Search Bar</h3>
                <p>
                  The search bar at the top of your contacts page allows you to quickly find contacts. 
                  You can search by name, phone number, email, or any other information associated with your contacts.
                </p>
              </div>
              
              <div className={classes.helpCard}>
                <h3>Filtering by Tags</h3>
                <p>
                  You can filter your contacts by tags to view specific groups. Click on a tag in the tag filter 
                  section to show only contacts with that tag. Click again to remove the filter.
                </p>
              </div>
              
              <div className={classes.helpCard}>
                <h3>Advanced Search Options</h3>
                <p>
                  For more specific searches, you can use advanced search options:
                </p>
                <ul className={classes.featureList}>
                  <li>Use quotes for exact phrase matching (e.g., "John Smith")</li>
                  <li>Use "tag:" prefix to search by tag (e.g., tag:work)</li>
                  <li>Use "phone:" prefix to search by phone number (e.g., phone:555)</li>
                  <li>Use "email:" prefix to search by email (e.g., email:gmail.com)</li>
                </ul>
              </div>
            </div>
          </section>
          
          <section id="account" className={classes.section}>
            <h2>Account Settings</h2>
            <div className={classes.sectionContent}>
              <div className={classes.helpCard}>
                <h3>Updating Profile Information</h3>
                <p>
                  To update your profile information, click on your profile icon and select "Account Settings." 
                  From there, you can edit your name, email, and other profile details.
                </p>
              </div>
              
              <div className={classes.helpCard}>
                <h3>Changing Your Password</h3>
                <p>
                  To change your password, go to Account Settings and select the "Security" tab. 
                  Enter your current password and then your new password twice to confirm.
                </p>
              </div>
              
              <div className={classes.helpCard}>
                <h3>Data Backup and Export</h3>
                <p>
                  You can back up your contacts by exporting them to a CSV or vCard file. 
                  Go to Account Settings, select the "Data" tab, and click "Export Contacts."
                </p>
              </div>
            </div>
          </section>
          
          <section id="troubleshooting" className={classes.section}>
            <h2>Troubleshooting</h2>
            <div className={classes.sectionContent}>
              <div className={classes.helpCard}>
                <h3>Common Issues</h3>
                <p>
                  Here are solutions to some common issues you might encounter:
                </p>
                <div className={classes.accordionList}>
                  <details className={classes.accordionItem}>
                    <summary className={classes.accordionHeader}>Can't log in to my account</summary>
                    <div className={classes.accordionContent}>
                      <p>
                        If you're having trouble logging in, try the following:
                      </p>
                      <ul>
                        <li>Make sure you're using the correct email address</li>
                        <li>Check that Caps Lock is not enabled</li>
                        <li>Try resetting your password using the "Forgot Password" link</li>
                        <li>Clear your browser cache and cookies</li>
                      </ul>
                    </div>
                  </details>
                  
                  <details className={classes.accordionItem}>
                    <summary className={classes.accordionHeader}>App is running slowly</summary>
                    <div className={classes.accordionContent}>
                      <p>
                        If the app is running slowly, try these solutions:
                      </p>
                      <ul>
                        <li>Refresh the page</li>
                        <li>Clear your browser cache</li>
                        <li>Check your internet connection</li>
                        <li>Try using a different browser</li>
                      </ul>
                    </div>
                  </details>
                  
                  <details className={classes.accordionItem}>
                    <summary className={classes.accordionHeader}>Changes not saving</summary>
                    <div className={classes.accordionContent}>
                      <p>
                        If your changes are not saving, try these steps:
                      </p>
                      <ul>
                        <li>Make sure you're clicking the "Save" button after making changes</li>
                        <li>Check your internet connection</li>
                        <li>Try logging out and logging back in</li>
                        <li>Clear your browser cache and cookies</li>
                      </ul>
                    </div>
                  </details>
                </div>
              </div>
            </div>
          </section>
          
          <section id="faq" className={classes.section}>
            <h2>Frequently Asked Questions</h2>
            <div className={classes.sectionContent}>
              <div className={classes.helpCard}>
                <h3>General Questions</h3>
                <div className={classes.accordionList}>
                  <details className={classes.accordionItem}>
                    <summary className={classes.accordionHeader}>Is Phone Book App free to use?</summary>
                    <div className={classes.accordionContent}>
                      <p>
                        Phone Book App offers both free and premium plans. The free plan includes basic features, 
                        while the premium plan offers additional features like unlimited contacts, advanced search, 
                        and priority support.
                      </p>
                    </div>
                  </details>
                  
                  <details className={classes.accordionItem}>
                    <summary className={classes.accordionHeader}>How secure is my contact information?</summary>
                    <div className={classes.accordionContent}>
                      <p>
                        We take security seriously. All your data is encrypted both in transit and at rest. 
                        We use industry-standard security measures to protect your information. 
                        For more details, please refer to our Privacy Policy.
                      </p>
                    </div>
                  </details>
                  
                  <details className={classes.accordionItem}>
                    <summary className={classes.accordionHeader}>Can I access my contacts offline?</summary>
                    <div className={classes.accordionContent}>
                      <p>
                        Currently, Phone Book App requires an internet connection to access your contacts. 
                        However, you can export your contacts to a file for offline access.
                      </p>
                    </div>
                  </details>
                  
                  <details className={classes.accordionItem}>
                    <summary className={classes.accordionHeader}>Is there a mobile app available?</summary>
                    <div className={classes.accordionContent}>
                      <p>
                        Yes, Phone Book App is available as a mobile app for both iOS and Android devices. 
                        You can download it from the App Store or Google Play Store.
                      </p>
                    </div>
                  </details>
                </div>
              </div>
            </div>
          </section>
          
          <section id="contact-support" className={classes.section}>
            <h2>Contact Support</h2>
            <div className={classes.sectionContent}>
              <div className={classes.helpCard}>
                <h3>Need More Help?</h3>
                <p>
                  If you couldn't find the answer to your question, please contact our support team. 
                  We're here to help!
                </p>
                <div className={classes.contactOptions}>
                  <div className={classes.contactOption}>
                    <div className={classes.contactIcon}>✉️</div>
                    <h4>Email Support</h4>
                    <p>support@phonebookapp.com</p>
                    <p className={classes.responseTime}>Response time: 24-48 hours</p>
                  </div>
                  
                  <div className={classes.contactOption}>
                    <div className={classes.contactIcon}>💬</div>
                    <h4>Live Chat</h4>
                    <p>Available Monday-Friday</p>
                    <p className={classes.responseTime}>9 AM - 5 PM EST</p>
                  </div>
                  
                  <div className={classes.contactOption}>
                    <div className={classes.contactIcon}>📞</div>
                    <h4>Phone Support</h4>
                    <p>1-800-CONTACTS</p>
                    <p className={classes.responseTime}>Available for Premium users</p>
                  </div>
                </div>
              </div>
              
              <div className={classes.helpCard}>
                <h3>Submit a Support Ticket</h3>
                <form className={classes.supportForm} onSubmit={handleSubmit}>
                  <div className={`${classes.formGroup} ${formErrors.name ? classes.hasError : ''}`}>
                    <label htmlFor="name">Name <span className={classes.requiredField}>*</span></label>
                    <input 
                      type="text" 
                      id="name" 
                      placeholder="Your name" 
                      value={formData.name}
                      onChange={handleInputChange}
                      required
                    />
                    {formErrors.name && <div className={classes.errorMessage}>{formErrors.name}</div>}
                  </div>
                  
                  <div className={`${classes.formGroup} ${formErrors.email ? classes.hasError : ''}`}>
                    <label htmlFor="email">Email <span className={classes.requiredField}>*</span></label>
                    <input 
                      type="email" 
                      id="email" 
                      placeholder="Your email address" 
                      value={formData.email}
                      onChange={handleInputChange}
                      required
                    />
                    {formErrors.email && <div className={classes.errorMessage}>{formErrors.email}</div>}
                  </div>
                  
                  <div className={`${classes.formGroup} ${formErrors.subject ? classes.hasError : ''}`}>
                    <label htmlFor="subject">Subject <span className={classes.requiredField}>*</span></label>
                    <input 
                      type="text" 
                      id="subject" 
                      placeholder="What is this about?" 
                      value={formData.subject}
                      onChange={handleInputChange}
                      required
                    />
                    {formErrors.subject && <div className={classes.errorMessage}>{formErrors.subject}</div>}
                  </div>
                  
                  <div className={`${classes.formGroup} ${formErrors.message ? classes.hasError : ''}`}>
                    <label htmlFor="message">Message <span className={classes.requiredField}>*</span></label>
                    <textarea 
                      id="message" 
                      rows="5" 
                      placeholder="Describe your issue in detail" 
                      value={formData.message}
                      onChange={handleInputChange}
                      required
                    ></textarea>
                    {formErrors.message && <div className={classes.errorMessage}>{formErrors.message}</div>}
                  </div>
                  
                  {submitStatus === 'success' && (
                    <div className={classes.successMessage}>
                      Your ticket has been submitted successfully! We'll get back to you soon.
                    </div>
                  )}
                  
                  <button type="submit" className={classes.submitButton}>Submit Ticket</button>
                </form>
              </div>
            </div>
          </section>
        </main>
      </div>
    </div>
  );
}

export default Help;
