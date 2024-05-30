import React from "react";
import get from "lodash/get";
import PropTypes from "prop-types";
import OnSaleProductCard from "./category/onSaleProductCard";
const AddionalProductDetail = ({ additionalDetail }) => {
  const products = get(additionalDetail, "products", []);
  const title = get(additionalDetail, "title",'');
  return (
    <div className="related-products-slider">
      {products.length > 0 && (
        <>
          <h5>{title}</h5>
          <OnSaleProductCard
            onSaleProduct={products}
            hideTitle
            showcaseType="slider"
          />
        </>
      )}
    </div>
  );
};
AddionalProductDetail.propTypes = {
  additionalDetail: PropTypes.array.isRequired,
};
export default AddionalProductDetail;
