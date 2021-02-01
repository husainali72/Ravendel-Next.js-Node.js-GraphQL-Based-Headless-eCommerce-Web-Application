import React, { Fragment, useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Container, Grid, Typography } from "@material-ui/core";
import {
  productsAction,
  categoriesAction,
} from "../../store/action/productAction";
import { isEmpty } from "../../utils/helper";
import {PageTitle, Loading, ProductCard, FilterSideBar} from '../components';

const Shop = () => {
  const dispatch = useDispatch();
  const products = useSelector(state => state.products);
  const categories = useSelector(state => state.categories);
  const [fillterProducts, setFillterProducts] = useState([]);
  const [priceRange, setPriceRange] = React.useState([0, 2000]);

  useEffect(() => {
    if (isEmpty(products.products)) {
      dispatch(productsAction());
    }
  }, []);

  useEffect(() => {
    if (isEmpty(products.categories)) {
      dispatch(categoriesAction());
    }
  }, []);

  const fillterShopProducts = (newValue) => {
    setPriceRange(newValue);
    let filteredProducts = products.products.filter(
      (product) =>
        product.pricing.price >= newValue[0] &&
        product.pricing.price <= newValue[1]
    );
    setFillterProducts(filteredProducts);
  };

  useEffect(() => {
    if (!isEmpty(products.products)) {
      fillterShopProducts(priceRange);
    }
  }, [products.products]);

  return (
    <Fragment>
      {products.loading && <Loading />}
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
                            categories={products.categories}
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
                  <Typography variant="body1" className="text-center width-100">
                    No products available
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

export default Shop;
