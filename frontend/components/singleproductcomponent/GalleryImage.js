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
import notify from "../../utills/notifyToast";
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
  const cart = useSelector((state) => state.cart);
  const [singleProduct, setSingleproduct] = useState(singleProducts);
  const [selectedAttributes, setSelectedAttributes] = useState([]);
  const [itemInCart, setItemInCart] = useState(false);
  const [showMagnifiedImage, setShowMagnifiedImage] = useState(false);
  const [id, setId] = useState("");
  const [token, setToken] = useState("");
  useEffect(() => {
    setSingleproduct({ ...singleProduct, qty: 1 });
  }, [singleProducts]);
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
    return inCartProducts?.some((inCartProduct) => {
      const productIdMatch = product?._id === get(inCartProduct, "productId");
      return productIdMatch;
    });
  };
  const addToCartProduct = async (product) => {
    const isUserAuthenticated = session?.status === "authenticated";
    if (checkQuantityValidation()) {
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
          productQuantity: get(product, "quantity", 1),
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
    }
  };
  const changeQuantity = (qty) => {
    let product = { ...singleProduct, qty: qty };
    setSingleproduct({ ...product });
  };
  const checkQuantityValidation = () => {
    const value = get(singleProduct, "qty", 0);
    const actualQuantity = get(singleProduct, "quantity", 0);
    if (isNaN(value) || value < 1) {
      notify("Please enter a valid quantity greater than 0.");
      return false;
    } else if (value > actualQuantity) {
      notify(`Only ${actualQuantity} item(s) available in stock.`);
      return false;
    }

    return true;
  };

  const navigateToShopCart = () => {
    router.push("/shopcart");
  };

  return (
    <>
      <div className="single-product row mb-50 single-product-container">
        <div className="single-product-image col-md-6 col-sm-12 col-xs-12">
          <div
            className="singleroduct-gallery-slider"
            onMouseEnter={() => setShowMagnifiedImage(true)}
            onMouseLeave={() => setShowMagnifiedImage(false)}
          >
            <GalleryImageSlider
              galleryImages={galleryImages}
              showMagnifiedImageState={[
                showMagnifiedImage,
                setShowMagnifiedImage,
              ]}
            />
          </div>
        </div>
        <div className="single-product-detail col-md-6 col-sm-12 col-xs-12">
          <div
            id="myPortal"
            className={`magnify-portal ${showMagnifiedImage ? "active" : ""}`}
          ></div>
          <div className="detail-info">
            <h2>{capitalize(get(singleProduct, "name"))}</h2>
            <div className="short-desc mb-30">
              <p> {singleProduct?.short_description}</p>
            </div>
            {get(singleProduct, "rating") > 0 && (
              <div className="product-detail-rating">
                <p>{get(singleProduct, "rating", 0)}</p>
                <i className="fa-solid fa-star" />
              </div>
            )}
            <RenderProductPrice singleProducts={singleProduct} />

            {itemInCart && (
              <p className="already-in-cart-message">
                This item is already in your cart. Review your choice in the
                cart.
              </p>
            )}
            {(get(singleProduct, "variations") &&
              get(singleProduct, "variations")?.length > 0) ||
            (get(singleProduct, "attributes") &&
              get(singleProduct, "attributes")?.length > 0) ? (
              <div className="varaint-select">
                <AttributeSelector
                  variations={get(singleProduct, "variations", [])}
                  attributes={get(singleProduct, "attributes", [])}
                  getSelectedAttributes={getSelectedAttributes}
                />
              </div>
            ) : (
              ""
            )}
            <div>
              {get(singleProduct, "quantity", 0) > 0 && (
                <QuantitySelector
                  changeQuantity={changeQuantity}
                  quantity={singleProduct?.qty || 1}
                  actualQuantity={singleProduct?.quantity}
                />
              )}
            </div>
            <CheckZipcode checkzipcode={checkzipcode} />
            <ul className="product-meta font-xs color-grey mt-50">
              <div className="stock-availabilty">
                {get(singleProduct, "quantity", 0) <= 0 && (
                  <div className="singleProduct-stock">
                    <p>
                      Availablity:{" "}
                      <span className="out-of-stock" style={{}}>
                        Out of Stock
                      </span>
                    </p>
                  </div>
                )}
                <div>
                  <RemainingQuantity
                    quantity={get(singleProduct, "quantity", 0)}
                  />
                </div>
              </div>
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
                  disabled={
                    !available || get(singleProduct, "quantity", 0) <= 0
                  }
                />
              </>
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
