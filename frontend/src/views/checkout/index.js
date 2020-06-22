import React, { Fragment } from "react";
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
  const { register, errors, handleSubmit } = useForm();
  const onSubmit = (data) => console.log(data);

  const Login = (e) => {
    e.preventDefault();
  };

  // const Billing = (e) => {
  //   e.preventDefault();
  // };

  const Billing = (data) => {
    console.log("data", data);
  };

  return (
    <Fragment>
      <PageTitle title="Checkout" />
      {props.cart.products && props.cart.products.length ? (
        <Container>
          {/* <form onSubmit={handleSubmit(onSubmit)}>
            <TextField
              inputRef={register({ required: true, maxLength: 20 })}
              label="First Name"
              name="firstName"
            />
            {errors.firstName?.type === "required" && "First Name is required"}
            {errors.firstName?.type === "maxLength" &&
              "First Name exceed maxLength"}
            <TextField
              inputRef={register({ required: true })}
              label="Last Name"
              name="lastName"
            />
            {errors.lastName && "Last name is required"}
            <TextField
              inputRef={register({ required: true, min: 18, max: 99 })}
              label="Age"
              name="age"
              type="number"
            />
            {errors.age?.type === "required" && "age is required"}
            {errors.age?.type === "max" && "age max 99"}
            {errors.age?.type === "min" && "age min 18"}
            <input type="submit" />
          </form> */}

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
                    <BillingForm registerRef={register} errorRef={errors} />
                  </Grid>
                  <Grid item md={5} sm={12} xs={12}>
                    <OrderDetails />
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
