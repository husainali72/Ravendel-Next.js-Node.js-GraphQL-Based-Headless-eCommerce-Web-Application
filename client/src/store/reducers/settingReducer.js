import {
  SETING_LOADING,
  SETTING_SUCCESS,
  SETTING_FAIL,
  LIST_DATE_FORMAT,
  LOADING_FALSE
} from "../action/settingAction";

const initialState = {

  settings: {
    appearance: {
      home: {
        slider: [
          {
            image: {
              medium:
                "/assets/images/blog/feature/thumbnail/1587797503342-gallery-4-thumb.jpg",
            },
            link: "",
            open_in_tab: false,
          },
        ],
        add_section_in_home: {
          feature_product: true,
          recently_added_products: false,
          most_viewed_products: false,
          recently_bought_products: false,
          product_recommendation: false,
          products_on_sales: false,
          product_from_specific_categories: false,
        },
      },
      theme: {
        primary_color: "#154050",
        logo: {
          original: "",
          large: "",
          medium:
            "/assets/images/blog/feature/thumbnail/1587797503342-gallery-4-thumb.jpg",
          thumbnail:
            "/assets/images/blog/feature/thumbnail/1587797503342-gallery-4-thumb.jpg",
        },
      },
    },
  },
  date_formats: [],
  loading: false,
  success: false,
  // settings:''
};

export default (state = initialState, action) => {
  switch (action.type) {
    case SETING_LOADING:
      return {
        ...state,
        loading: true,
      };
    case LIST_DATE_FORMAT:
      return {
        ...state,
        date_formats: action.payload,
        loading: false,
      };
    case SETTING_SUCCESS:
      return {
        ...state,
        settings: action.payload,
        loading: false,
      };
    case SETTING_FAIL:
      return {
        ...state,
        loading: false,
      };
    case LOADING_FALSE:
      return {
        ...state,
        loading: false,
      };
    default:
      return state;
  }
};
