import React, { Fragment } from "react";
import { Typography, Box, Container, Grid } from"@mui/material";
import PageTitle from "../components/pageTitle";

const PaymentFailed = () => {
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

export default PaymentFailed;
