const initialState = {
  user_token: {},
  token_loading: false,
  error: {},
  insert_token_error: false
};

export default (state = initialState, action) => {
  switch (action.type) {
    case "USER_LOGIN":
      return action.payload;
    default: {
      return state;
    }
  }
};
