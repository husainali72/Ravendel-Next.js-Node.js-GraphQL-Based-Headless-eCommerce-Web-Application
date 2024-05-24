/* eslint-disable react/prop-types */
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { RESET_PASSWORD } from "../../../../queries/customerquery";
import { mutation } from "../../../../utills/helpers";
import { get } from "lodash";
import PasswordField from "../../../passwordField";
import { passwordErrorMessage } from "../../../validationMessages";
import { passwordValidation } from "../../../../utills/Validation";
import { useSession } from "next-auth/react";
import notify from "../../../../utills/notifyToast";
import Loading from "../../../loading";

const ResetPasswordForm = ({ setShowChangePassword }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ mode: "onSubmit" });
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    currentPassword: "",
    newPassword: "",
  });
  const session = useSession();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const onSubmit = async () => {
    setLoading(true);
    try {
      const response = await mutation(RESET_PASSWORD, {
        email: get(session, "data.user.accessToken.customer.email"),
        oldPassword: get(formData, "currentPassword", ""),
        newPassword: get(formData, "newPassword", ""),
      });
      if (response) {
        setLoading(false);
        const { success, message } = get(response, "data.resetPassword", {});
        if (success) {
          notify(message, success);
          setShowChangePassword(false);
        }
        if (!success) {
          notify(message, success);
        }
      }
    } catch (error) {
      setLoading(false);
      console.error("Error:", error);
    }
  };

  return (
    <div>
      {loading && <Loading />}
      <form onSubmit={handleSubmit(onSubmit)}>
        <PasswordField
          type="password"
          className="form-control login-top-space"
          id="currentPassword"
          placeholder="Current Password"
          value={get(formData, "currentPassword", "")}
          name="currentPassword"
          registerRef={register("currentPassword", {
            required: {
              value: !get(formData, "currentPassword"),
              message: `Current ${passwordErrorMessage}`,
            },
          })}
          errors={errors}
          onChange={(e) => handleInputChange(e)}
        />
        <PasswordField
          type="password"
          className="form-control login-top-space"
          id="newPassword"
          placeholder="newPassword"
          value={get(formData, "newPassword", "")}
          name="newPassword"
          registerRef={register("newPassword", {
            required: {
              value: !get(formData, "newPassword"),
              message: `New ${passwordErrorMessage}`,
            },
            validate: () => {
              return passwordValidation(get(formData, "newPassword", ""));
            },
          })}
          errors={errors}
          onChange={(e) => handleInputChange(e)}
        />
        <div
          className="btn-wrapper d-flex justify-content-end"
          style={{ width: "100%", gap: "12px" }}
        >
          <button
            type="button"
            onClick={() => setShowChangePassword(false)}
            className="btn btn-danger checkout-continue-btn"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="btn btn-success primary-btn-color checkout-continue-btn"
          >
            Change password
          </button>
        </div>
      </form>
    </div>
  );
};

export default ResetPasswordForm;
