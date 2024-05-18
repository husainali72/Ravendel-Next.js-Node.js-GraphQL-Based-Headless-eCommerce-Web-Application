/* eslint-disable no-unused-vars */
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { useDispatch } from "react-redux";
import { signIn, getSession, useSession } from "next-auth/react";
import { createCart } from "../../redux/actions/cartAction";
import { getItemFromLocalStorage, loginCustomer } from "../../utills/helpers";
import Link from "next/link";
import InputField from "../inputField";
import { emailErrorMessage, passwordErrorMessage } from "../validationMessages";
import { validateEmail } from "../../utills/Validation";
import PasswordField from "../passwordField";
import { useForm } from "react-hook-form";
import { get } from "lodash";
import ErrorMessage from "../errorMessage";
import CustomButton from "../button";

const loginObject = {
  email: "",
  password: "",
};

const LogIn = () => {
  const router = useRouter();
  const dispatch = useDispatch();
  const [loginUser, setLoginUser] = useState(loginObject);
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const session = useSession();
  useEffect(() => {
    if (session?.status === "authenticated") {
      router.push("/");
    }
  }, [session]);
  const doLogin = async (e) => {
    loginCustomer(loginUser, setLoading, dispatch, router, setError);
  };
  const handleChange = (e, type) => {
    const { name, value } = get(e, "target");
    setLoginUser({ ...loginUser, [name]: value });
  };
  const { email, password } = loginUser;
  return (
    <div className="login-box ">
      <h4>Login</h4>
      <form onSubmit={handleSubmit(doLogin)}>
        <InputField
          type="email"
          className="form-control"
          id="exampleFormControlInput1"
          placeholder="Your Email"
          name="email"
          registerRef={register("email", {
            required: {
              value: !email,
              message: emailErrorMessage,
            },
            validate: (value) => {
              return validateEmail(email);
            },
          })}
          errors={errors}
          onChange={(e, type) => handleChange(e, type)}
        />
        <PasswordField
          type="password"
          className="form-control login-top-space"
          id="password"
          placeholder="Password"
          value={password}
          name="password"
          registerRef={register("password", {
            required: {
              value: !password,
              message: passwordErrorMessage,
            },
          })}
          errors={errors}
          onChange={(e, type) => handleChange(e, type)}
        />
        <div className="form-check remeber-btn-margin">
          <InputField
            className="form-check-input"
            type="checkbox"
            value=""
            name="remeber"
            id="flexCheckIndeterminate"
            onChange={(e, type) => handleChange(e, type)}
          />
          <label className="form-check-label">Remember me</label>
          <Link href="/account/forgetpassword">
            <span className="forgot-pasword-link">forget password ?</span>
          </Link>
        </div>
        <CustomButton
          type="submit"
          buttonText="Login"
          className="btn btn-success primary-btn-color login-btn"
          loading={loading}
          disabled={loading}
        ></CustomButton>
        <ErrorMessage message={error} />
      </form>
    </div>
  );
};
export default LogIn;
