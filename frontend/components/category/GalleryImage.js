import React, { Fragment, useEffect, useState } from "react";
import Slider from "react-slick";
import { GlassMagnifier } from "react-image-magnifiers";
import { currencySetter, getImage, getPrice, isDiscount, isVariantDiscount, mutation } from "../../utills/helpers";
import Carousel from 'react-bootstrap/Carousel'
import StarRating from "../../components/breadcrumb/rating";
import { addToCart } from "../../redux/actions/cartAction";
import { useDispatch, useSelector } from "react-redux";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import calculateDiscount from "../../utills/calculateDiscount";
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';
import { ADD_TO_CART_QUERY, GET_USER_CART, UPDATE_CART_PRODUCT } from "../../queries/cartquery";
import { query } from "../../utills/helpers";
import CheckZipcode from "../account/component/CheckZipcode";
import { capitalize } from "lodash";
var placeholder = "https://dummyimage.com/300";
const GalleryImagesComponents = (props) => {
    var id = ""
    var token = ""
    const dispatch = useDispatch();
    const session = useSession()
    const router = useRouter();
    const { singleproducts, stockClass, setStockClass, currency, lowStockThreshold, outOfStockVisibility, outOfStockThreshold, decimal } = props;
    const [available, setavailable] = useState(false)
    const [Lable, setLable] = useState("In Stock")
    const [variantSelect, setVariantSelect] = useState()
    const [parentId, setParentId] = useState()
    const [error, seterror] = useState(false)
    const [singleprod, setSingleprod] = useState(singleproducts)
    const [selectedAttrs, setSelectedAttrs] = useState([])
    const [comboData, setComboData] = useState([])
    const [priceRange, setPriceRange] = useState([]);
    const [sellpriceRange, setSellpriceRange] = useState([]);
    useEffect(() => {
        if (singleproducts && !variantSelect ? (singleproducts.quantity <= lowStockThreshold) : (comboData && comboData.length > 1 && variantSelect ? null : (comboData[0]?.quantity <= lowStockThreshold))) {
            setStockClass("low-stock")
            setLable("Low Stock")
        }
        if (singleproducts && !variantSelect ? (singleproducts.quantity <= outOfStockThreshold) : (comboData && comboData.length > 1 && variantSelect ? null : (comboData[0]?.quantity <= outOfStockThreshold))) {
            setStockClass("out-of-stock")
            setLable("Out Of Stock")
        }
        if (singleproducts && !variantSelect ? (singleproducts.quantity > lowStockThreshold) : (comboData && comboData.length > 1 && variantSelect ? null : (comboData[0]?.quantity > lowStockThreshold))) {
            setStockClass("in-stock")
            setLable("In Stock")
        }
        if (!comboData?.length && variantSelect) {
            setStockClass("not-available")
            setLable("Not available")
        }
        if (comboData?.length === 1 && variantSelect) {
            singleprod.comboData = comboData
            setSingleprod({ ...singleprod })
        }
    }, [singleproducts.quantity, lowStockThreshold, outOfStockThreshold, comboData])

    useEffect(() => {
        let priceData = [];
        let sellPriceData = [];
        if (comboData && comboData.length) {
            priceData = comboData.map((c) => {
                return c.pricing.price
            })
            sellPriceData = comboData.map((c) => {
                return c.pricing.sellprice
            })
            setPriceRange([...priceData])
            setSellpriceRange([...sellPriceData])
        }
    }, [comboData])

    if (session.status === "authenticated") {
        id = session?.data?.user?.accessToken?.customer?._id
        token = session?.data?.user?.accessToken?.token
    }

    const settings = {
        customPaging: function (i) {
            return (
                <a>
                    <img
                        src={getImage(props.galleryImages[i], 'thumbnail')}
                        alt="Thumbnail"
                        className="thumbnail-image"
                        onError={(e) => e.type === 'error' ? e.target.src = placeholder : null}
                    />
                </a>
            );
        },
        dots: true,
        dotsClass: "slick-dots slick-thumb",
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        touchMove: false,
    };
    const checkzipcode = (result) => {
        setavailable(result)
    }
    const addToCartProduct = async (product) => {
        if (singleproducts.attribute_master.length > 0 && selectedAttrs.length !== singleproducts.attribute_master.length) {
            seterror(true)
        }
        else {
            seterror(false)
            let quantity = 1
            if (session.status === "authenticated") {
                let productInCart = false;
                query(GET_USER_CART, id, token).then(res => {
                    let cart_id = res?.data?.cartbyUser?.id;
                    const inCartProducts = res?.data?.cartbyUser?.cartItem;
                    inCartProducts?.map(inCartProduct => {
                        if (product._id === inCartProduct.productId && comboData.some((variant) => variant.id === inCartProduct.variantId)) {
                            productInCart = true;
                            let Cart = inCartProducts.map(item => {

                                if (comboData.some((variant) => variant.id === item.variantId)) {
                                    return {
                                        productId: item?.productId,
                                        qty: item.productId === product?._id ? item?.qty + quantity : item?.qty,
                                        productTitle: item?.productTitle,
                                        productImage: item?.productImage,
                                        productPrice: item?.productPrice?.toString(),
                                        shippingClass: product?.shipping?.shippingClass,
                                        taxClass: product?.taxClass,
                                        variantId: item?.variantId,
                                        attributes: item?.attributes,
                                        productQuantity: item?.productQuantity,
                                    }
                                }
                                else {
                                    return {
                                        productId: item?.productId,
                                        qty: item?.qty,
                                        productTitle: item?.productTitle,
                                        productImage: item?.productImage,
                                        productPrice: item?.productPrice?.toString(),
                                        shippingClass: product?.shipping?.shippingClass,
                                        taxClass: product?.taxClass,
                                        variantId: item?.variantId,
                                        attributes: item?.attributes,
                                        productQuantity: item?.productQuantity,
                                    }
                                }
                            }
                            )
                            let variables = {
                                id: cart_id,
                                products: Cart,
                                total: 0,
                            }
                            mutation(UPDATE_CART_PRODUCT, variables, token).then(res => {
                                router.push("/shopcart")
                                dispatch(addToCart(variables))
                            })
                        } else if (comboData.length === 0) {
                            if (product._id === inCartProduct.productId) {
                                let Cart = inCartProducts?.map(item => {
                                    productInCart = true;
                                    if (inCartProducts.some((i) => i.productId === item.productId)) {
                                        return {
                                            productId: item?.productId,
                                            qty: item.productId === product?._id ? item?.qty + quantity : item?.qty,
                                            productTitle: item?.productTitle,
                                            productImage: item?.productImage,
                                            productPrice: item?.productPrice?.toString(),
                                            shippingClass: product?.shipping?.shippingClass,
                                            taxClass: product?.taxClass,
                                            variantId: item?.variantId,
                                            attributes: item?.attributes,
                                            productQuantity: item?.productQuantity,
                                        }
                                    } else {

                                        if (comboData.length === 0) {
                                            return {
                                                productId: item?.productId,
                                                qty: item?.qty,
                                                productTitle: item?.productTitle,
                                                productImage: item?.productImage,
                                                productPrice: item?.productPrice?.toString(),
                                                shippingClass: product?.shipping?.shippingClass,
                                                taxClass: product?.taxClass,
                                                variantId: item?.variantId,
                                                attributes: item?.attributes,
                                                productQuantity: item?.productQuantity
                                            }
                                        }
                                    }

                                }
                                )

                                let variables = {
                                    id: cart_id,
                                    products: Cart,
                                    total: 0,
                                }
                                mutation(UPDATE_CART_PRODUCT, variables, token).then(res => {
                                    router.push("/shopcart")
                                    dispatch(addToCart(variables))
                                })
                            }
                        }
                    })
                    if (!productInCart) {
                        if (comboData.length > 0) {
                            let attributesData = []
                            selectedAttrs.map((selectedAttribute) => {
                                let singleAttribute = product.attribute_master.find((data) => data.id === selectedAttribute.name)
                                let singleAttributeValues = singleAttribute.attribute_values.find((data) => data._id === selectedAttribute.value)
                                let AttributeObject = {
                                    name: singleAttribute.name,
                                    value: singleAttributeValues.name
                                }
                                attributesData.push(AttributeObject)
                            })

                            let variables = {
                                total: comboData[0]?.pricing?.sellprice * quantity || comboData[0]?.pricing?.price * quantity || product?.pricing?.sellprice * quantity || product?.pricing?.price * quantity,
                                userId: id,
                                productId: product?._id,
                                qty: quantity,
                                productTitle: product?.name,
                                productImage: comboData[0]?.image || product?.feature_image,
                                productPrice: (comboData[0]?.pricing?.sellprice || comboData[0]?.pricing?.price || product?.pricing?.sellprice || product?.pricing?.sellprice)?.toString(),
                                variantId: comboData[0]?.id,
                                productQuantity: comboData[0]?.quantity || product?.quantity,
                                attributes: attributesData,
                                shippingClass: product?.shipping?.shippingClass,
                                taxClass: product?.taxClass
                            }
                            mutation(ADD_TO_CART_QUERY, variables, token).then(res => {
                                router.push("/shopcart")
                                dispatch(addToCart(variables))
                            })
                        }
                        else {
                            let variables = {
                                total: product?.pricing?.sellprice * quantity || product?.pricing?.price * quantity,
                                userId: id,
                                productId: product?._id,
                                qty: quantity,
                                productTitle: product?.name,
                                productImage: product?.feature_image,
                                productPrice: (product?.pricing?.sellprice || product?.pricing?.price)?.toString(),
                                variantId: "",
                                productQuantity: parseInt(product?.quantity
                                ),
                                attributes: [],
                                shippingClass: product?.shipping?.shippingClass,
                                taxClass: product?.taxClass
                            }
                            mutation(ADD_TO_CART_QUERY, variables, token).then(res => {
                                router.push("/shopcart")
                                dispatch(addToCart(variables))
                            })
                        }

                    }
                })
            }
            else {
                let attributesData = []
                selectedAttrs.map((selectedAttribute) => {
                    let singleAttribute = product.attribute_master.find((data) => data.id === selectedAttribute.name)
                    let singleAttributeValues = singleAttribute.attribute_values.find((data) => data._id === selectedAttribute.value)
                    let AttributeObject = {
                        name: singleAttribute.name,
                        value: singleAttributeValues.name
                    }
                    attributesData.push(AttributeObject)
                })
                let variables = {
                    total: comboData[0]?.pricing?.sellprice * quantity || comboData[0]?.pricing?.price * quantity || product?.pricing?.sellprice * quantity || product?.pricing?.price * quantity,
                    userId: id,
                    url: product?.url,
                    _id: product?._id,
                    qty: quantity,
                    name: product?.name,
                    feature_image: comboData[0]?.image || product?.feature_image,
                    pricing: comboData[0]?.pricing?.sellprice || comboData[0]?.pricing?.price || product?.pricing?.sellprice || product?.pricing?.sellprice,
                    variantId: comboData[0]?.id,
                    productQuantity: comboData[0]?.quantity || product?.quantity,
                    attributes: attributesData,
                    shippingClass: product?.shipping?.shippingClass,
                    taxClass: product?.taxClass
                }
                dispatch(addToCart(variables))
                router.push("/shopcart")
            }
        }
    }

    const prepareComb = (data) => {
        let com = singleproducts.variation_master

        data.map(item => {
            com = com.filter(combo => {
                return combo.combination.includes(item.value)
            })
        });
        setComboData([...com])
        return com;
    };

    const prepareData = (e, name) => {
        setVariantSelect(e.target.value)
        setParentId(name)
        let data = selectedAttrs
        if (data.length) {
            if (!data.some(val => val.name == name)) {
                data.push({ 'name': name, 'value': e.target.value })
            } else {
                data.forEach((attr) => {
                    if (attr.name == name) {
                        attr.value = e.target.value
                    }
                })
            }
        } else {
            data.push({ 'name': name, 'value': e.target.value })
        }
        setSelectedAttrs([...data])
        prepareComb(data)
    };

    return (
        <>
            <div className="single-product row mb-50" style={{ display: 'flex' }}>
                <div className="single-product-image col-md-6 col-sm-12 col-xs-12">
                    <>
                        <div className="singleroduct-gallery-slider">
                            {props.galleryImages && props.galleryImages?.length ? (
                                <Slider {...settings}>
                                    {props.galleryImages.map((gallery, index) => (
                                        <div key={index}>
                                            <GlassMagnifier
                                                imageSrc={!variantSelect ?
                                                    getImage(gallery, 'original')
                                                    :
                                                    (comboData?.length && variantSelect ?
                                                        (comboData?.length > 1 ?
                                                            getImage(gallery, 'original')
                                                            :
                                                            (comboData[0].image.length ?
                                                                getImage(comboData[0].image, 'original')
                                                                :
                                                                getImage(gallery, 'original')))
                                                        :
                                                        getImage(gallery, 'original'))}
                                                // imageSrc="https://dummyimage.com/300"
                                                imageAlt="Example"
                                                largeImageSrc={getImage(gallery, 'large')} // Optional
                                                className="gallery-image"
                                                magnifierSize={window.innerWidth < 1025 ? "60%" : "30%"}
                                                magnifierBorderSize={5}
                                                magnifierBorderColor="rgba(0, 0, 0, .5)"
                                                onError={(e) => e.type === 'error' ? e.target.src = placeholder : null}
                                            />
                                        </div>
                                    ))}
                                </Slider>)
                                : (
                                    <img src={getImage('', 'large')}></img>
                                )}
                        </div>
                    </>
                </div>
                <div className="single-product-detail col-md-6 col-sm-12 col-xs-12">
                    <div className="detail-info">
                        <h2>{capitalize(singleproducts.name)}</h2>
                        <div className="product-detail-rating">
                            <div className="pro-details-brand">
                                <span> Category: {singleproducts.categoryId.map((item, index) => <span>{index < singleproducts.categoryId.length - 1 ? (item.name + ", ") : item.name}</span>)}</span>
                            </div>
                            <div className="pro-details-rating">
                                <StarRating singleproducts={singleproducts} stars={singleproducts?.rating} />
                            </div>
                        </div>
                        <div className="clearfix product-price-cover">
                            {comboData && comboData.length || !variantSelect ?
                                <div className="product-price primary-color float-left">

                                    <span className=" mx-2">
                                        {singleproducts.pricing.sellprice ? (
                                            <strong className="sale-price" style={{ fontSize: "25px" }}>

                                                {comboData && comboData.length ?
                                                    (comboData && comboData.length > 1 ?
                                                        (sellpriceRange ?
                                                            (currency + " " + getPrice(Math.min(...sellpriceRange)) + "  -  " + currency + " " + getPrice(Math.max(...sellpriceRange)))
                                                            :
                                                            null)
                                                        : currency + " " + getPrice(comboData[0]?.pricing?.sellprice || comboData[0]?.pricing?.price, decimal))
                                                    : (variantSelect ? null : currency + " " + getPrice(singleproducts?.pricing?.sellprice))}
                                            </strong>
                                        ) : (

                                            <strong className="sale-price" style={{ fontSize: "25px" }}>

                                                {currency}{" "}{getPrice(singleproducts?.pricing?.price, decimal)}
                                            </strong>
                                        )}</span>
                                    {singleproducts?.pricing?.sellprice && singleproducts?.pricing?.sellprice < singleproducts?.pricing?.price ? <span
                                        className={
                                            singleproducts?.pricing?.sellprice ? "has-sale-price mx-2" : ""
                                        } style={{ fontSize: "17px" }}
                                    >
                                        {comboData && comboData.length ? (comboData && comboData.length > 1 ? (priceRange ? (currency + " " + getPrice(Math.min(...priceRange)) + "  -  " + currency + " " + getPrice(Math.max(...priceRange))) : null) : comboData[0]?.pricing?.sellprice ? currency + " " + getPrice(comboData[0]?.pricing?.price, decimal) : null) : (variantSelect ? null : currency + " " + singleproducts?.pricing?.sellprice ? getPrice(singleproducts?.pricing?.price, decimal) : null)}
                                    </span>
                                        : null}
                                    {comboData && comboData.length > 1 ? null :
                                        <span className=" mx-2">

                                            {!comboData.length && !variantSelect ? (isDiscount(singleproducts) && calculateDiscount(singleproducts?.pricing?.price, singleproducts?.pricing?.sellprice)) : comboData && comboData.length > 1 ? null : (isVariantDiscount(comboData) && calculateDiscount(comboData[0]?.pricing?.price, comboData[0]?.pricing?.sellprice))}
                                        </span>}

                                </div> : <h6 style={{ color: 'red' }}>Sorry, this combination is not available. Choose another variant.</h6>}
                        </div>
                        <div className="short-desc mb-30">
                            <p> {singleproducts?.short_description}</p>
                        </div>
                        {Lable !== "Out Of Stock" &&
                            <button type="button"
                                className="btn btn-success button button-add-to-cart"
                                style={{ marginTop: 12, backgroundColor: "#088178" }}
                                onClick={() => addToCartProduct(singleproducts)}
                                disabled={(comboData && comboData.length || !variantSelect) ? false : true}
                            >
                                Add to Cart
                            </button>
                        }
                        <div className="varaint-select">
                            {singleproducts?.attribute_master?.map((attr) => {
                                return (<>
                                    <FormControl>
                                        <FormLabel id="demo-row-radio-buttons-group-label">{capitalize(attr.name)}</FormLabel>
                                        <RadioGroup
                                            row
                                            aria-labelledby="demo-row-radio-buttons-group-label"
                                            name="row-radio-buttons-group"
                                            value={variantSelect}
                                            onChange={(e) => prepareData(e, attr.id)}
                                        >
                                            {attr.attribute_values.map((val) => {
                                                return (
                                                    <FormControlLabel value={val._id} control={<Radio />} label={capitalize(val.name)}
                                                    />
                                                )
                                            })}

                                        </RadioGroup>
                                    </FormControl>

                                    {error && !selectedAttrs.some((selectedAtt) => attr.id === selectedAtt.name) ? <p style={{ color: 'red' }}>Please Select The {capitalize(attr.name)}</p>
                                        : null}
                                </>)
                            })}
                        </div>

                        <CheckZipcode checkzipcode={checkzipcode} />

                        {singleproducts?.custom_field && singleproducts.custom_field?.length > 0 ? (
                            <>
                                {singleproducts?.custom_field?.map(field => (<div className="product-attributes">
                                    <ul className="product-meta font-xs color-grey mt-50">
                                        <p >
                                            {`${field?.key} - ${' '}`} <strong> {field?.value}</strong>
                                        </p>
                                    </ul>
                                </div>))}
                            </>
                        ) : null}

                        <ul className="product-meta font-xs color-grey mt-50">
                            <p className="">SKU: {comboData && comboData.length ? comboData[0].sku : singleproducts?.sku}</p>
                            {newFunction(singleproducts)}
                            <p className="">Availablity: <span className={stockClass}>{Lable}</span></p>
                        </ul>
                    </div>
                </div>
            </div>
        </>
    );
};

export default GalleryImagesComponents;
function newFunction(singleproducts) {
    return <p className="">Tags: {singleproducts.__typename}</p>;
}

