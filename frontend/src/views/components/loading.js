import React from "react";
import { Backdrop, CircularProgress, Typography, Box } from"@mui/material";
import { makeStyles } from"@mui/styles";

const Styles = makeStyles(theme => ({
  backdrop: {
    zIndex: 9999,
    color: "#fff"
  },
  loadingText: {
    color: "#fff",
    marginTop: 20
  }
}));

const Loading = () => {
  const classes = Styles();
  return (
    <Backdrop open={true} className={classes.backdrop}>
      <Box display="flex" flexDirection="column" alignItems="center">
        <CircularProgress color="inherit" />
        <Typography variant="h4" className={classes.loadingText}>
          Loading...
        </Typography>
      </Box>
    </Backdrop>
  );
};

export default Loading;
