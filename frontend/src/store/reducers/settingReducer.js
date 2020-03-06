const initialState = {
  themes: [{ primaryColor: "#009688", productsCount: "3" }]
};

export default (state = initialState, action) => {
  switch (action.type) {
    case "GET_VALUE":
      return {
        themes: [{ primaryColor: action.payload, productsCount: "3" }]
      };
    default: {
      return state;
    }
  }
};
