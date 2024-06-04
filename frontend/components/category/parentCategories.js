import { get } from "lodash";
import PropTypes from "prop-types";
import CategoryCard from "../card/roundCard";
import ProductImage from "../imageComponent";
import CategoryLink from "./categoryLink";

const ParentCategories = ({ categories, categoryName }) => {
  return (
    <>
      <div className={`banner-container section-banner`}>
        <ProductImage
          className="banner-image"
          src={get(categories, "image", "")}
        />
        <h2>{categoryName}</h2>
      </div>

      <div className="container">
        <div className="category-disc mt-5">
          {get(categories, "description") && (
            <>
              <p>{get(categories, "description")}</p>
            </>
          )}
        </div>
        {get(categories, "subCategories", []).length > 0 && (
          <>
            <h5>Categories under {categoryName}</h5>
            <div className="parent-category-container">
              {get(categories, "subCategories", [])?.map((subCategory, i) => {
                return (
                  <>
                    <CategoryLink url={subCategory?.url}>
                      <a>
                        <CategoryCard
                          key={i}
                          name={get(subCategory, "name")}
                          image={get(subCategory, "thumbnail_image")}
                        />
                      </a>
                    </CategoryLink>
                  </>
                );
              })}
            </div>
          </>
        )}
      </div>
    </>
  );
};
ParentCategories.propTypes = {
  categories: PropTypes.object.isRequired,
  categoryName: PropTypes.string.isRequired,
  loading: PropTypes.bool,
};
export default ParentCategories;
