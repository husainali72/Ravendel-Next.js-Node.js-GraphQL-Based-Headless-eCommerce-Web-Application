import React from "react";
import { Typography, Box } from "@mui/material";
import viewStyles from "../../../viewStyles";
import theme from "../../../../theme";
import { ThemeProvider } from "@mui/material/styles";
const SettingBlockComponent = ({ label, children, noBottomMargin }) => {
  const classes = viewStyles();
  return (
    <Box component="div">
      <Typography
        variant="h5"
        className={noBottomMargin ? "" : classes.marginBottom2}
      >
        {label}
      </Typography>
      {children}
    </Box>
  );
};

const SettingBlock = ({ label, children, noBottomMargin }) => {
  return (
    <ThemeProvider theme={theme}>
      <SettingBlockComponent
        label={label}
        children={children}
        noBottomMargin={noBottomMargin}
      />
    </ThemeProvider>
  );
};
export default SettingBlock;
