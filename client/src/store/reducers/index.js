import { combineReducers } from "redux";
// Reducers
import login from "./loginReducer";

// Combine Reducers
const MasterReducer = combineReducers({
  login
});

export default MasterReducer;
