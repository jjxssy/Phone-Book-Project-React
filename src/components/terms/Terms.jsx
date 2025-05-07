import React from 'react';
// Import component-specific styles
import classes from './terms.module.css';
// Import global page layout styles
import pageClasses from '../../app/page.module.css';

/**
 * Terms of Service page component
 * Renders the legal terms for using the Phone Book App.
 * @returns {JSX.Element} - The Terms of Service page
 */
function Terms() {
  return (
    // Top-level container combining global and local styles
    <div className={`${pageClasses.container} ${classes.termsContainer}`}>
      
      {/* Page header */}
      <h1 className={classes.title}>Terms of Service</h1>
      
      {/* Main content area */}
      <div className={classes.content}>

        {/* Section 1: Agreement to terms */}
        <section className={classes.section}>
          <h2>1. Acceptance of Terms</h2>
          <p>
            By accessing or using the Phone Book App, you agree to be bound by these Terms of Service. 
            If you do not agree to these terms, please do not use our application.
          </p>
        </section>

        {/* Section 2: Description of what the app provides */}
        <section className={classes.section}>
          <h2>2. Description of Service</h2>
          <p>
            Phone Book App provides a digital platform for managing and organizing your contacts. 
            We reserve the right to modify, suspend, or discontinue any part of the service at any time.
          </p>
        </section>

        {/* Section 3: User responsibility for account security */}
        <section className={classes.section}>
          <h2>3. User Accounts</h2>
          <p>
            To access certain features of our service, you may need to create an account. 
            You are responsible for maintaining the confidentiality of your account information and for all activities that occur under your account.
          </p>
        </section>

        {/* Section 4: Ownership and licensing of user-uploaded content */}
        <section className={classes.section}>
          <h2>4. User Content</h2>
          <p>
            You retain ownership of any content you upload to the Phone Book App. 
            By uploading content, you grant us a non-exclusive license to use, store, and display your content in connection with providing our service.
          </p>
        </section>

        {/* Section 5: Forbidden actions while using the app */}
        <section className={classes.section}>
          <h2>5. Prohibited Activities</h2>
          <p>You agree not to engage in any of the following activities:</p>
          <ul className={classes.list}>
            <li>Using the service for any illegal purpose</li>
            <li>Attempting to gain unauthorized access to other user accounts</li>
            <li>Interfering with the proper functioning of the service</li>
            <li>Uploading malicious code or content</li>
            <li>Collecting user information without consent</li>
          </ul>
        </section>

        {/* Section 6: Ownership of app assets */}
        <section className={classes.section}>
          <h2>6. Intellectual Property</h2>
          <p>
            The Phone Book App, including its design, features, and content (excluding user content), 
            is owned by us and is protected by copyright, trademark, and other intellectual property laws.
          </p>
        </section>

        {/* Section 7: No guarantees about service quality */}
        <section className={classes.section}>
          <h2>7. Disclaimer of Warranties</h2>
          <p>
            The service is provided "as is" without warranties of any kind, either express or implied. 
            We do not guarantee that the service will be uninterrupted, secure, or error-free.
          </p>
        </section>

        {/* Section 8: Limits of legal liability */}
        <section className={classes.section}>
          <h2>8. Limitation of Liability</h2>
          <p>
            To the maximum extent permitted by law, we shall not be liable for any indirect, incidental, 
            special, consequential, or punitive damages resulting from your use of or inability to use the service.
          </p>
        </section>

        {/* Section 9: Updating the terms */}
        <section className={classes.section}>
          <h2>9. Changes to Terms</h2>
          <p>
            We may update these Terms of Service from time to time. We will notify users of any significant changes. 
            Your continued use of the service after such changes constitutes your acceptance of the new terms.
          </p>
        </section>

        {/* Section 10: Legal jurisdiction */}
        <section className={classes.section}>
          <h2>10. Governing Law</h2>
          <p>
            These Terms of Service shall be governed by and construed in accordance with the laws of the jurisdiction in which we operate, 
            without regard to its conflict of law provisions.
          </p>
        </section>

        {/* Last updated notice */}
        <div className={classes.lastUpdated}>
          <p>Last Updated: April 2, 2025</p>
        </div>
      </div>
    </div>
  );
}

export default Terms;
