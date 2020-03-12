import Home from "../views/home";
import About from "../views/about";
import Shop from "../views/shop";
import Contact from "../views/contact";
import SingleProduct from "../views/singleproduct";
import Category from "../views/category";
import Checkout from "../views/checkout";

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
  { path: "/about", exact: true, component: About, name: "About" },
  { path: "/contact", exact: true, component: Contact, name: "Contact" }
];

export default Routes;
