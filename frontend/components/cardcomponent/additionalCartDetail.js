import { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { get } from "lodash";
import { queryWithoutToken } from "../../utills/helpers";
import {
  CART_ADDITIONAL_DETAIL,
  MOST_BOUGHT_PRODUCTS,
} from "../../queries/cartquery";
import AddionalProductDetail from "../additionalProductDetail";
const AdditionalCartDetail = ({ cartItems }) => {
  const [additionalDetails, setAdditionalDetails] = useState([]);
  const [mostBoughtProducts, setMostBoughtProducts] = useState([]);
  const getAdditionalProduct = async () => {
    const productIds = getProductIdsFromCartItems();
    if (productIds && productIds?.length > 0) {
      try {
        const { data: additionalDetail } = await queryWithoutToken(
          CART_ADDITIONAL_DETAIL,
          { productIds: productIds }
        );

        setAdditionalDetails(
          get(additionalDetail, "cartAdditionalDetails", [])
        );
      } catch (error) {
        console.log(error);
      }
    }
  };

  const getMostBoughtProduct = async () => {
    try {
      const { data: mostBoughtProductsDetail } = await queryWithoutToken(
        MOST_BOUGHT_PRODUCTS
      );

      setMostBoughtProducts(
        get(mostBoughtProductsDetail, "mostBoughtProducts", [])
      );
    } catch (error) {
      setMostBoughtProducts([]);
      console.log(error);
    }
  };

  useEffect(() => {
    if (cartItems?.length > 0) {
      getAdditionalProduct();
    }
    getMostBoughtProduct();
  }, [cartItems]);

  const getProductIdsFromCartItems = () => {
    return cartItems?.map((cartItem) => cartItem?._id)?.filter(Boolean) || [];
  };
  return (
    <>
      {additionalDetails?.map((additionalDetail, index) => (
        <AddionalProductDetail
          key={index}
          additionalDetail={additionalDetail}
        />
      ))}

      <AddionalProductDetail additionalDetail={mostBoughtProducts || []} />
    </>
  );
};
AdditionalCartDetail.propTypes = {
  cartItems: PropTypes.array,
};
export default AdditionalCartDetail;
