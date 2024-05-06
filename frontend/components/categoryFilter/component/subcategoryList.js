import React, { useState } from "react";
import PropTypes from "prop-types";
import { FiChevronDown, FiChevronLeft } from "react-icons/fi";
import { generateCategoryUrl } from "../../../utills/helpers";
import Link from "next/link";
import { useEffect } from "react";
import { get } from "lodash";

const CategoryLink = ({ url, name, isSelected }) => (
  <Link href={generateCategoryUrl(url).href} as={generateCategoryUrl(url).as}>
    <span
      className={`fw-semibold cursor-pointer mb-1 parent-category ${
        isSelected ? "text-black" : ""
      }`}
    >
      {name}
    </span>
  </Link>
);

const SubCategoryItem = ({ url, name }) => (
  <Link href={generateCategoryUrl(url)?.href} as={generateCategoryUrl(url)?.as}>
    <li className="fw-semibold cursor-pointer mb-1 child-categories">{name}</li>
  </Link>
);

const SubCategoryList = ({ name,categoryTree }) => {
  const [expanded, setExpanded] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState({});
  useEffect(() => {
    setSelectedCategory({ ...get(categoryTree, "subCategories", {}) });
  }, [categoryTree]);
  const handleToggle = () => {
    setExpanded(!expanded);
  };

  return (
    <div>
      <div className="primary-sidebar sticky-sidebar category-shop-cart">
        <div className="theiaStickySidebar category-box-filler">
          <div className="widget-category">
            <h4 className="category-section-title">{name}</h4>
            <ul className="categories-shop">
              {categoryTree ? (
                <>
                  <li className="fw-semibold cursor-pointer mb-1">
                    <FiChevronLeft className="mb-1 back-category-disable custom-icon-color"/>
                    <CategoryLink
                      url={get(categoryTree, "url")}
                      name={get(categoryTree, "name")}
                      isSelected={get(categoryTree, "select", false)}
                    />
                  </li>
                  <li onClick={handleToggle}>
                    {expanded ? (
                      <FiChevronDown className="mb-1 back-category" />
                    ) : (
                      <FiChevronLeft className="mb-1 back-category" />
                    )}
                    <CategoryLink
                      url={get(selectedCategory, "url")}
                      name={get(selectedCategory, "name", "")}
                      isSelected={get(selectedCategory, "select", false)}
                    />
                  </li>

                  {expanded &&
                    get(selectedCategory, "subCategories", [])?.map(
                      (category, index) => (
                        <SubCategoryItem
                          key={index}
                          url={category.url}
                          name={category.name}
                        />
                      )
                    )}
                </>
              ):<p>No categories</p>}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

CategoryLink.propTypes = {
  url: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  isSelected: PropTypes.bool,
};

SubCategoryItem.propTypes = {
  url: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
};

SubCategoryList.propTypes = {
  name: PropTypes.string.isRequired,
  categoryTree: PropTypes.object.isRequired,
};

export default SubCategoryList;
