import React from 'react';
import { Route, Switch } from "react-router-dom";
import Dashboard from "../views/dashboard";
import { AllUsers, AddUser, EditUser } from "../views/users";
import { AddBlog, AllBlog, EditBlog, AllTags } from "../views/blog";
import {
  AddProduct,
  AllProduct,
  EditProduct,
  AllCategory,
  AllAttribute,
  AddAttribute,
  EditAttribute,
} from "../views/product";
import { AllOrders, ViewOrder } from "../views/order";
import { AllPages, AddPage, EditPage } from "../views/page";
import { AllCustomers, AddCustomer, EditCustomer } from "../views/customer";
import { AllBrands, AddBrands, EditBrand } from "../views/brand";
import Settings from "../views/settings";
import { AllCoupons, AddCoupon, EditCoupon } from "../views/coupon";
import AllTaxes from "../views/tax";
import AllShippings from "../views/shipping";
import NotFound from "../views/notFound";
import { AllReviews, EditReview } from "../views/reviews";
import { AddFAQ, AllFAQ, EditFAQ } from "../views/faq";

const Routes = [
  { path: "/", exact: true, component: Dashboard, name: "Home" },
  { path: "/dashboard", exact: true, component: Dashboard, name: "Home" },
  { path: "/user", exact: true, component: AllUsers, name: "Users" },
  { path: "/all-users", exact: true, component: AllUsers, name: "All Users" },
  { path: "/add-user", exact: true, component: AddUser, name: "Add User" },
  {
    path: "/edit-user/:id",
    exact: true,
    component: EditUser,
    name: "Edit User",
  },
  { path: "/all-blogs", exact: true, name: "All Blogs", component: AllBlog },
  { path: "/add-blog", exact: true, name: "Add Blog", component: AddBlog },
  {
    path: "/edit-blog/:id",
    exact: true,
    name: "Edit Blog",
    component: EditBlog,
  },
  { path: "/tags", exact: true, name: "All Tags", component: AllTags },
  { path: "/products", exact: true, component: Dashboard, name: "Products" },
  { path: "/other", exact: true, component: Dashboard, name: "Other" },
  {
    path: "/all-categories",
    exact: true,
    name: "Categories",
    component: AllCategory,
  },
  {
    path: "/attributes",
    exact: true,
    name: "Attributes",
    component: AllAttribute,
  },
  {
    path: "/add-attribute",
    exact: true,
    name: "Add Attribute",
    component: AddAttribute,
  },
  {
    path: "/edit-attribute/:id",
    exact: true,
    name: "Edit Attribute",
    component: EditAttribute,
  },
  {
    path: "/all-products",
    exact: true,
    name: "Products",
    component: AllProduct,
  },
  {
    path: "/add-product",
    exact: true,
    name: "Add Product",
    component: AddProduct,
  },
  {
    path: "/edit-product/:id",
    exact: true,
    name: "Edit Product",
    component: EditProduct,
  },
  {
    path: "/all-orders",
    exact: true,
    name: "All Orders",
    component: AllOrders,
  },
  {
    path: "/view-order/:id",
    exact: true,
    name: "Edit Order",
    component: ViewOrder,
  },
  { path: "/all-pages", exact: true, name: "All Pages", component: AllPages },
  { path: "/add-page", exact: true, name: "Add Page", component: AddPage },
  {
    path: "/edit-page/:id",
    exact: true,
    name: "Edit Page",
    component: EditPage,
  },
  { path: "/all-faq", exact: true, name: "All FAQ", component: AllFAQ },
  { path: "/add-faq", exact: true, name: "Add FAQ", component: AddFAQ },
  {
    path: "/edit-faq/:id",
    exact: true,
    name: "Edit FAQ",
    component: EditFAQ,
  },
  {
    path: "/all-customer",
    exact: true,
    component: AllCustomers,
    name: "All Customer",
  },
  {
    path: "/add-customer",
    exact: true,
    component: AddCustomer,
    name: "Add Customer",
  },
  {
    path: "/edit-customer/:id",
    exact: true,
    component: EditCustomer,
    name: "Edit Customer",
  },
  {
    path: "/all-brands",
    exact: true,
    component: AllBrands,
    name: "All Brands",
  },
  {
    path: "/add-brand",
    exact: true,
    component: AddBrands,
    name: "Add Brand",
  },
  {
    path: "/edit-brand/:id",
    exact: true,
    component: EditBrand,
    name: "Edit Brand",
  },
  {
    path: "/settings",
    exact: true,
    component: Settings,
    name: "Settings",
  },
  {
    path: "/all-coupons",
    exact: true,
    component: AllCoupons,
    name: "All Coupons",
  },
  {
    path: "/add-coupon",
    exact: true,
    component: AddCoupon,
    name: "Add Coupon",
  },
  {
    path: "/edit-coupon/:id",
    exact: true,
    component: EditCoupon,
    name: "Edit Coupon",
  },
  {
    path: "/taxes",
    exact: true,
    component: AllTaxes,
    name: "Taxes",
  },
  {
    path: "/shipping",
    exact: true,
    component: AllShippings,
    name: "Shipping",
  },
  {
    path: "/reviews",
    exact: true,
    component: AllReviews,
    name: "All Reviews",
  },
  {
    path: "/edit-review/:id",
    exact: true,
    component: EditReview,
    name: "Edit Review",
  },
   {
    path: "*",
    component: NotFound,
    name: 'NotFound'
  },
];

const AllRoutes = () => {
  return (
    <Switch>
         {Routes.map((route, index) => (
          <Route
            key={index}
            exact={route.exact}
            path={route.path}
            name={route.name}
            component={route.component}
          />
        ))}
    </Switch>
  )
}

export default AllRoutes;
