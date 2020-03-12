import {
  GET_SHIPPING,
  UPDATE_GLOBALSHIPPING,
  ADD_SHIPPINGCLASS,
  UPDATE_SHIPPINGCLASS,
  DELETE_SHIPPINGCLASS
} from "../../queries/shippingQuery";

import { ALERT_SUCCESS } from "../reducers/alertReducer";
import { mutation, query } from "../../utils/service";
//import jumpTo from "../../utils/navigation";

export const shippingAction = () => dispatch => {
  dispatch({
    type: SHIPPING_LOADING
  });
  query(GET_SHIPPING)
    .then(response => {
      if (response) {
        return dispatch({
          type: SHIPPING_SUCCESS,
          payload: response.data.shipping
        });
      }
    })
    .catch(error => {
      dispatch({
        type: SHIPPING_FAIL
      });
      return dispatch({
        type: ALERT_SUCCESS,
        payload: { boolean: true, message: error, error: true }
      });
    });
};

export const globalShippingUpdateAction = object => dispatch => {
  dispatch({
    type: SHIPPING_LOADING
  });
  mutation(UPDATE_GLOBALSHIPPING, object)
    .then(response => {
      if (response) {
        dispatch({
          type: SHIPPING_SUCCESS,
          payload: response.data.updateGlobalShipping
        });

        //jumpTo("/all-brands");

        return dispatch({
          type: ALERT_SUCCESS,
          payload: {
            boolean: true,
            message: "updated successfully",
            error: false
          }
        });
      }
    })
    .catch(error => {
      dispatch({
        type: SHIPPING_FAIL
      });

      return dispatch({
        type: ALERT_SUCCESS,
        payload: { boolean: true, message: error, error: true }
      });
    });
};

export const shippingClassAddAction = object => dispatch => {
  dispatch({
    type: SHIPPING_LOADING
  });
  mutation(ADD_SHIPPINGCLASS, object)
    .then(response => {
      if (response) {
        dispatch({
          type: SHIPPING_SUCCESS,
          payload: response.data.addShippingClass
        });

        //jumpTo("/all-brands");

        dispatch({
          type: ALERT_SUCCESS,
          payload: {
            boolean: true,
            message: "added successfully",
            error: false
          }
        });

        return;
      }
    })
    .catch(error => {
      dispatch({
        type: SHIPPING_FAIL
      });

      return dispatch({
        type: ALERT_SUCCESS,
        payload: { boolean: true, message: error, error: true }
      });
    });
};

export const shippingClassUpdateAction = object => dispatch => {
  dispatch({
    type: SHIPPING_LOADING
  });
  mutation(UPDATE_SHIPPINGCLASS, object)
    .then(response => {
      if (response) {
        dispatch({
          type: SHIPPING_SUCCESS,
          payload: response.data.updateShippingClass
        });

        //jumpTo("/all-brands");

        dispatch({
          type: ALERT_SUCCESS,
          payload: {
            boolean: true,
            message: "updated successfully",
            error: false
          }
        });

        return;
      }
    })
    .catch(error => {
      dispatch({
        type: SHIPPING_FAIL
      });

      return dispatch({
        type: ALERT_SUCCESS,
        payload: { boolean: true, message: error, error: true }
      });
    });
};

export const shippingClassDeleteAction = object => dispatch => {
  dispatch({
    type: SHIPPING_LOADING
  });
  mutation(DELETE_SHIPPINGCLASS, object)
    .then(response => {
      if (response) {
        dispatch({
          type: SHIPPING_SUCCESS,
          payload: response.data.deleteShippingClass
        });

        //jumpTo("/all-brands");

        dispatch({
          type: ALERT_SUCCESS,
          payload: {
            boolean: true,
            message: "Deleted successfully",
            error: false
          }
        });

        return;
      }
    })
    .catch(error => {
      dispatch({
        type: SHIPPING_FAIL
      });

      return dispatch({
        type: ALERT_SUCCESS,
        payload: { boolean: true, message: error, error: true }
      });
    });
};

export const SHIPPING_LOADING = "SHIPPING_LOADING";
export const SHIPPINGS_SUCCESS = "SHIPPINGS_SUCCESS";
export const SHIPPING_SUCCESS = "SHIPPING_SUCCESS";
export const SHIPPING_FAIL = "SHIPPING_FAIL";
