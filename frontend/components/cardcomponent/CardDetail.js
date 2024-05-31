import { get} from "lodash";
import Link from "next/link";
import React from "react";
import PropTypes from "prop-types";
import CloseIcon from "@mui/icons-material/Close";
import CartTotalDetails from "./cartTotal";
import Price from "../priceWithCurrency";
import ProductImage from "../imageComponent";
import RemaningQuantity from "../remainingQuantity";
import AdditionalCartDetail from "./additionalCartDetail";
const CartTable = (props) => {
  const {
    cartItems,
    clearAllCartItems,
    removeToCart,
    updateCartProductQuantity,
    totalSummary,
  } = props;

  return (
    <div>
      <div className="cart-main-container">
        <div className="d-flex align-items-center justify-content-between page-head">
          <h4>My Cart</h4>
          <button
            className="inlinebuttonV2-base-actionButton"
            onClick={clearAllCartItems}
          >
            Clear Cart
          </button>
        </div>
        <div className="itemContainer-base-itemLeft">
          <div className="cart-product-base-container">
            {cartItems?.map((product) => (
              <div className="itemContainer-base-item " key={product.id}>
                <div>
                  {product?.available ? (
                    <Link href={"/product/" + product.url}>
                      <a>
                      <ProductImage
                        src={get(product, "feature_image", "")}
                        alt={product?.name}
                        className="cart-product-image cursor-pointer"
                      />
                      </a>
                    </Link>
                  ) : (
                    <ProductImage
                      src={get(product, "feature_image", "")}
                      alt={product?.name}
                      className="cart-product-image cursor-pointer"
                    />
                  )}
                </div>
                <div>
                  <div>
                    {product?.available ? (
                      <Link href={"/product/" + product.url}>
                        <h3 className="cart-product-name  cursor-pointer">
                          {product.name}
                        </h3>
                      </Link>
                    ) : (
                      <h3 className="cart-product-name">
                        {product.name}
                      </h3>
                    )}
                    {/* {
                      product?.short_description &&
                      <p className="cart-product-short-description">
                        {product?.short_description}
                      </p>
                    } */}
                  </div>

                  <div className="itemContainer-base-price">
                    <div className="itemComponents-base-price itemComponents-base-bold ">
                      <div>
                        <Price price={get(product, "amount", 0)} />
                      </div>
                    </div>

                    {get(product, "discountPercentage", 0) !== 0 && (
                      <div className="itemContainer-base-discountBlock">
                        <span className="itemComponents-base-strikedAmount">
                          <span className="itemComponents-base-price itemComponents-base-strike itemContainer-base-strikedAmount">
                            <Price price={get(product, "mrpAmount", 0)} />
                          </span>
                        </span>
                        <span className="itemComponents-base-itemDiscount">
                          {get(product, "discountPercentage")}% OFF
                        </span>
                      </div>
                    )}
                  </div>

                  <div className="itemContainer-base-sizeAndQtyContainer">
                    <div className="itemContainer-base-sizeAndQty">
                      <div className="itemComponents-base-quantity">
                        <label className="quantity-label">Qty : </label>
                        <select
                          id="quantitySelect"
                          className="quantity-button"
                          value={get(product, "quantity", 1)}
                          onChange={(e) =>
                            updateCartProductQuantity(
                              product,
                              parseInt(get(e, "target.value", 1))
                            )
                          }
                        >
                          {Array.from(
                            { length: 20 },
                            (_, index) => index + 1
                          ).map((quantity) => (
                            <option key={quantity} value={quantity}>
                              {quantity}
                            </option>
                          ))}
                        </select>
                      </div>
                    </div>
                    {product?.available ? (
                      <RemaningQuantity quantity={get(product,'productQuantity',0)} />
                    ) : (
                      <div className="itemComponents-base-lowUnitCount">
                        OUT OF STOCK
                      </div>
                    )}
                  </div>
                </div>
                <div className="cross-icon cursor-pointer">
                  <CloseIcon onClick={() => removeToCart(product)} />
                </div>
              </div>
            ))}
          </div>
          <CartTotalDetails totalSummary={totalSummary} cartItems={cartItems} />
        </div>
      </div>
      <AdditionalCartDetail cartItems={cartItems} />
    </div>
  );
};

export default CartTable;

CartTable.propTypes = {
  cartItems: PropTypes.array.isRequired,
  clearAllCartItems: PropTypes.func,
  removeToCart: PropTypes.func,
  updateCartProductQuantity: PropTypes.func,
  totalSummary: PropTypes.any,
};