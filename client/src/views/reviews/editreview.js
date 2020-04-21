import React, { Fragment, useState, useEffect } from "react";
import {
  Grid,
  Card,
  CardHeader,
  CardContent,
  Divider,
  IconButton,
  Typography,
  Button,
  TextField,
  Box,
  RadioGroup,
  Radio,
  FormControlLabel,
} from "@material-ui/core";
import viewStyles from "../viewStyles.js";
import Loading from "../utils/loading";
import ArrowBackIcon from "@material-ui/icons/ArrowBack";
import jumpTo from "../../utils/navigation";
import { isEmpty } from "../../utils/helper";
import Rating from "@material-ui/lab/Rating";
import { Link } from "react-router-dom";
import clsx from "clsx";
import {
  productsAction,
  customersAction,
  reviewsAction,
  reviewUpdateAction,
} from "../../store/action";
import { connect } from "react-redux";
import Select from "react-select";

const StyledRadio = (props) => {
  return (
    <Radio
      className="radioRoot"
      disableRipple
      color="default"
      checkedIcon={<span className="radioIcon radiocheckedIcon" />}
      icon={<span className="radioIcon" />}
      {...props}
    />
  );
};

var reviewObj = {
  title: "",
  customer_id: "",
  product_id: "",
  email: "",
  review: "",
  rating: "",
  status: "Pending",
  customer: {},
  product: {},
};
const EditReview = (props) => {
  const classes = viewStyles();
  const [review, setreview] = useState(reviewObj);
  const [products, setproducts] = useState([]);
  const [customers, setcustomers] = useState([]);

  useEffect(() => {
    if (!props.reviewState.reviews.length) {
      props.reviewsAction();
    }

    for (let i in props.reviewState.reviews) {
      if (props.reviewState.reviews[i].id === props.match.params.id) {
        props.customersAction();
        props.productsAction();
        setreview({
          ...review,
          ...props.reviewState.reviews[i],
          customer_id: props.reviewState.reviews[i].customer_id.id,
          product_id: props.reviewState.reviews[i].product_id.id,
          customer: {
            value: props.reviewState.reviews[i].customer_id.id,
            label: props.reviewState.reviews[i].customer_id.first_name,
          },
          product: {
            value: props.reviewState.reviews[i].product_id.id,
            label: props.reviewState.reviews[i].product_id.name,
          },
        });
        break;
      }
    }
  }, [props.reviewState.reviews]);

  useEffect(() => {
    const prodcutArr = props.productState.products.map((product) => {
      return {
        value: product.id,
        label: product.name,
      };
    });

    setproducts([...prodcutArr]);
  }, [props.productState.products]);

  useEffect(() => {
    const customerArr = props.customerState.customers.map((customer) => {
      return {
        value: customer.id,
        label: customer.first_name,
      };
    });

    setcustomers([...customerArr]);
  }, [props.customerState.customers]);

  const updateReview = () => {
    console.log(review);
    props.reviewUpdateAction(review);
  };

  const handleChange = (e) => {
    setreview({
      ...review,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <Fragment>
      {props.reviewState.loading && <Loading />}
      <Grid container className="topbar">
        <Grid item lg={6}>
          <Typography variant="h4">
            <Link to="/reviews">
              <IconButton aria-label="Back">
                <ArrowBackIcon />
              </IconButton>
            </Link>
            <span style={{ paddingTop: 10 }}>Edit Customer Review</span>
          </Typography>
        </Grid>

        <Grid item lg={6} className="text-right padding-right-2">
          <Button color="primary" variant="contained" onClick={updateReview}>
            Save
          </Button>
          <Button
            variant="contained"
            color="primary"
            className={classes.cancelBtn}
          >
            <Link to="/all-pages" style={{ color: "#fff" }}>
              Discard
            </Link>
          </Button>
        </Grid>
      </Grid>

      <Grid container spacing={4} className={classes.secondmainrow}>
        <Grid item lg={9} md={12}>
          <Box>
            <Card>
              <CardHeader title="Review Information" />
              <Divider />
              <CardContent>
                <TextField
                  type="text"
                  variant="outlined"
                  name="title"
                  label="Title"
                  className={clsx(classes.marginBottom, classes.width100)}
                  value={review.title}
                  onChange={handleChange}
                />
                <TextField
                  type="text"
                  variant="outlined"
                  name="review"
                  label="Review"
                  className={clsx(classes.marginBottom, classes.width100)}
                  multiline
                  rows="5"
                  value={review.review}
                  onChange={handleChange}
                />
              </CardContent>
            </Card>
          </Box>

          <Box mt={2}>
            <Card>
              <CardHeader title="Review Details" />
              <Divider />
              <CardContent>
                {review.product.value && (
                  <Select
                    value={review.product}
                    name="product_id"
                    onChange={(e) =>
                      setreview({
                        ...review,
                        product_id: e.value,
                        product: { value: e.value, label: e.label },
                      })
                    }
                    options={products}
                  />
                )}

                <Divider />
                <Divider />

                {review.customer.value && (
                  <Select
                    value={review.customer}
                    name="customer_id"
                    onChange={(e) =>
                      setreview({
                        ...review,
                        customer_id: e.value,
                        customer: { value: e.value, label: e.label },
                      })
                    }
                    options={customers}
                  />
                )}

                <TextField
                  type="email"
                  variant="outlined"
                  label="Email Address"
                  name="email"
                  className={clsx(classes.marginBottom, classes.width100)}
                  value={review.email}
                  onChange={handleChange}
                />

                <Box component="fieldset" mb={3} borderColor="transparent">
                  <Typography component="legend">Rating</Typography>
                  <Rating
                    name="simple-controlled"
                    value={Number(review.rating)}
                    onChange={(event, newValue) => {
                      setreview({
                        ...review,
                        rating: String(newValue),
                      });
                    }}
                  />
                </Box>
              </CardContent>
            </Card>
          </Box>
        </Grid>

        <Grid item lg={3} md={12}>
          <Card>
            <CardHeader title="Status" />
            <Divider />
            <CardContent>
              <RadioGroup
                defaultValue="Publish"
                name="status"
                onChange={handleChange}
                row
                value={review.status}
              >
                <FormControlLabel
                  value="approved"
                  control={<StyledRadio />}
                  label="Approved"
                />
                <FormControlLabel
                  value="pending"
                  control={<StyledRadio />}
                  label="Pending"
                />
              </RadioGroup>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Fragment>
  );
};

const mapStateToProps = (state) => {
  return {
    productState: state.products,
    customerState: state.customers,
    reviewState: state.reviews,
  };
};

const mapDispatchToProps = {
  productsAction,
  customersAction,
  reviewsAction,
  reviewUpdateAction,
};

export default connect(mapStateToProps, mapDispatchToProps)(EditReview);
