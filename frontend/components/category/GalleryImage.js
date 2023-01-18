import React, { Fragment } from "react";
import Slider from "react-slick";
import { GlassMagnifier } from "react-image-magnifiers";
import { getImage } from "../../utills/helpers";
import Carousel from 'react-bootstrap/Carousel'
import StarRating from "../../components/breadcrumb/rating";
import { addToCart } from "../../redux/actions/cartAction";
import { useDispatch } from "react-redux";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
var placeholder = "https://dummyimage.com/300";

const GalleryImagesComponents = (props) => {
    const dispatch = useDispatch();
    const session = useSession()
    const router = useRouter();
    const { singleproducts } = props;
    // console.log("single", singleproducts)
    console.log('galleryImages', props.galleryImages)
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
    // console.log("galleryImage", props.galleryImages)
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
                                    <h1>no product Available</h1>
                                )}

                        </div>
                    </>
                </div>
                <div className="single-product-detail col-md-6 col-sm-12 col-xs-12">
                    <div className="detail-info">
                        <h2>{singleproducts.name}</h2>
                        <div className="product-detail-rating">
                            <div className="pro-details-brand">
                                <span> Brands: {singleproducts.categoryId.map(item => <span>{item.name}</span>)}</span>
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
                                            ${singleproducts.pricing.sellprice.toFixed(2)}
                                        </strong>
                                    ) : (
                                        ""
                                    )}</span>
                                <span
                                    className={
                                        singleproducts.pricing.sellprice ? "has-sale-price mx-2" : ""
                                    } style={{ fontSize: "17px" }}
                                >
                                    ${singleproducts.pricing.price.toFixed(2)}
                                </span>
                                <span className=" mx-2">
                                    {Math.round(
                                        (100 / singleproducts.pricing.price) *
                                        (singleproducts.pricing.price -
                                            singleproducts.pricing.sellprice)
                                    )}
                                    % off
                                </span>
                            </div>
                        </div>
                        <div className="short-desc mb-30">
                            <p> {singleproducts?.short_description}</p>
                        </div>
                        {singleproducts.custom_field && singleproducts.custom_field?.length > 0 ? (
                            <>
                                <div className="attr-detail attr-color mb-15">
                                    <strong className="mr-10">Color</strong>
                                </div>
                                <div className="attr-detail attr-color mb-15">
                                    <strong className="mr-10">Size</strong>
                                </div>
                            </>
                        ) : null}
                        <button type="button"
                            className="btn btn-success button button-add-to-cart"
                            style={{ marginTop: 12, backgroundColor: "#088178" }}
                            onClick={() => addToCartProduct(singleproducts)}>Add to Cart</button>
                        <ul className="product-meta font-xs color-grey mt-50">
                            <p className="">SKU: {singleproducts.sku}</p>
                            <p className="">Tags: {singleproducts.__typename}</p>
                            <p className="">Availablity: <span className="availablity-text">{singleproducts.quantity} item in stock</span></p>
                        </ul>
                    </div>
                </div>
            </div>

        </>
    );
};

export default GalleryImagesComponents;
