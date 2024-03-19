/* eslint-disable no-empty */
import { capitalize, get } from "lodash";
import React, { useEffect, useState } from "react";
import { Container } from "react-bootstrap";
import client from "../apollo-client";
import { GET_CATEGORIES_QUERY } from "../queries/home";
import { GET_FILTEREDPRODUCTS } from "../queries/shopquery";
import OnSaleProductCard from "./category/onSaleProductCard";
import PropTypes from "prop-types";
const SpecificProducts = ({ section }) => {
  const [products, setProducts] = useState([]);
  const [category, setCategory] = useState({});
  let filter = {
    category: section?.category,
    brand: "",
    mostReviewed: false,
    product_type: "",
    rating: {
      min: 0,
      max: 5,
    },
    price: {
      min: 1,
      max: 100000,
    },
    search: "",
  };

  const getProducts = async () => {
    try {
      const { data: fillterPrroducts } = await client.query({
        query: GET_FILTEREDPRODUCTS,
        variables: { filter },
      });
      let fillterProduct = fillterPrroducts?.filteredProducts;
      if (0 < fillterProduct?.length) {
        fillterProduct.map((product) => {
          const {
            brand,
            categoryId,
            feature_image,
            name,
            pricing,
            quantity,
            status,
            url,
            taxClass,
            rating,
            shipping,
            __typename,
            _id,
          } = product;
          setProducts((prev) => [
            ...prev,
            {
              brand: brand,
              categoryId: categoryId,
              feature_image: feature_image,
              name: name,
              pricing: pricing,
              quantity: quantity,
              status: status,
              url: url,
              taxClass: taxClass,
              rating: rating,
              shipping: shipping,
              __typename: __typename,
              _id: _id,
            },
          ]);
        });
      }
    } catch (e) {
      console.log("fillerProduct ERRoR : ", e);
    }
  };

  const getAllCategories = async () => {
    let shopProduct = "";
    try {
      const { data: shopproductcategory } = await client.query({
        query: GET_CATEGORIES_QUERY,
      });
      shopProduct = get(shopproductcategory, "productCategories");

      const cat = shopProduct?.data?.find((cat) => cat?.id === section?.category);
      setCategory(cat);
    } catch (e) {
    }
  };
  useEffect(() => {
    getProducts();
    getAllCategories();
  }, [section.id]);
  return (
    <div>
      {0 < products?.length ? (
        <Container>
          <h4 className="theme-color my-5">
            Products For{" "}
            <span className="black-color">{capitalize(category?.name)}</span>
          </h4>
          <OnSaleProductCard onSaleProduct={products} hideTitle />
        </Container>
      ) : null}
    </div>
  );
};
SpecificProducts.propTypes = {
  section: PropTypes.shape({
    id: PropTypes.string,
    category: PropTypes.string,
  }),
  homepageData: PropTypes.object,
};
export default SpecificProducts;
