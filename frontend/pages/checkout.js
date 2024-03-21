/* eslint-disable react/no-unknown-property */
/* eslint-disable no-empty */
/* eslint-disable no-unused-vars */
import { useState, useEffect } from "react";
import { API_BASE_URL, baseUrl } from "../config";
import Link from "next/link";
import client from "../apollo-client";
import BreadCrumb from "../components/breadcrumb/breadcrumb";
import { Container, Button } from "react-bootstrap";
import { useSelector, useDispatch } from "react-redux";
import BillingDetails from "../components/checkoutcomponent/BillingDetail";
import Orderdetail from "../components/checkoutcomponent/OrderDetail";
import { useForm } from "react-hook-form";
import { checkoutDetailAction } from "../redux/actions/checkoutAction";
import CustomerDetail from "../components/checkoutcomponent/CustomerDetails";
import { getSession, useSession } from "next-auth/react";
import ShippingTaxCoupon from "../components/checkoutcomponent/ShippingTaxCoupon";
import {
  mutation,
  stripeCheckout,
  currencySetter,
  query,
  handleError,
  queryWithoutToken,
} from "../utills/helpers";
import { ADD_ORDER } from "../queries/orderquery";
import { useRouter } from "next/router";
import Stripes from "../components/checkoutcomponent/reactstripe/StripeContainer";
import { APPLY_COUPON_CODE } from "../queries/couponquery";
import OrderSummary from "../components/checkoutcomponent/CheckOutOrderSummary";
import Stepper from "../components/checkoutcomponent/stepperbar/Stepper";
import {
  calculateUserCart,
  removeAllCartItemsAction,
  removeCartItemAction,
} from "../redux/actions/cartAction";
import toast, { Toaster } from "react-hot-toast";
import { CHECK_ZIPCODE } from "../queries/productquery";
import { get } from "lodash";
import Loading from "../components/loadingComponent";

const notify = (message, success) => {
  if (success) {
    return toast.success(message);
  } else {
    return toast.error(message);
  }
};

var billingInfoObject = {
  order_notes: "",
  zip: "",
  state: "",
  city: "",
  address_line2: "",
  address: "",
  phone: "",
  company: "",
  email: "",
  lastname: "",
  firstname: "",
  country: "UK",
  paymentMethod: "",
  transaction_id: "",
};
var shippingObject = {
  order_notes: "",
  zip: "",
  state: "",
  city: "",
  address_line2: "",
  address: "",
  phone: "",
  company: "",
  email: "",
  lastname: "",
  firstname: "",
  country: "UK",
  paymentMethod: "",
};

