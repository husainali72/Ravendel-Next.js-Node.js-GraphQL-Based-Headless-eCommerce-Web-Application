import {
  GET_USERS,
  GET_USER,
  ADD_USER,
  UPDATE_USER,
  DELETE_USER,
  GET_DASHBOARDDATA,
} from "../../queries/userQuery";
import { client_app_route_url } from "../../utils/helper";
import { ALERT_SUCCESS } from "../reducers/alertReducer";
import { mutation, query } from "../../utils/service";
export const usersAction = () => (dispatch) => {
  dispatch({
    type: USER_LOADING,
  });
  query(GET_USERS)
    .then((response) => {
      if (response.data.users.message.success) {
        return dispatch({
          type: USERS_SUCCESS,
          payload: response.data.users.data,
        });
      } else {
        return dispatch({
          type: ALERT_SUCCESS,
          payload: {
            boolean: false,
            message: response.data.users.message.message,
            error: true,
          },
        });
      }
    })
    .catch((error) => {
      dispatch({
        type: USER_FAIL,
      });
      return dispatch({
        type: ALERT_SUCCESS,
        payload: { boolean: false, message: error, error: true },
      });
    });
};

export const userAction = (id) => (dispatch) => {
  dispatch({
    type: USER_LOADING,
  });
  query(GET_USER, { id: id })
    .then((response) => {
      if (response) {
        return dispatch({
          type: USER_SUCCESS,
          payload: response.data.user,
        });
      }
    })
    .catch((error) => {
      dispatch({
        type: USER_FAIL,
      });
      return dispatch({
        type: ALERT_SUCCESS,
        payload: { boolean: false, message: error, error: true },
      });
    });
};

export const userAddAction = (object, navigate) => (dispatch) => {
  dispatch({
    type: USER_LOADING,
  });

  mutation(ADD_USER, object)
    .then((response) => {
      if (response.data.addUser.success) {
        dispatch({
          type: USER_SUCCESS,
        });

        dispatch(usersAction());
        navigate(`${client_app_route_url}all-users`);
        return dispatch({
          type: ALERT_SUCCESS,
          payload: {
            boolean: true,
            message: "User added successfully",
            error: false,
          },
        });
      } else {
        dispatch({
          type: USER_FAIL,
        });
        return dispatch({
          type: ALERT_SUCCESS,
          payload: {
            boolean: false,
            message: response.data.addUser.message,
            error: true,
          },
        });
      }
    })
    .catch((error) => {
      dispatch({
        type: USER_FAIL,
      });
      return dispatch({
        type: ALERT_SUCCESS,
        payload: { boolean: false, message: error, error: true },
      });
    });
};

export const userUpdateAction = (object, navigate) => (dispatch) => {
  dispatch({
    type: USER_LOADING,
  });

  mutation(UPDATE_USER, object)
    .then((response) => {
      dispatch({
        type: USER_FAIL,
      });
      if (response.data.updateUser.success) {
        dispatch({
          type: ALERT_SUCCESS,
          payload: {
            boolean: true,
            message: "User updated successfully",
            error: false,
          },
        });

        navigate(`${client_app_route_url}all-users`);

        dispatch(usersAction());

        return;
      } else {
        return dispatch({
          type: ALERT_SUCCESS,
          payload: {
            boolean: false,
            message: response.data.updateUser.message,
            error: true,
          },
        });
      }
    })
    .catch((error) => {
      dispatch({
        type: USER_FAIL,
      });
      return dispatch({
        type: ALERT_SUCCESS,
        payload: { boolean: false, message: error, error: true },
      });
    });
};

export const userDeleteAction = (id) => (dispatch) => {
  dispatch({
    type: USER_LOADING,
  });
  mutation(DELETE_USER, { id })
    .then((response) => {
      if (response.data.deleteUser.success) {
        dispatch({
          type: USER_FAIL,
        });

        dispatch(usersAction());

        return dispatch({
          type: ALERT_SUCCESS,
          payload: {
            boolean: true,
            message: "User deleted successfully",
            error: false,
          },
        });
      } else {
        return dispatch({
          type: ALERT_SUCCESS,
          payload: {
            boolean: false,
            message: response.data.deleteUser.message,
            error: true,
          },
        });
      }
    })
    .catch((error) => {
      dispatch({
        type: USER_FAIL,
      });
      return dispatch({
        type: ALERT_SUCCESS,
        payload: { boolean: false, message: error, error: true },
      });
    });
};
export const dashboardAction = () => (dispatch) => {
  dispatch({
    type: USER_LOADING,
  });
  query(GET_DASHBOARDDATA)
    .then((response) => {
      if (response.data.dashboardData) {
        return dispatch({
          type: USERS_SUCCESS,
          payload: response.data.dashboardData,
        });
      } else {
        return dispatch({
          type: ALERT_SUCCESS,
          payload: {
            boolean: false,
            message: response.data.dashboardData,
            error: true,
          },
        });
      }
    })
    .catch((error) => {
      dispatch({
        type: USER_FAIL,
      });
      return dispatch({
        type: ALERT_SUCCESS,
        payload: { boolean: false, message: error, error: true },
      });
    });
};
export const USER_LOADING = "USER_LOADING";
export const USERS_SUCCESS = "USERS_SUCCESS";
export const USER_SUCCESS = "USER_SUCCESS";
export const USER_FAIL = "USER_FAIL";
