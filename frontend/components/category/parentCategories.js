import { get } from "lodash";
import PropTypes from "prop-types";
import RoundCard from "../card/roundCard";
import ProductImage from "../imageComponent";
import CategoryLink from "./categoryLink";
const ParentCategories = ({ categories }) => {
  return (
    <>
      <div className={`banner-container section-banner`}>
        <ProductImage className="banner-image" src={get(categories, "image")} />
      </div>
      <div className="parent-category-container">
        {get(categories, "subCategories", [])?.map((subCategory, i) => {
          return (
            <>
              <CategoryLink url={subCategory?.url}>
                <a>
                  <RoundCard
                    key={i}
                    name={get(subCategory, "name")}
                    image={get(subCategory, "image")}
                  />
                </a>
              </CategoryLink>
            </>
          );
        })}
      </div>
    </>
  );
};
ParentCategories.propTypes = {
  categories: PropTypes.object.isRequired,
};
export default ParentCategories;
