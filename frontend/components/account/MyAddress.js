/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import {
  ADD_ADDRESSBOOK,
  DELETE_ADDRESSBOOK,
  GET_CUSTOMER_QUERY,
  UPDATE_ADDRESSBOOK,
} from "../../queries/customerquery";
import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined";
import CorporateFareOutlinedIcon from "@mui/icons-material/CorporateFareOutlined";
import ArrowBackIosNewRoundedIcon from "@mui/icons-material/ArrowBackIosNewRounded";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import PhoneInput from "react-phone-input-2";
import { Controller, useForm } from "react-hook-form";
import Select from "react-select";
import CreateOutlinedIcon from "@mui/icons-material/CreateOutlined";
import AddRoundedIcon from "@mui/icons-material/AddRounded";
import {
  handleEnter,
  handleError,
  mutation,
  query,
} from "../../utills/helpers";
import { get } from "lodash";
import { Button, Form } from "react-bootstrap";
import InputField from "../inputField";
import { isValidPhoneNumber } from "react-phone-number-input";
import notify from "../../utills/notifyToast";
import { useDispatch } from "react-redux";
import { useRouter } from "next/router";
import { Toaster } from "react-hot-toast";
import Loading from "../loading";
import { CircularProgress } from "@mui/material";

var addressFieldObject = {
  order_notes: "",
  pincode: "",
  state: "",
  city: "",
  addressLine2: "",
  addressLine1: "",
  phone: "",
  lastName: "",
  firstName: "",
  country: "",
  transaction_id: "",
  addressType: "",
  defaultAddress: false,
};

const addressTypeOptions = [
  { value: "Home", label: "Home" },
  { value: "Office", label: "Office" },
];

