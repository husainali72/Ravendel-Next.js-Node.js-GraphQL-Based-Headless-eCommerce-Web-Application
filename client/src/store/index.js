import { createStore, applyMiddleware, compose } from "redux";
import thunk from "redux-thunk";
import MasterReducer from "./reducers";

const initialState = {};
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(
  MasterReducer,
  initialState,
  composeEnhancers(applyMiddleware(thunk))
);

export default store;
