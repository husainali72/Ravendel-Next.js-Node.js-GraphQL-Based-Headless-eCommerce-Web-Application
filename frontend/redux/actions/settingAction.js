export const SET_SETTING = "SET_SETTING";
export const STRIPE_PUBLIC_KEY = "STRIPE_PUBLIC_KEY"
//Action Creator
export const settingActionCreator = (payload) => (dispatch) => {
   dispatch({
      type: SET_SETTING, payload: payload
   })
};

export const stripePaymentKeyAction = (payload) => (dispatch) => {
   dispatch({
      type: STRIPE_PUBLIC_KEY,
      payload: payload
   })
}