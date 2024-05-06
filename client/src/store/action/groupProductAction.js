
import {
  client_app_route_url,
  getResponseHandler,
  mutationResponseHandler,
} from "../../utils/helper";
import { ALERT_SUCCESS } from "../reducers/alertReducer";
import { mutation, query } from "../../utils/service";
import { ADD_GROUP_PRODUCT, DELETE_GROUP_PRODUCT, GET_GROUP_PRODUCT, GET_GROUP_PRODUCTS } from "../../queries/groupProductQuery";

export const groupProductsAction = () => (dispatch) => {
  dispatch({
    type: GROUP_PRODUCTS_LOADING,
  });
  query(GET_GROUP_PRODUCTS)
    .then((response) => {
      const [error, success, message, data] = getResponseHandler(
        response,
        "groups"
      );
      dispatch({
        type: GROUP_PRODUCTS_LOADING_FALSE,
      });

      if (error) {
        dispatch({
          type: ALERT_SUCCESS,
          payload: { boolean: false, message: message, error: true },
        });
      }

      if (success) {
        return dispatch({
          type: GROUP_PRODUCTS_SUCCESS,
          payload: data,
        });
      }
    })
    .catch((error) => {
      dispatch({
        type: GROUP_PRODUCTS_FAIL,
      });
      return dispatch({
        type: ALERT_SUCCESS,
        payload: { boolean: false, message: error, error: true },
      });
    });
};
export const groupProductDeleteAction = (id) => (dispatch) => {
  dispatch({
    type: GROUP_PRODUCT_LOADING,
  });
  mutation(DELETE_GROUP_PRODUCT, { deleteGroupId:id })
    .then((response) => {
      const [error, success, message, data] = mutationResponseHandler(
        response,
        "deleteGroup"
      );
      dispatch({
        type: GROUP_PRODUCT_LOADING_FALSE,
      });

      if (error) {
        dispatch({
          type: ALERT_SUCCESS,
          payload: { boolean: false, message: message, error: true },
        });
      }

      if (success) {
        dispatch(groupProductsAction());
        return dispatch({
          type: ALERT_SUCCESS,
          payload: { boolean: true, message: message, error: false },
        });
      }
    })
    .catch((error) => {
      dispatch({
        type: GROUP_PRODUCT_FAIL,
      });
      return dispatch({
        type: ALERT_SUCCESS,
        payload: { boolean: false, message: error, error: true },
      });
    });
};

export const groupProductAddAction = (object, navigate) => (dispatch) => {
  dispatch({
    type: GROUP_PRODUCT_LOADING,
  });

  mutation(ADD_GROUP_PRODUCT, object)
    .then((response) => {
      const [error, success, message, data] = mutationResponseHandler(
        response,
        "addGroup"
      );
      dispatch({
        type: GROUP_PRODUCT_LOADING_FALSE,
      });

      if (error) {
        dispatch({
          type: ALERT_SUCCESS,
          payload: { boolean: false, message: message, error: true },
        });
      }

      if (success) {
        dispatch(groupProductsAction());
        navigate(`${client_app_route_url}group-products`);
        return dispatch({
          type: ALERT_SUCCESS,
          payload: { boolean: true, message: message, error: false },
        });
      }
    })
    .catch((error) => {
      dispatch({
        type: GROUP_PRODUCT_FAIL,
      });

      // dispatch({
      //   type: TINYMCE_DESCRIPTION_NULL,
      //   payload: {},
      // });

      return dispatch({
        type: ALERT_SUCCESS,
        payload: { boolean: false, message: error, error: true },
      });
    });
};

export const groupProductAction = (id) => (dispatch) => {
  if(id){
    dispatch({
      type: GROUP_PRODUCT_LOADING,
    });
    query(GET_GROUP_PRODUCT, { groupId: id })
      .then((response) => {
        const [error, success, message, data] = getResponseHandler(
          response,
          "group"
        );
        dispatch({
          type: GROUP_PRODUCT_LOADING_FALSE,
        });
  
        if (error) {
          dispatch({
            type: ALERT_SUCCESS,
            payload: { boolean: false, message: message, error: true },
          });
        }
  
        if (success) {
          return dispatch({
            type: GROUP_PRODUCT_SUCCESS,
            payload: data,
          });
        }
      })
      .catch((error) => {
        dispatch({
          type: GROUP_PRODUCT_FAIL,
        });
        return dispatch({
          type: ALERT_SUCCESS,
          payload: { boolean: false, message: error, error: true },
        });
      });
  }
};



export const GROUP_PRODUCT_LOADING = "GROUP_PRODUCT_LOADING";
export const GROUP_PRODUCTS_LOADING = "GROUP_PRODUCTS_LOADING";
export const GROUP_PRODUCTS_SUCCESS = "GROUP_PRODUCTS_SUCCESS";
export const GROUP_PRODUCT_SUCCESS = "PRODUCT_SUCCESS";
export const GROUP_PRODUCT_FAIL = "GROUP_PRODUCT_FAIL";
export const GROUP_PRODUCTS_FAIL = "GROUP_PRODUCTS_FAIL";
export const GROUP_PRODUCT_LOADING_FALSE = "GROUP_PRODUCT_LOADING_FALSE";
export const GROUP_PRODUCTS_LOADING_FALSE = "GROUP_PRODUCTS_LOADING_FALSE";

