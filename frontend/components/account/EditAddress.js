import React, { useState } from "react";
import InputField from "../inputField";
import { Controller, useForm } from "react-hook-form";
import { handleEnter } from "../../utills/helpers";
import { get } from "lodash";
import ArrowBackIosNewRoundedIcon from "@mui/icons-material/ArrowBackIosNewRounded";
import { emailErrorMessage } from "../validationMessages";
import { validateEmail } from "../../utills/Validation";
import { isValidPhoneNumber } from "react-phone-number-input";
import PhoneInput from "react-phone-input-2";
import ResetPasswordForm from "./component/resetPassword.js/resetPassword";
import { Toaster } from "react-hot-toast";

var addressFieldObject = {
  fullName: "",
  email: "",
  mobileNumber: "",
};

function EditAddress() {
  const [addressFieldInfo, setAddressFieldInfo] = useState(addressFieldObject);
  const [showChangePassword, setShowChangePassword] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
    control,
  } = useForm({ mode: "onSubmit" });

  const handleInputChange = (e, nm) => {
    if (nm === "addressType") {
      setAddressFieldInfo({ ...addressFieldInfo, [nm]: e?.value });
    } else {
      let { name, value } = get(e, "target");
      setAddressFieldInfo({ ...addressFieldInfo, [name]: value });
    }
  };
  const handlePhoneInput = (name, value) => {
    setAddressFieldInfo({ ...addressFieldInfo, [name]: value });
  };

  const onSubmit = () => {};

  return (
    <div className="edit-address-container">
      <Toaster />
      <div className="billing-container cart-main-container">
        {!showChangePassword ? (
          <div>
            <form onSubmit={handleSubmit(onSubmit)}>
              <InputField
                className="input-filled"
                name="fullName"
                label="fullName"
                placeholder="Full Name *"
                {...register("fullName", {
                  required: {
                    value: addressFieldInfo.fullName ? false : true,
                    message: "Full Name is Required",
                  },
                  minLength: {
                    value: 4,
                    message: "Full Name Min length is 4",
                  },
                })}
                errors={errors}
                value={addressFieldInfo.fullName}
                onChange={handleInputChange}
                onKeyDown={(e) => handleEnter(e)}
              />
              <InputField
                className="input-filled"
                type="text"
                required=""
                name="email"
                label="Email"
                placeholder="email *"
                register={register("email", {
                  required: {
                    value: !get(addressFieldInfo, "email"),
                    message: emailErrorMessage,
                  },
                  validate: () => {
                    return validateEmail(get(addressFieldInfo, "email"));
                  },
                })}
                errors={errors}
                value={addressFieldInfo.email}
                onChange={handleInputChange}
                onKeyDown={(e) => handleEnter(e)}
              />
              <div>
                <Controller
                  name="mobileNumber"
                  control={control}
                  rules={{
                    required: {
                      value: get(addressFieldInfo, "mobileNumber")
                        ? false
                        : true,
                      message: "Phone number is Required",
                    },
                    validate: () => {
                      const cleanedPhoneNumber = get(
                        addressFieldInfo,
                        "mobileNumber",
                        ""
                      )?.replace(/\D/g, "");

                      // Add '91' to the cleaned phone number
                      const formattedPhoneNumber = `+${cleanedPhoneNumber}`;
                      return isValidPhoneNumber(formattedPhoneNumber);
                    },
                  }}
                  render={() => (
                    <PhoneInput
                      enableSearch="true"
                      country={"us"}
                      inputClass={"custom-input"}
                      placeholder="Enter phone number"
                      value={addressFieldInfo?.phone || ""}
                      onChange={(value) =>
                        handlePhoneInput("mobileNumber", value)
                      }
                    />
                  )}
                />
                <p>
                  <small style={{ color: "red" }}>
                    {errors?.phone?.type === "required"
                      ? errors.phone?.message
                      : ""}
                    {errors?.phone?.type === "validate"
                      ? "Phone number is invalid"
                      : ""}
                  </small>
                </p>
              </div>
              <div
                className="btn-wrapper d-flex justify-content-end"
                style={{ gap: "12px" }}
              >
                <button
                  className="card-btons text-align-center outline"
                  onClick={() => setShowChangePassword(true)}
                >
                  <span className="text-align-center">Change Password</span>
                </button>
                <button
                  className="card-btons text-align-center primary-btn-color"
                  type="submit"
                >
                  <span className="text-align-center">Save Changes</span>
                </button>
              </div>
            </form>
          </div>
        ) : (
          <div>
            <div className="order-details-head">
              <button
                className="back-btn"
                onClick={() => setShowChangePassword(false)}
              >
                <ArrowBackIosNewRoundedIcon />
              </button>
              <h4>Change Password</h4>
            </div>
            <ResetPasswordForm setShowChangePassword={setShowChangePassword} />
          </div>
        )}
      </div>
    </div>
  );
}

export default EditAddress;