var savedShippingInfo;
export const CheckOut = () => {
  const session = useSession();
  const dispatch = useDispatch();
  const [islogin, setIsLogin] = useState(false);
  const router = useRouter();
  const [addressList, selectAddressList] = useState([]);
  const [token, setToken] = useState("");
  const [customerId, setCustomerId] = useState("");
  const [billingDetails, setBillingDetails] = useState({
    userId: customerId || "",
  });
  const carts = useSelector((state) => state.cart);
  const [cartItems, setCartItems] = useState([]);
  const [billingInfo, setBillingInfo] = useState(billingInfoObject);
  const [shippingInfo, setShippingInfo] = useState(shippingObject);
  const [shippingAdd, setShippingAdd] = useState(false);
  const [formStep, setFormStep] = useState(1);
  const [totalSummary, setTotalSummary] = useState({});
  const [CouponLoading, setCouponLoading] = useState(false);
  const [couponCode, setCouponCode] = useState("");
  const steps = ["Address", "Shipping", "Order Detail"];
  const nextFormStep = () => setFormStep((currentStep) => currentStep + 1);
  const prevFormStep = () => setFormStep((currentStep) => currentStep - 1);
  const [currency, setCurrency] = useState("$");
  const [ZipMessage, setZipMessage] = useState("");
  const [couponCartDetail, setCouponCardDetail] = useState({});
  const settings = useSelector((state) => state.setting);
  const [currencyOption, setCurrencyOption] = useState({});
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    const currencyStoreOptions = get(
      settings,
      "setting.store.currency_options",
      {}
    );
    setCurrencyOption({ ...currencyStoreOptions });
    currencySetter(currencyStoreOptions, setCurrency);
  }, [settings]);

  useEffect(() => {
    if ("authenticated" === session?.status) {
      // Select the address list from the session data
      selectAddressList(
        get(session, "data.user.accessToken.customer.addressBook")
      );
      // Get the default address details from the address book
      let defaultAddress = getDefaultAddressDetails(
        get(session, "data.user.accessToken.customer.addressBook")
      );
      // Set default address for billingInfo if not already selected
      if (checkIsAddressSelected(billingInfo)) {
        setBillingInfo({ ...defaultAddress });
      }
      // Set default address for shippingInfo if not already selected
      if (checkIsAddressSelected(shippingInfo)) {
        setShippingInfo({ ...defaultAddress });
      }
      // Set token and customer ID
      setToken(get(session, "data.user.accessToken.token"));
      setCustomerId(get(session, "data.user.accessToken.customer._id"));
      let sessionCustomerID = get(
        session,
        "data.user.accessToken.customer._id"
      );
      setBillingDetails({ ...billingDetails, userId: sessionCustomerID });
    }
  }, [session?.status]);

  useEffect(() => {
    const getProducts = async () => {
      const userSession = await getSession();
      if ("authenticated" === session?.status || null !== userSession) {
        setIsLogin(true);
        // get CartItems and Total summary detail
        let cartItemList = prepareCartItemsList(get(carts, "cartItems", []));
        setTotalSummary({ ...get(carts, "totalSummary") });
        setCartItems([...cartItemList]);
        setCouponCardDetail({});
      } else {
        setCartItems([]);
        setCouponCardDetail({});
        //If the user is not authenticated Redirect the user to the login page
        router.push("/account");
      }
    };
    getProducts();
  }, [carts]);
  useEffect(() => {
    const checkCart = async () => {
      const userSession = await getSession();
      if ("authenticated" === session?.status || null !== userSession) {
        setIsLogin(true);
        // If the cart is empty, redirect the user to the home page
        if (get(carts, "cartItems", [])?.length <= 0) {
          router.push("/");
        }
      }
    };
    checkCart();
  }, []);
  useEffect(() => {
    if ("authenticated" === session?.status) {
      selectAddressList(
        get(session, "data.user.accessToken.customer.addressBook")
      );
      setToken(get(session, "data.user.accessToken.token"));
      setCustomerId(get(session, "data.user.accessToken.customer._id"));
      setIsLogin(true);
    } else {
      setIsLogin(false);
    }
  }, [get(carts, "cartItems")]);
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
    control,
  } = useForm({ mode: "onSubmit" });
  const onSubmit = (data) => {
    if (ZipMessage && ZipMessage?.zipSuccess) {
      nextFormStep();
    }
  };
  const getDefaultAddressDetails = (addresses) => {
    if (addresses && 0 < addresses?.length) {
      let defaultAddress = addresses?.find(
        (address) => address?.defaultAddress
      );
      defaultAddress = defaultAddress || addresses[0];
      const {
        pincode,
        state,
        city,
        addressLine1,
        addressLine2,
        phone,
        company,
        email,
        lastName,
        firstName,
        country,
      } = defaultAddress;
      let defaultAddressInfo = {
        zip: pincode,
        state: state,
        city: city,
        address: addressLine1 + ", " + addressLine2,
        addressLine2: addressLine2,
        addressLine1: addressLine1,
        phone: phone,
        company: company,
        email: email,
        lastname: lastName,
        firstname: firstName,
        country: country,
      };
      checkCode(get(defaultAddressInfo, "zip"));
      return defaultAddressInfo;
    }
  };
  const prepareCartItemsList = (allCartItems) => {
    let cartItemsList = [];
    allCartItems?.map((cart) => {
      let cartProduct = {
        _id: get(cart, "productId", ""),
        variantId: get(cart, "variantId", ""),
        quantity: parseInt(get(cart, "qty")),
        productQuantity: get(cart, "productQuantity"),
        name: get(cart, "productTitle"),
        pricing: get(cart, "productPrice"),
        feature_image: get(cart, "productImage"),
        url: get(cart, "url"),
        attributes: get(cart, "attributes", []),
        shippingClass: get(cart, "shipping.shippingClass"),
        taxClass: get(cart, "taxClass"),
        discountPercentage: get(cart, "discountPercentage"),
        amount: get(cart, "amount"),
        mrpAmount: get(cart, "mrpAmount"),
        available: get(cart, "available"),
      };
      if (cart.available) {
        cartItemsList.push(cartProduct);
      }
    });
    return cartItemsList;
  };
  const removeCoupon = () => {
    if ("authenticated" === session?.status && customerId) {
      dispatch(calculateUserCart(customerId));
    }
  };
  const handleBillingInfo = (e) => {
    let { name, value } = get(e, "target");
    if (!shippingAdd && name !== "paymentMethod") {
      setShippingInfo({
        ...shippingInfo,
        [name]: value,
      });
    }
    setBillingInfo({ ...billingInfo, [name]: value });
  };
  const checkCode = async (code) => {
    try {
      let variable = { zipcode: code.toString() };
      const { data: result } = await queryWithoutToken(CHECK_ZIPCODE, variable);
      setZipMessage({
        ...ZipMessage,
        zipMessage: get(result, "checkZipcode.message"),
        zipSuccess: get(result, "checkZipcode.success"),
      });
    } catch (e) {}
  };
  const handleZipCode = (e) => {
    let { name, value } = get(e, "target");
    if (!shippingAdd) {
      setShippingInfo({
        ...shippingInfo,
        [name]: value,
      });
    }
    setBillingInfo({ ...billingInfo, [name]: value });

    checkCode(value);
  };

  const getBillingData = (val) => {
    setBillingDetails({ ...billingDetails, ...val });
  };

  const getOrderDetailsData = (val) => {
    setBillingDetails({ ...billingDetails, ...val });
  };
  const handleShippingChange = (e) => {
    let { name, value } = get(e, "target");
    setShippingInfo({
      ...shippingInfo,
      [name.slice(8)]: value,
    });
  };
  const handlePhoneInput = (name, value) => {
    if (!shippingAdd) {
      setShippingInfo({
        ...shippingInfo,
        [name]: value,
      });
    }
    setBillingInfo({ ...billingInfo, [name]: value });
  };

  const handleShippingPhone = (name, value) => {
    setShippingInfo({
      ...shippingInfo,
      [name]: value,
    });
  };
  const checkIsAddressSelected = (selectedAddress) => {
    if (Object.values(selectedAddress).some((value) => !!value)) {
      return true;
    } else {
      return false;
    }
  };
  const shippingAddressToggle = (e) => {
    if (e?.target?.checked) {
      savedShippingInfo = shippingInfo;
      setShippingInfo(shippingObject);
    } else {
      setShippingInfo(billingInfo);
    }
    setShippingAdd(e?.target?.checked);
  };
  const SelectAddressBook = (address) => {
    let commonFields = {
      zip: address?.pincode,
      state: address?.state,
      city: address?.city,
      address: address?.addressLine1 + ", " + address?.addressLine2,
      addressLine2: address?.addressLine2,
      addressLine1: address?.addressLine1,
      phone: address?.phone,
      company: address?.company,
      email: address?.email,
      lastname: address?.lastName,
      firstname: address?.firstName,
      country: address?.country,
    };
    let shipping = commonFields;
    let billing = {
      ...commonFields,
      email: address?.email,
      paymentMethod: address?.paymentMethod,
    };
    if (!shippingAdd) {
      setShippingInfo(shipping);
    }
    const checkCode = async () => {
      try {
        const { data: result } = await client.query({
          query: CHECK_ZIPCODE,
          variables: { zipcode: get(address, "pincode", "").toString() },
        });
        setZipMessage({
          ...ZipMessage,
          zipMessage: get(result, "checkZipcode.message"),
          zipSuccess: get(result, "checkZipcode.success"),
        });
      } catch (e) {}
    };
    checkCode();
    setBillingInfo(billing);
  };
  const doApplyCouponCode = async (e) => {
    e.preventDefault();
    let variables = {
      userId: customerId,
      couponCode: `${couponCode}`,
      // cartItems: cart,
    };
    let couponResponse = 0;
    setCouponLoading(true);
    query(APPLY_COUPON_CODE, variables, token)
      .then((res) => {
        couponResponse = get(res, "data.calculateCoupon");

        //Extract and update the cart items based on the coupon response
        let cartItemList = prepareCartItemsList(
          get(couponResponse, "cartItems", [])
        );
        setCartItems([...cartItemList]);
        setTotalSummary({ ...get(couponResponse, "totalSummary", {}) });
        // Update coupon details
        if (get(couponResponse, "success")) {
          setCouponCardDetail({ ...get(couponResponse, "couponCard", {}) });
          setCouponCode("");
          notify(get(couponResponse, "message"), true);
        } else {
          notify(get(couponResponse, "message"));
          setCouponCardDetail({ ...get(couponResponse, "couponCard", {}) });
        }
      })
      .finally(() => setCouponLoading(false));
  };
  const handleOrderPlaced = (e) => {
    e.preventDefault();
    if ("authenticated" === session?.status) {
      setLoading(true);

      let paymentMethod = get(billingDetails, "billing.paymentMethod");
      dispatch(checkoutDetailAction(billingDetails));
      mutation(ADD_ORDER, billingDetails, dispatch)
        .then((response) => {
          setLoading(false);
          let success = get(response, "data.addOrder.success");
          let message = get(response, "data.addOrder.message");
          let redirectUrl = get(response, "data.addOrder.redirectUrl");
          let orderId = get(response, "data.addOrder.id");
          if (success && paymentMethod === "Stripe") {
            if (redirectUrl) {
              router.push(redirectUrl);
            }
          } else if (success && paymentMethod == "Cash On Delivery") {
            let id = customerId;
            let variables = { userId: id };
            dispatch(removeAllCartItemsAction(variables));
            setBillingDetails("");
            if (orderId) {
              router.push({
                pathname: "/orderstatus/thankyou",
                query: {
                  orderId: orderId,
                },
              });
            }
          }
          if (!success) {
            notify(message, false);
          }
        })
        .catch((error) => {
          setLoading(false);
          handleError(error, dispatch);
        });
    }
  };
  if (islogin) {
    switch (formStep) {
      case 1:
        return (
          <>
            <Toaster />
            <div>
              <BreadCrumb title={"checkout"} />
              <section className="checkout-section">
                <Container>
                  <Stepper activeStep={formStep} steps={steps} />
                  <div className="col-lg-12 first-checkout-page">
                    <div className="first-checkout-page-container">
                      <CustomerDetail
                        addressBook={addressList}
                        setBillingInfo={setBillingInfo}
                        SelectAddressBook={SelectAddressBook}
                        billingInfo={billingInfo}
                        shippingInfo={shippingInfo}
                        shippingAdd={shippingAdd}
                        getBillingInfo={getBillingData}
                      />
                      <h5>Billing Details</h5>
                      <form onSubmit={handleSubmit(onSubmit)}>
                        <BillingDetails
                          control={control}
                          ZipMessage={ZipMessage}
                          handleZipCode={handleZipCode}
                          billingInfo={billingInfo}
                          shippingInfo={shippingInfo}
                          handlePhoneInput={handlePhoneInput}
                          handleShippingPhone={handleShippingPhone}
                          shippingAdd={shippingAdd}
                          setShippingAdd={setShippingAdd}
                          handleBillingInfo={handleBillingInfo}
                          handleShippingChange={handleShippingChange}
                          shippingAddressToggle={shippingAddressToggle}
                          registerRef={register}
                          errorRef={errors}
                          getBillingInfo={getBillingData}
                        />

                        <button
                          type="submit"
                          className="btn btn-success primary-btn-color checkout-first-continue-btn"
                        >
                          Continue
                        </button>
                      </form>
                    </div>
                    <div className="cupon-cart">
                      <OrderSummary
                        totalSummary={totalSummary}
                        removeCoupon={removeCoupon}
                        currencyOption={currencyOption}
                        currency={currency}
                        couponCartDetail={couponCartDetail}
                        CouponLoading={CouponLoading}
                        Data
                        doApplyCouponCode={doApplyCouponCode}
                        couponCode={couponCode}
                        setCouponCode={setCouponCode}
                      />
                    </div>
                  </div>
                </Container>
              </section>
            </div>
          </>
        );
      case 2:
        return (
          <>
            <Toaster />
            <div>
              <BreadCrumb title={"checkout"} />
              <section className="checkout-section">
                <Container>
                  <Stepper activeStep={formStep} steps={steps} />
                  <div className="col-lg-12 checkout-second-page-container">
                    <div className="second-container">
                      <ShippingTaxCoupon
                        currency={currency}
                        shippingInfo={shippingInfo}
                        prevFormStep={prevFormStep}
                        shippingAdd={shippingAdd}
                        billingInfo={billingInfo}
                      />
                      <button
                        className="btn btn-success primary-btn-color second-continue-btn"
                        onClick={nextFormStep}
                      >
                        Continue
                      </button>
                    </div>
                    {loading && <Loading />}
                    <div className="checkout-order-summary-container">
                      <OrderSummary
                        totalSummary={totalSummary}
                        removeCoupon={removeCoupon}
                        currencyOption={currencyOption}
                        currency={currency}
                        couponCartDetail={couponCartDetail}
                        CouponLoading={CouponLoading}
                        Data
                        doApplyCouponCode={doApplyCouponCode}
                        couponCode={couponCode}
                        setCouponCode={setCouponCode}
                      />
                    </div>
                  </div>
                </Container>
              </section>
            </div>
          </>
        );
      case 3:
        return (
          <>
            <Toaster />
            <div>
              <BreadCrumb title={"checkout"} />
              <section className="checkout-section">
                <Container>
                  <Stepper activeStep={formStep} steps={steps} />
                  <div className="col-lg-12 third-container-checkout">
                    <div className="checkout-coupon-container">
                      <ShippingTaxCoupon
                        currency={currency}
                        shippingInfo={shippingInfo}
                        prevFormStep={prevFormStep}
                        shippingAdd={shippingAdd}
                        billingInfo={billingInfo}
                      />
                      <h5>Your Order Summary</h5>
                      <Orderdetail
                        settings={settings}
                        currency={currency}
                        billingInfo={billingInfo}
                        shippingInfo={shippingInfo}
                        handleBillingInfo={handleBillingInfo}
                        cartItems={cartItems}
                        getOrderDetails={getOrderDetailsData}
                      />
                      {/* </form> */}
                      {"stripe" === billingInfo.payment_method && (
                        <Stripes
                          getOrderDetailsData={getOrderDetailsData}
                          billingInfo={billingInfo}
                          setBillingInfo={setBillingInfo}
                          detailsOfBill={billingDetails}
                          cartItems={cartItems}
                        />
                      )}

                      <button
                        type="submit"
                        className="btn btn-success primary-btn-color place-order-container"
                        onClick={handleOrderPlaced}
                        disabled={!billingInfo.paymentMethod}
                      >
                        Continue{" "}
                      </button>
                    </div>
                    <div className="checkout-order-summary-container">
                      <OrderSummary
                        totalSummary={totalSummary}
                        removeCoupon={removeCoupon}
                        currencyOption={currencyOption}
                        currency={currency}
                        couponCartDetail={couponCartDetail}
                        CouponLoading={CouponLoading}
                        Data
                        doApplyCouponCode={doApplyCouponCode}
                        couponCode={couponCode}
                        setCouponCode={setCouponCode}
                      />
                    </div>
                  </div>
                </Container>
              </section>
            </div>
          </>
        );
      default:
        <p>Nothing to do</p>;
    }
  }

  return (
    <div>
      <BreadCrumb title={"checkout"} />
      <section className="checkout-section">
        {islogin && cartItems && 0 < cartItems?.length ? (
          <Container>
            <div className="account-coupon-box row">
              <div className="account-check col-md-6">
                <div className="toggle-info">
                  <p>
                    <i class="far fa-user"></i> Already have an account ?{" "}
                    <Link href="/account">
                      <a>Click here to login</a>
                    </Link>
                  </p>
                </div>
              </div>
            </div>
            <hr className="mt-50 mb-50 devider checkout-billing-details" />
            <div className="billing-form-container container">
              <form onSubmit={handleSubmit(onSubmit)}>
                <div className="checkout-bill-container row">
                  <div className="col-lg-6">
                    <div className="billing-container">
                      <h5>Billing Details</h5>
                      <BillingDetails
                        control={control}
                        ZipMessage={ZipMessage}
                        handleZipCode={handleZipCode}
                        billingInfo={billingInfo}
                        shippingInfo={shippingInfo}
                        handlePhoneInput={handlePhoneInput}
                        handleShippingPhone={handleShippingPhone}
                        shippingAdd={shippingAdd}
                        setShippingAdd={setShippingAdd}
                        handleBillingInfo={handleBillingInfo}
                        handleShippingChange={handleShippingChange}
                        shippingAddressToggle={shippingAddressToggle}
                        registerRef={register}
                        errorRef={errors}
                        getBillingInfo={getBillingData}
                      />
                    </div>
                  </div>
                  <div className="col-lg-6">
                    <div className="your-order-container">
                      <h5>Your Order</h5>
                      <Orderdetail
                        settings={settings}
                        currency={currency}
                        billingInfo={billingInfo}
                        shippingInfo={shippingInfo}
                        handleBillingInfo={handleBillingInfo}
                        cartItems={cartItems}
                        getOrderDetails={getOrderDetailsData}
                      />
                    </div>
                  </div>
                </div>
                <button
                  type="submit"
                  className="btn btn-success primary-btn-color"
                >
                  Place Order
                </button>
              </form>
            </div>
          </Container>
        ) : (
          <Container className="empty-checkout-page">
            <div className="checkout-unauthorised-container">
              <h3>Please Login First</h3>
            </div>
            <div className="checkout-unauthorised-container">
              <Link href="/account">
                <button
                  type="button"
                  className="btn btn-success primary-btn-color checkout-login-btn"
                >
                  login
                </button>
              </Link>
            </div>
          </Container>
        )}
      </section>
    </div>
  );
};
export default CheckOut;
