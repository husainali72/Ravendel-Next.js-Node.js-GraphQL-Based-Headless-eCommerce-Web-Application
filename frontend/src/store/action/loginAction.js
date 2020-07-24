const LoginAction = (email, password) => {
  return async (dispatch) => {
    if (email === "test@gmail.com" && password === "123") {
      dispatch({ type: "USER_LOGIN", payload: true });
      var userData = [
        {
          email: email,
          token: "A123",
          role: "admin",
        },
      ];
    } else {
      alert("Invalid username and password");
    }
  };
};

export default LoginAction;
