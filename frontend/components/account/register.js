/* eslint-disable no-unused-vars */
import { useState } from "react";
import { ADD_CUSTOMER } from "../../queries/customerquery";
import Link from "next/link";
import { loginCustomer, mutation } from "../../utills/helpers";
import toast, { Toaster } from "react-hot-toast";
import { validateEmail, passwordValidation, confirmPasswordValidation } from "../../utills/Validation";
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
import { useDispatch } from "react-redux";
import { useRouter } from "next/router";
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
  const [error, setError] = useState(false);
  const dispatch = useDispatch();
  const router = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors },
    control,
  } = useForm();
  const onSubmit = (e) => {
    setLoading(true);
    const { conditions,confirmPassword, ...variable } = registerUser;
    mutation(ADD_CUSTOMER, variable)
      .then((res) => {
        setLoading(false);
        const addCustomerResponse = get(res, "data.addCustomer");
        if (addCustomerResponse) {
          const { message, success } = addCustomerResponse;
          notify(message, success);
          if (success) {
            setRegisterUser({ ...registerObject });
            let loginUser = {
              email: registerUser?.email,
              password: registerUser?.password,
            };
            loginCustomer(loginUser, setLoading, dispatch, router, setError);
          }
        } else {
          // Handle the case where data is null or success is false
          if (registerUser) {
            setRegisterUser({ ...registerUser });
          } else {
            setRegisterUser({ ...registerObject });
          }
        }
      })
      .catch((error) => {
        setLoading(false);
        if (registerUser) {
          setRegisterUser({ ...registerUser });
        } else {
          setRegisterUser({ ...registerObject });
        }
      });
  };
  const handleChange = (e, type) => {
    const { name, value } = get(e, "target");
    if (type === "checkbox") {
      setRegisterUser({ ...registerUser, [name]: !registerUser[name] });
    } else {
      console.log(name,value)
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
              value={get(registerUser,'confirmPassword')}
              name="confirmPassword"
              registerRef={register("confirmPassword", {
                required: {
                  value: !get(registerUser,'confirmPassword'),
                  message: passwordErrorMessage,
                },
                validate: () => {
                  return confirmPasswordValidation(password,get(registerUser,'confirmPassword'));
                },
              })}
              errors={errors}
              onChange={(e, type) => handleChange(e, type)}
            />

            <div className="form-check register-top-space">
                <a href="/abouts/terms&condition" rel="noopener noreferrer" target="_blank">
                  <label className="form-check-label">
                    I agree to terms & policies.
                  </label>
                </a>
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
