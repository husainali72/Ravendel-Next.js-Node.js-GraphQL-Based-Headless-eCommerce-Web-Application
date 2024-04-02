import { Container } from 'react-bootstrap';
import BreadCrumb from '../components/breadcrumb/breadcrumb';
import PageTitle from '../components/PageTitle';
const About = () => {
  return (
    <div>
      <PageTitle title="About" />
      <BreadCrumb title={'About'} />
      <Container>
        <h1>About</h1>

      </Container>
    </div>
  );
};
export default About;
