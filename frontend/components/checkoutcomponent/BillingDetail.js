/* eslint-disable no-constant-condition */
/* eslint-disable no-unused-vars */
/* eslint-disable react/no-unknown-property */
/* eslint-disable react/prop-types */
import { useState, useEffect, useRef } from "react";
import Collapse from "react-bootstrap/Collapse";
import Form from "react-bootstrap/Form";
import { Controller } from "react-hook-form";
import Select from "react-select";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/bootstrap.css";
import { isValidPhoneNumber } from "react-phone-number-input";
import { handleEnter } from "../../utills/helpers";
import InputField from "../inputField";
import { get } from "lodash";
import ErrorMessage from "../errorMessage";
import { emailErrorMessage } from "../validationMessages";
import { validateEmail } from "../../utills/Validation";

const BillingDetails = (props) => {
  const {
    handleShippingPhone,
    control,
    getBillingInfo,
    registerRef,
    errorRef,
    billingInfo,
    handleZipCode,
    checkCode,
    ZipMessage,
    shippingAddressToggle,
    handleShippingChange,
    shippingAdd,
    shippingInfo,
    handlePhoneInput,
    handleBillingInfo,
    setZipMessage,
    isAddNewAddressForm,
    addressList,
    isEditAddress
  } = props;
  const addressTypeOptions = [
    { value: "Home", label: "Home" },
    { value: "Office", label: "Office" },
  ];
  const customStyles = {
    option: (provided, state) => ({
      ...provided,
      backgroundColor: state.isSelected ? "#caf3fe" : "inherit",
      "&:hover": { backgroundColor: state.isSelected ? "#caf3fe" : "#d9f7ff" },
    }),
  };
  useEffect(() => {
    let billingData = billingInfo;
    let shippingData = shippingInfo;
    billingData = {
      ...billingData,
      addressType: billingInfo?.addressType,
    };
    shippingData = {
      ...shippingData,
      addressType: shippingData?.addressType,
    };

    var allData = {
      billing: billingData,
      shipping: shippingData,
      // shippingAddress: shippingAdd,
    };
    getBillingInfo(allData);
  }, [shippingInfo, billingInfo, shippingAdd]);
  const getErrorMessage = (errorRef, name) => {
    return errorRef[name]?.message || "";
  };
  return (
    <>
      <div className="billing-container">
        <div>
          {isAddNewAddressForm || addressList?.length === 0||isEditAddress ? (
            <>
              <div className="twoRows">
                <div className="col-lg-6 col-md-12 col-md-5half">
                  <InputField
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
                    errors={errorRef}
                    value={billingInfo.firstname}
                    onChange={handleBillingInfo}
                    onKeyDown={(e) => handleEnter(e)}
                  />
                </div>
                <div className="col-lg-6 col-md-12  ">
                  <InputField
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
                    errors={errorRef}
                    value={billingInfo.lastname}
                    onChange={handleBillingInfo}
                    error={errorRef.billingInfo ? true : false}
                    onKeyDown={(e) => handleEnter(e)}
                  />
                </div>
              </div>
              <div className="twoRows">
                <div className="col-lg-6 col-md-12">
                  <Controller
                    name="phone"
                    control={control}
                    rules={{
                      required: {
                        value: get(billingInfo, "phone") ? false : true,
                        message: "Phone number is Required",
                      },
                      validate: () => {
                        const cleanedPhoneNumber = get(
                          billingInfo,
                          "phone",
                          ""
                        )?.replace(/\D/g, "");

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
                        value={billingInfo?.phone || ""}
                        onChange={(value) => handlePhoneInput("phone", value)}
                      />
                    )}
                  />
                  <p>
                    <small style={{ color: "red" }}>
                      {errorRef?.phone?.type === "required"
                        ? errorRef.phone?.message
                        : ""}
                      {errorRef?.phone?.type === "validate"
                        ? "Phone number is invalid"
                        : ""}
                    </small>
                  </p>
                </div>
                <div className="col-lg-6 col-md-12">
                  <InputField
                    className="input-filled"
                    type="text"
                    required=""
                    name="email"
                    label="Email"
                    placeholder="email *"
                    registerRef={registerRef("email", {
                      required: {
                        value: !get(billingInfo, "email"),
                        message: emailErrorMessage,
                      },
                      validate: () => {
                        return validateEmail(get(billingInfo, "email"));
                      },
                    })}
                    errors={errorRef}
                    value={billingInfo.email}
                    onChange={(e) => {
                      handleBillingInfo(e);
                    }}
                    onKeyDown={(e) => handleEnter(e)}
                  />
                </div>
              </div>
              <InputField
                className="input-filled"
                name="address"
                label="address"
                placeholder="Address Line 1*"
                {...registerRef("address", {
                  required: {
                    value: billingInfo.address ? false : true,
                    message: "Address is Required",
                  },
                })}
                value={billingInfo.address}
                onChange={(e) => {
                  handleBillingInfo(e);
                }}
                onKeyDown={(e) => handleEnter(e)}
                errors={errorRef}
              />
              <InputField
                className="input-filled"
                name="addressLine2"
                label="address"
                style={{marginBottom: '12px'}}
                placeholder="Address Line 2"
                value={billingInfo?.addressLine2}
                onChange={(e) => {
                  handleBillingInfo(e);
                }}
                onKeyDown={(e) => handleEnter(e)}
              />
              <div className="twoRows">
                <div className="col-lg-4 col-md-12">
                  <InputField
                    className="input-filled"
                    type="text"
                    required=""
                    name="city"
                    placeholder="City / Town *"
                    {...registerRef("city", {
                      required: {
                        value: billingInfo.city ? false : true,
                        message: "City is Required",
                      },
                    })}
                    value={billingInfo.city}
                    onChange={(e) => {
                      handleBillingInfo(e);
                    }}
                    onKeyDown={(e) => handleEnter(e)}
                    errors={errorRef}
                  />
                </div>
                <div className="col-lg-4 col-md-12">
                  <InputField
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
                    onChange={(e) => handleBillingInfo(e)}
                    onKeyDown={(e) => handleEnter(e)}
                    errors={errorRef}
                  />
                </div>

                <div className="col-lg-4 col-md-12">
                  <InputField
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
                    onChange={(e) => {
                      handleBillingInfo(e);
                    }}
                    onKeyDown={(e) => handleEnter(e)}
                    errors={errorRef}
                  />
                </div>
              </div>

              <div className="twoRows">
                <div className="col-lg-6 col-md-12">
                  <InputField
                    className="input-filled"
                    type="text"
                    name="zip"
                    handleBlur={(e) => {
                      if (!shippingAdd && billingInfo?.zip) {
                        checkCode(billingInfo.zip);
                      } else {
                        if (!shippingAdd) {
                          setZipMessage({
                            ...ZipMessage,
                            zipMessage: "",
                            zipSuccess: false,
                          });
                        }
                      }
                    }}
                    placeholder="Zip *"
                    {...registerRef("zip", {
                      required: {
                        value: billingInfo.zip ? false : true,
                        message: "Zip is Required",
                      },
                    })}
                    value={billingInfo.zip}
                    onChange={handleZipCode}
                    onKeyDown={(e) => handleEnter(e)}
                  />

                  {!shippingAdd && billingInfo?.zip && (
                    <p>
                      <small
                        style={{
                          color: ZipMessage.zipSuccess ? "#4BB543" : "red",
                        }}
                      >
                        {ZipMessage.zipMessage}
                      </small>
                    </p>
                  )}
                  {!shippingAdd && !ZipMessage.zipMessage && (
                    <ErrorMessage message={getErrorMessage(errorRef, "zip")} />
                  )}
                  {shippingAdd && (
                    <ErrorMessage message={getErrorMessage(errorRef, "zip")} />
                  )}
                </div>
                <div className="col-lg-6 col-md-12">
                  <Controller
                    name="addressType"
                    control={control}
                    render={({ field: { onChange, value, ref } }) => (
                      <Select
                        value={addressTypeOptions?.find(
                          (addressType) =>
                            addressType?.value === billingInfo?.addressType
                        )||''}
                        placeholder="Address Type"
                        name="addressType"
                        options={addressTypeOptions}
                        onChange={(e) => {
                          handleBillingInfo(e, "addressType");
                          onChange(e);
                        }}
                        className="custom-select"
                        styles={customStyles}
                      />
                    )}
                  />
                  <p>
                    <small style={{ color: "red" }}>
                      {errorRef.addressType?.type === "required"
                        ? errorRef.addressType?.message
                        : ""}
                    </small>
                  </p>
                </div>
                <div className="form-group">
              <div className="chek-form custome-checkbox">
                <Form>
                  <Form.Check
                    className="form-check-input"
                    id="defaultAddress"
                    checked={get(billingInfo,'defaultAddress')}
                    onChange={(e) =>
                    handleBillingInfo(e,'defaultAddress')}
                  />
                </Form>
                <label
                  className="form-check-label label_info"
                  data-bs-toggle="collapse"
                  aria-controls="collapseAddress"
                >
                  <span>Make It Default Address</span>
                </label>
              </div>
            </div>
              </div>
            </>
          ) : null}
          <div className="ship_detail">
            <div className="form-group">
              <div className="chek-form custome-checkbox">
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
                <div className="twoRows">
                  <div className="col-lg-6 col-md-12 col-md-5half">
                    <InputField
                      className="input-filled"
                      name="firstname"
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
                    <ErrorMessage
                      message={getErrorMessage(errorRef, "shippingfirstname")}
                    />
                  </div>
                  <div className="col-lg-6 col-md-12  ">
                    <InputField
                      className="input-filled"
                      name="lastname"
                      label="lastname"
                      placeholder="Last name *"
                      {...registerRef("shippinglastname", {
                        required: {
                          value: shippingAdd
                            ? shippingInfo.lastname
                              ? false
                              : true
                            : false,
                          message: "Last Name is Required",
                        },
                      })}
                      value={shippingInfo.lastname}
                      onChange={handleShippingChange}
                      onKeyDown={(e) => handleEnter(e)}
                    />
                    <ErrorMessage
                      message={getErrorMessage(errorRef, "shippinglastname")}
                    />
                  </div>
                </div>
                <div className="twoRows">
                  <div className="col-lg-6 col-md-12">
                    <Controller
                      name="shippingPhone"
                      control={control}
                      rules={{
                        required: {
                          value: shippingAdd
                            ? get(shippingInfo, "phone")
                              ? false
                              : true
                            : false,
                          message: "Phone number is Required",
                        },
                        validate: () => {
                          const cleanedPhoneNumber = get(
                            shippingInfo,
                            "phone",
                            ""
                          )?.replace(/\D/g, "");

                          // Add '91' to the cleaned phone number
                          const formattedPhoneNumber = `+${cleanedPhoneNumber}`;
                          return shippingAdd
                            ? isValidPhoneNumber(formattedPhoneNumber)
                            : true;
                        },
                      }}
                      render={({ field: { onChange, value } }) => (
                        <PhoneInput
                          enableSearch="true"
                          country={"us"}
                          inputClass={"custom-input"}
                          placeholder="Enter phone number"
                          value={shippingInfo.phone}
                          onChange={(value) =>
                            handleShippingPhone("phone", value)
                          }
                        />
                      )}
                    />
                    <ErrorMessage
                      message={getErrorMessage(errorRef, "shippingPhone")}
                    />
                    {errorRef?.shippingPhone?.type === "validate" ? (
                      <ErrorMessage message="Phone number is invalid" />
                    ) : (
                      ""
                    )}
                  </div>
                  <div className="col-lg-6 col-md-12">
                    <InputField
                      className="input-filled"
                      type="text"
                      required=""
                      name="email"
                      label="Email"
                      placeholder="email *"
                      registerRef={registerRef("shippingemail", {
                        required: {
                          value: !get(shippingInfo, "email"),
                          message: emailErrorMessage,
                        },
                        validate: () => {
                          return validateEmail(get(shippingInfo, "email"));
                        },
                      })}
                      value={shippingInfo?.email}
                      onChange={handleShippingChange}
                      onKeyDown={(e) => handleEnter(e)}
                    />
                    <ErrorMessage
                      message={getErrorMessage(errorRef, "shippingemail")}
                    />
                  </div>
                </div>
                <InputField
                  className="input-filled"
                  name="address"
                  label="address"
                  placeholder="Address Line 1*"
                  {...registerRef("shippingaddress", {
                    required: {
                      value: shippingAdd
                        ? shippingInfo.address
                          ? false
                          : true
                        : false,
                      message: "Address is Required",
                    },
                  })}
                  value={shippingInfo.address}
                  onChange={handleShippingChange}
                  onKeyDown={(e) => handleEnter(e)}
                />
                <ErrorMessage
                  message={getErrorMessage(errorRef, "shippingaddress")}
                />
                <InputField
                  className="input-filled"
                  name="addressLine2"
                  label="addressLine2"
                  // style={{marginBottom: '12px'}}
                  placeholder="Address Line 2"
                  value={get(shippingInfo, "addressLine2")}
                  onChange={handleShippingChange}
                  onKeyDown={(e) => handleEnter(e)}
                />
                <ErrorMessage
                  message={getErrorMessage(errorRef, "shippingaddressLine2")}
                />
                <div className="twoRows">
                  <div className="col-lg-4 col-md-12">
                    <InputField
                      className="input-filled"
                      type="text"
                      required=""
                      name="city"
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
                      value={shippingInfo.city}
                      onChange={handleShippingChange}
                      onKeyDown={(e) => handleEnter(e)}
                    />
                    <ErrorMessage
                      message={getErrorMessage(errorRef, "shippingcity")}
                    />
                  </div>
                  <div className="col-lg-4 col-md-12">
                    <InputField
                      className="input-filled"
                      type="text"
                      required=""
                      name="state"
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
                      value={shippingInfo.state}
                      onChange={handleShippingChange}
                      onKeyDown={(e) => handleEnter(e)}
                    />
                    <ErrorMessage
                      message={getErrorMessage(errorRef, "shippingstate")}
                    />
                  </div>

                  <div className="col-lg-4 col-md-12">
                    <InputField
                      className="input-filled"
                      type="text"
                      required=""
                      name="country"
                      placeholder="Country *"
                      {...registerRef("shippingcountry", {
                        required: {
                          value: shippingAdd
                            ? shippingInfo?.country
                              ? false
                              : true
                            : false,
                          message: "Country is Required",
                        },
                      })}
                      value={shippingInfo.country}
                      onChange={handleShippingChange}
                      onKeyDown={(e) => handleEnter(e)}
                    />
                    <ErrorMessage
                      message={getErrorMessage(errorRef, "shippingcountry")}
                    />
                  </div>
                </div>
                <div className="twoRows">
                  <div className="col-lg-6 col-md-12">
                    <InputField
                      className="input-filled"
                      type="text"
                      required=""
                      label="zip"
                      name="zip"
                      placeholder="Zip *"
                      handleBlur={(e) => {
                        if (shippingInfo?.zip) {
                          checkCode(shippingInfo?.zip);
                        } else {
                          setZipMessage({
                            ...ZipMessage,
                            zipMessage: "",
                            zipSuccess: false,
                          });
                        }
                      }}
                      {...registerRef("shippingzip", {
                        required: {
                          value: shippingAdd
                            ? shippingInfo?.zip
                              ? false
                              : true
                            : false,
                          message: "zip is Required",
                        },
                      })}
                      value={shippingInfo.zip}
                      onChange={handleShippingChange}
                      onKeyDown={(e) => handleEnter(e)}
                    />
                    {shippingInfo.zip ? (
                      <p>
                        <small
                          style={{
                            color: ZipMessage.zipSuccess ? "#4BB543" : "red",
                          }}
                        >
                          {ZipMessage.zipMessage}
                        </small>
                      </p>
                    ) : (
                      <ErrorMessage
                        message={getErrorMessage(errorRef, "shippingzip")}
                      />
                    )}
                  </div>
                  <div className="col-lg-6 col-md-12">
                    <Controller
                      name="shippingAddressType"
                      control={control}
                      render={({ field: { onChange, value, ref } }) => (
                        <Select
                          value={addressTypeOptions?.find(
                            (addressType) =>
                              addressType?.value === shippingInfo?.addressType
                          )||''}
                          placeholder="Address Type"
                          name="addressType"
                          options={addressTypeOptions}
                          onChange={(e) => {
                            handleShippingChange(e, "addressType");
                            onChange(e);
                          }}
                          className="custom-select"
                          styles={customStyles}
                        />
                      )}
                    />
                    <ErrorMessage
                      message={getErrorMessage(errorRef, "shippingAddressType")}
                    />
                  </div>
                </div>
              </div>
            </Collapse>
          </div>
        </div>
      </div>
    </>
  );
};
export default BillingDetails;
