import { isValidPhoneNumber } from "react-phone-number-input";

const PASSWORD_REGEX = /^(?=.*?[A-Za-z])(?=.*?[0-9]).{8,}$/;
const EMAIL_REGEX = /^[\w-+]+(\.[\w-]+)*@[a-zA-Z0-9-]+(\.[a-zA-Z0-9-]+)*(\.[a-zA-Z]{2,})$/;

// messages.js

const emailErrorMessage = "Please enter a valid email";
const passwordErrorMessage = "Passwords must have at least 8 characters and contain at least one letter and one number";
const phoneNumberErrorMessage = "Please enter a valid phone number";

export const passwordValidation = (value) => {
  return (
    PASSWORD_REGEX.test(value) ||
    passwordErrorMessage
  );
};

export const phoneNumberValidation = (value) => {
  const cleanedPhoneNumber = value?.replace(/\D/g, "") || "";
  const formattedPhoneNumber = `+${cleanedPhoneNumber}`;

  return (
    isValidPhoneNumber(formattedPhoneNumber) ||
    phoneNumberErrorMessage
  );
};

export const validateEmail = (email) => {
  return (
    EMAIL_REGEX.test(email) ||
    emailErrorMessage
  );
};
export const confirmPasswordValidation=(password,confirmPassword)=>{
  if (password !== confirmPassword) {
    return "Passwords do not match";
  }
  return true;
}