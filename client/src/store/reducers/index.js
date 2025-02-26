import { combineReducers } from "redux";
// Reducers
import login from "./loginReducer";
import users from "./userReducer";
import alert from "./alertReducer";
import blogs from "./blogReducer";
import products from "./productReducer";
import groupProducts from "./groupProductsReducer";
import orders from "./orderReducer";
import customers from "./customerReducer";
import brands from "./brandReducer";
import taxs from "./taxReducer";
import shippings from "./shippingReducer";
import coupons from "./couponReducer";
import reviews from "./reviewReducer";
import pages from "./pageReducer";
import settings from "./settingReducer";
import productAttributes from "./productAttributeReducer";
import dashboardReducer from "./dashboardReducer";
import order from "./orderReducer";
// Combine Reducers
const MasterReducer = combineReducers({
  login,
  users,
  alert,
  blogs,
  products,
  orders,
  order,
  customers,
  brands,
  taxs,
  shippings,
  coupons,
  reviews,
  pages,
  settings,
  productAttributes,
  dashboardReducer,
  groupProducts
});

export default MasterReducer;
