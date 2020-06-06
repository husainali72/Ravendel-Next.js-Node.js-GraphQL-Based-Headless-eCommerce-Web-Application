import React, { Fragment, useEffect, useState } from "react";
import { connect } from "react-redux";
import { Banner, BlogListing } from "./components";
import ProductSlider from "../components/productslider";
import ProductGrid from "../components/productgrid";
import CategoryListing from "../components/categorylist";
import {
  productsAction,
  categoriesAction,
} from "../../store/action/productAction";
import { homepageAction } from "../../store/action/homepageAction";
import { blogsAction } from "../../store/action/blogAction";
import { isEmpty } from "../../utils/helper";
import Loading from "../components/loading";
import { CircularProgress, Typography, Box } from "@material-ui/core";

const Home = (props) => {
  const [homepageSetting, setHomepageSetting] = useState({
    appearance: {
      home: {
        slider: [],
        add_section_in_home: {
          feature_product: false,
          most_viewed_products: false,
          product_from_specific_categories: false,
          product_recommendation: false,
          products_on_sales: false,
          recently_added_products: false,
          recently_bought_products: false,
        },
      },
    },
  });

  useEffect(() => {
    if (isEmpty(props.products.products)) {
      props.productsAction();
    }
    if (isEmpty(props.products.categories)) {
      props.categoriesAction();
    }
    if (isEmpty(props.blogs.blogs)) {
      props.blogsAction();
    }
    if (isEmpty(props.home.homepage)) {
      props.homepageAction();
    }
  }, []);

  useEffect(() => {
    if (!isEmpty(props.home.homepage)) {
      setHomepageSetting(props.home.homepage);
    }
  }, [props.home.homepage]);

  return (
    <Fragment>
      {props.products.loading || props.blogs.loading || props.home.loading ? (
        <Loading />
      ) : (
        ""
      )}

      {homepageSetting.appearance.home.slider.length < 0 ? (
        ""
      ) : (
        <Banner sliders={homepageSetting.appearance.home.slider} />
      )}

      <CategoryListing
        allCategories={props.products.categories}
        title="Categories"
      />

      {homepageSetting.appearance.home.add_section_in_home.feature_product ? (
        <Fragment>
          <ProductSlider
            allProducts={props.products.products}
            title="Featured Products"
          />
          <img
            src="https://www.hbwebsol.com/wp-content/uploads/2020/06/section.jpg"
            alt="Feature Product Graphics"
          />
        </Fragment>
      ) : (
        ""
      )}

      {homepageSetting.appearance.home.add_section_in_home
        .most_viewed_products ? (
        <ProductGrid
          allProducts={props.products.products}
          title="Most Viewed Product"
        />
      ) : (
        ""
      )}

      {homepageSetting.appearance.home.add_section_in_home
        .product_from_specific_categories ? (
        <ProductSlider
          allProducts={props.products.products}
          title="Juice Products"
        />
      ) : (
        ""
      )}

      {homepageSetting.appearance.home.add_section_in_home.products_on_sales ? (
        <ProductGrid
          allProducts={props.products.products}
          title="On Sale Products"
        />
      ) : (
        ""
      )}

      {homepageSetting.appearance.home.add_section_in_home
        .recently_added_products ? (
        <ProductSlider
          allProducts={props.products.products}
          title="Recently Added Products"
        />
      ) : (
        ""
      )}

      {homepageSetting.appearance.home.add_section_in_home
        .recently_bought_products ? (
        <ProductGrid
          allProducts={props.products.products}
          title="Recently Bought Products"
        />
      ) : (
        ""
      )}

      {homepageSetting.appearance.home.add_section_in_home
        .product_recommendation ? (
        <ProductSlider
          allProducts={props.products.products}
          title="Recommendation Products"
        />
      ) : (
        ""
      )}

      {props.blogs.blogs && (
        <BlogListing recentlyBlogs={props.blogs.blogs} title="OUR BLOG" />
      )}
    </Fragment>
  );
};

const mapStateToProps = (state) => {
  return {
    products: state.products,
    categories: state.categories,
    blogs: state.blogs,
    home: state.homepage,
  };
};

const mapDispatchToProps = {
  productsAction,
  categoriesAction,
  blogsAction,
  homepageAction,
};

export default connect(mapStateToProps, mapDispatchToProps)(Home);
