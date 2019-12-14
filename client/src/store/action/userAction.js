import {
  GET_USERS,
  GET_USER,
  ADD_USER,
  UPDATE_USER,
  DELETE_USER
} from "../../queries/userQurey";
import { mutation, query } from "../../utils/service";

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
      return dispatch({
        type: USER_FAIL,
        payload: error
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
      return dispatch({
        type: USER_FAIL,
        payload: error
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
        return dispatch({
          type: USERS_SUCCESS,
          payload: response.data.addUser
        });
      }
    })
    .catch(error => {
      return dispatch({
        type: USER_FAIL,
        payload: error
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
        return dispatch({
          type: USERS_SUCCESS,
          payload: response.data.updateUser
        });
      }
    })
    .catch(error => {
      return dispatch({
        type: USER_FAIL,
        payload: error
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
        return dispatch({
          type: USERS_SUCCESS,
          payload: response.data.deleteUser
        });
      }
    })
    .catch(error => {
      return dispatch({
        type: USER_FAIL,
        payload: error
      });
    });
};

export const USER_LOADING = "USER_LOADING";
export const USERS_SUCCESS = "USERS_SUCCESS";
export const USER_SUCCESS = "USER_SUCCESS";
export const USER_FAIL = "USER_FAIL";
