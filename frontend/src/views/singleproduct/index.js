import React, { Fragment, useState, useEffect } from "react";
import { Grid, Container, Divider } from "@material-ui/core";
import { connect } from "react-redux";
import {
  productsAction,
  productAction,
  productReviewsAction,
} from "../../store/action/productAction";
import { isEmpty } from "../../utils/helper";
import ProductDetail from "./productdetails";
import GalleryImages from "./galleryimages";
import RelatedProducts from "../components/relatedproduct";
import Loading from "../components/loading";

const SingleProduct = (props) => {
  const [singleProduct, setSingleProduct] = useState(null);
  const [sliderImages, setSliderImages] = useState([]);

  useEffect(() => {
    props.productAction(props.match.params.id);
    props.productReviewsAction(props.match.params.id);
  }, [props.match.params.id]);

  useEffect(() => {
    if (isEmpty(props.products.products)) {
      props.productsAction();
    }
  }, []);

  useEffect(() => {
    var product = props.products.product;

    setSingleProduct(product);

    var allimages = [];
    if (product.feature_image) {
      allimages.push(product.feature_image);
    }
    if (product.gallery_image) {
      product.gallery_image.map((img) => {
        allimages.push(img);
      });
    }
    setSliderImages(allimages);
  }, [props.products.product]);

  return (
    <Fragment>
      {props.products.loading && <Loading />}
      {isEmpty(singleProduct) ? (
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
              {/* <GalleryImages galleryImages={singleProduct.gallery_image} /> */}
              <GalleryImages galleryImages={sliderImages} />
            </Grid>
            <Grid
              item
              md={6}
              sm={12}
              xs={12}
              className="singleproduct-col singleproduct-rightside"
            >
              <ProductDetail
                details={singleProduct}
                reviews={props.products.productReviews}
              />
            </Grid>
          </Grid>
          <Divider />
          <Grid
            item
            md={12}
            sm={12}
            xs={12}
            className="related-products-wrapper"
          >
            <RelatedProducts
              relatedProduct={props.products.products}
              title="Related Products"
            />
          </Grid>
        </Fragment>
      )}
    </Fragment>
  );
};

const mapStateToProps = (state) => {
  return {
    products: state.products,
  };
};

const mapDispatchToProps = {
  productAction,
  productsAction,
  productReviewsAction,
};

export default connect(mapStateToProps, mapDispatchToProps)(SingleProduct);
