import React, { Fragment, useState, useEffect } from "react";
import {
  Grid,
  Typography,
  Box,
  RadioGroup,
  FormControlLabel,
} from "@mui/material";
import Select from "react-select";
import Rating from "@mui/material/Rating";
import {
  productsAction,
  customersAction,
  reviewsAction,
  reviewUpdateAction,
} from "../../store/action";
import { useSelector, useDispatch } from "react-redux";
import { get } from "lodash";
import {
  StyledRadio,
  Loading,
  TopBar,
  TextInput,
  CardBlocks,
} from "../components";
import viewStyles from "../viewStyles";
import { client_app_route_url, isEmpty } from "../../utils/helper";
import { ThemeProvider } from "@mui/material/styles";
import theme from "../../theme";
import { useNavigate, useParams } from "react-router-dom";
import Alerts from "../components/Alert";
import { validate } from "../components/validate";
import { ALERT_SUCCESS } from "../../store/reducers/alertReducer";
import { customStyles } from "../../theme/ReactSelectCustomStyles";
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

const EditReviewComponent = ({ params }) => {
  const Review_id = params.id || "";
  const navigate = useNavigate();
  const classes = viewStyles();
  const dispatch = useDispatch();
  const productState = useSelector((state) => state.products);
  const customerState = useSelector((state) => state.customers);
  const reviewState = useSelector((state) => state.reviews);
  const [review, setreview] = useState(reviewObj);
  const [products, setproducts] = useState([]);
  const [customers, setcustomers] = useState([]);
  const [loading, setloading] = useState(false);

  useEffect(() => {
    setloading(get(reviewState, "loading"));
  }, [get(reviewState, "loading")]);

  useEffect(() => {
    if (isEmpty(get(reviewState, "reviews"))) {
      dispatch(reviewsAction());
    } else {
      for (let i in reviewState.reviews) {
        if (reviewState.reviews && reviewState.reviews.length > 0) {
          if (reviewState.reviews[i].id === Review_id) {
            dispatch(customersAction());
            dispatch(productsAction());
            setreview({
              ...review,
              ...reviewState.reviews[i],
              customer_id: reviewState.reviews[i].customer_id.id,
              product_id: reviewState.reviews[i].product_id._id,
              customer: {
                value: reviewState.reviews[i].customer_id.id,
                label: reviewState.reviews[i].customer_id.first_name,
              },
              product: {
                value: reviewState.reviews[i].product_id._id,
                label: reviewState.reviews[i].product_id.name,
              },
            });
            break;
          }
        }
      }
    }
  }, [get(reviewState, "reviews")]);

  useEffect(() => {
    const prodcutArr = productState.products.map((product) => {
      return {
        value: product._id,
        label: product.name,
      };
    });

    setproducts([...prodcutArr]);
  }, [productState.products]);

  useEffect(() => {
    const customerArr = customerState.customers.map((customer) => {
      return {
        value: customer.id,
        label: customer.first_name,
      };
    });

    setcustomers([...customerArr]);
  }, [customerState.customers]);

  const updateReview = () => {
    var errors = validate(['email', 'review', "title"], review);
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
    else {
      dispatch(reviewUpdateAction(review, navigate));
    }

  };

  const handleChange = (e) => {
    setreview({
      ...review,
      [e.target.name]: e.target.value,
    });
  };

  const toInputLowercase = e => {
    e.target.value = ("" + e.target.value).toLowerCase();
  };

  return (
    <>
      <Alerts />
      {loading && <Loading />}

      <TopBar
        title="Edit Customer Review"
        onSubmit={updateReview}
        submitTitle="Update"
        backLink={`${client_app_route_url}reviews`}
      />


      <Grid container spacing={4} className={classes.secondmainrow}>
        <Grid item lg={9} md={12} sm={12} xs={12}>
          <CardBlocks title="Review Information" nomargin>
            <Box component="div" mb={2}>

              <TextInput
                value={review.title}
                label="Title"
                name="title"
                onInputChange={handleChange}
              />
            </Box>
            <Box component="div" mb={2}>
              <TextInput
                value={review.review}
                name="review"
                label="Review"
                onInputChange={handleChange}
              />
            </Box>
          </CardBlocks>

          <CardBlocks title="Review Details">
            {review.product.value && (
              <Box component="div" mb={2}>
                <Typography variant="h3">Product</Typography>
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
                  styles={customStyles}
                  className={classes.marginBottom}
                />
              </Box>
            )}

            {review.customer.value && (
              <Box component="div" mb={2}>
                <Typography variant="h3">Customer</Typography>

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
                  styles={customStyles}
                  className={classes.marginBottom}
                />
              </Box>
            )}

            <Box component="div" mb={2}>
            <Typography variant="h3">Email</Typography>
              <TextInput
                value={review.email}
                name="email"
                onInputChange={handleChange}
                onInput={toInputLowercase}
              />
            </Box>

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
          </CardBlocks>
        </Grid>

        <Grid item lg={3} md={12} xs={12}>
          <CardBlocks title="Status" nomargin>
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
          </CardBlocks>
        </Grid>
      </Grid>
    </>
  );
};

const EditReview = () => {
  const params = useParams();
  return (
    <ThemeProvider theme={theme}>
      <EditReviewComponent params={params} />
    </ThemeProvider>
  );
};
export default EditReview;
