import React from "react";
import { Backdrop, CircularProgress, Typography } from "@material-ui/core";
import viewStyles from "../viewStyles.js";

const Loading = () => {
  const classes = viewStyles();
  return (
    <Backdrop className={classes.backdrop} open={true}>
      <div className={classes.backdropInnerWrapper}>
        <CircularProgress color="inherit" />
        <Typography variant="h4" gutterBottom className={classes.backdropLoadingText}>
          Loading....
        </Typography>     
      </div>
    </Backdrop>
  );
};

export default Loading;
