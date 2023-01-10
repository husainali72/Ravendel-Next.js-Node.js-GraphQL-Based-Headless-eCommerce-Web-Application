import { createStore, applyMiddleware, compose } from "redux";
import thunk from "redux-thunk";
import MasterReducer from "./reducers";
//import IntialState from "./intialState";
//import { syncHistoryWithStore } from 'react-router-redux';
//import browserHistory from '../history'

const initialState = {};
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(
  MasterReducer,
  initialState,
  composeEnhancers(applyMiddleware(thunk))
);
//const history = syncHistoryWithStore(browserHistory, store);

//export {store, history };
export default store;
