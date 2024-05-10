/* eslint-disable no-empty */
/* eslint-disable react/jsx-key */
import React, { useEffect, useState } from "react";
import { Row, Col } from "react-bootstrap";
import Link from "next/link";
import { queryWithoutToken } from "../utills/helpers";
import { capitalize, get } from "lodash";
import PropTypes from "prop-types";
import {
  GET_CATEGORIES_QUERY,
  GET_RECENT_PRODUCTS_QUERY,
} from "../queries/home";
import ProductImage from "./imageComponent";
const MegaMenu = ({ openMenu, setOpenMenu }) => {
  const [categories, setCategories] = useState([]);
  const [productCategories, setproductCategories] = useState([]);
  const [newProducts, setNewProducts] = useState([]);
  const getCategories = async () => {
    try {
      const { data: categoryData } = await queryWithoutToken(
        GET_CATEGORIES_QUERY
      );
      const category = get(categoryData, "productCategories.data", []);
      setCategories([...category]);
    } catch (e) {}
  };
  const getNewProducts = async () => {
    try {
      const { data: recentprductData } = await queryWithoutToken(
        GET_RECENT_PRODUCTS_QUERY
      );
      const recentproducts = get(recentprductData, "recentproducts", []);
      setNewProducts([...recentproducts]);
    } catch (e) {}
  };
  useEffect(() => {
    getCategories();
    getNewProducts();
  }, [openMenu]);

  useEffect(() => {
    const mainCategories = [];
    categories?.map((category) => {
      if (!category.parentId) {
        mainCategories.push({ ...category, subcategories: [] });
      }
    });
    categories?.forEach((category) => {
      const parentIds = Array.isArray(category?.parentId)
        ? category?.parentId
        : [category?.parentId];
      parentIds?.forEach((parentId) => {
        const parentCategory = mainCategories?.findIndex(
          (main) => main?.id === parentId
        );
        if (parentCategory >= 0) {
          mainCategories[parentCategory]?.subcategories?.push(category);
        }
      });
    });
    mainCategories?.sort(
      (a, b) => b?.subcategories?.length - a?.subcategories?.length
    );
    setproductCategories([...mainCategories]);
  }, [categories]);
  return (
    <>
      <div className={` mega-menu-wrapper ${openMenu ? "open" : ""}`}>
        <div
          className="container  box-shadow margin-bottom"
          onMouseLeave={() => setOpenMenu(false)}
        >
          <Row className="">
            <Col lg={4} className="new-products-col">
              <div  className="mega-menu-container">
                <h4 className="theme-color my-2">
                  {" "}
                  New <span className="text-black">Products</span>
                </h4>
                {newProducts?.length>0?newProducts?.map((product, i) =>
                  i < 3 ? (
                    <div  className="product last-border mega-menu-product"
                    >
                      <ProductImage
                        src={get(product, "feature_image", "")}
                        className="megamenu-class"
                        alt=""
                      />
                      <div className="details mega-detail">
                        <h4>{product?.name}</h4>
                        <Link
                          href={`/product/[singleproduct]?url=${product?.url}`}
                          as={`/product/${product?.url}`}
                        >
                          <div className="card-btns">
                            <button
                              type="button"
                              className="btn btn-success primary-btn-color "
                            >
                              Shop Now
                            </button>
                          </div>
                        </Link>
                      </div>
                    </div>
                  ) : null
                ):<p>No New products</p>}
              </div>
            </Col>
            <Col className="product-categories-col">
              <div>
                <h4 className="theme-color my-2">
                  {" "}
                  Product <span className="text-black">Categories</span>
                </h4>

                <div className="product-categories-wrapper">
                  {productCategories?.length>0?productCategories?.map((category) => (
                    <div className="category">
                      <div className="link">
                        <Link
                          href={`/subcategory/[category]?url=${category?.url}`}
                          as={`/subcategory/${category?.url}`}
                        >
                          {capitalize(category?.name)}
                        </Link>
                      </div>
                      {category?.subcategories?.map((sub_cat) => (
                        <Link
                          href={`/subcategory/[category]?url=${sub_cat?.url}`}
                          as={`/subcategory/${sub_cat.url}`}
                        >
                          {capitalize(sub_cat?.name)}
                        </Link>
                      ))}
                    </div>
                  )):<p>No Categories Found</p>}
                </div>
              </div>
            </Col>
          </Row>
        </div>
      </div>
    </>
  );
};
MegaMenu.propTypes = {
  openMenu: PropTypes.bool.isRequired,
  setOpenMenu: PropTypes.func.isRequired,
};
export default MegaMenu;