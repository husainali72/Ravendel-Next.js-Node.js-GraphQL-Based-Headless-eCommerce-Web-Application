/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { Container, Row, Col } from "react-bootstrap";
import Form from 'react-bootstrap/Form'
import BreadCrumb from "../components/breadcrumb/breadcrumb";
import { useSelector, useDispatch } from "react-redux";
import CartTable from "../components/cardcomponent/CardDetail";
import { removeCartItemAction, increaseQuantity } from "../redux/actions/cartAction";
import { currencySetter, getPrice, mutation } from "../utills/helpers";
import { DELETE_CART_PRODUCTS, UPDATE_CART_PRODUCT, GET_USER_CART } from "../queries/cartquery";
import client from "../apollo-client";
import { useSession, getSession } from "next-auth/react";
// import { APPLY_couponCode } from "../queries/couponquery";

const CalculateProductTotal = product => product.reduce((total, product) => total + (product.pricing.sellprice * product.quantity) || product.pricing?.price * product.quantity, 0)

const YourCard = ({ customercart, cart_id }) => {
    const session = useSession();
    const cartProducts = useSelector(state => state.cart);
    const usercart = useSelector(state => state.userCart);
    const initialRender = useRef(true);
    const settings = useSelector(state => state.setting)
    const currencyType = settings.currencyOption
    const [cartItems, setCartItems] = useState([]);
    const [quantity, setQuantity] = useState();
    const dispatch = useDispatch();
    const [press, setPress] = useState(false);
    const [couponCode, setCouponCode] = useState("")
    var id = ""
    var token = ""
    const [currency, setCurrency] = useState("$")
    const [decimal, setdecimal] = useState(2)
    useEffect(() => {
        setdecimal(settings.currencyOption.number_of_decimals)
        currencySetter(settings, setCurrency);
    }, [settings?.currencyOption])
    useEffect(() => {
        if (session.status === "authenticated") {
            if (initialRender.current) {
                initialRender.current = false;
                {
                    customercart && customercart?.length > 0 ? (
                        setCartItems(customercart || [])
                    ) : setCartItems(cartProducts || [])
                }
                setCartItems(cartProducts || [])
            } else {
                setCartItems(cartProducts)
            }
        }
        else {
            setCartItems(cartProducts)
        }

    }, [cartProducts])

    useEffect(async () => {
        const productsCard = JSON.parse(localStorage.getItem("cart"))
        if (session?.status === "authenticated") {
            id = session.data.user.accessToken.customer._id
            token = session.data.user.accessToken.token
            var carts = [];
            try {
                const { data: CartsData } = await client.query({
                    query: GET_USER_CART,
                    variables: { id: id }
                })
                carts = CartsData.cartbyUser
                let cartitems = carts.products.map(product => {
                    return {
                        _id: product.productId,
                        name: product.productTitle,
                        pricing: {
                            sellprice: product.productPrice
                        },
                        feature_image: { thumbnail: product.productImage },
                        quantity: product.qty
                    }
                })
            }
            catch (e) {
                console.log("error==", e)
            }
        }
        else {
            setCartItems(productsCard || []);
        }
    }, [])

    const AllCartItemsClear = () => {
        setCartItems([])
        let variables = {
            id: usercart.card_id,
            products: [],
            total: 0
        }
        var token = ""
        if (session.status === "authenticated") {
            token = session.data.user.accessToken.token
            mutation(UPDATE_CART_PRODUCT, variables, token).then(res => console.log("res", res))
        }
        localStorage.setItem("cart", JSON.stringify([]))
        // dispatch(RemoveAllCartItemsAction([]));
    }
    const DecreaseQuantity = (item) => {
        if (item.quantity > 1) {
            item.quantity -= 1;
            setQuantity(item.quantity)
            // dispatch(decreaseQuantity(item._id))
        }
    }
    const IncreaseQuantity = (item) => {
        item.quantity += 1;
        setQuantity(item.quantity)
        dispatch(increaseQuantity(item._id))
    }
    const removeToCart = async (item) => {
        let product = item._id
        let token = ""
        if (session.status === "authenticated") {
            token = session.data.user.accessToken.token
            let variables = {
                id: usercart.card_id,
                productId: item._id,
            }
            mutation(DELETE_CART_PRODUCTS, variables, token).then(res => {
                console.log("res delete", res)
                if (res.data.deleteCartProduct.success) {
                    let cartItemsfilter = cartItems.filter(item => item._id !== product);
                    localStorage.setItem("cart", JSON.stringify(cartItemsfilter))
                    dispatch(removeCartItemAction(cartItemsfilter));
                    setCartItems(cartItemsfilter);
                }
            });
        }
        else {
            var cartItemsfilter = cartItems.filter(item => item._id !== product)
            dispatch(removeCartItemAction(product));
            setCartItems(cartItemsfilter);
        }

    }
    // const doApplyCouponCode = () => {
    //     let cart = cartItems.map((product) => { return { productId: product._id, qty: product.quantity } })
    //     let variables = {
    //         couponCode: couponCode, cart: cart
    //     }
    //     query2(APPLY_couponCode, variables, token).then(res => console.log("res", res))
    // }
    const ProcessToCheckOut = () => {
        const productsCard = JSON.parse(localStorage.getItem("persistantState"))
        var id = ''
        var token = ""
        if (session.status === "authenticated") {
            id = session.data.user.accessToken.customer._id
            token = session.data.user.accessToken.token
        }
        let carts = productsCard.map(product => {

            return {
                productId: product._id,
                qty: product.quantity,
                total: product.pricing.sellprice * product.quantity
            }
        })
        let variables = {
            userId: id,
            products: carts,
        }
    }

    const updateCartProduct = () => {
        const productsCard = JSON.parse(localStorage.getItem("persistantState"))
        var id = ''
        var token = ""
        if (session.status === "authenticated") {
            id = session.data.user.accessToken.customer._id
            token = session.data.user.accessToken.token
        }
        let carts = productsCard.cart.map(product => {
            return {
                productId: product._id,
                qty: product.quantity,
                productTitle: product.name,
                productImage: product.feature_image.original,
                productPrice: product.pricing.sellprice ? product.pricing.sellprice : product.pricing.price
            }
        })
        let variables = {
            id: cart_id,
            products: carts,
        }
        mutation(UPDATE_CART_PRODUCT, variables, token).then(res => console.log("res", res))
    }

    return (
        <>
            <BreadCrumb title={"Cart"} />
            <section className="shopcart-table">

                <Container>
                    {cartItems?.length > 0 ? (
                        <div className="row">
                            <div className="col-12">
                                <CartTable
                                    cartItems={cartItems}
                                    quantity={quantity}
                                    IncreaseQuantity={IncreaseQuantity}
                                    DecreaseQuantity={DecreaseQuantity}
                                    removeToCart={removeToCart}
                                    CalculateProductTotal={CalculateProductTotal}
                                    AllCartItemsClear={AllCartItemsClear}
                                    updateCartProduct={updateCartProduct}
                                    currency={currency}
                                />

                                <div className="devider"></div>

                                <div className="card-other-information">
                                    <div className="col-lg-6 col-md-12">
                                        <h4>Shopping Calculation</h4>
                                        <p>Flat rate : <span>5%</span></p>
                                        <Form>
                                            <Row className="mb-3">
                                                <Form.Group as={Col} controlId="state">
                                                    <Form.Control type="text" placeholder="State / Country" />
                                                </Form.Group>
                                                <Form.Group as={Col} controlId="zip-code">
                                                    <Form.Control type="text" placeholder="Pincode / Zipcode" />
                                                </Form.Group>
                                            </Row>
                                            <a className="card-btons  mr-10 mb-sm-15" onClick={updateCartProduct}><i className="fas fa-random"></i> Update Cart</a>
                                        </Form>
                                        <h4>Apply Coupon</h4>
                                        <div>
                                            <Row className="mb-3">
                                                <Form.Group as={Col} controlId="state">
                                                    <Form.Control type="text" placeholder="Your Code" value={couponCode} onChange={(e) => setCouponCode(e.target.value)} />
                                                </Form.Group>
                                                {/* <Form.Group as={Col} controlId="zip-code">
                                                    <a className="card-btons  mr-10 mb-sm-15" onClick={doApplyCouponCode}><i className="fas fa-tag"></i> Apply Code</a>
                                                </Form.Group> */}
                                            </Row>
                                        </div>

                                    </div>
                                    <div className="col-lg-6 col-md-12 col-sm-12">
                                        <div className="border p-md-4 p-30 border-radius cart-totals">
                                            <div className="heading_s1 mb-3">
                                                <h4>Cart Totals</h4>
                                            </div>
                                            <div className="table-responsive">
                                                <table className="table">
                                                    <tbody>
                                                        <tr>
                                                            <td className="cartTotal_label">Cart Subtotal</td>
                                                            <td className="cartTotal_amount"><span className="font-lg fw-900 text-brand">
                                                                {currency}  {getPrice(CalculateProductTotal(cartItems), decimal)}
                                                            </span></td>
                                                        </tr>
                                                        <tr>
                                                            <td className="cartTotal_label">Shipping</td>
                                                            <td className="cartTotal_amount"> <i className="ti-gift mr-5"></i> Free Shipping</td>
                                                        </tr>
                                                        <tr>
                                                            <td className="cartTotal_label">Total</td>
                                                            <td className="cartTotal_amount"><strong><span className="font-xl fw-900 text-brand">
                                                                {currency} {getPrice(CalculateProductTotal(cartItems), decimal)}
                                                            </span></strong></td>
                                                        </tr>
                                                    </tbody>
                                                </table>
                                            </div>
                                            <Link href="/checkout">
                                                <a className="card-btons" ><i className="fas fa-archive"></i> Proceed To CheckOut</a>
                                            </Link>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ) :
                        <p
                            style={{ display: 'flex', flex: 1, alignItems: 'center', justifyContent: 'center' }}>
                            No product available in cart
                        </p>
                    }
                </Container>
            </section>

        </>
    )
}
export default YourCard;

export async function getServerSideProps(context) {
    const session = await getSession(context)
    let id = session?.user?.accessToken?.customer._id
    var customercart = [];
    var cart_id = ""
    if (session !== null) {

        /* ----------------------- GET USER CART -----------------------------*/

        try {
            const { data: CartsData } = await client.query({
                query: GET_USER_CART,
                variables: { id: id }
            })
            cart_id = CartsData.cartbyUser.id
            let customercarts = CartsData?.cartbyUser.products
            let cartitems = customercarts.map(product => {

                return {
                    _id: product?.productId,
                    name: product?.productTitle,
                    pricing: {
                        sellprice: product?.productPrice
                    },
                    feature_image: { thumbnail: product?.productImage === undefined ? null : product?.productImage },
                    quantity: product?.qty
                }
            })
            customercart = cartitems
        }
        catch (e) {
            console.log("error==", e)
        }
    }
    return {
        props: {
            customercart,
            cart_id
        }

    }
}


