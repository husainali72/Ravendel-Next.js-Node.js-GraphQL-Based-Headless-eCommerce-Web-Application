import {
  HOMEPAGE_LOADING,
  HOMEPAGE_SUCCESS,
  HOMEPAGE_FAIL,
} from "../action/homepageAction";

const initialState = {
  // homepage: {
  //   appearance: {
  //     home: {
  //       slider: [
  //         {
  //           image: {
  //             medium:
  //               "/assets/images/blog/feature/thumbnail/1587797503342-gallery-4-thumb.jpg",
  //           },
  //           link: "",
  //           open_in_tab: false,
  //         },
  //       ],
  //       add_section_in_home: {
  //         feature_product: true,
  //         recently_added_products: false,
  //         most_viewed_products: false,
  //         recently_bought_products: false,
  //         product_recommendation: false,
  //         products_on_sales: false,
  //         product_from_specific_categories: false,
  //       },
  //     },
  //     theme: {
  //       primary_color: "#154050",
  //     },
  //   },
  // },
  homepage: {},
  loading: false,
  success: false,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case HOMEPAGE_LOADING:
      return {
        ...state,
        loading: true,
      };
    case HOMEPAGE_SUCCESS:
      return {
        ...state,
        homepage: action.payload,
        loading: false,
      };
    case HOMEPAGE_FAIL:
      return {
        ...state,
        loading: false,
      };
    default:
      return state;
  }
};
