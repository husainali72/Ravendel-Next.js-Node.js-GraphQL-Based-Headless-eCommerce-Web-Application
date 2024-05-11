import PropTypes from "prop-types";
import LevelWiseRating from "./levelWiseRating";
import { FaStar } from "react-icons/fa";
const CustomerRating=({rating,ratingCount,levelWiseRating})=>{
    return (
        <>
        <h1>{rating} <FaStar /></h1>
        <p>{ratingCount} Verified by buyers</p>
        <LevelWiseRating levelWiseRating={levelWiseRating}/>
        </>
    )
}
CustomerRating.propTypes = {
    rating: PropTypes.number,
    ratingCount: PropTypes.number,
    levelWiseRating: PropTypes.object,
  };
export default CustomerRating