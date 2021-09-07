import Home from "../views/home";
import About from "../views/about";
import Shop from "../views/shop";
import Contact from "../views/contact";
import SingleProduct from "../views/singleproduct";
import Category from "../views/category";
import Checkout from "../views/checkout";
import PaymentFailed from "../views/orderStatus/failedpayment";
import Thankyou from "../views/orderStatus/thankyou";
import { Login, Register, ForgotPassword, Account } from "../views/account";
import { AllBlogs, SingleBlog } from "../views/blog";
import Pages from "../views/pages";
import Brand from "../views/brand";
import Tags from "../views/tags";
import TermsAndCondition from "../views/terms";
import ReturnsAndRefunds from "../views/refund";
import FAQ from "../views/faq";
import {app_router_base_url} from '../utils/helper';
const Routes = [
  { path: `${app_router_base_url}`, exact: true, component: Home, name: "Homes" },
  { path: `${app_router_base_url}shop`, exact: true, component: Shop, name: "Shop" },
  /* {
    path: `${app_router_base_url}product/:id`,
    exact: true,
    component: SingleProduct,
    name: "Single Product Page",
  }, */
  {
    path: `${app_router_base_url}product/:url`,
    exact: true,
    component: SingleProduct,
    name: "Single Product Page",
  },
  {
    path: `${app_router_base_url}category/:url`,
    exact: true,
    component: Category,
    name: "Category",
  },
  { path: `${app_router_base_url}checkout`, exact: true, component: Checkout, name: "Checkout" },
  {
    path: `${app_router_base_url}payment-failed`,
    exact: true,
    component: PaymentFailed,
    name: "Payment Failed",
  },
  { path: `${app_router_base_url}thankyou`, exact: true, component: Thankyou, name: "Thankyou" },
  { path: `${app_router_base_url}account/:tabid`, exact: true, component: Account, name: "Account" },
  { path: `${app_router_base_url}login`, exact: true, component: Login, name: "Login" },
  { path: `${app_router_base_url}register`, exact: true, component: Register, name: "Register" },
  {
    path: `${app_router_base_url}forgot-password`,
    exact: true,
    component: ForgotPassword,
    name: "Forgot Password",
  },
  { path: `${app_router_base_url}about`, exact: true, component: About, name: "About" },
  { path: `${app_router_base_url}contact`, exact: true, component: Contact, name: "Contact" },
  { path: `${app_router_base_url}blogs`, exact: true, component: AllBlogs, name: "AllBlogs" },
  { path: `${app_router_base_url}blog/:id`, exact: true, component: SingleBlog, name: "SingleBlog" },
  { path: `${app_router_base_url}page/:name`, exact: true, component: Pages, name: "Pages" },
  { path: `${app_router_base_url}brand/:name`, exact: true, component: Brand, name: "Brand" },
  { path: `${app_router_base_url}tag/:url`, exact: true, component: Tags, name: "Tags" },
  {
    path: `${app_router_base_url}terms`,
    exact: true,
    component: TermsAndCondition,
    name: "TermsAndCondition",
  },
  {
    path: `${app_router_base_url}refund`,
    exact: true,
    component: ReturnsAndRefunds,
    name: "ReturnsAndRefunds",
  },
  {
    path: `${app_router_base_url}faq`,
    exact: true,
    component: FAQ,
    name: "FAQ",
  },
];

export default Routes;
