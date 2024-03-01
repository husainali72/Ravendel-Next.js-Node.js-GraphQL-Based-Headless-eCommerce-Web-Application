import React, { useEffect, useState } from "react";
import Slider from "react-slick";
import { GlassMagnifier } from "react-image-magnifiers";
import {
  getImage,
  getPrice,
  imageOnError,
  isDiscount,
  isVariantDiscount,
  mutation,
  query,
} from "../../utills/helpers";
import StarRating from "../../components/breadcrumb/rating";
import { addToCart, calculateUnauthenticatedCart } from "../../redux/actions/cartAction";
import { useDispatch, useSelector } from "react-redux";
import { signOut, useSession } from "next-auth/react";
import { useRouter } from "next/router";
import calculateDiscount from "../../utills/calculateDiscount";
import {
  Radio,
  RadioGroup,
  FormControlLabel,
  FormControl,
  FormLabel,
} from "@mui/material";
import {
  ADD_TO_CART_QUERY,
  UPDATE_CART_PRODUCT,
} from "../../queries/cartquery";
import CheckZipcode from "../account/component/CheckZipcode";
import { capitalize, get } from "lodash";
var placeholder = "https://dummyimage.com/300";
import NoImagePlaceHolder from "../../components/images/NoImagePlaceHolder.png";
const GalleryImagesComponents = (props) => {
  var id = "";
  var token = "";
  const dispatch = useDispatch();
  const session = useSession();
  const router = useRouter();
  const {
    currency,
    stockClass,
    singleproducts,
    setStockClass,
    lowStockThreshold,
    outOfStockVisibility,
    outOfStockThreshold,
    decimal,
    homepageData,
  } = props;
  const imageType = homepageData?.getSettings?.imageStorage?.status;
  const getSetting = useSelector((state) => state.setting);
  const cart = useSelector((state) => state.cart.cartItems);
  const [available, setavailable] = useState(false);
  const [lable, setLable] = useState("In Stock");
  const [variantSelect, setVariantSelect] = useState();
  const [parentId, setParentId] = useState();
  const [error, seterror] = useState(false);
  const [singleprod, setSingleprod] = useState(singleproducts);
  const [selectedAttrs, setSelectedAttrs] = useState([]);
  const [comboData, setComboData] = useState([]);
  const [priceRange, setPriceRange] = useState([]);
  const [sellpriceRange, setSellpriceRange] = useState([]);
  const [imgError, setImgError] = useState([]);
  const [itemInCart, setItemInCart] = useState(false);
  useEffect(() => {
    if (
      singleproducts && !variantSelect
        ? singleproducts.quantity <= lowStockThreshold
        : comboData && comboData.length > 1 && variantSelect
        ? null
        : comboData[0]?.quantity <= lowStockThreshold
    ) {
      setStockClass("low-stock");
      setLable("Low Stock");
    }
    if (
      singleproducts && !variantSelect
        ? singleproducts.quantity <= outOfStockThreshold
        : comboData && comboData.length > 1 && variantSelect
        ? null
        : comboData[0]?.quantity <= outOfStockThreshold
    ) {
      setStockClass("out-of-stock");
      setLable("Out Of Stock");
    }
    if (
      singleproducts && !variantSelect
        ? singleproducts.quantity > lowStockThreshold
        : comboData && comboData.length > 1 && variantSelect
        ? null
        : comboData[0]?.quantity > lowStockThreshold
    ) {
      setStockClass("in-stock");
      setLable("In Stock");
    }
    if (!comboData?.length && variantSelect) {
      setStockClass("not-available");
      setLable("Not available");
    }
    if (comboData?.length === 1 && variantSelect) {
      singleprod.comboData = comboData;
      setSingleprod({ ...singleprod });
    }
  }, [
    singleproducts?.quantity,
    lowStockThreshold,
    outOfStockThreshold,
    comboData,
  ]);

  useEffect(() => {
    let priceData = [];
    let sellPriceData = [];
    if (comboData && comboData.length) {
      priceData = comboData.map((c) => {
        return c.pricing.price;
      });
      sellPriceData = comboData.map((c) => {
        return c.pricing.sellprice;
      });
      setPriceRange([...priceData]);
      setSellpriceRange([...sellPriceData]);
    }
  }, [comboData]);

  if (session.status === "authenticated") {
    id = session?.data?.user?.accessToken?.customer?._id;
    token = session?.data?.user?.accessToken?.token;
  }

  const settings = {
    customPaging: function (i) {
      return (
        <a>
          <img
            src={getImage(props.galleryImages[i], imageType)}
            alt="Thumbnail"
            className="thumbnail-image"
            onError={imageOnError}
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
    setavailable(result);
  };
  const prepareAttributesData = (selectedAttrs, product) => {
    return selectedAttrs?.map((selectedAttribute) => {
      const singleAttribute = product?.attribute_master.find(
        (data) => data.id === selectedAttribute.name
      );
      const singleAttributeValues = singleAttribute?.attribute_values.find(
        (data) => data._id === selectedAttribute?.value
      );
      return {
        name: singleAttribute?.name,
        value: singleAttributeValues?.name,
      };
    });
  };

  const prepareCommonVariables = (id, product) => {
    return {
      userId: id,
      productId: get(product, "_id"),
      qty: 1,
      productTitle: get(product, "name"),
    };
  };

  const addToCartAndNavigate = (variables, token) => {
    mutation(ADD_TO_CART_QUERY, variables).then((res) => {
      router.push("/shopcart");
    }).then((res)=>{

    }).catch(async(error)=>{
      if(get(error,'extensions.code')===401){
        let product=[{
          userId: "",
          url: get(variables,'url'),
          _id: get(variables,'productId'),
          quantity: get(variables,'qty'),
          name:get(variables,'productTitle'),
          feature_image: get(variables,'productImage'),
          pricing: get(variables,'productPrice'),
          productQuantity: get(variables,'productQuantity'),
          variantId: get(variables,'variantId',""),
          qty: get(variables,'qty'),
          attributes: get(variables,'attributes'),
     }]
      const data = await signOut({ redirect: false, callbackUrl: "/" });
      localStorage.setItem("userCart", JSON.stringify([]));
      localStorage.setItem("cart", JSON.stringify(product));
      
      dispatch(calculateUnauthenticatedCart(product));
      window.location.pathname = "/shopcart";
      }
    })
  };

  const isProductInCart = (product, comboData) => {
    return cart?.some((inCartProduct) => {
      const productIdMatch = product?._id === get(inCartProduct, "productId");
      const variantIdMatch = comboData?.some(
        (variant) => variant?.id === inCartProduct?.variantId
      );
      if (comboData.length === 0) {
        return productIdMatch;
      }
      return productIdMatch && variantIdMatch;
    });
  };
  // Add product in a cart
  const addToCartProduct = async (product) => {
    const isUserAuthenticated = session?.status === "authenticated";
    const hasAttributesMismatch =
      get(singleproducts, "attribute_master")?.length > 0 &&
      selectedAttrs?.length !== get(singleproducts, "attribute_master")?.length;

    if (hasAttributesMismatch) {
      seterror(true);
      return;
    }

    seterror(false);

    const quantity = 1;

    if (isUserAuthenticated) {
      const productInCart = isProductInCart(product, comboData);
      if (!productInCart) {
        setItemInCart(false);
        const commonVariables = prepareCommonVariables(id, product);

        if (comboData.length > 0) {
          // Prepare data for product with variant
          const attributesData = prepareAttributesData(selectedAttrs, product);

          const variables = {
            ...commonVariables,
            productImage: get(
              comboData[0],
              "image",
              get(product, "feature_image")
            ),
            productPrice: get(
              comboData[0],
              "pricing.sellprice",
              get(
                comboData[0],
                "pricing.price",
                get(
                  product,
                  "pricing.sellprice",
                  get(product, "pricing.price", 0)
                )
              )
            )?.toString(),
            variantId: get(comboData[0], "id",""),
            attributes: attributesData,
          };

          addToCartAndNavigate(variables, token);
        } else {
          // Prepare data for product without variant
          const variables = {
            ...commonVariables,
            productImage: get(product, "feature_image"),
            productPrice: get(
              product,
              "pricing.sellprice",
              get(product, "pricing.price")
            )?.toString(),
            variantId: "",
            attributes: [],
          };

          addToCartAndNavigate(variables, token);
        }
      } else {
        setItemInCart(true);
      }
    } else {
      // User is not authenticated, add product to cart and navigate to shop cart page
      const attributesData = prepareAttributesData(selectedAttrs, product);

      const carts = localStorage.getItem("cart");
      const productInCart = JSON.parse(carts)?.some((inCartProduct) => {
        const productIdMatch = product?._id === get(inCartProduct, "_id");
        const variantIdMatch = comboData?.some(
          (variant) => variant?.id === inCartProduct?.variantId
        );

        if (comboData.length === 0) {
          return productIdMatch;
        }

        return productIdMatch && variantIdMatch;
      });

      if (!productInCart) {
        setItemInCart(false);
        const variables = {
          userId: id,
          url: get(product, "url"),
          _id: get(product, "_id"),
          qty: quantity,
          name: get(product, "name"),
          feature_image: get(
            comboData[0],
            "image",
            get(product, "feature_image")
          ),
          pricing: get(
            comboData[0],
            "pricing.sellprice",
            get(
              comboData[0],
              "pricing.price",
              get(
                product,
                "pricing.sellprice",
                get(product, "pricing.price", 0)
              )
            )
          ),
          productQuantity: get(comboData[0], "quantity", get(product, "quantity")),
          variantId: get(comboData[0], "id",""),
          attributes: attributesData,
        };

        dispatch(addToCart(variables));
        router.push("/shopcart");
      } else {
        setItemInCart(true);
      }
    }
  };

  const prepareComb = (data) => {
    let com = singleproducts.variation_master;

    data.map((item) => {
      com = com.filter((combo) => {
        return combo.combination.includes(item.value);
      });
    });
    setComboData([...com]);
    setItemInCart(false);
    return com;
  };

  const prepareData = (e, name) => {
    setVariantSelect(e.target.value);
    setParentId(name);
    let data = selectedAttrs;
    if (data.length) {
      if (!data.some((val) => val.name == name)) {
        data.push({ name: name, value: e.target.value });
      } else {
        data.forEach((attr) => {
          if (attr.name == name) {
            attr.value = e.target.value;
          }
        });
      }
    } else {
      data.push({ name: name, value: e.target.value });
    }
    setSelectedAttrs([...data]);
    prepareComb(data);
  };

  const getMagnifierImg = ({ variantSelect, gallery, comboData }) => {
    if (!variantSelect) {
      return getImage(gallery, imageType);
    } else {
      if (comboData?.length && variantSelect) {
        if (comboData.length > 1) {
          return getImage(gallery, imageType);
        } else {
          if (comboData[0].image.length) {
            return getImage(comboData[0].image, imageType);
          } else {
            return getImage(gallery, imageType);
          }
        }
      } else {
        return getImage(gallery, imageType);
      }
    }
  };
  useEffect(() => {
    props.galleryImages.map((gallery, index) => {
      const img = new Image();
      img.src = getMagnifierImg({
        variantSelect,
        gallery,
        comboData,
      });
      img.onerror = () => {
        setImgError((prevErrors) => [...prevErrors, index]);
      };
    });
  }, [props.galleryImages]);
  const navigateToShopCart = () => {
     router.push("/shopcart");
  };
  return (
    <>
      <div className="single-product row mb-50" style={{ display: "flex" }}>
        <div className="single-product-image col-md-6 col-sm-12 col-xs-12">
          <>
            <div className="singleroduct-gallery-slider">
              {props.galleryImages && props.galleryImages?.length ? (
                <Slider {...settings}>
                  {props.galleryImages.map((gallery, index) => {
                    let error = false;
                    return (
                      <div key={index}>
                        <img
                          style={{ display: "none" }}
                          src={
                            !variantSelect
                              ? getImage(gallery, imageType)
                              : comboData?.length && variantSelect
                              ? comboData?.length > 1
                                ? getImage(
                                    gallery,
                                    "original",
                                    false,
                                    getSetting
                                  )
                                : comboData[0].image.length
                                ? getImage(comboData[0].image, imageType)
                                : getImage(gallery, "original", imageType)
                              : getImage(gallery, imageType)
                          }
                          onError={imageOnError}
                        />
                        <GlassMagnifier
                          imageSrc={
                            imgError.indexOf(index) === -1
                              ? getMagnifierImg({
                                  variantSelect,
                                  gallery,
                                  comboData,
                                })
                              : NoImagePlaceHolder.src
                          }
                          imageAlt="Example"
                          className="gallery-image"
                          magnifierSize={
                            window.innerWidth < 1025 ? "60%" : "30%"
                          }
                          magnifierBorderSize={5}
                          magnifierBorderColor="rgba(0, 0, 0, .5)"
                        />
                      </div>
                    );
                  })}
                </Slider>
              ) : (
                <img
                  src={getImage("", "large", false, getSetting)}
                  onError={imageOnError}
                ></img>
              )}
            </div>
          </>
        </div>
        <div className="single-product-detail col-md-6 col-sm-12 col-xs-12">
          <div className="detail-info">
            <h2>{capitalize(get(singleproducts, "name"))}</h2>
            <div className="product-detail-rating">
              <div className="pro-details-brand">
                <span>
                  {" "}
                  Category:{" "}
                  {singleproducts?.categoryId?.map((item, index) => (
                    <span>
                      {index < singleproducts.categoryId.length - 1
                        ? capitalize(item.name) + ", "
                        : capitalize(item.name)}
                    </span>
                  ))}
                </span>
              </div>
              <div className="pro-details-rating">
                <StarRating
                  singleproducts={singleproducts}
                  stars={singleproducts?.rating}
                />
              </div>
            </div>
            {singleproducts?.brand?.name && (
              <div className="pro-details-brand">
                <span> Brand: {capitalize(singleproducts?.brand?.name)}</span>
              </div>
            )}
            <div className="clearfix product-price-cover">
              {(comboData && comboData.length) || !variantSelect ? (
                <div className="product-price primary-color float-left">
                  <span className=" mx-2">
                    {get(singleproducts, "pricing.sellprice") ? (
                      <strong
                        className="sale-price"
                        style={{ fontSize: "25px" }}
                      >
                        {comboData && comboData.length
                          ? comboData && comboData.length > 1
                            ? sellpriceRange
                              ? currency +
                                " " +
                                getPrice(Math.min(...sellpriceRange), decimal) +
                                "  -  " +
                                currency +
                                " " +
                                getPrice(Math.max(...sellpriceRange), decimal)
                              : null
                            : currency +
                              " " +
                              getPrice(
                                comboData[0]?.pricing?.sellprice ||
                                  comboData[0]?.pricing?.price,
                                decimal
                              )
                          : variantSelect
                          ? null
                          : currency +
                            " " +
                            getPrice(
                              singleproducts?.pricing?.sellprice,
                              decimal
                            )}
                      </strong>
                    ) : (
                      <strong
                        className="sale-price"
                        style={{ fontSize: "25px" }}
                      >
                        {currency}{" "}
                        {getPrice(singleproducts?.pricing?.price, decimal)}
                      </strong>
                    )}
                  </span>
                  {singleproducts?.pricing?.sellprice &&
                  singleproducts?.pricing?.sellprice <
                    singleproducts?.pricing?.price ? (
                    <span
                      className={
                        singleproducts?.pricing?.sellprice
                          ? "has-sale-price mx-2"
                          : ""
                      }
                      style={{ fontSize: "17px" }}
                    >
                      {comboData && comboData.length
                        ? comboData && comboData.length > 1
                          ? priceRange
                            ? currency +
                              " " +
                              getPrice(Math.min(...priceRange), decimal) +
                              "  -  " +
                              currency +
                              " " +
                              getPrice(Math.max(...priceRange), decimal)
                            : null
                          : comboData[0]?.pricing?.sellprice
                          ? currency +
                            " " +
                            getPrice(comboData[0]?.pricing?.price, decimal)
                          : null
                        : variantSelect
                        ? null
                        : currency + " " + singleproducts?.pricing?.sellprice
                        ? getPrice(singleproducts?.pricing?.price, decimal)
                        : null}
                    </span>
                  ) : null}
                  {comboData && comboData.length > 1 ? null : (
                    <span className=" mx-2">
                      {!comboData.length && !variantSelect
                        ? isDiscount(singleproducts) &&
                          calculateDiscount(
                            singleproducts?.pricing?.price,
                            singleproducts?.pricing?.sellprice
                          )
                        : comboData && comboData.length > 1
                        ? null
                        : isVariantDiscount(comboData) &&
                          calculateDiscount(
                            comboData[0]?.pricing?.price,
                            comboData[0]?.pricing?.sellprice
                          )}
                    </span>
                  )}
                </div>
              ) : (
                <h6 style={{ color: "red" }}>
                  Sorry, this combination is not available. Choose another
                  variant.
                </h6>
              )}
            </div>
            <div className="short-desc mb-30">
              <p> {singleproducts?.short_description}</p>
            </div>
            {lable !== "Out Of Stock" && (
              <button
                type="button"
                className="btn btn-success button button-add-to-cart"
                style={{ marginTop: 12, backgroundColor: "#088178" }}
                onClick={() =>
                  !itemInCart
                    ? addToCartProduct(singleproducts)
                    :navigateToShopCart()
                }
                disabled={
                  (comboData && comboData.length) || !variantSelect
                    ? false
                    : true
                }
              >
                {!itemInCart ? "Add to Cart" : "Go To Cart"}
              </button>
            )}
            
            {itemInCart && (
              <p className="already-in-cart-message">
                This item is already in your cart. Review your choice in the
                cart.
              </p>
            )}
            <div className="varaint-select">
              {singleproducts?.attribute_master?.map((attr) => {
                return (
                  <>
                    <FormControl>
                      <FormLabel id="demo-row-radio-buttons-group-label">
                        {capitalize(attr.name)}
                      </FormLabel>
                      <RadioGroup
                        row
                        aria-labelledby="demo-row-radio-buttons-group-label"
                        name="row-radio-buttons-group"
                        value={variantSelect}
                        onChange={(e) => prepareData(e, attr.id)}
                      >
                        {attr.attribute_values.map((val) => {
                          return (
                            <FormControlLabel
                              value={val._id}
                              control={<Radio />}
                              label={capitalize(val.name)}
                            />
                          );
                        })}
                      </RadioGroup>
                    </FormControl>

                    {error &&
                    !selectedAttrs.some(
                      (selectedAtt) => attr.id === selectedAtt.name
                    ) ? (
                      <p style={{ color: "red" }}>
                        Please Select The {capitalize(attr.name)}
                      </p>
                    ) : null}
                  </>
                );
              })}
            </div>

            <CheckZipcode checkzipcode={checkzipcode} />

            {singleproducts?.custom_field &&
            singleproducts.custom_field?.length > 0 ? (
              <>
                {singleproducts?.custom_field?.map((field) => (
                  <div className="product-attributes">
                    <ul className="product-meta font-xs color-grey mt-50">
                      <p>
                        {`${field?.key} - ${" "}`}{" "}
                        <strong> {field?.value}</strong>
                      </p>
                    </ul>
                  </div>
                ))}
              </>
            ) : null}

            <ul className="product-meta font-xs color-grey mt-50">
              <p className="">
                SKU:{" "}
                {comboData && comboData.length
                  ? comboData[0].sku
                  : singleproducts?.sku}
              </p>
              {newFunction(singleproducts)}
              <p className="">
                Availablity: <span className={stockClass}>{lable}</span>
              </p>
            </ul>
          </div>
        </div>
      </div>
    </>
  );
};

export default GalleryImagesComponents;
function newFunction(singleproducts) {
  return <p className="">Tags: {get(singleproducts, "__typename")}</p>;
}
