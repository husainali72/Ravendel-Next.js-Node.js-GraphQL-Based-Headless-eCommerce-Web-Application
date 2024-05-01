import { get } from "lodash";
import Link from "next/link";
import PropTypes from "prop-types";
import React from "react";
import { FiChevronLeft } from "react-icons/fi";
import { generateCategoryUrl } from "../../../utills/helpers";

const SubCategoryList = ({ name, categories }) => {
  return (
    <div>
      <div className="primary-sidebar sticky-sidebar category-shop-cart">
        <div className="theiaStickySidebar category-box-filler">
          <div className="widget-category">
            <h4 className="category-section-title">{name}</h4>
            <ul className="categories-shop">
              {get(categories, "name") ? (
                <>
                  <Link href={generateCategoryUrl(get(categories, "name"))}>
                    <li className="fw-semibold cursor-pointer mb-1">
                      <FiChevronLeft className="mb-1 back-category" />
                      {get(categories, "name")}
                    </li>
                  </Link>
                  {get(categories, "subCategories", [])?.map(
                    (category, index) => (
                      <Link
                        href={generateCategoryUrl(category?.name)}
                        key={index}
                      >
                        <li
                          className={`fw-semibold cursor-pointer mb-1 ${
                            category?.select ? "text-black" : ""
                          }`}
                        >
                          {category?.name}
                        </li>
                      </Link>
                    )
                  )}
                </>
              ) : (
                <p>No categories found</p>
              )}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

SubCategoryList.propTypes = {
  name: PropTypes.string.isRequired,
  categories: PropTypes.array.isRequired,
};

export default SubCategoryList;
