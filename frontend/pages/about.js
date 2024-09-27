import { Container } from 'react-bootstrap';
import BreadCrumb from '../components/breadcrumb/breadcrumb';
import PageTitle from '../components/PageTitle';
import Meta from '../components/Meta';
const About = () => {
  const siteTitle = process.env.NEXT_PUBLIC_BRAND_TITLE || "";
  return (
    <div>
      <Meta title='About - Your Next Door Hardware Shop' description={`${siteTitle}  is your trusted online hardware shop, offering quality tools, materials, and home improvement essentials at affordable prices. Enjoy convenient shopping with fast delivery and secure payment gateway.`} />
      <PageTitle title="About" />
      <BreadCrumb title={'About'} />
      <Container>
        <h1>About</h1>

      </Container>
    </div>
  );
};
export default About;
