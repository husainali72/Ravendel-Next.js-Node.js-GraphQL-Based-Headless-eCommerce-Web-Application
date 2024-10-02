import PropTypes from "prop-types";
import { Container } from "react-bootstrap";
import ProductImage from "../imageComponent";
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
