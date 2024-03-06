import { useState, useEffect } from "react";
import { API_BASE_URL as baseUrl } from "../config";
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
  formatNumber,
  mutation,
  stripeCheckout,
  currencySetter,
  logoutAndClearData,
  query,
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
import { GET_HOMEPAGE_DATA_QUERY } from "../queries/home";
import { CHECK_ZIPCODE } from "../queries/productquery";
import { get } from "lodash";

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
const totalCart = (product) =>
  product.reduce(
    (total, product) => total + product.pricing.sellprice * product.quantity,
    0
  );

export const CheckOut = ({ currencyStore, homepageData }) => {
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
  const currencyOpt = currencyStore?.currency_options?.currency;
  const [currency, setCurrency] = useState("$");
  const [ZipMessage, setZipMessage] = useState("");
  const [couponCartDetail, setCouponCardDetail] = useState({});
  const decimal = currencyStore?.currency_options?.number_of_decimals;

  useEffect(() => {
    if (session.status === "authenticated") {
      selectAddressList(get(session, "data.user.accessToken.customer.addressBook")  );
      setToken(get(session, "data.user.accessToken.token"));
      setCustomerId(get(session, "data.user.accessToken.customer._id"));
      let sessionCustomerID = get(session, "data.user.accessToken.customer._id" );
      setBillingDetails({ ...billingDetails, userId: sessionCustomerID });
    }
  }, [session, get(session, "data.user.accessToken.customer.addressBook")]);
  useEffect(() => {
    const getProducts = async () => {
      const userSession = await getSession();
      if (session?.status === "authenticated" || userSession !== null) {
        setIsLogin(true);
        let cartItemList = prepareCartItemsList(get(carts, "cartItems", []));
        setTotalSummary({ ...get(carts, "totalSummary") });
        setCartItems([...cartItemList]);
        setCouponCardDetail({})
      }
       else {
        setCartItems([]);
        setCouponCardDetail({})
      }
    };
    getProducts();
  }, [carts]);
  useEffect(() => {
    const checkCart = async () => {
      const userSession = await getSession();
      if (session?.status === "authenticated" || userSession !== null) {
        setIsLogin(true);
        if (get(carts, "cartItems", []).length <= 0) {
          router.push("/");
        }
      }
    };
    checkCart();
    currencySetter(currencyOpt, setCurrency);
  }, []);
  useEffect(() => {
    if (session.status === "authenticated") {
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
    if (ZipMessage && ZipMessage.zipSuccess) {
      nextFormStep();
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
  const removeCoupon=()=>{
    if (session.status === "authenticated"&&customerId) {
    dispatch(calculateUserCart(customerId))
    }
  }
  const handleBillingInfo = (e) => {
    if (!shippingAdd) {
      setShippingInfo({
        ...shippingInfo,
        [e.target.name]: e.target.value,
      });
    }
    setBillingInfo({ ...billingInfo, [e.target.name]: e.target.value });
  };
  const handleZipCode = (e) => {
    if (!shippingAdd) {
      setShippingInfo({
        ...shippingInfo,
        [e.target.name]: e.target.value,
      });
    }
    setBillingInfo({ ...billingInfo, [e.target.name]: e.target.value });
    const checkCode = async () => {
      try {
        const { data: result } = await client.query({
          query: CHECK_ZIPCODE,

          variables: { zipcode: e.target.value.toString() },
        });
        setZipMessage({
          ...ZipMessage,
          zipMessage: result.checkZipcode.message,
          zipSuccess: result.checkZipcode.success,
        });
      } catch (e) {}
    };
    checkCode();
  };

  const getBillingData = (val) => {
    setBillingDetails({ ...billingDetails, ...val });
  };

  const getOrderDetailsData = (val) => {
    setBillingDetails({ ...billingDetails, ...val });
  };
  const getCalculationDetails = (val) => {
    let updatedBillingDetails = { ...billingDetails, ...val };
    if (get(couponCartDetail, "couponApplied")) {
      updatedBillingDetails = {
        ...updatedBillingDetails,
        couponCode: get(couponCartDetail, "appliedCouponCode"),
      };
    } else {
      // Remove couponCode key from updatedBillingDetails
      delete updatedBillingDetails.couponCode;
    }

    setBillingDetails({ ...updatedBillingDetails });
  };
  const handleShippingChange = (e) => {
    setShippingInfo({
      ...shippingInfo,
      [e.target.name.slice(8)]: e.target.value,
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

  const shippingAddressToggle = (e) => {
    if (e.target.checked) {
      savedShippingInfo = shippingInfo;
      setShippingInfo(shippingObject);
    } else {
      setShippingInfo(billingInfo);
    }
    setShippingAdd(e.target.checked);
  };
  const SelectAddressBook = (address) => {
    let commonFields = {
      zip: address.pincode,
      state: address.state,
      city: address.city,
      address: address.addressLine1 + ", " + address.addressLine2,
      addressLine2: address.addressLine1,
      addressLine1: address.addressLine2,
      phone: address.phone,
      company: address.company,
      email: address.email,
      lastname: address.lastName,
      firstname: address.firstName,
      country: address.country,
    };
    let shipping = {
      ...commonFields,
      payment_method: address.paymentMethod,
    };
    let billing = commonFields;
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
    let cart = cartItems.map((product) => {
      return {
        productId: get(product, "_id"),
        variantId: get(product, "variantId"),
        productTitle: get(product, "name"),
        attributes: get(product, "attributes"),
        qty: get(product, "quantity"),
      };
    });
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
    if (billingDetails.billing.payment_method === "stripe") {
        stripeCheckout(billingDetails, cartItems, baseUrl)
    }
    dispatch(checkoutDetailAction(billingDetails));
    mutation(ADD_ORDER, billingDetails, dispatch).then(res => {
        let response = res.data.addOrder.success

        if (response) {
            billingDetails.products.forEach(product => {
                dispatch(removeCartItemAction(product.productId))
            })
            if (session.status === "authenticated") {
                let id = customerId
                let variables = { userId: id}
                dispatch(removeAllCartItemsAction(variables))

            }
            setBillingDetails("")
            router.push("/orderstatus/thankyou")
        }

    }
    ).catch((error)=>{
        if(get(error,'extensions.code')===401){
            logoutAndClearData(dispatch)
        }
    })
}

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
                    <div style={{ padding: "20px", maxWidth: "700px" }}>
                      <CustomerDetail
                        decimal={decimal}
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
                          className="btn btn-success"
                          style={{
                            marginTop: 12,
                            backgroundColor: "#088178",
                            float: "right",
                          }}
                        >
                          Continue
                        </button>
                      </form>
                    </div>
                    <div className="cupon-cart">
                      <OrderSummary
                        totalSummary={totalSummary}
                        removeCoupon={removeCoupon}
                        decimal={decimal}
                        currency={currency}
                        couponCartDetail={couponCartDetail}
                        CouponLoading={CouponLoading}
                        Data
                        doApplyCouponCode={doApplyCouponCode}
                        couponCode={couponCode}
                        setCouponCode={setCouponCode}
                        getCalculationDetails={getCalculationDetails}
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
                  <div className="col-lg-12" style={{ display: "flex" }}>
                    <div style={{ width: "60%", padding: "20px" }}>
                      <ShippingTaxCoupon
                        currency={currency}
                        decimal={decimal}
                        shippingInfo={shippingInfo}
                        prevFormStep={prevFormStep}
                        shippingAdd={shippingAdd}
                        billingInfo={billingInfo}
                      />
                      <button
                        className="btn btn-success"
                        style={{
                          marginTop: 12,
                          backgroundColor: "#088178",
                          float: "right",
                        }}
                        onClick={nextFormStep}
                      >
                        Continue
                      </button>
                    </div>
                    <div
                      style={{
                        width: "40%",
                        borderLeft: "2px solid whitesmoke",
                        padding: "20px",
                      }}
                    >
                      <OrderSummary
                        totalSummary={totalSummary}
                        removeCoupon={removeCoupon}
                        decimal={decimal}
                        currency={currency}
                        couponCartDetail={couponCartDetail}
                        CouponLoading={CouponLoading}
                        Data
                        doApplyCouponCode={doApplyCouponCode}
                        couponCode={couponCode}
                        setCouponCode={setCouponCode}
                        getCalculationDetails={getCalculationDetails}
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
                  <div className="col-lg-12" style={{ display: "flex" }}>
                    <div style={{ width: "60%", padding: "20px" }}>
                      <ShippingTaxCoupon
                        currency={currency}
                        decimal={decimal}
                        shippingInfo={shippingInfo}
                        prevFormStep={prevFormStep}
                        shippingAdd={shippingAdd}
                        billingInfo={billingInfo}
                      />
                      <h5>Your Order Summary</h5>
                      <Orderdetail
                        homepageData={homepageData}
                        decimal={decimal}
                        currency={currency}
                        billingInfo={billingInfo}
                        shippingInfo={shippingInfo}
                        handleBillingInfo={handleBillingInfo}
                        cartItems={cartItems}
                        getOrderDetails={getOrderDetailsData}
                      />
                      {/* </form> */}
                      {billingInfo.payment_method === "stripe" && (
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
                        className="btn btn-success"
                        style={{
                          marginTop: 12,
                          backgroundColor: "#088178",
                          float: "right",
                        }}
                        onClick={handleOrderPlaced}
                        disabled={!billingInfo.paymentMethod}
                      >
                        Continue{" "}
                      </button>
                    </div>
                    <div
                      style={{
                        width: "40%",
                        borderLeft: "2px solid whitesmoke",
                        padding: "20px",
                      }}
                    >
                      <OrderSummary
                        totalSummary={totalSummary}
                        removeCoupon={removeCoupon}
                        decimal={decimal}
                        currency={currency}
                        couponCartDetail={couponCartDetail}
                        CouponLoading={CouponLoading}
                        Data
                        doApplyCouponCode={doApplyCouponCode}
                        couponCode={couponCode}
                        setCouponCode={setCouponCode}
                        getCalculationDetails={getCalculationDetails}
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
        {islogin && cartItems && cartItems?.length > 0 ? (
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
            <hr
              style={{ borderTop: "4px solid #bbb", width: "100%" }}
              className="mt-50 mb-50 devider"
            />
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
                        homepageData={homepageData}
                        decimal={decimal}
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
                  className="btn btn-success"
                  style={{ marginTop: 12, backgroundColor: "#088178" }}
                >
                  Place Order
                </button>
              </form>
            </div>
          </Container>
        ) : (
          <Container className="empty-checkout-page">
            <div style={{ display: "flex", justifyContent: "center" }}>
              <h3>Please Login First</h3>
            </div>
            <div style={{ display: "flex", justifyContent: "center" }}>
              <Link href="/account">
                <button
                  type="button"
                  className="btn btn-success"
                  style={{ marginTop: 12, backgroundColor: "#088178" }}
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

export async function getStaticProps() {
  var currencyStore = [];
  var homepageData = {};
  try {
    const { data: homepagedata } = await client.query({
      query: GET_HOMEPAGE_DATA_QUERY,
    });
    currencyStore = homepagedata?.getSettings?.store;
    homepageData = homepagedata || {};
  } catch (e) {}
  return {
    props: {
      currencyStore,
      homepageData,
    },
    revalidate: 10,
  };
}
