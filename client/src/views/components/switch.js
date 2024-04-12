import React from "react";
import PropTypes from "prop-types";
import Switch from "@mui/material/Switch";
import Box from "@mui/material/Box";
import viewStyles from "../viewStyles";

const ToggleSwitch = ({ checked, onChange, color }) => {
  const classes = viewStyles();
  return (
    <Box className={classes.toggleBtn}>
      <span className={classes.toggleBtnLable}>Live</span>
      <Switch
        checked={checked}
        onChange={onChange}
        color={color}
        inputProps={{ "aria-label": "toggle mode" }}
      />
      <span className={classes.toggleBtnLable}>Sandbox</span>
    </Box>
  );
};

ToggleSwitch.propTypes = {
  checked: PropTypes.bool.isRequired,
  onChange: PropTypes.func.isRequired,
};

export default ToggleSwitch;
