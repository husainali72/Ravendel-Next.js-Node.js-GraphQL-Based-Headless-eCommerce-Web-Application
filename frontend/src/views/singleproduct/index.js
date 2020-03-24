import React, { Fragment, useState, useEffect } from "react";
import { Grid, Container, Divider } from "@material-ui/core";
import { connect } from "react-redux";
import { productsAction } from "../../store/action/productAction";
import { isEmpty } from "../../utils/helper";
import ProductDetail from "./productdetails";
import GalleryImages from "./galleryimages";
import ProductOtherDetails from "./productotherdetail";
import Loading from "../components/loading";

const SingleProduct = props => {
  const [singleProduct, setSingleProduct] = useState(null);

  useEffect(() => {
    if (isEmpty(props.products.products)) {
      props.productsAction();
    }
  }, []);

  useEffect(() => {
    props.products.products.map(product => {
      if (product.id === props.match.params.id) {
        setSingleProduct({ ...product });
      }
    });
  }, [props.match.params.id, props.products.products]);

  return (
    <Fragment>
      {props.products.loading && <Loading />}
      {singleProduct === null ? (
        <Loading />
      ) : (
        <Fragment>
          <Grid container>
            <Grid
              item
              md={6}
              sm={12}
              xs={12}
              className="singleproduct-col singleproduct-leftside"
            >
              <GalleryImages galleryImages={singleProduct.gallery_image} />
            </Grid>
            <Grid
              item
              md={6}
              sm={12}
              xs={12}
              className="singleproduct-col singleproduct-rightside"
            >
              <ProductDetail details={singleProduct} />
            </Grid>
          </Grid>
          <Divider />
          <Container>
            <ProductOtherDetails
              details={singleProduct}
              relatedProducts={props.products.products}
            />
          </Container>
        </Fragment>
      )}
    </Fragment>
  );
};

const mapStateToProps = state => {
  return {
    products: state.products
  };
};

const mapDispatchToProps = {
  productsAction
};

export default connect(mapStateToProps, mapDispatchToProps)(SingleProduct);
