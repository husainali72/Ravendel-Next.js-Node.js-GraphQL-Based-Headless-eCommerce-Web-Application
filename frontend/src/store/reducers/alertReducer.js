export const SHOW_ALERT = "SHOW_ALERT";

const initialState = {
  success: false,
  message: "",
  error: false
};

export default (state = initialState, action) => {
  switch (action.type) {
    case SHOW_ALERT:
      return {
        success: action.payload.boolean,
        message: action.payload.message,
        error: action.payload.error || false
      };
    default:
      return state;
  }
};
