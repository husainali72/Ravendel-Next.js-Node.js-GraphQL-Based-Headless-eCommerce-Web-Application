import { combineReducers } from "redux";
// Reducers
import login from "./loginReducer";
import users from "./userReducer";
import alert from "./alertReducer";
import blogs from "./blogReducer";
import products from "./productReducer";

// Combine Reducers
const MasterReducer = combineReducers({
  login,
  users,
  alert,
  blogs,
  products
});

export default MasterReducer;