/* eslint-disable no-unused-vars */
import { useState, useEffect } from "react";
import { Container } from "react-bootstrap";
import BreadCrumb from "../components/breadcrumb/breadcrumb";
import { useSelector, useDispatch } from "react-redux";
import CartTable from "../components/cardcomponent/CardDetail";
import {
  removeCartItemAction,
  increaseQuantity,
  changeQty,
  removeAllCartItemsAction,
  REMOVE_ALL_VALUE,
  calculateUserCart,
  calculateUnauthenticatedCart,
} from "../redux/actions/cartAction";
import {
  getItemFromLocalStorage,
  handleError,
  mutation,
} from "../utills/helpers";
import { DELETE_CART_PRODUCTS } from "../queries/cartquery";
import { useSession, getSession } from "next-auth/react";
import { getAllProductsAction } from "../redux/actions/productAction";
import LoadingCartTable from "../components/cardcomponent/LoadingCard";
import { get } from "lodash";
import Loading from "../components/loadingComponent";
import notify from "../utills/notifyToast";
import { Toaster } from "react-hot-toast";
import { useRouter } from "next/router";
import EmptyCart from "../components/shoppage/emptyCartpage";
const YourCard = () => {
  const session = useSession();
  const cart = useSelector((state) => state.cart);
  const [cartLoading, setCartLoading] = useState(false);
  const [isQuantityBtnLoading, setIsQuantityBtnLoading] = useState(false);
  const [cartItems, setCartItems] = useState([]);
  const dispatch = useDispatch();
  const [totalSummary, setTotalSummary] = useState({});
  const router=useRouter()
  // get all products and user cart
  useEffect(() => {
    getUserCartData();
  }, []);
  useEffect(() => {
    setIsQuantityBtnLoading(get(cart, "loading"));
  }, [get(cart, "loading")]);

  const getUserCartData = async () => {
    const userSession = await getSession();
    if ("authenticated" === session?.status || null !== userSession) {
      let id = get(userSession, "user.accessToken.customer._id");
      dispatch(calculateUserCart(id));
    } else {
      const localStorageProducts = getItemFromLocalStorage("cart");
      dispatch(calculateUnauthenticatedCart(localStorageProducts));
    }
  };
  useEffect(() => {
    const getProducts = async () => {
      setCartLoading(true);
      let cartItemsArray = [];
      let allItem = [];
      get(cart, "cartItems", [])?.map((cart) => {
        let cartProduct = {
          _id: get(cart, "productId", ""),
          variantId: get(cart, "variantId", ""),
          quantity: parseInt(get(cart, "qty")),
          productQuantity: get(cart, "productQuantity"),
          name: get(cart, "productTitle"),
          pricing: get(cart, "productPrice"),
          price: get(cart, "productPrice"),
          short_description: get(cart, "short_description"),
          feature_image: get(cart, "productImage"),
          url: get(cart, "url"),
          attributes: get(cart, "attributes", []),
          shippingClass: get(cart, "shippingClass"),
          taxClass: get(cart, "taxClass"),
          discountPercentage: get(cart, "discountPercentage"),
          amount: get(cart, "amount"),
          mrpAmount: get(cart, "mrpAmount"),
          available: get(cart, "available"),
        };
        allItem.push(cartProduct);
        cartItemsArray.push(cartProduct);
      });
      setTotalSummary({
        ...totalSummary,
        grandTotal: get(cart, "totalSummary.grandTotal"),
        cartTotal: get(cart, "totalSummary.cartTotal"),
        totalShipping: get(cart, "totalSummary.totalShipping"),
        totalTax: get(cart, "totalSummary.totalTax"),
        mrpTotal: get(cart, "totalSummary.mrpTotal"),
        discountTotal: get(cart, "totalSummary.discountTotal"),
      });
      setCartItems([...cartItemsArray]);
      setCartLoading(false);
    };
    getProducts();
  }, [get(cart, "cartItems")]);
  // Function to clear all items in the cart
  const clearAllCartItems = async () => {
    setCartItems([]);
    if ("authenticated" === session.status) {
      let id = get(session, "data.user.accessToken.customer._id");
      let variables = { userId: id };
      dispatch(removeAllCartItemsAction(variables,router));
    } else {
      dispatch({
        type: REMOVE_ALL_VALUE,
        payload: [],
      });
    }
  };
  const updateCartProductQuantity = (item, updatedQuantity) => {
    // const isQuantityIncreased = cartItems?.find((cartItem) => {
    //   let cartItemId = get(cartItem, "_id");
    //   let cartItemVariantId = get(cartItem, "variantId");
    //   let itemId = get(item, "_id");
    //   let itemVariantId = get(item, "variantId");
    //   let itemProductQuantity = get(item, "productQuantity");
    //   console.log(itemProductQuantity, "itemProductQuantity", item);
    //   return (
    //     ((cartItemId === itemId && cartItemVariantId === itemVariantId) ||
    //       (cartItemId === itemId && !cartItemVariantId === itemVariantId)) &&
    //     itemProductQuantity >= updatedQuantity
    //   );
    // });
    let prevQuantity = null;
    let updatedCartItems = cartItems?.map((cartItem) => {
      if (cartItem?._id === item?._id) {
        prevQuantity = cartItem?.quantity; // Store previous quantity
        return { ...cartItem, quantity: updatedQuantity };
      }
      return cartItem;
    });
    setCartItems([...updatedCartItems]);
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
      setIsQuantityBtnLoading(false);
    } else {
      let id = get(session, "data.user.accessToken.customer._id");
      let variables = {
        userId: id,
        productId: get(item, "_id"),
        qty: updatedQuantity,
      };
      dispatch(changeQty(variables,router))
        .then((res) => {
          if (get(res, "data.changeQty.success")) {
            dispatch(calculateUserCart(id));
          } else {
            let revertedCartItems = cartItems?.map((cartItem) => {
              if (cartItem?._id === item?._id) {
                return { ...cartItem, quantity: prevQuantity };
              }
              return cartItem;
            });
            setCartItems([...revertedCartItems]);
          }
          setIsQuantityBtnLoading(false);
        })
        .catch((error) => {
          setIsQuantityBtnLoading(false);
        });
    }
  };
  // Function to remove an item from the cart
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
            dispatch(calculateUserCart(id));
          }
        })
        .catch((error) => {
          handleError(error, dispatch,router);
        });
    } else {
      let cartItemsfilter = cartItems?.filter(
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
      setCartItems(cartItemsfilter);
    }
  };
  if (cartLoading) {
    return (
      <>
        <BreadCrumb title={"Cart"} />
        <section className="shopcart-table loading-table">
          <Container>
            <div className="row">
              <LoadingCartTable />
            </div>
          </Container>
        </section>
      </>
    );
  } else {
    return (
      <>
        <BreadCrumb title={"Cart"} />
        <Toaster />
        <section className="shopcart-table">
          <Container>
            {isQuantityBtnLoading && <Loading />}
            {0 < cartItems?.length ? (
              <div className="row">
                <div className="col-12">
                  <CartTable
                    cartItems={cartItems}
                    removeToCart={removeToCart}
                    clearAllCartItems={clearAllCartItems}
                    totalSummary={totalSummary}
                    updateCartProductQuantity={updateCartProductQuantity}
                  />
                </div>
              </div>
            ) : (
             <EmptyCart/>
            )}
          </Container>
        </section>
      </>
    );
  }
};
export default YourCard;
