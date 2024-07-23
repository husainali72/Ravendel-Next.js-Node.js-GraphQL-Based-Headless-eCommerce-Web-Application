import React, { useState } from "react";
import PropTypes from "prop-types";
import { FiChevronDown, FiChevronLeft } from "react-icons/fi";
import {
  generateCategoryUrl,
  isCurrentCategory,
} from "../../../utills/helpers";
import Link from "next/link";
import { useEffect } from "react";
import { get } from "lodash";
import { useRouter } from "next/router";
const CategoryName = ({ name, className }) => (
  <span className={className}>{name}</span>
);
const CategoryLink = ({ url, name, isSelected, className }) => {
  const router = useRouter();
  const customClassName = `cursor-pointer parent-category ${className} ${
    isSelected ? "active" : ""
  }`;

  if (!isCurrentCategory(url, router)) {
    return (
      <Link
        href={generateCategoryUrl(url)?.href}
        as={generateCategoryUrl(url)?.as}
      >
        <a className={customClassName}>
          <CategoryName name={name} className={customClassName} />
        </a>
      </Link>
    );
  } else {
    return <CategoryName name={name} className={customClassName} />;
  }
};

const SubCategoryItem = ({ url, name }) => (
  <Link href={generateCategoryUrl(url)?.href} as={generateCategoryUrl(url)?.as}>
    <li className="cursor-pointer child-categories">{name}</li>
  </Link>
);

const SubCategoryList = ({ categoryTree }) => {
  const [expanded, setExpanded] = useState(true);
  // const [showMore, setShowMore] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState({});
  useEffect(() => {
    const initialSubcategories = get(categoryTree, "subCategories.subCategories", []).slice(
      0,
      5
    );
    setSelectedCategory({
      ...get(categoryTree, "subCategories", []),
      subCategories: initialSubcategories,
    });
  }, [categoryTree]);
  const handleToggle = () => {
    setExpanded(!expanded);
  };

  return (
    <div>
      {categoryTree && Object.keys(categoryTree)?.length > 0 && (
        <div className="primary-sidebar sticky-sidebar category-shop-cart">
          <div className="theiaStickySidebar category-box-filler border-bottom">
            <div className="widget-category">
              {/* <h4 className="category-section-title">{name}</h4> */}
              <ul className="categories-shop">
                <>
                  <li className="fw-semibold cursor-pointer mb-1">
                    <FiChevronLeft className="mb-1 back-category-disable custom-icon-color" />
                    <CategoryLink
                      url={get(categoryTree, "url")}
                      name={get(categoryTree, "name")}
                      isSelected={get(categoryTree, "select", false)}
                    />
                  </li>
                  <li onClick={handleToggle}>
                    {get(selectedCategory, "subCategories", [])?.length > 0 && (
                      <>
                        {expanded ? (
                          <FiChevronDown className="mb-1 back-category" />
                        ) : (
                          <FiChevronLeft className="mb-1 back-category" />
                        )}
                      </>
                    )}
                    <CategoryLink
                      className={
                        get(selectedCategory, "subCategories", [])?.length <=
                          0 && "child-categories"
                      }
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
                          url={category?.url}
                          name={category?.name}
                        />
                      )
                    )}
                </>
              </ul>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

CategoryLink.propTypes = {
  url: PropTypes.string.isRequired,
  className: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  isSelected: PropTypes.bool,
};
CategoryName.propTypes = {
  className: PropTypes.string.isRequired,
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
