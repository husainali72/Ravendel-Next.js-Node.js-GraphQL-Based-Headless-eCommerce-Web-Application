import { useEffect } from "react";
import { Button, Card } from "react-bootstrap";
import { capitalize, get } from "lodash";
import PropTypes from "prop-types";
const CustomerDetail = (props) => {
  const {
    addressBook,
    getBillingInfo,
    SelectAddressBook,
    billingInfo,
    shippingInfo,
    shippingAdd,
  } = props;
  useEffect(() => {
    var allData = {
      billing: billingInfo,
      shipping: shippingInfo,
      // shippingAddress: shippingAdd,
    };
    getBillingInfo(allData);
  }, [shippingInfo, billingInfo, shippingAdd]);
  return (
    <>
      <div>
        <h5>Customer Details</h5>
      </div>
      <div>
        <div className="customer-detail">
          {addressBook && addressBook?.length > 0 ? (
            <>
              <Card.Body className="cust-detail-container">
                <Card className="disable-hover">
                  {addressBook?.map((address, i) =>
                    i < 5 ? (
                      <>
                        <div
                          className="col-md-12 d-flex flex-md-row flex-column align-items-center justify-content-between"
                          key={i}
                        >
                          <div className="defination-table">
                            <dl>
                              <dt>First Name</dt>
                              <dd>
                                {capitalize(get(address, "firstName", ""))}
                              </dd>

                              <dt>Lastname</dt>
                              <dd>
                                {" "}
                                {capitalize(get(address, "lastName", ""))}
                              </dd>

                              <dt>Phone</dt>
                              <dd>{get(address, "phone", "")}</dd>

                              <dt>City</dt>
                              <dd>{capitalize(get(address, "city", ""))} </dd>

                              <dt> Address 1</dt>
                              <dd>
                                {" "}
                                {capitalize(get(address, "addressLine1", ""))}
                              </dd>

                              <dt> Address 2</dt>
                              <dd>
                                {capitalize(get(address, "addressLine2", ""))}
                              </dd>

                              <dt>Pincode</dt>
                              <dd>{get(address, "pincode", "")}</dd>

                              <dt>State</dt>
                              <dd> {capitalize(get(address, "state", ""))}</dd>

                              <dt>Company</dt>
                              <dd>{capitalize(get(address, "company", ""))}</dd>

                              <dt>City</dt>
                              <dd>{capitalize(get(address, "city", ""))}</dd>
                            </dl>
                          </div>
                          <div className=" select-button">
                            <Button
                              size="sm"
                              variant="secondary"
                              onClick={(e) => SelectAddressBook(address, e)}
                            >
                              Select
                            </Button>
                          </div>
                        </div>
                        <hr
                          className={`customer-hr ${
                            i === addressBook?.length - 1 && "d-none"
                          }`}
                        />
                      </>
                    ) : null
                  )}
                </Card>
              </Card.Body>
            </>
          ) : (
            "No data"
          )}
        </div>
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
};
export default CustomerDetail;
