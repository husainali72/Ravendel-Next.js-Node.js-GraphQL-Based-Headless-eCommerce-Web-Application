import PropTypes from "prop-types";
import { Container } from "react-bootstrap";
import ProductImage from "../imageComponent";
const CustomBanner = ({ variant }) => {
  return (
    <section className="product-cart-section banner">
      <Container className="container">
        <div className={`banner-container section-banner`}>
          <ProductImage className="banner-image" src={variant} />
        </div>
      </Container>
    </section>
  );
};
CustomBanner.propTypes = {
  variant: PropTypes.string.isRequired,
};
export default CustomBanner;
