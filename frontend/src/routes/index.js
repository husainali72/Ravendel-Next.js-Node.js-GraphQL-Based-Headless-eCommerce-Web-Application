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

const Routes = [
  { path: "/", exact: true, component: Home, name: "Home" },
  { path: "/shop", exact: true, component: Shop, name: "Shop" },
  {
    path: "/product/:id",
    exact: true,
    component: SingleProduct,
    name: "Single Product Page"
  },
  {
    path: "/category/:name",
    exact: true,
    component: Category,
    name: "Category"
  },
  { path: "/checkout", exact: true, component: Checkout, name: "Checkout" },
  {
    path: "/payment-failed",
    exact: true,
    component: PaymentFailed,
    name: "Payment Failed"
  },
  { path: "/thankyou", exact: true, component: Thankyou, name: "Thankyou" },
  { path: "/account/:tabid", exact: true, component: Account, name: "Account" },
  { path: "/login", exact: true, component: Login, name: "Login" },
  { path: "/register", exact: true, component: Register, name: "Register" },
  {
    path: "/forgot-password",
    exact: true,
    component: ForgotPassword,
    name: "Forgot Password"
  },
  { path: "/about", exact: true, component: About, name: "About" },
  { path: "/contact", exact: true, component: Contact, name: "Contact" },
  { path: "/blogs", exact: true, component: AllBlogs, name: "AllBlogs" },
  { path: "/blog/:id", exact: true, component: SingleBlog, name: "SingleBlog" }
];

export default Routes;
