import React from "react";
import { Grid, Typography } from "@material-ui/core";

const NotFound = () => {
  return (
    <Grid
      container
      direction="column"
      justify="center"
      alignItems="center"
      style={{ height: "calc(100% - 50px)" }}
    >
      <Typography variant="h1" className="marginBottom2">
        Oops!
      </Typography>
      <Typography variant="h4" className="marginBottom2">
        404 Not Found
      </Typography>
      <Typography variant="body1" className="marginBottom2">
        Sorry, an error has occured, Requested page not found!
      </Typography>
    </Grid>
  );
};

export default NotFound;
