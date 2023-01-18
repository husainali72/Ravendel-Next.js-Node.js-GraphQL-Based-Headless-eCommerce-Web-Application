
export const customerAction = (detail) => dispatch => {
    dispatch({
        type: CUSTOMER_SUCCESS,
        payload: detail,
    })
}

export const CUSTOMER_LOADING = "CUSTOMER_LOADING";
export const CUSTOMERS_SUCCESS = "CUSTOMERS_SUCCESS";
export const CUSTOMER_SUCCESS = "CUSTOMER_SUCCESS";
export const CUSTOMER_FAIL = "CUSTOMER_FAIL";
