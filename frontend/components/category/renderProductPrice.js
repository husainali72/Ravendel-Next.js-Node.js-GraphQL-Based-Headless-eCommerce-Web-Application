import { get } from "lodash";
import Price from "../priceWithCurrency";
import { isDiscount, isVariantDiscount } from "../../utills/helpers";
import calculateDiscount from "../../utills/calculateDiscount";

const RenderProductPrice = ({
  comboData,
  singleproducts,
  sellpriceRange,
  priceRange,
  variantSelect,
}) => {
  const RenderSalePrice = () => {
    const sellPrice = get(singleproducts, "pricing.sellprice", 0);
    const price = get(singleproducts, "pricing.price", 0);
    const variantSellPrice = get(comboData, "[0].pricing.sellprice", 0);
    const variantPrice = get(comboData, "[0].pricing.price", 0);

    if (comboData && comboData.length > 1 && sellpriceRange) {
      return (
        <>
          <Price price={Math.min(...sellpriceRange)} />
          {" - "}
          <Price price={Math.max(...sellpriceRange)} />
        </>
      );
    } else if (comboData && comboData.length === 1) {
      return <Price price={variantSellPrice || variantPrice} />;
    } else if (variantSelect) {
      return null;
    } else {
      return <Price price={sellPrice} />;
    }
  };

  const RenderPrice = () => {
    const sellPrice = get(singleproducts, "pricing.sellprice", 0);
    const price = get(singleproducts, "pricing.price", 0);
    const variantSellPrice = get(comboData, "[0].pricing.sellprice", 0);
    const variantPrice = get(comboData, "[0].pricing.price", 0);

    if (comboData && comboData.length > 1 && priceRange) {
      return (
        <>
          <Price price={Math.min(...priceRange)} />
          {" - "}
          <Price price={Math.max(...priceRange)} />
        </>
      );
    } else if (comboData && comboData.length === 1 && variantSellPrice) {
      return <Price price={variantPrice} />;
    } else if (variantSelect) {
      return null;
    } else if (sellPrice) {
      return <Price price={price} />;
    }
  };

  const RenderDiscount = ({ singleproducts }) => {
    let salePrice = get(singleproducts, "pricing.sellprice", 0);
    let price = get(singleproducts, "pricing.price", 0);
    let variantSalePrice = get(comboData, "[0].pricing.sellprice", 0);
    let variantPrice = get(comboData, "[0].pricing.price", 0);
    if (comboData && comboData.length > 1) {
      return null;
    } else {
      return (
        <span className=" mx-2">
          {!comboData?.length && !variantSelect
            ? isDiscount(singleproducts) &&
              calculateDiscount(price, salePrice) !== 0
              ? calculateDiscount(price, salePrice)
              : null
            : comboData && comboData?.length > 1
            ? null
            : isVariantDiscount(comboData) &&
              calculateDiscount(variantPrice, variantSalePrice) !== 0
            ? calculateDiscount(variantPrice, variantSalePrice)
            : null}
        </span>
      );
    }
  };

  const isSellPriceLessThanPrice = (singleproducts) => {
    const sellPrice = get(singleproducts, "pricing.sellprice");
    const price = get(singleproducts, "pricing.price");
    return sellPrice && sellPrice < price;
  };
  const sellPrice = get(singleproducts, "pricing.sellprice");
  const regularPrice = get(singleproducts, "pricing.price", 0);
  return (
    <>
      <div className="clearfix product-price-cover">
        {(comboData && comboData?.length) || !variantSelect ? (
          <div className="product-price primary-color float-left">
            <strong className="sale-price sale-price-font">
              {sellPrice ? <RenderSalePrice /> : <Price price={regularPrice} />}
            </strong>
            {isSellPriceLessThanPrice(singleproducts) ? (
              <span
                className={
                  sellPrice ? "has-sale-price mx-2 discount-price-font" : ""
                }
              >
                <RenderPrice />
              </span>
            ) : null}
            <RenderDiscount singleproducts={singleproducts} />
          </div>
        ) : (
          <h6 className="product-not-available">
            Sorry, this combination is not available. Choose another variant.
          </h6>
        )}
      </div>
    </>
  );
};
export default RenderProductPrice;
