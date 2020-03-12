import {
  GET_TAX,
  UPDATE_GLOBALTAX,
  UPDATE_OPTIONTAX,
  ADD_TAXCLASS,
  UPDATE_TAXCLASS,
  DELETE_TAXCLASS
} from "../../queries/taxQuery";

import { ALERT_SUCCESS } from "../reducers/alertReducer";
import { mutation, query } from "../../utils/service";
import jumpTo from "../../utils/navigation";

export const taxAction = () => dispatch => {
  dispatch({
    type: TAX_LOADING
  });
  query(GET_TAX)
    .then(response => {
      if (response) {
        return dispatch({
          type: TAX_SUCCESS,
          payload: response.data.tax
        });
      }
    })
    .catch(error => {
      dispatch({
        type: TAX_FAIL
      });
      return dispatch({
        type: ALERT_SUCCESS,
        payload: { boolean: true, message: error, error: true }
      });
    });
};

export const globalTaxUpdateAction = object => dispatch => {
  dispatch({
    type: TAX_LOADING
  });
  mutation(UPDATE_GLOBALTAX, object)
    .then(response => {
      if (response) {
        dispatch({
          type: TAX_SUCCESS,
          payload: response.data.updateGlobalTax
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
        type: TAX_FAIL
      });

      return dispatch({
        type: ALERT_SUCCESS,
        payload: { boolean: true, message: error, error: true }
      });
    });
};

export const optionTaxUpdateAction = object => dispatch => {
  dispatch({
    type: TAX_LOADING
  });
  mutation(UPDATE_OPTIONTAX, object)
    .then(response => {
      if (response) {
        dispatch({
          type: TAX_SUCCESS,
          payload: response.data.updateOptionTax
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
        type: TAX_FAIL
      });

      return dispatch({
        type: ALERT_SUCCESS,
        payload: { boolean: true, message: error, error: true }
      });
    });
};

export const taxClassAddAction = object => dispatch => {
  dispatch({
    type: TAX_LOADING
  });
  mutation(ADD_TAXCLASS, object)
    .then(response => {
      if (response) {
        dispatch({
          type: TAX_SUCCESS,
          payload: response.data.addTaxClass
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
        type: TAX_FAIL
      });

      return dispatch({
        type: ALERT_SUCCESS,
        payload: { boolean: true, message: error, error: true }
      });
    });
};

export const taxClassUpdateAction = object => dispatch => {
  dispatch({
    type: TAX_LOADING
  });
  mutation(UPDATE_TAXCLASS, object)
    .then(response => {
      if (response) {
        dispatch({
          type: TAX_SUCCESS,
          payload: response.data.updateTaxClass
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
        type: TAX_FAIL
      });

      return dispatch({
        type: ALERT_SUCCESS,
        payload: { boolean: true, message: error, error: true }
      });
    });
};

export const taxClassDeleteAction = object => dispatch => {
  dispatch({
    type: TAX_LOADING
  });
  mutation(DELETE_TAXCLASS, object)
    .then(response => {
      if (response) {
        dispatch({
          type: TAX_SUCCESS,
          payload: response.data.deleteTaxClass
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
        type: TAX_FAIL
      });

      return dispatch({
        type: ALERT_SUCCESS,
        payload: { boolean: true, message: error, error: true }
      });
    });
};

export const TAX_LOADING = "TAX_LOADING";
export const TAXS_SUCCESS = "TAXS_SUCCESS";
export const TAX_SUCCESS = "TAX_SUCCESS";
export const TAX_FAIL = "TAX_FAIL";
