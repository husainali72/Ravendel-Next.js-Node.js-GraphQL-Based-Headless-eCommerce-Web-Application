import { CUSTOMERS_SUCCESS } from "../actions/customerAction"

const initialState = {
    customers: [],
    customer: {},
    loading: false,
    success: false
};

export default (state = initialState, action) => {
    switch (action.type) {
        case CUSTOMERS_SUCCESS:
            return {
                ...state,
                customer: action.payload,
                loading: false
            };

    }
}