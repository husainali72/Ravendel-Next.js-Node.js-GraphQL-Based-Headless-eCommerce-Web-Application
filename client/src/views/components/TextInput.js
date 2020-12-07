import React from "react";
import { TextField } from "@material-ui/core";
import viewStyles from "../viewStyles.js";

const TextInput = ({ name, value, label, onInputChange, type, sizeSmall, ...other }) => {
  const classes = viewStyles();

  return (
    <TextField
      type={type || "text"}
      value={value}
      label={label}
      name={name}
      onChange={onInputChange}
      variant="outlined"
      fullWidth
      size={sizeSmall? "small" : 'medium'}
      {...other}
    />
  );
};

export default TextInput;
