import React, { useState } from "react";
import Switch from "@mui/material/Switch";

const ToggleSwitch = ({ checked, onChange, color }) => {
  return (
    <div style={{ display: "flex", alignItems: "center" }}>
      <span style={{ marginRight: "8px" }}>Live</span>
      <Switch
        checked={checked}
        onChange={onChange}
        color={color}
        inputProps={{ "aria-label": "toggle mode" }}
      />
      <span style={{ marginLeft: "8px" }}>Sandbox</span>
    </div>
  );
};

export default ToggleSwitch;
