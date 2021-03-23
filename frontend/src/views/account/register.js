import React, { Fragment } from "react";
import {
  Typography,
  Container,
  Grid,
  Button,
  TextField
} from "@material-ui/core";
import { Link } from "react-router-dom";
import {PageTitle} from '../components';

const Register = () => {
  const doRegister = e => {
    e.preventDefault();
  };
  return (
    <Fragment>
      <PageTitle title="Register" />
      <Container>
        <Grid
          container
          className="margin-top-3 margin-bottom-3 register-wrapper"
          justify="center"
        >
          <Grid item md={6} xs={12}>
            <form onSubmit={doRegister} className="width-100 margin-top-3">
              <Typography variant="h4" className="margin-bottom-2">
                Create Account
              </Typography>
              <TextField
                label="Username or Email"
                variant="outlined"
                name="username"
                onChange={e => console.log(e.target.value)}
                className="width-100 margin-top-1 margin-bottom-1"
                size="small"
              />

              <TextField
                type="password"
                label="Password"
                variant="outlined"
                name="password"
                onChange={e => console.log(e.target.value)}
                className="width-100 margin-top-1 margin-bottom-2"
                size="small"
              />

              <TextField
                type="password"
                label="Confirm Password"
                variant="outlined"
                name="confirm-password"
                onChange={e => console.log(e.target.value)}
                className="width-100 margin-top-1 margin-bottom-2"
                size="small"
              />

              <Button
                variant="contained"
                color="primary"
                type="submit"
                className="margin-bottom-2"
              >
                Register
              </Button>
              <Typography variant="button">
                <Link to="/login">Already member ?</Link>
              </Typography>
            </form>
          </Grid>
        </Grid>
      </Container>
    </Fragment>
  );
};

export default Register;
