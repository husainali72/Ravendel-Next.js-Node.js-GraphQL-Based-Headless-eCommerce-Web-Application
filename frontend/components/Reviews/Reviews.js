/* eslint-disable react/prop-types */
import React, { useEffect, useState } from "react";
import StarRating from "../breadcrumb/rating";
import { capitalize, get } from "lodash";
import ProductImage from "../imageComponent";
import PropTypes from "prop-types";
import { convertDateToStringFormat } from "../../utills/helpers";
import { useSelector } from "react-redux";

const Reviews = ({ singleProductReview }) => {
  const [reviews, setReviews] = useState([]);
  const setting = useSelector((state) => state.setting);
  useEffect(() => {
    setReviews(singleProductReview);
  }, [singleProductReview]);
  return (
    <div className="reviewContainer">
      {reviews?.length > 0 ? (
        reviews?.map((product, index) => {
          return (
            <div key={index} className="singleReview">
              <div className="usernameWidProfile">
                <ProductImage
                  className="userImg"
                  src="/assets/userProfile/icons8.png"
                  alt="img"
                />
                <span className="singleReviewUsername">
                  {" "}
                  {capitalize(get(product, "customerId.firstName"))}{" "}
                </span>
              </div>
              <div className="starWidTitle">
                <StarRating
                  className="rating"
                  stars={product?.rating}
                  singleProducts={product}
                />
                <span className="reviewTitle">
                  {capitalize(product?.title)}
                </span>
              </div>

              <p className="reviewDate">{`Reviewed in India on ${convertDateToStringFormat(
                get(product, "date", null),
                setting
              )}`}</p>

              <h2 className="reviewDesc"> {capitalize(product?.review)} </h2>
            </div>
          );
        })
      ) : (
        <p className="fw-light text-muted">
          There are no reviews yet. Be the first one to write one.{" "}
        </p>
      )}
    </div>
  );
};
Reviews.propTypes = {
  singleProductReview: PropTypes.arrayOf(PropTypes.object),
};

export default Reviews;
