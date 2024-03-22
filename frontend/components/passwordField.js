import React, { useState } from "react";
import ErrorMessage from "./errorMessage";
import { get } from "lodash";
import PropTypes from "prop-types";
const PasswordField = ({
  errors,
  placeholder,
  registerRef,
  name,
  onChange,
  value,
  className,
  id,
  type,
}) => {
  const [showPassword, setShowPassword] = useState(false);
  const handleTogglePassword = () => {
    setShowPassword(!showPassword);
  };
  return (
    <>
      <div className="password-container">
        <input
          type={showPassword ? "text" : "password"}
          className={className}
          id={id}
          placeholder={placeholder}
          value={value}
          name={name}
          onChange={(e) => onChange(e, type)}
          ref={registerRef}
        />
        {showPassword ? (
          <i
            className="fas fa-eye password-icon "
            onClick={handleTogglePassword}
          ></i>
        ) : (
          <i
            className="fas fa-eye-slash password-icon"
            onClick={handleTogglePassword}
          ></i>
        )}
      </div>
      <ErrorMessage message={get(errors, `${name}.message`, "")} />
    </>
  );
};
PasswordField.propTypes = {
  errors: PropTypes.object.isRequired,
  placeholder: PropTypes.string.isRequired,
  registerRef: PropTypes.object,
  name: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  value: PropTypes.string.isRequired,
  className: PropTypes.string,
  id: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
};
export default PasswordField;
