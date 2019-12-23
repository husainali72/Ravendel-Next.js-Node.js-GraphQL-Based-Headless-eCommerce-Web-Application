import {
  USER_LOADING,
  USERS_SUCCESS,
  USER_FAIL,
  USER_SUCCESS
} from "../action/userAction";

const initialState = {
  users: [],
  user: {},
  loading: false
};

export default (state = initialState, action) => {
  switch (action.type) {
    case USER_LOADING:
      return {
        ...state,
        loading: true
      };
    case USERS_SUCCESS:
      return {
        ...state,
        users: action.payload,
        loading: false
      };
    case USER_SUCCESS:
      return {
        ...state,
        user: action.payload,
        loading: false
      };
    case USER_FAIL:
      return {
        ...state,
        loading: false
      };
    default:
      return state;
  }
};
