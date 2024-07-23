import React from 'react'
import { APP_NAME } from '../config';

const PrivacyPolicy = () => {
  const appName = APP_NAME;

  return (
    <div className='support-page-wrapper'>
      <div className='container'>
        <h1>Privacy Policy</h1>
        <h2>Introduction</h2>
        <p>Welcome to {appName}. We are committed to protecting your privacy and ensuring that your personal information is handled safely and responsibly. This Privacy Policy describes how we collect, use, and protect your information when you visit our website <a href='http://www.zemjet.com'>www.zemjet.com</a> and make use of our services.</p>
        <h2>1. Information We Collect</h2>
        <p>We collect several types of information for various purposes to provide and improve our services to you.</p>
        <h3>Personal Information:</h3>
        <ul>
          <li>Name</li>
          <li>Email address</li>
          <li>Phone number</li>
          <li>Billing and shipping address</li>
          <li>Payment information</li>
        </ul>
        <h3>Non-Personal Information:</h3>
        <ul>
          <li>Browser type</li>
          <li>Internet Protocol (IP) address</li>
          <li>Time zone setting</li>
          <li>Referring/exit pages</li>
          <li>Operating system</li>
        </ul>
        <h2>2. How We Use Your Information</h2>
        <p>{appName} uses the collected data for various purposes:</p>
        <ul>
          <li>To process and fulfill your orders</li>
          <li>To improve our website and services</li>
          <li>To communicate with you, including responding to inquiries and sending promotional offers</li>
          <li>To detect, prevent, and address technical issues or fraud</li>
        </ul>
        <h2>3. How We Share Your Information</h2>
        <p>We do not sell, trade, or otherwise transfer your personal information to third parties without your consent, except as described below:</p>
        <ul>
          <li><b>Service Providers:</b>We may share your information with third-party service providers to perform certain services on our behalf, such as payment processing and order fulfillment.</li>
          <li><b>Legal Requirements</b>We may disclose your personal information to comply with a legal obligation, protect our rights, or prevent fraud or abuse of our services.</li>
        </ul>
        <h2>4. Cookies</h2>
        <p>{appName} uses cookies to enhance your experience on our website. Cookies are small data files stored on your device. You can choose to accept or decline cookies, but this may prevent you from taking full advantage of the website.</p>
        <h2>5. Security </h2>
        <p>We take appropriate security measures to protect your personal information from unauthorized access, alteration, disclosure, or destruction. However, no method of transmission over the Internet or method of electronic storage is 100% secure.</p>
        <h2>6. Your Rights</h2>
        <p>You have the right to access, update, or delete the personal information we hold about you. If you wish to exercise any of these rights, please get in touch with us.</p>
        <h2>7. Changes to This Privacy Policy</h2>
        <p>{appName} may update this Privacy Policy from time to time. We will notify you of any changes by posting the new Privacy Policy on this page. You are advised to review this Privacy Policy periodically for any changes.</p>
        <h2>8. Contact Us</h2>
        <p>If you have any questions or concerns about this Privacy Policy, please contact us at:</p>
        <p>Email: <a href='mailto:sales@zemjet.com'>sales@zemjet.com</a> </p>
      </div>
    </div>
  )
}

export default PrivacyPolicy