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
  Button
} from "@material-ui/core";
import RelatedProducts from "../components/relatedproduct";
import Rating from "@material-ui/lab/Rating";

const ProductOtherDetails = props => {
  const [ratingVal, setRatingVal] = useState(0);

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
                      __html: props.details.description
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
            <Box>
              <Box display="flex" justifyContent="center">
                <Typography variant="h2" className="section-title">
                  Product Reviews
                </Typography>
              </Box>

              <Grid container spacing={4}>
                <Grid item md={6} sm={12} xs={12}>
                  <Box
                    display="flex"
                    justifyContent="space-between"
                    borderBottom={1}
                    className="padding-bottom-1"
                  >
                    <Typography variant="button">
                      John Doe - June 16 2020
                    </Typography>
                    <Rating name="read-only" value={1} readOnly />
                  </Box>
                  <Typography variant="subtitle2" className="padding-top-2">
                    Mauris viverra cursus ante laoreet eleifend. Donec vel
                    fringilla ante. Aenean finibus velit id urna vehicula, nec
                    maximus est sollicitudin.Mauris viverra cursus ante laoreet
                    eleifend.
                  </Typography>
                </Grid>

                <Grid item md={6} sm={12} xs={12}>
                  <Box
                    display="flex"
                    justifyContent="space-between"
                    borderBottom={1}
                    className="padding-bottom-1"
                  >
                    <Typography variant="button">
                      Sam Rosenberg - Dec 11, 2018
                    </Typography>
                    <Rating name="read-only" value={3} readOnly />
                  </Box>
                  <Typography variant="subtitle2" className="padding-top-2">
                    Mauris viverra cursus ante laoreet eleifend. Donec vel
                    fringilla ante. Aenean finibus velit id urna vehicula, nec
                    maximus est sollicitudin.Mauris viverra cursus ante laoreet
                    eleifend. Aenean finibus velit id urna vehicula, nec maximus
                    est sollicitudin.Mauris viverra cursus ante laoreet
                    eleifend. Mauris viverra cursus ante laoreet eleifend. Donec
                    vel fringilla ante. Aenean finibus velit id urna vehicula,
                    nec maximus est sollicitudin.Mauris viverra cursus ante
                    laoreet eleifend. Aenean finibus velit id urna vehicula, nec
                    maximus est sollicitudin.Mauris viverra cursus ante laoreet
                    eleifend.
                  </Typography>
                </Grid>

                <Grid item md={6} sm={12} xs={12}>
                  <Box
                    display="flex"
                    justifyContent="space-between"
                    borderBottom={1}
                    className="padding-bottom-1"
                  >
                    <Typography variant="button">
                      Applewood Orchards - Sep 16, 2018
                    </Typography>
                    <Rating name="read-only" value={5} readOnly />
                  </Box>
                  <Typography variant="subtitle2" className="padding-top-2">
                    Mauris viverra cursus ante laoreet eleifend. Donec vel
                    fringilla ante.
                  </Typography>
                </Grid>

                <Grid item md={6} sm={12} xs={12}>
                  <Box
                    display="flex"
                    justifyContent="space-between"
                    borderBottom={1}
                    className="padding-bottom-1"
                  >
                    <Typography variant="button">
                      Dov Breuer - May 14, 2019
                    </Typography>
                    <Rating name="read-only" value={4} readOnly />
                  </Box>
                  <Typography variant="subtitle2" className="padding-top-2">
                    Mauris viverra cursus ante laoreet eleifend. Donec vel
                    fringilla ante. Aenean finibus velit id urna vehicula, nec
                    maximus est sollicitudin.Mauris viverra cursus ante laoreet
                    eleifend.
                  </Typography>
                </Grid>
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
                    />
                  </Grid>
                  <Grid item md={6} sm={6} xs={6}>
                    <TextField
                      type="email"
                      label="Email"
                      variant="outlined"
                      size="small"
                      className="width-100"
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
                        value={ratingVal}
                        onChange={(event, newValue) => {
                          setRatingVal(newValue);
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
                    />
                  </Grid>
                  <Grid item md={12} xs={12} sm={12} className="text-center">
                    <Button variant="contained" color="primary">
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

export default ProductOtherDetails;
