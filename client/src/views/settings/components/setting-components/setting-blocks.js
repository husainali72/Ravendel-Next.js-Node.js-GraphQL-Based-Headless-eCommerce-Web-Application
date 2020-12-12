import React from "react";
import { Typography, Box } from "@material-ui/core";
import viewStyles from "../../../viewStyles";

const SettingBlock = ({ label, children, noBottomMargin }) => {
  const classes = viewStyles();
  return (
    <Box component='div'>
      <Typography variant='h5' className={noBottomMargin ? '' : classes.marginBottom2}>
        {label}
      </Typography>
      {children}
    </Box>
  );
};

export default SettingBlock;
