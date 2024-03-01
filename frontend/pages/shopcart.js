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
  removeAllCartItemsAction,
  REMOVE_ALL_VALUE,
  calculateUserCart,
  calculateUnauthenticatedCart,
} from "../redux/actions/cartAction";
import {
  currencySetter,
  formatNumber,
  getPrice,
  logoutAndClearData,
  mutation,
  query,
} from "../utills/helpers";
import {
  DELETE_CART_PRODUCTS,
} from "../queries/cartquery";
import { GET_HOMEPAGE_DATA_QUERY } from "../queries/home";
import client from "../apollo-client";
import { useSession, getSession } from "next-auth/react";
import { getAllProductsAction } from "../redux/actions/productAction";
import { settingActionCreator } from "../redux/actions/settingAction";
import LoadingCartTable from "../components/cardcomponent/LoadingCard";
import { get } from "lodash";
import Loading from "../components/loadingComponent";
import notify from "../utills/notifyToast";
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
  const session = useSession();
  const allProducts = useSelector((state) => state.products);
  const cart = useSelector((state) => state.cart);
  const [cartLoading, setCartLoading] = useState(false);
  const [isQuantityBtnLoading, setIsQuantityBtnLoading] = useState(false);
  const [cartItems, setCartItems] = useState([]);
  const [allCartItems, setAllCartItems] = useState([]);
  const [quantityy, setQuantity] = useState();
  const dispatch = useDispatch();
  const [currency, setCurrency] = useState("$");
  const [decimal, setdecimal] = useState(2);
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
    setIsQuantityBtnLoading(get(cart, "loading"));
  }, [get(cart, "loading")]);

  const getUserCartData = async () => {
    const userSession = await getSession();
    if (session?.status === "authenticated" || userSession !== null) {
      let id = get(userSession, "user.accessToken.customer._id");
      dispatch(calculateUserCart(id));
    }else{
      const localStorageProducts = JSON.parse(localStorage.getItem("cart"));
      dispatch(calculateUnauthenticatedCart(localStorageProducts));
    }
  };
  useEffect(() => {
    const getProducts = async () => {
      const productsCard = JSON.parse(localStorage.getItem("cart"));
      const userSession = await getSession();
        setCartLoading(true);
        let id = get(userSession, "user.accessToken.customer._id");
        let token = get(userSession, "user.accessToken.token");
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
            productQuantity: get(originalProduct, "quantity"),
            name: get(cart, "productTitle"),
            pricing: get(cart, "productPrice"),
            price: get(originalProduct, "pricing.price"),
            short_description: get(originalProduct, "short_description"),
            feature_image: get(cart, "productImage"),
            url: get(originalProduct, "url"),
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
          grandTotal: formatNumber(get(cart, "totalSummary.grandTotal")),
          cartTotal: formatNumber(get(cart, "totalSummary.cartTotal")),
          totalShipping: formatNumber(get(cart, "totalSummary.totalShipping")),
          totalTax: formatNumber(get(cart, "totalSummary.totalTax")),
          mrpTotal: formatNumber(get(cart, "totalSummary.mrpTotal")),
          discountTotal: formatNumber(get(cart, "totalSummary.discountTotal")),
        });
        setCartItems([...cartItemsArray]);
        setAllCartItems([...allItem]);
        setCartLoading(false);
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
      dispatch({
        type: REMOVE_ALL_VALUE,
        payload: [],
      });
    }

    localStorage.setItem("cart", JSON.stringify([]));
  };

  // Function to increase the quantity of a cart item
  const IncreaseQuantity = async (item) => {
    setIsQuantityBtnLoading(true);
    const isQuantityIncreased = allCartItems.some(
      (itemm) =>
      (( itemm._id === item._id && itemm.variantId === item.variantId)||( itemm._id === item._id && !itemm.variantId === item.variantId))&&
        item?.productQuantity >= itemm.quantity + 1
    );
    if (isQuantityIncreased) {
    
    setAllCartItems(
      [...allCartItems],
      allCartItems.filter((itemm) =>
       (( itemm._id === item._id && itemm.variantId === item.variantId)||( itemm._id === item._id && !itemm.variantId === item.variantId))
          ? item?.productQuantity >= itemm.quantity + 1 && (itemm.quantity += 1)
          : itemm.quantity
      )
    );
    if (session?.status !== "authenticated") {

      dispatch(increaseQuantity(item._id, item.productQuantity, item.variantId) );
      dispatch(calculateUnauthenticatedCart(allCartItems))
    
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
              dispatch(calculateUserCart(id));
            }
            setIsQuantityBtnLoading(false);
          })
          .catch((error) => {
            setIsQuantityBtnLoading(false);
          });
      }
    }
  }else{
    notify(`Only ${item.productQuantity} unit(s) available in stock`, false);
    setIsQuantityBtnLoading(false);
  }
  };
  
  // Function to decrease the quantity of a cart item
  const DecreaseQuantity = (item) => {
    // Check if the quantity is greater than 1 before attempting to decrease
    if (item.quantity > 1) {
      setIsQuantityBtnLoading(true);
       // Update the local state with the decreased quantity
      setAllCartItems(
        [...allCartItems],
        allCartItems.filter((itemm) =>
        (( itemm._id === item._id && itemm.variantId === item.variantId)||( itemm._id === item._id && !itemm.variantId === item.variantId))
            ? itemm.quantity - 1 >= 1 && (itemm.quantity -= 1)
            : itemm.quantity
        )
      );
      setQuantity(item.quantity);
      if (session?.status !== "authenticated") {
         // Dispatch decreaseQuantity action for unauthenticated user
        let variables = {
          _id: item._id,
          variantId: get(item,'variantId',''),
        };
        setIsQuantityBtnLoading(false)
        dispatch(decreaseQuantity(variables));
        dispatch(calculateUnauthenticatedCart(allCartItems))
      } else {
        const selectedProduct = cartItems.find(
          (cart) => cart._id === item._id && cart.variantId === item.variantId
        );
        const qty = selectedProduct?.quantity;
        if (session?.status === "authenticated") {
          let id = get(session, "data.user.accessToken.customer._id");
          let variables = {
            userId: id,
            productId: get(item, "_id",''),
            qty: qty,
          };
          dispatch(changeQty(variables))
            .then((res) => {
              if (get(res, "data.changeQty.success")) {
                dispatch(calculateUserCart(id));
              }
              setIsQuantityBtnLoading(false);
            })
            .catch((err) => {
              setIsQuantityBtnLoading(false);             
            });
        }
      }
    } else {
      setIsQuantityBtnLoading(false);
    }
  };
  // Function to remove an item from the cart
  const removeToCart = async (item) => {
    let product = get(item,'_id','');
    if (session?.status === "authenticated") {
      let id = get(session, "data.user.accessToken.customer._id");
      let variables = {
        userId: id,
        productId: item._id,
        variantId: get(item,'variantId',''),
      };

      mutation(DELETE_CART_PRODUCTS, variables).then(
        (res) => {
       
          if (get(res, "data.deleteCartProduct.success")) {
            dispatch(calculateUserCart(id));
          }
        }
      ).catch((error)=>{
        if(get(error,'extensions.code')===401){
          logoutAndClearData(dispatch)
        }
      })
    } else {
      let cartItemsfilter = cartItems.filter(
        (itemm) =>
          itemm._id !== product ||
          (itemm._id === product && itemm.variantId !== item.variantId)
      );
      let variables = {
        id: product,
        variantId: get(item,'variantId',''),
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
                    totalSummary={totalSummary}
                  />
                </div>
              </div>
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
