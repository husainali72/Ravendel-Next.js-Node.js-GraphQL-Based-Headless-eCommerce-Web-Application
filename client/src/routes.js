import React from "react";
import { AllUsers, AddUser, EditUser } from "./views/user";
import { AddBlog, AllBlog, EditBlog } from "./views/blog";
import { AllCategory, AddCategory } from "./views/product";
import { AddProduct, AllProduct, EditProduct } from "./views/product";

//const Dashboard = React.lazy(() => import("./views/Dashboard"));

// https://github.com/ReactTraining/react-router/tree/master/packages/react-router-config
const routes = [
  { path: "/dashboard", exact: true, name: "Home" },
  { path: "/all-blogs", exact: true, name: "All Blogs", component: AllBlog },
  { path: "/add-blog", exact: true, name: "Add Blog", component: AddBlog },
  {
    path: "/edit-blog/:id",
    exact: true,
    name: "Edit Blog",
    component: EditBlog
  },
  { path: "/all-users", exact: true, name: "All Users", component: AllUsers },
  { path: "/add-user", exact: true, name: "Add User", component: AddUser },
  {
    path: "/edit-user/:id",
    exact: true,
    name: "Edit User",
    component: EditUser
  },
  {
    path: "/all-categories",
    exact: true,
    name: "Categories",
    component: AllCategory
  },
  {
    path: "/add-category",
    exact: true,
    name: "Add Category",
    component: AddCategory
  },
  {
    path: "/all-products",
    exact: true,
    name: "Products",
    component: AllProduct
  },
  {
    path: "/add-product",
    exact: true,
    name: "Add Product",
    component: AddProduct
  },
  {
    path: "/edit-product/:id",
    exact: true,
    name: "Edit Product",
    component: EditProduct
  }
];

export default routes;
