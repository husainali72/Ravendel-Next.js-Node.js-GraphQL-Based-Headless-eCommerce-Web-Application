/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import { OverlayTrigger, Tooltip } from "react-bootstrap";
import Link from "next/link";
import { isDiscount } from "../../utills/helpers";
import StarRating from "../breadcrumb/rating";
import { useRouter } from "next/router";
import { useSelector, useDispatch } from "react-redux";
import { addToCart } from "../../redux/actions/cartAction";
import { useSession } from "next-auth/react";
import calculateDiscount from "../../utills/calculateDiscount";
import { capitalize, get } from "lodash";
import ProductImage from "../imageComponent";
import Price from "../priceWithCurrency";

export const ProductNav = ({ items }) => {
  const dispatch = useDispatch();
  const session = useSession();
  const router = useRouter();
  const addToCartProduct = (product) => {
    let quantity = 1;
    if (session?.status === "authenticated") {
      let token = get(session, "data.user.accessToken.token");
      let id = get(session, "data.user.accessToken.customer._id");
      dispatch(addToCart(product, quantity, token, id));
      router.push("/shopcart");
    } else {
      dispatch(addToCart(product));
      router.push("/shopcart");
    }
  };
  return (
    <div className="on-sale-product">
      {items?.map((product, i) => (
        <div className="on-sale-product-card" key={i}>
          <div className="on-sale-image-wrapper">
            <Link
              href={`/product/[singleproduct]?url=${product?.url}`}
              as={`/product/${product?.url}`}
            >
              <ProductImage
                src={get(product, "feature_image", "")}
                className="img-on-sale"
              />
            </Link>
          </div>
          <div className="on-sale-product-card-body">
            {isDiscount(product) ? (
              <div className="save-price">
                <span className="percantage-save">
                  {calculateDiscount(
                    get(product, "pricing.price", 0),
                    get(product, "pricing.sellprice", 0)
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
            <div className="card-price">
              {product?.name?.length > 18 ? (
                <strong
                  dangerouslySetInnerHTML={{
                    __html: product?.name?.substring(0, 17) + "...",
                  }}
                ></strong>
              ) : (
                product?.name
              )}
            </div>
            <div className="on-sale-product-detail">
              <div className="product-price on-sale-product-alignment">
                <StarRating
                  className="rating"
                  stars={product?.name}
                  singleProducts={product}
                />
                <span>
                  {product?.pricing?.sellprice ? (
                    <strong className="sale-price">
                      <Price price={get(product, "pricing.sellprice", 0)} />
                    </strong>
                  ) : (
                    <strong className="sale-price">
                      <Price price={get(product, "pricing.price", 0)} />
                    </strong>
                  )}
                </span>
                {product.pricing.sellprice ? (
                  <span
                    className={
                      product.pricing.sellprice ? "has-sale-price" : ""
                    }
                  >
                    <Price price={get(product, "pricing.price", 0)} />
                  </span>
                ) : null}
              </div>
              {product?.quantity > 0 ? (
                <OverlayTrigger
                  className="overlay-trigger"
                  placement="top"
                  overlay={
                    <Tooltip
                      className="overlay-trigger-tooltip"
                      id={"tooltip-top"}
                    >
                      add to cart
                    </Tooltip>
                  }
                >
                  <div className="add-to-cart">
                    <a
                      className="cart-icon"
                      onClick={() => addToCartProduct(product)}
                    >
                      <i
                        className="fas fa-shopping-bag font-awesome-icon"
                        aria-hidden="true"
                      ></i>
                    </a>
                  </div>
                </OverlayTrigger>
              ) : (
                <p className="out-of-stock-card">Out Of Stock</p>
              )}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};
export default ProductNav;
