import { ADD_ADDRESSBOOK, UPDATE_ADDRESSBOOK, DELETE_ADDRESSBOOK } from "../../../queries/customerquery";
import client from "../../../apollo-client";
import { Fragment, useEffect, useState } from "react";
import { Card, Button, Row, Col, Collapse, Form, Fade, Tooltip, OverlayTrigger } from "react-bootstrap";
import { mutation, query } from "../../../utills/helpers";
import { useRouter } from "next/router";

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
    first_name: "",
    last_name: "",
    company: "",
    phone: "",
    address_line1: "",
    address_line2: "",
    state: "",
    city: "",
    default_address: false,
}

const AddressDetail = (props) => {
    let { addressDetail, token, refreshData } = props;
    const router = useRouter();
    // console.log("AddressDetail", addressDetail)
    const [addMode, setAddMode] = useState(false);
    const [editMode, setEditMode] = useState(false);
    const [address, setAddress] = useState(addressObject)
    const [allAddressBook, setAllAddressBook] = useState([])
    // console.log("allAddressBook", allAddressBook)
    // let addressBookMode = addressDetail.address_book


    useEffect(() => {
        if (addressDetail.id) {
            addressObject.id = addressDetail.id
            setAddress({ ...address, id: addressDetail.id })
            // console.log("address", addressDetail)
            // setAllAddressBook(addressDetail.address_book)
        }
    }, [])
    useEffect(() => {
        if (addressDetail.id) {
            addressObject.id = addressDetail.id
            setAddress({ ...address, id: addressDetail.id })
            // console.log("address", addressDetail)
            // setAllAddressBook(addressDetail.address_book)
        }
    }, [addMode, editMode])

    useEffect(() => {
        if (addressDetail.address_book && addressDetail.address_book?.length > 0) {
            setAllAddressBook(addressDetail.address_book)
        }
        else {
            setAllAddressBook(allAddressBook)
        }

    }, [addressDetail])
    const addAddress = () => {
        setAddMode(true);
        setEditMode(false);
    };

    const editAddress = (adress) => {
        // console.log("", adress);
        setEditMode(true);
        setAddMode(false);
        setAddress(adress);
    };

    const updateAddress = async (e) => {
        setEditMode(false);
        // console.log("updateadd", address)
        // console.log("updateaddtoken", token)

        mutation(UPDATE_ADDRESSBOOK, address, token).then(async (response) => {
            // console.log("response", response)
            if (response.data.updateAddressBook.success) {
                // getcustomer();
                // console.log("update adress")
                // await refreshData()
                const route = await response.data.updateAddressBook.success
                if (route) {
                    // await router.push("/account/profile")
                    await refreshData()
                }
            }
        }
        )
    };
    const addNewAddress = async () => {
        setAddMode(false);
        setEditMode(false);
        // console.log("addNewAddress", address)
        // addAddressinApi(address);

        mutation(ADD_ADDRESSBOOK, address, token).then(async (response) => {
            // console.log("response", response);
            if (response.data.addAddressBook.success) {

                // await refreshData()
                // await router.push("/account/profile")
                const route = await response.data.addAddressBook.success
                if (route) {
                    // router.push("/account/profile")
                    refreshData()
                }

            }
        })

    };
    const cancelAddress = () => {
        setEditMode(false);
        setAddMode(false);
        setAddress(addressObject)
    };
    const deleteAddressBook = (_id, index) => {
        if (addressDetail && addressDetail.id) {
            addressObject.id = addressDetail.id
            setAddress({ ...address, id: addressDetail.id })
            // console.log("address", addressDetail)
            // setAllAddressBook(addressDetail.address_book)
        }

        const id = address.id;
        let variables = { id, _id }
        mutation(DELETE_ADDRESSBOOK, variables, token).then(async (response) => {
            // console.log("Delete Response", response)
            if (response.data.deleteAddressBook.success) {
                refreshData()

                await router.push("/account/profile")
                // await router.push("/account/mywishlist")

                let list = [...allAddressBook]
                list.splice(index, 1)
                setAllAddressBook(list)
                // getcustomer()
            }
        })
    };

    return (
        <Fragment>
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
                                    value={address.first_name || ""}
                                    onChange={(e) => setAddress({ ...address, first_name: e.target.value })}
                                    className="update-account-details-input"
                                />
                            </Col>
                            <Col className="input-grid">
                                <input
                                    type="text"
                                    name="lastname"
                                    label="lastname"
                                    placeholder="Last name *"
                                    value={address.last_name}
                                    onChange={(e) => setAddress({ ...address, last_name: e.target.value })}
                                    className="update-account-details-input"
                                />
                            </Col>
                            <Col className="input-grid">
                                <input
                                    type="text"
                                    name="company"
                                    label="company"
                                    placeholder="Company*"
                                    value={address.company}
                                    onChange={(e) => setAddress({ ...address, company: e.target.value })}

                                    className="update-account-details-input"
                                />
                            </Col>
                            <Col className="input-grid">
                                <input
                                    type="text"
                                    name="phone"
                                    label="phone"
                                    placeholder="Phone *"
                                    value={address.phone}
                                    onChange={(e) => setAddress({ ...address, phone: e.target.value })}

                                    className="update-account-details-input"
                                />
                            </Col>
                        </Row>
                        <Row>
                            <Col className="input-grid">
                                <input
                                    type="text"
                                    name="address"
                                    label="address"
                                    placeholder="Address *"
                                    value={address.address_line1}
                                    onChange={(e) => setAddress({ ...address, address_line1: e.target.value })}

                                    className="update-account-details-input"
                                />
                            </Col >
                        </Row>
                        <Row>
                            <Col className="input-grid">
                                <input
                                    type="text"
                                    name="address"
                                    label="address"
                                    placeholder="Address *"
                                    value={address.address_line2}
                                    onChange={(e) => setAddress({ ...address, address_line2: e.target.value })}

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
                                    value={address.city}
                                    onChange={(e) => setAddress({ ...address, city: e.target.value })}

                                    className="update-account-details-input"
                                />
                            </Col>
                            <Col className="input-grid">
                                <input
                                    type="text"
                                    name="country"
                                    label="country"
                                    placeholder="Country *"
                                    value={address.country}
                                    onChange={(e) => setAddress({ ...address, country: e.target.value })}

                                    className="update-account-details-input"
                                />
                            </Col>
                            <Col className="input-grid">
                                <input
                                    type="text"
                                    name="state"
                                    label="state"
                                    placeholder="State *"
                                    value={address.state}
                                    onChange={(e) => setAddress({ ...address, state: e.target.value })}

                                    className="update-account-details-input"
                                />
                            </Col>
                            <Col className="input-grid">
                                <input
                                    type="text"
                                    name="pincode"
                                    label="pincode"
                                    placeholder="PinCode *"
                                    value={address.pincode || ""}
                                    onChange={(e) => setAddress({ ...address, pincode: e.target.value })}

                                    className="update-account-details-input"
                                />
                            </Col>
                        </Row>
                        <Row>
                            <Form.Check
                                type="checkbox"
                                name="checkedB"
                                value={address.default_address}
                                onChange={(e) => setAddress({ ...address, default_address: e.target.checked })}
                                label="Make it Default Address"
                            />
                        </Row>
                    </Card.Body>
                    <Card.Link>
                        <Button
                            size="small"
                            color="primary"
                            onClick={editMode ? updateAddress : addNewAddress}
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
            <Fade in={!addMode} className={editMode ? "margin-top-2" : ""}>
                <Button
                    size="small"
                    color="#088178"
                    onClick={addAddress}
                    variant="contained"
                >
                    Add New Address
                </Button>
            </Fade>
            {/* {addressDetail.customers?.length > 0 && addressDetail.customers ? ( */}
            {/* {addressDetail.map(customer => ( */}
            {/* <> */}
            <div className="address-details-container">
                {addressDetail && addressDetail.address_book && allAddressBook.map((addressBook, index) => (
                    <Card key={index}>
                        <Card.Body>
                            <Row className="address-card-row">
                                <Col><i className="fas fa-user">{addressBook.first_name}</i></Col>
                                <Col style={{ float: 'right', marginRight: "-400px" }}>
                                    <OverlayTrigger
                                        overlay={
                                            <Tooltip
                                                className="default-address"
                                                aria-label="Default-Address"
                                            >Default Address</Tooltip>
                                        }><Star marked={addressBook.default_address ? 1 : 0} /></OverlayTrigger>
                                </Col>
                            </Row>
                            <Card.Text>
                                <div style={{ margin: "10px", padding: "10px" }}><i className="fas fa-home"></i>{addressBook.city}</div>
                                <div style={{ margin: "10px", padding: "10px" }}><i className="fas fa-phone-alt"></i>{addressBook.phone}</div>
                                <div style={{ margin: "10px", padding: "10px" }}><i className="fas fa-envelope"></i>{addressBook.pincode}</div>
                                <div style={{ margin: "10px", padding: "10px" }}><i className="far fa-building"></i>{addressBook.company}</div>
                            </Card.Text>
                            <Button
                                size="small"
                                color="primary"
                                onClick={() => editAddress(addressBook)}
                            >
                                EDIT
                            </Button>
                            <Button
                                size="small"
                                color="primary"
                                onClick={() => deleteAddressBook(addressBook._id, index)}
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


        </Fragment>
    )
}
export default AddressDetail;