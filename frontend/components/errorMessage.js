import React from "react";
import { get } from "lodash";

const ErrorMessage = ({ message }) => {
  return (
    <p>
      <small className="error-message">{message}</small>
    </p>
  );
};

export default ErrorMessage;
