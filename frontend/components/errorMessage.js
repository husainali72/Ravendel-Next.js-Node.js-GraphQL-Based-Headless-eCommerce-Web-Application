/* eslint-disable react/prop-types */
import React from 'react';

const ErrorMessage = ( { message } ) => {
  return (
    <p>
      <small className="error-message">{message}</small>
    </p>
  );
};

export default ErrorMessage;
