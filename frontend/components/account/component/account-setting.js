
import { useState, useEffect } from "react";
import { Card, Row, Col, Button } from "react-bootstrap";
import { UPDATE_CUSTOMER, GET_CUSTOMER_QUERY } from "../../../queries/customerquery";
import { FEATURE_PRODUCT_QUERY } from "../../../queries/home"
import client from "../../../apollo-client";
import { mutation, query } from "../../../utills/helpers";
import { useRouter } from "next/router";
import { useSession } from "next-auth/react";

var accountDetailObject = {
    first_name: "",
    last_name: "",
    email: "",
    password: "",
    company: "",
    phone: "",
}
const AccountSettings = (props) => {
    const { accountDetailInfo, token, refreshData, setToggleEdit } = props;
    const session = useSession();
    // console.log("accountSession", session);
    const router = useRouter()
    // const id = accountDetailInfo.id
    const [accountDetails, setAccountDetails] = useState(accountDetailObject)


    const updateAccountDetail = (e) => {
        e.preventDefault();
        // console.log("updateAccount", accountDetails)
        // console.log("tok", token)
        mutation(UPDATE_CUSTOMER, accountDetails, token).then(async (response) => {
            console.log("response", response)

            if (response.data.updateCustomer.success) {
                const route = await response.data.updateCustomer.success
                if (route) {
                    // refreshData()
                    window.setTimeout(() => router.push("/account/profile"), 3000)
                }
            }

        })


    }

    useEffect(() => {
        setAccountDetails(accountDetailInfo)
    }, [accountDetailInfo])

    return (
        <div>
            <form className="edit-form" onSubmit={updateAccountDetail}>
                <Row>
                    <Col>
                        <label>First Name </label>
                        <input
                            type="text"
                            name="firstname"
                            label="firstname"
                            placeholder="First name *"
                            value={accountDetails.first_name || ''}
                            onChange={(e) => setAccountDetails({ ...accountDetails, first_name: e.target.value })}
                            className="update-account-details-input"
                        />
                    </Col>
                    <Col>
                        <label>Last Name </label>
                        <input
                            type="text"
                            name="lastname"
                            label="lastname"
                            placeholder="Last name *"
                            value={accountDetails.last_name || ""}
                            onChange={(e) => setAccountDetails({ ...accountDetails, last_name: e.target.value })}
                            className="update-account-details-input"
                        />
                    </Col>
                    <Col>
                        <label>Company</label>
                        <input
                            type="text"
                            name="company"
                            label="company"
                            placeholder="Company*"
                            value={accountDetails.company || ""}
                            onChange={(e) => setAccountDetails({ ...accountDetails, company: e.target.value })}
                            className="update-account-details-input"
                        />
                    </Col>
                    <Col>
                        <label>Phone</label>
                        <input
                            type="text"
                            name="phone"
                            label="phone"
                            placeholder="Phone *"
                            value={accountDetails.phone || ""}
                            onChange={(e) => setAccountDetails({ ...accountDetails, phone: e.target.value })}
                            className="update-account-details-input"
                        />
                    </Col>
                </Row>
                <Row style={{ marginTop: "25px" }}>
                    <Col>
                        <label>Email </label>
                        <input
                            type="text"
                            name="email"
                            label="email"
                            placeholder="Email *"
                            value={accountDetails.email}
                            onChange={(e) => setAccountDetails({ ...accountDetails, email: e.target.value })}
                            className="update-account-details-input"
                            disabled
                        />
                    </Col>
                    <Col>
                        <label>Password </label>
                        <input
                            type="password"
                            name="password"
                            label="password"
                            placeholder="Password *"
                            value={accountDetails.password}
                            onChange={(e) => setAccountDetails({ ...accountDetails, password: e.target.value })}
                            className="update-account-details-input"
                        />
                    </Col>
                    <Col>
                        <label>Confirnm Password </label>
                        <input
                            type="password"
                            name="confirmPassword"
                            label="confirmPassword"
                            placeholder="Confirm Password *"
                            value={accountDetails.confirmPassword || ""}
                            onChange={(e) => setAccountDetails({ ...accountDetails, password: e.target.value })}
                            className="update-account-details-input"
                        />
                    </Col>
                    <Col>
                        <label>Current Password </label>
                        <input
                            type="password"
                            name="currentpassword"
                            label="currentpassword"
                            placeholder="Current Password *"
                            value={accountDetails.currentpassword || ""}
                            onChange={(e) => setAccountDetails({ ...accountDetails, password: e.target.value })}
                            className="update-account-details-input"
                        />
                    </Col>
                </Row>
                <div className="account-details-button my-4">
                    <Button onClick={() => setToggleEdit((previous) => !previous)} type="submit" variant="outline-success" size="sm">UPDATE DETAILS</Button>{' '}
                    <Button className="ms-1" onClick={() => setToggleEdit((previous) => !previous)} variant="danger" size="sm">
                        Cancel
                    </Button>
                </div>
            </form>

        </div>
    )
}
export default AccountSettings;