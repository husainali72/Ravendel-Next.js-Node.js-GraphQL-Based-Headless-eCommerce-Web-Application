/* eslint-disable no-unused-vars */
import { GET_BRANDS_QUERY } from "../../queries/shopquery";

export const brandsAction = (brandProduct) => (dispatch) => {
    dispatch({
        type: BRAND_SUCCESS,
        payload: brandProduct,
    })
}
export const categoryAction = (category) => (dispatch) => {
    dispatch({
        type: GET_CATEGORY,
        payload: category,
    })
}
export const BRAND_LOADING = "BRAND_LOADING";
export const BRANDS_SUCCESS = "BRANDS_SUCCESS";
export const BRAND_SUCCESS = "BRAND_SUCCESS";
export const BRAND_FAIL = "BRAND_FAIL";
export const GET_CATEGORY = "GET_CATEGORY";
