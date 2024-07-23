import { useEffect, useState } from "react";
import Link from "next/link";
import {
  query,
  getItemFromLocalStorage,
  handleError,
} from "../../utills/helpers";
import { useSelector, useDispatch } from "react-redux";
import {
  calculateUnauthenticatedCart,
  calculateUserCart,
  changeQty,
  increaseQuantity,
  removeCartItemAction,
} from "../../redux/actions/cartAction";
import {
  DELETE_CART_PRODUCTS,
  GET_USER_CART_COUNT,
} from "../../queries/cartquery";
import { mutation } from "../../utills/helpers";
import { useSession } from "next-auth/react";
import { get } from "lodash";
import ProductImage from "../imageComponent";
import Price from "../priceWithCurrency";
import { useRouter } from "next/router";
import QuantitySelector from "../singleproductcomponent/increaseQuantity";
import { MdDelete } from "react-icons/md";
import { Toaster } from "react-hot-toast";
const CalculateProductTotal = (product) =>
  product.reduce(
    (total, product) => total + product.price * product.quantity,
    0
  );
export const ShopCart = () => {
  const session = useSession();
  const dispatch = useDispatch();
  const [cart, setCart] = useState([]);
  const cartProduct = useSelector((state) => state.cart);
  const router = useRouter();
  useEffect(() => {
    getCartMiniCartData();
  }, [session?.status, cartProduct]);
  const prepareCartItemsList = (allCartItems) => {
    let cartItemsList = [];
    allCartItems?.map((cart) => {

      let cartProduct = {
        _id: get(cart, "productId", ""),
        quantity: parseInt(get(cart, "qty")),
        productQuantity: get(cart, "productQuantity"),
        name: get(cart, "productTitle"),
        price: get(cart, "productPrice"),
        feature_image: get(cart, "productImage"),
        url: get(cart, "url"),
        available: get(cart, "available"),
      };
      cartItemsList.push(cartProduct);
    });
    return cartItemsList;
  };

  const getCartMiniCartData = async () => {
    if (session?.status === "authenticated") {
      let id = get(session, "data.user.accessToken.customer._id");
      if (id) {
        query(GET_USER_CART_COUNT, { userId: id })
          .then((response) => {
            let cartItems = prepareCartItemsList(
              get(response, "data.getCartDetails.data.cartItems")
            );
            setCart(cartItems);
          })
          .catch((error) => {
            console.log(error);
          });
      }
    } else {
      let items = getItemFromLocalStorage("cart");
      items = items?.map((item) => {
        return { ...item, price: get(item, "pricing") };
      });
      setCart(items);
    }
  };
  const updateCartProductQuantity = (item, updatedQuantity) => {
    let prevQuantity = null;
    let updatedCartItems = cart?.map((cartItem) => {
      if (cartItem?._id === item?._id) {
        prevQuantity = cartItem?.quantity; // Store previous quantity
        return { ...cartItem, quantity: updatedQuantity };
      }
      return cartItem;
    });
    setCart([...updatedCartItems]);
    if ("authenticated" !== session?.status) {
      dispatch(
        increaseQuantity(
          item?._id,
          item?.productQuantity,
          item?.variantId,
          updatedQuantity
        )
      );
      dispatch(calculateUnauthenticatedCart(updatedCartItems));
    } else {
      let id = get(session, "data.user.accessToken.customer._id");
      let variables = {
        userId: id,
        productId: get(item, "_id"),
        qty: updatedQuantity,
      };
      dispatch(changeQty(variables, router))
        .then((res) => {
          if (get(res, "data.changeQty.success")) {
            dispatch(calculateUserCart(id));
          } else {
            let revertedCartItems = cart?.map((cartItem) => {
              if (cartItem?._id === item?._id) {
                return { ...cartItem, quantity: prevQuantity };
              }
              return cartItem;
            });
            setCart([...revertedCartItems]);
          }
        })
        .catch((error) => {console.log(error)});
    }
  };
  const removeToCart = async (item) => {
    let productId = get(item, "_id", "");
    if ("authenticated" === session?.status) {
      let id = get(session, "data.user.accessToken.customer._id");
      let variables = {
        userId: id,
        productId: item?._id,
        variantId: get(item, "variantId", ""),
      };

      mutation(DELETE_CART_PRODUCTS, variables)
        .then((res) => {
          if (get(res, "data.deleteCartProduct.success")) {
            getCartMiniCartData();
            dispatch(calculateUserCart(id));
          }
        })
        .catch((error) => {
          handleError(error, dispatch, router);
        });
    } else {
      let cartItemsfilter = cart?.filter(
        (cartItem) =>
          cartItem?._id !== productId ||
          (cartItem?._id === productId &&
            cartItem?.variantId !== item?.variantId)
      );
      let variables = {
        id: productId,
        variantId: get(item, "variantId", ""),
      };

      dispatch(removeCartItemAction(variables));
      dispatch(calculateUnauthenticatedCart(cartItemsfilter));
      setCart(cartItemsfilter);
    }
  };
  const changeQuantity = (qty, item) => {
    updateCartProductQuantity(item, qty);
  };
  return (
    <>
      <Toaster />
      {cart && cart?.length > 0 ? (
        <div>
          <b>
            {cart?.length} Item{cart?.length > 1 ? "s" : ""} in your cart
          </b>
          {cart?.map((item, i) => (
            <>
              <div key={i} className="mini-cart-container">
                <div className="shopping-cart-img td-flex">
                  <Link
                    href={`/product/[singleproduct]?url=${item.url || "#"}`}
                    as={`/product/${item.url || "#"}`}
                  >
                    <a
                    >
                      <ProductImage
                        src={get(item, "feature_image", "")}
                        className="cart-product-image cursor-pointer mini-cart-image"
                      />
                    </a>
                  </Link>
                </div>
                <div className="mini-cart-second-container">
                  <div className="shopping-cart-title mini-cart-product-container">
                    <div>
                      <Link
                        href={`/product/[singleproduct]?url=${item.url || "#"}`}
                        as={`/product/${item.url || "#"}`}
                      >
                        <h5 className="mini-cart-prod-title">
                          {item?.name?.length > 14 ? (
                            <h5
                              className="mini-cart-prod-title"
                              dangerouslySetInnerHTML={{
                                __html: item.name.substring(0, 14) + "",
                              }}
                            ></h5>
                          ) : (
                            <h5>{item.name}</h5>
                          )}
                        </h5>
                      </Link>
                    </div>
                    <div className="itemContainer-base-price">
                      <div className="itemComponents-base-price itemComponents-base-bold ">
                        <div className="mini-cart-prod-title">
                          <Price price={get(item, "price", 0)} />
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="mini-cart-qty-container">
                    <div>
                      <QuantitySelector
                        changeQuantity={(qty) => changeQuantity(qty, item)}
                        quantity={get(item, "quantity", 1)}
                        decreaseBtnClass="mini-cart-decrease-qty"
                        increaseBtnClass="mini-cart-decrease-qty"
                        inputClass="mini-cart-input-qty"
                        actualQuantity={get(item,'productQuantity',0)}
                        hideLabel
                      />
                    </div>
                    <div>
                      <a onClick={() => removeToCart(item)}>
                        <MdDelete className="mini-cart-delete-product" />
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </>
          ))}
          <div className="shopping-cart-footer ">
            <div className="shopping-cart-total mini-cart-footer">
              <div className="mini-cart-grand-total">Grand Total</div>
              <div className="itemContainer-base-price">
                <div className="itemComponents-base-price itemComponents-base-bold ">
                  <div className="mini-cart-prod-title">
                    <Price price={CalculateProductTotal(cart)} />
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="shopping-cart-button ">
            <Link href="/shopcart">
              <a className="shopping-cart-button-view-cart">
                <button className="mini-card-btons text-align-center outline">
                  View Cart
                </button>
              </a>
            </Link>
          </div>
        </div>
      ) : (
        <h5>Cart is empty</h5>
      )}
    </>
    // </div>
  );
};
export default ShopCart;
