import React, { useEffect, useState } from 'react'
import StarRating from '../breadcrumb/rating'
import moment from 'moment';
const convertDateToStringFormat = (date) => {
  var convertedDate = ""
  if (date) {
    convertedDate = moment(date).format('ll')
  } else {
    convertedDate = date;
  }
  return convertedDate;
};
const Reviews = ({ singleProductReview }) => {
  const [reviews, setReviews] = useState([])
  useEffect(() => {
    setReviews(singleProductReview)
  }, [singleProductReview])
  return (
    <div className='reviewContainer'>
      {reviews.length > 0 ?
        reviews.map((product, index) => {
          return <div key={index} className='singleReview'>
            <div className='usernameWidProfile'>
              <img className='userImg' src='/assets/userProfile/icons8.png' alt='img' />
              <span className='singleReviewUsername'>	{product.customerId.firstName} </span>
            </div>
            <div className='starWidTitle'>
              <StarRating className="rating" stars={product.rating} />
              <span className='reviewTitle'>{product.title}</span>
            </div>

            <p className='reviewDate'>{`Reviewed in India on ${convertDateToStringFormat(product.date)}`}</p>

            <h2 className='reviewDesc'> {product.review} </h2>

          </div>
        }) : <p className='fw-light text-muted'>There are no reviews yet. Be the first one to write one. </p>
      }
      {/* <hr className='reviewHR'/> */}
    </div>
  )
}

export default Reviews