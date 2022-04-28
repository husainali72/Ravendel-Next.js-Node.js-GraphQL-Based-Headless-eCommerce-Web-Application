import React, { Fragment, useState, useEffect } from "react";
import { Grid, Divider } from "@material-ui/core";
import { useDispatch, useSelector } from "react-redux";
import {
  productsAction,
  productReviewsAction,
  singleProductAction
} from "../../store/action/productAction";
import { isEmpty } from "../../utils/helper";
import ProductDetail from "./productdetails";
import GalleryImages from "./galleryimages";
import { RelatedProducts, Loading } from "../components";

const SingleProduct = (props) => {
  const productID = props.match.params.url;
  const dispatch = useDispatch();
  const products = useSelector(state => state.products);
  const [singleProduct, setSingleProduct] = useState(null);
  const [sliderImages, setSliderImages] = useState([]);

  useEffect(() => {
    dispatch(singleProductAction(productID));
  }, [productID]);

  useEffect(() => {
    if (isEmpty(products.products)) {
      // dispatch(productsAction());
    }
  }, []);

  useEffect(() => {
    var product = products.product;
    // console.log('----------------------', product);
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

    if (product.id) {
      dispatch(productReviewsAction(product.id));
    }
    setSliderImages(allimages);
  }, [products.product]);

  return (
    <Fragment>
      {products.loading && <Loading />}
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
                reviews={products.productReviews}
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
              relatedProduct={products.products}
              title="Related Products"
            />
          </Grid>
        </Fragment>
      )}
    </Fragment>
  );
};

export default SingleProduct;
