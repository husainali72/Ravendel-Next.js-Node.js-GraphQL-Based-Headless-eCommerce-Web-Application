import React, { Fragment, useState, useEffect } from "react";
import { Grid, useMediaQuery } from "@material-ui/core";
import { useTheme } from "@material-ui/styles";
import { useDispatch, useSelector } from "react-redux";
import { customerAddAction } from "../../store/action/";
import viewStyles from "../viewStyles.js";
import {
  Loading,
  TextInput,
  PasswordInput,
  TopBar,
  Alert,
  CardBlocks,
} from "../components";
import {client_app_route_url} from '../../utils/helper';

var customerObj = {
  first_name: "",
  last_name: "",
  email: "",
  password: "",
  company: "",
  phone: "",
};

const AddCustomer = () => {
  const theme = useTheme();
  const isSmall = useMediaQuery(theme.breakpoints.down("sm"));
  const classes = viewStyles();
  const dispatch = useDispatch();
  const Customers = useSelector((state) => state.customers);
  const [customer, setcustomer] = useState(customerObj);

  useEffect(() => {
    document.forms[0].reset();
    setcustomer(customerObj);
  }, [Customers.customers]);

  const addCustomer = (e) => {
    e.preventDefault();
    dispatch(customerAddAction(customer));
  };

  const handleChange = (e) => {
    setcustomer({ ...customer, [e.target.name]: e.target.value });
  };

  return (
    <Fragment>
      <Alert />
      {Customers.loading && <Loading />}
      <form>
        <TopBar
          title='Add Customer'
          onSubmit={addCustomer}
          submitTitle='Add'
          backLink={`${client_app_route_url}all-customer`}
        />
        <Grid
          container
          spacing={isSmall ? 2 : 4}
          className={classes.secondmainrow}
        >
          <Grid item lg={12}>
            <CardBlocks title='Add Customer' nomargin>
              <Grid container spacing={4}>
                <Grid item md={3} sm={6} xs={12}>
                  <TextInput
                    value={customer.first_name}
                    label='First Name'
                    name='first_name'
                    onInputChange={handleChange}
                  />
                </Grid>
                <Grid item md={3} sm={6} xs={12}>
                  <TextInput
                    value={customer.last_name}
                    label='Last Name'
                    name='last_name'
                    onInputChange={handleChange}
                  />
                </Grid>
                <Grid item md={3} sm={6} xs={12}>
                  <TextInput
                    value={customer.email}
                    type='email'
                    label='Email'
                    name='email'
                    onInputChange={handleChange}
                  />
                </Grid>
                <Grid item md={3} sm={6} xs={12}>
                  <PasswordInput
                    name='password'
                    value={customer.password}
                    label='Password'
                    onInputChange={handleChange}
                  />
                </Grid>
                <Grid item md={3} sm={6} xs={12}>
                  <TextInput
                    value={customer.company}
                    label='Company'
                    name='company'
                    onInputChange={handleChange}
                  />
                </Grid>
                <Grid item md={3} sm={6} xs={12}>
                  <TextInput
                    value={customer.phone}
                    label='Phone'
                    name='phone'
                    onInputChange={handleChange}
                  />
                </Grid>
              </Grid>
            </CardBlocks>
          </Grid>
        </Grid>
      </form>
    </Fragment>
  );
};

export default AddCustomer;
