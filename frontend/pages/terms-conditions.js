import React from 'react'
import { APP_NAME } from '../config';

const TermsCondition = () => {
  const appName = APP_NAME;
  return (
    <div className='support-page-wrapper'>
      <div className='container'>
        <h1>Terms and Conditions</h1>
        <h2>Welcome to {appName}</h2>
        <p>These Terms and Conditions outline the rules and regulations for using {appName}'s website, <a href='http://www.zemjet.com'>www.zemjet.com</a>.</p>
        <p>By accessing this website, we assume you accept these terms and conditions. Do not continue to use {appName} if you do not agree to take all of the terms and conditions stated on this page</p>
        <h2>1. Introduction</h2>
        <p>These terms and conditions govern your use of our website and services. By using our website, you agree to these terms in full. If you disagree with any part of these terms and conditions, do not use our website.</p>
        <h2>2. Intellectual Property Rights</h2>
        <p>Unless otherwise stated, {appName} and/or its licensors own the intellectual property rights for all material on {appName}. All intellectual property rights are reserved. You may access this from {appName} for your own personal use, subject to restrictions set in these terms and conditions.</p>
        <h3>You must not:</h3>
        <ul>
          <li>Republish material from {appName}</li>
          <li>Sell, rent, or sub-license material from {appName}</li>
          <li>Reproduce, duplicate, or copy material from {appName}</li>
          <li>Redistribute content from {appName}</li>
        </ul>
        <h2>3. User Account</h2>
        <ul>
          <li>You may be required to create an account to use certain features of our website. You are responsible for maintaining the confidentiality of your account and password and for restricting access to your computer or device.</li>
          <li>You agree to accept responsibility for all activities that occur under your account or password.</li>
          <li>{appName} reserves the right to refuse service, terminate accounts, remove or edit content, or cancel orders at our discretion.</li>
        </ul>
        <h2>4. Order and Payment</h2>
        <ul>
          <li>By placing an order on our website, you agree to provide current, complete, and accurate purchase and account information.</li>
          <li>All payments are processed through secure gateways and are subject to validation checks and authorization by the card issuer.</li>
          <li>We reserve the right to refuse or cancel any order if fraud or an unauthorized or illegal transaction is suspected.</li>
        </ul>
        <h2>5. Shipping and Delivery</h2>
        <ul>
          <li>Shipping times may vary depending on the destination and shipping method selected.</li>
          <li>{appName} is not responsible for delays caused by shipping carriers or events beyond our control.</li>
          <li>Risk of loss and title for products purchased from {appName} pass to you upon delivery to the carrier.</li>
        </ul>
        <h2>6. Returns and Refunds</h2>
        <ul>
          <li>Please review our Returns and Refunds Policy for details on how to return products and obtain refunds.</li>
          <li>To be eligible for a return, items must be unused and in the same condition that you received them.</li>
        </ul>
        <h2>7. Limitation of Liability</h2>
        <ul>
          <li>{appName} will not be liable for any damages arising from the use or inability to use our website or services.</li>
          <li>{appName} does not warrant that the website will be uninterrupted or error-free.</li>
        </ul>
        <h2>8. Governing Law</h2>
        <p>These terms and conditions are governed by and construed in accordance with the laws of Indian Government, and you irrevocably submit to the exclusive jurisdiction of the courts in that location.</p>
        <h2>9. Changes to Terms</h2>
        <p>{appName} reserves the right to revise these terms and conditions at any time. By using this website, you agree to be bound by the current version of these terms and conditions.</p>
        <h2>10. Contact Us</h2>
        <p>If you have any questions about these terms and conditions, please contact us at <a href='mailto:sales@zemjet.com'>sales@zemjet.com</a>.</p>
        
      </div>
    </div>
  )
}

export default TermsCondition