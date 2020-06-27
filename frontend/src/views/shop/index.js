import React, { Fragment, useState, useEffect } from "react";
import { connect } from "react-redux";
import { Container, Grid, Typography } from "@material-ui/core";
import ProductCard from "../components/productcard";
import PageTitle from "../components/pageTitle";
import {
  productsAction,
  categoriesAction,
} from "../../store/action/productAction";
import { isEmpty } from "../../utils/helper";
import Loading from "../components/loading";
import FilterSideBar from "../components/filtersidebar";

const Shop = (props) => {
  const [fillterProducts, setFillterProducts] = useState([]);
  const [priceRange, setPriceRange] = React.useState([0, 2000]);

  useEffect(() => {
    if (isEmpty(props.products.products)) {
      props.productsAction();
    }
  }, []);

  useEffect(() => {
    if (isEmpty(props.products.categories)) {
      props.categoriesAction();
    }
  }, []);

  const fillterShopProducts = (newValue) => {
    setPriceRange(newValue);
    let filteredProducts = props.products.products.filter(
      (product) =>
        product.pricing.price >= newValue[0] &&
        product.pricing.price <= newValue[1]
    );
    setFillterProducts(filteredProducts);
  };

  useEffect(() => {
    if (!isEmpty(props.products.products)) {
      fillterShopProducts(priceRange);
    }
  }, [props.products.products]);

  return (
    <Fragment>
      {props.products.loading && <Loading />}
      <PageTitle title="Shop" />
      <Container>
        <Grid container className="shop-row" spacing={4}>
          <Grid item lg={3} md={4} sm={4} xs={12} className="left-sidebar">
            <FilterSideBar
              onPriceChange={(newValue) => fillterShopProducts(newValue)}
            />
          </Grid>

          <Grid item lg={9} md={8} sm={8} xs={12} className="right-sidebar">
            <Grid container spacing={4}>
              {!isEmpty(fillterProducts) ? (
                fillterProducts
                  .sort((a, b) => (a.pricing.price > b.pricing.price ? 1 : -1))
                  .map((product, index) => (
                    <Fragment key={index}>
                      {product.status === "Publish" && (
                        <Grid item lg={4} md={6} sm={6} xs={6}>
                          <ProductCard
                            productDetail={product}
                            categories={props.products.categories}
                            index={index}
                            key={index}
                            GirdProductView={true}
                          />
                        </Grid>
                      )}
                    </Fragment>
                  ))
              ) : (
                <Grid item md={12}>
                  <Typography variant="h3" className="text-center">
                    No Products Available
                  </Typography>
                </Grid>
              )}
            </Grid>
          </Grid>
        </Grid>
      </Container>
    </Fragment>
  );
};

const mapStateToProps = (state) => {
  return {
    products: state.products,
    categories: state.categories,
  };
};

const mapDispatchToProps = {
  productsAction,
  categoriesAction,
};

export default connect(mapStateToProps, mapDispatchToProps)(Shop);
