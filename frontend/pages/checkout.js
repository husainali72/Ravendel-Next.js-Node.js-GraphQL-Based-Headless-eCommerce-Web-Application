/* eslint-disable react/no-unknown-property */
/* eslint-disable no-empty */
/* eslint-disable no-unused-vars */
import { useState, useEffect } from "react";
import Link from "next/link";
import client from "../apollo-client";
import BreadCrumb from "../components/breadcrumb/breadcrumb";
import { Container } from "react-bootstrap";
import { useSelector, useDispatch } from "react-redux";
import BillingDetails from "../components/checkoutcomponent/BillingDetail";
import Orderdetail from "../components/checkoutcomponent/OrderDetail";
import { useForm } from "react-hook-form";
import CustomerDetail from "../components/checkoutcomponent/CustomerDetails";
import { getSession, useSession } from "next-auth/react";
import ShippingTaxCoupon from "../components/checkoutcomponent/ShippingTaxCoupon";
import {
  isAnyProductOutOfStock,
  currencySetter,
  getItemFromLocalStorage,
  handleError,
  mutation,
  query,
  queryWithoutToken,
} from "../utills/helpers";
import { useRouter } from "next/router";
import { APPLY_COUPON_CODE } from "../queries/couponquery";
import OrderSummary from "../components/checkoutcomponent/CheckOutOrderSummary";
import {
  calculateUnauthenticatedCart,
  calculateUserCart,
  changeQty,
} from "../redux/actions/cartAction";
import toast, { Toaster } from "react-hot-toast";
import { CHECK_ZIPCODE } from "../queries/productquery";
import { get } from "lodash";
import Loading from "../components/loadingComponent";
import Paypal from "../components/checkoutcomponent/paypal/paypal";
import { PAYPAL } from "../utills/constant";
import { handleOrderPlaced } from "../components/checkoutcomponent/handleOrder";
import { DELETE_CART_PRODUCTS } from "../queries/cartquery";
import {
  ADD_ADDRESSBOOK,
  GET_CUSTOMER_QUERY,
  UPDATE_ADDRESSBOOK,
} from "../queries/customerquery";
import notify from "../utills/notifyToast";

