import React from "react";
import Loading from "./loading";

const CustomButton = ({ loading, buttonText, onClick, className, type }) => {
  return (
    <button
      type={type}
      className={className}
      onClick={onClick}
      disabled={loading}
    >
      <span>
        {buttonText} {loading && <Loading />}
      </span>
    </button>
  );
};

export default CustomButton;
