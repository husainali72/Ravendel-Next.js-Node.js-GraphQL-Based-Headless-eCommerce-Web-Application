import PropTypes from "prop-types";
import ProductImage from "../imageComponent";
import { Container } from "react-bootstrap";
const CustomBanner = ({ variant }) => {
  return (
    <section>
      <Container>
        <div>
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
