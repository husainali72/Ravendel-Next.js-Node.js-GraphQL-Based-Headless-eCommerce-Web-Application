const initialState = {
  products: [],
};

if (localStorage.getItem("cartProducts") != null) {
  initialState.products = JSON.parse(localStorage.getItem("cartProducts"));
}

export default (state = initialState, action) => {
  switch (action.type) {
    case "ADD_VALUE":
      if (localStorage.getItem("cartProducts") === null) {
        var singleData = [];
        singleData.push(action.payload);
        localStorage.setItem("cartProducts", JSON.stringify(singleData));
      } else {
        var oldData = [...JSON.parse(localStorage.getItem("cartProducts"))];
        oldData.push(action.payload);
        localStorage.setItem("cartProducts", JSON.stringify(oldData));
      }

      return {
        ...state,
        products: [...state.products, action.payload],
      };

    case "REMOVE_VALUE":
      return {
        ...state,
        products: action.payload,
      };

    case "REMOVE_ALL_VALUE":
      if (localStorage.getItem("cartProducts")) {
        localStorage.removeItem("cartProducts");
      }
      return {
        ...state,
        products: action.payload,
      };
    default: {
      return state;
    }
  }
};
