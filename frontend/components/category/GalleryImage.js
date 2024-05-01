/* eslint-disable no-unused-vars */
/* eslint-disable react/jsx-key */

import React, { useEffect, useState } from "react";
import {
  getItemFromLocalStorage,
  mutation,
  setItemToLocalStorage,
} from "../../utills/helpers";

import StarRating from "../../components/breadcrumb/rating";
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
import RadioButton from "../radioButton";
import GalleryImageSlider from "../sliderImage";
import RenderProductPrice from "./renderProductPrice";
import CustomButton from "../button";
import RemainingQuantity from "../remainingQuantity";
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
  const [available, setavailable] = useState(false);
  const [Lable, setLable] = useState("In Stock");
  const [variantSelect, setVariantSelect] = useState();
  const [parentId, setParentId] = useState();
  const [error, seterror] = useState(false);
  const cart = useSelector((state) => state.cart);
  const [singleprod, setSingleprod] = useState(singleProducts);
  const [selectedAttributes, setSelectedAttributes] = useState([]);
  const [comboData, setComboData] = useState([]);
  const [priceRange, setPriceRange] = useState([]);
  const [sellPriceRange, setSellPriceRange] = useState([]);
  const [itemInCart, setItemInCart] = useState(false);
  const [id, setId] = useState("");
  const [token, setToken] = useState("");
  useEffect(() => {
    const hasComboData = comboData?.length;
    const variantProductQuantity = get(comboData, "[0].quantity");
    const productQuantity = get(singleProducts, "quantity");
    const isLowStock =
      (hasComboData === 1 && variantProductQuantity <= lowStockThreshold) ||
      (singleProducts && productQuantity <= lowStockThreshold);
    const isOutOfStock =
      (hasComboData === 1 && variantProductQuantity <= outOfStockThreshold) ||
      (singleProducts && productQuantity <= outOfStockThreshold);
    const inStock =
      (hasComboData === 1 && variantProductQuantity > lowStockThreshold) ||
      (singleProducts && productQuantity > lowStockThreshold);
    if (isLowStock && !isOutOfStock) {
      setStockClass("low-stock");
      setLable("Low Stock");
    } else if (isOutOfStock) {
      setStockClass("out-of-stock");
      setLable("Out Of Stock");
    } else if (!hasComboData && variantSelect) {
      setStockClass("not-available");
      setLable("Not available");
    } else if (inStock) {
      setStockClass("in-stock");
      setLable("In Stock");
    }
    if (hasComboData === 1 && variantSelect) {
      singleprod.comboData = comboData;
      setSingleprod({ ...singleprod });
    }
  }, [
    singleProducts?.quantity,
    lowStockThreshold,
    outOfStockThreshold,
    comboData,
    variantSelect,
  ]);

useEffect(() => {
  if (!comboData || !comboData.length) {
    return; 
  }
  const priceData = comboData.map(c => c.pricing.price);
  const sellPriceData = comboData.map(c => c.pricing.sellprice);
  setPriceRange(priceData);
  setSellPriceRange(sellPriceData);
}, [comboData]);

