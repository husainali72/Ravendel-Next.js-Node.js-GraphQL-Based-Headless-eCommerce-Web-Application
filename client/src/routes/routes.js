import Dashboard from "../views/dashboard";
import { AllUsers, AddUser, EditUser } from "../views/users";
import { AddBlog, AllBlog, EditBlog } from "../views/blog";
import {
  AddProduct,
  AllProduct,
  EditProduct,
  AllCategory
} from "../views/product";
import { AllOrders, ViewOrder } from "../views/order";
import { AllPages, AddPage, EditPage } from "../views/page";
import { AllCustomers, AddCustomer, EditCustomer } from "../views/customer";
import { AllBrands, AddBrands, EditBrand } from "../views/brand";
import Settings from "../views/settings";
import { AllCoupons, AddCoupon, EditCoupon } from "../views/coupon";
import NotFound from "../views/notFound";

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
    name: "Edit User"
  },
  { path: "/all-blogs", exact: true, name: "All Blogs", component: AllBlog },
  { path: "/add-blog", exact: true, name: "Add Blog", component: AddBlog },
  {
    path: "/edit-blog/:id",
    exact: true,
    name: "Edit Blog",
    component: EditBlog
  },
  { path: "/products", exact: true, component: Dashboard, name: "Products" },
  { path: "/other", exact: true, component: Dashboard, name: "Other" },
  {
    path: "/all-categories",
    exact: true,
    name: "Categories",
    component: AllCategory
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
  },
  {
    path: "/all-orders",
    exact: true,
    name: "All Orders",
    component: AllOrders
  },
  {
    path: "/view-order/:id",
    exact: true,
    name: "Edit Order",
    component: ViewOrder
  },
  { path: "/all-pages", exact: true, name: "All Pages", component: AllPages },
  { path: "/add-page", exact: true, name: "Add Page", component: AddPage },
  {
    path: "/edit-page/:id",
    exact: true,
    name: "Edit Page",
    component: EditPage
  },
  {
    path: "/all-customer",
    exact: true,
    component: AllCustomers,
    name: "All Customer"
  },
  {
    path: "/add-customer",
    exact: true,
    component: AddCustomer,
    name: "Add Customer"
  },
  {
    path: "/edit-customer/:id",
    exact: true,
    component: EditCustomer,
    name: "Edit Customer"
  },
  {
    path: "/all-brands",
    exact: true,
    component: AllBrands,
    name: "All Brands"
  },
  {
    path: "/add-brand",
    exact: true,
    component: AddBrands,
    name: "Add Brand"
  },
  {
    path: "/edit-brand/:id",
    exact: true,
    component: EditBrand,
    name: "Edit Brand"
  },
  {
    path: "/settings",
    exact: true,
    component: Settings,
    name: "Settings"
  },
  {
    path: "/all-coupons",
    exact: true,
    component: AllCoupons,
    name: "All Coupons"
  },
  {
    path: "/add-coupon",
    exact: true,
    component: AddCoupon,
    name: "Add Coupon"
  },
  {
    path: "/edit-coupon/:id",
    exact: true,
    component: EditCoupon,
    name: "Edit Coupon"
  },
  {
    path: "*",
    component: NotFound
  }
];

export default Routes;
