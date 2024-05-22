import React, { useEffect, useState } from 'react'
import { useSession } from "next-auth/react";
import { GET_CUSTOMER_QUERY } from '../../queries/customerquery';
import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined";
import CorporateFareOutlinedIcon from "@mui/icons-material/CorporateFareOutlined";
import ArrowBackIosNewRoundedIcon from '@mui/icons-material/ArrowBackIosNewRounded';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import PhoneInput from 'react-phone-input-2';
import { Controller, useForm } from 'react-hook-form';
import Select from "react-select";
import CreateOutlinedIcon from "@mui/icons-material/CreateOutlined";
import AddRoundedIcon from "@mui/icons-material/AddRounded";
import { handleEnter, query } from '../../utills/helpers';
import { get } from 'lodash';
import { Button } from 'react-bootstrap';
import InputField from '../inputField';
import { isValidPhoneNumber } from 'react-phone-number-input';
import { emailErrorMessage } from '../validationMessages';
import { validateEmail } from '../../utills/Validation';

var addressFieldObject = {
    order_notes: "",
    zip: "",
    state: "",
    city: "",
    addressLine2: "",
    address: "",
    phone: "",
    email: "",
    lastname: "",
    firstname: "",
    country: "",
    paymentMethod: "",
    transaction_id: "",
    addressType: "",
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
    const session = useSession();
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

    // const checkCode = async (code) => {
    //     try {
    //       let variable = { zipcode: code.toString() };
    //       const { data: result } = await queryWithoutToken(CHECK_ZIPCODE, variable);
    //       setZipMessage({
    //         ...ZipMessage,
    //         shipping:shippingAdd,
    //         zipMessage: get(result, "checkZipcode.message"),
    //         zipSuccess: get(result, "checkZipcode.success"),
    //       });
    //     } catch (e) {}
    //   };

    const toggleAddNewAddressForm = () => {
        setIsShowAddAddress(!isShowAddAddress)
    }

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

    const onSubmit = () => {
        setIsShowAddAddress(false)
        // if (ZipMessage && ZipMessage?.zipSuccess) {
        //     let isAddressAlready = get(billingDetails, "billing.id") ? true : false;
        //     if (!isAddressAlready) {
        //     addNewAddress();
        //     } else {
        //     setIsAddNewAddressForm(false);
        //     nextFormStep();
        //     }
        // }
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

    console.log(addressList)

    return (
        <>
            {
                !isShowAddAddress ?
                <div className='address-list'>
                    {
                        addressList.length > 0 ?
                        <>
                            <div className='d-flex justify-content-end'>
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
                                    <div
                                    className={`address-card`}
                                    key={i}
                                    >
                                    {/* <span className="radio-check"></span> */}
                                    <div className='action-btn'>
                                        <Button className="edit-btn" variant="link" onClick={toggleAddNewAddressForm}>
                                            <CreateOutlinedIcon />
                                        </Button>
                                        <Button className="edit-btn delete-btn" variant="link">
                                            <DeleteOutlineIcon />
                                        </Button>
                                    </div>
                                    <div className="content">
                                        <b>
                                        {!get(address, "addressType") ||
                                        get(address, "addressType") === "Home" ? (
                                            <HomeOutlinedIcon />
                                        ) : get(address, "addressType") ===
                                            "Office" ? (
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
                        :
                        <div className='d-flex align-items-center justify-content-center' style={{height: '100px'}}>
                            <button className="add-btn" onClick={toggleAddNewAddressForm}>
                                <span>
                                    <AddRoundedIcon />
                                </span>{" "}
                                Add a New Address
                            </button>
                        </div>
                    }
                </div>
                :
                <div className="billing-container">
                    <div className="order-details-head">
                        <button className="back-btn" onClick={()=> toggleAddNewAddressForm()}><ArrowBackIosNewRoundedIcon/></button>
                        <h4>Add New Address</h4>
                    </div>
                    <div>
                        <form onSubmit={handleSubmit(onSubmit)}>
                            <div className="twoRows">
                                <div className="col-lg-6 col-md-12 col-md-5half">
                                <InputField
                                    className="input-filled"
                                    name="firstname"
                                    label="firstname"
                                    placeholder="First name *"
                                    {...register("firstname", {
                                    required: {
                                        value: addressFieldInfo.firstname ? false : true,
                                        message: "First Name is Required",
                                    },
                                    minLength: {
                                        value: 4,
                                        message: "First Name Min length is 4",
                                    },
                                    })}
                                    errors={errors}
                                    value={addressFieldInfo.firstname}
                                    onChange={handleInputChange}
                                    onKeyDown={(e) => handleEnter(e)}
                                />
                                </div>
                                <div className="col-lg-6 col-md-12  ">
                                <InputField
                                    className="input-filled"
                                    name="lastname"
                                    label="lastname"
                                    placeholder="Last name *"
                                    {...register("lastname", {
                                    required: {
                                        value: addressFieldInfo.lastname ? false : true,
                                        message: "Last Name is Required",
                                    },
                                    })}
                                    errors={errors}
                                    value={addressFieldInfo.lastname}
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
                                <div className="col-lg-6 col-md-12">
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
                                </div>
                            </div>
                            <InputField
                                className="input-filled"
                                name="address"
                                label="address"
                                placeholder="Address Line 1*"
                                {...register("address", {
                                required: {
                                    value: addressFieldInfo.address ? false : true,
                                    message: "Address is Required",
                                },
                                })}
                                value={addressFieldInfo.address}
                                onChange={(e) => {
                                handleInputChange(e);
                                }}
                                onKeyDown={(e) => handleEnter(e)}
                                errors={errors}
                            />
                            <InputField
                                errors={errors}
                                className="input-filled"
                                name="addressLine2"
                                label="address"
                                placeholder="Address Line 2"
                                {...register("addressLine2", {
                                required: {
                                    value: addressFieldInfo.addressLine2 ? false : true,
                                    message: "Address is Required",
                                },
                                })}
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
                                    name="zip"
                                    handleBlur={() => {
                                    if (addressFieldInfo?.zip) {
                                        // checkCode(addressFieldInfo.zip);
                                    }
                                    }}
                                    placeholder="Zip *"
                                    {...register("zip", {
                                    required: {
                                        value: addressFieldInfo.zip ? false : true,
                                        message: "zip is Required",
                                    },
                                    })}
                                    value={addressFieldInfo.zip}
                                    onChange={handleZipCode}
                                    onKeyDown={(e) => handleEnter(e)}
                                />
                                {/* <p>
                                    <small
                                        style={{ color: ZipMessage.zipSuccess ? "#4BB543" : "red" }}
                                    >
                                        {ZipMessage.zipMessage}
                                    </small>
                                </p> */}
                                {/* {!ZipMessage.zipMessage && (
                                    <ErrorMessage message={getErrorMessage(errors, "zip")} />
                                )} */}
                                </div>
                                <div className="col-lg-6 col-md-12">
                                <Controller
                                    name="addressType"
                                    control={control}
                                    rules={{
                                    required: "Address Type is Required",
                                    }}
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
                                <div className='btn-wrapper d-flex justify-content-end' style={{width: '100%', gap: '12px'}}>
                                    <button
                                        type="button"
                                        onClick={() => setIsShowAddAddress(false)}
                                        className="btn btn-danger checkout-continue-btn"
                                    >
                                        CANCEL
                                    </button>
                                    <button
                                        type="submit"
                                        className="btn btn-success primary-btn-color checkout-continue-btn"
                                    >
                                        ADD ADDRESS
                                    </button>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            }

        </>
    )
}

export default MyAddress