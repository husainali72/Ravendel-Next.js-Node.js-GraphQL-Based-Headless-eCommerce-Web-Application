import React, { useState } from "react";
import InputField from "../../inputField";
import { emailErrorMessage } from "../../validationMessages";
import { validateEmail } from "../../../utills/Validation";
import { get } from "lodash";
import { useForm } from "react-hook-form";
import Link from "next/link";
import { mutationWithoutToken } from "../../../utills/helpers";
import { SEND_FORGOT_PASSWORD_EMAIL } from "../../../queries/forgotPasswordQuery";
import notify from "../../../utills/notifyToast";
import PropTypes from "prop-types";
import ProductImage from "../../imageComponent";
import { useSelector } from "react-redux";
import { useRouter } from "next/router";
const SendEmail = ({ token }) => {
  const [email, setEmail] = useState("");
  const [isButtonDisabled, setIsButtonDisabled] = useState(false);
  const settings = useSelector((state) => state.setting);
  const router = useRouter();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();
  const handleChange = (e) => {
    const { value } = get(e, "target", {});
    setEmail(value);
  };
  const onSubmit = async () => {
    setIsButtonDisabled(true);
    try {
      if (email) {
        const response = await mutationWithoutToken(
          SEND_FORGOT_PASSWORD_EMAIL,
          {
            email,
          }
        );
        if (response) {
          const { success, message } = get(
            response,
            "data.sendForgetPasswordEmail",
            {}
          );
          if (success) {
            reset();
            notify(message, success);
            router.push("/login");
          } else {
            setIsButtonDisabled(false);
            notify(message, false);
          }
        }
      }
    } catch (error) {
      setIsButtonDisabled(false);
      notify("An error occurred", false);
    }
  };
  // const resetEmail = () => {
  //   reset()
  //   setIsButtonDisabled(false);
  //   setEmail("");
  // };

  return (
    <>
      <div className="forgotPassword-container">
        <div className="mt-4">
          <Link href="/">
            <a>
              <ProductImage
                src={get(settings, "setting.appearance.theme.logo")}
                className="logo-image"
                alt=""
              />
            </a>
          </Link>
          <h3 className="mt-4">Forgot Password</h3>
          <p>
            Enter your email and we'll share a link to get back to your account.
          </p>
        </div>
        <form onSubmit={handleSubmit(onSubmit)}>
          {!token && (
            <>
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
                  validate: validateEmail,
                })}
                value={email}
                onChange={handleChange}
                errors={errors}
              />
              <Link href="/login">
                <a className="forgot-pasword-link">Back to login</a>
              </Link>

              <button
                type="submit"
                className="btn btn-primary mt-4 primary-btn-color"
                disabled={isButtonDisabled}
              >
                Send Email
              </button>
            </>
          )}
        </form>
      </div>
    </>
  );
};
SendEmail.propTypes = {
  token: PropTypes.string.isRequired,
};
export default SendEmail;
