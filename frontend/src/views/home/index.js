import React, { Fragment, useEffect } from "react";
import { connect } from "react-redux";
import { Banner, BlogListing } from "./components";
import ProductSlider from "../components/productslider";
import ProductGrid from "../components/productgrid";
import CategoryListing from "../components/categorylist";
import {
  productsAction,
  categoriesAction
} from "../../store/action/productAction";
import { blogsAction } from "../../store/action/blogAction";
import { isEmpty } from "../../utils/helper";
import Loading from "../components/loading";

const Home = props => {
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

  useEffect(() => {
    if (isEmpty(props.blogs.blogs)) {
      props.blogsAction();
    }
  }, []);

  return (
    <Fragment>
      {props.products.loading || (props.blogs.loading && <Loading />)}
      <Banner />
      <CategoryListing
        allCategories={props.products.categories}
        title="Categories"
      />
      <ProductSlider
        allProducts={props.products.products}
        title="Featured Products"
      />
      <ProductGrid
        allProducts={props.products.products}
        title="Our Latest Product"
      />
      <ProductSlider
        allProducts={props.products.products}
        title="Most Viewed Products"
      />
      {props.blogs.blogs && (
        <BlogListing recentlyBlogs={props.blogs.blogs} title="OUR BLOG" />
      )}
    </Fragment>
  );
};

const mapStateToProps = state => {
  return {
    products: state.products,
    categories: state.categories,
    blogs: state.blogs
  };
};

const mapDispatchToProps = {
  productsAction,
  categoriesAction,
  blogsAction
};

export default connect(mapStateToProps, mapDispatchToProps)(Home);
