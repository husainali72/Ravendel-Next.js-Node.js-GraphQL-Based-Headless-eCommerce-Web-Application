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
import {client_app_route_url} from '../utils/helper';

const Routes = [
  { path: `${client_app_route_url}`, exact: true, component: Dashboard, name: "Home" },
  { path: `${client_app_route_url}dashboard`, exact: true, component: Dashboard, name: "Home" },
  { path: `${client_app_route_url}user`, exact: true, component: AllUsers, name: "Users" },
  { path: `${client_app_route_url}all-users`, exact: true, component: AllUsers, name: "All Users" },
  { path: `${client_app_route_url}add-user`, exact: true, component: AddUser, name: "Add User" },
  {
    path: `${client_app_route_url}edit-user/:id`,
    exact: true,
    component: EditUser,
    name: "Edit User",
  },
  { path: `${client_app_route_url}all-blogs`, exact: true, name: "All Blogs", component: AllBlog },
  { path: `${client_app_route_url}add-blog`, exact: true, name: "Add Blog", component: AddBlog },
  {
    path: `${client_app_route_url}edit-blog/:id`,
    exact: true,
    name: "Edit Blog",
    component: EditBlog,
  },
  { path: `${client_app_route_url}tags`, exact: true, name: "All Tags", component: AllTags },
  { path: `${client_app_route_url}products`, exact: true, component: Dashboard, name: "Products" },
  { path: `${client_app_route_url}other`, exact: true, component: Dashboard, name: "Other" },
  {
    path: `${client_app_route_url}all-categories`,
    exact: true,
    name: "Categories",
    component: AllCategory,
  },
  {
    path: `${client_app_route_url}attributes`,
    exact: true,
    name: "Attributes",
    component: AllAttribute,
  },
  {
    path: `${client_app_route_url}add-attribute`,
    exact: true,
    name: "Add Attribute",
    component: AddAttribute,
  },
  {
    path: `${client_app_route_url}edit-attribute/:id`,
    exact: true,
    name: "Edit Attribute",
    component: EditAttribute,
  },
  {
    path: `${client_app_route_url}all-products`,
    exact: true,
    name: "Products",
    component: AllProduct,
  },
  {
    path: `${client_app_route_url}add-product`,
    exact: true,
    name: "Add Product",
    component: AddProduct,
  },
  {
    path: `${client_app_route_url}edit-product/:id`,
    exact: true,
    name: "Edit Product",
    component: EditProduct,
  },
  {
    path: `${client_app_route_url}all-orders`,
    exact: true,
    name: "All Orders",
    component: AllOrders,
  },
  {
    path: `${client_app_route_url}view-order/:id`,
    exact: true,
    name: "Edit Order",
    component: ViewOrder,
  },
  { path: `${client_app_route_url}all-pages`, exact: true, name: "All Pages", component: AllPages },
  { path: `${client_app_route_url}add-page`, exact: true, name: "Add Page", component: AddPage },
  {
    path: `${client_app_route_url}edit-page/:id`,
    exact: true,
    name: "Edit Page",
    component: EditPage,
  },
  { path: `${client_app_route_url}all-faq`, exact: true, name: "All FAQ", component: AllFAQ },
  { path: `${client_app_route_url}add-faq`, exact: true, name: "Add FAQ", component: AddFAQ },
  {
    path: `${client_app_route_url}edit-faq/:id`,
    exact: true,
    name: "Edit FAQ",
    component: EditFAQ,
  },
  {
    path: `${client_app_route_url}all-customer`,
    exact: true,
    component: AllCustomers,
    name: "All Customer",
  },
  {
    path: `${client_app_route_url}add-customer`,
    exact: true,
    component: AddCustomer,
    name: "Add Customer",
  },
  {
    path: `${client_app_route_url}edit-customer/:id`,
    exact: true,
    component: EditCustomer,
    name: "Edit Customer",
  },
  {
    path: `${client_app_route_url}all-brands`,
    exact: true,
    component: AllBrands,
    name: "All Brands",
  },
  {
    path: `${client_app_route_url}add-brand`,
    exact: true,
    component: AddBrands,
    name: "Add Brand",
  },
  {
    path: `${client_app_route_url}edit-brand/:id`,
    exact: true,
    component: EditBrand,
    name: "Edit Brand",
  },
  {
    path: `${client_app_route_url}settings`,
    exact: true,
    component: Settings,
    name: "Settings",
  },
  {
    path: `${client_app_route_url}all-coupons`,
    exact: true,
    component: AllCoupons,
    name: "All Coupons",
  },
  {
    path: `${client_app_route_url}add-coupon`,
    exact: true,
    component: AddCoupon,
    name: "Add Coupon",
  },
  {
    path: `${client_app_route_url}edit-coupon/:id`,
    exact: true,
    component: EditCoupon,
    name: "Edit Coupon",
  },
  {
    path: `${client_app_route_url}taxes`,
    exact: true,
    component: AllTaxes,
    name: "Taxes",
  },
  {
    path: `${client_app_route_url}shipping`,
    exact: true,
    component: AllShippings,
    name: "Shipping",
  },
  {
    path: `${client_app_route_url}reviews`,
    exact: true,
    component: AllReviews,
    name: "All Reviews",
  },
  {
    path: `${client_app_route_url}edit-review/:id`,
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
