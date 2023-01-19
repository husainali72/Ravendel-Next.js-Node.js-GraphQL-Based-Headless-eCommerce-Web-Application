import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { Container, Row, Col } from "react-bootstrap";
import Form from 'react-bootstrap/Form'
import BreadCrumb from "../components/breadcrumb/breadcrumb";
import { useSelector, useDispatch } from "react-redux";
import CartTable from "../components/cardcomponent/CardDetail";
import { removeCartItemAction, RemoveAllCartItemsAction, increaseQuantity, decreaseQuantity } from "../redux/actions/cartAction";
import { mutation, query } from "../utills/helpers";
import { DELETE_CART_PRODUCTS, UPDATE_CART_PRODUCT, GET_USER_CART } from "../queries/cartquery";
import { CHECKOUT_ORDER_QUERY } from "../queries/checkoutquery";
import client from "../apollo-client";
import { useSession, getSession } from "next-auth/react";
import { query2 } from "../utills/cartHelperfun";
import { APPLY_COUPON_CODE } from "../queries/couponquery";
import { getAllProductsAction } from "../redux/actions/productAction";

const CalculateProductTotal = product => product.reduce((total, product) => total + (product.pricing?.sellprice || 0 * product.quantity), 0)
const cartitems2 = []     

const YourCard = ({ customercart, cart_id }) => {
    // console.log("cartbyUser", customercart);
    console.log(" cart_id..", cart_id);
    const session = useSession();
    const cartProducts = useSelector(state => state.cart);
    const allProducts = useSelector(state => state.products);
    
    // console.log("cart_products", cartProducts);
    const usercart = useSelector(state => state.userCart);
    console.log("usercart", usercart)
    const initialRender = useRef(true);
    const settings = useSelector(state => state.setting)
    const currencyType = settings.currencyOption

    let currency = "$"
    if (currencyType?.currency === "dollar") { currency = "$" }
    if (currencyType?.currency === "eur") { currency = <i className="fas fa-euro-sign"></i> }
    if (currencyType?.currency === "gbp") { currency = <i className="fas fa-pound-sign"></i> }
    if (currencyType?.currency === "cad") { currency = "CA$" }

    const [cartItems, setCartItems] = useState([]);
    const [quantityy, setQuantity] = useState();
    const dispatch = useDispatch();
    const [press, setPress] = useState(false);
    const [couponCode, setCouponCode] = useState("")
    
    
    var cartitems3 = []
    // const [userCart, setUserCart] = useState(cart_id);
    // console.log("cartItems", cartItems);

    var id = "";
    var token = "";

    useEffect(() => {
        console.log('allProducts', allProducts)
    }, [allProducts]);

    // useEffect(() => {
    //     if (session.status === "authenticated") {
    //         console.log('customercart', customercart);
    //         console.log('cartProducts', cartProducts);

    //         if (initialRender.current) {
    //             initialRender.current = false;
    //             {
    //                 console.log('customercart', customercart)
    //                 customercart && customercart?.length > 0 ? (
    //                     setCartItems(customercart || [])
    //                 ) : setCartItems(cartProducts || [])
    //             }
    //             setCartItems(cartProducts || [])
    //         } else {
    //             // setPress(true);
    //             setCartItems(cartProducts)
    //         }
    //     }
    //     else {
    //         // setPress(true);
    //         setCartItems(cartProducts)
    //     }

    // }, [cartProducts]);

    // useEffect(() => {
    //     getProducts();
    // }, [cartProducts]);

    console.log('allProducts.success', allProducts.success)
    useEffect(() => {
        if(allProducts.success) {
            getProducts();
        }
    }, [allProducts, cartProducts,customercart]);

    const getProducts = async () => {
        const productsCard = JSON.parse(localStorage.getItem("cart"))  
        console.log('allProducts', allProducts)
        console.log("productsCard", productsCard)
        if (session?.status === "authenticated") {
            id = session.data.user.accessToken.customer._id
            token = session.data.user.accessToken.token
            // console.log("id", id)
            // console.log("token", token)
            try {
                const { data: CartsData } = await client.query({
                    query: GET_USER_CART,
                    variables: { id: id }
                })
                // let carts = customercart;
                let carts = CartsData.cartbyUser.products;
                
                console.log('cartFromServerOfUsser----', carts);
                console.log("productsCard", productsCard)



                let cartitems = [];
                
                let cartitems2 = [];
                carts.map(cart=>{
                    // console.log('allproduct=', allProducts.products);
                    console.log('current cart=', cart);
                    const originalProduct = allProducts.products.find(prod => prod._id === cart.product_id);
                    console.log('originalProduct=', originalProduct);
                    const cartProduct = {
                        _id: originalProduct._id,
                        quantity:parseInt(cart.qty) ,
                        name:originalProduct.name,
                        pricing: originalProduct.pricing,
                        feature_image:originalProduct.feature_image
                    }
                    cartitems2.push(cartProduct);
                })

                console.log('redy to insert user cart', cartitems2);
                setCartItems(cartitems2) 
                console.log('cart itemmmmms2222', cartitems2)
                console.log('prod itemmmmmmm', productsCard)

                // carts.forEach(cartProduct => {
                //     cartitems.push(...allProducts.products.filter(product => product._id === cartProduct.product_id))
                // })
                // console.log('cart itemmmmm', cartitems)
                // setCartItems(cartitems) 
            }
            catch (e) {
                setCartItems(productsCard || []);  
                console.log('typt errr', e)
            }
        }
        else {
            setCartItems(productsCard || []);
            console.log('procard itemmmmm', productsCard)
        }
    }

    // useEffect(() => {
    //     const productsCard = JSON.parse(localStorage.getItem("cart"))
    //     setCartItems(productsCard || cartProducts);
    // }, [])

    // console.log("CartItems", cartItems);
    console.log('redy to insert user cart', cartitems2);
    console.log('cart3t', cartitems3);
    
    const AllCartItemsClear = () => {
        setCartItems([])
        let variables = {
            id: cart_id,
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
    const IncreaseQuantity = (item) => {
        console.log('itemQuant',item.quantity)
        console.log('dynamic irtem calue',cartItems[1])
        setCartItems([...cartItems],cartItems.filter(itemm => itemm._id===item._id ? (itemm.quantity+=1):itemm.qyantity))   
        setQuantity(item.quantity)
        if (session?.status !== "authenticated"){         
            dispatch(increaseQuantity(item._id))
        }
        else{
            const prod = cartItems.find(cart => cart._id === item._id);
            const qty = prod.quantity;
            // console.log('Product to change quantity',qty)
            if (session?.status === "authenticated") {
                let id = session.data.user.accessToken.customer._id
                let token = session.data.user.accessToken.token
                query(GET_USER_CART, id, token).then(res => {
                // console.log("productUser", res.data.cartbyUser.products)
                cart_id = res.data.cartbyUser.id
                // state.cart_id = res.data.cartbyUser.id
                const cCartItems = [...cartItems];

                const Cartt = cCartItems.map(product => {
                    return {
                        product_id: product._id,
                        qty: product._id===item._id ? qty: product.quantity,
                        product_title: product.name,
                        product_image: product.feature_image?.original,
                        product_price: product.pricing.sellprice
                    }
 
                })
                let variables = {
                    id: cart_id,
                    products: Cartt,
                    total: 0,
                }
                // console.log("updatecart", variables);
                mutation(UPDATE_CART_PRODUCT, variables, token).then(res => console.log("update res while increasing qtyyyy", res))
            })
        }
        }
    }
    const DecreaseQuantity = (item) => {
        // let qty = parseInt(item.quantity);
        // console.log('item==',qty)
        // if (qty > 1) {
        //     qty -= 1;
        //     setQuantity(qty - 1);
        //     item.quantity = qty
        //     dispatch(decreaseQuantity(item._id))
        // }
        if (item.quantity > 1) {
            setCartItems([...cartItems],cartItems.filter(itemm => itemm._id===item._id ? (itemm.quantity-=1):itemm.qyantity))
            // item.quantity -= 1;
            setQuantity(item.quantity)
            if (session?.status !== "authenticated"){

                dispatch(decreaseQuantity(item._id))
            }  else{
                const prod = cartItems.find(cart => cart._id === item._id);
                const qty = prod.quantity;
                // console.log('Product to change quantity',qty)
                if (session?.status === "authenticated") {
                    let id = session.data.user.accessToken.customer._id
                    let token = session.data.user.accessToken.token
                    query(GET_USER_CART, id, token).then(res => {
                    // console.log("productUser", res.data.cartbyUser.products)
                    cart_id = res.data.cartbyUser.id
                    // state.cart_id = res.data.cartbyUser.id
                    const cCartItems = [...cartItems];
    
                    const Cartt = cCartItems.map(product => {
                        return {
                            product_id: product._id,
                            qty: product._id===item._id ? qty: product.quantity,
                            product_title: product.name,
                            product_image: product.feature_image?.original,
                            product_price: product.pricing.sellprice
                        }
    
                    })
                    let variables = {
                        id: cart_id,
                        products: Cartt,
                        total: 0,
                    }
                    // console.log("updatecart", variables);
                    mutation(UPDATE_CART_PRODUCT, variables, token).then(res => console.log("update res while decreasing qtyyyy", res))
                })
            }
            }
        }
    }
  

    const removeToCart = async (item) => {
        let idx = cartItems.findIndex(cartItem => cartItem._id === item._id)
        // console.log('indecx to delete an item', idx)
        // const ProductsCard = JSON.parse(localStorage.getItem("cart"))  
        // setCartItems(ProductsCard)
        // console.log('cart item after deleting an element', cartItems)

       

        let product = item._id
        let token = ""
        if (session.status === "authenticated") {
            let cartItemsfilter = cartItems.filter(itemm => itemm._id !== product)
            // dispatch(removeCartItemAction(product));
            setCartItems(cartItemsfilter);
            // console.log('cart item after deleting an element', cartItems)
            token = session.data.user.accessToken.token
            let variables = {
                id: cart_id,
                product_id: item._id,
            }
            mutation(DELETE_CART_PRODUCTS, variables, token).then(res => {
                console.log("res delete", res)
                // if (res.data.deleteCartProduct.success) {
                //     let cartItemsfilter = cartItems.filter(item => item._id !== product);
                //     localStorage.setItem("cart", JSON.stringify(cartItemsfilter))
                //     setCartItems(cartItemsfilter);
                //     // dispatch(removeCartItemAction(cartItemsfilter)); 
                // }
            });
            console.log('huaaaaa else')
        }
        else {
            let cartItemsfilter = cartItems.filter(item => item._id !== product)
            dispatch(removeCartItemAction(product));
            setCartItems(cartItemsfilter);
        }

    }
    const doApplyCouponCode = () => {
        console.log("coupn value", couponCode)
        let cart = cartItems.map((product) => { return { product_id: product._id, qty: product.quantity } })
        let variables = {
            coupon_code: couponCode, cart: cart
        }
        console.log("variable", variables)
        query2(APPLY_COUPON_CODE, variables, token).then(res => console.log("res", res))
    }
    const ProcessToCheckOut = () => {
        const productsCard = JSON.parse(localStorage.getItem("persistantState"))
        console.log("ProcessToCheckOut", productsCard.cart)
        var id = ''
        var token = ""
        if (session.status === "authenticated") {
            id = session.data.user.accessToken.customer._id
            token = session.data.user.accessToken.token
        }
        let carts = productsCard.map(product => {

            return {
                product_id: product._id,
                qty: product.quantity,
                total: product.pricing.sellprice * product.quantity
            }
        })
        // console.log("carts", carts)
        let variables = {
            user_id: id,
            products: carts,
            // total: CalculateProductTotal(cartItems)
        }
        // console.log("checkout variable", variables)
        // mutation(CHECKOUT_ORDER_QUERY, variables, token).then(res => console.log("res", res))
    }

    const updateCartProduct = () => {
        console.log("updateCartProduct")
        const productsCard = JSON.parse(localStorage.getItem("persistantState"))
        console.log("updateCheckOut", productsCard.cart)
        var id = ''
        var token = ""
        if (session.status === "authenticated") {
            id = session.data.user.accessToken.customer._id
            token = session.data.user.accessToken.token
        }

        console.log('productsCard', productsCard)
        let carts = productsCard.cart.map(product => {
            console.log('product.pricing', )
            return {
                product_id: product._id,
                qty: product.quantity,
                product_title: product.name,
                // product_image: product.gallery_image[0].original||"",
                product_image: product.feature_image.original,
                product_price: product.pricing.sellprice ? product.pricing.sellprice : product.pricing.price
            }
        })
        // console.log("carts", carts)
        let variables = {
            id: cart_id,
            products: carts,
            // total: CalculateProductTotal(cartItems)
        }
        console.log("update", variables)
       
        mutation(UPDATE_CART_PRODUCT, variables, token).then(res => console.log("res", res))
    }
    console.log("ab dekh cart", cartitems2)
    return (
        <>
        {console.log('cartItems at cart page', cartItems)}
            <BreadCrumb title={"Cart"} />
            <section className="shopcart-table">

                <Container>
                    {cartItems?.length > 0 ? (
                        <div className="row">
                            <div className="col-12">
                                <CartTable
                                    cartItems={cartItems}
                                    // cartItems={cartitems2}
                                    quantity={quantityy}
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
                                                <Form.Group as={Col} controlId="zip-code">
                                                    <a className="card-btons  mr-10 mb-sm-15" onClick={doApplyCouponCode}><i className="fas fa-tag"></i> Apply Code</a>
                                                </Form.Group>
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
                                                            <td className="cart_total_label">Cart Subtotal</td>
                                                            <td className="cart_total_amount"><span className="font-lg fw-900 text-brand">
                                                                {console.log('cartItems', cartItems)}
                                                                {currency}  {CalculateProductTotal(cartItems).toFixed(2)}
                                                            </span></td>
                                                        </tr>
                                                        <tr>
                                                            <td className="cart_total_label">Shipping</td>
                                                            <td className="cart_total_amount"> <i className="ti-gift mr-5"></i> Free Shipping</td>
                                                        </tr>
                                                        <tr>
                                                            <td className="cart_total_label">Total</td>
                                                            <td className="cart_total_amount"><strong><span className="font-xl fw-900 text-brand">
                                                                {currency} {CalculateProductTotal(cartItems).toFixed(2)}
                                                            </span></strong></td>
                                                        </tr>
                                                    </tbody>
                                                </table>
                                            </div>
                                            <Link href="#">
                                                <a className="card-btons" ><i className="fas fa-archive"></i> Proceed To CheckOut</a>
                                            </Link>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ) :
                        <h2
                            style={{ display: 'flex', flex: 1, alignItems: 'center', justifyContent: 'center' }}>
                            no product available in cart
                        </h2>
                    }
                </Container>
            </section>

        </>
    )
}
export default YourCard;

export async function getServerSideProps(context) {

    const session = await getSession(context)
    // console.log("session", session)
    let id = session?.user?.accessToken?.customer._id
    // let id = "622ae63d3aa0f0f63835ef8e"
    var customercart = [];
    var cart_id = ""
    if (session !== null) {

        /* ----------------------- GET USER CART -----------------------------*/

        try {
            const { data: CartsData } = await client.query({
                query: GET_USER_CART,
                variables: { id: id }
            })

            console.log('CartsData', CartsData.products)
            cart_id = CartsData.cartbyUser.id
            let customercarts = CartsData?.cartbyUser.products
            let cartitems = customercarts.map(product => {
                console.log('Product', product)
                return {
                    _id: product?.product_id,
                    name: product?.product_title,
                    pricing: {
                        sellprice: product?.total
                    },
                    feature_image: { thumbnail: product?.product_image === undefined ? null : product?.product_image },
                    quantity: product?.qty
                }
            })
            customercart = cartitems
            console.log("Carts==================", customercart)
        }
        catch (e) {
            console.log("error==", e)
        }
    }

    return {
        props: {
            customercart,
            cart_id
        },
       

    }
}


