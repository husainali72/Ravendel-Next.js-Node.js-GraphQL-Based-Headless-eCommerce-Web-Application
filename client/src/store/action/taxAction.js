import {
  GET_TAX,
  UPDATE_GLOBALTAX,
  UPDATE_OPTIONTAX,
  ADD_TAXCLASS,
  UPDATE_TAXCLASS,
  DELETE_TAXCLASS,
} from "../../queries/taxQuery";

import { ALERT_SUCCESS } from "../reducers/alertReducer";
import { mutation, query } from "../../utils/service";

import {
  getResponseHandler,
  mutationResponseHandler,
} from "../../utils/helper";

export const taxAction = () => (dispatch) => {
  dispatch({
    type: TAX_LOADING,
  });
  query(GET_TAX)
    .then((response) => {
      const [error, success, message, data] = getResponseHandler(
        response,
        "tax"
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
          type: TAX_SUCCESS,
          payload: data,
        });
      }
    })
    .catch((error) => {
      dispatch({
        type: TAX_FAIL,
      });
      return dispatch({
        type: ALERT_SUCCESS,
        payload: { boolean: false, message: error, error: true },
      });
    });
};

export const globalTaxUpdateAction = (object) => (dispatch) => {
  dispatch({
    type: TAX_LOADING,
  });
  mutation(UPDATE_GLOBALTAX, object)
    .then((response) => {
      const [error, success, message, data] = mutationResponseHandler(
        response,
        "updateGlobalTax"
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
        dispatch(taxAction());
        return dispatch({
          type: ALERT_SUCCESS,
          payload: { boolean: true, message: message, error: false },
        });
      }
    })
    .catch((error) => {
      dispatch({
        type: TAX_FAIL,
      });

      return dispatch({
        type: ALERT_SUCCESS,
        payload: { boolean: false, message: error, error: true },
      });
    });
};

export const optionTaxUpdateAction = (object) => (dispatch) => {
  dispatch({
    type: TAX_LOADING,
  });
  mutation(UPDATE_OPTIONTAX, object)
    .then((response) => {
      const [error, success, message, data] = mutationResponseHandler(
        response,
        "updateOptionTax"
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
        dispatch(taxAction());
        return dispatch({
          type: ALERT_SUCCESS,
          payload: { boolean: true, message: message, error: false },
        });
      }
    })
    .catch((error) => {
      dispatch({
        type: TAX_FAIL,
      });

      return dispatch({
        type: ALERT_SUCCESS,
        payload: { boolean: false, message: error, error: true },
      });
    });
};

export const taxClassAddAction = (object) => (dispatch) => {
  dispatch({
    type: TAX_LOADING,
  });
  mutation(ADD_TAXCLASS, object)
    .then((response) => {
      const [error, success, message, data] = mutationResponseHandler(
        response,
        "addTaxClass"
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
        dispatch(taxAction());
        return dispatch({
          type: ALERT_SUCCESS,
          payload: { boolean: true, message: message, error: false },
        });
      }
    })
    .catch((error) => {
      dispatch({
        type: TAX_FAIL,
      });

      return dispatch({
        type: ALERT_SUCCESS,
        payload: { boolean: false, message: error, error: true },
      });
    });
};

export const taxClassUpdateAction = (object) => (dispatch) => {
  dispatch({
    type: TAX_LOADING,
  });

  if (object && object.taxClass.percentage && object.taxClass.percentage) {
    object.taxClass.percentage = object.taxClass.percentage.toString();
  }
  mutation(UPDATE_TAXCLASS, object)
    .then((response) => {
      const [error, success, message, data] = mutationResponseHandler(
        response,
        "updateTaxClass"
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
        dispatch(taxAction());
        return dispatch({
          type: ALERT_SUCCESS,
          payload: { boolean: true, message: message, error: false },
        });
      }
    })
    .catch((error) => {
      dispatch({
        type: TAX_FAIL,
      });

      return dispatch({
        type: ALERT_SUCCESS,
        payload: { boolean: false, message: error, error: true },
      });
    });
};

export const taxClassDeleteAction = (object) => (dispatch) => {
  dispatch({
    type: TAX_LOADING,
  });
  mutation(DELETE_TAXCLASS, object)
    .then((response) => {
      const [error, success, message, data] = mutationResponseHandler(
        response,
        "deleteTaxClass"
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
        dispatch(taxAction());
        return dispatch({
          type: ALERT_SUCCESS,
          payload: { boolean: true, message: message, error: false },
        });
      }
    })
    .catch((error) => {
      dispatch({
        type: TAX_FAIL,
      });

      return dispatch({
        type: ALERT_SUCCESS,
        payload: { boolean: false, message: error, error: true },
      });
    });
};

export const TAX_LOADING = "TAX_LOADING";
export const TAXS_SUCCESS = "TAXS_SUCCESS";
export const TAX_SUCCESS = "TAX_SUCCESS";
export const TAX_FAIL = "TAX_FAIL";
export const LOADING_FALSE = "LOADING_FALSE";
