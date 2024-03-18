import React, { useState } from "react";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import ErrorMessage from "./errorMessage";
import { get } from "lodash";

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
          <VisibilityIcon
            className="password-icon"
            onClick={handleTogglePassword}
          />
        ) : (
          <VisibilityOffIcon
            className="password-icon"
            onClick={handleTogglePassword}
          />
        )}
      </div>
      <ErrorMessage message={get(errors, `${name}.message`, "")} />
    </>
  );
};

export default PasswordField;
