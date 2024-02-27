import { useState, useEffect, useRef } from "react";
import { Container } from "react-bootstrap";
import BreadCrumb from "../components/breadcrumb/breadcrumb";
import { useSelector, useDispatch } from "react-redux";
import CartTable from "../components/cardcomponent/CardDetail";
import {
  removeCartItemAction,
  increaseQuantity,
  decreaseQuantity,
  changeQty,
  getUserCart,
  removeAllCartItemsAction,
} from "../redux/actions/cartAction";
import {
  currencySetter,
  formatNumber,
  getPrice,
  mutation,
  query,
} from "../utills/helpers";
import {
  DELETE_CART_PRODUCTS,
  UPDATE_CART_PRODUCT,
} from "../queries/cartquery";
import { GET_HOMEPAGE_DATA_QUERY } from "../queries/home";
import client from "../apollo-client";
import { useSession, getSession } from "next-auth/react";
import { getAllProductsAction } from "../redux/actions/productAction";
import { useRouter } from "next/router";
import { settingActionCreator } from "../redux/actions/settingAction";
import LoadingCartTable from "../components/cardcomponent/LoadingCard";
import Link from "next/link";
import { get } from "lodash";
import { CircularProgress } from "@mui/material";
import { Toaster } from "react-hot-toast";
import Loading from "../components/loadingComponent";
const CalculateProductTotal = (product) =>
  product.reduce(
    (total, product) =>
      total +
      (product.pricing * product.quantity ||
        product.pricing * product.quantity),
    0
  );
