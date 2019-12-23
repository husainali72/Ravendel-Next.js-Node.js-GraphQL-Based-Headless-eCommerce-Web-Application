import { combineReducers } from "redux";
// Reducers
import login from "./loginReducer";
import users from "./userReducer";
import alert from "./alertReducer";

// Combine Reducers
const MasterReducer = combineReducers({
  login,
  users,
  alert
});

export default MasterReducer;
