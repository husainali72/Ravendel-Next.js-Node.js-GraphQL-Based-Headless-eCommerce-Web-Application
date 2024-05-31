/* eslint-disable no-case-declarations */
/* eslint-disable no-unused-vars */
import {
  query,
  mutation,
  logoutAndClearData,
  setItemToLocalStorage,
  removeItemFromLocalStorage,
  getItemFromLocalStorage,
  handleError,
} from "../../utills/helpers";
import { ADD_CART } from "../../queries/cartquery";
import {
  ADD_TO_CART,
  INCRESE_QUANTITY,
  REMOVE_VALUE,
  REMOVE_ALL_VALUE,
  CREATE_CART_ON_LOGIN,
  SET_USER_CART,
  CART_LOADING,
  CART_FAILURE,
  calculateUserCart,
} from "../actions/cartAction";
import { LOGGED_OUT } from "../actions/userlogoutAction";
import { get } from "lodash";
const initialState = {
  cartItems: [],
  totalSummary: {},
  cartId: "",
};

// Check if localStorage is available
const isLocalStorageAvailable =
  typeof window !== "undefined" && window.localStorage;

// Retrieve state from localStorage on app start
if (isLocalStorageAvailable) {
  const parsedState = getItemFromLocalStorage("persistantState");
  initialState.cartItems = parsedState.cartItems || [];
  initialState.totalSummary = parsedState.totalSummary || {};
}

function cartReducer(state = initialState, action) {
  switch (action.type) {
    case SET_USER_CART:
      return {
        ...state,
        cartId: get(action, "payload.id", ""),
        loading: false,
        cartItems: get(action, "payload.cartItems", []),
        totalSummary: get(action, "payload.totalSummary", {}),
      };
    case CART_LOADING:
      return {
        ...state,
        loading: true,
      };
    case CART_FAILURE:
      return {
        ...state,
        loading: false,
      };
    case LOGGED_OUT:
      return {
        ...state,
        cartId: "",
        cartItems: [],
        totalSummary: {},
        loading: false,
      };
    case ADD_TO_CART:
      let productCart = [];
      if (typeof window !== "undefined") {
        productCart = getItemFromLocalStorage("cart");
        state.cartItems = productCart;
      }
      let productInCart = [...get(state, "cartItems", [])];
      const { product: productToAdd } = get(action, "payload", []);

      // Check if the product already exists in the cart
      const existingProductIndex = productInCart.findIndex(
        (item) =>
          item._id === productToAdd._id &&
          item.variantId === productToAdd.variantId
      );
      if (existingProductIndex !== -1) {
        // If product exists, increase its quantity
        productInCart[existingProductIndex].quantity += productToAdd?.qty;
      } else {
        // If product doesn't exist, add it to the cart
        productToAdd.quantity = productToAdd?.qty;
        productInCart.push(productToAdd);
      }
      setItemToLocalStorage("cart", productInCart);

      return {
        ...state,
        cartItems: productInCart,
        loading: false,
      };

    case CREATE_CART_ON_LOGIN: {
      const { id, cart, dispatch ,router} = get(action, "payload");
      let variables = { userId: id, products: cart };
      mutation(ADD_CART, variables)
        .then(async(res) => {
          removeItemFromLocalStorage("cart");
          await dispatch(calculateUserCart(id));
        })
        .catch((error) => {
          handleError(error, dispatch,router);
        });
      return {
        ...state,
        loading: false,
      };
    }

    case REMOVE_VALUE:
      const cartsProducts = getItemFromLocalStorage("cart");
      const productIdToRemove = get(action, "payload.id");
      const variantIdToRemove = get(action, "payload.variantId");
      const product = cartsProducts?.filter((item) => {
        const cartItemId = get(item, "_id", ""); // Retrieve item ID from cart item
        const cartItemVariantId = get(item, "variantId", "");
        if (cartItemVariantId && variantIdToRemove) {
          return (
            cartItemId !== productIdToRemove &&
            cartItemVariantId !== variantIdToRemove
          );
        } else {
          return cartItemId !== productIdToRemove;
        }
      });
      setItemToLocalStorage("cart", product);
      return { ...state, cartItems: product, loading: false, totalSummary: {} };

    case REMOVE_ALL_VALUE:
      removeItemFromLocalStorage("cart");
      return { ...state, cartItems: [], loading: false, totalSummary: {} };

    case INCRESE_QUANTITY:
      const cart = getItemFromLocalStorage("cart");
      const productIdToUpdate = get(action.payload, "_id");
      const variantIdToUpdate = get(action.payload, "variantId");
      let existingItemIndex = cart?.findIndex((item) => {
        const cartItemId = get(item, "_id", ""); // Retrieve item ID from cart item
        const cartItemVariantId = get(item, "variantId", "");
        if (cartItemId && cartItemVariantId) {
          // Check both product ID and variant ID when variant ID is not an empty string
          return (
            cartItemId === productIdToUpdate &&
            cartItemVariantId === variantIdToUpdate
          );
        } else {
          // Check only product ID when variant ID is an empty string
          return cartItemId === productIdToUpdate;
        }
      });
      if (existingItemIndex !== -1) {
        cart[existingItemIndex].quantity = get(
          action,
          "payload.updatedQuantity",
          1
        );
      }
      setItemToLocalStorage("cart", cart);
      return { ...state, cartItems: cart, loading: false, totalSummary: {} };
    default:
      return state;
  }
}
export default cartReducer;
