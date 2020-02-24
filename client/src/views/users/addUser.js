import React, { Fragment, useState, useEffect } from "react";
import {
  Grid,
  Card,
  CardHeader,
  CardContent,
  Button,
  Backdrop,
  CircularProgress,
  TextField,
  IconButton,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Divider,
  OutlinedInput,
  InputAdornment
} from "@material-ui/core";
import { connect } from "react-redux";
import { userAddAction } from "../../store/action/";
import Alert from "../utils/Alert";
import { makeStyles } from "@material-ui/styles";
import ArrowBackIcon from "@material-ui/icons/ArrowBack";
import { Link } from "react-router-dom";
import Visibility from "@material-ui/icons/Visibility";
import VisibilityOff from "@material-ui/icons/VisibilityOff";
import clsx from "clsx";
import palette from "../../theme/palette";

const useStyles = makeStyles(theme => ({
  cancelBtn: {
    background: palette.error.dark,
    color: "#fff",
    marginLeft: theme.spacing(2)
  },
  backdrop: {
    zIndex: theme.zIndex.drawer + 1,
    color: "#fff"
  },
  mainrow: {
    padding: theme.spacing(4)
  },
  selectEmpty: {
    marginTop: theme.spacing(2)
  },
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120
  },
  width100: {
    width: "100%"
  },
  formbottom: {
    marginTop: theme.spacing(3)
  },
  secondRow: {
    marginTop: theme.spacing(3)
  }
}));

const AddUser = props => {
  const classes = useStyles();
  const [user, setuser] = useState({});
  const inputLabel = React.useRef(null);
  const [labelWidth, setLabelWidth] = React.useState(0);
  const [showPassword, setShowPassword] = useState(false);

  useEffect(() => {
    document.forms[0].reset();
    setuser({});
    setLabelWidth(inputLabel.current.offsetWidth);
  }, [props.users.users]);

  const addUser = e => {
    e.preventDefault();
    props.userAddAction(user);
  };

  const handleChange = e => {
    setuser({ ...user, [e.target.name]: e.target.value });
  };

  const fileChange = e => {
    setuser({ ...user, [e.target.name]: e.target.files[0] });
  };

  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const handleMouseDownPassword = event => {
    event.preventDefault();
  };

  return (
    <Fragment>
      <Alert />
      <Grid container spacing={4} className={classes.mainrow}>
        <Grid item lg={12}>
          <Card>
            <CardHeader
              action={
                <Link to="/all-users">
                  <IconButton aria-label="Back">
                    <ArrowBackIcon />
                  </IconButton>
                </Link>
              }
              title="Add Users"
            />
            <Divider />
            <CardContent>
              <form>
                <Grid container spacing={4}>
                  <Grid item md={3}>
                    <TextField
                      id="username"
                      label="Username"
                      name="name"
                      onChange={handleChange}
                      variant="outlined"
                      className={classes.width100}
                    />
                  </Grid>
                  <Grid item md={3}>
                    <TextField
                      type="email"
                      id="email"
                      label="Email"
                      name="email"
                      onChange={handleChange}
                      variant="outlined"
                      className={classes.width100}
                    />
                  </Grid>
                  <Grid item md={3}>
                    <FormControl
                      className={clsx(
                        classes.margin,
                        classes.textField,
                        classes.width100
                      )}
                      variant="outlined"
                    >
                      <InputLabel htmlFor="outlined-adornment-password">
                        Password
                      </InputLabel>
                      <OutlinedInput
                        id="outlined-adornment-password"
                        type={showPassword ? "text" : "password"}
                        name="password"
                        onChange={handleChange}
                        endAdornment={
                          <InputAdornment position="end">
                            <IconButton
                              aria-label="toggle password visibility"
                              onClick={handleClickShowPassword}
                              onMouseDown={handleMouseDownPassword}
                              edge="end"
                            >
                              {showPassword ? (
                                <Visibility />
                              ) : (
                                <VisibilityOff />
                              )}
                            </IconButton>
                          </InputAdornment>
                        }
                        labelWidth={70}
                      />
                    </FormControl>
                  </Grid>
                  <Grid item md={3}>
                    <FormControl
                      variant="outlined"
                      className={classes.width100}
                    >
                      <InputLabel ref={inputLabel} id="role">
                        Role
                      </InputLabel>
                      <Select
                        labelId="role"
                        id="role"
                        name="role"
                        onChange={handleChange}
                        labelWidth={labelWidth}
                      >
                        <MenuItem value="Subscriber">Subscriber</MenuItem>
                        <MenuItem value="Manager">Manager</MenuItem>
                        <MenuItem value="Editor">Editor</MenuItem>
                        <MenuItem value="Author">Author</MenuItem>
                        <MenuItem value="User">User</MenuItem>
                      </Select>
                    </FormControl>
                  </Grid>
                </Grid>
                <Grid container className={classes.secondRow}>
                  <Grid item md={3}>
                    <FormControl className={classes.width100}>
                      <TextField
                        type="file"
                        name="image"
                        onChange={fileChange}
                        className={classes.width100}
                      />
                    </FormControl>
                  </Grid>
                </Grid>
                <Grid container className={classes.formbottom}>
                  <Grid item md={12}>
                    <Button
                      color="primary"
                      variant="contained"
                      onClick={addUser}
                    >
                      Add
                    </Button>
                    <Button
                      variant="contained"
                      color="primary"
                      className={classes.cancelBtn}
                    >
                      <Link to="/all-users" style={{ color: "#fff" }}>
                        Cancel
                      </Link>
                    </Button>
                  </Grid>
                </Grid>
                {props.users.loading && (
                  <Backdrop className={classes.backdrop} open={true}>
                    <CircularProgress color="inherit" /> <br /> Loading
                  </Backdrop>
                )}
              </form>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Fragment>
  );
};

const mapStateToProps = state => {
  return { users: state.users };
};

const mapDispatchToProps = {
  userAddAction
};

export default connect(mapStateToProps, mapDispatchToProps)(AddUser);
