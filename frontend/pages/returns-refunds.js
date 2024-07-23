import React from 'react'
import { APP_NAME } from '../config';

const ReturnsAndRefund = () => {
    const appName = APP_NAME;
  return (
    <div className='support-page-wrapper'>
        <div className='container'>
            <h1>Returns & Refunds</h1>
            <h2>Our Return Policy</h2>
            <p>At {appName}, we want you to be completely satisfied with your purchase. If you are not satisfied with your product, you may return it in accordance with our policy outlined below.</p>
            <h2>Eligibility for Returns</h2>
            <ul>
                <li>Items must be returned within 30 days of receipt.</li>
                <li>Items must be unused and in the same condition that you received them.</li>
                <li>Items must be in the original packaging, with all tags and labels attached.</li>
                <li>Some items, such as perishable goods, custom products, and personal care items, are not eligible for returns. Please check the product description for specific return eligibility.</li>
            </ul>
            <h2>How to Initiate a Return</h2>
            <p>To initiate a return, please follow these steps:</p>
            <ol>
                <li>Contact our customer service team at support@zemjet.com with your order number and reason for the return.</li>
                <li>Items must be unused and in the same condition that you received them.</li>
                <li>Our team will provide you with a Return Merchandise Authorization (RMA) number and instructions for sending the item back.</li>
                <li>Pack the item securely, including the RMA number inside the package, and ship it to the address provided by our team.</li>
            </ol>
            <h2>Shipping Costs</h2>
            <ul>
                <li>Original shipping costs are non-refundable.</li>
                <li>You will be responsible for paying for your shipping costs for returning your item unless the return is due to our error or a defective product.</li>
            </ul>
            <h2>Exchanges</h2>
            <p>We only replace items if they are defective or damaged. If you need to exchange it for the same item, contact our customer service team at sales@zemjet.com. </p>
            <h2>Non-Returnable Items</h2>
            <ul>
                <li>Gift cards</li>
                <li>Downloadable software products.</li>
                <li>Some health and personal care items.</li>
            </ul>
            <h2>Late or Missing Refunds</h2>
            <p>If you haven’t received a refund yet, please check your bank account again, then contact your credit card company. It may take some time before your refund is officially posted. </p>
            <h2>Contact Us</h2>
            <p>If you have any questions about our Returns and refunds policy, please email our customer service team at <a href='mailto:sales@zemjet.com'>sales@zemjet.com</a>.</p>
            
        </div>
    </div>
  )
}

export default ReturnsAndRefund