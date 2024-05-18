/* eslint-disable react/no-unknown-property */
/* eslint-disable no-unused-vars */
/* eslint-disable no-unsafe-optional-chaining */
/* eslint-disable react/prop-types */
import { ADD_ADDRESSBOOK, UPDATE_ADDRESSBOOK, DELETE_ADDRESSBOOK } from "../../../queries/customerquery";
import { Fragment, useEffect, useState } from "react";
import { Card, Button, Row, Col, Collapse, Form, Fade, Tooltip, OverlayTrigger } from "react-bootstrap";
import { handleError, logoutAndClearData, mutation } from "../../../utills/helpers";
import { useRouter } from "next/router";
import { capitalize, get } from 'lodash';
import { useDispatch } from "react-redux";
import {  useForm } from 'react-hook-form';
import notify from "../../../utills/notifyToast";
import { useTheme } from "../../themeContext";
const Star = ({ starId, marked }) => {
    return (
        <span
            star-id={starId}
            role="button"
            style={{ color: "#ff9933", cursor: "pointer", fontSize: 25, m: 0 }}
        >
            {marked ? "\u2605" : "\u2606"}
        </span>
    );
};
const addressObject = {
    id: "",
    _id: "",
    firstName: "",
    lastName: "",
    company: "",
    phone: "",
    addressLine1: "",
    addressLine2: "",
    state: "",
    city: "",
    defaultAddress: false,
}

