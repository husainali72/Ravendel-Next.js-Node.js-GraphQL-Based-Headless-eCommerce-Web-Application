/* eslint-disable no-unused-vars */
import { ADD_TO_CART_USER, USER_CART } from "../actions/userCartAction"
import { mutation } from "../../utills/helpers";
import { UPDATE_CART_PRODUCT } from "../../queries/cartquery"

const initialState = {
    userCart: [],
    card_id: "",
}
function userCartReducer(state = initialState, action) {
    switch (action.type) {
        case ADD_TO_CART_USER:
            console.log("action", action.payload)
            state.card_id = action.payload.card_id
            return state;
        case USER_CART:
            console.log("usercart action", action.payload)
            state.userCart = action.payload
            return state;
        default:
            return state;
    }
}
export default userCartReducer;