const MyAddress = () => {
  const [addressList, selectAddressList] = useState([]);
  const [customerId, setCustomerId] = useState();
  const [isShowAddAddress, setIsShowAddAddress] = useState(false);
  const [addressFieldInfo, setAddressFieldInfo] = useState(addressFieldObject);
  const [editAddressId, setEditAddressId] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const session = useSession();
  const dispatch = useDispatch();
  const router = useRouter();
  const customStyles = {
    option: (provided, state) => ({
      ...provided,
      backgroundColor: state.isSelected ? "#caf3fe" : "inherit",
      "&:hover": { backgroundColor: state.isSelected ? "#caf3fe" : "#d9f7ff" },
    }),
  };

  const {
    register,
    handleSubmit,
    formState: { errors },
    control,
    setError,
  } = useForm({ mode: "onSubmit" });
  const getAddress = async () => {
    try {
      const { data: customersData } = await query(GET_CUSTOMER_QUERY, {
        id: customerId,
      });
      let customer = get(customersData, "customer.data");
      let addressBook = get(customer, "addressBook", []);
      selectAddressList(addressBook);
      return customer;
    } catch (e) {
      return [];
    }
  };
  const toggleAddNewAddressForm = () => {
    setIsShowAddAddress(!isShowAddAddress);
  };

  const handlePhoneInput = (name, value) => {
    setAddressFieldInfo({ ...addressFieldInfo, [name]: value });
  };

  const handleZipCode = (e) => {
    let { name, value } = get(e, "target");
    setAddressFieldInfo({ ...addressFieldInfo, [name]: value });
  };

  const handleInputChange = (e, nm) => {
    if (nm === "addressType") {
      setAddressFieldInfo({ ...addressFieldInfo, [nm]: e?.value });
    } else {
      let { name, value } = get(e, "target");
      setAddressFieldInfo({ ...addressFieldInfo, [name]: value });
    }
  };

  const onSubmit = async (data) => {
    const addressType = get(addressFieldInfo, "addressType", "");
    if (!addressType) {
      setError("addressType", {
        type: "required",
        message: `Address Type is required.`,
      });
    } else {
      if (editAddressId) {
        await updateAddress();
      } else {
        await addNewAddress();
      }
    }
  };

  useEffect(() => {
    if (customerId) {
      getAddress();
    }
  }, [customerId]);
  useEffect(() => {
    if (session?.status === "authenticated") {
      setCustomerId(get(session, "data.user.accessToken.customer._id"));
    }
  }, [session?.status]);

  const addNewAddress = async () => {
    setIsLoading(true);
    try {
      const response = await mutation(ADD_ADDRESSBOOK, {
        id: customerId,
        ...addressFieldInfo,
      });
      setIsLoading(false);
      const success = get(response, "data.addAddressBook.success");
      const message = get(response, "data.addAddressBook.message");
      if (success) {
        getAddress();
        setAddressFieldInfo(addressFieldObject);
        notify(message, true);
        setIsShowAddAddress(false);
      } else {
        notify(message, success);
      }
    } catch (error) {
      setIsLoading(false);
      handleError(error, dispatch, router);
    }
  };

  const updateAddress = async () => {
    setIsLoading(true);
    try {
      const response = await mutation(UPDATE_ADDRESSBOOK, {
        id: customerId,
        _id: editAddressId,
        ...addressFieldInfo,
      });
      setIsLoading(false);
      const success = get(response, "data.updateAddressBook.success");
      const message = get(response, "data.updateAddressBook.message");
      if (success) {
        getAddress();
        setAddressFieldInfo(addressFieldObject);
        setEditAddressId("");
        notify(message, true);
        setIsShowAddAddress(false);
      } else {
        notify(message, success);
      }
    } catch (error) {
      setIsLoading(false);
      handleError(error, dispatch, router);
    }
  };
  const deleteAddress = (_id, index) => {
    const id = customerId;
    let variables = { id, _id };
    setIsLoading(true);
    mutation(DELETE_ADDRESSBOOK, variables)
      .then(async (response) => {
        setIsLoading(false);
        const success = get(response, "data.deleteAddressBook.success");
        const message = get(response, "data.deleteAddressBook.message");
        if (success) {
          getAddress();
          notify(message, true);
        } else {
          notify(message, success);
        }
      })
      .catch((error) => {
        setIsLoading(false);
        handleError(error, dispatch, router);
      });
  };
  return (
    <>
      {isLoading && (
        <div className="loading-wrapper">
          <CircularProgress />
        </div>
      )}
      <Toaster />
      {!isShowAddAddress ? (
        <div className="address-list">
          {addressList.length > 0 ? (
            <>
              <div className="d-flex justify-content-end">
                <button className="add-btn" onClick={toggleAddNewAddressForm}>
                  <span>
                    <AddRoundedIcon />
                  </span>{" "}
                  Add a New Address
                </button>
              </div>
              <div className="cust-detail-container">
                {addressList?.map((address, i) => (
                  <>
                    <div className={`address-card`} key={i}>
                      {/* <span className="radio-check"></span> */}
                      <div className="action-btn">
                        <Button
                          className="edit-btn"
                          variant="link"
                          onClick={() => {
                            setEditAddressId(address?._id);
                            setAddressFieldInfo(address);
                            setIsShowAddAddress(true);
                          }}
                        >
                          <CreateOutlinedIcon />
                        </Button>
                        <Button
                          className="edit-btn delete-btn"
                          variant="link"
                          onClick={() => deleteAddress(address?._id)}
                        >
                          <DeleteOutlineIcon />
                        </Button>
                      </div>
                      <div className="content">
                        <b>
                          {!get(address, "addressType") ||
                          get(address, "addressType") === "Home" ? (
                            <HomeOutlinedIcon />
                          ) : get(address, "addressType") === "Office" ? (
                            <CorporateFareOutlinedIcon />
                          ) : (
                            ""
                          )}
                          {get(address, "addressType") || "Home"}
                        </b>
                        <div className="d-flex">
                          <p>
                            {get(address, "firstName")}{" "}
                            {get(address, "lastName")}
                          </p>
                          <p>{get(address, "phone")}</p>
                        </div>
                        <p>{get(address, "addressLine1")}</p>
                        <p>{get(address, "addressLine2")}</p>
                      </div>
                    </div>
                  </>
                ))}
              </div>
            </>
          ) : (
            <div
              className="d-flex align-items-center justify-content-center"
              style={{ height: "100px" }}
            >
              <button className="add-btn" onClick={toggleAddNewAddressForm}>
                <span>
                  <AddRoundedIcon />
                </span>{" "}
                Add a New Address
              </button>
            </div>
          )}
        </div>
      ) : (
        <div className="billing-container">
          <div className="order-details-head">
            <button
              className="back-btn"
              onClick={() => toggleAddNewAddressForm()}
            >
              <ArrowBackIosNewRoundedIcon />
            </button>
            <h4>{editAddressId ? "Update Address" : "Add New Address"}</h4>
          </div>
          <div>
            <form onSubmit={handleSubmit(onSubmit)}>
              <div className="twoRows">
                <div className="col-lg-6 col-md-12 col-md-5half">
                  <InputField
                    className="input-filled"
                    name="firstName"
                    label="firstName"
                    placeholder="First name *"
                    {...register("firstName", {
                      required: {
                        value: get(addressFieldInfo, "firstName", "")
                          ? false
                          : true,
                        message: "First Name is Required",
                      },
                      minLength: {
                        value: 4,
                        message: "First Name Min length is 4",
                      },
                    })}
                    errors={errors}
                    value={get(addressFieldInfo, "firstName", "")}
                    onChange={handleInputChange}
                    onKeyDown={(e) => handleEnter(e)}
                  />
                </div>
                <div className="col-lg-6 col-md-12  ">
                  <InputField
                    className="input-filled"
                    name="lastName"
                    label="lastName"
                    placeholder="Last name *"
                    {...register("lastName", {
                      required: {
                        value: get(addressFieldInfo, "lastName", "")
                          ? false
                          : true,
                        message: "Last Name is Required",
                      },
                    })}
                    errors={errors}
                    value={get(addressFieldInfo, "lastName", "")}
                    onChange={handleInputChange}
                    error={errors.addressFieldInfo ? true : false}
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
                        value: get(addressFieldInfo, "phone") ? false : true,
                        message: "Phone number is Required",
                      },
                      validate: () => {
                        const cleanedPhoneNumber = get(
                          addressFieldInfo,
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
                        value={addressFieldInfo?.phone || ""}
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
              </div>
              <InputField
                className="input-filled"
                name="addressLine1"
                label="address"
                placeholder="Address Line 1*"
                {...register("addressLine1", {
                  required: {
                    value: addressFieldInfo.addressLine1 ? false : true,
                    message: "Address is Required",
                  },
                })}
                value={addressFieldInfo.addressLine1}
                onChange={(e) => {
                  handleInputChange(e);
                }}
                onKeyDown={(e) => handleEnter(e)}
                errors={errors}
              />
              <InputField
                className="input-filled"
                name="addressLine2"
                label="address"
                placeholder="Address Line 2"
                value={addressFieldInfo?.addressLine2}
                onChange={handleInputChange}
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
                    {...register("city", {
                      required: {
                        value: addressFieldInfo.city ? false : true,
                        message: "City is Required",
                      },
                    })}
                    value={addressFieldInfo.city}
                    onChange={handleInputChange}
                    onKeyDown={(e) => handleEnter(e)}
                    errors={errors}
                  />
                </div>
                <div className="col-lg-4 col-md-12">
                  <InputField
                    className="input-filled"
                    type="text"
                    required=""
                    name="state"
                    placeholder="State *"
                    {...register("state", {
                      required: {
                        value: addressFieldInfo.state ? false : true,
                        message: "State is Required",
                      },
                    })}
                    value={addressFieldInfo.state}
                    onChange={handleInputChange}
                    onKeyDown={(e) => handleEnter(e)}
                    errors={errors}
                  />
                </div>

                <div className="col-lg-4 col-md-12">
                  <InputField
                    className="input-filled"
                    type="text"
                    required=""
                    name="country"
                    placeholder="Country *"
                    {...register("country", {
                      required: {
                        value: addressFieldInfo.country ? false : true,
                        message: "Country is Required",
                      },
                    })}
                    value={addressFieldInfo.country}
                    onChange={handleInputChange}
                    onKeyDown={(e) => handleEnter(e)}
                    errors={errors}
                  />
                </div>
              </div>

              <div className="twoRows">
                <div className="col-lg-6 col-md-12">
                  <InputField
                    className="input-filled"
                    type="text"
                    name="pincode"
                    handleBlur={() => {
                      if (addressFieldInfo?.pincode) {
                        // checkCode(addressFieldInfo.zip);
                      }
                    }}
                    placeholder="Zip *"
                    {...register("pincode", {
                      required: {
                        value: addressFieldInfo.pincode ? false : true,
                        message: "zip is Required",
                      },
                    })}
                    value={addressFieldInfo.pincode}
                    onChange={handleZipCode}
                    onKeyDown={(e) => handleEnter(e)}
                  />
                </div>
                <div className="col-lg-6 col-md-12">
                  <Controller
                    name="addressType"
                    control={control}
                    render={({ field: { onChange } }) => (
                      <Select
                        value={addressTypeOptions?.find(
                          (addressType) =>
                            addressType?.value === addressFieldInfo?.addressType
                        )}
                        placeholder="Address Type"
                        name="blog_tag"
                        options={addressTypeOptions}
                        onChange={(e) => {
                          handleInputChange(e, "addressType");
                          onChange(e);
                        }}
                        className="custom-select"
                        styles={customStyles}
                      />
                    )}
                  />
                  <p>
                    <small style={{ color: "red" }}>
                      {errors.addressType?.type === "required"
                        ? errors.addressType?.message
                        : ""}
                      {errors.addressType?.type === "validate"
                        ? "Address Type is invalid"
                        : ""}
                    </small>
                  </p>
                </div>
                <div className="chek-form custome-checkbox">
                  <Form>
                    <Form.Check
                      className="form-check-input"
                      id="defaultAddress"
                      checked={get(addressFieldInfo, "defaultAddress")}
                      onChange={(e) =>
                        setAddressFieldInfo({
                          ...addressFieldInfo,
                          defaultAddress: get(e, "target.checked", false),
                        })
                      }
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
                <div
                  className="btn-wrapper d-flex justify-content-end"
                  style={{ width: "100%", gap: "12px" }}
                >
                  <button
                    type="button"
                    onClick={() => {
                      setIsShowAddAddress(false);
                      setEditAddressId("");
                      setAddressFieldInfo(addressFieldObject);
                    }}
                    className="btn btn-danger checkout-continue-btn"
                  >
                    CANCEL
                  </button>
                  <button
                    type="submit"
                    className="btn btn-success primary-btn-color checkout-continue-btn"
                  >
                    {editAddressId ? "Update Address" : "Add Address"}
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
};

export default MyAddress;
