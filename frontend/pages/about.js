import { Container } from 'react-bootstrap';
import BreadCrumb from '../components/breadcrumb/breadcrumb';
import PageTitle from '../components/PageTitle';
import Meta from '../components/Meta';

const About = () => {
  const siteTitle = process.env.NEXT_PUBLIC_BRAND_TITLE || "Zemjet";

  return (
    <div>
      <Meta 
        title='Your Next Door Hardware Shop | About Zemjet' 
        description={`${siteTitle} is your trusted online hardware shop, offering quality tools, materials, and home improvement essentials at affordable prices. Enjoy convenient shopping with fast delivery and a secure payment gateway.`} 
      />
      <PageTitle title="About" />
      <BreadCrumb title={'About'} />
      
      <Container>
        <h2>We Are Your Next Door Hardware Shop</h2>
        <p>
          Find premium quality home and professional hardware tools, home improvement products, home decor, DIY essentials, and much more that support businesses and individuals in an efficient and seamless procurement process in the Indian market.
        </p>
        <p>
          At Zemjet, we take pride in providing our customers with authentic, high-quality products from the most reputable international and regional brands in the market. Our online hardware store offers highly competitive prices, ensuring our customers get the best value for their needs.
        </p>
        <p>
          Whether you're a professional contractor, an interior designer, or a DIY enthusiast looking to upgrade your space, you can now get top-of-the-line products delivered right to your doorstep.
        </p>

        <h4>We Aim to Deliver the Best</h4>
        <p>
          In the world of Amazon, where online shopping, great discounts, and fast shipping are like daily food, Zemjet stands out by focusing on one thing above all: an exceptional customer experience. We go beyond just selling products by offering personalized recommendations, dedicated customer support, and a human touch in the digital age.
        </p>
        <p>
          We are dedicated to offering our customers a wide variety of high-end brands covering hand and power tools, adhesive solutions, building materials, paints, cleaning and storage items, and more, all at the best prices. At Zemjet, we’re committed to delivering more than just a product.As a small business, every customer is important to us. With over 20 years of experience in the hardware business, we know not only the top products in the market but also what our customers truly need. Zemjet is a private label brand, and we take pride in making sure you always receive the best quality, not just once, but every time. Our platform connects you directly with the seller, creating a one-on-one purchasing experience that feels personal and tailored.
          We also understand that security is a major concern when shopping online. That's why Zemjet’s e-commerce site, built by certified IT professionals, ensures that your data and personal information remain safe and secure, never used without your permission. At Zemjet, we’re not just about transactions—we’re about building trust and lasting relationships with every order.
        </p>

        <h4>Who We Are</h4>
        <h4>The Backstory of Zemjet</h4>
        <p>
          Like many businesses, the Covid-19 pandemic was a turning point for us. After working in the local hardware market for nearly 20 years, we realized that the world was evolving faster than ever. More customers were shifting to online shopping and prioritizing digital channels. But that wasn’t the only reason we made the leap.
        </p>
        <p>
          We saw a growing issue: customers on platforms like Amazon were often left frustrated—too many returns, unclear seller identities, and a lack of trust in who they were really buying from. We knew we could do better. With this vision, Zemjet was born—to connect directly with our customers and provide the value they deserve.
        </p>
        <p>
          At Zemjet, it's not just about selling hardware; it’s about quality products, a smooth and transparent checkout process, timely delivery, and dedicated customer support. We built Zemjet with one thing in mind—putting our customers first, always.
        </p>

        <h4>What We Offer</h4>
        <h3>For Individuals</h3>
        <p>
        Ever found yourself running around town, searching for the perfect hardware item for your DIY project? At Zemjet, we've put an end to the hassle. Our online hardware store is your one-stop shop for everything from building materials to paints and fixtures. Imagine having a fully stocked hardware shop right at your fingertips, ready to deliver straight to your door.
        </p>
        <ul>
          <li>DIY Hand Tools</li>
          <li>Building Materials</li>
          <li>Paints & Painting Tools</li>
          <li>Fasteners & Fixtures</li>
          <li>DIY adhesives</li>
          <li>Organizing and Storage Items</li>
          <li>Cleaning Essentials</li>
        </ul>
        <p>Whether you're looking for electronics, home goods, fashion, or the latest gadgets, we’ve got you covered. </p>

        <h3>For Professionals/Contractors</h3>
        <p>
          As a contractor, time is money. Spending hours sourcing materials can disrupt your workflow and delay projects. With Zemjet, you can streamline your operations and focus on what you do best. Our extensive collection of professional tools, adhesives, paints, and hardware ensures you have everything you need to tackle any job, big or small.
        </p>
        <ul>
          <li>Professional Power & Hand Tools</li>
          <li>Epoxy and Other Adhesives</li>
          <li>Distempers, Paints, and Painting items</li>
          <li>Furniture and Fitting Hardware</li>
          <li>Plumbing Hardware (Sanitary Range)</li>
          <li>Building Materials</li>
        </ul>
        <p>Our collection is constantly growing, ensuring that there’s always something new and exciting to discover.</p>

        <h4>Why ZEMJET?</h4>
        <p>
          When you shop with Zemjet, you’re choosing:
        </p>
        <ul>
          <li>Top-notch products handfully selected for quality and value.</li>
          <li>Affordable prices that fit your budget.</li>
          <li>Easy shopping experience with fast, reliable checkout and delivery.</li>
          <li>Customer-first approach to ensure your satisfaction every step of the way.</li>
          <li>Trending offers to help you stay ahead in experiencing innovative solutions.</li>
        </ul>

        <h4>Our Customer Commitment</h4>
        <p>
        Your satisfaction is our top priority, and we strive to offer the best possible shopping experience. From providing detailed product information to seamless checkout and ensuring fast delivery, we aim to make every step of your shopping experience hassle-free. Our friendly customer support team is always here to help if you have any questions.
        </p>
        <p>Thank you for choosing Zemjet!</p>
      </Container>
    </div>
  );
};

export default About;
