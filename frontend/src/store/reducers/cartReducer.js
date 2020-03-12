const initialState = {
  products: [
    // {
    //   featured_image:
    //     "https://colorlib.com/preview/theme/essence/img/bg-img/bg-3.jpg",
    //   title: "Product Third",
    //   price: 12,
    //   category: "category",
    //   description: "Product third lorem ipsom dolr sit"
    // }
  ]
};

export default (state = initialState, action) => {
  switch (action.type) {
    case "ADD_VALUE":
      return {
        ...state,
        products: [...state.products, action.payload]
      };
    default: {
      return state;
    }
  }
};
