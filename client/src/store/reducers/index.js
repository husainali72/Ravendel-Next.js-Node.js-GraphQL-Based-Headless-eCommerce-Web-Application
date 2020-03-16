import { combineReducers } from "redux";
// Reducers
import login from "./loginReducer";
import users from "./userReducer";
import alert from "./alertReducer";
import blogs from "./blogReducer";
import products from "./productReducer";
import orders from "./orderReducer";
import customers from "./customerReducer";
import brands from "./brandReducer";
import taxs from "./taxReducer";
import shippings from "./shippingReducer";
import coupons from "./couponReducer";

// Combine Reducers
const MasterReducer = combineReducers({
  login,
  users,
  alert,
  blogs,
  products,
  orders,
  customers,
  brands,
  taxs,
  shippings,
  coupons
});

export default MasterReducer;
