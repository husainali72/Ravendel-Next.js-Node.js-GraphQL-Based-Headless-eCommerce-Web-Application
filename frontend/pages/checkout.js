import { useState, useEffect } from "react";
import { API_BASE_URL as baseUrl } from "../config";
import Link from "next/link";
import client from "../apollo-client";
import { GET_CHECKOUT_DETAILS_BY_userId } from "../queries/checkoutquery"
import BreadCrumb from "../components/breadcrumb/breadcrumb";
import { Container, Button, Form } from "react-bootstrap";
import { useSelector, useDispatch } from "react-redux";
import BillingDetails from "../components/checkoutcomponent/BillingDetail";
import Orderdetail from "../components/checkoutcomponent/OrderDetail";
import { useForm } from 'react-hook-form';
import { checkoutDetailAction } from "../redux/actions/checkoutAction";
import { loadStripe } from "@stripe/stripe-js"
import CustomerDetail from "../components/checkoutcomponent/CustomerDetails";
import { getSession, useSession } from "next-auth/react";
import ShippingTaxCoupon from "../components/checkoutcomponent/ShippingTaxCoupon";
import OrdersDetails from "../components/account/component/orders-details";
import { mutation, query, stripeCheckout } from "../utills/helpers";
import { ADD_ORDER } from "../queries/orderquery";
import CreditCards from "../components/checkoutcomponent/myCard/CreditCards";
import { useRouter } from "next/router";
import Stripes from "../components/checkoutcomponent/reactstripe/StripeContainer";
import { APPLY_COUPON_CODE, APPLY_couponCode } from "../queries/couponquery";
import { CALCULATE_CART_TOTAL, CALCULATE_cartTotal, GET_USER_CART, UPDATE_CART_PRODUCT } from "../queries/cartquery";
import OrderSummary from "../components/checkoutcomponent/CheckOutOrderSummary";
import { query2 } from "../utills/cartHelperfun"
import Stepper from "../components/checkoutcomponent/stepperbar/Stepper";
import { removeCartItemAction } from "../redux/actions/cartAction";
import toast, { Toaster } from 'react-hot-toast';
import { currencySetter } from "../utills/helpers"
import { GET_HOMEPAGE_DATA_QUERY } from "../queries/home";
import { CHECK_ZIPCODE } from "../queries/productquery";


const notify = (message, success) => {
    if (success) {
        return toast.success(message);
    }
    else {
        return toast.error(message);
    }
}
const CalculateProductTotal = product => product.reduce((total, product) => total + (product.cost * product.qty), 0)

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
    transaction_id: ""

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
const totalCart = product => product.reduce((total, product) => total + (product.pricing.sellprice * product.quantity), 0)

