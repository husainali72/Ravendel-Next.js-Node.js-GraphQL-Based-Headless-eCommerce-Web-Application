import React, { useState } from "react";
import { makeStyles } from "@mui/styles";
import { ThemeProvider } from "@mui/material/styles";
import { Grid, Button, TextField, Typography } from "@mui/material";
import { useSelector, useDispatch } from "react-redux";
import { LoginAction } from "../../store/action";
import { Alert, Loading } from "../components";
import { useNavigate } from "react-router-dom";
import theme from "../../theme";
import { ALERT_SUCCESS } from "../../store/reducers/alertReducer";
import { isValidEmail, validate } from "../components/validate";
import { isEmpty } from "lodash";
const LoginComponent = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const login_loading = useSelector((state) => state.login.token_loading);
  const navigate = useNavigate();
  const [values, setValues] = useState({
    email: "",
    password: "",
  });
  const handleChange = (prop) => (event) => {
    setValues({ ...values, [prop]: event.target.value });
  };
  const login = (e) => {
    e.preventDefault();
    let errors = validate(
      [
         "password",
        "email",
       ,
      ],
      values
    );
    if (!isEmpty(errors)) {
      dispatch({
        type: ALERT_SUCCESS,
        payload: {
          boolean: false,
          message: errors,
          error: true,
        },
      });
    }else if(!isValidEmail(values.email)) {
      dispatch({
        type: ALERT_SUCCESS,
        payload: {
          boolean: false,
          message: 'Invalid email',
          error: true,
        },
      });
    }else {
      dispatch(LoginAction(values.email, values.password, navigate));
    }
  };
  return (
    <div className={classes.root}>
      <Alert />
      {login_loading ? <Loading /> : null}
      <Grid className={classes.grid} container>
        <Grid className={classes.content} item lg={4} md={4} xs={12} p={10}>
          <form className={classes.form} onSubmit={login}>
            <Typography className={classes.title} variant="h5">
              Sign in
            </Typography>
            <TextField
              className={classes.textField}
              fullWidth
              label="Email address"
              name="email"
              type="text"
              variant="outlined"
              value={values.email}
              autoComplete="off"
              onChange={handleChange("email")}
            />
            <TextField
              className={classes.textField}
              fullWidth
              label="Password"
              name="password"
              type="password"
              autoComplete="new-password"
              variant="outlined"
              value={values.password}
              onChange={handleChange("password")}
            />
            <Button
              className={classes.signInButton}
              color="primary"
              fullWidth
              size="large"
              type="submit"
              variant="contained"
            >
              Log in
            </Button>
          </form>
        </Grid>
      </Grid>
    </div>
  );
};

const useStyles = makeStyles((theme) => ({
  root: {
    height: "100%",
  },
  grid: {
    height: "100%",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",

    backgroundColor: "#F4F6F8",
  },

  form: {
    backgroundColor: "#fff",
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: "column",
    width: "520px",
    height: "350px",
    backgroundColor: "#fff",
  },
  title: {
    marginBottom: theme.spacing(4),
    textAlign: "center",
    marginTop: "100px",

    "&&": {
      marginBottom: theme.spacing(4),

      textAlign: "center",

      marginBottom: "10px",
    },
  },
  textField: {
    "&&": {
      width: "430px",
      margin: "10px",
      marginRight: "10px",
      marginTop: "20px",
    },
  },
  signInButton: {
    "&&": {
      width: "430px",
      margin: "10px",
      marginRight: "15px",
      marginTop: "20px",
    },
    "&:hover": {},
  },
}));

export default function Login() {
  return (
    <ThemeProvider theme={theme}>
      <LoginComponent />
    </ThemeProvider>
  );
}
