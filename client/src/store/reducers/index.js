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

// Combine Reducers
const MasterReducer = combineReducers({
  login,
  users,
  alert,
  blogs,
  products,
  orders,
  customers,
  brands
});

export default MasterReducer;