useEffect(() => {
  if (session?.status === "authenticated") {
    const accessToken=get(session,'data.user.accessToken')
    setId(get(accessToken,'customer._id',''));
    setToken(get(accessToken,'token',''));
   }
  }, [session]);
  const checkzipcode = (result) => {
    setavailable(result);
  };
  const prepareAttributesData = (product) => {
    if(!selectedAttributes){
      return [];
    }
    return selectedAttributes?.map((selectedAttribute) => {
      const singleAttribute = get(product, "attribute_master", [])?.find(
        (data) => data?.id === selectedAttribute?.name
      );
      const singleAttributeValues = get(
        singleAttribute,
        "attribute_values",
        []
      )?.find((data) => data?._id === selectedAttribute?.value);
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
    mutation(ADD_TO_CART_QUERY, variables, token)
      .then((res) => {
        router.push("/shopcart");
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

  const isProductInCart = (product, comboData, inCartProducts) => {
    return inCartProducts?.some((inCartProduct) => {
      const productIdMatch = product?._id === get(inCartProduct, "productId");
      const variantIdMatch = comboData?.some(
        (variant) => variant?.id === inCartProduct?.variantId
      );
      if (comboData?.length === 0) {
        return productIdMatch;
      }
      return productIdMatch && variantIdMatch;
    });
  };

  const addToCartProduct = async (product) => {
    const isUserAuthenticated = session?.status === "authenticated";
    const hasAttributesMismatch =
      get(singleProducts, "attribute_master")?.length > 0 &&
      selectedAttributes?.length !==
        get(singleProducts, "attribute_master")?.length;
    if (hasAttributesMismatch) {
      seterror(true);
      return;
    }
    seterror(false);
    const productImage =
      get(comboData, "[0].image", "") || get(product, "feature_image", "");
    const variantPrice = get(comboData, "[0].pricing.sellprice", 0)?.toString();
    const productPrice = get(product, "pricing.sellprice", 0)?.toString();
    const quantity = 1;
    if (isUserAuthenticated) {
      const cartProducts = get(cart, "cartItems", []);
      const productInCart = isProductInCart(product, comboData, cartProducts);
      if (!productInCart) {
        setItemInCart(false);
        const commonVariables = prepareCommonVariables(id, product);
        if (comboData.length > 0) {
          // Prepare data for product with variant
          const attributesData = prepareAttributesData(product);
          const variables = {
            ...commonVariables,
            productImage: productImage,
            productPrice: variantPrice
              ? variantPrice.toString()
              : productPrice?.toString(),
            variantId: get(comboData[0], "id", ""),
            attributes: attributesData,
          };

          addToCartAndNavigate(variables, token);
        } else {
          // Prepare data for product without variant
          const variables = {
            ...commonVariables,
            productImage: get(product, "feature_image"),
            productPrice: productPrice,
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
      const attributesData = prepareAttributesData(product);
      const carts = getItemFromLocalStorage("cart");
      const productInCart = carts?.some((inCartProduct) => {
        const productIdMatch = product?._id === get(inCartProduct, "_id");
        const variantIdMatch = comboData?.some(
          (variant) => variant?.id === inCartProduct?.variantId
        );
        if (comboData?.length === 0) {
          return productIdMatch;
        }
        return productIdMatch && variantIdMatch;
      });
      if (!productInCart) {
        const productQuantity = get(
          comboData,
          "[0]quantity",
          get(product, "quantity")
        );
        setItemInCart(false);
        const variables = {
          userId: id,
          url: get(product, "url"),
          _id: get(product, "_id"),
          qty: quantity,
          name: get(product, "name"),
          feature_image: productImage,
          pricing: variantPrice || productPrice,
          productQuantity: productQuantity,
          variantId: get(comboData, "[0].id", ""),
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
    let variantProduct = get(singleProducts, "variation_master", []);
    data.map((item) => {
      variantProduct = variantProduct.filter((combo) => {
        return get(combo, "combination", [])?.includes(item.value);
      });
    });
    setComboData([...variantProduct]);
    setItemInCart(false);
    return variantProduct;
  };
  const prepareData = (e, name) => {
    const value = e;
    setVariantSelect(value);
    setParentId(name);
    const updatedAttributes = selectedAttributes.map((attr) =>
      attr.name === name ? { ...attr, value } : attr
    );
    const isAttributeExisting = updatedAttributes.some(
      (attr) => attr.name === name
    );
    if (!isAttributeExisting) {
      updatedAttributes.push({ name, value });
    }
    setSelectedAttributes(updatedAttributes);
    prepareComb(updatedAttributes);
  };
  
  const navigateToShopCart = () => {
    router.push("/shopcart");
  };
  
  const renderProductTags = () => {
    return <p className="">Tags: {get(singleProducts, "__typename")}</p>;
  };

  const checkVariantIsSelected = (singleAttribute) => {
    const attributeName = get(singleAttribute, "name", "");
    const isAttributeSelected = selectedAttributes?.some(
      ({ name }) => name === singleAttribute?.id
    );
    if (error && !isAttributeSelected) {
      return `Please select the ${capitalize(attributeName)}`;
    }
    return null;
  };
  const isProductAvailable = () => {
    return (comboData && comboData?.length > 0) || !variantSelect
      ? false
      : true;
  };

  const createAttributeOptions = (singleAttribute) => {
    return get(singleAttribute, "attribute_values", [])?.map((item) => ({
      value: item._id,
      label: item.name,
    }));
  };

  const RenderCategoryNames = ({ singleProducts }) => {
    let categoryIds = get(singleProducts, "categoryId", []);
    return categoryIds?.map((item, index) => (
      <span key={item._id}>
        {index < categoryIds.length - 1
          ? capitalize(item.name) + ", "
          : capitalize(item.name)}
      </span>
    ));
  };

  return (
    <>
      <div className="single-product row mb-50 single-product-container">
        <div className="single-product-image col-md-6 col-sm-12 col-xs-12">
          <div className="singleroduct-gallery-slider">
            <GalleryImageSlider
              galleryImages={galleryImages}
              variantSelect={variantSelect}
              comboData={comboData}
            />
          </div>
        </div>
        <div className="single-product-detail col-md-6 col-sm-12 col-xs-12">
          <div className="detail-info">
            <h2>{capitalize(get(singleProducts, "name"))}</h2>
            <div className="product-detail-rating">
              <div className="pro-details-brand">
                <span>
                  {" "}
                  Category:{" "}
                  <RenderCategoryNames singleProducts={singleProducts} />
                </span>
              </div>
              <div className="pro-details-rating">
                <StarRating
                  singleProducts={singleProducts}
                  stars={get(singleProducts, "rating", 0)}
                />
              </div>
            </div>
            {get(singleProducts, "brand.name") && (
              <div className="pro-details-brand">
                <span>
                  {" "}
                  Brand: {capitalize(get(singleProducts, "brand.name", ""))}
                </span>
              </div>
            )}
            <RenderProductPrice
              sellPriceRange={sellPriceRange}
              priceRange={priceRange}
              singleProducts={singleProducts}
              comboData={comboData}
              variantSelect={variantSelect}
            />
            <div className="short-desc mb-30">
              <p> {singleProducts?.short_description}</p>
            </div>
            {Lable !== "Out Of Stock" && (
              <>
                <CustomButton
                  type="button"
                  className="btn btn-success button button-add-to-cart primary-btn-color"
                  onClick={() =>
                    !itemInCart
                      ? addToCartProduct(singleProducts)
                      : navigateToShopCart()
                  }
                  disabled={isProductAvailable()}
                  buttonText={!itemInCart ? "Add to Cart" : "Go To Cart"}
                />
              </>
            )}
            {itemInCart && (
              <p className="already-in-cart-message">
                This item is already in your cart. Review your choice in the
                cart.
              </p>
            )}
            <div className="varaint-select">        
              {get(singleProducts, "attribute_master", [])?.map(
                (singleAttribute) => {
                  return (
                    <>
                      <RadioButton
                        label={get(singleAttribute, "name", "")}
                        value={variantSelect}
                        onChange={(e) => prepareData(e, singleAttribute.id)}
                        options={createAttributeOptions(singleAttribute)}
                        error={checkVariantIsSelected(singleAttribute)}
                      />
                    </>
                  );
                }
              )}
            </div>

            <CheckZipcode checkzipcode={checkzipcode} />
            {get(singleProducts, "custom_field", [])?.length > 0 ? (
              <>
                {get(singleProducts, "custom_field", [])?.map((field) => (
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
                SKU: {get(comboData, "[0].sku", get(singleProducts, "sku", ""))}
              </p>
              {renderProductTags()}
              <div className="stock-availabilty">
                <div className="singleproduct-stock">
                Availablity: <span className={stockClass}>{Lable}</span> 
                </div>
                <div>
                <RemainingQuantity quantity={get(singleProducts,'quantity',0)}/></div>
              </div>
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