const AddressDetail = (props) => {
    let { addressDetail, token, refreshData, getcustomer, } = props;
    const { theme } = useTheme()?.theme;
    const router = useRouter();
    const [addMode, setAddMode] = useState(false);
    const [editMode, setEditMode] = useState(false);
    const [address, setAddress] = useState(addressObject)
    const [allAddressBook, setAllAddressBook] = useState([])
    const dispatch=useDispatch()
    useEffect(() => {
        if (addressDetail?.id) {
            addressObject.id = addressDetail?.id
            setAddress({ ...address, id: addressDetail?.id })
        }
    }, [])
    useEffect(() => {
        if (addressDetail?.id) {
            addressObject.id = addressDetail?.id
            setAddress({ ...address, id: addressDetail?.id })
        }
    }, [addMode, editMode])
    useEffect(() => {
        if (addressDetail?.addressBook && addressDetail?.addressBook?.length > 0) {
            setAllAddressBook(addressDetail?.addressBook)
        }
        else {
            setAllAddressBook(allAddressBook)
        }

    }, [addressDetail])
    const addAddress = () => {
        setAddress(addressObject)
        setAddMode(true);
        setEditMode(false);
        reset()
    };

    const editAddress = (adress) => {
        setEditMode(true);
        setAddMode(false);
        setAddress(adress);
        reset()
    };


    const updateAddress = async (e) => {
        const {firstName,lastName,addressLine1,city,company,country,state,phone}=address
        if (firstName &&lastName &&addressLine1 &&city &&company &&country &&state &&phone) {
            mutation(UPDATE_ADDRESSBOOK, address).then(async (response) => {
                const success=get(response,'data.updateAddressBook.success')
                const message=get(response,'data.updateAddressBook.message')
                if (success) {
                    getcustomer()
                    setEditMode(false);
                    setAddress(addressObject)
                    notify(message, true);
                }
            }
            ).catch((error)=>{
                handleError(error,dispatch,router)
            })
        }
    };
    const addNewAddress = async () => {  
        const {firstName,lastName,addressLine1,city,company,country,state,phone}=address
        if (firstName &&lastName &&addressLine1 &&city &&company &&country &&state &&phone) {
            mutation(ADD_ADDRESSBOOK, address).then(async (response) => {
                const success=get(response,'data.addAddressBook.success')
                const message=get(response,'data.addAddressBook.message')
                if (success) {
                    setAddMode(false);
                    setEditMode(false);
                    getcustomer()
                    setAddress(addressObject)
                    notify(message, true);
                }
            }).catch((error)=>{
                handleError(error,dispatch,router)
            })
        }
    };
    const {
        register,
        handleSubmit, reset, clearErrors,
        formState: { errors }, control
    } = useForm({ mode: editMode ? updateAddress : addNewAddress, });
    const cancelAddress = () => {
        setEditMode(false);
        setAddMode(false);
        setAddress(addressObject)
        reset()
    };
    const deleteAddressBook = (_id, index) => {
        if (addressDetail && addressDetail?.id) {
            addressObject.id = addressDetail?.id
            setAddress({ ...address, id: addressDetail?.id })
        }
        const id = address.id;
        let variables = { id, _id }
        mutation(DELETE_ADDRESSBOOK, variables).then(async (response) => {
            if (response?.data?.deleteAddressBook?.success) {
                refreshData()
                await router.push("/account/profile")
                let list = [...allAddressBook]
                list.splice(index, 1)
                setAllAddressBook(list)
            }
        }).catch((error)=>{
            handleError(error,dispatch,router)
        })
    };

    return (
        <Fragment>
            <form onSubmit={handleSubmit(editMode ? updateAddress : addNewAddress)}>
                <Collapse in={editMode || addMode ? true : false}>
                    <Card>
                        <Card.Body>
                            <Card.Title>{`${editMode ? "Edit" : "Add"} Adress`}</Card.Title>
                            <hr />
                            <Row>
                                <Col className="input-grid">
                                    <input
                                        type="text"
                                        name="firstname"
                                        label="firstname"
                                        placeholder="First name *"
                                        value={address?.firstName || ""}

                                        className="update-account-details-input"

                                        {...register('firstname', {

                                            required: {
                                                value: (address?.firstName ? false : true),
                                                message: "First name is required",
                                            },
                                        })}
                                        onChange={(e) => setAddress({ ...address, firstName: e.target.value })}
                                    />
                                    <p>
                                        <small style={{ color: 'red' }}>
                                            {errors.firstname?.type === "required" ? errors?.firstname?.message : undefined}
                                        </small>
                                    </p>
                                </Col>
                                <Col className="input-grid">
                                    <input
                                        type="text"
                                        name="lastname"
                                        label="lastname"
                                        placeholder="Last name *"
                                        value={address?.lastName}

                                        className="update-account-details-input"
                                        {...register('lastname', {

                                            required: {
                                                value: (address?.lastName ? false : true),
                                                message: "Last name is required",
                                            },

                                        })}
                                        onChange={(e) => setAddress({ ...address, lastName: e.target.value })}
                                    />
                                    <p>
                                        <small style={{ color: 'red' }}>
                                            {errors?.lastname?.type === "required" ? errors?.lastname?.message : undefined}
                                        </small>
                                    </p>
                                </Col>
                                <Col className="input-grid">
                                    <input
                                        type="text"
                                        name="company"
                                        label="company"
                                        placeholder="Company*"
                                        value={address?.company}
                                        className="update-account-details-input"
                                        {...register('company', {

                                            required: {
                                                value: (address?.company ? false : true),
                                                message: "company is required",
                                            },
                                        })}
                                        onChange={(e) => setAddress({ ...address, company: e.target.value })}

                                    />

                                    <p>
                                        <small style={{ color: 'red' }}>
                                            {errors.company?.type === "required" ? errors?.company?.message : undefined}
                                        </small>
                                    </p>
                                </Col>
                                <Col className="input-grid">
                                    <input
                                        type="text"
                                        name="phone"
                                        label="phone"
                                        placeholder="Phone *"
                                        value={address?.phone}
                                        {...register('phone', {

                                            required: {
                                                value: (address.phone ? false : true),
                                                message: "phone number is required",
                                            },
                                        })}
                                        onChange={(e) => setAddress({ ...address, phone: e.target.value })}

                                        className="update-account-details-input"
                                    />
                                    <p>
                                        <small style={{ color: 'red' }}>
                                            {errors.phone?.type === "required" ? errors?.phone?.message : undefined}
                                        </small>
                                    </p>
                                </Col>
                            </Row>
                            <Row>
                                <Col className="input-grid">
                                    <input
                                        type="text"
                                        name="address"
                                        label="address"
                                        placeholder="Address *"
                                        value={address?.addressLine1}
                                        {...register('addressLine1', {

                                            required: {
                                                value: (address?.addressLine1 ? false : true),
                                                message: "Address is required",
                                            },
                                        })}
                                        onChange={(e) => setAddress({ ...address, addressLine1: e.target.value })}

                                        className="update-account-details-input"
                                    />
                                    <p>
                                        <small style={{ color: 'red' }}>
                                            {errors.addressLine1?.type === "required" ? errors.addressLine1?.message : undefined}
                                        </small>
                                    </p>
                                </Col >
                            </Row>
                            <Row>
                                <Col className="input-grid">
                                    <input
                                        type="text"
                                        name="address"
                                        label="address"
                                        placeholder="Address *"
                                        value={address?.addressLine2}
                                        onChange={(e) => setAddress({ ...address, addressLine2: e.target.value })}

                                        className="update-account-details-input"
                                    />
                                </Col>
                            </Row>
                            <Row>
                                <Col className="input-grid">
                                    <input
                                        type="text"
                                        name="city"
                                        label="city"
                                        placeholder="City *"
                                        value={address?.city}
                                        {...register('city', {

                                            required: {
                                                value: (address?.city ? false : true),
                                                message: "City is required",
                                            },
                                        })}
                                        onChange={(e) => setAddress({ ...address, city: e.target.value })}

                                        className="update-account-details-input"
                                    />
                                    <p>
                                        <small style={{ color: 'red' }}>
                                            {errors.city?.type === "required" ? errors.city?.message : undefined}
                                        </small>
                                    </p>
                                </Col>
                                <Col className="input-grid">
                                    <input
                                        type="text"
                                        name="country"
                                        label="country"
                                        placeholder="Country *"
                                        value={address?.country}
                                        {...register('country', {

                                            required: {
                                                value: (address?.country ? false : true),
                                                message: "Country is required",
                                            },
                                        })}
                                        onChange={(e) => setAddress({ ...address, country: e.target.value })}

                                        className="update-account-details-input"
                                    />
                                    <p>
                                        <small style={{ color: 'red' }}>
                                            {errors.country?.type === "required" ? errors.country?.message : undefined}
                                        </small>
                                    </p>
                                </Col>
                                <Col className="input-grid">
                                    <input
                                        type="text"
                                        name="state"
                                        label="state"
                                        placeholder="State *"
                                        value={address?.state}
                                        {...register('state', {

                                            required: {
                                                value: (address.state ? false : true),
                                                message: "State is required",
                                            },
                                        })}
                                        onChange={(e) => setAddress({ ...address, state: e.target.value })}

                                        className="update-account-details-input"
                                    />
                                    <p>
                                        <small style={{ color: 'red' }}>
                                            {errors.state?.type === "required" ? errors.state?.message : undefined}
                                        </small>
                                    </p>
                                </Col>
                                <Col className="input-grid">
                                    <input
                                        type="text"
                                        name="pincode"
                                        label="pincode"
                                        placeholder="PinCode *"
                                        value={address?.pincode || ""}
                                        {...register('pincode', {

                                            required: {
                                                value: (address?.pincode ? false : true),
                                                message: "Pincode is required",
                                            },
                                        })}
                                        onChange={(e) => setAddress({ ...address, pincode: e.target.value })}
                                        className="update-account-details-input"
                                    />
                                    <p>
                                        <small style={{ color: 'red' }}>
                                            {errors.pincode?.type === "required" ? errors.pincode?.message : undefined}
                                        </small>
                                    </p>
                                </Col>
                            </Row>
                            <Row>
                                <Form.Check
                                    type="checkbox"
                                    name="checkedB"
                                    value={address?.defaultAddress}
                                    onChange={(e) => setAddress({ ...address, defaultAddress: e.target.checked })}
                                    label="Make it Default Address"
                                />
                            </Row>
                        </Card.Body>
                        <Card.Link>

                            <Button
                                type='submit'
                                size="small"
                                color="primary"
                                variant="contained"
                            >
                                {editMode ? "Update" : "Add"}
                            </Button>
                            <Button
                                size="small"
                                onClick={cancelAddress}
                                variant="contained"
                            >
                                Cancel
                            </Button>
                        </Card.Link>
                    </Card>

                </Collapse>
            </form>
            <Fade in={!addMode} className={editMode ? "margin-top-2" : ""}>
                <Button
                    size="small"
                    color={get(theme,'palette.primary.main')}
                    onClick={addAddress}
                    variant="contained"
                >
                    Add New Address
                </Button>
            </Fade>
            <div className="address-details-container">
                {addressDetail && addressDetail?.addressBook && allAddressBook?.map((addressBook, index) => (
                    <Card key={index}>
                        <Card.Body>
                            <Row className="address-card-row">

                                <Col style={{ fontWeight: 700 }}><i className="fas fa-user"></i>  {capitalize(addressBook?.firstName)}</Col>

                                <Col style={{ float: 'right', marginRight: "-400px" }}>
                                    <OverlayTrigger
                                        overlay={
                                            <Tooltip
                                                className="default-address"
                                                aria-label="Default-Address"
                                            >Default Address</Tooltip>
                                        }><Star marked={addressBook.defaultAddress ? 1 : 0} /></OverlayTrigger>
                                </Col>
                            </Row>
                            <Card.Text>
                                <div style={{ margin: "10px", padding: "10px" }}><i className="fas fa-home"></i>{capitalize(addressBook?.city)}</div>
                                <div style={{ margin: "10px", padding: "10px" }}><i className="fas fa-phone-alt"></i>{capitalize(addressBook?.phone)}</div>
                                <div style={{ margin: "10px", padding: "10px" }}><i className="fas fa-envelope"></i>{capitalize(addressBook?.pincode)}</div>
                                <div style={{ margin: "10px", padding: "10px" }}><i className="far fa-building"></i>{capitalize(addressBook?.company)}</div>
                            </Card.Text>
                            <Button
                                className="me-2"
                                variant="outline-dark"
                                size="sm"
                                onClick={() => editAddress(addressBook)}
                            >
                                EDIT
                            </Button>
                            <Button
                                variant="danger"
                                size="sm"
                                onClick={() => deleteAddressBook(addressBook?._id, index)}
                            >
                                DELETE
                            </Button>
                        </Card.Body>
                    </Card>



                ))}
            </div>
            {/* </> */}
            {/* ))} */}
            {/* ):(<h1>please add address</h1>)} */}


        </Fragment >
    )
}
export default AddressDetail;