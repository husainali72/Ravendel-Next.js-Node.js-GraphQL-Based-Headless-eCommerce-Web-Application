import Description from "./description";
import PropTypes from "prop-types";
import Specification from "./specification";
const ProductDetails = ({ product }) => {
  if (!product) {
    return null;
  }
  const { description, specifications, ratingCount } = product;
  return (
    <>
      <div className="singleproduct-detail" style={ratingCount <= 0 ? {width: '100%'} : {}} >
        {
          description &&
          <Description description={description} />
        }
        {
          specifications && specifications.length > 0 &&
          <Specification specifications={specifications} />
        }
      </div>
    </>
  );
};
ProductDetails.propTypes = {
  product: PropTypes.object,
};
export default ProductDetails;
