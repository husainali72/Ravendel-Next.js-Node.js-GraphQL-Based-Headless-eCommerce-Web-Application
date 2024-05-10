import settingReducer from './setting';
import { combineReducers } from 'redux';
import cartReducer from "./cart";
import checkoutReducer from "./checkoutReducer";
import brandReducer from "./brandReducer";
import loginReducer from "./loginReducer";
import customerReducer from "./customerReducer";
import blogReducer from "./blogReducer";
import userCartReducer from "./userReducer";
import stripeReducer from "./stripePaymentReducer";
import { USER_LOGGED_OUT } from "../actions/userlogoutAction";
import productReducer from './productReducer';
import { addedCart } from './addedCart';
import orderReducer from './orderReducer';

const appReducer = combineReducers({
    setting: settingReducer,
    cart: cartReducer,
    brand: brandReducer,
    checkout: checkoutReducer,
    login: loginReducer,
    customer: customerReducer,
    blogtags: blogReducer,
    userCart: userCartReducer,
    stripe_Key: stripeReducer,
    products: productReducer,
    addedCart: addedCart,
    order: orderReducer,
});

const rootReducer = (state, action) => {
    // when a logout action is dispatched it will reset redux state
    if (action.type === USER_LOGGED_OUT) {
        state = undefined;
    }

    return appReducer(state, action);
};

export default rootReducer;