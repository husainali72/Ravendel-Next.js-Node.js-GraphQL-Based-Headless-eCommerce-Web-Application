import React from "react";
import { TextField } from "@mui/material";
import viewStyles from "../viewStyles.js";

const TextInput = ({ name, onBlur, value, label, onInputChange, type, sizeSmall, min, ...other }) => {
  return (
    <TextField
      type={type || "text"}
      value={value}
      label={label}
      name={name}
      onChange={onInputChange}
      variant="outlined"
      fullWidth
      size={sizeSmall ? "small" : 'medium'}
      onBlur={onBlur}
      InputProps={{ inputProps: { min: min } }}
      {...other}

    />
  );
};

export default TextInput;
