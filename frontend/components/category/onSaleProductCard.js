/* eslint-disable no-unused-vars */
import Link from "next/link";
import { Container, OverlayTrigger, Tooltip, Button } from "react-bootstrap";
import StarRating from "../breadcrumb/rating";
import { isDiscount, imageOnError } from "../../utills/helpers";
import { useSession } from "next-auth/react";
import calculateDiscount from "../../utills/calculateDiscount";
import { capitalize, get } from "lodash";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import FavoriteIcon from "@mui/icons-material/Favorite";
import ClearIcon from "@mui/icons-material/Clear";
import Price from "../priceWithCurrency";
import ProductImage from "../imageComponent";
import { useState } from "react";
import PropTypes from "prop-types";
import RemainingQuantity from "../remainingQuantity";
const OnSaleProductCard = ({
  onSaleProduct,
  hideTitle,
  titleShow,
  showRemoveButton,
  removeButton,
}) => {
  const [showWishListButton, setShowWishListButton] = useState(-1);
  const [isProductInWistList, setIsProductInWistList] = useState(-1);


  const handleWishlistButtonClick = (e, product) => {
    e.stopPropagation();
  };
  const toggleWishlistState = (i) => {
    setIsProductInWistList((prevState) => !prevState);
    setShowWishListButton(i);
  };
  const getSalePrice = (product) => {
    return get(product, "pricing.sellprice", 0);
  };
  const getProductPrice = (product) => {
    return get(product, "pricing.price", 0);
  };
  return (
    <section className="product-cart-section">
      <Container>
        {!hideTitle ? (
          <div>
            <h4 className="theme-color my-2">
              {titleShow ? capitalize(titleShow) : "On Sale"}{" "}
              <span className="text-black">Products</span>
            </h4>
          </div>
        ) : null}
        <div>
          <div className="on-sale-product">
            {onSaleProduct && onSaleProduct?.length > 0 ? (
              <>
                {onSaleProduct.map((product, i) => {
                  return (
                    <>
                      <Link
                        href={`/product/[singleproduct]?url=${product.url}`}
                        as={`/product/${product.url}`}
                      >
                        <div
                          className="on-sale-product-card"
                          key={i}
                          onMouseEnter={() => toggleWishlistState(i)}
                          onMouseLeave={() => setShowWishListButton(null)}
                        >
                          {showRemoveButton && (
                            <button
                              onClick={(e) => {
                                removeButton(e);
                              }}
                              className="cross-button"
                            >
                              <ClearIcon className="clear-icon" />
                            </button>
                          )}
                          <div className="on-sale-image-wrapper">
                            <ProductImage
                              src={get(product, "feature_image", "")}
                              alt={product?.name}
                              className="img-on-sale"
                            />
                          </div>
                          <div className="on-sale-product-card-body">
                            {isDiscount(product) ? (
                              <div className="save-price">
                                <span className="percantage-save">
                                  {calculateDiscount(
                                    getProductPrice(product),
                                    getSalePrice(product)
                                  )}
                                </span>
                              </div>
                            ) : null}
                            <div className="product-categoryname category-name-container ">
                              <div>
                                {product?.categoryId?.map((item, i) => (
                                  <span key={i}>
                                    {product?.categoryId?.length - 1 === i ? (
                                      <span>{capitalize(get(item,'name',''))} </span>
                                    ) : (
                                      <span>{capitalize(get(item,'name',''))}, </span>
                                    )}
                                  </span>
                                ))}
                              </div>
                            </div>
                            <div className="card-price">
                              <div>
                              {product?.name?.length > 18 ? (
                                <strong
                                  dangerouslySetInnerHTML={{
                                    __html:
                                      product?.name?.substring(0, 17) + "...",
                                  }}
                                ></strong>
                              ) : (
                                product.name
                              )}
                              </div>
                              <RemainingQuantity quantity={get(product,'quantity',0)}/>
                            </div>

                            <div className="on-sale-product-detail">
                              <div className="product-price">
                                <StarRating
                                  className="rating"
                                  stars={get(product,'rating',0)}
                                  singleProducts={product}
                                />
                                <span className="no-wrap">
                                  <strong className="sale-price">
                                    <Price
                                      price={
                                        getSalePrice(product) ||
                                        getProductPrice(product)
                                      }
                                    />
                                  </strong>
                                </span>
                                {getSalePrice(product) &&
                                getSalePrice(product)  <
                                getProductPrice(product) ? (
                                  <span
                                    className={
                                      product?.pricing.sellprice
                                        ? "has-sale-price"
                                        : ""
                                    }
                                  >
                                    <Price price={getProductPrice(product)} />
                                  </span>
                                ) : null}
                              </div>
                              {product?.quantity > 0 ? (
                                <OverlayTrigger
                                  className="on-sale-product-tooltip"
                                  placement="top"
                                  overlay={
                                    <Tooltip id={"tooltip-top"}>
                                      add to cart
                                    </Tooltip>
                                  }
                                >
                                  <Link
                                    href={`/product/[singleproduct]?url=${product.url}`}
                                    as={`/product/${product.url}`}
                                  >
                                    <div className="add-to-cart">
                                      {" "}
                                      <a className="cart-icon">
                                        <i
                                          className="fas fa-shopping-bag font-awesome-icon"
                                          aria-hidden="true"
                                        ></i>
                                      </a>
                                    </div>
                                  </Link>
                                </OverlayTrigger>
                              ) : (
                                <p className="out-of-stock-card">
                                  Out Of Stock
                                </p>
                              )}
                            </div>
                          </div>
                        </div>
                      </Link>
                    </>
                  );
                })}
              </>
            ) : (
              <div className="onsale-no-data">
                <p>No Data Found</p>
              </div>
            )}
          </div>
        </div>
      </Container>
    </section>
  );
};
OnSaleProductCard.propTypes = {
  onSaleProduct: PropTypes.array.isRequired,
  hideTitle: PropTypes.bool,
  titleShow: PropTypes.string,
  currencyProp: PropTypes.string,
  currencyOpt: PropTypes.object,
  showRemoveButton: PropTypes.bool,
  removeButton: PropTypes.func,
};
export default OnSaleProductCard;
