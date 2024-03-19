import { useState, useEffect, useRef } from "react";
import Collapse from "react-bootstrap/Collapse";
import Form from "react-bootstrap/Form";
import { Controller } from "react-hook-form";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/bootstrap.css";
import { isValidPhoneNumber } from "react-phone-number-input";
import { handleEnter } from "../../utills/helpers";
const BillingDetails = (props) => {
  const {
    handleShippingPhone,
    control,
    getBillingInfo,
    registerRef,
    errorRef,
    billingInfo,
    handleZipCode,
    ZipMessage,
    shippingAddressToggle,
    handleShippingChange,
    shippingAdd,
    shippingInfo,
    handlePhoneInput,
    handleBillingInfo,
  } = props;
  useEffect(() => {
    var allData = {
      billing: billingInfo,
      shipping: shippingInfo,
      shippingAddress: shippingAdd,
    };
    getBillingInfo(allData);
  }, [shippingInfo, billingInfo, shippingAdd]);
  return (
    <>
      <div className="billing-container">
        <div>
          <div className="twoRows">
            <div className="col-lg-6 col-md-12 col-md-5half">
              <input
                className="input-filled"
                name="firstname"
                label="firstname"
                placeholder="First name *"
                {...registerRef("firstname", {
                  required: {
                    value: billingInfo.firstname ? false : true,
                    message: "First Name is Required",
                  },
                  minLength: {
                    value: 4,
                    message: "First Name Min length is 4",
                  },
                })}
                value={billingInfo.firstname}
                onChange={handleBillingInfo}
                onKeyDown={(e) => handleEnter(e)}
              />
              <p>
                <small style={{ color: "red" }}>
                  {errorRef.firstname?.type === "required"
                    ? errorRef.firstname?.message
                    : ""}
                  {errorRef.firstname?.type === "minLength"
                    ? errorRef.firstname?.message
                    : ""}
                </small>
              </p>
            </div>
            <div className="col-lg-6 col-md-12  ">
              <input
                className="input-filled"
                name="lastname"
                label="lastname"
                placeholder="Last name *"
                {...registerRef("lastname", {
                  required: {
                    value: billingInfo.lastname ? false : true,
                    message: "Last Name is Required",
                  },
                })}
                value={billingInfo.lastname}
                onChange={handleBillingInfo}
                error={errorRef.billingInfo ? true : false}
                onKeyDown={(e) => handleEnter(e)}
              />
              <p>
                <small style={{ color: "red" }}>
                  {errorRef.lastname?.type === "required"
                    ? errorRef.lastname?.message
                    : ""}
                </small>
              </p>
            </div>
          </div>
          <div className="twoRows">
            <div className="col-lg-6 col-md-12">
              <input
                className="input-filled"
                name="company"
                label="company"
                placeholder="Company name *"
                {...registerRef("company", {
                  required: {
                    value: billingInfo.company ? false : true,
                    message: "Company Name is Required",
                  },
                })}
                value={billingInfo.company}
                onChange={handleBillingInfo}
                onKeyDown={(e) => handleEnter(e)}
              />

              <p>
                <small style={{ color: "red" }}>
                  {errorRef.company?.type === "required"
                    ? errorRef.company?.message
                    : ""}
                </small>
              </p>
            </div>
            <div className="col-lg-6 col-md-12">
              <input
                className="input-filled"
                name="address"
                label="address"
                placeholder="Address *"
                {...registerRef("address", {
                  required: {
                    value: billingInfo.address ? false : true,
                    message: "Address is Required",
                  },
                })}
                value={billingInfo.address}
                onChange={handleBillingInfo}
                onKeyDown={(e) => handleEnter(e)}
              />
              <p>
                <small style={{ color: "red" }}>
                  {errorRef.address?.type === "required"
                    ? errorRef.address?.message
                    : ""}
                </small>
              </p>
            </div>
          </div>
          <div className="twoRows">
            <div className="col-lg-4 col-md-12">
              <input
                className="input-filled"
                type="text"
                required=""
                name="City"
                placeholder="City / Town *"
                {...registerRef("city", {
                  required: {
                    value: billingInfo.city ? false : true,
                    message: "City is Required",
                  },
                })}
                value={billingInfo.city}
                onChange={handleBillingInfo}
                onKeyDown={(e) => handleEnter(e)}
              />
              <p>
                <small style={{ color: "red" }}>
                  {errorRef.city?.type === "required"
                    ? errorRef.city?.message
                    : ""}
                </small>
              </p>
            </div>
            <div className="col-lg-4 col-md-12">
              <input
                className="input-filled"
                type="text"
                required=""
                name="state"
                placeholder="State *"
                {...registerRef("state", {
                  required: {
                    value: billingInfo.state ? false : true,
                    message: "State is Required",
                  },
                })}
                value={billingInfo.state}
                onChange={handleBillingInfo}
                onKeyDown={(e) => handleEnter(e)}
              />
              <p>
                <small style={{ color: "red" }}>
                  {errorRef.state?.type === "required"
                    ? errorRef.state?.message
                    : ""}
                </small>
              </p>
            </div>

            <div className="col-lg-4 col-md-12">
              <input
                className="input-filled"
                type="text"
                required=""
                name="country"
                placeholder="Country *"
                {...registerRef("country", {
                  required: {
                    value: billingInfo.country ? false : true,
                    message: "Country is Required",
                  },
                })}
                value={billingInfo.country}
                onChange={handleBillingInfo}
                onKeyDown={(e) => handleEnter(e)}
              />
              <p>
                <small style={{ color: "red" }}>
                  {errorRef.country?.type === "required"
                    ? errorRef.country?.message
                    : ""}
                </small>
              </p>
            </div>
          </div>

          <div className="twoRows">
            <div className="col-lg-6 col-md-12">
              <input
                className="input-filled"
                type="text"
                required=""
                label="zip"
                name="zip"
                placeholder="Zip *"
                {...registerRef("zip", {
                  required: {
                    value: billingInfo.zip ? false : true,
                    message: "zip is Required",
                  },
                })}
                value={billingInfo.zip}
                onChange={handleZipCode}
                onKeyDown={(e) => handleEnter(e)}
              />
              <p>
                <small
                  style={{ color: ZipMessage.zipSuccess ? "#4BB543" : "red" }}
                >
                  {ZipMessage.zipMessage}
                </small>
              </p>
            </div>
            <div className="col-lg-6 col-md-12">
              <Controller
                name="phone"
                control={control}
                rules={{
                  required: {
                    value: billingInfo.phone ? false : true,
                    message: "Phone number is Required",
                  },
                  validate: () => {
                    const cleanedPhoneNumber = billingInfo.phone.replace(
                      /\D/g,
                      ""
                    );

                    // Add '91' to the cleaned phone number
                    const formattedPhoneNumber = `+${cleanedPhoneNumber}`;
                    return isValidPhoneNumber(formattedPhoneNumber);
                  },
                }}
                render={({ field: { onChange, value } }) => (
                  <PhoneInput
                    enableSearch="true"
                    country={"us"}
                    inputClass={"custom-input"}
                    placeholder="Enter phone number"
                    value={billingInfo.phone}
                    onChange={(value) => handlePhoneInput("phone", value)}
                  />
                )}
              />
              <p>
                <small style={{ color: "red" }}>
                  {errorRef.phone?.type === "required"
                    ? errorRef.phone?.message
                    : ""}
                  {errorRef.phone?.type === "validate"
                    ? "Phone number is invalid"
                    : ""}
                </small>
              </p>
            </div>
          </div>
          <input
            className="input-filled"
            type="text"
            required=""
            name="email"
            label="Email"
            placeholder="email *"
            {...registerRef("email", {
              required: {
                value: billingInfo.email ? false : true,
                message: "Email is Required",
              },
              pattern: {
                value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i,
                message: "Invalid Email",
              },
            })}
            value={billingInfo.email}
            onChange={handleBillingInfo}
            onKeyDown={(e) => handleEnter(e)}
          />
          <p>
            <small style={{ color: "red" }}>
              {errorRef.email?.type === "required"
                ? errorRef.email?.message
                : ""}
              {errorRef.email?.type === "minLength"
                ? errorRef.email?.message
                : ""}
              {errorRef.email?.type === "maxLength"
                ? errorRef.email?.message
                : ""}
              {errorRef.email?.type === "pattern"
                ? errorRef.email?.message
                : ""}
            </small>
          </p>

          <div className="form-group">
            <div className="checkbox">
              <div className="custome-checkbox">
                <input
                  className="form-check-input-create-account"
                  type="checkbox"
                  name="checkbox"
                  id="createaccount"
                />
                <label
                  className="form-check-label label_info"
                  data-target="#collapsePassword"
                  aria-controls="collapsePassword"
                >
                  <span>Create an account?</span>
                </label>
              </div>
            </div>
          </div>

          <div className="ship_detail">
            <div className="form-group">
              <div className="chek-form">
                <Form>
                  <Form.Check
                    className="form-check-input"
                    name="checkbox"
                    id="differentaddress"
                    checked={shippingAdd}
                    onChange={(e) => shippingAddressToggle(e)}
                  />
                </Form>
                <label
                  className="form-check-label label_info"
                  data-bs-toggle="collapse"
                  aria-controls="collapseAddress"
                >
                  <span>Ship to a different address?</span>
                </label>
              </div>
            </div>
            <Collapse in={shippingAdd}>
              <div
                id="collapseAddress"
                className="different_address collapse in"
              >
                <input
                  className="input-filled"
                  name="shippingfirstname"
                  label="firstname"
                  placeholder="First name *"
                  {...registerRef("shippingfirstname", {
                    required: {
                      value: shippingAdd
                        ? shippingInfo?.firstname
                          ? false
                          : true
                        : false,
                      message: "First Name is Required",
                    },
                    minLength: {
                      value: 4,
                      message: "First Name Min length is 4",
                    },
                  })}
                  value={shippingInfo?.firstname}
                  onChange={handleShippingChange}
                  onKeyDown={(e) => handleEnter(e)}
                />
                <p>
                  <small style={{ color: "red" }}>
                    {errorRef.shippingfirstname?.type === "required"
                      ? errorRef.shippingfirstname?.message
                      : ""}
                    {errorRef.shippingfirstname?.type === "minLength"
                      ? errorRef.shippingfirstname?.message
                      : ""}
                  </small>
                </p>
                <input
                  className="input-filled"
                  name="shippinglastname"
                  label="lastname"
                  placeholder="Last name *"
                  {...registerRef("shippinglastname", {
                    required: {
                      value: shippingAdd
                        ? shippingInfo?.lastname
                          ? false
                          : true
                        : false,
                      message: "Last Name is Required",
                    },
                    minLength: {
                      value: 3,
                      message: "Lastname Min length is 3",
                    },
                  })}
                  value={shippingInfo?.lastname}
                  onChange={handleShippingChange}
                  onKeyDown={(e) => handleEnter(e)}
                />
                <p>
                  <small style={{ color: "red" }}>
                    {errorRef.shippinglastname?.type === "required" ||
                    "minLength"
                      ? errorRef.shippinglastname?.message
                      : ""}
                    {/* {errorRef.shippinglastname?.type === "minLength" ? errorRef.shippinglastname?.message : ""} */}
                  </small>
                </p>
                <input
                  className="input-filled"
                  name="shippingcompany"
                  label="company"
                  placeholder="Company name *"
                  {...registerRef("shippingcompany", {
                    required: {
                      value: shippingAdd
                        ? shippingInfo?.company
                          ? false
                          : true
                        : false,
                      message: "Company is Required",
                    },
                  })}
                  value={shippingInfo?.company}
                  onChange={handleShippingChange}
                  onKeyDown={(e) => handleEnter(e)}
                />
                <p>
                  <small style={{ color: "red" }}>
                    {errorRef.shippingcompany?.type === "required"
                      ? errorRef.shippingcompany?.message
                      : ""}
                  </small>
                </p>
                <input
                  className="input-filled"
                  name="shippingaddress"
                  label="address_line_1"
                  placeholder="Address line 1 *"
                  {...registerRef("shippingaddress", {
                    required: {
                      value: shippingAdd
                        ? shippingInfo?.address
                          ? false
                          : true
                        : false,
                      message: "Address is Required",
                    },
                  })}
                  value={shippingInfo?.address}
                  onChange={handleShippingChange}
                  onKeyDown={(e) => handleEnter(e)}
                />
                <p>
                  <small style={{ color: "red" }}>
                    {errorRef.shippingaddress?.type === "required"
                      ? errorRef.shippingaddress?.message
                      : ""}
                  </small>
                </p>
                <input
                  className="input-filled"
                  type="text"
                  name="shippingaddressLine2"
                  label="address_line_2"
                  placeholder="Address line 2 *"
                  {...registerRef("shippingaddressLine2", {
                    required: {
                      value: shippingAdd
                        ? shippingInfo?.addressLine2
                          ? false
                          : true
                        : false,
                      message: "Address is Required",
                    },
                  })}
                  value={shippingInfo?.addressLine2}
                  onChange={handleShippingChange}
                  onKeyDown={(e) => handleEnter(e)}
                />
                <p>
                  <small style={{ color: "red" }}>
                    {errorRef.shippingaddressLine2?.type === "required"
                      ? errorRef.shippingaddressLine2?.message
                      : ""}
                  </small>
                </p>
                <input
                  className="input-filled"
                  type="text"
                  name="shippingcity"
                  label="City"
                  placeholder="City / Town *"
                  {...registerRef("shippingcity", {
                    required: {
                      value: shippingAdd
                        ? shippingInfo?.city
                          ? false
                          : true
                        : false,
                      message: "City is Required",
                    },
                  })}
                  value={shippingInfo?.city}
                  onChange={handleShippingChange}
                  onKeyDown={(e) => handleEnter(e)}
                />
                <p>
                  <small style={{ color: "red" }}>
                    {errorRef.shippingcity?.type === "required"
                      ? errorRef.shippingcity?.message
                      : ""}
                  </small>
                </p>
                <input
                  className="input-filled"
                  type="text"
                  name="shippingstate"
                  label="State"
                  placeholder="State *"
                  {...registerRef("shippingstate", {
                    required: {
                      value: shippingAdd
                        ? shippingInfo?.state
                          ? false
                          : true
                        : false,
                      message: "State is Required",
                    },
                  })}
                  value={shippingInfo?.state}
                  onChange={handleShippingChange}
                />
                <p>
                  <small style={{ color: "red" }}>
                    {errorRef.shippingstate?.type === "required"
                      ? errorRef.shippingstate?.message
                      : ""}
                  </small>
                </p>
                <input
                  className="input-filled"
                  name="shippingzip"
                  label="Zip"
                  placeholder="Zip *"
                  {...registerRef("shippingzip", {
                    required: {
                      value: shippingAdd
                        ? shippingInfo?.zip
                          ? false
                          : true
                        : false,
                      message: "Zip is Required",
                    },
                  })}
                  value={shippingInfo?.zip}
                  onChange={handleShippingChange}
                />
                <p>
                  <small style={{ color: "red" }}>
                    {errorRef.shippingzip?.type === "required"
                      ? errorRef.shippingzip?.message
                      : ""}
                    {errorRef.shippingzip?.type === "minLength"
                      ? errorRef.shippingzip?.message
                      : ""}
                    {errorRef.shippingzip?.type === "maxLength"
                      ? errorRef.shippingzip?.message
                      : ""}
                  </small>
                </p>
                <Controller
                  name="shippingphone"
                  control={control}
                  rules={{
                    required: {
                      value: shippingAdd
                        ? shippingInfo.phone
                          ? false
                          : true
                        : false,
                      message: "Phone number is Required",
                    },
                    validate: () => {
                      const cleanedPhoneNumber = billingInfo.phone.replace(
                        /\D/g,
                        ""
                      );

                      // Add '91' to the cleaned phone number
                      const formattedPhoneNumber = `+${cleanedPhoneNumber}`;
                      return isValidPhoneNumber(formattedPhoneNumber);
                    },
                  }}
                  render={({ field: { onChange, value } }) => (
                    <PhoneInput
                      enableSearch="true"
                      country={"in"}
                      inputClass={"custom-input"}
                      placeholder="Enter phone number"
                      value={shippingInfo.phone}
                      onChange={(value) => handleShippingPhone("phone", value)}
                    />
                  )}
                />
                <p>
                  <small style={{ color: "red" }}>
                    {errorRef.shippingphone?.type === "required"
                      ? errorRef.shippingphone?.message
                      : ""}
                    {errorRef.shippingphone?.type === "validate"
                      ? "Phone number is invalid"
                      : ""}
                  </small>
                </p>
                <input
                  className="input-filled"
                  type="text"
                  name="shippingemail"
                  label="Email"
                  placeholder="Email *"
                  {...registerRef("shippingemail", {
                    required: {
                      value: shippingAdd
                        ? shippingInfo?.email
                          ? false
                          : true
                        : false,
                      message: "Email is Required",
                    },
                    pattern: {
                      value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i,
                      message: "Invalid Email",
                    },
                  })}
                  value={shippingInfo?.email}
                  onChange={handleShippingChange}
                />
                <p>
                  <small style={{ color: "red" }}>
                    {errorRef.shippingemail?.type === "required"
                      ? errorRef.shippingemail?.message
                      : ""}
                    {errorRef.shippingemail?.type === "minLength"
                      ? errorRef.shippingemail?.message
                      : ""}
                    {errorRef.shippingemail?.type === "maxLength"
                      ? errorRef.shippingemail?.message
                      : ""}
                    {errorRef.shippingemail?.type === "pattern"
                      ? errorRef.shippingemail?.message
                      : ""}
                  </small>
                </p>
              </div>
            </Collapse>
          </div>

          <div className="mb-20">
            <h5>Additional information</h5>
          </div>
          <div className="form-group mb-30">
            <textarea
              rows="5"
              placeholder="Order notes"
              className="input-filled"
              type="text"
              name="order_notes"
              label="notes"
              value={billingInfo.order_notes}
              onChange={handleBillingInfo}
            ></textarea>
          </div>
        </div>
      </div>
    </>
  );
};
export default BillingDetails;
