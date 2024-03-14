import React from "react";
import { get } from "lodash";

const ErrorMessage = ({ message }) => {
  return (
    <p>
      <small style={{ color: "red" }}>{message}</small>
    </p>
  );
};

export default ErrorMessage;
