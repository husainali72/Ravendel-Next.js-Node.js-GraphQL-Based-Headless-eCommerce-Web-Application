import { useState, useEffect, useRef } from "react";
import { Container } from "react-bootstrap";
import BreadCrumb from "../components/breadcrumb/breadcrumb";
import { useSelector, useDispatch } from "react-redux";
import CartTable from "../components/cardcomponent/CardDetail";
import {
  removeCartItemAction,
  RemoveAllCartItemsAction,
  increaseQuantity,
  decreaseQuantity,
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
  GET_USER_CART,
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
const CalculateProductTotal = (product) =>
  product.reduce(
    (total, product) =>
      total +
      (product.pricing * product.quantity ||
        product.pricing * product.quantity),
    0
  );
const cartitems2 = [];
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
  const [AllCartItems, setAllCartItems] = useState([]);
  const [quantityy, setQuantity] = useState();
  const dispatch = useDispatch();
  const [couponCode, setCouponCode] = useState("");
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
  useEffect(() => {
    dispatch(getAllProductsAction());
  }, []);
  useEffect(() => {
    const getProducts = async () => {
      const productsCard = JSON.parse(localStorage.getItem("cart"));
      setCartLoading(true);
      const userSession = await getSession();
      if (session?.status === "authenticated" || userSession !== null) {
        id = get(userSession, "user.accessToken.customer._id");
        token = get(userSession, "user.accessToken.token");
        let variables = { id: id };
        mutation(GET_USER_CART, variables)
          .then((res) => {
            let carts = get(res, "data.cartbyUser");
            let cartItemsArray = [];
            let allItem = [];
            let unAvailableItems = [];
            get(carts, "cartItems", [])?.map((cart) => {
              let cartProduct = {
                _id: get(cart, "productId", ""),
                variantId: get(cart, "variantId", ""),
                quantity: parseInt(get(cart, "qty")),
                productQuantity: get(cart, "productQuantity"),
                name: get(cart, "productTitle"),
                pricing: get(cart, "productPrice"),
                feature_image: get(cart, "productImage"),
                url: get(cart, "url"),
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
            const { grandTotal, cartTotal, totalShipping, totalTax } = get(
              carts,
              "totalSummary"
            );
            setTotalSummary({
              ...totalSummary,
              grandTotal: formatNumber(grandTotal),
              cartTotal: formatNumber(cartTotal),
              totalShipping: formatNumber(totalShipping),
              totalTax: formatNumber(totalTax),
            });
            setCartItems([...cartItemsArray]);
            setAllCartItems([...allItem]);
            setUnAvailableProduct([...unAvailableItems]);
          })
          .finally(() => {
            allProducts?.products.length > 0 &&
              cartItems.length >= 0 &&
              setCartLoading(false);
          });
      } else {
        setCartItems(productsCard || []);
        setAllCartItems(productsCard || []);
        setCartLoading(false);
      }
    };
    getProducts();
  }, [allProducts, cart]);
  const handlePayment = async () => {
    if (session?.status !== "authenticated") {
      router.push("/account");
    } else if (session?.status === "authenticated") {
      const response = await fetch("/api/stripe", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(cartItems),
      });
      const data = await response.json();
      if (response.statusCode === 500) return;
    }
  };

  const AllCartItemsClear = async () => {
    setCartItems([]);
    setAllCartItems([]);
    if (session.status === "authenticated") {
      let id = session.data.user.accessToken.customer._id;
      let token = session.data.user.accessToken.token;

      query(GET_USER_CART, id, token).then((res) => {
        cart_id = res.data.cartbyUser.id;
        let variables = {
          id: cart_id,
          products: [],
          total: 0,
        };
        mutation(UPDATE_CART_PRODUCT, variables, token).then((res) =>
          dispatch(RemoveAllCartItemsAction([]))
        );
      });
    } else {
      dispatch(RemoveAllCartItemsAction([]));
    }

    localStorage.setItem("cart", JSON.stringify([]));
  };
  const fetchUpdatedCart = async () => {
    const userSession = await getSession();
    if (session?.status === "authenticated" || userSession !== null) {
      id = get(userSession, "user.accessToken.customer._id");
      token = get(userSession, "user.accessToken.token");
      let variables = { id: id };
      mutation(GET_USER_CART, variables)
        .then((res) => {
          let carts = get(res, "data.cartbyUser");
          const { grandTotal, cartTotal, totalShipping, totalTax } = get(
            carts,
            "totalSummary"
          );
          setTotalSummary({
            ...totalSummary,
            grandTotal: formatNumber(grandTotal),
            cartTotal: formatNumber(cartTotal),
            totalShipping: formatNumber(totalShipping),
            totalTax: formatNumber(totalTax),
          });
          setCartTotalLoading(false);
        })
        .catch((error) => {
          setCartTotalLoading(false);
        });
    }
  };
  const IncreaseQuantity = async (item) => {
    setCartTotalLoading(true);
    setAllCartItems(
      [...AllCartItems],
      AllCartItems.filter((itemm) =>
        itemm._id === item._id && itemm.variantId === item.variantId
          ? item?.productQuantity >= itemm.quantity + 1 && (itemm.quantity += 1)
          : itemm.quantity
      )
    );
    if (session?.status !== "authenticated") {
      dispatch(
        increaseQuantity(item._id, item.productQuantity, item.variantId)
      );
    } else {
      const selectedProduct = cartItems.find(
        (cart) => cart._id === item._id && cart.variantId === item.variantId
      );
      const qty = selectedProduct.quantity;
      if (session?.status === "authenticated") {
        let id = get(session, "data.user.accessToken.customer._id");
        let token = get(session, "data.user.accessToken.token");
        query(GET_USER_CART, id, token)
          .then((res) => {
            cart_id = get(res, "data.cartbyUser.id");
            const clonedCartItems = [...AllCartItems];

            const updatedCart = clonedCartItems?.map((product) => {
              let singleProduct = {
                productId: get(product, "_id"),
                qty: qty,
                productTitle: get(product, "name"),
                productImage: get(product, "feature_image"),
                productPrice: get(product, "pricing")?.toString(),
                attributes: get(product, "attributes"),
                variantId: get(product, "variantId"),
                productQuantity: get(product, "productQuantity"),
                shippingClass: get(product, "shippingClass"),
                taxClass: get(product, "taxClass"),
              };
              if (
                product?._id === item?._id &&
                product?.variantId === item?.variantId
              ) {
                return {
                  ...singleProduct,
                  qty: qty,
                };
              } else {
                return {
                  ...singleProduct,
                  qty: product.quantity,
                };
              }
            });
            let variables = {
              id: cart_id,
              products: updatedCart,
              total: 0,
            };
            mutation(UPDATE_CART_PRODUCT, variables, token).then((res) => {
              fetchUpdatedCart();
            });
          })
          .finally(() => setIsQuantityBtnLoading(false));
      }
    }
  };
  const DecreaseQuantity = (item) => {
    setCartTotalLoading(true);
    if (item.quantity > 1) {
      setIsQuantityBtnLoading(true);
      setAllCartItems(
        [...AllCartItems],
        AllCartItems.filter((itemm) =>
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
          let token = get(session, "data.user.accessToken.token");
          query(GET_USER_CART, id, token)
            .then((res) => {
              cart_id = get(res, "data.cartbyUser.id");
              const clonedCartItems = [...AllCartItems];
              const updatedCart = clonedCartItems?.map((product) => {
                let singleProduct = {
                  productId: get(product, "_id"),
                  qty: qty,
                  productTitle: get(product, "name"),
                  productImage: get(product, "feature_image"),
                  productPrice: get(product, "pricing")?.toString(),
                  attributes: get(product, "attributes"),
                  variantId: get(product, "variantId"),
                  productQuantity: get(product, "productQuantity"),
                  shippingClass: get(product, "shippingClass"),
                  taxClass: get(product, "taxClass"),
                };
                if (
                  product._id === item._id &&
                  product.variantId === item.variantId
                ) {
                  return {
                    ...singleProduct,
                    qty: qty,
                  };
                } else {
                  return {
                    ...singleProduct,
                    qty: product.quantity,
                  };
                }
              });
              let variables = {
                id: cart_id,
                products: updatedCart,
                total: 0,
              };
 
              mutation(UPDATE_CART_PRODUCT, variables, token).then((res) => {
               
                fetchUpdatedCart();
                let variables = {
                  _id: item._id,
                  variantId: item.variantId,
                };
              });
            })
            .finally(() =>{
            setIsQuantityBtnLoading(false)});
        }
      }
      }else{
        setCartTotalLoading(false);
      }
  };

  const removeToCart = async (item) => {
    let product = item?._id;
    if (session?.status === "authenticated") {
      let id = session.data.user.accessToken.customer._id;
      let token = session.data.user.accessToken.token;

      query(GET_USER_CART, id, token).then((res) => {
        cart_id = res.data.cartbyUser.id;

        let variables = {
          id: cart_id,
          productId: item._id,
          variantId: item.variantId,
        };

        mutation(DELETE_CART_PRODUCTS, variables, token).then((res) =>
          dispatch(removeCartItemAction(variables))
        );
      });
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

  const updateCartProduct = () => {
    const productsCard = JSON.parse(localStorage.getItem("persistantState"));
    var id = "";
    var token = "";
    if (session.status === "authenticated") {
      id = get(session, "data.user.accessToken.customer._id");
      token = get(session, "data.user.accessToken.token");
    }
    let carts = productsCard.cart.map((product) => {
      return {
        productId: get(product, "_id", ""),
        qty: get(product, "quantity", 0),
        productTitle: get(product, "name", ""),
        productImage: get(product, "feature_image", ""),
        productPrice: get(
          product,
          "pricing.sellprice",
          get(product, "pricing.price", "")
        )?.toString(),
      };
    });
    let variables = {
      id: cart_id,
      products: carts,
    };

    mutation(UPDATE_CART_PRODUCT, variables, token).then((res) => {});
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
                    updateCartProduct={updateCartProduct}
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
                        updateCartProduct={updateCartProduct}
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
                  updateCartProduct={updateCartProduct}
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
