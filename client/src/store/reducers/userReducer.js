import {
  USER_LOADING,
  USERS_SUCCESS,
  USER_FAIL,
  USER_SUCCESS
} from "../action/userAction";

const initialState = {
  users: [],
  user: {},
  loading: false,
  error: ""
};

export default (state = initialState, action) => {
  switch (action.type) {
    case USER_LOADING:
      return {
        ...state,
        loading: true,
        error: ""
      };
    case USERS_SUCCESS:
      return {
        ...state,
        users: action.payload,
        loading: false,
        error: ""
      };
    case USER_SUCCESS:
      return {
        ...state,
        user: action.payload,
        loading: false,
        error: ""
      };
    case USER_FAIL:
      return {
        ...state,
        loading: false,
        error: action.payload
      };
    default:
      return state;
  }
};
