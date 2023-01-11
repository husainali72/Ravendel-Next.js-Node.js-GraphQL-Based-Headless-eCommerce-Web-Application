import React, { Fragment } from "react";
import { Typography, Box, Container, Grid } from"@mui/material";
import PageTitle from "../components/pageTitle";

const NotFound = props => {
  return (
    <Fragment>
      <PageTitle title="Not Found" />

      <Container>
        <Grid container className="margin-top-3 margin-bottom-3 text-center">
          <Grid item md={12}>
            <Typography variant="h1" component="h2">
              404
            </Typography>
            <Typography variant="h4" style={{ color: "tomato" }}>
              Page Not Found
            </Typography>
          </Grid>
        </Grid>
      </Container>
    </Fragment>
  );
};

export default NotFound;
