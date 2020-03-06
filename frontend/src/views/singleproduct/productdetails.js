import React, { Fragment } from "react";
import { Button, Typography, Box, Container, Grid } from "@material-ui/core";

const ProductDetail = () => {
  return (
    <Fragment>
      <Box component="div" display="flex" className="singleproduct-wrapper">
        <Box component="div" className="singleproduct-details">
          <Typography variant="subtitle1" className="product-category">
            Category
          </Typography>
          <Typography variant="h1" className="product-title">
            Product Title
          </Typography>
          <Typography variant="h3" className="product-price">
            <span className="has-sale-price">$85.00</span>
            <span className="sale-price">$65.00</span>
          </Typography>
          <Typography variant="body1" className="product-description">
            Mauris viverra cursus ante laoreet eleifend. Donec vel fringilla
            ante. Aenean finibus velit id urna vehicula, nec maximus est
            sollicitudin.
          </Typography>
        </Box>
      </Box>
    </Fragment>
  );
};

export default ProductDetail;
