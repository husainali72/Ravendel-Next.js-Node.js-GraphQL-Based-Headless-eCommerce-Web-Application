const initialState = {
  chekoutDetails: {},
};

if (localStorage.getItem("chekoutDetails") != null) {
  initialState.chekoutDetails = JSON.parse(
    localStorage.getItem("chekoutDetails")
  );
}

export default (state = initialState, action) => {
  switch (action.type) {
    case "CHEKOUT_DETAILS":
      if (localStorage.getItem("chekoutDetails") === null) {
        localStorage.setItem("chekoutDetails", JSON.stringify(action.payload));
      }
      return {
        chekoutDetails: action.payload,
      };
    default: {
      return state;
    }
  }
};
