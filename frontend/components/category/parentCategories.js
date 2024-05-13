import { get } from "lodash";
import PropTypes from "prop-types";
import RoundCard from "../card/roundCard";
import ProductImage from "../imageComponent";
import CategoryLink from "./categoryLink";
const ParentCategories = ({ categories, categoryName }) => {
  {console.log(categories)}
  return (
    <>
      <div className={`banner-container section-banner`}>
        <ProductImage className="banner-image" src={get(categories, "image")} />
        <h2>{categoryName}</h2>
      </div>
      <div className="container">
        <div className="category-disc mt-5">
          {
            get(categories, "description") &&
              <>
              {/* <h5>Category Discription</h5> */}
              <p>
                {get(categories, "description")}
              </p>
              </>
          }
        </div>
        {
          get(categories, "subCategories", []).length > 0 &&
          <>
            <h5>Categories under {categoryName}</h5>
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
        }
      </div>
    </>
  );
};
ParentCategories.propTypes = {
  categories: PropTypes.object.isRequired,
  categoryName: PropTypes.string.isRequired,
};
export default ParentCategories;
