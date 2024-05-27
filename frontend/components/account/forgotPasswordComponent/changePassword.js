import React, { useState } from "react";
import { get } from "lodash";
import { useForm } from "react-hook-form";
import { mutationWithoutToken } from "../../../utills/helpers";
import { VERIFY_FORGOT_PASSWORD_TOKEN } from "../../../queries/forgotPasswordQuery";
import PasswordField from "../../passwordField";
import { passwordErrorMessage } from "../../validationMessages";
import { passwordValidation } from "../../../utills/Validation";
import notify from "../../../utills/notifyToast";
import PropTypes from 'prop-types';
import { useRouter } from "next/router";
const ChangePassword = ({ token }) => {
  const [password, setPassword] = useState("");
  const [isButtonDisabled, setIsButtonDisabled] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const router=useRouter()
  const handleChange = (e) => {
    const { value } = get(e, "target", {});
    setPassword(value);
  };
  const onSubmit = async () => {
    setIsButtonDisabled(true);
    try {
      if (token) {
        const response = await mutationWithoutToken(
          VERIFY_FORGOT_PASSWORD_TOKEN,
          {
            newPassword: password,
            token,
          }
        );
        if (response) {
          const { success, message } = get(
            response,
            "data.verifyForgetPasswordToken",
            {}
          );
          if (success) {
            notify(message, success);
            router.push('/login')
          } else {
            setIsButtonDisabled(false);
            notify(message, false);
          }
        }
      }
    } catch (error) {
      setIsButtonDisabled(false);
      console.error("Error:", error);
    }
  };

  return (
    <>
      <div className="forgotPassword-container">
        <div>
          <h3>Reset Password</h3>
        </div>
        <form onSubmit={handleSubmit(onSubmit)}>
          {token && (
            <>
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
                onChange={(e) => handleChange(e)}
              />
              <button
                type="submit"
                className="btn btn-primary mt-3 primary-btn-color"
                disabled={isButtonDisabled}
              >
              Submit
              </button>
            </>
          )}
        </form>
      </div>
    </>
  );
};
ChangePassword.propTypes = {
  token: PropTypes.string.isRequired,
};
export default ChangePassword;
