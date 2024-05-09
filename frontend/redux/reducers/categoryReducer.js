import { STORE_CATEGORIES } from "../actions/categoryAction";
const initialState = {
  categories: [],
  subCategories: [],
};

const categoryReducer = (state = initialState, action) => {
  switch (action.type) {
    case STORE_CATEGORIES:
      return {
        ...state,
        categories: action.payload,
        loading: false,
        success: true,
      };

    default:
      return state;
  }
};
export default categoryReducer;
