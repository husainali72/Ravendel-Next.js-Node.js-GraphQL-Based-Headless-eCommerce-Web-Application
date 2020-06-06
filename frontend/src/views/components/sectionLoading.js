import React from "react";
import { CircularProgress, Typography, Box } from "@material-ui/core";
import { makeStyles } from "@material-ui/styles";

const Styles = makeStyles((theme) => ({
  backdrop: {
    zIndex: 9999,
    color: "#fff",
  },
  loadingText: {
    color: "#fff",
    marginTop: 20,
  },
}));

const SectionLoading = () => {
  const classes = Styles();
  return (
    <Box display="flex" flexDirection="column" alignItems="center">
      <CircularProgress color="inherit" />
      <Typography variant="h4" className={classes.loadingText}>
        Loading...
      </Typography>
    </Box>
  );
};

export default SectionLoading;
