import React from "react";
import { TextareaAutosize } from "@mui/material";
import viewStyles from "../../../viewStyles";
import theme from "../../../../theme";
import { ThemeProvider } from "@mui/material/styles";
import PropTypes from "prop-types";
const SettingsTextAreaComponent = ({
  value,
  label,
  onSettingInputChange,
  className,
  type,
  fullWidth,
  placeholder,
  name,
  minRows,
  ...other
}) => {
  return (
    <TextareaAutosize
      label={label}
      placeholder={placeholder}
      value={value}
      onChange={onSettingInputChange}
      minRows={minRows}
      className={className}
   
      {...other}
    />
  );
};

const SettingTextArea = ({
  value,
  label,
  onSettingInputChange,
  className,
  type,
  name,
  fullWidth,
  placeholder,
  minRows,
  ...other
}) => {
  return (
    <ThemeProvider theme={theme}>
      <SettingsTextAreaComponent
        label={label}
        value={value}
        onSettingInputChange={onSettingInputChange}
        className={className}
        type={type}
        fullWidth={fullWidth}
        other={other}
        name={name}
        minRows={minRows}
        placeholder={placeholder}
      />
    </ThemeProvider>
  );
};
SettingTextArea.propTypes = {
    value: PropTypes.string.isRequired,
    label: PropTypes.string.isRequired,
    onSettingInputChange: PropTypes.func.isRequired,
    otherClass: PropTypes.string,
    type: PropTypes.string,
    name: PropTypes.string,
    fullWidth: PropTypes.bool,
    placeholder: PropTypes.string,
    other: PropTypes.object, // assuming other is an object
  };
export default SettingTextArea;
