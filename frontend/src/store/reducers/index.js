import { combineReducers } from "redux";

import login from "./loginReducer";
import settings from "./settingReducer";
import cart from "./cartReducer";

// Combine Reducers
const MasterReducer = combineReducers({
  login,
  settings,
  cart
});

export default MasterReducer;
