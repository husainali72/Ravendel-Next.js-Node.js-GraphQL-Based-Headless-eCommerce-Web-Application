import React, { Fragment } from "react";
import { connect } from "react-redux";
import {
  Typography,
  Box,
  Container,
  Grid,
  TextField,
  Button
} from "@material-ui/core";

const ForgotPassword = props => {
  return (
    <Fragment>
      <Box
        component="div"
        display="flex"
        justifyContent="center"
        alignItems="center"
        className="page-header"
      >
        <Typography variant="h1">Reset Password</Typography>
      </Box>
      <Container>
        <Grid
          container
          className="margin-top-3 margin-bottom-3"
          justify="center"
        >
          <Grid item md={6} xs={12}>
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
            />

            <Button
              variant="contained"
              color="primary"
              type="submit"
              className="margin-bottom-2"
            >
              Reset
            </Button>
          </Grid>
        </Grid>
      </Container>
    </Fragment>
  );
};

const mapStateToProps = state => ({
  settings: state.settings
});

export default connect(mapStateToProps)(ForgotPassword);
