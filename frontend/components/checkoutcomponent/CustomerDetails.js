import { useEffect } from "react";
import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined";
import CorporateFareOutlinedIcon from "@mui/icons-material/CorporateFareOutlined";
import CreateOutlinedIcon from "@mui/icons-material/CreateOutlined";
import AddRoundedIcon from "@mui/icons-material/AddRounded";
import PropTypes from "prop-types";
import { get } from "lodash";
import { Button } from "react-bootstrap";
const CustomerDetail = (props) => {
  const {
    addressBook,
    getBillingInfo,
    SelectAddressBook,
    billingInfo,
    shippingInfo,
    shippingAdd,
    toggleAddNewAddressForm,
    editCustomerAddress
  } = props;
  useEffect(() => {
    let billingData = billingInfo;
    let shippingData = shippingInfo;

    billingData = {
      ...billingData,
      addressType: billingInfo?.addressType?.value,
    };
    shippingData = {
      ...shippingData,
      addressType: shippingData?.addressType?.value,
    };
    var allData = {
      billing: billingData,
      shipping: shippingData,
      // shippingAddress: shippingAdd,
    };
    getBillingInfo(allData);
  }, [shippingInfo, billingInfo, shippingAdd]);

  return (
    <>
      <div className={`d-flex ${addressBook && addressBook?.length > 0 ? 'justify-content-between' : 'justify-content-end'} align-items-center`}>
        {addressBook && addressBook?.length > 0 && (
          <h5 style={{ marginBottom: 0 }}>Customer Details</h5>
        )}
        <button className="add-btn" onClick={toggleAddNewAddressForm}>
          <span>
            <AddRoundedIcon />
          </span>{" "}
          Add a New Address
        </button>
      </div>
      <div>
          {addressBook && addressBook?.length > 0 && (
            <div className="customer-detail">
            <>
              <div className="cust-detail-container">
                {addressBook?.map((address, i) => (
                  <>
                    <div
                      className={`address-card ${
                        billingInfo?.id && address._id === billingInfo?.id
                          ? "active"
                          : ""
                      }`}
                      key={i}
                      onClick={(e) => SelectAddressBook(address, e)}
                    >
                      <span className="radio-check"></span>
                      <Button className="edit-btn" variant="link" onClick={()=>editCustomerAddress(address)}>
                        <CreateOutlinedIcon />
                      </Button>
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
          </div>
          )}
      </div>
    </>
  );
};
CustomerDetail.propTypes = {
  addressBook: PropTypes.array,
  getBillingInfo: PropTypes.func,
  SelectAddressBook: PropTypes.func,
  billingInfo: PropTypes.object,
  shippingInfo: PropTypes.object,
  shippingAdd: PropTypes.object,
  toggleAddNewAddressForm: PropTypes.func,
  editCustomerAddress: PropTypes.func,
};
export default CustomerDetail;
