/* eslint-disable no-unused-vars */
import React from "react";
import ProgressBar from "react-bootstrap/ProgressBar";
import PropTypes from "prop-types";
import { FaStar } from "react-icons/fa";
const LevelWiseRating = ({ levelWiseRating }) => {

  const getVariantColor = (rating) => {
    switch (rating) {
      case 1:
        return "danger";
      case 2:
        return "warning";
      case 3:
        return "secondary";
      case 4:
        return "dark";
      case 5:
        return "#28a745";
    }
  };
  return (
    <div className="level-wise-ratings-progress">
      {levelWiseRating&&Object.entries(levelWiseRating)?.map(([level, rating], index) => (
        <div key={index} className="level-rating-progress">
          <p>
            {rating} <FaStar />
          </p>
          <ProgressBar
            now={(rating / 5) * 100}
            variant={getVariantColor(rating)}
            className="custom-progress-bar"
          />
        </div>
      ))}
    </div>
  );
};
LevelWiseRating.propTypes = {
  levelWiseRating: PropTypes.object,
};
export default LevelWiseRating;
