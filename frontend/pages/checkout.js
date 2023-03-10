import { useState, useEffect } from "react";
import { API_BASE_URL as baseUrl } from "../config";
import Link from "next/link";
import client from "../apollo-client";
import { GET_CHECKOUT_DETAILS_BY_USER_ID } from "../queries/checkoutquery"
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
import { APPLY_COUPON_CODE } from "../queries/couponquery";
import { CALCULATE_CART_TOTAL, GET_USER_CART, UPDATE_CART_PRODUCT } from "../queries/cartquery";
import OrderSummary from "../components/checkoutcomponent/CheckOutOrderSummary";
import { query2 } from "../utills/cartHelperfun"
import Stepper from "../components/checkoutcomponent/stepperbar/Stepper";
import { removeCartItemAction } from "../redux/actions/cartAction";
import toast, { Toaster } from 'react-hot-toast';
import { currencySetter } from "../utills/helpers"
import { GET_HOMEPAGE_DATA_QUERY } from "../queries/home";


const notify = (message,success) => {
    if(success){
       return toast.success(message);
    }
    else{
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
    payment_method: "",
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
    payment_method: "",
};

var savedShippingInfo;
const totalCart = product => product.reduce((total, product) => total + (product.pricing.sellprice * product.quantity), 0)

export const CheckOut = ({currencyStore}) => {
    const [shippingToggle,setShippingToggle] = useState();
    const allProducts = useSelector(state => state.products);
    const session = useSession();
    const dispatch = useDispatch();
    const [islogin, setIsLogin] = useState(false)
    const router = useRouter();
    let address_book = [];
    let customer_id = "";
    let token = ""
    const [billingDetails, setBillingDetails] = useState({ customer_id: customer_id || "" });
    useEffect(() => {
        if (session.status === "authenticated") {
            address_book = session?.data?.user.accessToken.customer.address_book
            token = session.data?.user.accessToken.token
            let customer_id = session.data.user.accessToken.customer._id
            setBillingDetails({...billingDetails,customer_id:customer_id})
    
        }
    }, [session,session?.data?.user.accessToken.customer.address_book])


    
    if (session.status === "authenticated") {
        address_book = session?.data?.user.accessToken.customer.address_book
        token = session.data?.user.accessToken.token
        customer_id = session.data.user.accessToken.customer._id

    }


    const cartProducts = useSelector((state) => state.cart);
    const [cartTotal, setCartTotal] = useState(0)
    const [cartItems, setCartItems] = useState([])
    const [couponfield, setCouponFeild] = useState(false);
    const [billingInfo, setBillingInfo] = useState(billingInfoObject);
    const [shippingInfo, setShippingInfo] = useState(shippingObject);
    const [shippingAdd, setShippingAdd] = useState(false);
    const [coupon, setCoupon] = useState("0");
    const [paymentMethod, setPaymentMethod] = useState("");
    const [delivery, setDelivery] = useState("0");
    const [tax_amount, setTax_amount] = useState(0);
    const [showItem, setShowItem] = useState(false);
    const [formStep, setFormStep] = useState(1)
    const [couponCode, setCouponCode] = useState('')
    const [subtotal, setSubTotal] = useState(0);
    const [cartId, setCartId] = useState('');
    const [CouponLoading, setCouponLoading] = useState(false);
    const [isCouponApplied, setIsCouponApplied] = useState(false);
    const [AppliedCoupon, setAppliedCoupon] = useState("");


    const steps = ['Address', 'Shipping', 'Order Detail']

    const nextFormStep = () => setFormStep((currentStep) => currentStep + 1);
    const prevFormStep = () => setFormStep((currentStep) => currentStep - 1);
    const currencyOpt = currencyStore?.currency_options?.currency
    const [currency, setCurrency] = useState("$")
    const decimal = currencyStore?.currency_options?.number_of_decimals
      useEffect(() => {
          currencySetter(currencyOpt,setCurrency);
        }, [])

    useEffect(() => {
        if (session.status === "authenticated") {
            address_book = session?.data?.user.accessToken.customer.address_book
            token = session.data?.user.accessToken.token
            customer_id = session.data.user.accessToken.customer._id
            setIsLogin(true)
        }
    }, [])
    
    // useEffect(() => {
    //     setCartItems(cartProducts)
    // }, [cartProducts])

    useEffect(() => {
        const getProducts = async () => {
           
            const session2 = await getSession();
            const productsCard = JSON.parse(localStorage.getItem("cart"))  
            if (session?.status === "authenticated" || session2 !== null) {
                setIsLogin(true)
                let id = session2.user.accessToken.customer._id;
                let token = session2.user.accessToken.token;
                let variables= { id: id }
                mutation(GET_USER_CART, variables).then(res => {
                    setCartId( res.data.cartbyUser.id)
                    let carts =  res?.data?.cartbyUser?.products;
                    let cartitems2 = [];
                    carts?.map(cart=>{
                        const originalProduct = allProducts?.products?.find(prod => prod._id === cart.product_id);
                        // const cartProduct = {
                        //     _id: cart?.product_id,
                        //     quantity:parseInt(cart?.qty) ,
                        //     name:cart?.product_title,
                        //     pricing: cart?.total,
                        //     feature_image:cart?.product_image
                        // }
                        const cartProduct = {
                            _id: originalProduct?._id,
                            quantity:parseInt(cart?.qty) ,
                            name:originalProduct?.name,
                            pricing: originalProduct?.pricing,
                            feature_image:originalProduct?.feature_image
                        }
                        // setCartItems((prev) => [...prev, cartProduct]) 
                        cartitems2.push(cartProduct);
                    })
                    setCartItems([...cartitems2]) 
                })
            }
            else{
                setCartItems(cartProducts)
            }
        }
        getProducts();
    
}, [cartProducts,allProducts]);



    useEffect(() => {
        let cartsData = cartItems.map((product) => { return { product_id: product._id, qty: product.quantity, total: product?.pricing?.sellprice ? product?.pricing?.sellprice * product.quantity : product?.pricing?.price * product.quantity } })
        let calculate = {
            total_coupon: 0.0,
            cart: cartsData
        }
        query2(CALCULATE_CART_TOTAL, calculate, token).then(res => {
            let response = res.data.calculateCart
            setCartTotal(response?.grand_total)
            setSubTotal(response?.subtotal)
            setCoupon(response?.total_coupon)
            setDelivery(response?.total_shipping.amount)
            setTax_amount(response?.total_tax.amount)
        })
    }, [cartItems])

    const {
        register,
        handleSubmit, reset,
        formState: { errors },
    } = useForm({ mode: "onSubmit", });

    const onSubmit = (data) => {
        nextFormStep()
        // router.push("/orderstatus/paymentfailed")
        // console.log("billingDetails===", billingDetails)
        // dispatch(checkoutDetailAction(billingDetails));
        // mutation(ADD_ORDER, billingDetails, token).then(res => console.log("result", res))
        // console.log("ThankYou for shopping");
        // reset(data);
        // setBillingDetails("");
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

    const getBillingData = (val) => {   
        setBillingDetails({ ...billingDetails, ...val });
    };

    const getOrderDetailsData = (val) => {
        setBillingDetails({ ...billingDetails, ...val });
    };
    const getCalculationDetails = (val) => {
        setBillingDetails({ ...billingDetails, ...val });
    }
    const handleShippingChange = (e) => {
        setShippingInfo({ ...shippingInfo, [e.target.name]: e.target.value });
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

    const shippingAddressToggle = (e) => {
        if (e.target.checked) {
            savedShippingInfo = shippingInfo;
            // setShippingInfo(shippingObject);
            setShippingInfo(shippingToggle);
        } else {
            setShippingInfo(savedShippingInfo);
        }
        setShippingAdd(e.target.checked);
    };


    const SelectAddressBook = (address) => {
        let shipping = {
            shippingzip: address.pincode,
            shippingstate: address.state,
            shippingcity: address.city,
            shippingaddress:address.address_line1 + ", " +address.address_line1,
            shippingaddress_line2: address.address_line1,
            shippingaddress_line1: address.address_line2,
            shippingphone: address.phone,
            shippingcompany: address.company,
            shippingemail: address.email,
            shippinglastname: address.last_name,
            shippingfirstname: address.first_name,
            shippingcountry: address.country,
            shiippingpayment_method: address.payment_method,
        }
        let billing = {
            zip: address.pincode,
            state: address.state,
            city: address.city,
            address:address.address_line1 + ', ' +address.address_line2,
            address_line2: address.address_line1,
            address_line1: address.address_line2,
            phone: address.phone,
            company: address.company,
            email: address.email,
            lastname: address.last_name,
            firstname: address.first_name,
            country: address.country,
        }
        setShippingToggle(shipping);
        if (!shippingAdd) {
            setShippingInfo(shipping);
        }
        // setShippingInfo(shipping);
        setBillingInfo(billing);
        // console.log('billingInfo',billingInfo)
    }

    const doApplyCouponCode = async (e) => {
        e.preventDefault();
        let cart = cartItems.map((product) => { return { product_id: product._id, qty: product.quantity, total: product?.pricing?.sellprice ? product?.pricing?.sellprice * product.quantity : product?.pricing?.price * product.quantity } })
        let variables = {
            coupon_code: `${couponCode}`, cart: cart,
        }
        let couponResponse = 0
        let couponValue = 0.00
        let couponValueGet = false;
        setCouponLoading(true)
        query2(APPLY_COUPON_CODE, variables, token).then(res => {
            couponResponse = res.data.calculateCoupon.total_coupon
            if(res.data.calculateCoupon.success){
                notify(res.data.calculateCoupon.message,true)
                setIsCouponApplied(true)
            }
            else{
                notify(res.data.calculateCoupon.message)
            
            }
            couponValueGet = true;
            if (!res.data.laoding) {
                setCoupon(couponResponse)
                setAppliedCoupon(couponCode)
                setCouponCode("")
                setCouponFeild(true);
            }
            if (couponValueGet) {
                let cartsData = cartItems.map((product) => { return { product_id: product._id, qty: product.quantity, total: product?.pricing?.sellprice ? product?.pricing?.sellprice * product.quantity : product?.pricing?.price * product.quantity } })
                let calculate = {
                    total_coupon: couponResponse,
                    cart: cartsData,
                }

                query2(CALCULATE_CART_TOTAL, calculate, token).then(res => {
                    let response = res.data.calculateCart
                    setCartTotal(response?.grand_total)
                    setSubTotal(response?.subtotal)
                    setCoupon(response?.total_coupon)
                    setDelivery(response?.total_shipping.amount)
                    setTax_amount(response?.total_tax.amount)
                })
            }
        }
        ).finally(()=>  setCouponLoading(false))

    }
    const detailsOfBill=billingDetails
    const handleOrderPlaced = (e) => {
        e.preventDefault();
        // setBillingDetails({...billingDetails,products:[...cartItems]})
        if(billingDetails.billing.payment_method==="stripe") {
            stripeCheckout(billingDetails, cartItems, baseUrl)
        }
        dispatch(checkoutDetailAction(billingDetails));
        mutation(ADD_ORDER, billingDetails, token).then(res => {
            let response = res.data.addOrder.success

            if (response) {
                // billingDetails?.products?.forEach(product => {
                billingDetails.products.forEach(product => {
                    dispatch(removeCartItemAction(product.product_id))
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
                // router.push("/orderstatus/paymentfailed")
                console.log("payment failed")
            }
        }
        )
        // console.log("ThankYou for shopping");
        // setBillingDetails("");
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
                                    <div style={{ padding: "20px" ,maxWidth:"700px" }}>
                                        <CustomerDetail
                                            decimal={decimal}
                                            address_book={address_book}
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
                                                shippingAdd={shippingAdd}
                                                setShippingAdd={setShippingAdd}
                                                handleBillingInfo={handleBillingInfo}
                                                handleShippingChange={handleShippingChange}
                                                shippingAddressToggle={shippingAddressToggle}
                                                registerRef={register}
                                                errorRef={errors}
                                                getBillingInfo={getBillingData} />
                                            <button type="submit" className="btn btn-success" style={{ marginTop: 12, backgroundColor: "#088178", float: "right" }}>Continue</button>
                                        </form>
                                    </div>
                                    <div className="cupon-cart" >
                                        <OrderSummary
                                            decimal={decimal}
                                            currency={currency}
                                            AppliedCoupon={AppliedCoupon}
                                            isCouponApplied={isCouponApplied}
                                            CouponLoading={CouponLoading}Data
                                            cartTotal={cartTotal}
                                            subTotal={subtotal}
                                            coupon={coupon}
                                            delivery={delivery}
                                            tax_amount={tax_amount}
                                            doApplyCouponCode={doApplyCouponCode}
                                            couponCode={couponCode}
                                            setCouponCode={setCouponCode}
                                            getCalculationDetails={getCalculationDetails}
                                        />
                                    </div>
                                </div>
                                {/* <button type="submit" className="btn btn-success" style={{ marginTop: 12, backgroundColor: "#088178", float: "left" }} onClick={prevFormStep}><i className="fas fa-angle-double-left"></i> prev</button> */}

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
                                            currency={currency}
                                            couponCode={couponCode}
                                            setCouponCode={setCouponCode}
                                            coupon={coupon}
                                            setCoupon={setCoupon}
                                            setCouponFeild={setCouponFeild}
                                            tax_amount={tax_amount}
                                            setTax_amount={setTax_amount}
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
                                            CouponLoading={CouponLoading}
                                            currency={currency}
                                            cartTotal={cartTotal}
                                            subTotal={subtotal}
                                            coupon={coupon}
                                            delivery={delivery}
                                            tax_amount={tax_amount}
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
                                        {/* <div className="your-order-container"> */}
                                        <ShippingTaxCoupon
                                            currency={currency}
                                            couponCode={couponCode}
                                            setCouponCode={setCouponCode}
                                            coupon={coupon}
                                            setCoupon={setCoupon}
                                            setCouponFeild={setCouponFeild}
                                            tax_amount={tax_amount}
                                            setTax_amount={setTax_amount}
                                            doApplyCouponCode={doApplyCouponCode}
                                            couponfield={couponfield}
                                            delivery={delivery}
                                            billingInfo={billingInfo}
                                            shippingAdd={shippingAdd}
                                            prevFormStep={prevFormStep}
                                            shippingInfo={shippingInfo}
                                        />
                                        <h5>Your Order Summary</h5>
                                        {/* <form onSubmit={handleSubmit(onSubmit)}> */}
                                        <Orderdetail
                                            decimal={decimal}
                                            currency={currency}
                                            billingDetails={billingDetails}
                                            customer_id={customer_id}
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
                                            tax_amount={tax_amount}
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
                                        <button type="submit" className="btn btn-success" style={{ marginTop: 12, backgroundColor: "#088178", float: "right" }} onClick={handleOrderPlaced} disabled={!billingInfo.payment_method}>Continue </button>
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
                                            tax_amount={tax_amount}
                                            doApplyCouponCode={doApplyCouponCode}
                                            couponCode={couponCode}
                                            setCouponCode={setCouponCode}
                                            getCalculationDetails={getCalculationDetails}
                                        />
                                    </div>
                                </div>
                                {/* </div> */}

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
                            {/* <OrdersDetails
                                billingInfo={billingInfo}
                                shippingInfo={billingInfo}
                                orderDetail={cartItems}
                                CalculateProductTotal={CalculateProductTotal}
                                subtotal={billingDetails.subtotal}
                                total={billingDetails.total}
                            /> */}
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
                                <h3>Please Login First Ravendel</h3>
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

export async function getStaticProps(){
    var currencyStore =[];
    try {
        const { data: homepagedata } = await client.query({
            query: GET_HOMEPAGE_DATA_QUERY
        })
        currencyStore = homepagedata?.getSettings?.store
    }
    catch (e) {
        console.log("homepage Error===", e.networkError && e.networkError.result ? e.networkError.result.errors : '');
    }
    return{
        props:{
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
//     let user_id = session?.user?.accessToken?.customer._id
//     var checkoutDetail = {};
//     try {
//         const { data: checkoutData } = await client.query({
//             query: GET_CHECKOUT_DETAILS_BY_USER_ID,
//             variables: { user_id }
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