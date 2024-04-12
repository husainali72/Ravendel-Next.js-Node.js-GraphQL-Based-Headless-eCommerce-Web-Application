import React from "react";
import { TextField } from "@mui/material";
import viewStyles from "../../../viewStyles";
import clsx from "clsx";
import theme from "../../../../theme";
import { ThemeProvider } from "@mui/material/styles";
import { get } from "lodash";
const SettingsTextInput = ({
  value,
  label,
  onSettingInputChange,
  otherClass,
  type,
  fullWidth,
  name,
  ...other
}) => {
  const classes = viewStyles();
  return (
    <TextField
      type={type || "text"}
      variant="outlined"
      size="small"
      name={name}
      className={clsx(
        fullWidth ? {} : classes.settingInput,
        otherClass ? otherClass : {}
      )}
      label={label}
      value={value}
      onChange={(e) => {
        const name = get(e, "target.name", "");
        const value = get(e, "target.value", "");
        onSettingInputChange(value, name);
      }}
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
  name,
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
        name={name}
      />
    </ThemeProvider>
  );
};
export default SettingTextInput;
