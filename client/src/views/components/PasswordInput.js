import React, { useState } from "react";
import {
  FormControl,
  InputLabel,
  OutlinedInput,
  InputAdornment,
  IconButton,
} from "@mui/material";
import viewStyles from "../viewStyles";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import clsx from "clsx";
import { ThemeProvider } from "@mui/material/styles";
import theme from "../../theme/index.js";
const PasswordInputComponent = ({ name, value,autoComplete, label, onInputChange }) => {
  const classes = viewStyles();
  const [showPassword, setShowPassword] = useState(false);

  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  return (
    <FormControl
      className={clsx(classes.margin, classes.textField, classes.width100)}
      variant="outlined"
    >
      <InputLabel htmlFor="password-field">{label}</InputLabel>
      <OutlinedInput
        label={label}
        id="password-field"
        type={showPassword ? "text" : "password"}
        name={name}
        value={value}
        autoComplete={autoComplete}
        onChange={onInputChange}
        endAdornment={
          <InputAdornment position="end">
            <IconButton
              aria-label="toggle password visibility"
              onClick={handleClickShowPassword}
              onMouseDown={handleMouseDownPassword}
              edge="end"
            >
              {showPassword ? <VisibilityIcon /> : <VisibilityOffIcon />}
            </IconButton>
          </InputAdornment>
        }
        labelWidth={70}
      />
    </FormControl>
  );
};

const PasswordInput = ({ name, value, label, onInputChange,autoComplete }) => {
  return (
    <ThemeProvider theme={theme}>
      <PasswordInputComponent
        name={name}
        value={value}
        autoComplete={autoComplete}
        label={label}
        onInputChange={onInputChange}
      />
    </ThemeProvider>
  );
};

export default PasswordInput;
