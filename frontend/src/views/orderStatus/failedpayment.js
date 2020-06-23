import React, { Fragment } from "react";
import { connect } from "react-redux";
import { Typography, Box, Container, Grid } from "@material-ui/core";
import PageTitle from "../components/pageTitle";

const PaymentFailed = (props) => {
  return (
    <Fragment>
      <PageTitle title="Payment Failed" />
      <Container>
        <Grid container className="margin-bottom-3 margin-top-3">
          <Grid item xs={12} className="text-center">
            <Typography
              variant="h1"
              className="margin-bottom-2"
              style={{ color: "red" }}
            >
              Payment Failed
            </Typography>
            <Typography variant="h4">Please Try Again Later</Typography>
          </Grid>
        </Grid>
      </Container>
    </Fragment>
  );
};

const mapStateToProps = (state) => ({
  settings: state.settings,
});

export default connect(mapStateToProps)(PaymentFailed);
