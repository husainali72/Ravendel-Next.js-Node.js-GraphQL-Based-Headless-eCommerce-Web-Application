import {
  Select,
  MenuItem,
  FormControl,
} from "@mui/material";
import { get, upperCase } from "lodash";
import Link from "next/link";
import React from "react";
import CloseIcon from "@mui/icons-material/Close";
import { getImage, getPrice, imageOnError } from "../../utills/helpers";
import CartTotalDetails from "./cartTotal";
const CartTable = (props) => {
  const {
    cartItems,
    AllCartItemsClear,
    removeToCart,
    currency,
    updateCartProductQuantity,
    homepageData,
    totalSummary,
  } = props;
  const imageType = get(homepageData,'getSettings.imageStorage.status');
  const currencyOptions = get(homepageData,'getSettings.store.currency_options')



  return (
    <div>
      <div className="cart-main-container">
        <div className="bulkActionStrip-desktopContainer">

          <div className="inlinebuttonV2-base-actions bulkActionStrip-desktopButton">
            <div className="inlinebuttonV2-base-action bulkActionStrip-desktopActionButton">
              <button
                className="inlinebuttonV2-base-actionButton bulkActionStrip-desktopBulkRemove"
                onClick={AllCartItemsClear}
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
                      <img
                        src={getImage(product.feature_image, imageType)}
                        onError={imageOnError}
                        alt={product?.name}
                        className="cart-product-image cursor-pointer"
                      />
                    </Link>
                  ) : (
                    <img
                      src={getImage(product.feature_image, imageType)}
                      onError={imageOnError}
                      alt={product?.name}
                      className="cart-product-image"
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
                    <div className="itemComponents-base-sellerData">
                    </div>
                  </div>

                  <div className="itemContainer-base-sizeAndQtyContainer">
                    <div className="itemContainer-base-sizeAndQty">
                      <div className="itemComponents-base-quantity">
                        <label className="quantity-label">QTY : </label>
                        <FormControl>
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
                        </FormControl>
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
                        {currency} {getPrice(get(product,'amount',0),currencyOptions)}
                      </div>
                    </div>

                    {get(product, "discountPercentage",0) !== 0 && (
                      <div className="itemContainer-base-discountBlock">
                        <span className="itemComponents-base-strikedAmount">
                          <span className="itemComponents-base-price itemComponents-base-strike itemContainer-base-strikedAmount">
                            {getPrice(get(product,'mrpAmount',0), currencyOptions)}
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
          <CartTotalDetails totalSummary={totalSummary} currencyOptions={currencyOptions} currency={currency}/>
        </div>
      </div>
    </div>
  );
};

export default CartTable;
