import React, { Fragment, useState } from "react";
import { connect, useSelector, useDispatch } from "react-redux";
import {
  Typography,
  Box,
  Container,
  Grid,
  Button,
  TextField
} from"@mui/material";
import { Link } from "react-router-dom";
import {PageTitle} from '../components';
import {app_router_base_url} from '../../utils/helper';
import {LoginAction} from '../../store/action/loginAction';

const Login = props => {
  const dispatch = useDispatch();
    const login_loading = useSelector(state => state.login.token_loading)

    const [values, setValues] = useState({
        email: "",
        password: ""
    });    

    const handleChange = prop => event => {
        setValues({ ...values, [prop]: event.target.value });
    };
    
  const doLogin = e => {
    e.preventDefault();
    dispatch(LoginAction(values.email, values.password));
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
            <Link to={`${app_router_base_url}register`}>
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
                name="email"
                value={values.email}
                onChange={handleChange("email")}
                className="width-100 margin-top-1 margin-bottom-1"
                size="small"
              />

              <TextField
                type="password"
                label="Password"
                variant="outlined"
                name="password"
                value={values.password}
                onChange={handleChange("password")}
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
                <Link to={`${app_router_base_url}forgot-password`}>Forgot Your Password?</Link>
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
