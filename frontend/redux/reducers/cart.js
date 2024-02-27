import { query, mutation } from "../../utills/helpers";
import { ADD_TO_CART_QUERY, UPDATE_CART_PRODUCT, GET_USER_CART, ADD_CART } from "../../queries/cartquery";
import { ADD_TO_CART, INCRESE_QUANTITY, REMOVE_VALUE, REMOVE_ALL_VALUE, DECREASE_QUANTITY, UPDATE_CART_ON_LOGIN, CREATE_CART_ON_LOGIN, SET_USER_CART, CART_LOADING, CART_FAILURE } from "../actions/cartAction";
import logoutDispatch, { LOGGED_OUT } from "../actions/userlogoutAction";
import { LogOutUser1 } from "../../components/Header";
import { getSettings } from "../actions/settingAction";
import { get } from "lodash";
const initialState = {
    cartItems: [],
    totalSummary: {},
    cartId:''
};

// Check if localStorage is available
const isLocalStorageAvailable = typeof window !== 'undefined' && window.localStorage;

// Retrieve state from localStorage on app start
if (isLocalStorageAvailable) {
    const persistedState = localStorage.getItem("persistantState");
    if (persistedState !== null) {
        const parsedState = JSON.parse(persistedState);
        initialState.cartItems = parsedState.cartItems || [];
        initialState.totalSummary = parsedState.totalSummary || {};
    }
}

