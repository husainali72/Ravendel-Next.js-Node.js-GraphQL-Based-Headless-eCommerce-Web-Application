import React from "react";
import PropTypes from "prop-types";
import CustomerRating from "./customerRating";
import CustomerReviews from "./customerReviews";
import { get } from "lodash";

const Reviews = ({ product }) => {
  if (!product) {
    return null; 
  }

  const { rating, ratingCount, levelWiseRating } = product;

  return (
    <div className="product-review" style={ratingCount <= 0 ? {width: 0, padding: 0, border: 'unset', height: 0} : {}}>
      <CustomerRating
        rating={rating}
        ratingCount={ratingCount}
        levelWiseRating={levelWiseRating}
        />
      <CustomerReviews productId={get(product, "_id")} />
    </div>
  );
};

Reviews.propTypes = {
  product: PropTypes.object,
};

export default Reviews;
