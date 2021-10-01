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
      dispatch({
        type: CUSTOMER_FAIL,
      });
      if (response.data.addCustomer.success) {
        return dispatch({
          type: ALERT_SUCCESS,
          payload: {
            boolean: true,
            message: "Customer added successfully",
            error: false
          }
        });
      }else {
        return dispatch({
          type: ALERT_SUCCESS,
          payload: { boolean: true, message: response.data.addCustomer.message, error: true }
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
      dispatch({
        type: CUSTOMER_FAIL
      });
      if (response.data.addAddressBook.success) {

        return dispatch({
          type: ALERT_SUCCESS,
          payload: {
            boolean: true,
            message: "Address added successfully",
            error: false
          }
        });
      }else {
        return dispatch({
          type: ALERT_SUCCESS,
          payload: { boolean: true, message: response.data.addAddressBook.message, error: true }
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
      dispatch({
        type: CUSTOMER_FAIL
      });
      if (response.data.updateCustomer.success) {
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
      }else{
        return dispatch({
          type: ALERT_SUCCESS,
          payload: { boolean: true, message: response.data.updateCustomer.message, error: true }
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

export const addressbookUpdateAction = object => dispatch => {
  dispatch({
    type: CUSTOMER_LOADING
  });
  mutation(UPDATE_ADDRESSBOOK, object)
    .then(response => {
      dispatch({
        type: CUSTOMER_FAIL
      });
      if (response.data.updateAddressBook.success) {

        dispatch({
          type: ALERT_SUCCESS,
          payload: {
            boolean: true,
            message: "Address updated successfully",
            error: false
          }
        });

        return;
      }else {

        return dispatch({
          type: ALERT_SUCCESS,
          payload: { boolean: true, message: response.data.updateAddressBook.message, error: true }
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

export const customerDeleteAction = id => dispatch => {
  dispatch({
    type: CUSTOMER_LOADING
  });
  mutation(DELETE_CUSTOMER, { id })
    .then(response => {
      dispatch({
        type: CUSTOMER_FAIL
      });
      if (response.data.deleteCustomer.success) {

        dispatch(customersAction());

        return dispatch({
          type: ALERT_SUCCESS,
          payload: {
            boolean: true,
            message: "Customer deleted successfully",
            error: false
          }
        });
      }else {
        return dispatch({
          type: ALERT_SUCCESS,
          payload: { boolean: true, message: response.data.deleteCustomer.message, error: true }
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
      dispatch({
        type: CUSTOMER_FAIL
      });
      if (response.data.deleteAddressBook.success) {
        return dispatch({
          type: ALERT_SUCCESS,
          payload: {
            boolean: true,
            message: "Address deleted successfully",
            error: false
          }
        });
      }else {
        return dispatch({
          type: ALERT_SUCCESS,
          payload: { boolean: true, message: response.data.deleteAddressBook.message, error: true }
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
