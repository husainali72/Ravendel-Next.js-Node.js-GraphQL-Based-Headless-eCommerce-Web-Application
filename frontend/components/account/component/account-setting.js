import { useState, useEffect } from "react";
import { Row, Col, Button } from "react-bootstrap";
import { UPDATE_CUSTOMER } from "../../../queries/customerquery";
import { handleError, mutation } from "../../../utills/helpers";
import { useForm } from "react-hook-form";
import notify from "../../../utills/notifyToast";
import { useDispatch } from "react-redux";
import PropTypes from 'prop-types';
import InputField from "../../inputField";
import { emailErrorMessage, firstNameErrorMessage, lastNameErrorMessage, passwordErrorMessage } from "../../validationMessages";
import PhoneInputField from "../../phoneInput";
import { confirmPasswordValidation, passwordValidation, validateEmail } from "../../../utills/Validation";
import PasswordField from "../../passwordField";
import { get } from "lodash";
import { useRouter } from "next/router";
var accountDetailObject = {
  firstName: "",
  lastName: "",
  email: "",
  password: "",
  company: "",
  phone: "",
};
const AccountSettings = ({accountDetailInfo, setToggleEdit, getcustomer }) => {
  const dispatch=useDispatch()
  const router=useRouter()
  const [accountDetails, setAccountDetails] = useState(accountDetailObject);
  const {
    register,
    formState: { errors },
    handleSubmit,control
  } = useForm();
  const updateAccountDetail = () => {
    mutation(UPDATE_CUSTOMER, accountDetails).then(
      async (response) => {
        const {success,message}=get(response,'data.updateCustomer')
        if (success) {
          notify(message, true);
          getcustomer();
        }
      }
    ).catch((error)=>{
      handleError(error,dispatch,router)
    })
  };

  useEffect(() => {
    setAccountDetails(accountDetailInfo);
  }, [accountDetailInfo]);
  const { firstName, lastName, email, phone, company, password,confirmPassword ,currentpassword} =accountDetails
  return (
    <div>
      <form className="edit-form" onSubmit={handleSubmit(updateAccountDetail)}>
        <Row>
          <Col>
            <label className="textlabel">First Name </label>
            <InputField
              type="text"
              className="update-profile-detail-input"
              placeholder="First name *"
              value={firstName}
              name="firstname"
              registerRef= {register("firstname", {
                required: {
                  value: !firstName,
                  message:firstNameErrorMessage,
                },
              })}
              onChange={(e) =>
                setAccountDetails({
                  ...accountDetails,
                  firstName: e.target.value,
                })
              }
              errors={errors}
            />
          </Col>
          <Col>
            <label className="textlabel">Last Name </label>
            <InputField
              type="text"
              name="lastname"
              placeholder="Last name *"
              value={lastName}
              registerRef= {register("lastname", {
                required: {
                  value: !lastName,
                  message: lastNameErrorMessage,
                },
              })}
              onChange={(e) =>
                setAccountDetails({
                  ...accountDetails,
                  lastName: e.target.value,
                })
              }
              className="update-profile-detail-input"
              errors={errors}
            />
          </Col>
          <Col>
            <label className="textlabel">Company</label>
            <InputField
              type="text"
              name="company"
              label="company"
              placeholder="Company*"
              value={company}
              onChange={(e) =>
                setAccountDetails({
                  ...accountDetails,
                  company: e.target.value,
                })
              }
              className="update-profile-detail-input"
            />
          </Col>
          <Col>
            <label className="textlabel">Phone</label>
            <PhoneInputField
             type="phone"
             enableSearch="true"
             control={control}
             country={"in"}
             name="phone"
             inputClass={"custom-input"}
             placeholder="Enter phone number"
             value={phone}
              handleChange={(e) =>
                setAccountDetails({ ...accountDetails, phone: e.target.value })
              }
              className="update-profile-detail-input"
              errors={errors}
            />
          </Col>
        </Row>
        <Row style={{ marginTop: "25px" }}>
          <Col>
            <label className="textlabel">Email </label>
            <InputField
              type="email"
              className="update-profile-detail-input"
              name="email"
              placeholder="Email *"
              value={email}
              registerRef={register("email", {
                required: {
                  value: !email,
                  message: emailErrorMessage,
                },
                validate: () => {
                  return validateEmail(email);
                },
              })}
              onChange={(e) =>
                setAccountDetails({ ...accountDetails, email: e.target.value })
              }
              errors={errors}
              disabled={true}
            />
          </Col>
          <Col>
            <label className="textlabel">Password </label>
            <PasswordField
              type="password"
              className="update-profile-detail-input"
              name="password"
              placeholder="Password *"
              value={password}
              registerRef={register("password", {
                required: {
                  value: !password,
                  message: passwordErrorMessage,
                },
                validate: () => {
                  return passwordValidation(password);
                },
              })}
              onChange={(e) =>
                setAccountDetails({
                  ...accountDetails,
                  password: e.target.value,
                })
              }
             
            />
          </Col>
          <Col>
            <label className="textlabel">Confirm Password </label>
            <PasswordField
              type="password"
              className="update-profile-detail-input"
              name="confirmPassword"
              placeholder="Confirm Password *"
              value={confirmPassword }
              registerRef={register("confirmPassword", {
                required: {
                  value: !confirmPassword,
                  message: passwordErrorMessage,
                },
                validate: () => {
                  return confirmPasswordValidation(password,confirmPassword);
                },
              })}
              errors={errors}
              onChange={(e) =>
                setAccountDetails({
                  ...accountDetails,
                  confirmPassword: e.target.value,
                })
              }

            />
          </Col>
          <Col>
            <label className="textlabel">Current Password </label>
            <PasswordField
              type="password"
              name="currentpassword"
              label="currentpassword"
              placeholder="Current Password *"
              value={accountDetails?.currentpassword || ""}
              registerRef={register("password", {
                required: {
                  value: !currentpassword,
                  message: passwordErrorMessage,
                },
                validate: () => {
                  return passwordValidation(currentpassword);
                },
              })}
              onChange={(e) =>
                setAccountDetails({
                  ...accountDetails,
                  currentpassword: e.target.value,
                })
              }
              errors={errors}
              className="update-profile-detail-input"
            />
          </Col>
        </Row>
        <div className="account-details-button my-4">
        <Button type="submit" variant="outline-success" size="sm">
            UPDATE DETAILS
          </Button>{" "}
          <Button 
            className="ms-1"
            onClick={() => setToggleEdit((previous) => !previous)}
            variant="danger"
            size="sm"
          >
            Cancel
          </Button>
        </div>
      </form>
    </div>
  );
};
AccountSettings.propTypes = {
  accountDetailInfo: PropTypes.object.isRequired,
  setToggleEdit: PropTypes.func.isRequired,
  getcustomer: PropTypes.func.isRequired,
};
export default AccountSettings;
