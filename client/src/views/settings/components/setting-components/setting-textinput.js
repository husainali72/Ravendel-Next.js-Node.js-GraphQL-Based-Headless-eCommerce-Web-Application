import React from "react";
import { TextField } from "@mui/material";
import viewStyles from "../../../viewStyles";
import clsx from "clsx";
import theme from "../../../../theme";
import { ThemeProvider } from "@mui/material/styles";
const SettingsTextInput = ({
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
      type={type || "text"}
      variant="outlined"
      size="small"
      className={clsx(
        fullWidth ? {} : classes.settingInput,
        otherClass ? otherClass : {}
      )}
      label={label}
      value={value}
      onChange={(e) => onSettingInputChange(e.target.value)}
      {...other}
      fullWidth={fullWidth}
    />
  );
};

const SettingTextInput = ({
  value,
  label,
  onSettingInputChange,
  otherClass,
  type,
  fullWidth,
  ...other
}) => {
  return (
    <ThemeProvider theme={theme}>
      <SettingsTextInput
        label={label}
        value={value}
        onSettingInputChange={onSettingInputChange}
        otherClass={otherClass}
        type={type}
        fullWidth={fullWidth}
        other={other}
      />
    </ThemeProvider>
  );
};
export default SettingTextInput;