export const CheckOut = ({ currencyStore }) => {
    const allProducts = useSelector(state => state.products);
    const session = useSession();
    const dispatch = useDispatch();
    const [islogin, setIsLogin] = useState(false)
    const router = useRouter();
    let address_book = [];
    let customerId = "";
    let token = ""
    const [billingDetails, setBillingDetails] = useState({ userId: customerId || "" });
    useEffect(() => {
        if (session.status === "authenticated") {

            address_book = session?.data?.user.accessToken.customer.address_book
            token = session.data?.user.accessToken.token
            let customerId = session.data.user.accessToken.customer._id
            setBillingDetails({ ...billingDetails, userId: customerId })

        }
    }, [session, session?.data?.user.accessToken.customer.addressBook
    ])


    if (session.status === "authenticated") {

        address_book = session?.data?.user.accessToken.customer.addressBook

        token = session.data?.user.accessToken.token
        customerId = session.data.user.accessToken.customer._id

    }

    const cartProducts = useSelector((state) => state.cart);
    const [cartTotal, setCartTotal] = useState(0)
    const [grandTotal, setgrandTotal] = useState(0)
    const [cartItems1, setCartItems1] = useState([])
    const [cartItems, setCartItems] = useState([])
    const [couponfield, setCouponFeild] = useState(false);
    const [billingInfo, setBillingInfo] = useState(billingInfoObject);
    const [shippingInfo, setShippingInfo] = useState(shippingObject);
    const [shippingAdd, setShippingAdd] = useState(false);
    const [coupon, setCoupon] = useState("0");
    const [paymentMethod, setPaymentMethod] = useState("");
    const [delivery, setDelivery] = useState("0");
    const [taxAmount, settaxAmount] = useState('0');
    const [showItem, setShowItem] = useState(false);
    const [formStep, setFormStep] = useState(1)
    const [couponCode, setCouponCode] = useState('')
    const [subtotal, setSubTotal] = useState('0');
    const [cartId, setCartId] = useState('');
    const [CouponLoading, setCouponLoading] = useState(false);
    const [isCouponApplied, setIsCouponApplied] = useState(false);
    const [AppliedCoupon, setAppliedCoupon] = useState("");
    const steps = ['Address', 'Shipping', 'Order Detail']
    const nextFormStep = () => setFormStep((currentStep) => currentStep + 1);
    const prevFormStep = () => setFormStep((currentStep) => currentStep - 1);
    const currencyOpt = currencyStore?.currency_options?.currency
    const [currency, setCurrency] = useState("$")
    const [ZipMessage, setZipMessage] = useState("");
    const decimal = currencyStore?.currency_options?.number_of_decimals
    useEffect(() => {
        currencySetter(currencyOpt, setCurrency);
    }, [])


    useEffect(() => {
        if (session.status === "authenticated") {
            address_book = session?.data?.user.accessToken.customer.addressBook
            token = session.data?.user.accessToken.token
            customerId = session.data.user.accessToken.customer._id
            setIsLogin(true)
        }
    }, [])
    useEffect(() => {
        const getProducts = async () => {

            const session2 = await getSession();
            const productsCard = JSON.parse(localStorage.getItem("cart"))
            if (session?.status === "authenticated" || session2 !== null) {
                setIsLogin(true)
                let id = session2.user.accessToken.customer._id;
                let token = session2.user.accessToken.token;
                let variables = { id: id }
                mutation(GET_USER_CART, variables).then(res => {
                    setCartId(res?.data?.cartbyUser?.id)
                    let carts = res?.data?.cartbyUser;
                    let cartitems2 = [];
                    carts?.availableItem?.map(cart => {
                        const originalProduct = allProducts?.products?.find(prod => prod._id === cart.productId);
                        const orginal_attributes = originalProduct?.variation_master?.find(prod => prod.id === cart.variantId)
                        // console.log(orginal_attributes, 'originalProduct', originalProduct, cart.variantId)

                        if (originalProduct) {
                            const cartProduct = {}
                            if (orginal_attributes) {
                                cartProduct = {
                                    _id: originalProduct?._id,
                                    variantId: cart?.variantId,
                                    quantity: parseInt(cart?.qty),
                                    productQuantity: parseInt(orginal_attributes?.quantity),
                                    name: originalProduct?.name,
                                    pricing: (orginal_attributes?.pricing
                                        ?.sellprice * cart?.qty),
                                    feature_image: orginal_attributes?.productImage
                                        || orginal_attributes?.feature_image,
                                    url: originalProduct?.url,
                                    attributes: cart.attributes || [],
                                    shippingClass: originalProduct?.shipping?.shippingClass,
                                    taxClass: originalProduct?.taxClass,
                                }
                            }
                            else {

                                cartProduct = {

                                    _id: originalProduct?._id,
                                    variantId: cart?.variantId,
                                    quantity: parseInt(cart?.qty),
                                    productQuantity: parseInt(originalProduct?.quantity),

                                    name: originalProduct?.name,
                                    pricing: (originalProduct?.pricing
                                        ?.sellprice * cart?.qty),
                                    feature_image: originalProduct?.productImage
                                        || originalProduct?.feature_image,
                                    url: originalProduct?.url,
                                    attributes: cart?.attributes || [],
                                    shippingClass: originalProduct?.shipping?.shippingClass,
                                    taxClass: originalProduct?.taxClass,
                                }

                            }
                            cartitems2.push(cartProduct);
                        }
                    })
                    // carts?.map(cart => {
                    //     const originalProduct = allProducts?.products?.find(prod => prod._id === cart.productId);
                    //     const cartProduct = {
                    //         _id: originalProduct?._id,
                    //         quantity: parseInt(cart?.qty),
                    //         name: originalProduct?.name,
                    //         pricing: cart?.productPrice || originalProduct?.pricing,
                    //         feature_image: originalProduct?.feature_image,
                    //         url: originalProduct?.url,
                    //         taxClass: originalProduct?.taxClass,
                    //         shippingClass: originalProduct?.shipping?.shippingClass,
                    //         attributes: cart.attributes
                    //     }
                    //     cartitems2.push(cartProduct);
                    // })
                    setCartItems([...cartitems2])
                })
            }
            else {
                setCartItems(cartProducts)
            }
        }
        getProducts();
    }, [cartProducts, allProducts]);
    useEffect(() => {
        const checkCart = async () => {
            const session2 = await getSession();
            if (session?.status === "authenticated" || session2 !== null) {
                setIsLogin(true)
                let id = session2.user.accessToken.customer._id;
                let token = session2.user.accessToken.token;
                let variables = { id: id }
                mutation(GET_USER_CART, variables).then(res => {
                    let carts = res?.data?.cartbyUser?.cartItem;
                    if (carts?.length <= 0) {
                        router.push("/")
                    }
                })
            }
        }
        checkCart();
    }, []);
    useEffect(() => {

        let cartsData = cartItems.map((product) => {
            return {
                productId: product._id, qty: product.quantity, total: product?.pricing * product.quantity, variantId: product?.variantId

            }
        })
        let calculate = {
            // total_coupon: '0.0',
            cartItem: cartsData
        }
        if (cartsData.length > 0) {
            query2(CALCULATE_CART_TOTAL, calculate, token).then(res => {

                let response = res?.data?.calculateCart
                setCartItems1([...response.cartItem])
                setgrandTotal(response?.grandTotal && !isNaN(response?.grandTotal) ? response?.grandTotal : '0')
                setCartTotal(response?.grandTotal && !isNaN(response?.grandTotal) ? response?.grandTotal : '0')
                setSubTotal(response?.cartTotal && !isNaN(response?.cartTotal) ? response?.cartTotal : '0')
                // setCoupon(response?.total_coupon)
                setDelivery(response?.totalShipping && !isNaN(response?.totalShipping) ? response?.totalShipping : '0')
                settaxAmount(response?.totalTax && !isNaN(response?.totalTax) ? response?.totalTax : '0')
            })
        }
    }, [cartItems])
    const {
        register,
        handleSubmit, reset,
        formState: { errors },
        control
    } = useForm({ mode: "onSubmit", });
    const onSubmit = (data) => {
        if (ZipMessage && ZipMessage.zipSuccess) { nextFormStep() }
    };
    const handleBillingInfo = (e) => {
        if (!shippingAdd) {
            setShippingInfo({
                ...shippingInfo,
                [e.target.name]: e.target.value,
            });
        }
        setBillingInfo({ ...billingInfo, [e.target.name]: e.target.value })

    };
    const handleZipCode = (e) => {
        if (!shippingAdd) {
            setShippingInfo({
                ...shippingInfo,
                [e.target.name]: e.target.value,
            });
        }
        setBillingInfo({ ...billingInfo, [e.target.name]: e.target.value })
        const checkCode = async () => {
            try {
                const { data: result } = await client.query({
                    query: CHECK_ZIPCODE,

                    variables: { zipcode: e.target.value.toString() }
                });
                setZipMessage({ ...ZipMessage, zipMessage: result.checkZipcode.message, zipSuccess: result.checkZipcode.success })
            } catch (e) {
                console.log('ZipCode error ==>', e.networkError && e.networkError.result ? e.networkError.result.errors : '')
            }
        }
        checkCode();

    };

    const getBillingData = (val) => {

        setBillingDetails({ ...billingDetails, ...val });

    };

    const getOrderDetailsData = (val) => {
        setBillingDetails({ ...billingDetails, ...val });
    };
    const getCalculationDetails = (val) => {
        val.cartTotal = val.subtotal
        // if (val.discountGrandTotal) { val.grandTotal = val.discountGrandTotal }
        delete val.subtotal
        // let data = { ...val, cart_total: val.subTotal }
        setBillingDetails({ ...billingDetails, ...val });
    }
    const handleShippingChange = (e) => {
        setShippingInfo({ ...shippingInfo, [e.target.name.slice(8)]: e.target.value });
    };
    const handlePhoneInput = (name, value) => {
        if (!shippingAdd) {
            setShippingInfo({
                ...shippingInfo,
                [name]: value,
            });
        }
        setBillingInfo({ ...billingInfo, [name]: value })
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
        let shipping = {
            zip: address.pincode,
            state: address.state,
            city: address.city,
            address: address.addressLine1 + ', ' + address.addressLine2,
            addressLine2: address.addressLine1,
            addressLine1: address.addressLine2,
            phone: address.phone,
            company: address.company,
            email: address.email,
            lastname: address.lastName,
            firstname: address.firstName,
            country: address.country,
            payment_method: address.paymentMethod,
        }
        let billing = {
            zip: address.pincode,
            state: address.state,
            city: address.city,
            address: address.addressLine1 + ', ' + address.addressLine2,
            addressLine2: address.addressLine1,
            addressLine1: address.addressLine2,
            phone: address.phone,
            company: address.company,
            email: address.email,
            lastname: address.lastName,
            firstname: address.firstName,
            country: address.country,
        }
        if (!shippingAdd) {
            setShippingInfo(shipping);
        }
        const checkCode = async () => {
            try {
                const { data: result } = await client.query({
                    query: CHECK_ZIPCODE,
                    variables: { zipcode: address?.pincode?.toString() }
                });
                setZipMessage({ ...ZipMessage, zipMessage: result.checkZipcode.message, zipSuccess: result.checkZipcode.success })
            } catch (e) {
                console.log('ZipCode error ==>', e.networkError && e.networkError.result ? e.networkError.result.errors : '')
            }
        }
        checkCode();
        setBillingInfo(billing);
    }

    const doApplyCouponCode = async (e) => {
        e.preventDefault();


        let cart = cartItems1.map((product) => {
            return {
                productId: product.productId,
                qty: product.qty,
                productTotal: (product?.productPrice * product.qty).toString(),
                productImage: product?.productImage,
                productTitle: product?.productTitle,
                productShipping: product?.productShipping,
                productTax: product?.productTax,
                productPrice: product?.productPrice?.toString(),

                variantId: product?.variantId
            }
        })
        console.log(cartItems, 'cartItems')

        let variables = {
            couponCode: `${couponCode}`,
            cartItem: cart,
            totalShipping: delivery,
            grandTotal: grandTotal,
            totalTax: taxAmount,
            cartTotal: subtotal
        }
        let couponResponse = 0
        let couponValue = 0.00
        let couponValueGet = false;
        setCouponLoading(true)
        query2(APPLY_COUPON_CODE, variables, token).then(res => {

            couponResponse = res?.data?.calculateCoupon
            if (res?.data?.calculateCoupon.success) {
                setBillingDetails((previousDetails) => ({ ...previousDetails, couponCode: couponCode }))
                notify(res?.data?.calculateCoupon?.message, true)
                setIsCouponApplied(true)
            }
            else {
                notify(res?.data?.calculateCoupon?.message)
                if (isCouponApplied) {
                    setIsCouponApplied(false)
                }
            }
            couponValueGet = true;
            if (!res?.data?.laoding) {
                // couponResponse?.grandTotal && !isNaN(couponResponse?.grandTotal) && !couponResponse?.discountGrandTotal ? couponResponse?.grandTotal : (couponResponse?.discountGrandTotal && !isNaN(couponResponse?.discountGrandTotal) ? couponResponse?.discountGrandTotal : "0")
                let grandTotal = couponResponse?.discountGrandTotal ? couponResponse?.discountGrandTotal : couponResponse?.grandTotal
                setCoupon(couponResponse?.totalCoupon && !isNaN(couponResponse?.totalCoupon) ? couponResponse?.totalCoupon : "0")
                setAppliedCoupon(couponCode)
                setCartTotal(!isNaN(grandTotal) ? grandTotal : '0')
                setgrandTotal(!isNaN(couponResponse?.grandTotal) ? couponResponse?.grandTotal : '0')
                setSubTotal(couponResponse?.cartTotal && !isNaN(couponResponse?.cartTotal) ? couponResponse?.cartTotal : '0')
                // setCoupon(couponResponse?.total_coupon)
                setDelivery(couponResponse?.totalShipping && !isNaN(couponResponse?.totalShipping) ? couponResponse?.totalShipping : '0')
                settaxAmount(couponResponse?.totalTax && !isNaN(couponResponse?.totalTax) ? couponResponse?.totalTax : '0')
                setCouponCode("")
                setCouponFeild(true);
            }

            // if (couponValueGet) {
            //     let cartsData = cartItems.map((product) => { return { product_id: product._id, qty: product.quantity, total: product?.pricing?.sellprice ? product?.pricing?.sellprice * product.quantity : product?.pricing?.price * product.quantity } })
            //     let calculate = {
            //         total_coupon: couponResponse,
            //         cart: cartsData,
            //     }

            //     query2(CALCULATE_CART_TOTAL, calculate, token).then(res => {
            //         let response = res.data.calculateCart
            //         setCartTotal(response?.grand_total)
            //         setSubTotal(response?.cart_total)
            //         setCoupon(couponResponse)
            //         setDelivery(response?.total_shipping)
            //         setTax_amount(response?.total_tax)
            //     })
            // }

        }
        ).finally(() => setCouponLoading(false))

    }

    const detailsOfBill = billingDetails
    const handleOrderPlaced = (e) => {
        e.preventDefault();
        if (billingDetails.billing.payment_method === "stripe") {
            stripeCheckout(billingDetails, cartItems, baseUrl)
        }
        dispatch(checkoutDetailAction(billingDetails));

        mutation(ADD_ORDER, billingDetails, token).then(res => {
            let response = res.data.addOrder.success

            if (response) {
                billingDetails.products.forEach(product => {
                    dispatch(removeCartItemAction(product.productId))
                })
                if (session.status === "authenticated") {
                    let id = session.data.user.accessToken.customer._id
                    let token = session.data.user.accessToken.token


                    let variables = {
                        id: cartId,
                        products: [],
                        total: 0
                    }

                    mutation(UPDATE_CART_PRODUCT, variables, token).then(res => console.log("delet res while auth ", res))

                }

                setBillingDetails("")
                router.push("/orderstatus/thankyou")

            }
            if (!response) {
                console.log("payment failed")
            }
        }
        )
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
                                    <Stepper
                                        activeStep={formStep}
                                        steps={steps}
                                    />
                                    <div className="col-lg-12 first-checkout-page">
                                        <div style={{ padding: "20px", maxWidth: "700px" }}>

                                            <CustomerDetail
                                                decimal={decimal}
                                                addressBook={address_book}
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
                                                    decimal={decimal}
                                                    coupon={coupon}
                                                    setCoupon={setCoupon}
                                                    setCouponFeild={setCouponFeild}
                                                    couponfield={couponfield}
                                                    prevFormStep={prevFormStep}
                                                    nextFormStep={nextFormStep}
                                                    billingInfo={billingInfo}
                                                    setBillingInfo={setBillingInfo}
                                                    shippingInfo={shippingInfo}
                                                    setShippingInfo={setShippingInfo}
                                                    handlePhoneInput={handlePhoneInput}
                                                    handleShippingPhone={handleShippingPhone}
                                                    shippingAdd={shippingAdd}
                                                    setShippingAdd={setShippingAdd}
                                                    handleBillingInfo={handleBillingInfo}
                                                    handleShippingChange={handleShippingChange}
                                                    shippingAddressToggle={shippingAddressToggle}
                                                    registerRef={register}
                                                    errorRef={errors}
                                                    getBillingInfo={getBillingData} />

                                                <button type="submit" className="btn btn-success" style={{ marginTop: 12, backgroundColor: "#088178", float: "right" }} >Continue</button>
                                            </form>
                                        </div>
                                        <div className="cupon-cart" >
                                            <OrderSummary
                                                decimal={decimal}
                                                currency={currency}
                                                AppliedCoupon={AppliedCoupon}
                                                isCouponApplied={isCouponApplied}
                                                CouponLoading={CouponLoading} Data
                                                cartTotal={cartTotal}
                                                subTotal={subtotal}
                                                coupon={coupon}
                                                delivery={delivery}
                                                taxAmount={taxAmount}
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
                )
            case 2:
                return (
                    <>
                        <Toaster />
                        <div>
                            <BreadCrumb title={"checkout"} />
                            <section className="checkout-section">
                                <Container>
                                    <Stepper
                                        activeStep={formStep}
                                        steps={steps}
                                    />
                                    <div className="col-lg-12" style={{ display: 'flex' }}>
                                        <div style={{ width: "60%", padding: "20px" }}>
                                            <ShippingTaxCoupon

                                                couponCode={couponCode}
                                                setCouponCode={setCouponCode}
                                                coupon={coupon}
                                                setCoupon={setCoupon}
                                                setCouponFeild={setCouponFeild}
                                                taxAmount={taxAmount}
                                                settaxAmount={settaxAmount}
                                                doApplyCouponCode={doApplyCouponCode}
                                                couponfield={couponfield}
                                                delivery={delivery}
                                                billingInfo={billingInfo}
                                                shippingAdd={shippingAdd}
                                                prevFormStep={prevFormStep}
                                                shippingInfo={shippingInfo}
                                            />
                                            {/* <button className="btn btn-success" style={{ marginTop: 12, backgroundColor: "#088178", float: "left" }} onClick={prevFormStep}><i className="fas fa-angle-double-left"></i> prev</button> */}
                                            <button className="btn btn-success" style={{ marginTop: 12, backgroundColor: "#088178", float: "right" }} onClick={nextFormStep}>Continue</button>
                                        </div>
                                        <div style={{ width: "40%", borderLeft: "2px solid whitesmoke", padding: "20px" }}>
                                            <OrderSummary
                                                AppliedCoupon={AppliedCoupon}
                                                isCouponApplied={isCouponApplied}
                                                decimal={decimal}
                                                CouponLoading={CouponLoading}
                                                currency={currency}
                                                cartTotal={cartTotal}
                                                subTotal={subtotal}
                                                coupon={coupon}
                                                delivery={delivery}
                                                taxAmount={taxAmount}
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
                )
            case 3:
                return (
                    <>
                        <Toaster />
                        <div>
                            <BreadCrumb title={"checkout"} />
                            <section className="checkout-section">
                                <Container>
                                    <Stepper
                                        activeStep={formStep}
                                        steps={steps}
                                    />
                                    <div className="col-lg-12" style={{ display: 'flex' }}>
                                        <div style={{ width: "60%", padding: "20px" }}>

                                            <ShippingTaxCoupon
                                                currency={currency}
                                                couponCode={couponCode}
                                                setCouponCode={setCouponCode}
                                                coupon={coupon}
                                                setCoupon={setCoupon}
                                                setCouponFeild={setCouponFeild}
                                                taxAmount={taxAmount}
                                                settaxAmount={settaxAmount}
                                                doApplyCouponCode={doApplyCouponCode}
                                                couponfield={couponfield}
                                                delivery={delivery}
                                                billingInfo={billingInfo}
                                                shippingAdd={shippingAdd}
                                                prevFormStep={prevFormStep}
                                                shippingInfo={shippingInfo}
                                            />
                                            <h5>Your Order Summary</h5>
                                            <Orderdetail
                                                decimal={decimal}
                                                currency={currency}
                                                billingDetails={billingDetails}
                                                customerId={customerId}
                                                billingInfo={billingInfo}
                                                shippingInfo={shippingInfo}
                                                setBillingInfo={setBillingInfo}
                                                handleBillingInfo={handleBillingInfo}
                                                cartItems={cartItems}
                                                getOrderDetails={getOrderDetailsData}
                                                paymentMethod={paymentMethod}
                                                setPaymentMethod={setPaymentMethod}
                                                setCoupon={setCoupon}
                                                CalculateProductTotal={CalculateProductTotal}
                                                cartTotal={cartTotal}
                                                subTotal={subtotal}
                                                coupon={coupon}
                                                delivery={delivery}
                                                taxAmount={taxAmount}
                                            />
                                            {/* </form> */}
                                            {billingInfo.payment_method === "stripe" &&
                                                <Stripes
                                                    getOrderDetailsData={getOrderDetailsData}
                                                    billingInfo={billingInfo}
                                                    setBillingInfo={setBillingInfo}
                                                    detailsOfBill={billingDetails}
                                                    cartItems={cartItems}
                                                />
                                            }

                                            <button type="submit" className="btn btn-success" style={{ marginTop: 12, backgroundColor: "#088178", float: "right" }} onClick={handleOrderPlaced} disabled={!billingInfo.paymentMethod}>Continue </button>
                                        </div>
                                        <div style={{ width: "40%", borderLeft: "2px solid whitesmoke", padding: "20px" }}>
                                            <OrderSummary
                                                decimal={decimal}
                                                currency={currency}
                                                AppliedCoupon={AppliedCoupon}
                                                isCouponApplied={isCouponApplied}
                                                CouponLoading={CouponLoading}
                                                cartTotal={cartTotal}
                                                subTotal={subtotal}
                                                coupon={coupon}
                                                delivery={delivery}
                                                taxAmount={taxAmount}
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
                )
            default:
                <p>Nothing to do</p>
        }
    }

    return (
        <div>
            <BreadCrumb title={"checkout"} />
            <section className="checkout-section">
                {islogin && cartItems && cartItems?.length > 0 ?
                    (
                        <Container>
                            <div className="account-coupon-box row">
                                <div className="account-check col-md-6">
                                    <div className="toggle-info">
                                        <p><i class="far fa-user"></i> Already have an account ? <Link href="/account"><a >Click here to login</a></Link></p>
                                    </div>
                                </div>
                                <div className="apply-coupon col-md-6">
                                    <div className="toggle-info">
                                        <p><i className="far fa-envelope-open"></i> Have a coupon? <a href="#" value={couponfield} onClick={() => setCouponFeild(!couponfield)}>Apply Coupon</a></p>
                                        {couponfield ? <div>
                                            <input type="text" value={coupon} onChange={(e) => setCoupon(e.target.value)} />
                                            <Button variant="success" onClick={() => setCouponFeild(!couponfield)}>Apply</Button>{' '}
                                        </div> : null}
                                    </div>
                                </div>

                            </div>
                            <hr style={{ borderTop: '4px solid #bbb', width: "100%" }} className="mt-50 mb-50 devider" />
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
                                                    coupon={coupon}
                                                    setCoupon={setCoupon}
                                                    setCouponFeild={setCouponFeild}
                                                    couponfield={couponfield}
                                                    prevFormStep={prevFormStep}
                                                    nextFormStep={nextFormStep}
                                                    billingInfo={billingInfo}
                                                    setBillingInfo={setBillingInfo}
                                                    shippingInfo={shippingInfo}
                                                    setShippingInfo={setShippingInfo}
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
                                                    billingInfo={billingInfo}
                                                    handleBillingInfo={handleBillingInfo}
                                                    cartItems={cartItems}
                                                    getOrderDetails={getOrderDetailsData}
                                                    delivery={delivery}
                                                    setDelivery={setDelivery}
                                                    paymentMethod={paymentMethod}
                                                    setPaymentMethod={setPaymentMethod}
                                                    coupon={coupon}
                                                    setCoupon={setCoupon}
                                                />
                                            </div>
                                        </div>
                                    </div>
                                    <button type="submit" className="btn btn-success" style={{ marginTop: 12, backgroundColor: "#088178" }}>Place Order</button>
                                </form>
                            </div>
                        </Container>

                    ) : (
                        <Container className="empty-checkout-page" >
                            <div style={{ display: 'flex', justifyContent: 'center' }}>
                                <h3>Please Login First</h3>
                            </div>
                            <div style={{ display: 'flex', justifyContent: 'center' }}>
                                <Link href="/account">
                                    <button type="button" className="btn btn-success" style={{ marginTop: 12, backgroundColor: "#088178" }}>login</button>
                                </Link>
                            </div>

                        </Container>
                    )
                }
            </section>
        </div>
    )
}
export default CheckOut;

