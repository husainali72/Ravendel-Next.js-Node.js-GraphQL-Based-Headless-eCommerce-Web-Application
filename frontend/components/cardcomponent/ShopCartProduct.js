import { useEffect, useState, useRef } from "react";
import Link from "next/link";
import { getImage } from "../../utills/helpers";
import { useSelector, useDispatch } from "react-redux";
import { removeCartItemAction } from "../../redux/actions/cartAction";
import { DELETE_CART_PRODUCTS } from "../../queries/cartquery";
import { mutation } from "../../utills/helpers";
import { useSession } from "next-auth/react"
import { getAllProductsAction } from "../../redux/actions/productAction";
var placeholder = "https://dummyimage.com/300";

const CalculateProductTotal = product => product.reduce((total, product) => total + (product.pricing?.sellprice * product.quantity), 0)

export const ShopCart = () => {
    const session = useSession()
    const dispatch = useDispatch()
    const cartProducts = useSelector(state => state.cart)
    const {loading, success, products} = useSelector(state => state.products);
    // console.log("cart", cartProducts)
    const usercart = useSelector(state => state.userCart)
    const settings = useSelector(state => state.setting)
    const currencyType = settings.currencyOption
    let currency = "$"
    if (currencyType?.currency === "dollar") { currency = "$" }
    if (currencyType?.currency === "eur") { currency = <i className="fas fa-euro-sign"></i> }
    if (currencyType?.currency === "gbp") { currency = <i className="fas fa-pound-sign"></i> }
    if (currencyType?.currency === "cad") { currency = "CA$" }

    const [cart, setCart] = useState([])
    const [press, setPress] = useState(false);
    const initialRender = useRef(true)

    useEffect(() => {
        dispatch(getAllProductsAction());
    }, []);

    useEffect(() => {
        if(success && products?.length) {
            let filteredProducts = [];
            cartProducts.forEach(cartProduct => {
                filteredProducts.push(...products.filter(product => product._id === cartProduct._id));
            })

            setCart(filteredProducts);
        }
    }, [loading])

    useEffect(() => {
        if (initialRender.current) {
            initialRender.current = false;
            setCart(cartProducts)
        } else {
            setPress(true);
            setCart(cartProducts)
        }
    }, [cartProducts])

    const removeToCart = async (item) => {
        let product = item._id
        let token = ""
        if (session.status === "authenticated") {
            token = session.data.user.accessToken.token
            let variables = {
                id: usercart.card_id,
                product_id: item._id,
            }
            mutation(DELETE_CART_PRODUCTS, variables, token).then(res => {
                if (res.data.deleteCartProduct.success) {
                    var cartItemsfilter = cart.filter(item => item._id !== product)
                    dispatch(removeCartItemAction(product));
                    setCart(cartItemsfilter);
                }
            });
        }
        else {
            var cartItemsfilter = cart.filter(item => item._id !== product)
            dispatch(removeCartItemAction(product));
            setCart(cartItemsfilter);
        }

    }

    return <h5>Coming Soon...</h5>;

    return (
        <>
        {console.log('cart - loading', cart)}
            {!loading && cart && cart?.length > 0 ? (
                <div>
                    {cart.map((item, i) =>
                        <div key={i} style={{ display: "flex", marginBottom: "1rem", backgroundColor: "#fff" }}>
                            <div className="shopping-cart-img td-flex">
                                <Link href={`/product/[singleproduct]?url=${item.url}`} as={`/product/${item.url}`}>
                                    <img
                                        alt=""
                                        src={getImage(item.feature_image, 'original')}
                                        onError={(e) => e.type === 'error' ? e.target.src = placeholder : null}
                                        width={"80px"}
                                        height={"80px"}
                                    />
                                </Link>
                            </div>
                            <div className="shopping-cart-title">
                                <Link href={`/product/[singleproduct]?url=${item.url}`} as={`/product/${item.url}`}>
                                    <h5>
                                        {item?.name?.length > 14 ? (
                                            <h5
                                                dangerouslySetInnerHTML={{
                                                    __html: item.name.substring(0, 14) + "",
                                                }}
                                            ></h5>) : <h5>{item.name}</h5>}</h5>
                                </Link>
                                <h3><span>{item.quantity} × </span>{currency} {item.pricing?.sellprice ? item.pricing?.sellprice.toFixed(2) : item.pricing?.price.toFixed(2)}</h3>
                            </div>
                            <div className="shopping-cart-delete">
                                <a onClick={() => removeToCart(item)}><i className="fas fa-times"></i></a>
                            </div>
                        </div>)}
                    <div className="shopping-cart-footer">
                        <div className="shopping-cart-total">
                            <h4>Total <span style={{ float: 'right', color: '#088178' }}>{currency} {CalculateProductTotal(cart).toFixed(2)}</span></h4>
                        </div>
                        <div className="shopping-cart-button d-flex" >
                            <Link href="/shopcart">
                                <a className="shopping-cart-button-view-cart" style={{ marginTop: 1, backgroundColor: "#fff" }}><i className="fas fa-archive"></i> View Cart</a>
                            </Link>
                            <Link href="/checkout">
                                <a className="shopping-cart-button-checkout" style={{ margin: 1, backgroundColor: "#088178" }}><i className="fas fa-archive"></i> CheckOut</a>
                            </Link>

                        </div>
                    </div>
                </div>

            ) : <h5>Cart is empty</h5>}
        </>
        // </div>
    )
}
export default ShopCart