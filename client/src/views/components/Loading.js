import React from "react";
import { Backdrop, CircularProgress, Typography } from "@mui/material";
import viewStyles from "../viewStyles.js";
import { ThemeProvider } from "@mui/material/styles";
import theme from "../../theme/index.js";
const LoadingComponent = () => {
  const classes = viewStyles();
  return (
    <Backdrop className={classes.backdrop} open={true}>
      <div className={classes.backdropInnerWrapper}>
        <CircularProgress color="inherit" />
        <Typography
          variant="h4"
          gutterBottom
          className={classes.backdropLoadingText}
        >
          Loading....
        </Typography>
      </div>
    </Backdrop>
  );
};
const Loading = () => {
  return (
    <ThemeProvider theme={theme}>
      <LoadingComponent />
    </ThemeProvider>
  );
};

export default Loading;
