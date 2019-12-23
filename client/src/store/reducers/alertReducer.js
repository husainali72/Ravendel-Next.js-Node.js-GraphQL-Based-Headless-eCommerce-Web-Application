export const ALERT_SUCCESS = "ALERT_SUCCESS";

const initialState = {
  success: false,
  message: ""
};

export default (state = initialState, action) => {
  switch (action.type) {
    case ALERT_SUCCESS:
      return {
        success: action.payload.boolean,
        message: action.payload.message
      };
    default:
      return state;
  }
};