function cartReducer(state = initialState, action) {
    switch (action.type) {
        case SET_USER_CART:
            return {
                ...state,
                cartId:action.payload.id||'',
                loading:false,
                cartItems: action.payload.cartItems || [],
                totalSummary: action.payload.totalSummary || {},
            };
        case CART_LOADING:
            return {
                ...state,
                loading:true
            };
        case CART_FAILURE:
            return {
                ...state,
                loading:false
            };
        case LOGGED_OUT:
            return {
                ...state,
                cartId:'',
                cartItems:[],
                totalSummary:{},
                loading:false
            };
        case ADD_TO_CART:
            let productCart = [];
            if (typeof window !== "undefined") {
                const carts = localStorage.getItem("cart");
                if(carts!==null){  
                  const persistState = localStorage.getItem("persistantState");
                  productCart = JSON.parse(carts);
                  state.cartItems = productCart;
            }
            }
            let productInCart = [];
            if (state && state?.cartItems?.length > 0) {
                productInCart = [...state.cartItems];
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
                                productId: product._id,
                                qty: product.quantity,
                                productTitle: product.name,
                                productImage: product.feature_image?.original,
                                productPrice: product.pricing.sellprice,
                                productQuantity: product.productQuantity,
                                attributes: product.attributes,
                            };
                        });
        
                        let cart_id = "";
                        query(GET_USER_CART, id, token).then(res => {
                            cart_id = res.data.cartbyUser.id;
                            state.cartId = res.data.cartbyUser.id;
        
                            let variables = {
                                id: cart_id,
                                products: Cartt,
                                total: 0,
                            };
        
                            mutation(UPDATE_CART_PRODUCT, variables, token).then(res =>
                                console.log("update res", res)
                            );
                        });
        
                        isProductInCart = true;
                        break;
                    }
                }
        
                if (!isProductInCart) {
                    productToAdd.quantity = quantity;
                    let variables = {
                        total: productToAdd.pricing.sellprice * quantity,
                        userId: id,
                        productId: productToAdd._id,
                        qty: quantity,
                        productTitle: productToAdd.name,
                        productImage: productToAdd.feature_image?.original,
                        productPrice: productToAdd.pricing.sellprice,
                    };
        
                    mutation(ADD_TO_CART_QUERY, variables, token).then(res =>
                        console.log("Product Add successfully", res)
                    );
        
                    productInCart.push(productToAdd);
                }
        
                // Return an object with "cartItems" and "totalSummary"
                return {
                    ...state,
                    cartItems: productInCart,
                    loading:false,
                    totalSummary: action.payload.totalSummary || {}, // or however you want to update totalSummary
                };
            }
            else {
                for (let i = 0; i < productInCart?.length; i++) {
                    const product = productInCart[i];
                    if (product._id === productToAdd._id && product.variantId === productToAdd.variantId) {
                        // product.quantity = product.quantity + quantity;
                        isProductInCart = true;
                        break;
                    }
                }
                if (!isProductInCart) {
                    productToAdd.quantity = quantity;
                    productInCart.push(productToAdd);
                }
                localStorage.setItem("cart", JSON.stringify(productInCart));
                return {
                    ...state,
                    cartItems: productInCart,
                    loading:false,
                    totalSummary: action.payload.totalSummary || {}, // or however you want to update totalSummary
                };
            }

        case CREATE_CART_ON_LOGIN: {
            const { id, cart, dispatch } = action.payload;
            let variables = { userId: id, products: cart }
            mutation(ADD_CART, variables,dispatch).then((res) => {
                dispatch({ type: 'ADDED_CART', payload: true })
                window.location.pathname = '/'
            }).catch((errors) => {
                const networkErrorExtensions = get(
                    errors  ,
                    "networkError.result.errors[0].extensions"
                  );
                  if (networkErrorExtensions?.code === 401) {
                    localStorage.setItem("userCart", JSON.stringify([]));
                    localStorage.setItem("cart", JSON.stringify([]));
                    dispatch(logoutDispatch())
                  }
            
            });

            return {...state,
                cartItems:action.payload.cart||[],
                loading:false,
                totalSummary:{}
                };
        }

        case UPDATE_CART_ON_LOGIN: {
            const { id, cart } = action.payload;
            let variables = { id, products: cart }
            mutation(UPDATE_CART_PRODUCT, variables);

            // return action.payload.cart || [];
            return {...state,
                cartItems:action.payload.cart||[],
                loading:false,
                totalSummary:{}
                };
        }

        case REMOVE_VALUE:
            const Carts = JSON.parse(localStorage.getItem("cart"))

            const product = Carts.filter((item) => {
                if (item.variantId && action.payload.variantId) { return item._id !== action.payload.id && item.variantId !== action.payload.variantId } else {
                    return item._id !== action.payload.id
                }
            })

            localStorage.setItem("cart", JSON.stringify(product))
            return {...state,
                cartItems:product,
                loading:false,
                totalSummary:{}
                };;

        case REMOVE_ALL_VALUE:
            localStorage.setItem( "cart",  JSON.stringify([]));
            localStorage.setItem( "totalSummary",   JSON.stringify({}) );
            
            return {...state,
            cartItems:[],
            loading:false,
            totalSummary:{}
            };

        case INCRESE_QUANTITY:

            const cart = JSON.parse(localStorage.getItem("cart"))   //api for increasing particulat users carts items quantity if user is authhenticated
            let isExisted = cart.some(item => item._id === action.payload._id && item.variantId === action.payload.variantId)
            if (isExisted) {
                for (let item of cart) {

                    if (item.variantId && action.payload.variantId) {

                        if (item._id === action.payload._id && item.variantId === action.payload.variantId) {
                            action.payload.originalQuantity >= item.quantity && (item.quantity += 1);
                            break;
                        }
                    } else {
                        if (item._id === action.payload._id) {
                            action.payload.originalQuantity >= item.quantity && (item.quantity += 1);
                            break;
                        }
                    }
                }
            }
            localStorage.setItem("cart", JSON.stringify(cart))
            return  {...state,
                cartItems:cart,
                loading:false,
                totalSummary:{}
                };;

        case DECREASE_QUANTITY:
            const CartItem = JSON.parse(localStorage.getItem("cart"))
            let isExisteds = CartItem.filter(item => item._id === action.payload._id && item.variantId === action.payload.variantId)
            if (isExisteds) {
                CartItem.forEach((item) => {

                    if (item._id === action.payload._id && item.variantId === action.payload.variantId) {
                        item.quantity -= 1;
                    }
                    return isExisted;
                });
            }

            localStorage.setItem("cart", JSON.stringify(CartItem))
            return  {...state,
                cartItems:CartItem,
                loading:false,
                totalSummary:{}
                };;
        default:
            return state;
    }
}
export default cartReducer;