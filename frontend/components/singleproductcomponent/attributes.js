/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { capitalize, get } from "lodash";
import RadioButton from "../radioButton";
import { useRouter } from "next/router";

const AttributeSelector = ({
  attributes,
  variations,
  error,
  getSelectedAttributes
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
      let updatedAttributes = selectedAttributes;
      let updatedData = attributes;
      console.log(productVariant,'productVariant')
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
          console.log(attr,attributeId)
          if (attr?._id === attributeId) {
            return { ...attr, selectValue: attributeValueId };
          } else return attr;
        });
      });
      setSelectedAttributes(updatedAttributes);
      prepareVariant(updatedAttributes);
      setAttributesData(updatedData);
      getSelectedAttributes(updatedAttributes)
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
    console.log(e, attributeId, "=======");
    const updatedAttributes = selectedAttributes.map((attr) =>
      attr.attributeId === attributeId ? { ...attr, attributeValueId } : attr
    );
    const isAttributeExisting = updatedAttributes.some(
      (attr) => attr.attributeId === attributeId
    );

    if (!isAttributeExisting) {
      updatedAttributes.push({ attributeId, attributeValueId });
    }
    let  updatedData = attributesData
    updatedData = updatedData?.map((attr) => {
      if (attr?._id === attributeId) {
        return { ...attr, selectValue: attributeValueId };
      } else return attr;
    });
    setAttributesData(updatedData);
    setSelectedAttributes(updatedAttributes);
    prepareVariant(updatedAttributes);
    getSelectedAttributes(updatedAttributes)
  };

  useEffect(() => {
    const { singleproduct } = router.query;
    let productUrl = get(comboData, "[0].productUrl", "#");
    const hasAttributesMismatch =
      attributes?.length > 0 &&
      selectedAttributes?.length !== attributes?.length;
    if (
      !hasAttributesMismatch &&
      comboData?.length === 1 &&
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
  const checkVariantIsSelected = (singleAttribute) => {
    // const attributeName = get(singleAttribute, "name", "");
    // const isAttributeSelected = selectedAttributes?.some(
    //   ({ name }) => name === singleAttribute?.id
    // );
    // if (error && !isAttributeSelected) {
    //   return `Please select the ${capitalize(attributeName)}`;
    // }
    // return null;
  };
  return (
    <>
      {attributesData?.map((singleAttribute) => {
        return (
          <>
            <RadioButton
              label={get(singleAttribute, "name", "")}
              values={get(singleAttribute, "selectValue")}
              onChange={(e) => prepareData(e, get(singleAttribute, "_id", ""))}
              options={createAttributeOptions(singleAttribute)}
              error={checkVariantIsSelected(singleAttribute)}
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
  error: PropTypes.boolean,
  getSelectedAttributes: PropTypes.func,
};

export default AttributeSelector;
