import React, { Fragment, useEffect, useState } from "react";
import Slider from "react-slick";
import { GlassMagnifier } from "react-image-magnifiers";
import { currencySetter, getImage, getPrice } from "../../utills/helpers";
import Carousel from 'react-bootstrap/Carousel'
import StarRating from "../../components/breadcrumb/rating";
import { addToCart } from "../../redux/actions/cartAction";
import { useDispatch, useSelector } from "react-redux";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import calculateDiscount from "../../utills/calculateDiscount";
var placeholder = "https://dummyimage.com/300";
const GalleryImagesComponents = (props) => {
    const dispatch = useDispatch();
    const session = useSession()
    const router = useRouter();
    const { singleproducts, currency, lowStockThreshold, outOfStockVisibility, outOfStockThreshold, decimal } = props;
    const stockLable = (stockQuantity) => {
        let lable = "In Stock"
        if (stockQuantity <= lowStockThreshold) {
            lable = "Low Stock"
        }
        if (stockQuantity <= outOfStockThreshold) {
            lable = "Out Of Stock"
        }
        return lable
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
    const addToCartProduct = (product) => {
        let quantity = 1
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
                                                imageSrc={getImage(gallery, 'original')}
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
                                <span> Category: {singleproducts.categoryId.map(item => <span>{item.name}</span>)}</span>
                            </div>
                            <div className="pro-details-rating">
                                <StarRating stars={"5"} />
                            </div>
                        </div>
                        <div className="clearfix product-price-cover">
                            <div className="product-price primary-color float-left">
                                <span className=" mx-2">
                                    {singleproducts.pricing.sellprice ? (
                                        <strong className="sale-price" style={{ fontSize: "25px" }}>

                                            {currency}{" "}{getPrice(singleproducts.pricing.sellprice, decimal)}
                                        </strong>
                                    ) : (
                                        <strong className="sale-price" style={{ fontSize: "25px" }}>

                                            {currency}{" "}{getPrice(singleproducts.pricing.price, decimal)}
                                        </strong>
                                    )}</span>
                                {singleproducts.pricing.sellprice ? <span
                                    className={
                                        singleproducts.pricing.sellprice ? "has-sale-price mx-2" : ""
                                    } style={{ fontSize: "17px" }}
                                >

                                    {currency}{getPrice(singleproducts.pricing.price, decimal)}
                                </span>
                                    : null}
                                <span className=" mx-2">
                                    {calculateDiscount(singleproducts.pricing.price, singleproducts.pricing.sellprice)}
                                </span>
                            </div>
                        </div>
                        <div className="short-desc mb-30">
                            <p> {singleproducts?.short_description}</p>
                        </div>
                        {singleproducts.custom_field && singleproducts.custom_field?.length > 0 ? (
                            <>

                                {singleproducts.custom_field.map(field => (<div>
                                    <ul className="product-meta font-xs color-grey mt-50">
                                        <p >
                                            {`${field.key} - ${' '}`} <strong> {field.value}</strong>
                                        </p>
                                    </ul>
                                </div>))}
                            </>
                        ) : null}
                        <button type="button"
                            className="btn btn-success button button-add-to-cart"
                            style={{ marginTop: 12, backgroundColor: "#088178" }}
                            onClick={() => addToCartProduct(singleproducts)}>Add to Cart</button>

                        <ul className="product-meta font-xs color-grey mt-50">
                            <p className="">SKU: {singleproducts.sku}</p>
                            {newFunction(singleproducts)}
                            <p className="">Availablity: <span className="availablity-text">{stockLable(singleproducts.quantity)}</span></p>
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

