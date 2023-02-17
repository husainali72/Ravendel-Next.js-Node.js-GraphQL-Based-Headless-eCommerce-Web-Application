import React from "react";

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
import { client_app_route_url } from "../utils/helper";
import { Routes, Route } from "react-router-dom";
import Login from "../views/login";
import ThemeHelper from "../main-layout";

export const RoutesPath = [
  {
    path: `${client_app_route_url}login`,
    exact: true,
    component: Login,
    name: "Home",
    role: ['MANAGER', 'SUBSCRIBER', 'EDITOR', 'AUTHOR', 'USER']
  },
  {
    path: `${client_app_route_url}`,
    exact: true,
    component: Dashboard,
    name: "Home",
    role: ['MANAGER', 'SUBSCRIBER', 'EDITOR', 'AUTHOR', 'USER']
  },
  {
    path: `${client_app_route_url}dashboard`,
    exact: true,
    component: Dashboard,
    name: "Home",
    role: ['MANAGER', 'SUBSCRIBER', 'EDITOR', 'AUTHOR', 'USER']
  },
  {
    path: `${client_app_route_url}user`,
    exact: true,
    component: AllUsers,
    name: "Users",
    role: ['MANAGER', 'SUBSCRIBER', 'EDITOR', 'AUTHOR', 'USER']
  },
  {
    path: `${client_app_route_url}all-users`,
    exact: true,
    component: AllUsers,
    name: "All Users",
    role: ['USER']
  },
  {
    path: `${client_app_route_url}add-user`,
    exact: true,
    component: AddUser,
    name: "Add User",
    role: ['USER']
  },
  {
    path: `${client_app_route_url}edit-user/:id`,
    exact: true,
    component: EditUser,
    name: "Edit User",
    role: ['USER']
  },
  {
    path: `${client_app_route_url}all-blogs`,
    exact: true,
    name: "All Blogs",
    component: AllBlog,
    role: ['MANAGER', 'SUBSCRIBER', 'USER']
  },
  {
    path: `${client_app_route_url}add-blog`,
    exact: true,
    name: "Add Blog",
    component: AddBlog,
    role: ['MANAGER', 'SUBSCRIBER', 'USER']
  },
  {
    path: `${client_app_route_url}edit-blog/:id`,
    exact: true,
    name: "Edit Blog",
    component: EditBlog,
    role: ['MANAGER', 'SUBSCRIBER', 'USER']
  },
  {
    path: `${client_app_route_url}tags`,
    exact: true,
    name: "All Tags",
    component: AllTags,
    role: ['MANAGER', 'SUBSCRIBER', 'USER']
  },
  {
    path: `${client_app_route_url}products`,
    exact: true,
    component: Dashboard,
    name: "Products",
    role: ['USER']
  },
  {
    path: `${client_app_route_url}other`,
    exact: true,
    component: Dashboard,
    name: "Other",
    role: ['MANAGER', 'SUBSCRIBER', 'EDITOR', 'AUTHOR', 'USER']
  },
  {
    path: `${client_app_route_url}all-categories`,
    exact: true,
    name: "Categories",
    component: AllCategory,
    role: ['USER']
  },
  {
    path: `${client_app_route_url}attributes`,
    exact: true,
    name: "Attributes",
    component: AllAttribute,
    role: ['USER']
  },
  {
    path: `${client_app_route_url}add-attribute`,
    exact: true,
    name: "Add Attribute",
    component: AddAttribute,
    role: ['USER']
  },
  {
    path: `${client_app_route_url}edit-attribute/:id`,
    exact: true,
    name: "Edit Attribute",
    component: EditAttribute,
    role: ['USER']
  },
  {
    path: `${client_app_route_url}all-products`,
    exact: true,
    name: "Products",
    component: AllProduct,
    role: ['USER']
  },
  {
    path: `${client_app_route_url}add-product`,
    exact: true,
    name: "Add Product",
    component: AddProduct,
    role: ['USER']
  },
  {
    path: `${client_app_route_url}edit-product/:id`,
    exact: true,
    name: "Edit Product",
    component: EditProduct,
    role: ['USER']
  },
  {
    path: `${client_app_route_url}all-orders`,
    exact: true,
    name: "All Orders",
    component: AllOrders,
    role: ['USER']
  },
  {
    path: `${client_app_route_url}view-order/:id`,
    exact: true,
    name: "Edit Order",
    component: ViewOrder,
    role: ['USER']
  },
  {
    path: `${client_app_route_url}mainlayout`,
    exact: true,
    name: "All Pages",
    component: ThemeHelper,
    role: ['MANAGER', 'SUBSCRIBER', 'EDITOR', 'AUTHOR', 'USER']
  },
  {
    path: `${client_app_route_url}all-pages`,
    exact: true,
    name: "All Pages",
    component: AllPages,
    role: ['USER']
  },
  {
    path: `${client_app_route_url}add-page`,
    exact: true,
    name: "Add Page",
    component: AddPage,
    role: ['USER']
  },
  {
    path: `${client_app_route_url}edit-page/:id`,
    exact: true,
    name: "Edit Page",
    component: EditPage,
    role: ['USER']
  },
  {
    path: `${client_app_route_url}all-faq`,
    exact: true,
    name: "All FAQ",
    component: AllFAQ,
    role: ['MANAGER', 'SUBSCRIBER', 'EDITOR', 'AUTHOR', 'USER']

  },
  {
    path: `${client_app_route_url}add-faq`,
    exact: true,
    name: "Add FAQ",
    component: AddFAQ,
    role: ['MANAGER', 'SUBSCRIBER', 'EDITOR', 'AUTHOR', 'USER']
  },
  {
    path: `${client_app_route_url}edit-faq/:id`,
    exact: true,
    name: "Edit FAQ",
    component: EditFAQ,
    role: ['MANAGER', 'SUBSCRIBER', 'EDITOR', 'AUTHOR', 'USER']
  },
  {
    path: `${client_app_route_url}all-customer`,
    exact: true,
    component: AllCustomers,
    name: "All Customer",
    role: ['MANAGER', 'SUBSCRIBER', 'EDITOR', 'AUTHOR', 'USER']
  },
  {
    path: `${client_app_route_url}add-customer`,
    exact: true,
    component: AddCustomer,
    name: "Add Customer",
    role: ['MANAGER', 'SUBSCRIBER', 'EDITOR', 'AUTHOR', 'USER']
  },
  {
    path: `${client_app_route_url}edit-customer/:id`,
    exact: true,
    component: EditCustomer,
    name: "Edit Customer",
    role: ['MANAGER', 'SUBSCRIBER', 'EDITOR', 'AUTHOR', 'USER']
  },
  {
    path: `${client_app_route_url}all-brands`,
    exact: true,
    component: AllBrands,
    name: "All Brands",
    role: ['USER']
  },
  {
    path: `${client_app_route_url}add-brand`,
    exact: true,
    component: AddBrands,
    name: "Add Brand",
    role: ['USER']
  },
  {
    path: `${client_app_route_url}edit-brand/:id`,
    exact: true,
    component: EditBrand,
    name: "Edit Brand",
    role: ['USER']
  },
  {
    path: `${client_app_route_url}settings`,
    exact: true,
    component: Settings,
    name: "Settings",
    role: ['USER']
  },
  {
    path: `${client_app_route_url}all-coupons`,
    exact: true,
    component: AllCoupons,
    name: "All Coupons",
    role: ['USER']
  },
  {
    path: `${client_app_route_url}add-coupon`,
    exact: true,
    component: AddCoupon,
    name: "Add Coupon",
    role: ['USER']
  },
  {
    path: `${client_app_route_url}edit-coupon/:id`,
    exact: true,
    component: EditCoupon,
    name: "Edit Coupon",
    role: ['USER']
  },
  {
    path: `${client_app_route_url}taxes`,
    exact: true,
    component: AllTaxes,
    name: "Taxes",
    role: ['USER', 'MANAGER', 'SUBSCRIBER', 'EDITOR', 'AUTHOR',]
  },
  {
    path: `${client_app_route_url}shipping`,
    exact: true,
    component: AllShippings,
    name: "Shipping",
    role: ['USER']
  },
  {
    path: `${client_app_route_url}reviews`,
    exact: true,
    component: AllReviews,
    name: "All Reviews",
    role: ['USER']
  },
  {
    path: `${client_app_route_url}edit-review/:id`,
    exact: true,
    component: EditReview,
    name: "Edit Review",
    role: ['USER']
  },
  {
    path: "*",
    component: NotFound,
    name: "NotFound",
    role: ['MANAGER', 'SUBSCRIBER', 'EDITOR', 'AUTHOR', 'USER']
  },
];

const AllRoutes = ({ user }) => {

  return (
    <>
      <Routes>
        {RoutesPath.map((route, index) => {

          if (route.role.includes(user)) {

            return (
              <Route
                key={index}
                path={route.path}
                name={route.name}
                element={<route.component />}
              />
            );
          }
        })}
      </Routes>
    </>
  );
};

export default AllRoutes;