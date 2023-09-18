
import { useState, useEffect } from "react";
import { Card, Row, Col, Button } from "react-bootstrap";
import { UPDATE_CUSTOMER, GET_CUSTOMER_QUERY } from "../../../queries/customerquery";
import { mutation, query } from "../../../utills/helpers";
import { useRouter } from "next/router";
import { useSession } from "next-auth/react";
import { Controller, useForm } from 'react-hook-form';
import PhoneInput from "react-phone-input-2";
import notify from '../../../utills/notifyToast';
import { isValidPhoneNumber } from "react-phone-number-input";

var accountDetailObject = {
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    company: "",
    phone: "",
}
const AccountSettings = (props) => {
    const { accountDetailInfo, token, refreshData, setToggleEdit, getcustomer
    } = props;
    const session = useSession();
    const router = useRouter()
    const [accountDetails, setAccountDetails] = useState(accountDetailObject)
    const { register, formState: { errors }, handleSubmit, control, reset } = useForm();
    const onSubmit = (data) => console.log(data);
    const updateAccountDetail = (e) => {

        // e?.preventDefault()
        mutation(UPDATE_CUSTOMER, accountDetails, token).then(async (response) => {
            if (response.data.updateCustomer.success) {
                notify(response.data.updateCustomer.message, true);
                getcustomer()
            }
        })
    }

    useEffect(() => {
        setAccountDetails(accountDetailInfo)
    }, [accountDetailInfo])
    return (
        <div>
            <form className="edit-form" onSubmit={handleSubmit(updateAccountDetail)}>
                <Row>
                    <Col>
                        <label className="textlabel">First Name </label>
                        <input
                            type="text"
                            name="firstname"
                            label="firstname"
                            placeholder="First name *"
                            value={accountDetails?.firstName || ''}
                            {...register('firstname', {

                                required: {
                                    value: (accountDetails?.firstName ? false : true),
                                    message: "First name is required",
                                },
                            })}
                            onChange={(e) => setAccountDetails({ ...accountDetails, firstName: e.target.value })}
                            className="update-profile-detail-input"
                        />
                        <p className='error'>
                            <small style={{ color: 'red' }}>
                                {errors.firstname?.type === "required" ? errors.firstname?.message : undefined}
                            </small>
                        </p>

                    </Col>
                    <Col>
                        <label className="textlabel">Last Name </label>
                        <input
                            type="text"
                            name="lastname"
                            label="lastname"
                            placeholder="Last name *"
                            value={accountDetails?.lastName || ""}
                            {...register('lastname', {

                                required: {
                                    value: (accountDetails?.lastName ? false : true),
                                    message: "Last name is required",
                                },

                            })}
                            onChange={(e) => setAccountDetails({ ...accountDetails, lastName: e.target.value })}
                            className="update-profile-detail-input"
                        />
                        <p className='error'>
                            <small style={{ color: 'red' }}>
                                {errors.lastname?.type === "required" ? errors.lastname?.message : undefined}
                            </small>
                        </p>
                    </Col>
                    <Col>
                        <label className="textlabel">Company</label>
                        <input
                            type="text"
                            name="company"
                            label="company"
                            placeholder="Company*"
                            value={accountDetails?.company || ""}
                            {...register('company', {

                                required: {
                                    value: (accountDetails?.company ? false : true),
                                    message: "company is required",
                                },
                            })}
                            onChange={(e) => setAccountDetails({ ...accountDetails, company: e.target.value })}
                            className="update-profile-detail-input"
                        />
                        <p className='error'>
                            <small style={{ color: 'red' }}>
                                {errors.company?.type === "required" ? errors.company?.message : undefined}
                            </small>
                        </p>
                    </Col>
                    <Col >
                        <label className="textlabel">Phone</label>
                        <input
                            type="number"

                            name="phone"
                            label="phone"
                            placeholder="Phone *"
                            value={accountDetails?.phone || ""}
                            {...register('phone', {

                                required: {
                                    value: (accountDetails?.phone ? false : true),
                                    message: "Phone is required",
                                },
                            })}
                            onChange={(e) => setAccountDetails({ ...accountDetails, phone: e.target.value })}
                            className="update-profile-detail-input"
                        />
                        <p>
                            <small style={{ color: 'red' }}>
                                {errors.phone?.type === "required" ? errors.phone?.message : undefined}
                                {errors.phone?.type === "validate" ? "Phone number is invalid" : undefined}
                            </small>
                        </p>
                    </Col>
                </Row>
                <Row style={{ marginTop: "25px" }}>
                    <Col>
                        <label className="textlabel">Email </label>
                        <input
                            type="text"
                            name="email"
                            label="email"
                            placeholder="Email *"
                            value={accountDetails?.email}
                            {...register('email', {

                                required: {
                                    value: (accountDetails?.email ? false : true),
                                    message: "Email is required",
                                },
                            })}
                            onChange={(e) => setAccountDetails({ ...accountDetails, email: e.target.value })}
                            className="update-profile-detail-input"
                            disabled
                        />
                        <p className='error'>
                            <small style={{ color: 'red' }}>
                                {errors.email?.type === "required" ? errors.email?.message : undefined}
                            </small>
                        </p>
                    </Col>
                    <Col>
                        <label className="textlabel">Password </label>
                        <input
                            type="password"
                            name="password"
                            label="password"
                            placeholder="Password *"
                            value={accountDetails?.password}
                            {...register('password', {

                                required: {
                                    value: (accountDetails?.password ? false : true),
                                    message: "Password  is required",
                                },
                            })}
                            onChange={(e) => setAccountDetails({ ...accountDetails, password: e.target.value })}
                            className="update-profile-detail-input"
                        />
                        <p className='error'>
                            <small style={{ color: 'red' }}>
                                {errors.password?.type === "required" ? errors.password?.message : undefined}
                            </small>
                        </p>
                    </Col>
                    <Col>
                        <label className="textlabel">Confirm Password </label>
                        <input
                            type="password"
                            name="confirmPassword"
                            label="confirmPassword"
                            placeholder="Confirm Password *"
                            value={accountDetails?.confirmPassword || ""}
                            {...register('confirmPassword', {

                                required: {
                                    value: (accountDetails?.confirmPassword ? false : true),
                                    message: "Confirm password  is required",
                                },
                            })}
                            onChange={(e) => setAccountDetails({ ...accountDetails, confirmPassword: e.target.value })}
                            className="update-profile-detail-input"
                        />
                        <p className='error'>
                            <small style={{ color: 'red' }}>
                                {errors.confirmPassword?.type === "required" ? errors.confirmPassword?.message : undefined}
                            </small>
                        </p>
                    </Col>
                    <Col>
                        <label className="textlabel">Current Password </label>
                        <input
                            type="password"
                            name="currentpassword"
                            label="currentpassword"
                            placeholder="Current Password *"
                            value={accountDetails?.currentpassword || ""}
                            {...register('currentpassword', {

                                required: {
                                    value: (accountDetails?.currentpassword ? false : true),
                                    message: "Current password is required",
                                },
                            })}
                            onChange={(e) => setAccountDetails({ ...accountDetails, currentpassword: e.target.value })}
                            className="update-profile-detail-input"
                        />
                        <p className='error'>
                            <small style={{ color: 'red' }}>
                                {errors.currentpassword?.type === "required" ? errors.currentpassword?.message : undefined}
                            </small>
                        </p>
                    </Col>
                </Row>
                <div className="account-details-button my-4">
                    <Button type="submit" variant="outline-success" size="sm">UPDATE DETAILS</Button>{' '}
                    <Button className="ms-1" onClick={() => setToggleEdit((previous) => !previous)} variant="danger" size="sm">
                        Cancel
                    </Button>
                </div>
            </form>

        </div >
    )
}
export default AccountSettings;