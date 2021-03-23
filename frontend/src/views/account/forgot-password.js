import React, { Fragment } from "react";
import {
  Typography,
  Box,
  Container,
  Grid,
  TextField,
  Button
} from "@material-ui/core";
import {PageTitle} from '../components';

const ForgotPassword = () => {
  return (
    <Fragment>
      <PageTitle title="Reset Password"/>
      <Container>
        <Grid
          container
          className="margin-top-3 margin-bottom-3"
          justify="center"
        >
          <Grid item md={5} xs={12}>
            <Typography variant="h5">
              Fill in your email below to request a new password. An email will
              be sent to the address below containing a link to verify your
              email address.
            </Typography>
            <TextField
              type="email"
              label="Email"
              variant="outlined"
              name="password"
              onChange={e => console.log(e.target.value)}
              className="width-100 margin-top-1 margin-bottom-2"
              size="small"
            />

            <Box component="div" display="flex" justifyContent="center">
            <Button
              variant="contained"
              color="primary"
              type="submit"
              className="margin-bottom-2"
            >
              Reset
            </Button>
            </Box>
          </Grid>
        </Grid>
      </Container>
    </Fragment>
  );
};

export default ForgotPassword;
