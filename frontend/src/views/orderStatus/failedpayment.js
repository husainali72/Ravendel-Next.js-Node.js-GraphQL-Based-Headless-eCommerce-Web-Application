import React, { Fragment } from "react";
import { connect } from "react-redux";
import { Typography, Box, Container, Grid } from "@material-ui/core";

const PaymentFailed = props => {
  return (
    <Fragment>
      <Box
        component="div"
        display="flex"
        justifyContent="center"
        alignItems="center"
        className="page-header"
      >
        <Typography variant="h1">Payment Failed</Typography>
      </Box>
      <Container>
        <Grid container className="margin-bottom-3 margin-top-3">
          <Grid item xs={12} className="text-center">
            <Typography variant="h2">Please Try Again Later</Typography>
          </Grid>
        </Grid>
      </Container>
    </Fragment>
  );
};

const mapStateToProps = state => ({
  settings: state.settings
});

export default connect(mapStateToProps)(PaymentFailed);
