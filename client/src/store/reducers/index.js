import { combineReducers } from "redux";
// Reducers
import login from "./loginReducer";
import users from "./userReducer";

// Combine Reducers
const MasterReducer = combineReducers({
  login,
  users
});

export default MasterReducer;
