import {
  GET_CUSTOMERS,
  GET_CUSTOMER,
  ADD_CUSTOMER,
  UPDATE_CUSTOMER,
  DELETE_CUSTOMER,
  ADD_ADDRESSBOOK,
  UPDATE_ADDRESSBOOK,
  DELETE_ADDRESSBOOK,
} from "../../queries/customerQuery";

import { ALERT_SUCCESS } from "../reducers/alertReducer";
import { mutation, query } from "../../utils/service";

import {
  client_app_route_url,
  getResponseHandler,
  mutationResponseHandler,
} from "../../utils/helper";

export const customersAction = () => (dispatch) => {
  dispatch({
    type: CUSTOMER_LOADING,
  });
  query(GET_CUSTOMERS)
    .then((response) => {
      const [error, success, message, data] = getResponseHandler(
        response,
        "customers"
      );
      dispatch({
        type: LOADING_FALSE,
      });

      if (error) {
        dispatch({
          type: ALERT_SUCCESS,
          payload: { boolean: false, message: message, error: true },
        });
      }

      if (success) {
        return dispatch({
          type: CUSTOMERS_SUCCESS,
          payload: data,
        });
      }
    })
    .catch((error) => {
      dispatch({
        type: CUSTOMER_FAIL,
      });
      return dispatch({
        type: ALERT_SUCCESS,
        payload: { boolean: false, message: error, error: true },
      });
    });
};

export const customerAction = (id) => (dispatch) => {
  dispatch({
    type: CUSTOMER_LOADING,
  });
  query(GET_CUSTOMER, { id: id })
    .then((response) => {
      const [error, success, message, data] = getResponseHandler(
        response,
        "customer"
      );
      dispatch({
        type: LOADING_FALSE,
      });

      if (error) {
        dispatch({
          type: ALERT_SUCCESS,
          payload: { boolean: false, message: message, error: true },
        });
      }

      if (success) {
        return dispatch({
          type: CUSTOMER_SUCCESS,
          payload: data,
        });
      }
    })
    .catch((error) => {
      dispatch({
        type: CUSTOMER_FAIL,
      });
      return dispatch({
        type: ALERT_SUCCESS,
        payload: { boolean: false, message: error, error: true },
      });
    });
};

export const customerAddAction = (object, navigate) => (dispatch) => {
  dispatch({
    type: CUSTOMER_LOADING,
  });
  mutation(ADD_CUSTOMER, object)
    .then((response) => {
      dispatch({
        type: CUSTOMER_FAIL,
      });

      const [error, success, message, data] = mutationResponseHandler(
        response,
        "addCustomer"
      );
      dispatch({
        type: LOADING_FALSE,
      });

      if (error) {

        dispatch({
          type: ALERT_SUCCESS,
          payload: { boolean: false, message: message, error: true },
        });
      }

      if (success) {
        dispatch(customersAction());
        navigate(`${client_app_route_url}all-customer`)
        return dispatch({
          type: ALERT_SUCCESS,
          payload: { boolean: true, message: message, error: false },
        });
      }
    })
    .catch((error) => {
      dispatch({
        type: CUSTOMER_FAIL,
      });
      return dispatch({
        type: ALERT_SUCCESS,
        payload: { boolean: false, message: error, error: true },
      });
    });
};

export const addressbookAddAction = (object) => (dispatch) => {
  dispatch({
    type: CUSTOMER_LOADING,
  });
  mutation(ADD_ADDRESSBOOK, object)
    .then((response) => {
      dispatch({
        type: CUSTOMER_FAIL,
      });

      const [error, success, message, data] = mutationResponseHandler(
        response,
        "addAddressBook"
      );
      dispatch({
        type: LOADING_FALSE,
      });

      if (error) {
        dispatch({
          type: ALERT_SUCCESS,
          payload: { boolean: false, message: message, error: true },
        });
      }

      if (success) {
        dispatch(customersAction());

        return dispatch({
          type: ALERT_SUCCESS,
          payload: { boolean: true, message: message, error: false },
        });
      }
    })
    .catch((error) => {
      dispatch({
        type: CUSTOMER_FAIL,
      });
      return dispatch({
        type: ALERT_SUCCESS,
        payload: { boolean: false, message: error, error: true },
      });
    });
};

