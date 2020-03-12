import React, { Fragment, useState } from "react";
import { Typography, Box } from "@material-ui/core";
import ProductGrid from "../components/productgrid";
import CategoryListing from "../components/categorylist";

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

const Category = props => {
  const [categoryName, setCategoryName] = useState(props.match.params.name);
  return (
    <Fragment>
      <Box
        component="div"
        display="flex"
        justifyContent="center"
        alignItems="center"
        className="page-header"
      >
        <Typography variant="h1">{categoryName}</Typography>
      </Box>
      <CategoryListing allCategories={categories} title="Sub Categories" />
      <ProductGrid allProducts={products} title="Products" />
    </Fragment>
  );
};

export default Category;
