import { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/router";
import Link from "next/link";
import { Container, OverlayTrigger, Tooltip, Button } from "react-bootstrap";
import StarRating from "../breadcrumb/rating";
import {
  currencySetter,
  getImage,
  mutation,
  getPrice,
  isDiscount,
} from "../../utills/helpers";
import { useSelector, useDispatch } from "react-redux";
import { addToCart } from "../../redux/actions/cartAction";
import { useSession } from "next-auth/react";
import {
  ADD_TO_CART_QUERY,
  GET_USER_CART,
  UPDATE_CART_PRODUCT,
} from "../../queries/cartquery";
import calculateDiscount from "../../utills/calculateDiscount";
import { query } from "../../utills/helpers";
import NoImagePlaceholder from "../images/NoImagePlaceHolder.png";
import { capitalize, get } from "lodash";
import Image from "next/image";
var placeholder = "https://dummyimage.com/300";
const OnSaleProductCard = ({
  homepageData,
  onSaleProduct,
  hidetitle,
  titleShow,
  currencyProp,
  currencyOpt,
}) => {
  var id = "";
  var token = "";
  const imageType = homepageData?.getSettings?.imageStorage?.status;
  const dispatch = useDispatch();
  const router = useRouter();
  const session = useSession();
  const [currency, setCurrency] = useState("$");
  const [decimal, setdecimal] = useState(2);
  const settings = useSelector((state) => state.setting);
  useEffect(() => {
    currencySetter(settings, setCurrency);
    setdecimal(settings?.currencyOption?.number_of_decimals);
    if (currencyProp) {
      setCurrency(currencyProp);
    }
  }, [settings?.currencyOption, currencyProp]);

  useEffect(() => {
    if (currencyOpt) {
      currencySetter(currencyOpt?.currency_options?.currency, setCurrency);
      setdecimal(currencyOpt?.currency_options?.number_of_decimals);
    }
  }, [currencyOpt]);

  if (session.status === "authenticated") {
    id = get(session, "data.user.accessToken.customer._id");
    token = get(session, "data.user.accessToken.token");
  }
  const ProductAdd = async (e, product) => {
    e.stopPropagation();
    let quantity = 1;
    let href = "/shopcart";
    if (session.status === "authenticated") {
      let productInCart = false;
      query(GET_USER_CART, id, token).then((res) => {
        let cart_id = res?.data?.cartbyUser?.id;
        const inCartProducts = res?.data?.cartbyUser?.products;
        inCartProducts.map((inCartProduct) => {
          const productt = inCartProduct;
          if (productt.productId === product?._id) {
            let qant = product.qty + quantity;
            productInCart = true;
            var Cartt = inCartProducts.map((producttt) => {
              if (producttt.productId === product._id) {
                return {
                  productId: producttt?.productId,
                  qty: producttt.qty + quantity,
                  productTitle: producttt.productTitle,
                  productImage: producttt.productImage,
                  productPrice: producttt.productPrice,
                  shippingClass: product?.shipping?.shippingClass,
                  taxClass: product?.taxClass,
                };
              } else {
                return {
                  productId: producttt?.productId,
                  qty: producttt.qty,
                  productTitle: producttt.productTitle,
                  productImage: producttt.productImage,
                  productPrice: producttt.productPrice,
                  shippingClass: product?.shipping?.shippingClass,
                  taxClass: product?.taxClass,
                };
              }
            });
            let variables = {
              id: cart_id,
              products: Cartt,
              total: 0,
            };
            mutation(UPDATE_CART_PRODUCT, variables, dispatch).then((res) => {
              router.push("/shopcart");
            });
          }
        });

        if (!productInCart) {
          let variables = {
            total: product?.pricing.sellprice * quantity,
            userId: id,
            productId: product?._id,
            qty: quantity,
            productTitle: product?.name,
            productImage: product?.feature_image?.original,
            productPrice: product?.pricing.sellprice,
            shippingClass: product?.shipping?.shippingClass,
            taxClass: product?.taxClass,
          };
          mutation(ADD_TO_CART_QUERY, variables, dispatch).then((res) => {
            router.push("/shopcart");
            dispatch(addToCart(product));
          });
        }
      });
    } else {
      dispatch(addToCart(product));
      router.push("/shopcart");
    }
  };

  return (
    <section className="product-cart-section">
      <Container style={{ padding: "0" }}>
        {!hidetitle ? (
          <div>
            <h4 className="theme-color my-2">
              {titleShow ? capitalize(titleShow) : "On Sale"}{" "}
              <span className="text-black">Products</span>
            </h4>
          </div>
        ) : null}
        <div>
          <div className="on-sale-product">
            {onSaleProduct && onSaleProduct?.length > 0 ? (
              <>
                {onSaleProduct.map((product, i) => {
                  return (
                    <Link
                      href={`/product/[singleproduct]?url=${product.url}`}
                      as={`/product/${product.url}`}
                    >
                      <div className="on-sale-product-card" key={i}>
                        <div className="on-sale-image-wrapper">
                          <img
                            className="img-on-sale"
                            src={getImage(product.feature_image, imageType)}
                            onError={(e) => {
                              e.type === "error"
                                ? (e.target.src = NoImagePlaceholder.src)
                                : null;
                            }}
                            height="280px"
                            width="100%"
                          />
                        </div>
                        <div className="on-sale-product-card-body">
                          {isDiscount(product) ? (
                            <div className="save-price">
                              <span className="percantage-save">
                                {calculateDiscount(
                                  product?.pricing?.price,
                                  product?.pricing?.sellprice
                                )}
                              </span>
                            </div>
                          ) : null}
                          <div className="product-categoryname">
                            {product?.categoryId?.map((item, i) => (
                              <span key={i}>
                                {product?.categoryId?.length - 1 === i ? (
                                  <span>{capitalize(item?.name)} </span>
                                ) : (
                                  <span>{capitalize(item?.name)}, </span>
                                )}
                              </span>
                            ))}
                          </div>
                          <div
                            className="card-price"
                            style={{ cursor: "pointer" }}
                          >
                            {product.name?.length > 18 ? (
                              <strong
                                dangerouslySetInnerHTML={{
                                  __html: product.name.substring(0, 17) + "...",
                                }}
                              ></strong>
                            ) : (
                              product.name
                            )}
                          </div>
                          <div className="on-sale-product-detail">
                            <div
                              className="product-price"
                              style={{
                                justifyContent: "left",
                                alignContent: "left",
                                m: 0,
                              }}
                            >
                              <StarRating
                                className="rating"
                                stars={product?.rating}
                                singleproducts={product}
                              />
                              <span>
                                {product.pricing.sellprice ? (
                                  <strong className="sale-price">
                                    {currency}{" "}
                                    {getPrice(
                                      product?.pricing?.sellprice,
                                      decimal
                                    )}
                                  </strong>
                                ) : (
                                  <strong className="sale-price">
                                    {currency}{" "}
                                    {getPrice(product?.pricing.price, decimal)}
                                  </strong>
                                )}
                              </span>
                              {product?.pricing.sellprice &&
                              product?.pricing.sellprice <
                                product?.pricing.price ? (
                                <span
                                  className={
                                    product?.pricing.sellprice
                                      ? "has-sale-price"
                                      : ""
                                  }
                                >
                                  {currency}{" "}
                                  {getPrice(product?.pricing?.price, decimal)}
                                </span>
                              ) : null}
                            </div>

                            {product?.quantity > 0 ? (
                              <OverlayTrigger
                                style={{ backgroundColor: "#088178" }}
                                placement="top"
                                overlay={
                                  <Tooltip
                                    style={{ color: "#088178" }}
                                    id={"tooltip-top"}
                                  >
                                    add to cart
                                  </Tooltip>
                                }
                              >
                                <Link
                                  href={`/product/[singleproduct]?url=${product.url}`}
                                  as={`/product/${product.url}`}
                                >
                                  <div className="add-to-cart">
                                    {" "}
                                    <a className="cart-icon">
                                      <i
                                        className="fas fa-shopping-bag font-awesome-icon"
                                        aria-hidden="true"
                                      ></i>
                                    </a>
                                  </div>
                                </Link>
                              </OverlayTrigger>
                            ) : (
                              <p className="out-of-stock-card">Out Of Stock</p>
                            )}
                          </div>
                        </div>
                      </div>
                    </Link>
                  );
                })}
              </>
            ) : (
              <div style={{ padding: "50px" }}>
                <p
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  No Data Found
                </p>
              </div>
            )}
          </div>
        </div>
      </Container>
    </section>
  );
};
export default OnSaleProductCard;
