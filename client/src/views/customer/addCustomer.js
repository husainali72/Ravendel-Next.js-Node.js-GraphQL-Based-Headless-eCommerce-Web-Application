import React, { Fragment, useState, useEffect } from "react";
import { Grid, useMediaQuery } from "@mui/material";
import { useTheme } from "@mui/styles";
import { useDispatch, useSelector } from "react-redux";
import { customerAddAction } from "../../store/action/";
import MuiPhoneNumber from "material-ui-phone-number";
import viewStyles from "../viewStyles.js";
import {
  Loading,
  TextInput,
  PasswordInput,
  TopBar,
  Alert,
  CardBlocks,
} from "../components";
import { client_app_route_url } from "../../utils/helper";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import theme from "../../theme/index";
import { validate } from "../components/validate";
import { isEmpty } from "../../utils/helper";
import { ALERT_SUCCESS } from "../../store/reducers/alertReducer";
import { useNavigate } from "react-router-dom";
var customerObj = {
  first_name: "",
  last_name: "",
  email: "",
  password: "",
  company: "",
  phone_number: "",
};

const AddCustomerComponent = () => {
  const theme = useTheme();
  const isSmall = useMediaQuery(theme.breakpoints.down("sm"));
  const classes = viewStyles();
  const dispatch = useDispatch();
  const Customers = useSelector((state) => state.customers);
  const [customer, setcustomer] = useState(customerObj);
  const [phoneValue, setPhoneValue] = useState("");
  const navigate = useNavigate()

  useEffect(() => {
    document.forms[0].reset();
    setcustomer(customerObj);
  }, [Customers.customers]);

  const addCustomer = (e) => {
    e.preventDefault();

    var errors = validate(['company', "phone_number", "email", "last_name", "first_name"], customer);

    if (!isEmpty(errors)) {
      dispatch({
        type: ALERT_SUCCESS,
        payload: {
          boolean: false,
          message: errors,
          error: true,
        },
      });
    }

    if (isEmpty(errors)) {
      customer.phone = phoneValue
      dispatch(customerAddAction(customer, navigate(`${client_app_route_url}all-customer`)));
    }
  };

  const handleChange = (e) => {
    setcustomer({ ...customer, [e.target.name]: e.target.value });
  };

  const handleOnChange = (value) => {
    setPhoneValue(value);
  }

  const toInputLowercase = e => {
    e.target.value = ("" + e.target.value).toLowerCase();
  };

  return (
    <>
      <Alert />
      {Customers.loading && <Loading />}
      <form>
        <TopBar
          title="Add Customer"
          onSubmit={addCustomer}
          submitTitle="Add"
          backLink={`${client_app_route_url}all-customer`}
        />
        <Grid
          container
          spacing={isSmall ? 2 : 4}
          className={classes.secondmainrow}
        >
          <Grid item lg={12}>
            <CardBlocks title="Add Customer" nomargin>
              <Grid container spacing={4}>
                <Grid item md={3} sm={6} xs={12}>
                  <TextInput
                    value={customer.first_name}
                    label="First Name"
                    name="first_name"
                    onInputChange={handleChange}
                  />
                </Grid>
                <Grid item md={3} sm={6} xs={12}>
                  <TextInput
                    value={customer.last_name}
                    label="Last Name"
                    name="last_name"
                    onInputChange={handleChange}
                  />
                </Grid>
                <Grid item md={3} sm={6} xs={12}>
                  <TextInput
                    value={customer.email}
                    type="email"
                    label="Email"
                    name="email"
                    onInputChange={handleChange}
                    onInput={toInputLowercase}
                  />
                </Grid>
                <Grid item md={3} sm={6} xs={12}>
                  <PasswordInput
                    name="password"
                    value={customer.password}
                    label="Password"
                    onInputChange={handleChange}
                  />
                </Grid>
                <Grid item md={3} sm={6} xs={12}>
                  <TextInput
                    value={customer.company}
                    label="Company"
                    name="company"
                    onInputChange={handleChange}
                  />
                </Grid>
                <Grid item md={3} sm={6} xs={12}>
                  <MuiPhoneNumber 
                    value= {customer.phone}
                    defaultCountry={"us"}
                    label="Phone"
                    name="phone"
                    variant="outlined"
                    onChange={handleOnChange}
                  />
                </Grid>
              </Grid>
            </CardBlocks>
          </Grid>
        </Grid>
      </form>
    </>
  );
};

export default function AddCustomer() {
  return (
    <ThemeProvider theme={theme}>
      <AddCustomerComponent />
    </ThemeProvider>
  );
}
