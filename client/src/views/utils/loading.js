import React from "react";
import { Backdrop, CircularProgress } from "@material-ui/core";
import viewStyles from "../viewStyles.js";

const Loading = () => {
  const classes = viewStyles();
  return (
    <Backdrop className={classes.backdrop} open={true}>
      <CircularProgress color="inherit" /> Loading
    </Backdrop>
  );
};

export default Loading;
