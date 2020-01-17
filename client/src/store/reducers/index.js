import { combineReducers } from "redux";
// Reducers
import login from "./loginReducer";
import users from "./userReducer";
import alert from "./alertReducer";
import blogs from "./blogReducer";

// Combine Reducers
const MasterReducer = combineReducers({
  login,
  users,
  alert,
  blogs
});

export default MasterReducer;