export async function getStaticProps() {
    var currencyStore = [];
    try {
        const { data: homepagedata } = await client.query({
            query: GET_HOMEPAGE_DATA_QUERY
        })
        currencyStore = homepagedata?.getSettings?.store
    }
    catch (e) {
        console.log("homepage Error===", e.networkError && e.networkError.result ? e.networkError.result.errors : '');
    }
    return {
        props: {
            currencyStore
        },
        revalidate: 10
    }
}


// const PUBLIC_KEY = 'pk_test_51KxU9XSAiF6cVz0nqNPdRsLq9hcWymfFXE2PBNKN0DmRl921J3EBNfzBydyh7RAxiqvQ5hpskCHGmDp5EcTPSfry00DOYmRxnT'

// const stripeTestPromise = loadStripe(PUBLIC_KEY)

// export default function StripeContainer() {
//     return (
//         <Elements stripe={stripeTestPromise}>
//             <CheckOut />
//         </Elements>
//     )
// }
// export async function getServerSideProps(context) {
//     const session = await getSession(context)
//     // console.log("session", session);
//     let userId = session?.user?.accessToken?.customer._id
//     var checkoutDetail = {};
//     try {
//         const { data: checkoutData } = await client.query({
//             query: GET_CHECKOUT_DETAILS_BY_userId,
//             variables: { userId }
//         });
//         checkoutDetail = checkoutData.checkoutbyUser
//         console.log("checkout", checkoutDetail);

//     } catch (e) {
//         console.log("Error===", e)
//     }
//     return {
//         props: {
//             checkoutDetail
//         }
//     }
// }