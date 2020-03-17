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

  const products = [
    {
      featured_image:
        "https://colorlib.com/preview/theme/essence/img/bg-img/bg-2.jpg",
      title: "Product First",
      price: 12,
      category: "category",
      description: "Product first lorem ipsom dolr sit"
    },
    {
      featured_image:
        "https://colorlib.com/preview/theme/essence/img/bg-img/bg-4.jpg",
      title: "Product Second",
      price: 12,
      category: "category",
      description: "Product second lorem ipsom dolr sit",
      sale_price: 10
    },
    {
      featured_image:
        "https://colorlib.com/preview/theme/essence/img/bg-img/bg-3.jpg",
      title: "Product Third",
      price: 12,
      category: "category",
      description: "Product third lorem ipsom dolr sit"
    },
    {
      featured_image:
        "https://colorlib.com/preview/theme/essence/img/bg-img/bg-2.jpg",
      title: "Product Fourth",
      price: 12,
      category: "category",
      description: "Product first lorem ipsom dolr sit"
    },
    {
      featured_image:
        "https://colorlib.com/preview/theme/essence/img/bg-img/bg-4.jpg",
      title: "Product Fifth",
      price: 12,
      category: "category",
      description: "Product second lorem ipsom dolr sit",
      sale_price: 10
    },
    {
      featured_image:
        "https://colorlib.com/preview/theme/essence/img/bg-img/bg-3.jpg",
      title: "Product Sixth",
      price: 12,
      category: "category",
      description: "Product third lorem ipsom dolr sit"
    }
  ];

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
                  {props.details.description}
                </Typography>
              </Box>
            </Grid>
          )}

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
                      <TableRow>
                        <TableCell>
                          <Typography variant="h5">Color</Typography>
                        </TableCell>
                        <TableCell>
                          <Typography variant="subtitle1" component="h4">
                            Black, Blue, Red
                          </Typography>
                        </TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell>
                          <Typography variant="h5">Size</Typography>
                        </TableCell>
                        <TableCell>
                          <Typography variant="subtitle1" component="h4">
                            M, L, XL, XXL
                          </Typography>
                        </TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell>
                          <Typography variant="h5">Material</Typography>
                        </TableCell>
                        <TableCell>
                          <Typography variant="subtitle1" component="h4">
                            ABC
                          </Typography>
                        </TableCell>
                      </TableRow>
                    </TableBody>
                  </Table>
                </TableContainer>
              </Box>
            </Box>
          </Grid>

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
              relatedProduct={products}
              title="Related Products"
            />
          </Grid>
        </Grid>
      </section>
    </Fragment>
  );
};

export default ProductOtherDetails;
