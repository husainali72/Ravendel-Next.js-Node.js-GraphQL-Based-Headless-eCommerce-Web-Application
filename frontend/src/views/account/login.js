import React, { Fragment } from "react";
import { connect } from "react-redux";
import {
  Typography,
  Box,
  Container,
  Grid,
  Button,
  TextField
} from "@material-ui/core";
import { Link } from "react-router-dom";
import {PageTitle} from '../components';

const Login = props => {
  const doLogin = e => {
    e.preventDefault();
  };
  return (
    <Fragment>
     <PageTitle title="Login"/>
      <Container>
        <Grid
          container
          alignItems="center"
          className="margin-top-3 margin-bottom-3 login-wrapper"
        >
          <Grid item md={6} sm={12} xs={12} className="login-left-col">
            <Typography variant="h2">New to our Shop?</Typography>
            <Typography variant="h5" className="margin-top-2 margin-bottom-2">
              There are advances being made in science and technology everyday,
              and a good example of this is the
            </Typography>
            <Link to="/register">
              <Button variant="contained" color="secondary">
                CREATE AN ACCOUNT
              </Button>
            </Link>
          </Grid>
          <Grid item md={6} sm={12} xs={12} className="login-right-col">
            <Typography variant="h2">Welcome Back !</Typography>
            <Typography variant="h3">Please Sign in now</Typography>
            <form onSubmit={doLogin} className="width-100 margin-top-3">
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

              <Button
                variant="contained"
                color="primary"
                type="submit"
                className="margin-bottom-2"
              >
                Login
              </Button>
              <Typography variant="button">
                <Link to="/forgot-password">Forgot Your Password?</Link>
              </Typography>
            </form>
          </Grid>
        </Grid>
      </Container>
    </Fragment>
  );
};

const mapStateToProps = state => ({
  settings: state.settings
});

export default connect(mapStateToProps)(Login);
