import React, { Fragment, useState } from "react";
import {
  Grid,
  Typography,
  Box,
  TableContainer,
  TableHead,
  TableBody,
  TableRow,
  Table,
  TableCell,
  TextField,
  Button,
} from "@material-ui/core";
import RelatedProducts from "../components/relatedproduct";
import Rating from "@material-ui/lab/Rating";
import { isEmpty } from "../../utils/helper";
import convertDate from "../../utils/convertDate";
import { connect } from "react-redux";
import { productAddReviewAction } from "../../store/action/productAction";

var reviewObject = {
  title: "",
  customer_id: "5e58ddd73a4cf62a50a386a9",
  product_id: "5e81acb241738428396af74d",
  email: "",
  review: "",
  rating: 0,
  status: "Pending",
};

const ProductOtherDetails = (props) => {
  const [review, setReview] = useState(reviewObject);

  const addReview = () => {
    //setReview({ ...review, product_id: props.productId });
    //console.log(review);
    props.productAddReviewAction(review);
    //setReview(reviewObject);
  };

  return (
    <Fragment>
      <section className="product-other-detail">
        <Grid container>
          {props.details.description && (
            <Grid item md={12} sm={12} xs={12}>
              <Box>
                <Box display="flex" justifyContent="center">
                  <Typography variant="h2" className="section-title">
                    description
                  </Typography>
                </Box>
                <Typography variant="body1" className="product-description">
                  <span
                    dangerouslySetInnerHTML={{
                      __html: props.details.description,
                    }}
                  ></span>
                  {/* {props.details.description} */}
                </Typography>
              </Box>
            </Grid>
          )}

          {props.details.custom_field && (
            <Grid
              item
              md={12}
              sm={12}
              xs={12}
              className="margin-top-3 margin-bottom-3 additional-inforamtion"
            >
              <Box>
                <Box display="flex" justifyContent="center">
                  <Typography variant="h2" className="section-title">
                    Additional Information
                  </Typography>
                </Box>
                <Box className="additional-info-table">
                  <TableContainer>
                    <Table>
                      <TableHead>
                        <TableRow>
                          <TableCell>Name</TableCell>
                          <TableCell>Value</TableCell>
                        </TableRow>
                      </TableHead>
                      <TableBody>
                        {props.details.custom_field.map((field, index) => (
                          <TableRow key={index}>
                            <TableCell>
                              <Typography variant="h5">{field.key}</Typography>
                            </TableCell>
                            <TableCell>
                              <Typography
                                variant="subtitle1"
                                component="h4"
                                className="text-capitalize"
                              >
                                {field.value}
                              </Typography>
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </TableContainer>
                </Box>
              </Box>
            </Grid>
          )}

          <Grid item md={12} sm={12} xs={12} className="product-reviews">
            <Box className="margin-bottom-2">
              <Box display="flex" justifyContent="center">
                <Typography variant="h2" className="section-title">
                  Product Reviews
                </Typography>
              </Box>

              <Grid container spacing={4}>
                {!isEmpty(props.reviews) ? (
                  props.reviews.map((singleReview, index) => (
                    <Grid item md={6} sm={12} xs={12} key={index}>
                      <Box
                        display="flex"
                        justifyContent="space-between"
                        borderBottom={1}
                        className="padding-bottom-1"
                      >
                        <Typography variant="button">
                          <span className="text-capitalize">
                            {singleReview.customer_id.first_name}
                          </span>{" "}
                          - {convertDate(singleReview.date)}
                        </Typography>
                        <Rating
                          name="read-only"
                          value={parseInt(singleReview.rating, 10)}
                          readOnly
                        />
                      </Box>
                      <Typography variant="subtitle2" className="padding-top-2">
                        {singleReview.review}
                      </Typography>
                    </Grid>
                  ))
                ) : (
                  <Grid item md={12}>
                    <Typography
                      variant="h3"
                      className="padding-top-2 text-center"
                    >
                      Reviews Not Available
                    </Typography>
                  </Grid>
                )}
              </Grid>
            </Box>

            <Grid item md={12} sm={12} xs={12}>
              <Box className="leave-review-wrapper">
                <Grid container spacing={2}>
                  <Grid item md={12} sm={12} xs={12}>
                    <Typography
                      variant="h3"
                      className="margin-bottom-2 text-center"
                    >
                      Leave Us A Review
                    </Typography>
                  </Grid>
                  <Grid item md={6} sm={6} xs={6}>
                    <TextField
                      type="text"
                      label="Name"
                      variant="outlined"
                      size="small"
                      className="width-100"
                      onChange={(e) =>
                        setReview({ ...review, name: e.target.value })
                      }
                    />
                  </Grid>
                  <Grid item md={6} sm={6} xs={6}>
                    <TextField
                      type="email"
                      label="Email"
                      variant="outlined"
                      size="small"
                      className="width-100"
                      onChange={(e) =>
                        setReview({ ...review, email: e.target.value })
                      }
                    />
                  </Grid>
                  <Grid item md={12} sm={12} xs={12}>
                    <Box
                      component="fieldset"
                      borderColor="transparent"
                      className="fieldset-rating"
                    >
                      <Typography component="legend">Rating</Typography>
                      <Rating
                        name="rating-val"
                        value={review.rating}
                        onChange={(event, newValue) => {
                          setReview({ ...review, rating: newValue });
                        }}
                      />
                    </Box>
                  </Grid>
                  <Grid item md={12} sm={6} xs={6}>
                    <TextField
                      type="text"
                      label="Review"
                      variant="outlined"
                      size="small"
                      className="width-100"
                      multiline
                      rows="4"
                      onChange={(e) =>
                        setReview({ ...review, review: e.target.value })
                      }
                    />
                  </Grid>
                  <Grid item md={12} xs={12} sm={12} className="text-center">
                    <Button
                      variant="contained"
                      color="primary"
                      onClick={addReview}
                    >
                      Add Review
                    </Button>
                  </Grid>
                </Grid>
              </Box>
            </Grid>
          </Grid>

          <Grid
            item
            md={12}
            sm={12}
            xs={12}
            className="related-products-wrapper"
          >
            <RelatedProducts
              relatedProduct={props.relatedProducts}
              title="Related Products"
            />
          </Grid>
        </Grid>
      </section>
    </Fragment>
  );
};

const mapStateToProps = (state) => {
  return {
    products: state.products,
  };
};

const mapDispatchToProps = {
  productAddReviewAction,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ProductOtherDetails);
