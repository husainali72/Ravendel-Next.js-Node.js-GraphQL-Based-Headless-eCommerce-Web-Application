import React from "react";
import { Radio } from "@mui/material";
import theme from "../../theme/index.js";
import { ThemeProvider } from "@mui/material/styles";

const StyledRadioConmponent = (props) => {
  return (
    <Radio
      className="radioRoot"
      disableRipple
      color="default"
      checkedIcon={<span className="radioIcon radiocheckedIcon" />}
      icon={<span className="radioIcon" />}
      {...props}
    />
  );
};

const StyledRadio = ({ name, value, label, onInputChange }) => {
  return (
    <ThemeProvider theme={theme}>
      <StyledRadioConmponent
        name={name}
        value={value}
        label={label}
        onInputChange={onInputChange}
      />
    </ThemeProvider>
  );
};

export default StyledRadio;
