import React, { useState } from "react";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";

const PasswordField = ({ handlePassword, value }) => {
  const [showPassword, setShowPassword] = useState(false);

  const handlePasswordChange = (e) => {
    handlePassword(e);
  };

  const handleTogglePassword = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div className="password-container">
      <input
        type={showPassword ? "text" : "password"}
        className="form-control"
        id="password"
        placeholder="Password"
        value={value}
        onChange={handlePasswordChange}
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
  );
};

export default PasswordField;
