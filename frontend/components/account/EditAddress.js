import React, { useState } from 'react'
import InputField from '../inputField'
import { Controller, useForm } from 'react-hook-form';
import { handleEnter } from '../../utills/helpers';
import { get } from 'lodash';
import ArrowBackIosNewRoundedIcon from '@mui/icons-material/ArrowBackIosNewRounded';
import { emailErrorMessage, passwordErrorMessage } from '../validationMessages';
import { validateEmail } from '../../utills/Validation';
import { isValidPhoneNumber } from 'react-phone-number-input';
import PhoneInput from 'react-phone-input-2';
import PasswordField from '../passwordField';

var addressFieldObject = {
    fullName: '',
    email: '',
    mobileNumber: '',
  };

function EditAddress() {
    const [addressFieldInfo, setAddressFieldInfo] = useState(addressFieldObject);
    const [showChangePassword, setShowChangePassword] = useState(false);
    const [password, setPassword] = useState();
    const [confirmPassowrd, setConfirmPassowrd] = useState();
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

      const onSubmit = () => {
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

    const handleChange = () => {
        
      };

    return (
        <div className='edit-address-container'>
            <div className="billing-container cart-main-container">
                {
                    !showChangePassword ?
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
                                        value: get(addressFieldInfo, "mobileNumber") ? false : true,
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
                                        onChange={(value) => handlePhoneInput("mobileNumber", value)}
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
                            <div className='btn-wrapper d-flex justify-content-end' style={{gap: '12px'}}>
                                <button className="card-btons text-align-center outline" onClick={()=> setShowChangePassword(true)}>
                                    <span className="text-align-center">Change Password</span>
                                </button>
                                <button className="card-btons text-align-center primary-btn-color" type='submit'>
                                    <span className="text-align-center">Save Changes</span>
                                </button>
                            </div>
                        </form>
                    </div>
                    :
                    <div>
                        <div className="order-details-head">
                            <button className="back-btn" onClick={()=> setShowChangePassword(false)}><ArrowBackIosNewRoundedIcon/></button>
                            <h4>Change Password</h4>
                        </div>
                        <form onSubmit={handleSubmit(onSubmit)}>
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
                            <PasswordField
                            type="password"
                            className="form-control login-top-space"
                            id="password"
                            placeholder="Confirm Password"
                            value={confirmPassowrd}
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
                            <div className='btn-wrapper d-flex justify-content-end' style={{width: '100%', gap: '12px'}}>
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
                }
            </div>
            
        </div>
    )
}

export default EditAddress