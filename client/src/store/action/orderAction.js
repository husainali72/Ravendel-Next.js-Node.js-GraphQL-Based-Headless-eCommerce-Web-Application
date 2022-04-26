import {
  GET_ORDERS,
  GET_ORDER,
  DELETE_ORDER,
  UPDATE_ORDER
} from "../../queries/orderQuery";
import {client_app_route_url, getResponseHandler, mutationResponseHandler} from '../../utils/helper';
import { ALERT_SUCCESS } from "../reducers/alertReducer";
import { mutation, query } from "../../utils/service";
import jumpTo from "../../utils/navigation";

export const ordersAction = () => dispatch => {
  dispatch({
    type: ORDER_LOADING
  });
  query(GET_ORDERS)
    .then(response => {
      // if (response && response.data && response.data.orders) {
      //   var orders = response.data.orders;
      //   if(orders.message.success){
      //     return dispatch({
      //       type: ORDERS_SUCCESS,
      //       payload: orders.data
      //     });
      //   }else {
      //     return dispatch({
      //       type: ALERT_SUCCESS,
      //       payload: { boolean: true, message: orders.message.message, error: true }
      //     });
      //   }     
      // }
      const [error, success, message, data] = getResponseHandler(
        response,
        "orders"
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
          type: ORDERS_SUCCESS,
          payload: data,
        });
      }
    })
    .catch(error => {
      dispatch({
        type: ORDER_FAIL
      });
      return dispatch({
        type: ALERT_SUCCESS,
        payload: { boolean: true, message: error, error: true }
      });
    });
};

export const orderAction = () => dispatch => {
  dispatch({
    type: ORDER_LOADING
  });
  query(GET_ORDER)
    .then(response => {
      // if (response) {
      //   // return dispatch({
      //   //   type: ORDER_SUCCESS,
      //   //   payload: response.data.order
      //   // });
      // }
      const [error, success, message, data] = getResponseHandler(
        response,
        "order"
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
          type: ORDER_SUCCESS,
          payload: data,
        });
      }
    })
    .catch(error => {
      dispatch({
        type: ORDER_FAIL
      });
      return dispatch({
        type: ALERT_SUCCESS,
        payload: { boolean: true, message: error, error: true }
      });
    });
};

export const orderDeleteAction = id => dispatch => {
  dispatch({
    type: ORDER_LOADING
  });
  mutation(DELETE_ORDER, { id })
    .then(response => {
      // if (response) {
      //   // dispatch({
      //   //   type: ORDERS_SUCCESS,
      //   //   payload: response.data.deleteOrder
      //   // });
      //   return dispatch({
      //     type: ALERT_SUCCESS,
      //     payload: {
      //       boolean: true,
      //       message: "Order deleted successfully",
      //       error: false
      //     }
      //   });
      // }
      const [error, success, message, data] = mutationResponseHandler(
        response,
        "deleteOrder"
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
        dispatch(ordersAction());
        jumpTo(`${client_app_route_url}all-orders`);
        return dispatch({
          type: ALERT_SUCCESS,
          payload: { boolean: true, message: message, error: false },
        });
      }
    })
    .catch(error => {
      dispatch({
        type: ORDER_FAIL
      });
      return dispatch({
        type: ALERT_SUCCESS,
        payload: { boolean: true, message: error, error: true }
      });
    });
};

export const orderUpdateAction = object => dispatch => {
  dispatch({
    type: ORDER_LOADING
  });
  mutation(UPDATE_ORDER, object)
    .then(response => {
      // if (response) {
      //   // dispatch({
      //   //   type: ORDERS_SUCCESS,
      //   //   payload: response.data.updateOrder
      //   // });

      //   dispatch({
      //     type: ALERT_SUCCESS,
      //     payload: {
      //       boolean: true,
      //       message: "Order updated successfully",
      //       error: false
      //     }
      //   });

      //   //jumpTo(`${client_app_route_url}all-orders`);
      //   return;
      // }
      const [error, success, message, data] = mutationResponseHandler(
        response,
        "updateOrder"
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
        dispatch(ordersAction());
        jumpTo(`${client_app_route_url}all-orders`);
        return dispatch({
          type: ALERT_SUCCESS,
          payload: { boolean: true, message: message, error: false },
        });
      }
    })
    .catch(error => {
      dispatch({
        type: ORDER_FAIL
      });
      return dispatch({
        type: ALERT_SUCCESS,
        payload: { boolean: true, message: error, error: true }
      });
    });
};

export const ORDER_LOADING = "ORDER_LOADING";
export const ORDERS_SUCCESS = "ORDERS_SUCCESS";
export const ORDER_FAIL = "ORDER_FAIL";
export const ORDER_SUCCESS = "ORDER_SUCCESS";
export const LOADING_FALSE = "LOADING_FALSE";