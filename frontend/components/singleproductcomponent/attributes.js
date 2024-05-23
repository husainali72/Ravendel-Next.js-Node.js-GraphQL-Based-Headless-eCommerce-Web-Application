import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { get } from "lodash";
import { useRouter } from "next/router";
import TabBtn from "../TabBtn";

const AttributeSelector = ({
  attributes,
  variations,
  getSelectedAttributes,
}) => {
  const router = useRouter();
  const [selectedAttributes, setSelectedAttributes] = useState([]);
  const [comboData, setComboData] = useState([]);
  const [attributesData, setAttributesData] = useState([]);
  useEffect(() => {
    const { singleproduct } = router.query;
    const productVariant = variations?.find(
      (variation) => variation?.productUrl === singleproduct
    );
    if (productVariant) {
      console.log()
      let updatedAttributes = selectedAttributes;
      let updatedData = attributes;
      productVariant.combinations.forEach((combination) => {
        const { attributeValueId, attributeId } = combination;
        updatedAttributes = updatedAttributes?.map((attr) =>
          attr.attributeId === attributeId
            ? { ...attr, attributeValueId }
            : attr
        );
        const isAttributeExisting = updatedAttributes.some(
          (attr) => attr.attributeId === attributeId
        );

        if (!isAttributeExisting) {
          updatedAttributes.push({ attributeId, attributeValueId });
        }
        updatedData = updatedData?.map((attr) => {
          if (attr?._id === attributeId) {
            return { ...attr, selectValue: attributeValueId };
          } else return attr;
        });
      });
      setSelectedAttributes(updatedAttributes);
      prepareVariant(updatedAttributes);
      setAttributesData(updatedData);
      getSelectedAttributes(updatedAttributes);
    } else {
      const modifiedData = attributes?.map((item) => ({
        ...item,
        values: item.values.map((value) => ({
          ...value,
          select: false,
        })),
      }));
      setAttributesData(modifiedData || []);
    }
  }, [router.query.singleproduct, variations]);

  const prepareVariant = (data) => {
    let variantProduct = variations;
    data.map((item) => {
      variantProduct = variantProduct?.filter((comb) => {
        return comb.combinations.some(
          (combination) =>
            combination.attributeId === item?.attributeId &&
            combination.attributeValueId === item?.attributeValueId
        );
      });
    });
    setComboData([...variantProduct]);

    // setItemInCart(false);
    return variantProduct;
  };
  const prepareData = (e, attributeId) => {
    const attributeValueId = e;
    const updatedAttributes = selectedAttributes.map((attr) =>
      attr.attributeId === attributeId ? { ...attr, attributeValueId } : attr
    );
    const isAttributeExisting = updatedAttributes.some(
      (attr) => attr.attributeId === attributeId
    );

    if (!isAttributeExisting) {
      updatedAttributes.push({ attributeId, attributeValueId });
    }
    let updatedData = attributesData;
    updatedData = updatedData?.map((attr) => {
      if (attr?._id === attributeId) {
        return { ...attr, selectValue: attributeValueId };
      } else return attr;
    });
    setAttributesData(updatedData);
    setSelectedAttributes(updatedAttributes);
    prepareVariant(updatedAttributes);
    getSelectedAttributes(updatedAttributes);
  };

  useEffect(() => {
    const { singleproduct } = router.query;
    console.log(comboData,'comboData')
    let productUrl = get(comboData, "[0].productUrl", "");
    const hasAttributesMismatch =
      attributes?.length > 0 &&
      selectedAttributes?.length !== attributes?.length;
    if (
      !hasAttributesMismatch &&
      comboData?.length === 1 &&
      productUrl &&
      productUrl !== singleproduct
    ) {
      router.push(productUrl);
    } 
  }, [comboData]);

  const createAttributeOptions = (singleAttribute) => {
    return get(singleAttribute, "values", [])?.map((item) => ({
      value: item._id,
      label: item.name,
    }));
  };


  return (
    <>
      {attributesData?.map((singleAttribute) => {
        return (
          <>
            <TabBtn
              label={get(singleAttribute, "name", "")}
              values={get(singleAttribute, "selectValue")}
              onChange={(e) => prepareData(e, get(singleAttribute, "_id", ""))}
              options={createAttributeOptions(singleAttribute)}
            />
          </>
        );
      })}
    </>
  );
};

AttributeSelector.propTypes = {
  attributes: PropTypes.array,
  variations: PropTypes.array,
  getSelectedAttributes: PropTypes.func,
};

export default AttributeSelector;
