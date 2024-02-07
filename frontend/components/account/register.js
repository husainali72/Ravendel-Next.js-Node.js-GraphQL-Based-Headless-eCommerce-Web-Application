import { useState } from "react";
import { ADD_CUSTOMER } from "../../queries/customerquery";
import client from "../../apollo-client";
import Link from "next/link";
import { mutation } from "../../utills/helpers";
import { Spinner, Toast } from "react-bootstrap";
import toast, { Toaster } from "react-hot-toast";
import PhoneInput from "react-phone-input-2";
// import "react-phone-input-2/lib/style.css";
import "react-phone-input-2/lib/bootstrap.css";
import PasswordField from "../passwordField";
import { Validation } from "../../utills/Validation";
const registerObject = {
  ///////////////////////////////
  queryName: "addCustomer",
  ///////////////////////////////
  firstName: "",
  lastName: "",
  email: "",
  password: "",
  company: "",
  phone: "",
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
  const [Errors, setErrors] = useState({});
  const doRegister = (e) => {
    e.preventDefault();
    const errors = Validation(registerUser);
    setErrors((prevErrors) => ({ ...prevErrors, ...errors }));
    if (Object.keys(errors).length === 0 && Errors !== {}) {
      setLoading(true);
      mutation(ADD_CUSTOMER, registerUser)
        .then((res) => {
          console.log("register", res);
          if (res?.data?.addCustomer) {
            notify(
              res?.data?.addCustomer?.message,
              res?.data?.addCustomer?.success
            );
          }
          setLoading(false);
        })
        .catch((error) => {
          console.log(error);
          setLoading(false);
        })
        .finally(() => {
          setRegisterUser(registerObject);
          setErrors({});
        });
    }
  };

  async function registerCustomer(registerUser) {
    var registerUsers = [];
    try {
      const { data: registerUserData } = await client.mutate({
        mutation: ADD_CUSTOMER,
        variables: registerUser,
      });
      registerUsers = registerUserData;
    } catch (e) {
      console.log("error", e);
    }
  }
  const [value, setValue] = useState();

  return (
    <>
      <Toaster />
      <div className="p-30 register-box registerContainer">
        <h4>Create your Account</h4>
        <p style={{ marginTop: 12 }} className="mb-50">
          Your personal data will be used to support your experience throughout
          this website, to manage access to your account, and for other purposes
          described in our privacy policy
        </p>
        <div className="form-container">
          <form onSubmit={doRegister}>
            <input
              type="firstName"
              className="form-control"
              id="firstName"
              placeholder="First Name"
              value={registerUser.firstName}
              onChange={(e) =>
                setRegisterUser({ ...registerUser, firstName: e.target.value })
              }
            />
            <div className="error-message">
              <small>{Errors?.firstName && Errors?.firstName}</small>
            </div>
            <input
              type="lastName"
              className="form-control"
              id="lastName"
              placeholder="Last Name"
              value={registerUser.lastName}
              onChange={(e) =>
                setRegisterUser({ ...registerUser, lastName: e.target.value })
              }
            />
            <div className="error-message">
              <small>{Errors?.lastName && Errors?.lastName}</small>
            </div>
            <input
              type="login-email"
              style={{ marginTop: 12 }}
              className="form-control"
              id="email"
              placeholder="Email"
              value={registerUser.email}
              onChange={(e) =>
                setRegisterUser({ ...registerUser, email: e.target.value })
              }
            />
            <div className="error-message">
              <small>{Errors?.email && Errors?.email}</small>
            </div>
            <PhoneInput
              enableSearch="true"
              country={"in"}
              inputClass={"custom-input"}
              // buttonClass={'select-flag'}
              placeholder="Enter phone number"
              value={registerUser.phone}
              onChange={(value) =>
                setRegisterUser({ ...registerUser, phone: value })
              }
              style={{ marginTop: 12 }}
            />
             <div className="error-message">
              <small>{Errors?.phone && Errors?.phone}</small>
            </div>
            <input
              type="text"
              style={{ marginTop: 12 }}
              className="form-control"
              id="text"
              placeholder="Company"
              value={registerUser.company}
              onChange={(e) =>
                setRegisterUser({ ...registerUser, company: e.target.value })
              }
            />
             <div className="error-message">
              <small>{Errors?.company && Errors?.company}</small>
            </div>
            <PasswordField
              handlePassword={(e) => {
                setRegisterUser({ ...registerUser, password: e.target.value });
                setErrors({});
              }}
              value={registerUser.password}
            />
            <div className="error-message">
              <small>{Errors?.password && Errors?.password}</small>
            </div>
            {/* <input
                        type="password"
                        className="form-control"
                        style={{ marginTop: 12 }}
                        id="confirm password"
                        placeholder="Confirm Password"
                        value={registerUser.confirmPassword}
                        onChange={(e) => setRegisterUser({ ...registerUser, confirmPassword: e.target.value })}
                    /> */}
            <div className="form-check" style={{ marginTop: 12 }}>
              <input
                className="form-check-input"
                type="checkbox"
                value={registerUser?.terms}
                id="flexCheckIndeterminate"
                onChange={(e) =>
                  setRegisterUser({
                    ...registerUser,
                    terms: !registerUser?.terms,
                  })
                }
              />
              <Link href="/abouts/terms&condition">
                <label className="form-check-label">
                  I agree to terms & Policy.
                </label>
              </Link>
              <div className="error-message">
                <small>{Errors?.terms && Errors?.terms}</small>
              </div>
              {/* <a href="#" style={{ float: 'right' }}>learn more</a> */}
            </div>
            <button
              // disabled={
              //   registerUser.firstName == "" ||
              //   registerUser.lastName == "" ||
              //   registerUser.email == "" ||
              //   registerUser.password == "" ||
              //   registerUser.company == "" ||
              //   registerUser.phone == ""
              // }
              type="submit"
              className="btn btn-success loading-btn"
              style={{ marginTop: 12, backgroundColor: "#088178" }}
            >
              {loading ? (
                <Spinner animation="border" size="sm" role="status" />
              ) : (
                "Register"
              )}
            </button>
          </form>
        </div>
      </div>
    </>
  );
};
export default Register;
