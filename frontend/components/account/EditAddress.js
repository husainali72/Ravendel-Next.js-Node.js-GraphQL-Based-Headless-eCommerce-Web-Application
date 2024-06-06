/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from "react";
import InputField from "../inputField";
import { Controller, useForm } from "react-hook-form";
import {
  handleEnter,
  handleError,
  mutation,
  query,
} from "../../utills/helpers";
import { get } from "lodash";
import ArrowBackIosNewRoundedIcon from "@mui/icons-material/ArrowBackIosNewRounded";
import { emailErrorMessage, passwordErrorMessage } from "../validationMessages";
import { validateEmail } from "../../utills/Validation";
import { isValidPhoneNumber } from "react-phone-number-input";
import PhoneInput from "react-phone-input-2";
import PasswordField from "../passwordField";
import {
  GET_CUSTOMER_QUERY,
  UPDATE_CUSTOMER,
} from "../../queries/customerquery";
import notify from "../../utills/notifyToast";
import { Toaster } from "react-hot-toast";
import ResetPasswordForm from "./component/resetPassword.js/resetPassword";
import { useRouter } from "next/router";
import { useDispatch } from "react-redux";
import { useSession } from "next-auth/react";
import { CircularProgress } from "@mui/material";

var addressFieldObject = {
  firstName: "",
  lastName: "",
  email: "",
  phone: "",
};

function EditAddress() {
  const [customerDetail, setCustomerDetail] = useState(addressFieldObject);
  const [showChangePassword, setShowChangePassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
    control,
  } = useForm({ mode: "onSubmit" });
  const router = useRouter();
  const dispatch = useDispatch();
  const session = useSession();
  const handleInputChange = (e, nm) => {
    if (nm === "addressType") {
      setCustomerDetail({ ...customerDetail, [nm]: e?.value });
    } else {
      let { name, value } = get(e, "target");
      setCustomerDetail({ ...customerDetail, [name]: value });
    }
  };
  const handlePhoneInput = (name, value) => {
    setCustomerDetail({ ...customerDetail, [name]: value });
  };
  const getcustomer = () => {
    if (session.status === "authenticated") {
      let id = get(session, "data.user.accessToken.customer._id");
      let variable = {
        id: id,
      };
      query(GET_CUSTOMER_QUERY, variable).then((response) => {
        const customer = get(response, "data.customer.data");
        setCustomerDetail({ ...customer });
      });
    }
  };
  useEffect(() => {
    getcustomer();
  }, [session]);
  const onSubmit = (data) => {
    setLoading(true);
    const { firstName, lastName, phone, email } = customerDetail || {};
    const customerId = get(session, "data.user.accessToken.customer._id", "");
    const status = get(session, "status", "");
    let payload = {
      id: customerId,
      firstName,
      lastName,
      email,
      phone,
    };
    if (status === "authenticated") {
      mutation(UPDATE_CUSTOMER, payload)
        .then(async (response) => {
          setLoading(false);
          const { success, message } = get(response, "data.updateCustomer");
          if (success) {
            notify(message, true);
            getcustomer();
          }
        })
        .catch((error) => {
          setLoading(false);
          handleError(error, dispatch, router);
        });
    }
  };
  return (
    <>
      {loading && (
        <div className="loading-wrapper">
          <CircularProgress />
        </div>
      )}
      <div className="edit-address-container">
        <Toaster />
        <div className="billing-container cart-main-container">
          {!showChangePassword ? (
            <div>
              <form onSubmit={handleSubmit(onSubmit)}>
                <InputField
                  className="input-filled"
                  name="firstName"
                  label="firstName"
                  placeholder="First Name *"
                  {...register("firstName", {
                    required: {
                      value: get(customerDetail, "firstName") ? false : true,
                      message: "First Name is Required",
                    },
                    minLength: {
                      value: 4,
                      message: "First Name Min length is 4",
                    },
                  })}
                  errors={errors}
                  value={get(customerDetail, "firstName", "")}
                  onChange={handleInputChange}
                  onKeyDown={(e) => handleEnter(e)}
                />
                <InputField
                  className="input-filled"
                  name="lastName"
                  label="lastName"
                  placeholder="Last Name *"
                  {...register("lastName", {
                    required: {
                      value: get(customerDetail, "lastName") ? false : true,
                      message: "Last Name is Required",
                    },
                    minLength: {
                      value: 4,
                      message: "Last Name Min length is 4",
                    },
                  })}
                  errors={errors}
                  value={get(customerDetail, "lastName")}
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
                      value: !get(customerDetail, "email"),
                      message: emailErrorMessage,
                    },
                    validate: () => {
                      return validateEmail(get(customerDetail, "email"));
                    },
                  })}
                  errors={errors}
                  value={customerDetail.email}
                  onChange={handleInputChange}
                  onKeyDown={(e) => handleEnter(e)}
                />
                <div>
                  <Controller
                    name="phone"
                    control={control}
                    rules={{
                      required: {
                        value: get(customerDetail, "phone") ? false : true,
                        message: "Phone number is Required",
                      },
                      validate: () => {
                        const cleanedPhoneNumber = get(
                          customerDetail,
                          "phone",
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
                        value={customerDetail?.phone || ""}
                        onChange={(value) => handlePhoneInput("phone", value)}
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
              <ResetPasswordForm
                setShowChangePassword={setShowChangePassword}
              />
            </div>
          )}
        </div>
      </div>
    </>
  );
}

export default EditAddress;
