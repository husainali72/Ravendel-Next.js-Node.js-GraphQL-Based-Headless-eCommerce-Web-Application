import {PRODUCT_REVIEWS_ADD,ADD_REVIEW,LOAD_REVIEW, PRODUCTS_FAIL, PRODUCTS_LOADING, PRODUCTS_SUCCESS } from "../actions/productAction";

const initialState = {
    productReviews: [],
    loading: false,
    success: false,
    products: []
}

const productReducer = (state = initialState, action) => {
    switch (action.type) {
        // case ADD_REVIEW:
        case PRODUCT_REVIEWS_ADD:
            return {
                ...state,
                loading: false,
                success: true,
            }

        case PRODUCTS_LOADING:
            return {
                ...state,
                success: false,
                loading: true,
            };

        case PRODUCTS_SUCCESS:
            return {
                ...state,
                products: action.payload,
                loading: false,
                success: true,
              };

        case PRODUCTS_FAIL:
            return {
                ...state,
                products: [],
                loading: false,
                success: false,
              };
        case LOAD_REVIEW:
            console.log('andar dispatch ke ', action.payload)
            return{
                ...state,
                loading: false,
                productReviews: action.payload,
                success: true,
               
              }
        default:
            return state;
    }

}
export default productReducer;