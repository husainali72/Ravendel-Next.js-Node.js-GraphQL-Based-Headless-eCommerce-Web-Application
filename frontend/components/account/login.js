import { useState } from "react";
import { useRouter } from "next/router";
import { useDispatch } from "react-redux";
import { signIn, getSession } from "next-auth/react";
import { createCart } from "../../redux/actions/cartAction";
import { getItemFromLocalStorage } from "../../utills/helpers";
import Link from "next/link";
import Loading from "../loading";
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
  const [loginSuccess, setLoginSuccess] = useState(false);
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const doLogin = async (e) => {
    setLoading(true);
    try {
      const response = await signIn("credentials", {
        email: loginUser.email,
        password: loginUser.password,
        redirect: false,
      });
      const session = await getSession();
      const error = get(response, "error");
      const status = get(response, "status");
      const success = get(response, "ok");
      if (error) {
        setLoading(false);
        setError(
          status === 401 && error === "Invalid Email or Password"
            ? error
            : "Something went wrong"
        );
      } else {
        setLoading(false);
        setError(null);
      }
      if (success) {
        setLoading(false);
        const productsInCart = getItemFromLocalStorage("cart");
        const id = get(session, "user.accessToken.customer._id");
        const products = productsInCart?.map((product) => {
          const {
            _id,
            name,
            pricing,
            feature_image,
            shippingClass,
            taxClass,
            variantId,
            quantity,
            attributes,
          } = product;
          return {
            productId: _id,
            productTitle: name,
            productPrice: pricing?.toString(),
            productImage: feature_image,
            shippingClass: shippingClass,
            taxClass: taxClass,
            variantId: variantId,
            qty: quantity,
            attributes: attributes,
          };
        });

        dispatch(createCart(id, products));
      }
      if (response.ok) await router.push("/");
    } catch (error) {
      setLoading(false);
      setError("Something went wrong");
    }
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
        ></CustomButton>
        <ErrorMessage message={error} />
      </form>
    </div>
  );
};
export default LogIn;
