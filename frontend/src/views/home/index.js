import React, { Fragment } from "react";
import { connect } from "react-redux";
import { Container, Divider } from "@material-ui/core";
import {
  Banner,
  CategoryListing,
  BlogListing,
  ProductSlider,
  ProductGrid
} from "./components";

const products = [
  {
    featured_image:
      "https://colorlib.com/preview/theme/essence/img/bg-img/bg-2.jpg",
    title: "Product First",
    price: 12,
    category: "category",
    description: "Product first lorem ipsom dolr sit"
  },
  {
    featured_image:
      "https://colorlib.com/preview/theme/essence/img/bg-img/bg-4.jpg",
    title: "Product Second",
    price: 12,
    category: "category",
    description: "Product second lorem ipsom dolr sit",
    sale_price: 10
  },
  {
    featured_image:
      "https://colorlib.com/preview/theme/essence/img/bg-img/bg-3.jpg",
    title: "Product Third",
    price: 12,
    category: "category",
    description: "Product third lorem ipsom dolr sit"
  },
  {
    featured_image:
      "https://colorlib.com/preview/theme/essence/img/bg-img/bg-2.jpg",
    title: "Product Fourth",
    price: 12,
    category: "category",
    description: "Product first lorem ipsom dolr sit"
  },
  {
    featured_image:
      "https://colorlib.com/preview/theme/essence/img/bg-img/bg-4.jpg",
    title: "Product Fifth",
    price: 12,
    category: "category",
    description: "Product second lorem ipsom dolr sit",
    sale_price: 10
  },
  {
    featured_image:
      "https://colorlib.com/preview/theme/essence/img/bg-img/bg-3.jpg",
    title: "Product Sixth",
    price: 12,
    category: "category",
    description: "Product third lorem ipsom dolr sit"
  }
];

const blogs = [
  {
    featured_image:
      "https://colorlib.com/preview/theme/essence/img/bg-img/bg-2.jpg",
    title: "Blog First",
    description: "Blog first lorem ipsom dolr sit"
  },
  {
    featured_image:
      "https://colorlib.com/preview/theme/essence/img/bg-img/bg-4.jpg",
    title: "Blog Second",
    description: "Blog second lorem ipsom dolr sit"
  },
  {
    featured_image:
      "https://colorlib.com/preview/theme/essence/img/bg-img/bg-3.jpg",
    title: "Blog Third",
    description: "Blog third lorem ipsom dolr sit"
  }
];

const categories = [
  {
    url: "https://colorlib.com/preview/theme/essence/img/bg-img/bg-2.jpg",
    title: "Cloths",
    width: "40%"
  },
  {
    url: "https://colorlib.com/preview/theme/essence/img/bg-img/bg-3.jpg",
    title: "Shoes",
    width: "30%"
  },
  {
    url: "https://colorlib.com/preview/theme/essence/img/bg-img/bg-4.jpg",
    title: "Accessories",
    width: "30%"
  }
];

const Home = props => {
  return (
    <Fragment>
      <Banner />
      <CategoryListing allCategories={categories} title="Categories" />
      <ProductSlider allProducts={products} title="Featured Products" />
      <ProductGrid allProducts={products} title="Our Latest Product" />
      <ProductSlider allProducts={products} title="Most Viewed Products" />
      <BlogListing recentlyBlogs={blogs} title="OUR BLOG" />
    </Fragment>
  );
};

const mapStateToProps = state => ({
  settings: state.settings
});

export default connect(mapStateToProps)(Home);
