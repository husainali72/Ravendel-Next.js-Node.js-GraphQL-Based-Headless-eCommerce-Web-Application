import React, { Fragment, useState, useEffect } from "react";
import {
  Grid,
  Card,
  CardHeader,
  CardContent,
  Button,
  TextField,
  IconButton,
  FormControl,
  InputLabel,
  Divider,
  OutlinedInput,
  InputAdornment,
  Typography
} from "@material-ui/core";
import { connect } from "react-redux";
import { customerAddAction } from "../../store/action/";
import Alert from "../utils/Alert";
import ArrowBackIcon from "@material-ui/icons/ArrowBack";
import { Link } from "react-router-dom";
import Visibility from "@material-ui/icons/Visibility";
import VisibilityOff from "@material-ui/icons/VisibilityOff";
import clsx from "clsx";
import viewStyles from "../viewStyles.js";
import Loading from "../utils/loading";

/* var addressBookObj = {
  first_name: "",
  last_name: "",
  company: "",
  phone: "",
  address_line1: "",
  address_line2: "",
  city: "",
  country: "",
  state: "",
  pincode: "",
  default_address: false
}; */

const AddCustomer = props => {
  const classes = viewStyles();
  const [customer, setcustomer] = useState({});

  const [showPassword, setShowPassword] = useState(false);

  useEffect(() => {
    document.forms[0].reset();
    setcustomer({});
  }, [props.customers.customers]);

  const addCustomer = e => {
    e.preventDefault();
    props.customerAddAction(customer);
  };

  const handleChange = e => {
    setcustomer({ ...customer, [e.target.name]: e.target.value });
  };

  /* const addAddress = e => {
    setcustomer({
      ...customer,
      address_book: [
        ...customer.address_book,
        { [e.target.name]: e.target.value }
      ]
    });
  }; */

  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const handleMouseDownPassword = event => {
    event.preventDefault();
  };

  return (
    <Fragment>
      <Alert />
      {props.customers.loading && <Loading />}
      <form>
        <Grid container className="topbar">
          <Grid item lg={6}>
            <Typography variant="h4">
              <Link to="/all-customer">
                <IconButton aria-label="Back">
                  <ArrowBackIcon />
                </IconButton>
              </Link>
              <span style={{ paddingTop: 10 }}>Add Customer</span>
            </Typography>
          </Grid>

          <Grid item lg={6} className="text-right padding-right-2">
            <Button color="primary" variant="contained" onClick={addCustomer}>
              Add
            </Button>
            <Button
              variant="contained"
              color="primary"
              className={classes.cancelBtn}
            >
              <Link to="/all-customer" style={{ color: "#fff" }}>
                Discard
              </Link>
            </Button>
          </Grid>
        </Grid>

        <Grid container spacing={4} className={classes.secondmainrow}>
          <Grid item lg={12}>
            <Card>
              <CardHeader
                action={
                  <Link to="/all-customers">
                    <IconButton aria-label="Back">
                      <ArrowBackIcon />
                    </IconButton>
                  </Link>
                }
                title="Add Customer"
              />
              <Divider />
              <CardContent>
                <Grid container spacing={4}>
                  <Grid item md={3}>
                    <TextField
                      label="First Name"
                      name="first_name"
                      onChange={handleChange}
                      variant="outlined"
                      className={classes.width100}
                    />
                  </Grid>
                  <Grid item md={3}>
                    <TextField
                      label="Last Name"
                      name="last_name"
                      onChange={handleChange}
                      variant="outlined"
                      className={classes.width100}
                    />
                  </Grid>
                  <Grid item md={3}>
                    <TextField
                      type="email"
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
                    <TextField
                      label="Company"
                      name="company"
                      onChange={handleChange}
                      variant="outlined"
                      className={classes.width100}
                    />
                  </Grid>
                  <Grid item md={3}>
                    <FormControl className={classes.width100}>
                      <TextField
                        label="Phone"
                        name="phone"
                        onChange={handleChange}
                        variant="outlined"
                        className={classes.width100}
                        type="tel"
                      />
                    </FormControl>
                  </Grid>
                </Grid>

                {/* <Grid container className={classes.formbottom}>
                  <Grid item md={12}>
                    <Button
                      color="primary"
                      variant="contained"
                      onClick={addCustomer}
                    >
                      Add
                    </Button>
                    <Button
                      variant="contained"
                      color="primary"
                      className={classes.cancelBtn}
                    >
                      <Link to="/all-customer" style={{ color: "#fff" }}>
                        Cancel
                      </Link>
                    </Button>
                  </Grid>
                </Grid> */}
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </form>
    </Fragment>
  );
};

const mapStateToProps = state => {
  return { customers: state.customers };
};

const mapDispatchToProps = {
  customerAddAction
};

export default connect(mapStateToProps, mapDispatchToProps)(AddCustomer);
