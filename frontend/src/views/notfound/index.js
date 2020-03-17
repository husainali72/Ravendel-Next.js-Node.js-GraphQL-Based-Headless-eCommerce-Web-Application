import React, { Fragment } from "react";
import { connect } from "react-redux";
import { Typography, Box, Container, Grid } from "@material-ui/core";
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

const mapStateToProps = state => ({
  settings: state.settings
});

export default connect(mapStateToProps)(NotFound);
