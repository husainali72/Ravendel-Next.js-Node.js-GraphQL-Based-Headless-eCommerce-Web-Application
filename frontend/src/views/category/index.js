import React, { Fragment, useState, useEffect } from "react";
import PageTitle from "../components/pageTitle";
import ProductCard from "../components/productcard";
import { connect } from "react-redux";
import { catProductAction, filterProductAction } from "../../store/action";
import { Typography, Box, Container, Grid } from "@material-ui/core";
import { isEmpty } from "../../utils/helper";
import Loading from "../components/loading";
import { Helmet } from "react-helmet";
import FilterSideBar from "../components/filtersidebar";

const Category = (props) => {
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
    if (props.products.products.length) {
      setProducts(props.products.products);
    }
  }, [props.products.products]);

  useEffect(() => {
    if (props.match.params.url) {
      props.catProductAction(`${props.match.params.url}`);
    }
  }, []);

  useEffect(() => {
    setCategoryDetail(props.products.singleCategoryDetails);
  }, [props.products.singleCategoryDetails]);

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
    props.filterProductAction(config);
  };

  return (
    <Fragment>
      {props.products.loading && <Loading />}

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
              filter_brands={props.products.singleCategoryDetails.filter_brands}
              currentCat={props.products.singleCategoryDetails.id}
              getfilteredProducts={getfilteredProducts}
              filtered_attributes={
                props.products.singleCategoryDetails.filter_attributes
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
  catProductAction,
  filterProductAction,
};

export default connect(mapStateToProps, mapDispatchToProps)(Category);