export const customerUpdateAction = (object, navigate) => (dispatch) => {
  dispatch({
    type: CUSTOMER_LOADING,
  });

  mutation(UPDATE_CUSTOMER, object)
    .then((response) => {
      dispatch({
        type: CUSTOMER_FAIL,
      });

      const [error, success, message, data] = mutationResponseHandler(
        response,
        "updateCustomer"
      );

      dispatch({
        type: LOADING_FALSE,
      });

      if (error) {
        dispatch({
          type: ALERT_SUCCESS,
          payload: { boolean: false, message: message, error: true },
        });
      }

      if (success) {
        dispatch(customersAction());
        // jumpTo(`${client_app_route_url}all-customer`);
        navigate(`${client_app_route_url}all-customer`);
        return dispatch({
          type: ALERT_SUCCESS,
          payload: { boolean: true, message: message, error: false },
        });
      }
    })
    .catch((error) => {
      dispatch({
        type: CUSTOMER_FAIL,
      });
      return dispatch({
        type: ALERT_SUCCESS,
        payload: { boolean: false, message: error, error: true },
      });
    });
};

export const addressbookUpdateAction = (object) => (dispatch) => {
  dispatch({
    type: CUSTOMER_LOADING,
  });
  mutation(UPDATE_ADDRESSBOOK, object)
    .then((response) => {
      dispatch({
        type: CUSTOMER_FAIL,
      });

      const [error, success, message, data] = mutationResponseHandler(
        response,
        "updateAddressBook"
      );
      dispatch({
        type: LOADING_FALSE,
      });

      if (error) {
        dispatch({
          type: ALERT_SUCCESS,
          payload: { boolean: false, message: message, error: true },
        });
      }

      if (success) {
        dispatch(customersAction());

        return dispatch({
          type: ALERT_SUCCESS,
          payload: { boolean: true, message: message, error: false },
        });
      }
    })
    .catch((error) => {
      dispatch({
        type: CUSTOMER_FAIL,
      });
      return dispatch({
        type: ALERT_SUCCESS,
        payload: { boolean: false, message: error, error: true },
      });
    });
};

export const customerDeleteAction = (id) => (dispatch) => {
  dispatch({
    type: CUSTOMER_LOADING,
  });
  mutation(DELETE_CUSTOMER, { id })
    .then((response) => {
      dispatch({
        type: CUSTOMER_FAIL,
      });

      const [error, success, message, data] = mutationResponseHandler(
        response,
        "deleteCustomer"
      );
      dispatch({
        type: LOADING_FALSE,
      });

      if (error) {
        dispatch({
          type: ALERT_SUCCESS,
          payload: { boolean: false, message: message, error: true },
        });
      }

      if (success) {
        dispatch(customersAction());

        return dispatch({
          type: ALERT_SUCCESS,
          payload: { boolean: true, message: message, error: false },
        });
      }
    })
    .catch((error) => {
      dispatch({
        type: CUSTOMER_FAIL,
      });
      return dispatch({
        type: ALERT_SUCCESS,
        payload: { boolean: false, message: error, error: true },
      });
    });
};

export const addressbookDeleteAction = (object) => (dispatch) => {
  dispatch({
    type: CUSTOMER_LOADING,
  });
  mutation(DELETE_ADDRESSBOOK, object)
    .then((response) => {
      dispatch({
        type: CUSTOMER_FAIL,
      });

      const [error, success, message, data] = mutationResponseHandler(
        response,
        "deleteAddressBook"
      );
      dispatch({
        type: LOADING_FALSE,
      });

      if (error) {
        dispatch({
          type: ALERT_SUCCESS,
          payload: { boolean: false, message: message, error: true },
        });
      }

      if (success) {
        dispatch(customersAction());
        return dispatch({
          type: ALERT_SUCCESS,
          payload: { boolean: true, message: message, error: false },
        });
      }
    })
    .catch((error) => {
      dispatch({
        type: CUSTOMER_FAIL,
      });
      return dispatch({
        type: ALERT_SUCCESS,
        payload: { boolean: false, message: error, error: true },
      });
    });
};

export const CUSTOMER_LOADING = "CUSTOMER_LOADING";
export const CUSTOMERS_SUCCESS = "CUSTOMERS_SUCCESS";
export const CUSTOMER_SUCCESS = "CUSTOMER_SUCCESS";
export const CUSTOMER_FAIL = "CUSTOMER_FAIL";
export const LOADING_FALSE = "LOADING_FALSE";
