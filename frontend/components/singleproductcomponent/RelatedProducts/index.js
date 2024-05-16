import { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { ADDITIONA_DETAIL } from "../../../queries/productquery";
import { get } from "lodash";
import { queryWithoutToken } from "../../../utills/helpers";
import OnSaleProductCard from "../../category/onSaleProductCard";
const AddionalDetail = ({ singleProduct }) => {
  const [additionalDetails, setAdditionalDetails] = useState([]);
  const getAdditionalProduct = async () => {
    try {
      const { data: additionalDetail } = await queryWithoutToken(
        ADDITIONA_DETAIL,
        { productId: get(singleProduct, "_id", "") }
      );

      setAdditionalDetails(get(additionalDetail, "additionalDetails", []));
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getAdditionalProduct();
  }, [singleProduct]);
  return (
    <>
      {additionalDetails?.map((additionalDetail) => {
        return (
          <>
            <div className="related-products-slider">
              {
                get(additionalDetail, "products") && get(additionalDetail, "products")?.length > 0 &&
                <>
                  <h5>{get(additionalDetail, "title")}</h5>
                  <OnSaleProductCard
                    onSaleProduct={get(additionalDetail, "products", [])}
                    hideTitle
                    showcaseType='slider'
                  />
                </>
              }
            </div>
          </>
        );
      })}
    </>
  );
};
AddionalDetail.propTypes = {
  singleProduct: PropTypes.object,
};
export default AddionalDetail;
