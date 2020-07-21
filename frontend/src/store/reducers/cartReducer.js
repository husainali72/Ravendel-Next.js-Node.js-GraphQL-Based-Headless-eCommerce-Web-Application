import cookie from "react-cookies";

const initialState = {
  products: [],
};

if (localStorage.getItem("cartProducts") != null) {
  initialState.products = JSON.parse(localStorage.getItem("cartProducts"));
}

var dataMy = cookie.load("cartProducts");
console.log("dataMy", dataMy);

export default (state = initialState, action) => {
  switch (action.type) {
    case "ADD_VALUE":
      if (localStorage.getItem("cartProducts") === null) {
        var singleData = [];
        singleData.push(action.payload);
        localStorage.setItem("cartProducts", JSON.stringify(singleData));
        cookie.save("cartProducts", JSON.stringify(singleData), { path: "/" });
        // cookie.save("cartProducts", "{'key':'value'}", { path: "/" });
      } else {
        var oldData = [...JSON.parse(localStorage.getItem("cartProducts"))];
        oldData.push(action.payload);
        localStorage.setItem("cartProducts", JSON.stringify(oldData));
        console.log(JSON.stringify(oldData));
        cookie.save("cartProducts", JSON.stringify(oldData), { path: "/" });
        //cookie.save("cartProducts", "{'key':'value'}", { path: "/" });
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
