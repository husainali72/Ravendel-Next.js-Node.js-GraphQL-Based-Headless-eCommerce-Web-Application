/* eslint-disable no-empty */
import { useEffect, useState } from "react";
import { GET_PRODUCT_REVIEWS } from "../../../queries/productquery";
import { queryWithoutToken } from "../../../utills/helpers";
import { get } from "lodash";
import PropTypes from "prop-types";
import { FaStar } from "react-icons/fa";
import Pagination from "../../pagination";
import moment from "moment";
const CustomerReviews = ({ productId }) => {
  //   setReviews("productReviews");
  let limit = 5;
  const [reviews, setReviews] = useState([]);
  const [currentPage, setCurrentPage] = useState(0);
  const [totalPages, setTotalPages] = useState(0);
  const getCustomerReviews = async () => {
    try {
      const { data: productReviewData } = await queryWithoutToken(
        GET_PRODUCT_REVIEWS,
        { productId: productId, page: currentPage + 1, limit }
      );
      const productReviews = get(productReviewData, "productwisereview.reviews");
      const totalpages = get(productReviewData, "productwisereview.count");
      setTotalPages(Math.ceil(totalpages / limit));
      setReviews(productReviews);
    } catch (e) {}
  };
  const handlePageChange = ({ selected }) => {
    console.log(selected)
    setCurrentPage(selected);
  };
  useEffect(() => {
    getCustomerReviews();
  }, [productId, currentPage]);
  
  return (
    <>
    {
      reviews && reviews?.length > 0 &&
      <>
        <h5>Customer Reviews</h5>
        <div>
          {reviews?.map((review, i) => (
            <div className="customer-review" key={i}>
              <div className="rating">
                <p>{get(review, "rating")}</p>
                <FaStar />
              </div>
              <div className="review">
                <p>{get(review, "review")}</p>
                <div>
                  { (review.customerId.firstName || review.customerId.lastName) &&
                    <span className="name">{review.customerId.firstName} {" "} {review.customerId.lastName}</span> }
                    { (review.date) && <span>{moment(review.date).format('DD MMM YYYY')}</span>}
                </div>
              </div>
            </div>
          ))}
          {
            reviews.length > 5 &&
            <Pagination
              currentPage={currentPage}
              totalPages={totalPages}
              handlePageChange={handlePageChange}
            />
          }
        </div>
      </>
    }
    </>
  );
};
CustomerReviews.propTypes = {
  productId: PropTypes.string,
};

export default CustomerReviews;
