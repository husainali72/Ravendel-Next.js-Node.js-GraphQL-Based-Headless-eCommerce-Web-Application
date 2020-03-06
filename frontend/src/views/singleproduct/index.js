import React, { Fragment } from "react";
import { Grid } from "@material-ui/core";
import ProductDetail from "./productdetails";
import GalleryImages from "./galleryimages";

const SingleProduct = () => {
  return (
    <Fragment>
      <Grid container>
        <Grid item md={6} className="singleproduct-col singleproduct-leftside">
          <GalleryImages />
        </Grid>
        <Grid item md={6} className="singleproduct-col singleproduct-rightside">
          <ProductDetail />
        </Grid>
      </Grid>
    </Fragment>
  );
};

export default SingleProduct;
