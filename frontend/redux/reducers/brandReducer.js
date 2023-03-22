import { BRAND_SUCCESS, GET_CATEGORY } from "../actions/brandAction";

const initialState = {
    brands: [],
    brand: {},
    category: [],
    loading: false,
    success: false,
};

const brandReducer = (state = initialState, action) => {
    switch (action.type) {
        case BRAND_SUCCESS:
            return {
                ...state,
                brand: action.payload,
                loading: false,
            };
        case GET_CATEGORY:
            return {
                ...state,
                category: action.payload,
                loading: false,
            }
        default:
            return state;
    }
}
export default brandReducer;
