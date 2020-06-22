import React, { Fragment, useState } from "react";
import { connect } from "react-redux";
import {
  Typography,
  Box,
  Container,
  Grid,
  TextField,
  Button,
  Input,
} from "@material-ui/core";
import { Link } from "react-router-dom";
import OrderDetails from "./orderdetail";
import BillingForm from "./billingform";
import PageTitle from "../components/pageTitle";
import { useForm } from "react-hook-form";

const Checkout = (props) => {
  const { register, errors, handleSubmit } = useForm({
    mode: "onChange", // onBlur, onSubmit
  });
  const [billingDetails, setBillingDetails] = useState({});

  const Login = (e) => {
    e.preventDefault();
  };

  const Billing = (data) => {
    //console.log("data", JSON.stringify(data));
    console.log("billingDetails", billingDetails);
  };

  const getBillingData = (val) => {
    setBillingDetails({ ...billingDetails, ...val });
  };

  const getOrderDetailsData = (val) => {
    setBillingDetails({ ...billingDetails, ...val });
  };

  return (
    <Fragment>
      <PageTitle title="Checkout" />
      {props.cart.products && props.cart.products.length ? (
        <Container>
          <Box className="checkout-wrapper" component="div">
            <Grid container>
              <Grid item md={12} className="login-section">
                <Typography variant="body1" className="login-heading">
                  If you have shopped with us before, please enter your details
                  in the boxes below. If you are a new customer, please proceed
                  to the Billing and Shipping section.
                </Typography>
                <form onSubmit={Login}>
                  <TextField
                    label="Username or Email"
                    name="username"
                    variant="outlined"
                    size="small"
                  />
                  <TextField
                    label="Password"
                    type="password"
                    name="password"
                    variant="outlined"
                    size="small"
                  />
                  <Button variant="contained" color="primary" type="submit">
                    Login
                  </Button>
                </form>
              </Grid>

              <form onSubmit={handleSubmit(Billing)}>
                <Grid
                  container
                  spacing={4}
                  className="margin-top-3 margin-bottom-3"
                >
                  <Grid item md={12} sm={12} xs={12}>
                    <Typography
                      variant="h3"
                      className="margin-top-2 margin-bottom-2"
                    >
                      Have a coupon code?
                    </Typography>
                    <TextField
                      label="Coupon Code"
                      name="coupon-code"
                      variant="outlined"
                      size="small"
                    />
                    <Button
                      variant="contained"
                      color="primary"
                      className="margin-left-1"
                    >
                      Apply
                    </Button>
                  </Grid>
                  <Grid item md={7} sm={12} xs={12}>
                    <BillingForm
                      registerRef={register}
                      errorRef={errors}
                      getBillingInfo={getBillingData}
                    />
                  </Grid>
                  <Grid item md={5} sm={12} xs={12}>
                    <OrderDetails getOrderDetails={getOrderDetailsData} />
                  </Grid>
                </Grid>
              </form>
            </Grid>
          </Box>
        </Container>
      ) : (
        <Grid container justify="center">
          <Grid
            item
            md={12}
            className="margin-top-3 margin-bottom-3 text-center"
          >
            <Typography variant="h3" className="margin-bottom-1">
              Your cart is currently empty.
            </Typography>
            <Link to="/shop">
              <Button variant="contained" color="primary">
                Shop Now
              </Button>
            </Link>
          </Grid>
        </Grid>
      )}
    </Fragment>
  );
};

const mapStateToProps = (state) => ({
  cart: state.cart,
});

export default connect(mapStateToProps)(Checkout);
