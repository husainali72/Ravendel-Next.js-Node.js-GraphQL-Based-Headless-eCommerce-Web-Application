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
import { getResponseHandler, mutationResponseHandler } from "../../utils/helper";

export const taxAction = () => dispatch => {
  dispatch({
    type: TAX_LOADING
  });
  query(GET_TAX)
    .then(response => {
      // if (response && response.data && response.data.tax) {
      //   var tax = response.data.tax;

      //   if(tax.message.success){
      //     return dispatch({
      //       type: TAX_SUCCESS,
      //       payload: tax.data
      //     });
      //   }else{
      //     return dispatch({
      //       type: ALERT_SUCCESS,
      //       payload: { boolean: true, message: tax.message.message, error: true }
      //     });
      //   }      
      // }
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
          payload: { boolean: true, message: message, error: true },
        });
      }

      if (success) {
        return dispatch({
          type: TAX_SUCCESS,
          payload: data,
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
      // if (response) {
      //   // dispatch({
      //   //   type: TAX_SUCCESS,
      //   //   payload: response.data.updateGlobalTax
      //   // });

      //   return dispatch({
      //     type: ALERT_SUCCESS,
      //     payload: {
      //       boolean: true,
      //       message: "updated successfully",
      //       error: false
      //     }
      //   });
      // }
      const [error, success, message, data] = mutationResponseHandler(
        response,
        "updateGlobalTax"
      );
      dispatch({
        type: LOADING_FALSE,
      });

      if (error) {
        console.log("error");
        dispatch({
          type: ALERT_SUCCESS,
          payload: { boolean: true, message: message, error: true },
        });
      }

      if (success) {
        console.log("Success");
        dispatch(taxAction());
        return dispatch({
          type: ALERT_SUCCESS,
          payload: { boolean: true, message: message, error: false },
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
      // if (response) {
      //   // dispatch({
      //   //   type: TAX_SUCCESS,
      //   //   payload: response.data.updateOptionTax
      //   // });

      //   return dispatch({
      //     type: ALERT_SUCCESS,
      //     payload: {
      //       boolean: true,
      //       message: "updated successfully",
      //       error: false
      //     }
      //   });
      // }
      const [error, success, message, data] = mutationResponseHandler(
        response,
        "updateOptionTax"
      );
      dispatch({
        type: LOADING_FALSE,
      });

      if (error) {
        console.log("error");
        dispatch({
          type: ALERT_SUCCESS,
          payload: { boolean: true, message: message, error: true },
        });
      }

      if (success) {
        console.log("Success");
        dispatch(taxAction());
        return dispatch({
          type: ALERT_SUCCESS,
          payload: { boolean: true, message: message, error: false },
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
      // if (response) {
      //   // dispatch({
      //   //   type: TAX_SUCCESS,
      //   //   payload: response.data.addTaxClass
      //   // });

      //   dispatch({
      //     type: ALERT_SUCCESS,
      //     payload: {
      //       boolean: true,
      //       message: "added successfully",
      //       error: false
      //     }
      //   });

      //   return;
      // }
      const [error, success, message, data] = mutationResponseHandler(
        response,
        "addTaxClass"
      );
      dispatch({
        type: LOADING_FALSE,
      });

      if (error) {
        console.log("error");
        dispatch({
          type: ALERT_SUCCESS,
          payload: { boolean: true, message: message, error: true },
        });
      }

      if (success) {
        console.log("Success");
        dispatch(taxAction());
        return dispatch({
          type: ALERT_SUCCESS,
          payload: { boolean: true, message: message, error: false },
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

export const taxClassUpdateAction = object => dispatch => {
  dispatch({
    type: TAX_LOADING
  });

  console.log('object', object)

  if(object && object.tax_class.percentage && object.tax_class.percentage){
    object.tax_class.percentage =  object.tax_class.percentage.toString();
  }
  mutation(UPDATE_TAXCLASS, object)
    .then(response => {
      // if (response) {
      //   // dispatch({
      //   //   type: TAX_SUCCESS,
      //   //   payload: response.data.updateTaxClass
      //   // });

      //   dispatch({
      //     type: ALERT_SUCCESS,
      //     payload: {
      //       boolean: true,
      //       message: "updated successfully",
      //       error: false
      //     }
      //   });

      //   return;
      // }
      const [error, success, message, data] = mutationResponseHandler(
        response,
        "updateTaxClass"
      );
      dispatch({
        type: LOADING_FALSE,
      });

      if (error) {
        console.log("error");
        dispatch({
          type: ALERT_SUCCESS,
          payload: { boolean: true, message: message, error: true },
        });
      }

      if (success) {
        console.log("Success");
        dispatch(taxAction());
        return dispatch({
          type: ALERT_SUCCESS,
          payload: { boolean: true, message: message, error: false },
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

export const taxClassDeleteAction = object => dispatch => {
  dispatch({
    type: TAX_LOADING
  });
  mutation(DELETE_TAXCLASS, object)
    .then(response => {
      // if (response) {
      //   // dispatch({
      //   //   type: TAX_SUCCESS,
      //   //   payload: response.data.deleteTaxClass
      //   // });

      //   dispatch({
      //     type: ALERT_SUCCESS,
      //     payload: {
      //       boolean: true,
      //       message: "Deleted successfully",
      //       error: false
      //     }
      //   });

      //   return;
      // }
      const [error, success, message, data] = mutationResponseHandler(
        response,
        "deleteTaxClass"
      );
      dispatch({
        type: LOADING_FALSE,
      });

      if (error) {
        console.log("error");
        dispatch({
          type: ALERT_SUCCESS,
          payload: { boolean: true, message: message, error: true },
        });
      }

      if (success) {
        console.log("Success");
        dispatch(taxAction());
        return dispatch({
          type: ALERT_SUCCESS,
          payload: { boolean: true, message: message, error: false },
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

export const TAX_LOADING = "TAX_LOADING";
export const TAXS_SUCCESS = "TAXS_SUCCESS";
export const TAX_SUCCESS = "TAX_SUCCESS";
export const TAX_FAIL = "TAX_FAIL";
export const LOADING_FALSE = "LOADING_FALSE";
