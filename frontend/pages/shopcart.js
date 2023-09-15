import { useState, useEffect, useRef } from "react";
import { Container, Row, Col } from "react-bootstrap";
import Form from 'react-bootstrap/Form'
import BreadCrumb from "../components/breadcrumb/breadcrumb";
import { useSelector, useDispatch } from "react-redux";
import CartTable from "../components/cardcomponent/CardDetail";
import { removeCartItemAction, RemoveAllCartItemsAction, increaseQuantity, decreaseQuantity } from "../redux/actions/cartAction";
import { currencySetter, getPrice, mutation, query } from "../utills/helpers";
import { DELETE_CART_PRODUCTS, UPDATE_CART_PRODUCT, GET_USER_CART } from "../queries/cartquery";
import { GET_HOMEPAGE_DATA_QUERY } from '../queries/home';
import client from "../apollo-client";
import { useSession, getSession } from "next-auth/react";
import { query2 } from "../utills/cartHelperfun";
import { APPLY_couponCode } from "../queries/couponquery";
import { getAllProductsAction } from "../redux/actions/productAction";
import { useRouter } from "next/router";
import { settingActionCreator } from "../redux/actions/settingAction";
import LoadingCartTable from "../components/cardcomponent/LoadingCard";
import Link from "next/link";
const CalculateProductTotal = product => product.reduce((total, product) => total + (product.pricing * product.quantity || product.pricing * product.quantity), 0)
const cartitems2 = []
const YourCard = ({ customercart, cart_id, CartsDataa, currencyStore }) => {
    var id = "";
    var token = "";
    const router = useRouter();
    const session = useSession();
    const allProducts = useSelector(state => state.products);
    const [cartLoading, setCartLoading] = useState(false)
    const [isQuantityBtnLoading, setIsQuantityBtnLoading] = useState(false)
    const [cartItems, setCartItems] = useState([]);
    const [quantityy, setQuantity] = useState();
    const dispatch = useDispatch();
    const [couponCode, setCouponCode] = useState("")

    const [currency, setCurrency] = useState("$")
    const [decimal, setdecimal] = useState(2)
    const settings = useSelector(state => state.setting);
    useEffect(() => {
        setdecimal(settings?.currencyOption?.number_of_decimals)
        currencySetter(settings, setCurrency);
    }, [settings?.currencyOption])
    useEffect(() => {
        dispatch(settingActionCreator(currencyStore.currency_options))
    }, [currencyStore.currency_options])
    useEffect(() => {
        dispatch(getAllProductsAction());
    }, []);
    useEffect(() => {
        const getProducts = async () => {

            const productsCard = JSON.parse(localStorage.getItem("cart"))
            setCartLoading(true)
            const sessionn = await getSession()
            if (session?.status === "authenticated" || sessionn !== null) {
                id = sessionn.user.accessToken.customer._id
                token = sessionn.user.accessToken.token
                let variables = { id: id }
                mutation(GET_USER_CART, variables).then(res => {
                    let carts = res?.data?.cartbyUser?.cartItem;
                    const cartProducts = [...carts];
                    let cartitems2 = [];

                    carts?.map(cart => {

                        const originalProduct = allProducts?.products?.find(prod => prod._id === cart.productId);
                        const orginal_attributes = originalProduct?.variation_master?.find(prod => prod.id === cart.variantId)
                        // console.log(orginal_attributes, 'originalProduct', originalProduct, cart.variantId)
                        if (originalProduct) {
                            const cartProduct = {}
                            if (orginal_attributes) {
                                cartProduct = {
                                    _id: originalProduct?._id,
                                    variantId: cart.variantId,
                                    quantity: parseInt(cart?.qty),
                                    productQuantity: parseInt(orginal_attributes?.quantity),
                                    name: originalProduct?.name,
                                    pricing: orginal_attributes?.pricing
                                        ?.sellprice,
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
                                    variantId: cart.variantId,
                                    quantity: parseInt(cart?.qty),
                                    productQuantity: parseInt(originalProduct?.quantity),

                                    name: originalProduct?.name,
                                    pricing: originalProduct?.pricing
                                        ?.sellprice,
                                    feature_image: originalProduct?.productImage
                                        || originalProduct?.feature_image,
                                    url: originalProduct?.url,
                                    attributes: cart.attributes || [],
                                    shippingClass: originalProduct?.shipping?.shippingClass,
                                    taxClass: originalProduct?.taxClass,
                                }
                            }
                            cartitems2.push(cartProduct);
                        }
                    })

                    setCartItems([...cartitems2])
                }).finally(() => { allProducts?.products.length > 0 && cartItems.length >= 0 && setCartLoading(false) })
            }
            else {

                setCartItems(productsCard || []);
                setCartLoading(false)

            }
        }
        getProducts();

    }, [allProducts]);
    const handlePayment = async () => {

        if (session?.status !== "authenticated") {

            router.push("/account")
        }
        else if (session?.status === "authenticated") {

            const response = await fetch('/api/stripe', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(cartItems),
            });
            const data = await response.json();

            // window.location.href = data.url
            // window.location.href = "http://localhost:3000/checkout"
            if (response.statusCode === 500) return;
        }
    }



    const AllCartItemsClear = async () => {
        setCartItems([])

        if (session.status === "authenticated") {
            let id = session.data.user.accessToken.customer._id
            let token = session.data.user.accessToken.token

            query(GET_USER_CART, id, token).then(res => {
                cart_id = res.data.cartbyUser.id
                let variables = {
                    id: cart_id,
                    products: [],
                    total: 0
                }
                mutation(UPDATE_CART_PRODUCT, variables, token).then(res => dispatch(RemoveAllCartItemsAction([])))

            })
        }
        else {
            dispatch(RemoveAllCartItemsAction([]))
        }

        localStorage.setItem("cart", JSON.stringify([]))
    }

    const IncreaseQuantity = async (item) => {

        setCartItems([...cartItems], cartItems.filter(itemm => itemm._id === item._id && itemm.variantId === item.variantId ? (item?.productQuantity > itemm.quantity + 1 && (itemm.quantity += 1)) : itemm.quantity))
        if (session?.status !== "authenticated") {
            dispatch(increaseQuantity(item._id, item.productQuantity, item.variantId))
        }
        else {
            const prod = cartItems.find(cart => cart._id === item._id && cart.variantId === item.variantId);
            const qty = prod.quantity;
            if (session?.status === "authenticated") {
                let id = session.data.user.accessToken.customer._id
                let token = session.data.user.accessToken.token
                query(GET_USER_CART, id, token).then(res => {
                    cart_id = res.data.cartbyUser.id
                    const cCartItems = [...cartItems];
                    const Cartt = cCartItems.map(product => {
                        if (product._id === item._id && product.variantId === item.variantId) {
                            return {
                                productId: product._id,
                                qty: qty,
                                productTitle: product.name,
                                productImage: product.feature_image,
                                productPrice: product.pricing,
                                shippingClass: product?.shippingClass,
                                taxClass: product?.taxClass,
                                attributes: product.attributes,
                                variantId: product.variantId,
                                productQuantity: product.productQuantity
                            }
                        } else {
                            return {
                                productId: product._id,
                                qty: product.quantity,
                                productTitle: product.name,
                                productImage: product.feature_image,
                                productPrice: product.pricing,
                                shippingClass: product?.shippingClass,
                                taxClass: product?.taxClass,
                                attributes: product.attributes,
                                variantId: product.variantId,
                                productQuantity: product.productQuantity
                            }
                        }
                    })
                    let variables = {
                        id: cart_id,
                        products: Cartt,
                        total: 0,
                    }
                    mutation(UPDATE_CART_PRODUCT, variables, token).then(res => console.log("update res while increasing qtyyyy", res))
                }).finally(() => setIsQuantityBtnLoading(false))
            }
        }
    }
    const DecreaseQuantity = (item) => {
        if (item.quantity > 1) {
            setIsQuantityBtnLoading(true)
            setCartItems([...cartItems], cartItems.filter(itemm => itemm._id === item._id && itemm.variantId === item.variantId ? (itemm.quantity -= 1) : itemm.qyantity))
            setQuantity(item.quantity)
            if (session?.status !== "authenticated") {
                let variables = {
                    _id: item._id,
                    variantId: item.variantId
                }
                dispatch(decreaseQuantity(variables))

                setIsQuantityBtnLoading(false)
            } else {

                const prod = cartItems.find(cart => cart._id === item._id && cart.variantId === item.variantId);
                const qty = prod.quantity;
                if (session?.status === "authenticated") {
                    let id = session.data.user.accessToken.customer._id
                    let token = session.data.user.accessToken.token
                    query(GET_USER_CART, id, token).then(res => {
                        cart_id = res.data.cartbyUser.id
                        const cCartItems = [...cartItems];
                        const Cartt = cCartItems.map(product => {
                            if (product._id === item._id && product.variantId === item.variantId) {
                                return {
                                    productId: product._id,
                                    qty: qty,
                                    productTitle: product.name,
                                    productImage: product.feature_image?.original,
                                    productPrice: product.pricing,
                                    attributes: product.attributes,
                                    variantId: product.variantId,
                                    productQuantity: product.productQuantity,
                                    shippingClass: product?.shippingClass,
                                    taxClass: product?.taxClass,
                                }
                            } else {
                                return {
                                    productId: product._id,
                                    qty: product.quantity,
                                    productTitle: product.name,
                                    productImage: product.feature_image?.original,
                                    productPrice: product.pricing,
                                    attributes: product.attributes,
                                    variantId: product.variantId,
                                    productQuantity: product.productQuantity,
                                    shippingClass: product?.shippingClass,
                                    taxClass: product?.taxClass,
                                }
                            }
                        })
                        let variables = {
                            id: cart_id,
                            products: Cartt,
                            total: 0,
                        }
                        mutation(UPDATE_CART_PRODUCT, variables, token).then(res => {
                            let variables = {
                                _id: item._id,
                                variantId: item.variantId
                            }
                            // dispatch(decreaseQuantity(variables))
                            console.log("update res while decreasing qtyyyy", res)
                        })
                    }).finally(() => setIsQuantityBtnLoading(false))
                }
            }
        }
    }

    const removeToCart = async (item) => {

        let product = item?._id
        let idx = cartItems.findIndex(cartItem => cartItem._id === item._id)
        const prod = cartItems.find(cart => cart._id === item._id);
        if (session?.status === "authenticated") {
            let cartItemsfilter = cartItems.filter(itemm => itemm._id !== item._id || (itemm._id === item._id && itemm.variantId !== item.variantId))
            setCartItems(cartItemsfilter);
            let id = session.data.user.accessToken.customer._id
            let token = session.data.user.accessToken.token

            query(GET_USER_CART, id, token).then(res => {
                cart_id = res.data.cartbyUser.id

                let variables = {
                    id: cart_id,
                    productId: item._id,
                    variantId: item.variantId
                }

                mutation(DELETE_CART_PRODUCTS, variables, token).then(res => dispatch(removeCartItemAction(variables)))


            })
        }
        else {
            let cartItemsfilter = cartItems.filter(itemm => itemm._id !== product || (itemm._id === product && itemm.variantId !== item.variantId))
            let variables = {
                id: product,
                variantId: item.variantId
            }
            dispatch(removeCartItemAction(variables));
            setCartItems(cartItemsfilter);
        }

    }
    const doApplyCouponCode = () => {
        let cart = cartItems.map((product) => { return { productId: product._id, qty: product.quantity } })
        let variables = {
            coupon_code: couponCode, cartItem: cart
        }
        query2(APPLY_couponCode, variables, token).then(res => console.log("res", res))
    }
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
                productId: product?._id,
                qty: product?.quantity,
                productTitle: product?.name,
                productImage: product?.feature_image?.original,
                productPrice: product?.pricing?.sellprice ? product?.pricing?.sellprice : product?.pricing?.price
            }
        })
        let variables = {
            id: cart_id,
            products: carts,
        }

        mutation(UPDATE_CART_PRODUCT, variables, token).then(res => console.log("res", res))
    }

    if (cartLoading) {
        return <>
            <BreadCrumb title={"Cart"} />
            <section className="shopcart-table loading-table">
                <Container>
                    <div className="row">
                        <div className="col-12">
                            <LoadingCartTable />
                        </div>
                    </div>
                </Container>
            </section>
        </>
    }
    else return (
        <>
            <BreadCrumb title={"Cart"} />
            <section className="shopcart-table">
                <Container>
                    {cartItems?.length > 0 ? (
                        <div className="row">
                            <div className="col-12">
                                <CartTable
                                    decimal={decimal}
                                    isQuantityBtnLoading={isQuantityBtnLoading}
                                    cartItems={cartItems}
                                    quantity={quantityy}
                                    IncreaseQuantity={IncreaseQuantity}
                                    DecreaseQuantity={DecreaseQuantity}
                                    removeToCart={removeToCart}
                                    CalculateProductTotal={CalculateProductTotal}
                                    AllCartItemsClear={AllCartItemsClear}
                                    updateCartProduct={updateCartProduct}
                                    currency={currency}
                                />
                                {/* <div className="devider"></div> */}
                                <div className="card-other-information flex-column-reverse">
                                    {/* <div className="col-lg-6 col-md-12 invisible">
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
                                                <Form.Group as={Col} controlId="zip-code">
                                                    <a className="card-btons  mr-10 mb-sm-15" onClick={doApplyCouponCode}><i className="fas fa-tag"></i> Apply Code</a>
                                                </Form.Group>
                                            </Row>
                                        </div>

                                    </div> */}
                                    <div className="col-lg-12 col-md-12 col-sm-12 mt-4">
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
    var CartsDataa = {}
    var homepageData = [];
    var currencyStore = [];
    if (session !== null) {

        /* ----------------------- GET USER CART -----------------------------*/

        // try {
        //     const { data: CartsData } = await client.query({
        //         query: GET_USER_CART,
        //         variables: { id: id }   
        //     })
        //     CartsDataa =CartsData
        //     cart_id = CartsData.cartbyUser.id
        //     let customercarts = CartsData?.cartbyUser.products
        //     let cartitems = await customercarts.map(product => {
        //         return {
        //             _id: product?.productId,
        //             name: product?.productTitle,
        //             pricing: {
        //                 sellprice: product?.total
        //             },
        //             feature_image: { thumbnail: product?.productImage === undefined ? null : product?.productImage },
        //             quantity: product?.qty
        //         }
        //     })
        //     customercart = cartitems
        // }
        // catch (e) {
        //     console.log("error==", e)
        // }
    }

    /* ----------------------- GEt currency -----------------------------*/
    try {
        const { data: homepagedata } = await client.query({
            query: GET_HOMEPAGE_DATA_QUERY
        })
        homepageData = homepagedata

        currencyStore = homepagedata?.getSettings?.store
    }
    catch (e) {
        console.log("homepage Error===", e);
    }


    return {
        props: {
            customercart,
            cart_id,
            CartsDataa,
            currencyStore
        },


    }
}


