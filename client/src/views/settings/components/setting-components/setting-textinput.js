import React from "react";
import { TextField } from "@material-ui/core";
import viewStyles from "../../../viewStyles";
import clsx from "clsx";

const SettingTextInput = ({
  value,
  label,
  onSettingInputChange,
  otherClass,
  type,
  fullWidth,
  ...other
}) => {
  const classes = viewStyles();
  return (
    <TextField
      type={type || 'text'}
      variant='outlined'
      size='small'
      className={clsx(fullWidth ? {} : classes.settingInput, otherClass ? otherClass : {})}
      label={label}
      value={value}
      onChange={(e) => onSettingInputChange(e.target.value)}
      {...other}
      fullWidth={fullWidth}
    />
  );
};

export default SettingTextInput;
