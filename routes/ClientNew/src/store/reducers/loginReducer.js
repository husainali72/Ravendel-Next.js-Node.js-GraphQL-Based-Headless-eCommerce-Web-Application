import {
  POST_TOKEN_BEGIN,
  POST_TOKEN_SUCCESS,
  POST_TOKEN_FAIL,
  INSERT_TOKEN_SUCCESS,
  INSERT_TOKEN_FAIL,
  LOGOUT_SUCCESS
} from "../action/loginAction";

const initialState = {
  user_token: {},
  token_loading: false,
  error: {},
  insert_token_error: false
};

export default (state = initialState, action) => {
  switch (action.type) {
    case POST_TOKEN_BEGIN:
      return {
        ...state,
        token_loading: true,
        error: {}
      };
    case POST_TOKEN_SUCCESS:
      return {
        ...state,
        user_token: action.payload.data,
        token_loading: false
      };
    case POST_TOKEN_FAIL:
      return {
        ...state,
        token_loading: false
      };
    case INSERT_TOKEN_SUCCESS:
      return {
        ...state,
        user_token: action.payload,
        insert_token_error: false
      };
    case INSERT_TOKEN_FAIL:
      return {
        ...state,
        insert_token_error: true
      };
    case LOGOUT_SUCCESS:
      return {
        ...initialState
      };
    default:
      return state;
  }
};
