import { useState } from "react";
import client from "../../apollo-client"
import { useRouter } from "next/router";
import Link from "next/link";
import { Container, OverlayTrigger, Tooltip, Button } from 'react-bootstrap';
import StarRating from "../breadcrumb/rating";
import { getImage } from "../../utills/helpers";
import { useSelector, useDispatch } from 'react-redux';
import { addToCart } from "../../redux/actions/cartAction";
// import { ADD_TO_CART_QUERY, GET_CART_ITEM_QUERY, ADD_TO_CART_SINGLE_PRODUCT, ADD_TO_CART } from "../../queries/cartquery"
import { useSession } from "next-auth/react";

var placeholder = "https://dummyimage.com/300";


const OnSaleProductCard = ({ onSaleProduct, hidetitle }) => {
    // console.log("onSaleProducts", onSaleProduct);
    const settings = useSelector(state => state.setting)
    const currencyType = settings.currencyOption
    // console.log("currencyType", currencyType)
    let currency = "$"
    if (currencyType?.currency === "dollar") { currency = "$" }
    if (currencyType?.currency === "eur") { currency = <i className="fas fa-euro-sign"></i> }
    if (currencyType?.currency === "gbp") { currency = <i className="fas fa-pound-sign"></i> }
    if (currencyType?.currency === "cad") { currency = "CA$" }

    const router = useRouter()
    const session = useSession();
    var id = ""
    var token = ""

    if (session.status === "authenticated") {
        id = session.data.user.accessToken.customer._id
        token = session.data.user.accessToken.token
        // console.log("token", token)
    }

    const dispatch = useDispatch();

    const ProductAdd = async (product) => {
        let quantity = 1

        if (session.status === "authenticated") {
            dispatch(addToCart(product, quantity, token, id))
            router.push("/shopcart")
        }
        else {
            dispatch(addToCart(product))
            router.push("/shopcart")
        }
    }

    return (
        <section className="product-cart-section" >
            <Container >
                {!hidetitle ? <div>
                    <h4 style={{ color: "#088178" }}>On Sale <span style={{ color: "black" }}>Product</span></h4>
                </div>
                    : null}
                <div>
                    <div className="on-sale-product">
                        {onSaleProduct && onSaleProduct?.length > 0 ? (
                            <>
                                {onSaleProduct.map((product, i) =>
                                (
                                    <div className="on-sale-product-card" key={i}>
                                        <div className="on-sale-image-wrapper">


                                         {/* Intentionally not using link but useing anchor tag as it shows the review of prev product when we redirect */}

                                            <Link href={`/product/[singleproduct]?url=${product.url}`} as={`/product/${product.url}`}>
                                                <img
                                                    className="img-on-sale"
                                                    src={getImage(product.feature_image, 'original')}
                                                    height="280px"
                                                    width="100%"
                                                    onError={(e) => e.type === 'error' ? e.target.src = placeholder : null}
                                                />
                                            </Link>
                                     {/* So instead using anchor tag */}
                                            {/* <a href={`/product/${product.url}`}>
                                                <img
                                                    className="img-on-sale"
                                                    src={getImage(product.feature_image, 'original')}
                                                    height="280px"
                                                    width="100%"
                                                    onError={(e) => e.type === 'error' ? e.target.src = placeholder : null}
                                                />
                                            </a> */}


                                        </div>
                                        <div className="on-sale-product-card-body">
                                            <div className="save-price">
                                                <span className="percantage-save">
                                                    {Math.round(
                                                        (100 / product.pricing.price) *
                                                        (product.pricing.price -
                                                            product.pricing.sellprice)
                                                    )}
                                                    % off
                                                </span>
                                            </div>
                                            <div className="product-categoryname" >
                                                {product?.categoryId.map((item, i) =>
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
                                                            <strong className="sale-price">{currency} {product.pricing.sellprice.toFixed(2)}
                                                            </strong>
                                                        ) : (
                                                            ""
                                                        )}</span>
                                                    <span
                                                        className={
                                                            product.pricing.sellprice ? "has-sale-price" : ""
                                                        }
                                                    >
                                                        ${product.pricing.price.toFixed(2)}
                                                    </span>
                                                </div>
                                                <OverlayTrigger style={{ backgroundColor: "#088178" }}
                                                    placement="top"
                                                    overlay={
                                                        <Tooltip style={{ color: "#088178" }} id={"tooltip-top"}>
                                                            add to cart
                                                        </Tooltip>
                                                    }
                                                >
                                                    <div className="add-to-cart">
                                                        {/* <Link href="/shopcart"> */}
                                                        <a className="cart-icon" onClick={() => ProductAdd(product)}>
                                                            <i className="fas fa-shopping-bag font-awesome-icon" aria-hidden="true"></i>
                                                        </a>
                                                        {/* </Link> */}
                                                    </div>
                                                </OverlayTrigger>
                                                {/* <div className="add-to-cart"> */}
                                                {/* <Link href="/shopcart">
                                            <a className="cart-icon" onClick={() => ProductAdd(product)}>
                                                <i className="fas fa-shopping-bag font-awesome-icon" aria-hidden="true"></i>
                                            </a>
                                            </Link>
                                        </div> */}

                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </>
                        ) :
                            <div style={{ padding: "50px" }}>
                                <p style={{ display: "flex", alignItems: "center", justifyContent: "center" }}>Product not available</p>
                            </div>
                        }

                    </div>
                </div>
            </Container>
        </section>
    )
}
export default OnSaleProductCard;