import { GET_HOMEPAGE_DATA_QUERY } from "../../queries/home";
import { query } from "../../utills/helpers";

export const SET_SETTING = "SET_SETTING";
export const GET_SETTING = "GET_SETTING";
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
export const getSettings = (payload) => async (dispatch) => {
   try {
      // const { data: homepagedata } = await client.query({
      //    query: GET_HOMEPAGE_DATA_QUERY
      // })
      // homepageData = homepagedata
      // currencyStore = homepagedata?.getSettings?.store
      query(GET_HOMEPAGE_DATA_QUERY).then((res) => {
         console.log(res, '=============')
         let response = res?.data?.getSettings
         if (response) {
            dispatch({
               type: GET_SETTING, payload: response
            })
         }
      })
   }
   catch (e) {
      console.log("homepage Error===", e.networkError && e.networkError.result ? e.networkError.result.errors : '');
   }
}