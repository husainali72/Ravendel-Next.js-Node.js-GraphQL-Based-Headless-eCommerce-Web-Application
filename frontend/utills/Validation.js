export const Validation = (values) => {
  const validPassword = new RegExp('^(?=.*?[A-Za-z])(?=.*?[0-9]).{6,}$');
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  let errors = {};
  
  var re = /^(?=(.*[a-z]){3,})(?=(.*[A-Z]){2,})(?=(.*[0-9]){2,})(?=(.*[!@#$%^&*()\-__+.]){1,}).{8,}$/;

  if (!validPassword.test(values.password)) {
    errors.password =
      "Passwords must have at least 8 characters and contain at least two of the following: uppercase letters, lowercase letters, numbers, and symbols";
  }

  if (!values.firstName) {
    errors.firstName = "First Name is required";
  }

  if (!values.lastName) {
    errors.lastName = "Last Name is required";
  }

  if (!values.phone) {
    errors.phone = "Phone Number is required";
  }

  if (!values.email) {
    errors.email = "Email is required";
  }  else if (!emailRegex.test(values.email)) {
    errors.email = "Email";
  }

  if (!values.company) {
    errors.company = "Company is required";
  }

  if (!values.terms) {
    errors.terms =
      "Please agree to the terms and conditions before submitting";
  }

  return errors;
};


export const LoginValidation = (values) => {
  let errors = {};

  if (!values.email) {
    errors.email = "Email is required";
  }

  if (!values.password) {
    errors.password = "Password is required";
  }

  return errors;
};

