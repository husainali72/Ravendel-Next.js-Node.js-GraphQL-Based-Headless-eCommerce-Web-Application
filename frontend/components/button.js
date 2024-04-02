/* eslint-disable react/prop-types */
import React from 'react';
import Loading from './loading';

const CustomButton = ( { loading, buttonText, onClick, className, type, disabled} ) => {
  return (
    <button
      type={type}
      className={className}
      onClick={onClick}
      disabled={disabled}
    >
      <span>
        {buttonText} {loading && <Loading />}
      </span>
    </button>
  );
};

export default CustomButton;
