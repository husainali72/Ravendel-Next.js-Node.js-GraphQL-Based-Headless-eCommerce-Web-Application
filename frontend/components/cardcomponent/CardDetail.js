/* eslint-disable react/jsx-key */
/* eslint-disable react/prop-types */
import { get, upperCase } from "lodash";
import Link from "next/link";
import React from "react";
import CloseIcon from "@mui/icons-material/Close";
import CartTotalDetails from "./cartTotal";
import Price from "../priceWithCurrency";
import ProductImage from "../imageComponent";
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
        <div className="bulkActionStrip-desktopContainer">
          <div className="inlinebuttonV2-base-actions bulkActionStrip-desktopButton">
            <div className="inlinebuttonV2-base-action bulkActionStrip-desktopActionButton">
              <button
                className="inlinebuttonV2-base-actionButton bulkActionStrip-desktopBulkRemove"
                onClick={clearAllCartItems}
              >
                {" "}
                REMOVE
              </button>
            </div>
            <div className="inlinebuttonV2-base-action bulkActionStrip-desktopActionButton">
              <button className="inlinebuttonV2-base-actionButton bulkActionStrip-desktopBulkWishlist">
                MOVE TO WISHLIST
              </button>
            </div>
          </div>
        </div>
        <div className="itemContainer-base-itemLeft">
          <div className="cart-product-base-container">
            {cartItems?.map((product) => (
              <div className="itemContainer-base-item " key={product.id}>
                <div>
                  {product?.available ? (
                    <Link href={"/product/" + product.url}>
                      <ProductImage
                        src={get(product, "feature_image", "")}
                        alt={product?.name}
                        className="cart-product-image cursor-pointer"
                      />
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
                          {upperCase(product.name)}
                        </h3>
                      </Link>
                    ) : (
                      <h3 className="cart-product-name">
                        {upperCase(product.name)}
                      </h3>
                    )}
                    <p className="cart-product-short-description">
                      {upperCase(product?.short_description)}
                    </p>
                  </div>
                  <div className="itemComponents-base-sellerContainer">
                    <div className="itemComponents-base-sellerData"></div>
                  </div>

                  <div className="itemContainer-base-sizeAndQtyContainer">
                    <div className="itemContainer-base-sizeAndQty">
                      <div className="itemComponents-base-quantity">
                        <label className="quantity-label">QTY : </label>
                        {/* <FormControl>
                          <Select
                            labelId="demo-simple-select-label"
                            id="quantitySelect"
                            className="quantity-button"
                            value={product.quantity}
                            onChange={(e) =>
                              updateCartProductQuantity(
                                product,
                                parseInt(e.target.value)
                              )
                            }
                          >
                            {Array.from(
                              { length: 20 },
                              (_, index) => index + 1
                            ).map((quantity) => (
                              <MenuItem value={quantity} sx={{fontSize:'12px'}}>{quantity}</MenuItem>
                            ))}
                          </Select>
                        </FormControl> */}
                        <select
                          id="quantitySelect"
                          className="quantity-button"
                          value={get(product,'quantity',1)}
                          onChange={(e) =>
                            updateCartProductQuantity(
                              product,
                              parseInt(get(e,'target.value',1))
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
                      product?.productQuantity <= 5 ? (
                        <div className="itemComponents-base-lowUnitCount">
                          {`${product?.productQuantity} Left`}
                        </div>
                      ) : null
                    ) : (
                      <div className="itemComponents-base-lowUnitCount">
                        OUT OF STOCK
                      </div>
                    )}
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
                </div>
                <div className="cross-icon cursor-pointer">
                  <CloseIcon onClick={() => removeToCart(product)} />
                </div>
              </div>
            ))}
          </div>
          <CartTotalDetails totalSummary={totalSummary} />
        </div>
      </div>
    </div>
  );
};

export default CartTable;
