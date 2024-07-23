/* eslint-disable no-unused-vars */
import Link from "next/link";
import { Container } from "react-bootstrap";
import { capitalize, get } from "lodash";
import ClearIcon from "@mui/icons-material/Clear";
import Price from "../priceWithCurrency";
import ProductImage from "../imageComponent";
import { useRef, useState } from "react";
import PropTypes from "prop-types";
import RemainingQuantity from "../remainingQuantity";
import { MdChevronLeft, MdChevronRight } from "react-icons/md";
const OnSaleProductCard = ({
  onSaleProduct,
  hideTitle,
  titleShow,
  showRemoveButton,
  removeButton,
  display_type,
  showcaseType,
  hideNotFoundMsg
}) => {
  const [showWishListButton, setShowWishListButton] = useState(-1);
  const [isProductInWistList, setIsProductInWistList] = useState(-1);
  const slider = useRef();
  const slideLeft = () => {
    slider.current.scrollLeft = get(slider, "current.scrollLeft") - 500;
  };
  const slideRight = () => {
    slider.current.scrollLeft = get(slider, "current.scrollLeft") + 500;
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
        <div className="products-row">
          {!hideTitle ? (
            <div>
              <h5 className="black-color mb-4">
                {titleShow ? capitalize(titleShow) : "On Sale"}{" "}
              </h5>
            </div>
          ) : null}
          <div>
            {(display_type && display_type === "SLIDER") ||
            showcaseType === "slider" ? (
              <section className="product-cart-section home-page">
                <Container className="container">
                  <MdChevronLeft
                    onClick={slideLeft}
                    className="cat-left-icon"
                    size={24}
                  />
                  <div>
                    <div
                      className={
                        "category pro-cat"
                        // : " pro-cat category categoryShow "
                      }
                      ref={slider}
                    >
                      {onSaleProduct?.length > 0 ? (
                        onSaleProduct.map((product, i) => {
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
                                    {get(product, "rating", 0) > 0 && (
                                      <div className="card-rating">
                                        <span>{get(product, "rating", 0)}</span>
                                        <i className="fa-solid fa-star" />
                                      </div>
                                    )}
                                    {/* <OverlayTrigger
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
                                        <button>Add to cart</button>
                                        {" "}
                                        <a className="cart-icon">
                                          <i
                                            className="fas fa-shopping-bag font-awesome-icon"
                                            aria-hidden="true"
                                          ></i>
                                        </a>
                                      </div>
                                    </Link>
                                  </OverlayTrigger> */}
                                  </div>
                                  <div className="on-sale-product-card-body">
                                    <div className="card-price">
                                      <div>{product.name}</div>
                                      <RemainingQuantity
                                        quantity={get(product, "quantity", 0)}
                                      />
                                      {product?.quantity<=0 && (
                                        <p className="out-of-stock-card">
                                          Out Of Stock
                                        </p>
                                      )}
                                    </div>

                                    <div className="on-sale-product-detail">
                                      <div className="product-price">
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
                                        getSalePrice(product) <
                                          getProductPrice(product) ? (
                                          <span
                                            className={
                                              product?.pricing.sellprice
                                                ? "has-sale-price"
                                                : ""
                                            }
                                          >
                                            <Price
                                              price={getProductPrice(product)}
                                            />
                                          </span>
                                        ) : null}
                                      </div>
                                      {get(
                                        product,
                                        "pricing.discountPercentage"
                                      ) > 0 ? (
                                        <span className="percantage-save">
                                          {get(
                                            product,
                                            "pricing.discountPercentage",
                                            0
                                          )}{" "}
                                          % OFF
                                        </span>
                                      ) : null}
                                    </div>
                                  </div>
                                </div>
                              </Link>
                            </>
                          );
                        })
                      ) : (
                        <>
                          {
                            !hideNotFoundMsg &&
                            <p className="onsale-no-data">No Products Found</p>
                          }
                        </>
                      )}
                    </div>
                  </div>
                  <MdChevronRight
                    onClick={slideRight}
                    className="cat-right-icon"
                    size={24}
                  />
                </Container>
              </section>
            ) : (
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
                                {get(product, "rating", 0) > 0 && (
                                  <div className="card-rating">
                                    <span>{get(product, "rating", 0)}</span>
                                    <i className="fa-solid fa-star" />
                                  </div>
                                )}
                                {/* <OverlayTrigger
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
                                        <button>Add to cart</button>
                                        {" "}
                                        <a className="cart-icon">
                                          <i
                                            className="fas fa-shopping-bag font-awesome-icon"
                                            aria-hidden="true"
                                          ></i>
                                        </a>
                                      </div>
                                    </Link>
                                  </OverlayTrigger> */}
                              </div>
                              <div className="on-sale-product-card-body">
                                <div className="card-price">
                                  <div>{product.name}</div>
                                  <RemainingQuantity
                                    quantity={get(product, "quantity", 0)}
                                  />
                                  {product?.quantity <= 0 && (
                                    <p className="itemComponents-base-lowUnitCount">
                                      Out Of Stock
                                    </p>
                                  )}
                                </div>

                                <div className="on-sale-product-detail">
                                  <div className="product-price">
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
                                    getSalePrice(product) <
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
                                  {get(product, "pricing.discountPercentage") >
                                  0 ? (
                                    <span className="percantage-save">
                                      {get(
                                        product,
                                        "pricing.discountPercentage",
                                        0
                                      )}{" "}
                                      % OFF
                                    </span>
                                  ) : null}
                                  {/* {!product?.quantity > 0 && (
                                    <p className="out-of-stock-card">
                                      Out Of Stock
                                    </p>
                                  )} */}
                                </div>
                              </div>
                            </div>
                          </Link>
                        </>
                      );
                    })}
                  </>
                ) : (
                  <>
                    {
                      !hideNotFoundMsg &&
                      <div className="onsale-no-data">
                        <p>No Products Found</p>
                      </div>
                    }
                  </>
                )}
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
  currencyOpt: PropTypes.object,
  showRemoveButton: PropTypes.bool,
  removeButton: PropTypes.func,
  display_type: PropTypes.string,
  showcaseType: PropTypes.string,
  hideNotFoundMsg: PropTypes.bool
};
export default OnSaleProductCard;
