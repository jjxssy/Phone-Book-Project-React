import React from 'react';
import classes from './privacy.module.css';
import pageClasses from '../../app/page.module.css';

/**
 * Privacy Policy page component
 * @returns {JSX.Element} - Rendered component
 */
function Privacy() {
  return (
    <div className={`${pageClasses.container} ${classes.privacyContainer}`}>
      <h1 className={classes.title}>Privacy Policy</h1>
      
      <div className={classes.content}>
        <section className={classes.section}>
          <h2>1. Introduction</h2>
          <p>
            At Phone Book App, we respect your privacy and are committed to protecting your personal data.
            This Privacy Policy explains how we collect, use, and safeguard your information when you use our application.
          </p>
        </section>
        
        <section className={classes.section}>
          <h2>2. Information We Collect</h2>
          <p>
            We collect the following types of information:
          </p>
          <ul className={classes.list}>
            <li><strong>Account Information:</strong> When you create an account, we collect your name, email address, and password.</li>
            <li><strong>Contact Data:</strong> Information about your contacts that you choose to store in our application.</li>
            <li><strong>Usage Data:</strong> Information about how you use our application, including features accessed and time spent.</li>
            <li><strong>Device Information:</strong> Information about your device, including IP address, browser type, and operating system.</li>
          </ul>
        </section>
        
        <section className={classes.section}>
          <h2>3. How We Use Your Information</h2>
          <p>
            We use your information for the following purposes:
          </p>
          <ul className={classes.list}>
            <li>To provide and maintain our service</li>
            <li>To notify you about changes to our service</li>
            <li>To allow you to participate in interactive features</li>
            <li>To provide customer support</li>
            <li>To gather analysis or valuable information to improve our service</li>
            <li>To monitor the usage of our service</li>
            <li>To detect, prevent, and address technical issues</li>
          </ul>
        </section>
        
        <section className={classes.section}>
          <h2>4. Data Storage and Security</h2>
          <p>
            We implement appropriate security measures to protect your personal information against unauthorized access, 
            alteration, disclosure, or destruction. Your data is stored on secure servers and is only accessible to authorized personnel.
          </p>
        </section>
        
        <section className={classes.section}>
          <h2>5. Data Sharing and Third Parties</h2>
          <p>
            We do not sell your personal information to third parties. We may share your information with:
          </p>
          <ul className={classes.list}>
            <li>Service providers who assist us in operating our application</li>
            <li>Business partners with your consent</li>
            <li>Law enforcement agencies when required by law</li>
          </ul>
        </section>
        
        <section className={classes.section}>
          <h2>6. Your Data Protection Rights</h2>
          <p>
            Depending on your location, you may have the following rights regarding your personal data:
          </p>
          <ul className={classes.list}>
            <li>The right to access your personal data</li>
            <li>The right to rectify inaccurate personal data</li>
            <li>The right to request deletion of your personal data</li>
            <li>The right to restrict processing of your personal data</li>
            <li>The right to data portability</li>
            <li>The right to object to processing of your personal data</li>
          </ul>
        </section>
        
        <section className={classes.section}>
          <h2>7. Cookies and Tracking Technologies</h2>
          <p>
            We use cookies and similar tracking technologies to track activity on our application and hold certain information.
            You can instruct your browser to refuse all cookies or to indicate when a cookie is being sent.
          </p>
        </section>
        
        <section className={classes.section}>
          <h2>8. Children's Privacy</h2>
          <p>
            Our service is not intended for use by children under the age of 13. We do not knowingly collect personal information 
            from children under 13. If we discover that a child under 13 has provided us with personal information, 
            we will delete it immediately.
          </p>
        </section>
        
        <section className={classes.section}>
          <h2>9. Changes to This Privacy Policy</h2>
          <p>
            We may update our Privacy Policy from time to time. We will notify you of any changes by posting the new 
            Privacy Policy on this page and updating the "Last Updated" date.
          </p>
        </section>
        
        <section className={classes.section}>
          <h2>10. Contact Us</h2>
          <p>
            If you have any questions about this Privacy Policy, please contact us at:
          </p>
          <p className={classes.contactInfo}>
            Email: privacy@phonebookapp.com<br />
            Address: 123 App Street, Tech City, TC 12345
          </p>
        </section>
        
        <div className={classes.lastUpdated}>
          <p>Last Updated: April 2, 2025</p>
        </div>
      </div>
    </div>
  );
}

export default Privacy;