const YourCard = ({
  customercart,
  cart_id,
  CartsDataa,
  currencyStore,
  homepageData,
}) => {
  var id = "";
  var token = "";
  const router = useRouter();
  const session = useSession();
  const allProducts = useSelector((state) => state.products);
  const cart = useSelector((state) => state.cart);
  const [cartLoading, setCartLoading] = useState(false);
  const [isQuantityBtnLoading, setIsQuantityBtnLoading] = useState(false);
  const [cartItems, setCartItems] = useState([]);
  const [allCartItems, setAllCartItems] = useState([]);
  const [quantityy, setQuantity] = useState();
  const dispatch = useDispatch();
  const [unAvailableProducts, setUnAvailableProduct] = useState([]);
  const [currency, setCurrency] = useState("$");
  const [decimal, setdecimal] = useState(2);
  const [cartTotalLoading, setCartTotalLoading] = useState(false);
  const [totalSummary, setTotalSummary] = useState(2);
  const settings = useSelector((state) => state.setting);
  useEffect(() => {
    setdecimal(settings?.currencyOption?.number_of_decimals);
    currencySetter(settings, setCurrency);
  }, [settings?.currencyOption]);
  useEffect(() => {
    dispatch(settingActionCreator(currencyStore.currency_options));
  }, [currencyStore.currency_options]);

  // get all products and user cart
  useEffect(() => {
    dispatch(getAllProductsAction());
    getUserCartData();
  }, []);
  useEffect(() => {
    setCartTotalLoading(get(cart, "loading"));
  }, [get(cart, "loading")]);

  const getUserCartData = async () => {
    const userSession = await getSession();
    if (session?.status === "authenticated" || userSession !== null) {
      let id = get(userSession, "user.accessToken.customer._id");
      dispatch(getUserCart(id));
    }
  };
  useEffect(() => {
    const getProducts = async () => {
      const productsCard = JSON.parse(localStorage.getItem("cart"));
      const userSession = await getSession();
      if (session?.status === "authenticated" || userSession !== null) {
        setCartLoading(true);
        id = get(userSession, "user.accessToken.customer._id");
        token = get(userSession, "user.accessToken.token");
        let cartItemsArray = [];
        let allItem = [];
        let unAvailableItems = [];
        get(cart, "cartItems", [])?.map((cart) => {
          const originalProduct = allProducts?.products?.find(
            (prod) => prod._id === cart.productId
          );
          const orginalAttributes = originalProduct?.variation_master?.find(
            (prod) => prod.id === cart.variantId
          );
          let cartProduct = {
            _id: get(cart, "productId", ""),
            variantId: get(cart, "variantId", ""),
            quantity: parseInt(get(cart, "qty")),
            productQuantity: get(
              orginalAttributes,
              "quantity",
              get(originalProduct, "quantity")
            ),
            name: get(cart, "productTitle"),
            pricing: get(cart, "productPrice"),
            feature_image: get(cart, "productImage"),
            url: get(originalProduct, "url"),
            attributes: get(cart, "attributes", []),
            shippingClass: get(cart, "shipping.shippingClass"),
            taxClass: get(cart, "taxClass"),
          };
          allItem.push(cartProduct);
          if (cart.available) {
            cartItemsArray.push(cartProduct);
          } else {
            unAvailableItems.push(cartProduct);
          }
        });
        setTotalSummary({
          ...totalSummary,
          grandTotal: formatNumber(get(cart, "totalSummary.grandTotal")),
          cartTotal: formatNumber(get(cart, "totalSummary.cartTotal")),
          totalShipping: formatNumber(get(cart, "totalSummary.totalShipping")),
          totalTax: formatNumber(get(cart, "totalSummary.totalTax")),
        });
        setCartItems([...cartItemsArray]);
        setAllCartItems([...allItem]);
        setUnAvailableProduct([...unAvailableItems]);
        setCartLoading(false);
      } else {
        setCartItems(productsCard || []);
        setAllCartItems(productsCard || []);
        setCartLoading(false);
      }
    };
    getProducts();
  }, [allProducts, get(cart, "cartItems")]);

  // Function to clear all items in the cart
  const AllCartItemsClear = async () => {
    setCartItems([]);
    setAllCartItems([]);
    if (session.status === "authenticated") {
      let id = get(session, "data.user.accessToken.customer._id");
      let variables = { userId: id };
      dispatch(removeAllCartItemsAction(variables));
    } else {
      dispatch(removeAllCartItemsAction([]));
    }

    localStorage.setItem("cart", JSON.stringify([]));
  };

  // Function to increase the quantity of a cart item
  const IncreaseQuantity = async (item) => {
    setIsQuantityBtnLoading(true);
    const isQuantityIncreased = allCartItems.some(
      (itemm) =>
        itemm._id === item._id &&
        itemm.variantId === item.variantId &&
        item?.productQuantity >= itemm.quantity + 1
    );
    setAllCartItems(
      [...allCartItems],
      allCartItems.filter((itemm) =>
        itemm._id === item._id && itemm.variantId === item.variantId
          ? item?.productQuantity >= itemm.quantity + 1 && (itemm.quantity += 1)
          : itemm.quantity
      )
    );
    if (session?.status !== "authenticated") {
      dispatch(
        increaseQuantity(item._id, item.productQuantity, item.variantId)
      );
      setIsQuantityBtnLoading(false);
    } else {
      const selectedProduct = cartItems.find(
        (cart) => cart._id === item._id && cart.variantId === item.variantId
      );
      const qty = selectedProduct.quantity;
      if (session?.status === "authenticated") {
        let id = get(session, "data.user.accessToken.customer._id");
        let variables = {
          userId: id,
          productId: get(item, "_id"),
          qty: isQuantityIncreased ? qty : qty + 1,
        };
        dispatch(changeQty(variables))
          .then((res) => {
            if (get(res, "data.changeQty.success")) {
              dispatch(getUserCart(id));
            }
            setIsQuantityBtnLoading(false);
          })
          .catch((err) => {
            setIsQuantityBtnLoading(false);
          });
      }
    }
  };
  // Function to decrease the quantity of a cart item
  const DecreaseQuantity = (item) => {
    if (item.quantity > 1) {
      setIsQuantityBtnLoading(true);
      setAllCartItems(
        [...allCartItems],
        allCartItems.filter((itemm) =>
          itemm._id === item._id && itemm.variantId === item.variantId
            ? itemm.quantity - 1 >= 1 && (itemm.quantity -= 1)
            : itemm.quantity
        )
      );
      setQuantity(item.quantity);
      if (session?.status !== "authenticated") {
        let variables = {
          _id: item._id,
          variantId: item.variantId,
        };
        dispatch(decreaseQuantity(variables));
        setIsQuantityBtnLoading(false);
      } else {
        const selectedProduct = cartItems.find(
          (cart) => cart._id === item._id && cart.variantId === item.variantId
        );
        const qty = selectedProduct?.quantity;
        if (session?.status === "authenticated") {
          let id = get(session, "data.user.accessToken.customer._id");
          let variables = {
            userId: id,
            productId: get(item, "_id"),
            qty: qty,
          };
          dispatch(changeQty(variables))
            .then((res) => {
              if (get(res, "data.changeQty.success")) {
                dispatch(getUserCart(id));
              }
              setIsQuantityBtnLoading(false);
            })
            .catch((err) => {
              setIsQuantityBtnLoading(false);
            });
        }
      }
    } else {
      setCartTotalLoading(false);
      setIsQuantityBtnLoading(false);
    }
  };
  // Function to remove an item from the cart
  const removeToCart = async (item) => {
    let product = item?._id;
    if (session?.status === "authenticated") {
      let id = get(session, "data.user.accessToken.customer._id");
      let variables = {
        userId: id,
        productId: item._id,
        variantId: item.variantId,
      };

      mutation(DELETE_CART_PRODUCTS, variables, dispatch).then(
        (res) => {
          if (get(res, "data.deleteCartProduct.success")) {
            dispatch(getUserCart(id));
          }
        }
      );
    } else {
      let cartItemsfilter = cartItems.filter(
        (itemm) =>
          itemm._id !== product ||
          (itemm._id === product && itemm.variantId !== item.variantId)
      );
      let variables = {
        id: product,
        variantId: item.variantId,
      };
      dispatch(removeCartItemAction(variables));
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
              <div className="col-12">
                <LoadingCartTable />
              </div>
            </div>
          </Container>
        </section>
      </>
    );
  } else
    return (
      <>
        <BreadCrumb title={"Cart"} />
        <section className="shopcart-table">
          <Container>
            <Toaster />
            {isQuantityBtnLoading && <Loading />}
            {cartItems?.length > 0 ? (
              <div className="row">
                <div className="col-12">
                  <CartTable
                    homepageData={homepageData}
                    decimal={decimal}
                    isQuantityBtnLoading={isQuantityBtnLoading}
                    cartItems={cartItems}
                    quantity={quantityy}
                    IncreaseQuantity={IncreaseQuantity}
                    DecreaseQuantity={DecreaseQuantity}
                    removeToCart={removeToCart}
                    CalculateProductTotal={CalculateProductTotal}
                    AllCartItemsClear={AllCartItemsClear}
                    currency={currency}
                    available={true}
                    settings={settings}
                  />

                  {unAvailableProducts && unAvailableProducts?.length > 0 ? (
                    <>
                      <h3 style={{ color: "red", fontSize: "15px" }}>
                        Out of stock
                      </h3>

                      <CartTable
                        homepageData={homepageData}
                        decimal={decimal}
                        isQuantityBtnLoading={isQuantityBtnLoading}
                        cartItems={unAvailableProducts}
                        quantity={quantityy}
                        IncreaseQuantity={IncreaseQuantity}
                        DecreaseQuantity={DecreaseQuantity}
                        removeToCart={removeToCart}
                        CalculateProductTotal={CalculateProductTotal}
                        AllCartItemsClear={AllCartItemsClear}
                        currency={currency}
                        available={false}
                        settings={settings}
                      />
                    </>
                  ) : null}
                  <div className="cart-action text-end">
                    <Link href="/shop">
                      <a className="card-btons ">
                        <i className="fas fa-shopping-bag"></i> Continue
                        Shopping
                      </a>
                    </Link>
                  </div>
                  <div className="card-other-information flex-column-reverse">
                    <div className="col-lg-12 col-md-12 col-sm-12 mt-4">
                      <div className="border p-md-4 p-30 border-radius cart-totals">
                        <div className="heading_s1 mb-3">
                          <h4>Cart Totals</h4>
                        </div>
                        <div className="table-responsive">
                          <table className="table">
                            <tbody>
                              <tr>
                                <td className="cartTotal_label">
                                  Cart Subtotal
                                </td>
                                <td className="cartTotal_loading">
                                  {cartTotalLoading && (
                                    <CircularProgress
                                      color="success"
                                      size="20px"
                                    />
                                  )}
                                </td>
                                <td className="cartTotal_amount">
                                  <span className="font-lg fw-900 text-brand">
                                    {currency}{" "}
                                    {getPrice(
                                      get(totalSummary, "cartTotal"),
                                      decimal
                                    )}
                                  </span>
                                </td>
                              </tr>
                              <tr>
                                <td className="cartTotal_label">Shipping</td>
                                <td></td>
                                <td className="cartTotal_amount">
                                  {" "}
                                  <i className="ti-gift mr-5"></i>{" "}
                                  {getPrice(
                                    get(totalSummary, "totalShipping"),
                                    decimal
                                  )}
                                </td>
                              </tr>
                              <tr>
                                <td className="cartTotal_label">Total</td>
                                <td></td>
                                <td className="cartTotal_amount">
                                  <strong>
                                    <span className="font-xl fw-900 text-brand">
                                      {currency}{" "}
                                      {getPrice(
                                        get(totalSummary, "grandTotal"),
                                        decimal
                                      )}
                                    </span>
                                  </strong>
                                </td>
                              </tr>
                            </tbody>
                          </table>
                        </div>
                        <Link href="/checkout">
                          <a className="card-btons">
                            <i className="fas fa-archive"></i> Proceed To
                            CheckOut
                          </a>
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ) : unAvailableProducts && unAvailableProducts?.length > 0 ? (
              <>
                <h3 style={{ color: "red", fontSize: "15px" }}>Out of stock</h3>

                <CartTable
                  homepageData={homepageData}
                  decimal={decimal}
                  isQuantityBtnLoading={isQuantityBtnLoading}
                  cartItems={unAvailableProducts}
                  quantity={quantityy}
                  IncreaseQuantity={IncreaseQuantity}
                  DecreaseQuantity={DecreaseQuantity}
                  removeToCart={removeToCart}
                  CalculateProductTotal={CalculateProductTotal}
                  AllCartItemsClear={AllCartItemsClear}
                  currency={currency}
                  available={false}
                />
              </>
            ) : (
              <p
                style={{
                  display: "flex",
                  flex: 1,
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                No product available in cart
              </p>
            )}
          </Container>
        </section>
      </>
    );
};
export default YourCard;

export async function getServerSideProps(context) {
  if (process.env.NODE_ENV === "development" || !process.env.NEXT_EXPORT) {
    const session = await getSession(context);
    let id = session?.user?.accessToken?.customer._id;
    var customercart = [];
    var cart_id = "";
    var CartsDataa = {};
    var homepageData = [];
    var currencyStore = [];
    if (session !== null) {
    }
    /* ----------------------- GET USER CART -----------------------------*/

    /* ----------------------- GEt currency -----------------------------*/
    try {
      const { data: homepagedata } = await client.query({
        query: GET_HOMEPAGE_DATA_QUERY,
      });
      homepageData = homepagedata;

      currencyStore = homepagedata?.getSettings?.store;
    } catch (e) {}

    return {
      props: {
        customercart,
        cart_id,
        CartsDataa,
        currencyStore,
        homepageData,
      },
    };
  }
}
