import React, { Fragment, useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { catProductAction, filterProductAction } from "../../store/action";
import { Typography, Box, Container, Grid } from"@mui/material";
import { isEmpty } from "../../utils/helper";
import { Helmet } from "react-helmet";
import {PageTitle, Loading, ProductCard, FilterSideBar} from '../components';

const Category = (props) => {
  const catID = props.match.params.url;
  const dispatch = useDispatch();
  const productsState = useSelector(state => state.products);
  const categories = useSelector(state => state.categories);
  const [priceRange, setPriceRange] = React.useState([0, 2000]);
  const [categoryDetail, setCategoryDetail] = useState({
    name: "",
    products: [],
    image: {},
    description: "",
    meta: {
      title: "",
      keywords: "",
      description: "",
    },
  });
  const [products, setProducts] = useState([]);
  const [brands, setbrands] = useState([]);

  useEffect(() => {
    if (productsState.products.length) {
      setProducts(productsState.products);
    }
  }, [productsState.products]);

  useEffect(() => {
    if (catID) {
      dispatch(catProductAction(catID));
    }
  }, []);

  useEffect(() => {
    setCategoryDetail(productsState.singleCategoryDetails);
  }, [productsState.singleCategoryDetails]);

  useEffect(() => {
    if (!isEmpty(categoryDetail.products)) {
      fillterProducts(priceRange);
    }
  }, [categoryDetail.products]);

  const fillterProducts = (newValue) => {
    setPriceRange(newValue);
    let filteredProducts = categoryDetail.products.filter(
      (product) =>
        product.pricing.price >= newValue[0] &&
        product.pricing.price <= newValue[1]
    );
    setProducts(filteredProducts);
  };

  const getfilteredProducts = (config) => {
    setProducts([]);
    dispatch(filterProductAction(config));
  };

  return (
    <Fragment>
      {productsState.loading && <Loading />}

      {categoryDetail.meta && (
        <Helmet>
          <title>{categoryDetail.meta.title}</title>
          <meta name="description" content={categoryDetail.meta.description} />
          <meta name="keywords" content={categoryDetail.meta.keywords} />
        </Helmet>
      )}

      <PageTitle title={categoryDetail.name} />
      <Container>
        <Grid container className="margin-top-3 margin-bottom-3" spacing={4}>
          <Grid item lg={3} md={4} sm={4} xs={12} className="left-sidebar">
            <FilterSideBar
              onPriceChange={(newValue) => fillterProducts(newValue)}
              filter_brands={productsState.singleCategoryDetails.filter_brands}
              currentCat={productsState.singleCategoryDetails.id}
              getfilteredProducts={getfilteredProducts}
              filtered_attributes={
                productsState.singleCategoryDetails.filter_attributes
              }
            />
          </Grid>

          <Grid item lg={9} md={8} sm={8} xs={12}>
            <Box mb={3}>
              <Typography variant="subtitle1">
                {categoryDetail.description}
              </Typography>
            </Box>

            <Grid container spacing={4} className="right-sidebar">
              {!isEmpty(products) ? (
                products
                  .sort((a, b) => (a.pricing.price > b.pricing.price ? 1 : -1))
                  .map(
                    (product, index) =>
                      product.status === "Publish" && (
                        <Grid item lg={4} md={6} sm={6} xs={6} key={index}>
                          <ProductCard
                            productDetail={product}
                            index={index}
                            key={index}
                          />
                        </Grid>
                      )
                  )
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

export default Category;
