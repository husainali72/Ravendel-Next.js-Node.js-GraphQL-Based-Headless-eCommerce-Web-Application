import { query, mutation } from "../../utills/helpers";
import { ADD_TO_CART_QUERY, UPDATE_CART_PRODUCT, GET_USER_CART, ADD_CART } from "../../queries/cartquery";
import { ADD_TO_CART, INCRESE_QUANTITY, REMOVE_VALUE, REMOVE_ALL_VALUE, DECREASE_QUANTITY, UPDATE_CART_ON_LOGIN, CREATE_CART_ON_LOGIN } from "../actions/cartAction";
let cartProduct = []


if (typeof window !== "undefined") {
    const carts = localStorage.getItem("persistantState");
    if (carts === null) cartProduct = undefined;
    cartProduct = JSON.parse(carts)
}

const initialState = cartProduct || []


function cartReducer(state = [], action) {


    switch (action.type) {
        case ADD_TO_CART:
            let productCart = []
            if (typeof window !== "undefined") {
                const carts = localStorage.getItem("cart");
                if (carts === null) cartProduct = undefined;
                const persistState = localStorage.getItem("persistantState");
                productCart = JSON.parse(carts)
                state = productCart
            }
            let productInCart = []
            if (state && state?.length > 0) {
                productInCart = [...state];
            }
            const { product: productToAdd, quantity = 1, token, id } = action.payload;
            let isProductInCart = false;
            if ((id && token) !== undefined) {
                for (let i = 0; i < productInCart?.length; i++) {
                    const product = productInCart[i];
                    if (product._id === productToAdd._id) {
                        product.quantity = product.quantity + quantity;
                        var Cartt = productInCart.map(product => {
                            return {
                                product_id: product._id,
                                qty: product.quantity,
                                product_title: product.name,
                                product_image: product.feature_image?.original,
                                product_price: product.pricing.sellprice,
                                product_quantity: product.product_quantity,
                                attributes: product.attributes
                            }
                        })
                        let cart_id = ""
                        query(GET_USER_CART, id, token).then(res => {
                            cart_id = res.data.cartbyUser.id
                            state.cart_id = res.data.cartbyUser.id

                            let variables = {
                                id: cart_id,
                                products: Cartt,
                                total: 0,
                            }
                            mutation(UPDATE_CART_PRODUCT, variables, token).then(res => console.log("update res", res))
                        })
                        isProductInCart = true;
                        break;
                    }
                }
                if (!isProductInCart) {
                    productToAdd.quantity = quantity;
                    let variables = {
                        total: productToAdd.pricing.sellprice * quantity,
                        user_id: id,
                        product_id: productToAdd._id,
                        qty: quantity,
                        product_title: productToAdd.name,
                        product_image: productToAdd.feature_image?.original,
                        product_price: productToAdd.pricing.sellprice
                    }


                    mutation(ADD_TO_CART_QUERY, variables, token).then(res => console.log("Product Add successfully", res))
                    productInCart.push(productToAdd);
                }


                return productInCart
            }
            else {

                for (let i = 0; i < productInCart?.length; i++) {
                    const product = productInCart[i];
                    if (product._id === productToAdd._id && product.variant_id === productToAdd.variant_id) {
                        product.quantity = product.quantity + quantity;
                        isProductInCart = true;
                        break;
                    }
                }
                if (!isProductInCart) {
                    productToAdd.quantity = quantity;
                    productInCart.push(productToAdd);
                }
                localStorage.setItem("cart", JSON.stringify(productInCart));
                return productInCart
            }

        case CREATE_CART_ON_LOGIN: {
            const { id, cart } = action.payload;
            let variables = { user_id: id, products: cart }
            mutation(ADD_CART, variables);

            return action.payload.cart || [];
        }

        case UPDATE_CART_ON_LOGIN: {
            const { id, cart } = action.payload;
            let variables = { id, products: cart }
            mutation(UPDATE_CART_PRODUCT, variables);

            return action.payload.cart || [];
        }

        case REMOVE_VALUE:
            const Cards = JSON.parse(localStorage.getItem("cart"))
            const product = Cards?.filter(item => item._id !== action.payload.id && item.variant_id !== action.payload.variant_id)
            localStorage.setItem("cart", JSON.stringify(product))
            return product;

        case REMOVE_ALL_VALUE:

            return action.payload;

        case INCRESE_QUANTITY:

            const cart = JSON.parse(localStorage.getItem("cart"))   //api for increasing particulat users carts items quantity if user is authhenticated
            let isExisted = cart.some(item => item._id === action.payload._id && item.variant_id === action.payload.variant_id)
            if (isExisted) {
                for (let item of cart) {

                    if (item._id === action.payload._id && item.variant_id === action.payload.variant_id) {
                        action.payload.originalQuantity > item.quantity && (item.quantity += 1);
                        break;
                    }
                }
            }
            localStorage.setItem("cart", JSON.stringify(cart))
            return cart;

        case DECREASE_QUANTITY:
            const CardItem = JSON.parse(localStorage.getItem("cart"))
            let isExisteds = CardItem.filter(item => item._id === action.payload._id && item.variant_id === action.payload.variant_id)
            if (isExisteds) {
                CardItem.forEach((item) => {
                    if (item._id === action.payload._id && item.variant_id === action.payload.variant_id) {
                        item.quantity -= 1;
                    }
                    return isExisted;
                });
            }

            localStorage.setItem("cart", JSON.stringify(CardItem))
            return CardItem;
        default:
            return state;
    }
}
export default cartReducer;