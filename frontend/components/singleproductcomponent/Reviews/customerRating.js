import PropTypes from "prop-types";
import LevelWiseRating from "./levelWiseRating";
import { FaStar } from "react-icons/fa";
const CustomerRating=({rating, levelWiseRating})=>{
    return (
        <div className="ratings">
            <div className="rating-count">
                <h2>{rating} <FaStar /></h2>
                {/* <p>{ratingCount} Verified by buyers</p> */}
            </div>
            <LevelWiseRating levelWiseRating={levelWiseRating}/>
        </div>
    )
}
CustomerRating.propTypes = {
    rating: PropTypes.number,
    ratingCount: PropTypes.number,
    levelWiseRating: PropTypes.object,
  };
export default CustomerRating