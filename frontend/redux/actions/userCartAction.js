export const ADD_TO_CART_USER = "ADD_TO_CART_USER"
export const USER_CART = "USER_CART"
export const GET_USER_CARTS = "GET_USER_CARTS";
import { query } from "../../utills/helpers";
import { GET_USER_CART } from "../../queries/cartquery";

export const userCartAction = (card_id) => (dispatch) => {
    dispatch({
        type: ADD_TO_CART_USER,
        payload: {
            card_id
        },
    })
}

export const userCarts = (id, token) => (dispatch) => {
    let variable={id:id}
    query(GET_USER_CART, variable, token).then(res => {
        return dispatch({
            type: USER_CART,
            payload: res.data.cartbyUser.products
        })
    })

}