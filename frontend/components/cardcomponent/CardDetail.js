import {
  Divider,
  Select,
  MenuItem,
  Checkbox,
  FormControl,
  InputLabel,
} from "@mui/material";
import { capitalize, get, upperCase } from "lodash";
import Link from "next/link";
import React from "react";
import Button from "@mui/material/Button";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import CloseIcon from "@mui/icons-material/Close";
// import QuantitySelector from "./quantitySelector";
import { useSelector } from "react-redux";
import { getImage, getPrice, imageOnError } from "../../utills/helpers";
const CartTable = (props) => {
  const label = { inputProps: { "aria-label": "Checkbox demo" } };
  const [open, setOpen] = React.useState(false);
  const settings = useSelector((state) => state.setting);
  const {
    cartItems,
    decimal,
    isQuantityBtnLoading,
    CalculateProductTotal,
    DecreaseQuantity,
    IncreaseQuantity,
    AllCartItemsClear,
    quantity,
    removeToCart,
    updateCartProduct,
    currency,
    unAvailableProducts,
    available,
    updateCartProductQuantity,
    homepageData,
    totalSummary,
  } = props;
  const imageType =
    homepageData && homepageData?.getSettings?.imageStorage?.status;
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

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
                <div className="itemComponents-base-selectionIconContainer itemContainer-base-selectionIndicator">
                  <div className="itemComponents-base-animationContainer ">
                    {/* <Checkbox
                      {...label}
                      sx={{
                        "&.Mui-checked": {
                          color: "#ff3f6c",
                        },
                      }}
                      className="itemComponents-base-activeProduct"
                    /> */}
                  </div>
                </div>
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
                      product?.productQuantity < 5 ? (
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
                        {currency} {getPrice(get(product,'amount',0), decimal)}
                      </div>
                    </div>

                    {get(product, "discountPercentage",0) !== 0 && (
                      <div className="itemContainer-base-discountBlock">
                        <span className="itemComponents-base-strikedAmount">
                          <span className="itemComponents-base-price itemComponents-base-strike itemContainer-base-strikedAmount">
                            {getPrice(get(product,'mrpAmount',0), decimal)}
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
          <div className="price-detail-base-container">
            <div className="price-detail">
              <h4 className="price-detail-heading">PRICE DETAILS</h4>
              <Divider className="cart-price-divider" />
              <div className="carttotal-detail">
                <p className="mrp-price">Total MRP</p>
                <p className="mtb2" style={{ fontSize: "14px" }}>
                  {currency} {getPrice(get(totalSummary,'mrpTotal',0), decimal)}
                </p>
              </div>
              <div className="priceDetail-base-row">
                <p className="mrp-price ">
                  Discount on MRP
                  <span className="priceDetail-base-knowMore ">Know More</span>
                </p>
                <p className="mtb2 freeshipping" style={{ fontSize: "14px" }}>
                  - {currency} {getPrice(get(totalSummary,'discountTotal',0), decimal)}
                </p>
              </div>

              <div className="priceDetail-base-row">
                <p className="mrp-price">
                  Shipping Fee
                  <span className="priceDetail-base-knowMore ">Know More</span>
                </p>
                <p className="mtb2" style={{ fontSize: "14px" }}>
                  {get(totalSummary, "totalShipping") === "0.00" ||
                  get(totalSummary, "totalShipping") === "0" ? (
                    <span className="freeshipping">FREE</span>
                  ) : (
                    `${currency} ${getPrice(
                     get(totalSummary,'totalShipping',0) ,
                      decimal
                    )}`
                  )}
                </p>
              </div>

              <Divider />
              <div className="priceDetail-base-row marginTop">
                <p className="mrp-price">Total Amount</p>
                <p className="mtb2 textRight">
                  {" "}
                  {currency} {getPrice(get(totalSummary,'grandTotal',0), decimal)}
                </p>
              </div>

              <Link href="/checkout">
                <a className="card-btons text-align-center">
                  <i className="fas fa-archive"></i>
                  <span className="text-align-center">PLACE ORDER</span>
                </a>
              </Link>
            </div>
            <div className="cart-action text-end">
              <Link href="/shop">
                <a className="card-btons ">
                  <i className="fas fa-shopping-bag"></i> Continue Shopping
                </a>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartTable;
