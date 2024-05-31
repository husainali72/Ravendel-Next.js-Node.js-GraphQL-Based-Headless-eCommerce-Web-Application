import { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { ADDITIONA_DETAIL } from "../../../queries/productquery";
import { get } from "lodash";
import { queryWithoutToken } from "../../../utills/helpers";
import AddionalProductDetail from "../../additionalProductDetail";
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
      {additionalDetails?.map((additionalDetail, index) => {
        return (
          <>
            <AddionalProductDetail
              key={index}
              additionalDetail={additionalDetail}
            />
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
