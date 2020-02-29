import {
  GET_USERS,
  GET_USER,
  ADD_USER,
  UPDATE_USER,
  DELETE_USER
} from "../../queries/userQuery";

import { ALERT_SUCCESS } from "../reducers/alertReducer";
import { mutation, query } from "../../utils/service";
import jumpTo from "../../utils/navigation";

export const usersAction = () => dispatch => {
  dispatch({
    type: USER_LOADING
  });
  query(GET_USERS)
    .then(response => {
      if (response) {
        return dispatch({
          type: USERS_SUCCESS,
          payload: response.data.users
        });
      }
    })
    .catch(error => {
      dispatch({
        type: USER_FAIL
      });
      return dispatch({
        type: ALERT_SUCCESS,
        payload: { boolean: true, message: error, error: true }
      });
    });
};

export const userAction = id => dispatch => {
  dispatch({
    type: USER_LOADING
  });
  query(GET_USER, { id: id })
    .then(response => {
      if (response) {
        return dispatch({
          type: USER_SUCCESS,
          payload: response.data.user
        });
      }
    })
    .catch(error => {
      dispatch({
        type: USER_FAIL
      });
      return dispatch({
        type: ALERT_SUCCESS,
        payload: { boolean: true, message: error, error: true }
      });
    });
};

export const userAddAction = object => dispatch => {
  dispatch({
    type: USER_LOADING
  });
  mutation(ADD_USER, object)
    .then(response => {
      if (response) {
        dispatch({
          type: USERS_SUCCESS,
          payload: response.data.addUser
        });

        return dispatch({
          type: ALERT_SUCCESS,
          payload: {
            boolean: true,
            message: "User added successfully",
            error: false
          }
        });
      }
    })
    .catch(error => {
      dispatch({
        type: USER_FAIL
      });
      return dispatch({
        type: ALERT_SUCCESS,
        payload: { boolean: true, message: error, error: true }
      });
    });
};

export const userUpdateAction = object => dispatch => {
  dispatch({
    type: USER_LOADING
  });
  mutation(UPDATE_USER, object)
    .then(response => {
      if (response) {
        dispatch({
          type: USERS_SUCCESS,
          payload: response.data.updateUser
        });

        dispatch({
          type: ALERT_SUCCESS,
          payload: {
            boolean: true,
            message: "User updated successfully",
            error: false
          }
        });

        jumpTo("/all-users");
        return;
      }
    })
    .catch(error => {
      dispatch({
        type: USER_FAIL
      });
      return dispatch({
        type: ALERT_SUCCESS,
        payload: { boolean: true, message: error, error: true }
      });
    });
};

export const userDeleteAction = id => dispatch => {
  dispatch({
    type: USER_LOADING
  });
  mutation(DELETE_USER, { id })
    .then(response => {
      if (response) {
        dispatch({
          type: USERS_SUCCESS,
          payload: response.data.deleteUser
        });
        return dispatch({
          type: ALERT_SUCCESS,
          payload: {
            boolean: true,
            message: "User deleted successfully",
            error: false
          }
        });
      }
    })
    .catch(error => {
      dispatch({
        type: USER_FAIL
      });
      return dispatch({
        type: ALERT_SUCCESS,
        payload: { boolean: true, message: error, error: true }
      });
    });
};

export const USER_LOADING = "USER_LOADING";
export const USERS_SUCCESS = "USERS_SUCCESS";
export const USER_SUCCESS = "USER_SUCCESS";
export const USER_FAIL = "USER_FAIL";
