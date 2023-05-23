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
// import NoImagePlaceHolder from "../images/NoImagePlaceHolder.png"
import NoImagePlaceHolder from "../../public/assets/images/NoImagePlaceHolder.png"
import Select from 'react-select';
import e from "cors";
var placeholder = "https://dummyimage.com/300";
const GalleryImagesComponents = (props) => {
    var id = ""
    var token = ""
    const dispatch = useDispatch();
    const session = useSession()
    const router = useRouter();
    const { singleproducts, stockClass, setStockClass, currency, lowStockThreshold, outOfStockVisibility, outOfStockThreshold, decimal } = props;
    const [Lable, setLable] = useState("In Stock")
    const [variantSelect, setVariantSelect] = useState()
    const [parentId, setParentId] = useState()
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
        if (comboData?.length === 1 && variantSelect){
            singleprod.comboData = comboData
            setSingleprod({...singleprod})
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
    const addToCartProduct = async (product) => {
        let quantity = 1
        if (session.status === "authenticated") {
            let productInCart = false;
            query(GET_USER_CART, id, token).then(res => {
                let cart_id = res?.data?.cartbyUser?.id;
                const inCartProducts = res?.data?.cartbyUser?.products;
                inCartProducts.map(inCartProduct => {
                    if (inCartProduct?.product_id === product?._id) {
                        productInCart = true;
                        let Cart = inCartProducts.map(item => {
                            return {
                                product_id: item?.product_id,
                                qty: item.product_id === product._id ? item.qty + quantity : item.qty,
                                product_title: item?.product_title,
                                product_image: item?.product_image,
                                product_price: item?.product_price,
                                shipping_class: product?.shipping?.shipping_class,
                                tax_class: product?.tax_class
                            }
                        })
                        let variables = {
                            id: cart_id,
                            products: Cart,
                            total: 0,
                        }
                        mutation(UPDATE_CART_PRODUCT, variables, token).then(res => {
                            router.push("/shopcart")
                        })
                    }
                })
                if (!productInCart) {
                    let variables = {
                        total: product?.pricing?.sellprice * quantity || product?.pricing?.price * quantity,
                        user_id: id,
                        product_id: product?._id,
                        qty: quantity,
                        product_title: product?.name,
                        product_image: product?.feature_image?.original,
                        product_price: product?.pricing?.sellprice || product?.pricing?.price,

                        product_quantity: product?.quantity,

                        shipping_class: product?.shipping?.shipping_class,
                        tax_class: product?.tax_class
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
                        <h2>{singleproducts.name}</h2>
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
                                                        :
                                                        currency + " " + getPrice(comboData[0]?.pricing?.sellprice, decimal))
                                                    :
                                                    (variantSelect ? null : currency + " " + getPrice(singleproducts?.pricing?.sellprice, decimal))}

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
                                        {comboData && comboData.length ? (comboData && comboData.length > 1 ? (priceRange ? (currency + " " + getPrice(Math.min(...priceRange)) + "  -  " + currency + " " + getPrice(Math.max(...priceRange))) : null) : currency + " " + getPrice(comboData[0]?.pricing?.price, decimal)) : (variantSelect ? null : currency + " " + getPrice(singleproducts?.pricing?.price, decimal))}
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
                          {singleproducts.attribute_master.map((attr) => {
                            return (
                                <FormControl>
                                    <FormLabel id="demo-row-radio-buttons-group-label">{attr.name}</FormLabel>
                                    <RadioGroup
                                        row
                                        aria-labelledby="demo-row-radio-buttons-group-label"
                                        name="row-radio-buttons-group"
                                        value={variantSelect}
                                        onChange={(e) => prepareData(e, attr.id)}
                                    >
                                        {attr.attribute_values.map((val) => {
                                            return (
                                                <FormControlLabel value={val._id} control={<Radio />} label={val.name}
                                                />
                                            )
                                        })}
                                    </RadioGroup>
                                </FormControl>
                            )
                        })}
                        </div>

                        <CheckZipcode />
                        {singleproducts?.custom_field && singleproducts.custom_field?.length > 0 ? (
                            <>
                                {singleproducts?.custom_field?.map(field => (<div className="product-attributes">
                                    <ul className="product-meta font-xs color-grey mt-50">
                                        <p >
                                            {`${field.key} - ${' '}`} <strong> {field.value}</strong>
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

