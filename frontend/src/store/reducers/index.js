import { combineReducers } from "redux";

import login from "./loginReducer";
import settings from "./settingReducer";

// Combine Reducers
const MasterReducer = combineReducers({
  login,
  settings
});

export default MasterReducer;
