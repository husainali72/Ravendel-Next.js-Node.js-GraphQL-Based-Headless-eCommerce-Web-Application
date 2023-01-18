import { createStore, applyMiddleware } from 'redux';
import rootReducer from './reducers';
import thunk from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";

// save redux data in local storage 

function saveToLocalStorage(state) {
  const detail = {
    checkout: state.checkout,
    userCart: state.userCart,
    cart: state.cart
  }
  try {
    const serialisedState = JSON.stringify(detail);
    localStorage.setItem("persistantState", serialisedState);
  } catch (e) {
    console.warn(e);
  }
}

// load string from localStarage and convert into an Object

function loadFromLocalStorage() {
  try {
    if (typeof window !== "undefined") {
      const serialisedState = localStorage.getItem("persistantState");
      if (serialisedState === null) return undefined;
      return JSON.parse(serialisedState);
    }
    else {
      return undefined;
    }

  } catch (e) {
    console.warn(e);
    return undefined;
  }
}

const composedMiddlewares = applyMiddleware(thunk);

const storeEnhancers = composeWithDevTools({
  name: "Ravendel-Store"
})(composedMiddlewares)

const store = createStore(rootReducer, loadFromLocalStorage(), storeEnhancers);
store.subscribe(() => saveToLocalStorage(store.getState()));

export default store;