var billingInfoObject = {
  order_notes: "",
  zip: "",
  state: "",
  city: "",
  addressLine2: "",
  address: "",
  phone: "",
  email: "",
  lastname: "",
  firstname: "",
  country: "",
  paymentMethod: "",
  transaction_id: "",
  addressType: "",
  _id: "",
  defaultAddress: false,
};
var shippingObject = {
  order_notes: "",
  zip: "",
  state: "",
  city: "",
  addressLine2: "",
  address: "",
  phone: "",
  email: "",
  lastname: "",
  firstname: "",
  country: "",
  addressType: "",
  _id: "",
  defaultAddress: false,
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
  const [paymentMethod, setPaymentMethod] = useState("");
  const [billingInfo, setBillingInfo] = useState(billingInfoObject);
  const [shippingInfo, setShippingInfo] = useState(shippingObject);
  const [shippingAdd, setShippingAdd] = useState(false);
  const [formStep, setFormStep] = useState(1);
  const [totalSummary, setTotalSummary] = useState({});
  const [CouponLoading, setCouponLoading] = useState(false);
  const [couponCode, setCouponCode] = useState("");
  const steps = ["Address", "Shipping", "Order Details"];
  const nextFormStep = () => setFormStep((currentStep) => currentStep + 1);
  const prevFormStep = () => setFormStep((currentStep) => currentStep - 1);
  const [currency, setCurrency] = useState("$");
  const [ZipMessage, setZipMessage] = useState("");
  const [couponCartDetail, setCouponCardDetail] = useState({});
  const settings = useSelector((state) => state.setting);
  const [currencyOption, setCurrencyOption] = useState({});
  const [loading, setLoading] = useState(false);
  const [isQuantityBtnLoading, setIsQuantityBtnLoading] = useState(false);
  const [cartLoading, setCartLoading] = useState(false);
  const [isAddNewAddressForm, setIsAddNewAddressForm] = useState(false);
  const [isEditAddress, setIsEditAddress] = useState(false);
  const cart = useSelector((state) => state.cart);
  useEffect(() => {
    getUserCartData();
  }, []);
  useEffect(() => {
    setIsQuantityBtnLoading(get(cart, "loading"));
  }, [get(cart, "loading")]);

  const getUserCartData = async () => {
    const userSession = await getSession();
    if ("authenticated" === session?.status || null !== userSession) {
      let id = get(userSession, "user.accessToken.customer._id");
      dispatch(calculateUserCart(id));
    } else {
      const localStorageProducts = getItemFromLocalStorage("cart");
      dispatch(calculateUnauthenticatedCart(localStorageProducts));
    }
  };

  useEffect(() => {
    const getProducts = async () => {
      setCartLoading(true);
      let cartItemsArray = [];
      let allItem = [];
      get(cart, "cartItems", [])?.map((cart) => {
        let cartProduct = {
          _id: get(cart, "productId", ""),
          variantId: get(cart, "variantId", ""),
          quantity: parseInt(get(cart, "qty")),
          productQuantity: get(cart, "productQuantity"),
          name: get(cart, "productTitle"),
          pricing: get(cart, "productPrice"),
          short_description: get(cart, "short_description"),
          feature_image: get(cart, "productImage"),
          url: get(cart, "url"),
          attributes: get(cart, "attributes", []),
          shippingClass: get(cart, "shippingClass"),
          taxClass: get(cart, "taxClass"),
          discountPercentage: get(cart, "discountPercentage"),
          amount: get(cart, "amount"),
          mrpAmount: get(cart, "mrpAmount"),
          available: get(cart, "available"),
        };
        allItem.push(cartProduct);
        cartItemsArray.push(cartProduct);
      });
      setTotalSummary({
        ...totalSummary,
        grandTotal: get(cart, "totalSummary.grandTotal"),
        cartTotal: get(cart, "totalSummary.cartTotal"),
        totalShipping: get(cart, "totalSummary.totalShipping"),
        totalTax: get(cart, "totalSummary.totalTax"),
        mrpTotal: get(cart, "totalSummary.mrpTotal"),
        discountTotal: get(cart, "totalSummary.discountTotal"),
      });
      setCartItems([...cartItemsArray]);
      setCartLoading(false);
    };
    getProducts();
  }, [get(cart, "cartItems")]);

  const updateCartProductQuantity = (item, updatedQuantity) => {
    setLoading(true);
    let prevQuantity = null;
    let updatedCartItems = cartItems?.map((cartItem) => {
      if (cartItem?._id === item?._id) {
        prevQuantity = cartItem?.quantity; // Store previous quantity
        return { ...cartItem, quantity: updatedQuantity };
      }
      return cartItem;
    });
    setCartItems([...updatedCartItems]);

    let id = get(session, "data.user.accessToken.customer._id");
    let variables = {
      userId: id,
      productId: get(item, "_id"),
      qty: updatedQuantity,
    };
    dispatch(changeQty(variables, router))
      .then((res) => {
        setLoading(false);
        if (get(res, "data.changeQty.success")) {
          dispatch(calculateUserCart(id));
        } else {
          let revertedCartItems = cartItems?.map((cartItem) => {
            if (cartItem?._id === item?._id) {
              return { ...cartItem, quantity: prevQuantity };
            }
            return cartItem;
          });
          setCartItems([...revertedCartItems]);
        }
        setIsQuantityBtnLoading(false);
      })
      .catch((error) => {
        setLoading(false);
        setIsQuantityBtnLoading(false);
      });
  };
  // Function to remove an item from the cart
  const removeToCart = async (item) => {
    setLoading(true);
    let productId = get(item, "_id", "");
    if (session?.status === "authenticated") {
      let id = get(session, "data.user.accessToken.customer._id");
      let variables = {
        userId: id,
        productId: item?._id,
        variantId: get(item, "variantId", ""),
      };

      mutation(DELETE_CART_PRODUCTS, variables)
        .then((res) => {
          setLoading(false);
          if (get(res, "data.deleteCartProduct.success")) {
            dispatch(calculateUserCart(id));
          }
        })
        .catch((error) => {
          setLoading(false);
          handleError(error, dispatch, router);
        });
    }
  };

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
    if (session?.status === "authenticated") {
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
    if (customerId) {
      getCustomerAddresses();
    }
  }, [customerId]);
  useEffect(() => {
    const getProducts = async () => {
      const userSession = await getSession();
      if (session?.status === "authenticated" || userSession !== null) {
        setIsLogin(true);
        // get CartItems and Total summary detail
        let cartItemList = prepareCartItemsList(get(carts, "cartItems", []));
        setTotalSummary({ ...get(carts, "totalSummary") });
        if (isAnyProductOutOfStock(cartItemList)) {
          router.push("/shopcart");
        }
        if (cartItemList?.length <= 0) {
          router.push("/");
        }
        setCartItems([...cartItemList]);
        setCouponCardDetail({});
      } else {
        setCartItems([]);
        setCouponCardDetail({});
        //If the user is not authenticated Redirect the user to the login page
        router.push("/login");
      }
    };
    getProducts();
  }, [carts]);
  const checkCart = async () => {
    const userSession = await getSession();
    if ("authenticated" === session?.status || null !== userSession) {
      setIsLogin(true);
      let cartItemsProduct = get(carts, "cartItems", []);
      // If the cart is empty, redirect the user to the home page
      if (cartItemsProduct?.length <= 0) {
        router.push("/");
      }
    }
  };
  useEffect(() => {
    checkCart();
  }, []);
  useEffect(() => {
    if ("authenticated" === session?.status) {
      setToken(get(session, "data.user.accessToken.token"));
      setCustomerId(get(session, "data.user.accessToken.customer._id"));
      setIsLogin(true);
    } else {
      setIsLogin(false);
    }
  }, [get(carts, "cartItems")]);

  useEffect(() => {
    // Scroll to the top when the form step changes
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [formStep]);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
    control,
    setError,
  } = useForm({ mode: "onSubmit" });
  const onSubmit = (data) => {
    const billingAddressType = !get(billingDetails, `billing.addressType`);
    const shippingAddressType =
      shippingAdd && !get(billingDetails, `shipping.addressType`);
    if (
      !billingAddressType &&
      !shippingAddressType &&
      ZipMessage &&
      ZipMessage?.zipSuccess
    ) {
      let isAddressAlready = get(billingDetails, "billing.id") ? true : false;
      if (!isAddressAlready) {
        addNewAddress();
      } else if (isEditAddress) {
        updateCustomerAddress();
      } else {
        setIsAddNewAddressForm(false);
        nextFormStep();
      }
    } else {
      if (billingAddressType) {
        setError("addressType", {
          type: "required",
          message: `Address Type is required.`,
        });
      }
      if (shippingAddressType) {
        setError("shippingAddressType", {
          type: "required",
          message: `Address Type is required.`,
        });
      }
      if (
        !isAddNewAddressForm &&
        !shippingAdd &&
        ZipMessage &&
        ZipMessage?.zipSuccess
      ) {
        notify(ZipMessage?.zipMessage, ZipMessage?.zipSuccess);
      }
    }
  };

  const getDefaultAddressDetails = (customer) => {
    reset();
    let addresses = get(customer, "addressBook", []);
    if (addresses && 0 < addresses?.length) {
      let customerDefaultAddress = addresses?.find(
        (address) => address?.defaultAddress
      );
      customerDefaultAddress = customerDefaultAddress || addresses[0];
      const {
        pincode,
        state,
        city,
        addressLine1,
        addressLine2,
        phone,
        lastName,
        firstName,
        addressType,
        country,
        _id,
        defaultAddress,
      } = customerDefaultAddress;
      let defaultAddressInfo = {
        zip: pincode || "",
        state: state || "",
        city: city || "",
        addressLine2: addressLine2 || "",
        address: addressLine1 || "",
        phone: phone || "",
        addressType: addressType || "",
        email: customer?.email || "",
        lastname: lastName || "",
        firstname: firstName || "",
        country: country || "",
        id: _id || "",
        defaultAddress: defaultAddress || false,
      };

      checkCode(get(defaultAddressInfo, "zip"));
      return defaultAddressInfo;
    } else {
      const { email, phone, firstName, lastName } = customer || {};
      return {
        ...billingInfoObject,
        email,
        firstname: firstName,
        lastname: lastName,
        phone,
      };
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
      // if (cart.available) {
      cartItemsList.push(cartProduct);
      // }
    });
    return cartItemsList;
  };
  const removeCoupon = () => {
    if ("authenticated" === session?.status && customerId) {
      dispatch(calculateUserCart(customerId));
    }
  };

  const checkCode = async (code) => {
    try {
      let variable = { zipcode: code.toString() };

      if (code) {
        const { data: result } = await queryWithoutToken(
          CHECK_ZIPCODE,
          variable
        );
        notify(
          get(result, "checkZipcode.message"),
          get(result, "checkZipcode.success")
        );
        setZipMessage({
          ...ZipMessage,
          shipping: shippingAdd,
          zipMessage: get(result, "checkZipcode.message"),
          zipSuccess: get(result, "checkZipcode.success"),
        });
      }
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
  };

  const getBillingData = (val) => {
    setBillingDetails({ ...billingDetails, ...val });
  };

  const getOrderDetailsData = (val) => {
    setBillingDetails({ ...billingDetails, ...val });
  };

  const handleBillingInfo = (e, nm) => {
    if (nm) {
      if (nm === "addressType") {
        if (!shippingAdd) {
          setShippingInfo({
            ...shippingInfo,
            [nm]: e?.value,
          });
        }
        setBillingInfo({ ...billingInfo, [nm]: e?.value });
      } else if (nm === "paymentMethod") {
        setBillingInfo({ ...billingInfo, [nm]: e });
      } else if (nm === "defaultAddress") {
        setBillingInfo({
          ...billingInfo,
          [nm]: get(e, "target.checked", false),
        });
      }
    } else {
      let { name, value } = get(e, "target");
      if (!shippingAdd && name !== "paymentMethod") {
        setShippingInfo({
          ...shippingInfo,
          [name]: value,
        });
      }
      setBillingInfo({ ...billingInfo, [name]: value });
    }
  };
  const handleShippingChange = (e, nm) => {
    if (nm === "addressType") {
      setShippingInfo({
        ...shippingInfo,
        [nm]: e?.value,
      });
      setBillingInfo({ ...billingInfo, [nm]: e?.value });
    } else {
      let { name, value } = get(e, "target");
      setShippingInfo({
        ...shippingInfo,
        [name.slice(8)]: value,
      });
    }
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
      setShippingInfo({ ...billingInfo, ...shippingObject });
      setZipMessage({
        ...ZipMessage,
        zipMessage: "",
        zipSuccess: false,
      });
    } else {
      checkCode(billingInfo?.zip);
      setShippingInfo(billingInfo);
    }

    setShippingAdd(e?.target?.checked);
  };
  const SelectAddressBook = async (address) => {
    const userSession = await getSession();
    let customer = get(userSession, "user.accessToken.customer");
    setIsAddNewAddressForm(false);
    let commonFields = {
      zip: address?.pincode || "",
      state: address?.state || "",
      city: address?.city,
      addressLine2: address?.addressLine2 || "",
      address: address?.addressLine1 || "",
      phone: address?.phone || "",
      email: customer?.email || "",
      lastname: address?.lastName || "",
      firstname: address?.firstName || "",
      country: address?.country || "",
      addressType: address?.addressType || "",
      id: address?._id || "",
      _id: address?._id || "",
      defaultAddress: address?.defaultAddress || false,
    };
    let shipping = commonFields;
    let billing = {
      ...commonFields,
      paymentMethod: address?.paymentMethod,
    };
    if (!shippingAdd) {
      setShippingInfo(shipping);
      if (get(address, "_id") !== get(billingInfo, "_id")) {
        checkCode(get(address, "pincode", ""));
      }
    }
    setBillingInfo(billing);
    reset();
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
  const handlePlacedOrder = async (e) => {
    let paymentMethod = get(billingDetails, "billing.paymentMethod");
    let paymentMode = get(settings, "setting.payment.razorpay.test_mode", "");
    let razorpayKey = "";
    if (paymentMode) {
      razorpayKey = get(
        settings,
        "setting.payment.razorpay.sandbox_client_id",
        ""
      );
    } else {
      razorpayKey = get(
        settings,
        "setting.payment.razorpay.live_client_id",
        ""
      );
    }
    e.preventDefault();
    if (paymentMethod === PAYPAL) {
      setPaymentMethod(paymentMethod);
    } else {
      handleOrderPlaced(
        customerId,
        session,
        setLoading,
        billingDetails,
        dispatch,
        couponCartDetail,
        setBillingDetails,
        router,
        razorpayKey
      );
    }
  };
  const addNewAddress = async () => {
    setLoading(true);
    let billingAddress = get(billingDetails, "billing");
    const {
      firstname,
      lastname,
      address,
      addressLine2,
      city,
      country,
      state,
      phone,
      zip: pincode,
      addressType,
      defaultAddress,
    } = billingAddress;
    let payload = {
      id: customerId,
      firstName: firstname,
      lastName: lastname,
      phone,
      addressLine1: address,
      addressLine2,
      city,
      country,
      state,
      pincode,
      addressType: addressType || "",
      defaultAddress,
    };
    mutation(ADD_ADDRESSBOOK, payload)
      .then(async (response) => {
        setLoading(false);
        const success = get(response, "data.addAddressBook.success");
        const message = get(response, "data.addAddressBook.message");
        const data = get(response, "data.addAddressBook.data");
        if (success) {
          // setAddress(addressObject)
          notify(message, success);
          setBillingInfo({ ...billingInfo, id: data?._id });
          setIsAddNewAddressForm(false);
          nextFormStep();
          await getAddress();
        }
        if (!success) {
          notify(message, success);
        }
      })
      .catch((error) => {
        setLoading(false);
        handleError(error, dispatch, router);
      });
  };
  const updateCustomerAddress = async () => {
    setLoading(true);
    let billingAddress = get(billingDetails, "billing");
    const {
      firstname,
      _id,
      lastname,
      address,
      addressLine2,
      city,
      country,
      state,
      phone,
      zip: pincode,
      addressType,
      defaultAddress,
    } = billingAddress;
    let payload = {
      id: customerId,
      _id: _id,
      firstName: firstname,
      lastName: lastname,
      phone,
      addressLine1: address,
      addressLine2,
      city,
      country,
      state,
      pincode,
      addressType: addressType || "",
      defaultAddress,
    };
    mutation(UPDATE_ADDRESSBOOK, payload)
      .then(async (response) => {
        setLoading(false);
        const success = get(response, "data.updateAddressBook.success");
        const message = get(response, "data.updateAddressBook.message");
        const data = get(response, "data.updateAddressBook.data");
        if (success) {
          // setAddress(addressObject)
          notify(message, success);
          nextFormStep();
          setIsEditAddress(false);
          await getAddress();
        }
        if (!success) {
          notify(message, success);
        }
      })
      .catch((error) => {
        setLoading(false);
        handleError(error, dispatch, router);
      });
  };
  const getAddress = async () => {
    try {
      const { data: customersData } = await query(GET_CUSTOMER_QUERY, {
        id: customerId,
      });
      let customer = get(customersData, "customer.data");
      let addressBook = get(customer, "addressBook", []);
      selectAddressList(addressBook);
      return customer;
    } catch (e) {
      selectAddressList([]);
      return [];
    }
  };
  const getCustomerAddresses = async () => {
    let customer = await getAddress();
    // Get the default address details from the address book
    let defaultAddress = getDefaultAddressDetails(customer);
    // Set default address for billingInfo if not already selected
    if (!checkIsAddressSelected(billingInfo) && !isAddNewAddressForm) {
      setBillingInfo({ ...defaultAddress });
    }
    // Set default address for shippingInfo if not already selected
    if (
      !checkIsAddressSelected(shippingInfo) &&
      !isAddNewAddressForm &&
      !shippingAdd
    ) {
      setShippingInfo({ ...defaultAddress });
    }
  };
  const toggleAddNewAddressForm = () => {
    reset();
    setIsEditAddress(false);
    setIsAddNewAddressForm(true);
    if (!shippingAdd) {
      setShippingInfo({ ...shippingObject });
    }
    setBillingInfo({ ...billingInfoObject });
    setBillingDetails({
      ...billingDetails,
      billing: billingInfoObject,
      shipping: shippingObject,
    });
    if (!shippingAdd) {
      setZipMessage({
        ...ZipMessage,
        zipMessage: "",
        zipSuccess: false,
      });
    } else {
      // checkCode(shippingInfo?.zip);
    }
  };
  const editCustomerAddress = (address) => {
    setIsEditAddress(true);
    setIsAddNewAddressForm(false);
    setBillingInfo({ ...billingInfo, ...address });
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
                  <div className="col-lg-12 first-checkout-page">
                    <div className="first-checkout-page-container">
                      <CustomerDetail
                        addressBook={addressList}
                        toggleAddNewAddressForm={toggleAddNewAddressForm}
                        setBillingInfo={setBillingInfo}
                        SelectAddressBook={SelectAddressBook}
                        billingInfo={billingInfo}
                        shippingInfo={shippingInfo}
                        shippingAdd={shippingAdd}
                        getBillingInfo={getBillingData}
                        editCustomerAddress={editCustomerAddress}
                      />
                      {(isAddNewAddressForm || addressList?.length === 0) && (
                        <h5>Add New Address</h5>
                      )}
                      {isEditAddress && <h5>Edit Address</h5>}
                      <form onSubmit={handleSubmit(onSubmit)}>
                        <BillingDetails
                          isEditAddress={isEditAddress}
                          checkCode={checkCode}
                          setZipMessage={setZipMessage}
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
                          isAddNewAddressForm={isAddNewAddressForm}
                          addressList={addressList}
                        />
                        <button
                          type="submit"
                          className="btn btn-success primary-btn-color checkout-continue-btn"
                        >
                          NEXT
                        </button>
                      </form>
                    </div>
                    {loading && <Loading />}
                    <div className="cupon-cart">
                      <OrderSummary
                        cartLoading={cartLoading}
                        cartItems={cartItems}
                        removeToCart={removeToCart}
                        totalSummary={totalSummary}
                        updateCartProductQuantity={updateCartProductQuantity}
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
                  {paymentMethod === PAYPAL ? (
                    <Paypal
                      customerId={customerId}
                      session={session}
                      setLoading={setLoading}
                      billingDetails={billingDetails}
                      couponCartDetail={couponCartDetail}
                      setBillingDetails={setBillingDetails}
                      setPaymentMethod={setPaymentMethod}
                    />
                  ) : (
                    <div className="col-lg-12 third-container-checkout">
                      <div className="checkout-coupon-container">
                        <ShippingTaxCoupon
                          currency={currency}
                          shippingInfo={shippingInfo}
                          prevFormStep={prevFormStep}
                          shippingAdd={shippingAdd}
                          billingInfo={billingInfo}
                        />
                        {loading && <Loading />}
                        <Orderdetail
                          settings={settings}
                          currency={currency}
                          billingInfo={billingInfo}
                          shippingInfo={shippingInfo}
                          handleBillingInfo={handleBillingInfo}
                          cartItems={cartItems}
                          getOrderDetails={getOrderDetailsData}
                        />
                        <button
                          type="submit"
                          className="btn btn-success primary-btn-color checkout-continue-btn mt-4"
                          onClick={handlePlacedOrder}
                          disabled={!billingInfo.paymentMethod}
                        >
                          PLACE ORDER
                        </button>
                      </div>
                      <div className="checkout-order-summary-container">
                        <OrderSummary
                          cartLoading={cartLoading}
                          cartItems={cartItems}
                          removeToCart={removeToCart}
                          totalSummary={totalSummary}
                          updateCartProductQuantity={updateCartProductQuantity}
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
                  )}
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
                    <Link href="/login">
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
                        setZipMessage={setZipMessage}
                        checkCode={checkCode}
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
              <Link href="/login">
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
