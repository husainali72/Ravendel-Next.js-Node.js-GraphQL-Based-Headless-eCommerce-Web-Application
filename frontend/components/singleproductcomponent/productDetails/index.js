import Description from "./description";
import PropTypes from "prop-types";
import Specification from "./specification";
const ProductDetails = ({ product }) => {
  if (!product) {
    return null;
  }
  const { description, specifications } = product;
  return (
    <>
      <div className="singleproduct-detail">
        <Description description={description} />
        <Specification specifications={specifications} />
      </div>
    </>
  );
};
ProductDetails.propTypes = {
  product: PropTypes.object,
};
export default ProductDetails;
