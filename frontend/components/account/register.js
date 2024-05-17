/* eslint-disable no-unused-vars */
import { useState } from "react";
import { ADD_CUSTOMER } from "../../queries/customerquery";
import Link from "next/link";
import { mutation } from "../../utills/helpers";
import toast, { Toaster } from "react-hot-toast";
import { validateEmail, passwordValidation } from "../../utills/Validation";
import { get } from "lodash";
import { useForm } from "react-hook-form";
import InputField from "../inputField";
import {
  firstNameErrorMessage,
  passwordErrorMessage,
  lastNameErrorMessage,
  termsErrorMessage,
  emailErrorMessage,
} from "../validationMessages";
import PhoneInputField from "../phoneInput";
import PasswordField from "../passwordField";
import CustomButton from "../button";
const registerObject = {
  queryName: "addCustomer",
  firstName: "",
  lastName: "",
  email: "",
  password: "",
  company: "",
  phone: "",
  conditions: false,
};
const notify = (message, success) => {
  if (success) {
    return toast.success(message);
  } else {
    return toast.error(message);
  }
};
const Register = () => {
  const [registerUser, setRegisterUser] = useState(registerObject);
  const [loading, setLoading] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
    control,
  } = useForm();
  const onSubmit = (e) => {
    setLoading(true);
    const { conditions, ...variable } = registerUser;
    mutation(ADD_CUSTOMER, variable)
      .then((res) => {
        if (get(res, "data.addCustomer")) {
          notify(
            get(res, "data.addCustomer.message"),
            get(res, "data.addCustomer.success")
          );
        }
        setLoading(false);
      })
      .catch((error) => {
        setLoading(false);
      })
      .finally(() => {
        setRegisterUser({ ...registerObject });
      });
  };
  const handleChange = (e, type) => {
    const { name, value } = get(e, "target");
    if (type === "checkbox") {
      setRegisterUser({ ...registerUser, [name]: !registerUser[name] });
    } else {
      setRegisterUser({ ...registerUser, [name]: value });
    }
  };
  const { firstName, lastName, email, phone, company, password, conditions } =
    registerUser;

  return (
    <>
      <Toaster />
      <div className="p-30 register-box registerContainer">
        <h4>Create your Account</h4>
        <p className="mb-50 register-top-space">
          Your personal data will be used to support your experience throughout
          this website, to manage access to your account, and for other purposes
          described in our privacy policy
        </p>
        <div className="form-container">
          <form onSubmit={handleSubmit(onSubmit)}>
            <InputField
              type="text"
              className="form-control"
              id="firstName"
              placeholder="First Name"
              value={firstName}
              name="firstName"
              registerRef={register("firstName", {
                required: {
                  value: !firstName,
                  message: firstNameErrorMessage,
                },
              })}
              onChange={(e, type) => handleChange(e, type)}
              errors={errors}
            />
            <InputField
              type="text"
              className="form-control"
              id="lastName"
              placeholder="Last Name"
              value={lastName}
              name="lastName"
              registerRef={register("lastName", {
                required: {
                  value: !lastName,
                  message: lastNameErrorMessage,
                },
              })}
              onChange={(e, type) => handleChange(e, type)}
              errors={errors}
            />
            <InputField
              type="email"
              className="form-control register-top-space"
              id="email"
              placeholder="Email"
              name="email"
              registerRef={register("email", {
                required: {
                  value: !email,
                  message: emailErrorMessage,
                },
                validate: () => {
                  return validateEmail(email);
                },
              })}
              value={email}
              onChange={(e, type) => handleChange(e, type)}
              errors={errors}
            />
            <PhoneInputField
              type="phone"
              enableSearch="true"
              control={control}
              country={"in"}
              name="phone"
              inputClass={"custom-input"}
              placeholder="Enter phone number"
              value={phone}
              handleChange={(value) =>
                setRegisterUser({ ...registerUser, phone: value })
              }
              className="register-top-space"
              errors={errors}
            />
            {/* <InputField
              type="text"
              className="form-control register-top-space"
              id="text"
              placeholder="company"
              name="company"
              value={company}
              onChange={(e, type) => handleChange(e, type)}
            /> */}
            <PasswordField
              type="password"
              className="form-control register-top-space"
              id="password"
              placeholder="Password"
              value={password}
              name="password"
              registerRef={register("password", {
                required: {
                  value: !password,
                  message: passwordErrorMessage,
                },
                validate: () => {
                  return passwordValidation(password);
                },
              })}
              errors={errors}
              onChange={(e, type) => handleChange(e, type)}
            />

            <PasswordField
              type="password"
              className="form-control register-top-space"
              id="confirm-password"
              placeholder="Confirm Password"
              value={password}
              name="confirmPassword"
              registerRef={register("confirmPassword", {
                required: {
                  value: !password,
                  message: passwordErrorMessage,
                },
                validate: () => {
                  return passwordValidation(password);
                },
              })}
              errors={errors}
              onChange={(e, type) => handleChange(e, type)}
            />

            <div className="form-check register-top-space">
              <Link href="/abouts/terms&condition">
                <label className="form-check-label">
                  I agree to terms & policies.
                </label>
              </Link>
              <InputField
                className="form-check-input"
                type="checkbox"
                value={conditions}
                id="flexCheckIndeterminate"
                name="conditions"
                onChange={(e, type) => handleChange(e, type)}
                registerRef={register("conditions", {
                  required: {
                    value: !conditions,
                    message: termsErrorMessage,
                  },
                })}
                errors={errors}
              />
            </div>
            <CustomButton
              type="submit"
              buttonText="Register"
              className="btn btn-success loading-btn primary-btn-color register-top-space"
              loading={loading}
              disabled={loading}
            ></CustomButton>
          </form>
        </div>
      </div>
    </>
  );
};
export default Register;
