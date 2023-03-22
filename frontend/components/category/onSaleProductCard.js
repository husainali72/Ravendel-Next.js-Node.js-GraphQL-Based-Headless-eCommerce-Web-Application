import { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/router";
import Link from "next/link";
import { Container, OverlayTrigger, Tooltip, Button } from 'react-bootstrap';
import StarRating from "../breadcrumb/rating";
import { currencySetter, getImage, mutation, getPrice } from "../../utills/helpers";
import { useSelector, useDispatch } from 'react-redux';
import { addToCart } from "../../redux/actions/cartAction";
import { useSession } from "next-auth/react";
import { ADD_TO_CART_QUERY, GET_USER_CART, UPDATE_CART_PRODUCT } from "../../queries/cartquery";
import calculateDiscount from "../../utills/calculateDiscount";
import { query } from "../../utills/helpers";
var placeholder = "https://dummyimage.com/300";
const OnSaleProductCard = ({ onSaleProduct, hidetitle, titleShow, currencyProp }) => {
    var id = ""
    var token = ""
    const dispatch = useDispatch();
    const router = useRouter()
    const session = useSession();
    const [currency, setCurrency] = useState("$")
    const [decimal, setdecimal] = useState(2)
    const settings = useSelector(state => state.setting);
    useEffect(() => {
        currencySetter(settings, setCurrency);
        setdecimal(settings?.currencyOption?.number_of_decimals)
        if (currencyProp) {
            setCurrency(currencyProp)
        }

    }, [settings?.currencyOption, currencyProp])


    if (session.status === "authenticated") {
        id = session.data.user.accessToken.customer._id
        token = session.data.user.accessToken.token
    }
    const ProductAdd = async (product) => {
        let quantity = 1
        let href = '/shopcart'
        if (session.status === "authenticated") {

            let productInCart = false;
            query(GET_USER_CART, id, token).then(res => {
                let cart_id = res?.data?.cartbyUser?.id
                const inCartProducts = res?.data?.cartbyUser?.products;
                inCartProducts.map(inCartProduct => {
                    const productt = inCartProduct;
                    if (productt.product_id === product?._id) {
                        let qant = product.qty + quantity;
                        productInCart = true;
                        var Cartt = inCartProducts.map(producttt => {
                            if (producttt.product_id === product._id) {
                                return {
                                    product_id: producttt?.product_id,
                                    qty: producttt.qty + quantity,
                                    product_title: producttt.product_title,
                                    product_image: producttt.product_image,
                                    product_price: producttt.product_price
                                }
                            } else {
                                return {
                                    product_id: producttt?.product_id,
                                    qty: producttt.qty,
                                    product_title: producttt.product_title,
                                    product_image: producttt.product_image,
                                    product_price: producttt.product_price
                                }
                            }
                        })
                        let variables = {
                            id: cart_id,
                            products: Cartt,
                            total: 0,
                        }
                        mutation(UPDATE_CART_PRODUCT, variables, token).then(res => {
                            router.push("/shopcart")
                        })
                    }
                })
                if (!productInCart) {
                    let variables = {
                        total: product?.pricing.sellprice * quantity,
                        user_id: id,
                        product_id: product?._id,
                        qty: quantity,
                        product_title: product?.name,
                        product_image: product?.feature_image?.original,
                        product_price: product?.pricing.sellprice
                    }
                    mutation(ADD_TO_CART_QUERY, variables, token).then(res => {
                        router.push("/shopcart")
                        dispatch(addToCart(product))
                    })
                }
            })
        }
        else {
            dispatch(addToCart(product))
            router.push("/shopcart")
        }
    }

    return (
        <section className="product-cart-section" >
            <Container style={{ padding: '0' }}>
                {!hidetitle ? <div>
                    <h4 style={{ color: "#088178" }}>{titleShow ? titleShow : "On Sale"} <span style={{ color: "black" }}>Product</span></h4>
                </div>
                    : null}
                <div>
                    <div className="on-sale-product">
                        {onSaleProduct && onSaleProduct?.length > 0 ? (
                            <>
                                {onSaleProduct.map((product, i) =>
                                (
                                    <Link href={`/product/[singleproduct]?url=${product.url}`} as={`/product/${product.url}`}>
                                        <div className="on-sale-product-card" key={i}>
                                            <div className="on-sale-image-wrapper">
                                                <img
                                                    className="img-on-sale"
                                                    src={getImage(product.feature_image, 'original')}
                                                    height="280px"
                                                    width="100%"
                                                    onError={(e) => e.type === 'error' ? e.target.src = placeholder : null}
                                                />
                                            </div>
                                            <div className="on-sale-product-card-body">
                                                {product?.pricing?.sellprice > 0 && product?.pricing?.sellprice < product?.pricing?.price &&  Math.round((100 /product?.pricing?.price)*(product?.pricing?.price - product?.pricing?.sellprice))>0  ? (<div className="save-price">
                                                    <span className="percantage-save">
                                                        {calculateDiscount(product?.pricing?.price, product?.pricing?.sellprice)}
                                                    </span>
                                                </div>) : null}
                                                <div className="product-categoryname" >
                                                    {product?.categoryId?.map((item, i) =>
                                                    (<span key={i}>

                                                        {(product?.categoryId?.length - 1 === i) ? (<span>{item?.name} </span>) : <span>{item?.name}, </span>}

                                                    </span>))}
                                                </div>
                                                <div className="card-price" style={{ cursor: 'pointer' }}>

                                                    {product.name?.length > 18 ? (
                                                        <strong
                                                            dangerouslySetInnerHTML={{
                                                                __html: product.name.substring(0, 17) + "...",
                                                            }}
                                                        ></strong>
                                                    ) : (
                                                        product.name
                                                    )}</div>
                                                <div className="on-sale-product-detail">
                                                    <div className="product-price" style={{ justifyContent: "left", alignContent: "left", m: 0 }}>
                                                        <StarRating className="rating" stars="4" />
                                                        <span >
                                                            {product.pricing.sellprice ? (
                                                                <strong className="sale-price">{currency} {getPrice(product?.pricing?.sellprice, decimal)}
                                                                </strong>
                                                            ) : (
                                                                <strong className="sale-price">{currency} {getPrice(product?.pricing.price, decimal)}</strong>
                                                            )}</span>
                                                        {product?.pricing.sellprice && product?.pricing.sellprice < product?.pricing.price ?  <span
                                                            className={
                                                                product?.pricing.sellprice ? "has-sale-price" : ""
                                                            }
                                                        >
                                                            {currency} {getPrice(product?.pricing?.price, decimal)}
                                                        </span> : null}

                                                    </div>
                                                    { product?.quantity > 0 ? <OverlayTrigger style={{ backgroundColor: "#088178" }}
                                                        placement="top"
                                                        overlay={
                                                            <Tooltip style={{ color: "#088178" }} id={"tooltip-top"}>
                                                                add to cart
                                                            </Tooltip>
                                                        }
                                                    >
                                                        <div className="add-to-cart"> <a className="cart-icon" onClick={() => ProductAdd(product)}>
                                                            <i className="fas fa-shopping-bag font-awesome-icon" aria-hidden="true"></i>
                                                        </a>
                                                        </div>
                                                    </OverlayTrigger> : <p className="out-of-stock-card">Out Of Stock</p>}

                                                </div>
                                            </div>
                                        </div>
                                    </Link>
                                ))}
                            </>
                        ) :
                            <div style={{ padding: "50px" }}>
                                <p style={{ display: "flex", alignItems: "center", justifyContent: "center" }}>No Data Found</p>
                            </div>
                        }
                    </div>
                </div>
            </Container>
        </section >
    )
}
export default OnSaleProductCard;
