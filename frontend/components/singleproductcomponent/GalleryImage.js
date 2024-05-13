/* eslint-disable no-unused-vars */
/* eslint-disable react/jsx-key */

import React, { useEffect, useState } from "react";
import {
  getItemFromLocalStorage,
  mutation,
  setItemToLocalStorage,
} from "../../utills/helpers";

import StarRating from "../breadcrumb/rating";
import {
  addToCart,
  calculateUnauthenticatedCart,
} from "../../redux/actions/cartAction";
import PropTypes from "prop-types";
import { useDispatch, useSelector } from "react-redux";
import { signOut, useSession } from "next-auth/react";
import { useRouter } from "next/router";
import { ADD_TO_CART_QUERY } from "../../queries/cartquery";
import CheckZipcode from "../account/component/CheckZipcode";
import { capitalize, get } from "lodash";
import GalleryImageSlider from "../sliderImage";
import CustomButton from "../button";
import RemainingQuantity from "../remainingQuantity";
import RenderProductPrice from "./renderProductPrice";
import AttributeSelector from "./attributes";
import QuantitySelector from "./increaseQuantity";
import CategoryBreadCrumb from "../breadcrumb";
const GalleryImagesComponents = (props) => {
  const {
    stockClass,
    singleProducts,
    setStockClass,
    lowStockThreshold,
    outOfStockThreshold,
    galleryImages,
  } = props;
  const dispatch = useDispatch();
  const session = useSession();
  const router = useRouter();
  const [available, setavailable] = useState(true);
  const [lable, setLable] = useState("In Stock");
  const [error, setError] = useState(false);
  const cart = useSelector((state) => state.cart);
  const [singleProduct, setSingleProduct] = useState(singleProducts);
  const [selectedAttributes, setSelectedAttributes] = useState([]);
  const [itemInCart, setItemInCart] = useState(false);
  const [id, setId] = useState("");
  const [token, setToken] = useState("");
  useEffect(() => {
    setSingleProduct({ ...singleProduct });
  }, [singleProducts]);
  useEffect(() => {
    const productQuantity = get(singleProducts, "quantity");
    const isLowStock = singleProducts && productQuantity <= lowStockThreshold;
    const isOutOfStock =
      singleProducts && productQuantity <= outOfStockThreshold;
    const inStock = singleProducts && productQuantity > lowStockThreshold;
    if (isLowStock && !isOutOfStock) {
      setStockClass("low-stock");
      setLable("Low Stock");
    } else if (isOutOfStock) {
      setStockClass("out-of-stock");
      setLable("Out Of Stock");
    } else if (inStock) {
      setStockClass("in-stock");
      setLable("In Stock");
    }
  }, [singleProducts?.quantity, lowStockThreshold, outOfStockThreshold]);
  const getSelectedAttributes = (attributes) => {
    setSelectedAttributes(attributes);
  };

  useEffect(() => {
    if (session?.status === "authenticated") {
      const accessToken = get(session, "data.user.accessToken");
      setId(get(accessToken, "customer._id", ""));
      setToken(get(accessToken, "token", ""));
    }
  }, [session]);
  const checkzipcode = (result) => {
    setavailable(result);
  };
  const prepareCommonVariables = (id, product) => {
    return {
      userId: id,
      productId: get(product, "_id"),
      qty: get(product, "qty", 1),
      productTitle: get(product, "name"),
      productImage: get(product, "feature_image"),
      productPrice: get(product, "pricing.sellprice", 0)?.toString(),
    };
  };
  const addToCartAndNavigate = (variables, token, productInCart) => {
    mutation(ADD_TO_CART_QUERY, variables, token)
      .then((res) => {
        if (!productInCart) {
          router.push("/shopcart");
        }
      })
      .catch(async (error) => {
        if (get(error, "extensions.code") === 401) {
          let product = [
            {
              userId: "",
              url: get(variables, "url"),
              _id: get(variables, "productId"),
              quantity: get(variables, "qty"),
              name: get(variables, "productTitle"),
              feature_image: get(variables, "productImage"),
              pricing: get(variables, "productPrice"),
              productQuantity: get(variables, "productQuantity"),
              variantId: get(variables, "variantId", ""),
              qty: get(variables, "qty"),
              attributes: get(variables, "attributes"),
            },
          ];
          await signOut({ redirect: false, callbackUrl: "/" });
          setItemToLocalStorage("cart", product);
          dispatch(calculateUnauthenticatedCart(product));
          window.location.pathname = "/shopcart";
        }
      });
  };

  const isProductInCart = (product, inCartProducts) => {
    console.log(inCartProducts, product);
    return inCartProducts?.some((inCartProduct) => {
      const productIdMatch = product?._id === get(inCartProduct, "productId");
      return productIdMatch;
    });
  };
  const addToCartProduct = async (product) => {
    const isUserAuthenticated = session?.status === "authenticated";
    const hasAttributesMismatch =
      get(singleProducts, "attributes")?.length > 0 &&
      selectedAttributes?.length !== get(singleProducts, "attributes")?.length;
    if (hasAttributesMismatch) {
      setError(true);
      return;
    }
    setError(false);
    if (isUserAuthenticated) {
      const cartProducts = get(cart, "cartItems", []);
      const productInCart = isProductInCart(product, cartProducts);
      const variables = prepareCommonVariables(id, product);
      if (!productInCart) {
        setItemInCart(false);
      } else {
        setItemInCart(true);
      }
      addToCartAndNavigate(variables, token, productInCart);
    } else {
      const carts = getItemFromLocalStorage("cart");
      const productInCart = carts?.some((inCartProduct) => {
        const productIdMatch = product?._id === get(inCartProduct, "_id");
        return productIdMatch;
      });
      let variables = {
        userId: id,
        url: get(product, "url"),
        _id: get(product, "_id"),
        qty: get(product, "qty", 1),
        name: get(product, "name"),
        feature_image: get(product, "feature_image"),
        pricing: get(product, "pricing.sellprice", 0),
      };

      if (!productInCart) {
        setItemInCart(false);
      } else {
        setItemInCart(true);
      }

      dispatch(addToCart(variables));
      router.push("/shopcart");
    }
  };
  const changeQuantity = (qty) => {
    let product = { ...singleProduct, qty: qty };
    setSingleProduct({ ...product });
  };
  const navigateToShopCart = () => {
    router.push("/shopcart");
  };

  return (
    <>
      <div className="single-product row mb-50 single-product-container">
        <div className="single-product-image col-md-6 col-sm-12 col-xs-12">
          <div className="singleroduct-gallery-slider">
            <GalleryImageSlider galleryImages={galleryImages} />
          </div>
        </div>
        <div className="single-product-detail col-md-6 col-sm-12 col-xs-12">
          <div className="detail-info">
            <h2>{capitalize(get(singleProduct, "name"))}</h2>
            <div className="short-desc mb-30">
              <p> {singleProduct?.short_description}</p>
            </div>
            {get(singleProduct, "rating") > 0 && (
              <div className="product-detail-rating">
                <p>{get(singleProduct, "rating", 0)}</p>
              </div>
            )}
            <RenderProductPrice singleProducts={singleProduct} />

            {itemInCart && (
              <p className="already-in-cart-message">
                This item is already in your cart. Review your choice in the
                cart.
              </p>
            )}
            <div className="varaint-select">
              <AttributeSelector
                variations={get(singleProduct, "variations", [])}
                attributes={get(singleProduct, "attributes", [])}
                error={error}
                getSelectedAttributes={getSelectedAttributes}
              />
            </div>
            <div>
              <QuantitySelector
                changeQuantity={changeQuantity}
                quantity={singleProduct?.qty}
              />
            </div>
            <CheckZipcode checkzipcode={checkzipcode} />
            <ul className="product-meta font-xs color-grey mt-50">
              <div className="stock-availabilty">
                <div className="singleproduct-stock">
                  Availablity: <span className={stockClass}>{lable}</span>
                </div>
                <div>
                  <RemainingQuantity
                    quantity={get(singleProduct, "quantity", 0)}
                  />
                </div>
              </div>

              {lable !== "Out Of Stock" && (
                <>
                  <CustomButton
                    type="button"
                    className="btn btn-success button button-add-to-cart primary-btn-color"
                    onClick={() =>
                      !itemInCart
                        ? addToCartProduct(singleProduct)
                        : navigateToShopCart()
                    }
                    buttonText={!itemInCart ? "Add to Cart" : "Go To Cart"}
                    disabled={!available}
                  />
                </>
              )}
              {itemInCart && (
                <p className="already-in-cart-message">
                  You have this item in your bag and we have increased the
                  quantity by {get(singleProduct, "qty", 1)}
                </p>
              )}
            </ul>
          </div>
        </div>
      </div>
    </>
  );
};
GalleryImagesComponents.propTypes = {
  stockClass: PropTypes.string.isRequired,
  singleProducts: PropTypes.object.isRequired,
  setStockClass: PropTypes.func.isRequired,
  lowStockThreshold: PropTypes.number.isRequired,
  outOfStockThreshold: PropTypes.number.isRequired,
  galleryImages: PropTypes.array.isRequired,
};
export default GalleryImagesComponents;
