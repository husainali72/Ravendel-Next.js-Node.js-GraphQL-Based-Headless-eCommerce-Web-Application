import { Container, OverlayTrigger, Tooltip } from 'react-bootstrap';
import Link from "next/link";
import { useState, useEffect } from 'react';
import { getImage, getPrice, currencySetter, isDiscount } from '../../utills/helpers';
import StarRating from "../breadcrumb/rating";
import { useRouter } from 'next/router';
import { useSelector, useDispatch } from 'react-redux';
import { addToCart } from "../../redux/actions/cartAction";
import { useSession } from "next-auth/react";
import calculateDiscount from '../../utills/calculateDiscount';
import { capitalize } from 'lodash';

export const ProductNav = (props) => {
    const dispatch = useDispatch();
    const session = useSession()
    const router = useRouter();
    const settings = useSelector(state => state.setting)
    const currencyType = settings.currencyOption
    const [currency, setCurrency] = useState("$")
    const [decimal, setdecimal] = useState(2)
    useEffect(() => {
        setdecimal(settings.currencyOption.number_of_decimals)
        currencySetter(settings, setCurrency);
    }, [settings?.currencyOption])
    const addToCartProduct = (product) => {
        let quantity = 1;
        if (session.status === "authenticated") {
            let token = session.data.user.accessToken.token
            let id = session.data.user.accessToken.customer._id
            dispatch(addToCart(product, quantity, token, id))
            router.push("/shopcart")
        }
        else {
            dispatch(addToCart(product))
            router.push("/shopcart")
        }
    }
    return (
        <div className="on-sale-product">
            {props.items.map((product, i) => (
                <div className="on-sale-product-card" key={i}>
                    <div className="on-sale-image-wrapper">
                        <Link href={`/product/[singleproduct]?url=${product.url}`} as={`/product/${product.url}`}>
                            <img
                                className="img-on-sale"
                                src={getImage(product?.feature_image, 'original')}
                                onError={(e) => e.type === 'error' ? e.target.src = "https://dummyimage.com/300" : null}
                            />
                        </Link>
                    </div>
                    <div className="on-sale-product-card-body">
                        {isDiscount(product) ? <div className="save-price">
                            <span className="percantage-save">
                                {calculateDiscount(product?.pricing?.price, product?.pricing?.sellprice)}
                            </span>
                        </div> : null}
                        <div className="product-categoryname" >
                            {product?.categoryId.map((item, i) =>
                            (<span key={i}>{(product?.categoryId?.length - 1 === i) ? (<span>{capitalize(item?.name)} </span>) : <span>{capitalize(item?.name)}, </span>}
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
                            )}
                        </div>
                        <div className="on-sale-product-detail">
                            <div className="product-price" style={{ justifyContent: "left", alignContent: "left", m: 0 }}>
                                <StarRating className="rating" stars={product?.name} singleproducts={product} />
                                <span >{product.pricing.sellprice ? (
                                    <strong className="sale-price">{currency} {getPrice(product?.pricing?.sellprice, decimal)}
                                    </strong>
                                ) : (
                                    <strong className="sale-price">{currency} {getPrice(product?.pricing?.price, decimal)}</strong>

                                )}</span>
                                {product.pricing.sellprice ? <span
                                    className={
                                        product.pricing.sellprice ? "has-sale-price" : ""
                                    }
                                >

                                    {currency} {getPrice(product.pricing.price, decimal)}
                                </span> : null}

                            </div>
                            {product?.quantity > 0 ? <OverlayTrigger style={{ backgroundColor: "#088178" }}
                                placement="top"
                                overlay={
                                    <Tooltip style={{ color: "#088178" }} id={"tooltip-top"}>
                                        add to cart
                                    </Tooltip>
                                }
                            >
                                <div className="add-to-cart">
                                    {/* <Link href="/shopcart"> */}
                                    <a className="cart-icon" onClick={() => addToCartProduct(product)}>
                                        <i className="fas fa-shopping-bag font-awesome-icon" aria-hidden="true"></i>
                                    </a>
                                    {/* </Link> */}
                                </div>
                            </OverlayTrigger> : <p className="out-of-stock-card">Out Of Stock</p>}
                        </div>
                    </div>
                </div>
            ))}
        </div>
    )
}
export default ProductNav;