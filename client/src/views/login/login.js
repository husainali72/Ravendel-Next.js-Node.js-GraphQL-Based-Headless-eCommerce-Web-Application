import React, { useState } from 'react';
import { makeStyles } from '@material-ui/styles';
import {
  Grid,
  Button,
  TextField,
  Typography
} from '@material-ui/core';
import { useSelector, useDispatch } from "react-redux";
import { LoginAction } from '../../store/action';
import {Alert, Loading} from '../components';

const Login = () => {
    const classes = useStyles();
    const dispatch = useDispatch();
    const login_loading = useSelector(state => state.login.token_loading)

    const [values, setValues] = useState({
        email: "SirCumference@doe.com",
        password: "123456"
    });    

    const handleChange = prop => event => {
        setValues({ ...values, [prop]: event.target.value });
    };

    const login = e =>{
        e.preventDefault();
        dispatch(LoginAction(values.email, values.password));
    }

    return(
        <div className={classes.root}>
            <Alert />
            {login_loading? <Loading /> : null}
            <Grid className={classes.grid} container>
                <Grid className={classes.content} item lg={4} md={4} xs={12} >
                    <form className={classes.form} onSubmit={login}>
                        <Typography  className={classes.title} variant="h3" >
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
                            onChange={handleChange("email")}
                        />
                        <TextField
                            className={classes.textField}
                            fullWidth
                            label="Password"
                            name="password"
                            type="password"
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
    )
}


const useStyles = makeStyles(theme => ({
    root: {
      backgroundColor: theme.palette.background.default,
      height: '100%'
    },
    grid: {
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center'
    },
    form: {
        padding: '30px',
        backgroundColor: '#fff',
        width: '450px',
        [theme.breakpoints.down('sm')]: {
            paddingLeft: theme.spacing(2),
            paddingRight: theme.spacing(2),
            width: '90%',
            margin: '50px auto'
        }
    },
    title: {
      marginBottom: theme.spacing(4),
      textAlign: 'center'
    },
    textField: {
      marginTop: theme.spacing(2)
    },
    signInButton: {
      margin: theme.spacing(2, 0)
    }
}));
  
export default Login;