import { useState, useEffect } from "react";
import Collapse from 'react-bootstrap/Collapse';
import Form from 'react-bootstrap/Form';
import { handleEnter } from "../../utills/helpers";

const BillingDetails = (props) => {
    const { getBillingInfo, registerRef, errorRef, billingInfo, shippingAddressToggle, handleShippingChange, shippingAdd, shippingInfo, setShippingInfo, setBillingInfo, handleBillingInfo } = props;

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

                  <div className="twoRows" >
                    <div className="col-lg-6 col-md-12 col-md-5half">
                    <input
                        className="input-filled"
                        name="firstname"
                        label="firstname"
                        placeholder="First name *"
                        {...registerRef('firstname', {
                            required: {
                                value: true,
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
                        <small style={{ color: 'red' }}>
                            {errorRef.firstname?.type === "required" ? errorRef.firstname?.message : undefined}
                            {errorRef.firstname?.type === "minLength" ? errorRef.firstname?.message : undefined}
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
                                value: true,
                                message: "Last Name is Required",
                            },
                        })}
                        value={billingInfo.lastname}
                        onChange={handleBillingInfo}
                        error={errorRef.billingInfo ? true : false}
                        onKeyDown={(e) => handleEnter(e)}
                    />
                    <p>
                        <small style={{ color: 'red' }}>
                            {errorRef.lastname?.type === "required" ? errorRef.lastname?.message : undefined}
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
                                value: true,
                                message: "Company Name is Required",
                            },
                        })}
                        value={billingInfo.company}
                        onChange={handleBillingInfo}
                        onKeyDown={(e) => handleEnter(e)}
                    />
                    <p>
                        <small style={{ color: 'red' }}>
                            {errorRef.company?.type === "required" ? errorRef.company?.message : undefined}
                        </small>
                    </p>
                </div>
                <div className="col-lg-6 col-md-12">
                    <input
                        className="input-filled"
                        name="address"
                        label="address"
                        placeholder="address *"
                        {...registerRef("address", {
                            required: {
                                value: true,
                                message: "Address is Required",
                            }
                        })}
                        value={billingInfo.address}
                        onChange={handleBillingInfo}
                        onKeyDown={(e) => handleEnter(e)}
                    />
                    <p>
                        <small style={{ color: 'red' }}>
                            {errorRef.address?.type === "required" ? errorRef.address?.message : undefined}
                        </small>
                    </p>
                    </div>
            </div>
                <div className="twoRows">
                    <div className="col-lg-4 col-md-12">
                    <input className="input-filled"
                        type="text"
                        required=""
                        name="city"
                        placeholder="city / Town *"
                        {...registerRef("city", {
                            required: {
                                value: true,
                                message: "City is Required",
                            },
                        })}
                        value={billingInfo.city}
                        onChange={handleBillingInfo}
                        onKeyDown={(e) => handleEnter(e)}

                    />
                    <p>
                        <small style={{ color: 'red' }}>
                            {errorRef.city?.type === "required" ? errorRef.city?.message : undefined}
                        </small>
                    </p>
                    </div>
                    <div className="col-lg-4 col-md-12">
                    <input className="input-filled"
                        type="text"
                        required=""
                        name="state"
                        placeholder="state *"
                        {...registerRef("state", {
                            required: {
                                value: true,
                                message: "State is Required",
                            }
                        })}
                        value={billingInfo.state}
                        onChange={handleBillingInfo}
                        onKeyDown={(e) => handleEnter(e)}
                    />
                    <p>
                        <small style={{ color: 'red' }}>
                            {errorRef.state?.type === "required" ? errorRef.state?.message : undefined}
                        </small>
                    </p>
                    </div>

                    <div className="col-lg-4 col-md-12">
                    <input className="input-filled"
                        type="text"
                        required=""
                        name="country"
                        placeholder="country *"
                        {...registerRef("country", {
                            required: {
                                value: true,
                                message: "country is Required",
                            }
                        })}
                        value={billingInfo.country}
                        onChange={handleBillingInfo}
                        onKeyDown={(e) => handleEnter(e)}
                    />
                    <p>
                        <small style={{ color: 'red' }}>
                            {errorRef.country?.type === "required" ? errorRef.country?.message : undefined}
                        </small>
                    </p>
                    </div>
                </div>

            <div className="twoRows" >
                <div className="col-lg-6 col-md-12">
                    <input className="input-filled"
                        type="text"
                        required=""
                        label="zip"
                        name="zip"
                        placeholder="zip *"
                        {...registerRef("zip", {
                            required: {
                                value: true,
                                message: "zip is Required",
                            },
                            minLength: {
                                value: 6,
                                message: "zip Min length is 6",
                            },
                            maxLength: {
                                value: 6,
                                message: "zip Max length is 6",
                            },
                        })}
                        value={billingInfo.zip}
                        onChange={handleBillingInfo}
                        onKeyDown={(e) => handleEnter(e)}
                    />
                    <p>
                        <small style={{ color: 'red' }}>
                            {errorRef.zip?.type === "required" ? errorRef.zip?.message : undefined}
                            {errorRef.zip?.type === "minLength" ? errorRef.zip?.message : undefined}
                            {errorRef.zip?.type === "maxLength" ? errorRef.zip?.message : undefined}
                        </small>
                    </p>
                </div>
                  <div className="col-lg-6 col-md-12">
                    <input className="input-filled"
                        type="text"
                        required=""
                        name="phone"
                        label="phone"
                        placeholder="phone *"
                        {...registerRef("phone", {
                            required: {
                                value: true,
                                message: "Phone is Required",
                            },
                            minLength: {
                                value: 10,
                                message: "Phone Min length is 10",
                            },
                            maxLength: {
                                value: 10,
                                message: "Phone Max length is 10",
                            },
                            pattern: {
                                value: /^\(?([0-9]{3})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{4})$/,
                                message: "Invalid Phone Number",
                            },
                        })}
                        value={billingInfo.phone}
                        onChange={handleBillingInfo}
                        onKeyDown={(e) => handleEnter(e)}
                    />
                    <p>
                        <small style={{ color: 'red' }}>
                            {errorRef.phone?.type === "required" ? errorRef.phone?.message : undefined}
                            {errorRef.phone?.type === "minLength" ? errorRef.phone?.message : undefined}
                            {errorRef.phone?.type === "maxLength" ? errorRef.phone?.message : undefined}
                            {errorRef.phone?.type === "pattern" ? errorRef.phone?.message : undefined}
                        </small>
                    </p>
                </div>
            </div>
                    <input className="input-filled"
                        type="text"
                        required=""
                        name="email"
                        label="email"
                        placeholder="email *"
                        {...registerRef("email", {
                            required: {
                                value: true,
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
                        <small style={{ color: 'red' }}>
                            {errorRef.email?.type === "required" ? errorRef.email?.message : undefined}
                            {errorRef.email?.type === "minLength" ? errorRef.email?.message : undefined}
                            {errorRef.email?.type === "maxLength" ? errorRef.email?.message : undefined}
                            {errorRef.email?.type === "pattern" ? errorRef.email?.message : undefined}
                        </small>
                    </p>

                    <div className="form-group">
                        <div className="checkbox">
                            <div className="custome-checkbox">
                                <input className="form-check-input-create-account" type="checkbox" name="checkbox" id="createaccount" />
                                <label className="form-check-label label_info"
                                    data-target="#collapsePassword" aria-controls="collapsePassword"
                                ><span>Create an account?</span></label>
                            </div>
                        </div>
                    </div>

                    <div className="ship_detail">
                        <div className="form-group">
                            <div className="chek-form">
                                <Form>
                                    <Form.Check className="form-check-input" name="checkbox" id="differentaddress"
                                        checked={shippingAdd}
                                        onChange={(e) => shippingAddressToggle(e)} />
                                </Form>
                                <label className="form-check-label label_info" data-bs-toggle="collapse" aria-controls="collapseAddress" >
                                    <span>Ship to a different address?</span>
                                </label>
                            </div>
                        </div>
                        <Collapse in={shippingAdd}>
                            <div id="collapseAddress" className="different_address collapse in">
                                <input
                                    className="input-filled"
                                    name="shippingfirstname"
                                    label="firstname"
                                    placeholder="First name *"
                                    {...registerRef("shippingfirstname", {
                                        requred: {
                                            value: true,
                                            message: "firstname is Required",
                                        },
                                        minLength: {
                                            value: 4,
                                            message: "First Name Min length is 4",
                                        },
                                    })}
                                    value={shippingInfo.shippingfirstname}
                                    onChange={handleShippingChange}
                                    onKeyDown={(e) => handleEnter(e)}
                                />
                                <p>
                                    <small style={{ color: 'red' }}>
                                        {errorRef.shippingfirstname?.type === "required" ? errorRef.shippingfirstname?.message : undefined}
                                    </small>
                                </p>
                                <input
                                    className="input-filled"
                                    name="shippinglastname"
                                    label="lastname"
                                    placeholder="Last name *"
                                    {...registerRef("shippinglastname", {
                                        requred: {
                                            value: true,
                                            message: "Address is Required",
                                        }
                                    })}
                                    value={shippingInfo.shippinglastname}
                                    onChange={handleShippingChange}
                                    onKeyDown={(e) => handleEnter(e)}
                                />
                                <p>
                                    <small style={{ color: 'red' }}>
                                        {errorRef.shippinglastname?.type === "required" ? errorRef.shippinglastname?.message : undefined}
                                    </small>
                                </p>
                                <input
                                    className="input-filled"
                                    name="shippingcompany"
                                    label="company"
                                    placeholder="Company name *"
                                    {...registerRef("shippingcompany", {
                                        requred: {
                                            value: true,
                                            message: "Address is Required",
                                        }
                                    })}
                                    value={shippingInfo.shippingcompany}
                                    onChange={handleShippingChange}
                                    onKeyDown={(e) => handleEnter(e)}
                                />
                                <p>
                                    <small style={{ color: 'red' }}>
                                        {errorRef.shippingcompany?.type === "required" ? errorRef.shippingcompany?.message : undefined}
                                    </small>
                                </p>
                                <input
                                    className="input-filled"
                                    name="shippingaddress"
                                    label="address_line_1"
                                    placeholder="address_line_1 *"
                                    {...registerRef("shippingaddress", {
                                        requred: {
                                            value: true,
                                            message: "Address is Required",
                                        }
                                    })}
                                    value={shippingInfo.shippingaddress}
                                    onChange={handleShippingChange}
                                    onKeyDown={(e) => handleEnter(e)}
                                />
                                <p>
                                    <small style={{ color: 'red' }}>
                                        {errorRef.shippingaddress?.type === "required" ? errorRef.shippingaddress?.message : undefined}
                                    </small>
                                </p>
                                <input className="input-filled"
                                    type="text"
                                    name="shippingaddress_line2"
                                    label="address_line_2"
                                    placeholder="address_line_2 *"
                                    {...registerRef("shippingaddress_line2", {
                                        requred: {
                                            value: true,
                                            message: "Address is Required",
                                        }
                                    })}
                                    value={shippingInfo.shippingaddress_line2}
                                    onChange={handleShippingChange}
                                    onKeyDown={(e) => handleEnter(e)}
                                />
                                <p>
                                    <small style={{ color: 'red' }}>
                                        {errorRef.shippingaddress_line2?.type === "required" ? errorRef.shippingaddress_line2?.message : undefined}
                                    </small>
                                </p>
                                <input
                                    className="input-filled"
                                    type="text"
                                    name="shippingcity"
                                    label="city"
                                    placeholder="city / Town *"
                                    {...registerRef("shippingcity", {
                                        requred: {
                                            value: true,
                                            message: "Address is Required",
                                        }
                                    })}
                                    value={shippingInfo.shippingcity}
                                    onChange={handleShippingChange}
                                    onKeyDown={(e) => handleEnter(e)}
                                />
                                <p>
                                    <small style={{ color: 'red' }}>
                                        {errorRef.shippingcity?.type === "required" ? errorRef.shippingcity?.message : undefined}
                                    </small>
                                </p>
                                <input className="input-filled"
                                    type="text"
                                    name="shippingstate"
                                    label="state"
                                    placeholder="state *"
                                    {...registerRef("shippingstate", {
                                        requred: {
                                            value: true,
                                            message: "Address is Required",
                                        }
                                    })}
                                    value={shippingInfo.shippingstate}
                                    onChange={handleShippingChange}
                                />
                                <p>
                                    <small style={{ color: 'red' }}>
                                        {errorRef.shippingstate?.type === "required" ? errorRef.shippingstate?.message : undefined}
                                    </small>
                                </p>
                                <input
                                    className="input-filled"
                                    name="shippingzip"
                                    label="zip"
                                    placeholder="zip *"
                                    {...registerRef("shippingzip", {
                                        requred: {
                                            value: true,
                                            message: "Address is Required",
                                        },
                                        minLength: {
                                            value: 6,
                                            message: "zip Min length is 6",
                                        },
                                        maxLength: {
                                            value: 6,
                                            message: "zip Max length is 6",
                                        },
                                    })}
                                    value={shippingInfo.shippingzip}
                                    onChange={handleShippingChange} />
                                <p>
                                    <small style={{ color: 'red' }}>
                                        {errorRef.shippingzip?.type === "required" ? errorRef.shippingzip?.message : undefined}
                                        {errorRef.shippingzip?.type === "minLength" ? errorRef.shippingzip?.message : undefined}
                                        {errorRef.shippingzip?.type === "maxLength" ? errorRef.shippingzip?.message : undefined}
                                    </small>
                                </p>
                                <input className="input-filled"
                                    type="text"
                                    name="shippingphone"
                                    label="phone"
                                    placeholder="phone *"
                                    {...registerRef("shippingphone", {
                                        requred: {
                                            value: true,
                                            message: "Address is Required",
                                        }
                                    })}
                                    value={shippingInfo.shippingphone}
                                    onChange={handleShippingChange} />
                                <p>
                                    <small style={{ color: 'red' }}>
                                        {errorRef.shippingphone?.type === "required" ? errorRef.shippingphone?.message : undefined}
                                        {errorRef.shippingphone?.type === "minLength" ? errorRef.shippingphone?.message : undefined}
                                        {errorRef.shippingphone?.type === "maxLength" ? errorRef.shippingphone?.message : undefined}
                                        {errorRef.shippingphone?.type === "pattern" ? errorRef.shippingphone?.message : undefined}
                                    </small>
                                </p>
                                <input className="input-filled"
                                    type="text"
                                    name="shippingemail"
                                    label="email"
                                    placeholder="email *"
                                    {...registerRef("shippingemail", {
                                        requred: {
                                            value: true,
                                            message: "Address is Required",
                                        },
                                        pattern: {
                                            value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i,
                                            message: "Invalid Email",
                                        },
                                    })}
                                    value={shippingInfo.shippingemail}
                                    onChange={handleShippingChange} />
                                <p>
                                    <small style={{ color: 'red' }}>
                                        {errorRef.shippingemail?.type === "required" ? errorRef.shippingemail?.message : undefined}
                                        {errorRef.shippingemail?.type === "minLength" ? errorRef.shippingemail?.message : undefined}
                                        {errorRef.shippingemail?.type === "maxLength" ? errorRef.shippingemail?.message : undefined}
                                        {errorRef.shippingemail?.type === "pattern" ? errorRef.shippingemail?.message : undefined}
                                    </small>
                                </p>
                            </div>
                        </Collapse>
                    </div>

                    <div className="mb-20">
                        <h5>Additional information</h5>
                    </div>
                    <div className="form-group mb-30">
                        <textarea rows="5"
                            placeholder="Order notes"
                            className="input-filled"
                            type="text"
                            name="order_notes"
                            label="notes"
                            value={billingInfo.order_notes}
                            onChange={handleBillingInfo}
                        ></textarea>
                    </div>
                    {/* <button type="submit" className="btn btn-success" style={{ marginTop: 12, backgroundColor: "#088178" }}>add</button> */}
                    {/* </form> */}

                </div >
            </div>
        </>

    )
}
export default BillingDetails;