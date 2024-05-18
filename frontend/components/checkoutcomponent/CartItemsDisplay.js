import Link from "next/link"
import CloseIcon from "@mui/icons-material/Close";
import PropTypes from "prop-types";
import ProductImage from "../imageComponent"
import { get } from "lodash"
import Price from "../priceWithCurrency"
import { CircularProgress } from "@mui/material";

const CartItemsDisplay = ({cartItems, removeToCart, updateCartProductQuantity, cartLoading}) => {
  return (
    <>
        {
            cartLoading ?
            <div className="loader-wrapper">
                <CircularProgress />
            </div>
            :
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
                    <div style={{padding: '10px 0'}} className="product-details">
                        <div className="mb-2">
                        {product?.available ? (
                            <Link href={"/product/" + product.url}>
                            <h3 className="cart-product-name  cursor-pointer">
                                {(product.name)}
                            </h3>
                            </Link>
                        ) : (
                            <h3 className="cart-product-name">
                            {(product.name)}
                            </h3>
                        )}
                        </div>

                        {/* {product?.available ? (
                            <>
                                {
                                    get(product,'productQuantity') > 0 &&
                                    <div className="itemContainer-base-sizeAndQtyContainer">
                                
                                        <RemainingQuantity quantity={get(product,'productQuantity',0)} />
                                    </div>
                                }
                            </>
                        ) : (
                            <div className="itemContainer-base-sizeAndQtyContainer">
                                <div className="itemComponents-base-lowUnitCount">
                                    OUT OF STOCK
                                </div>
                            </div>
                        )} */}
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
                    </div>
                    <div className="cross-icon cursor-pointer">
                        <CloseIcon onClick={() => removeToCart(product)} />
                    </div>
                    </div>
                ))}
            </div>

        }
    </>
  )
}

export default CartItemsDisplay

CartItemsDisplay.propTypes = {
    cartItems: PropTypes.array.isRequired,
    removeToCart: PropTypes.func.isRequired,
    updateCartProductQuantity: PropTypes.func.isRequired,
    cartLoading: PropTypes.bool.isRequired,
  };