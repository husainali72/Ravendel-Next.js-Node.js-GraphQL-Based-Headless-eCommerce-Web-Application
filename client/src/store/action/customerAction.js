import {
  GET_CUSTOMERS,
  GET_CUSTOMER,
  ADD_CUSTOMER,
  UPDATE_CUSTOMER,
  DELETE_CUSTOMER,
  ADD_ADDRESSBOOK,
  UPDATE_ADDRESSBOOK,
  DELETE_ADDRESSBOOK
} from "../../queries/customerQuery";

import { ALERT_SUCCESS } from "../reducers/alertReducer";
import { mutation, query } from "../../utils/service";
import jumpTo from "../../utils/navigation";

export const customersAction = () => dispatch => {
  dispatch({
    type: CUSTOMER_LOADING
  });
  query(GET_CUSTOMERS)
    .then(response => {
      if (response) {
        return dispatch({
          type: CUSTOMERS_SUCCESS,
          payload: response.data.customers
        });
      }
    })
    .catch(error => {
      dispatch({
        type: CUSTOMER_FAIL
      });
      return dispatch({
        type: ALERT_SUCCESS,
        payload: { boolean: true, message: error, error: true }
      });
    });
};

export const customerAction = id => dispatch => {
  dispatch({
    type: CUSTOMER_LOADING
  });
  query(GET_CUSTOMER, { id: id })
    .then(response => {
      if (response) {
        return dispatch({
          type: CUSTOMER_SUCCESS,
          payload: response.data.customer
        });
      }
    })
    .catch(error => {
      dispatch({
        type: CUSTOMER_FAIL
      });
      return dispatch({
        type: ALERT_SUCCESS,
        payload: { boolean: true, message: error, error: true }
      });
    });
};

export const customerAddAction = object => dispatch => {
  dispatch({
    type: CUSTOMER_LOADING
  });
  mutation(ADD_CUSTOMER, object)
    .then(response => {
      if (response) {
        dispatch({
          type: CUSTOMERS_SUCCESS,
          payload: response.data.addCustomer
        });

        return dispatch({
          type: ALERT_SUCCESS,
          payload: {
            boolean: true,
            message: "Customer added successfully",
            error: false
          }
        });
      }
    })
    .catch(error => {
      dispatch({
        type: CUSTOMER_FAIL
      });
      return dispatch({
        type: ALERT_SUCCESS,
        payload: { boolean: true, message: error, error: true }
      });
    });
};

export const addressbookAddAction = object => dispatch => {
  dispatch({
    type: CUSTOMER_LOADING
  });
  mutation(ADD_ADDRESSBOOK, object)
    .then(response => {
      if (response) {
        dispatch({
          type: CUSTOMERS_SUCCESS,
          payload: response.data.addAddressBook
        });

        return dispatch({
          type: ALERT_SUCCESS,
          payload: {
            boolean: true,
            message: "Address added successfully",
            error: false
          }
        });
      }
    })
    .catch(error => {
      dispatch({
        type: CUSTOMER_FAIL
      });
      return dispatch({
        type: ALERT_SUCCESS,
        payload: { boolean: true, message: error, error: true }
      });
    });
};

export const customerUpdateAction = object => dispatch => {
  dispatch({
    type: CUSTOMER_LOADING
  });
  mutation(UPDATE_CUSTOMER, object)
    .then(response => {
      if (response) {
        dispatch({
          type: CUSTOMERS_SUCCESS,
          payload: response.data.updateCustomer
        });

        dispatch({
          type: ALERT_SUCCESS,
          payload: {
            boolean: true,
            message: "Customer updated successfully",
            error: false
          }
        });

        return;
      }
    })
    .catch(error => {
      dispatch({
        type: CUSTOMER_FAIL
      });
      return dispatch({
        type: ALERT_SUCCESS,
        payload: { boolean: true, message: error, error: true }
      });
    });
};

export const addressbookUpdateAction = object => dispatch => {
  dispatch({
    type: CUSTOMER_LOADING
  });
  mutation(UPDATE_ADDRESSBOOK, object)
    .then(response => {
      if (response) {
        dispatch({
          type: CUSTOMERS_SUCCESS,
          payload: response.data.updateAddressBook
        });

        dispatch({
          type: ALERT_SUCCESS,
          payload: {
            boolean: true,
            message: "Address updated successfully",
            error: false
          }
        });

        return;
      }
    })
    .catch(error => {
      dispatch({
        type: CUSTOMER_FAIL
      });
      return dispatch({
        type: ALERT_SUCCESS,
        payload: { boolean: true, message: error, error: true }
      });
    });
};

export const customerDeleteAction = id => dispatch => {
  dispatch({
    type: CUSTOMER_LOADING
  });
  mutation(DELETE_CUSTOMER, { id })
    .then(response => {
      if (response) {
        dispatch({
          type: CUSTOMERS_SUCCESS,
          payload: response.data.deleteCustomer
        });
        return dispatch({
          type: ALERT_SUCCESS,
          payload: {
            boolean: true,
            message: "Customer deleted successfully",
            error: false
          }
        });
      }
    })
    .catch(error => {
      dispatch({
        type: CUSTOMER_FAIL
      });
      return dispatch({
        type: ALERT_SUCCESS,
        payload: { boolean: true, message: error, error: true }
      });
    });
};

export const addressbookDeleteAction = object => dispatch => {
  dispatch({
    type: CUSTOMER_LOADING
  });
  mutation(DELETE_ADDRESSBOOK, object)
    .then(response => {
      if (response) {
        dispatch({
          type: CUSTOMERS_SUCCESS,
          payload: response.data.deleteAddressBook
        });
        return dispatch({
          type: ALERT_SUCCESS,
          payload: {
            boolean: true,
            message: "Address deleted successfully",
            error: false
          }
        });
      }
    })
    .catch(error => {
      dispatch({
        type: CUSTOMER_FAIL
      });
      return dispatch({
        type: ALERT_SUCCESS,
        payload: { boolean: true, message: error, error: true }
      });
    });
};

export const CUSTOMER_LOADING = "CUSTOMER_LOADING";
export const CUSTOMERS_SUCCESS = "CUSTOMERS_SUCCESS";
export const CUSTOMER_SUCCESS = "CUSTOMER_SUCCESS";
export const CUSTOMER_FAIL = "CUSTOMER_FAIL";
