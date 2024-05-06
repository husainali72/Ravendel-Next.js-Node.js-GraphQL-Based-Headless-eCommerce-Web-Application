import { get } from "lodash";
import PropTypes from "prop-types";
import RoundCard from "../card/roundCard";
import { generateCategoryUrl } from "../../utills/helpers";
import ProductImage from "../imageComponent";
import Link from "next/link";
const ParentCategories = ({ categories }) => {
  return (
    <>
      <div className={`banner-container section-banner`}>
        {/* <ProductImage className="banner-image" src='https://t4.ftcdn.net/jpg/00/81/38/59/360_F_81385977_wNaDMtgrIj5uU5QEQLcC9UNzkJc57xbu.jpg'  /> */}
        <ProductImage className="banner-image" src={get(categories, "image")} />
      </div>

      <div className="parent-category-container">
        {get(categories, "subCategories", [])?.length > 0 ? (
          get(categories, "subCategories", [])?.map((subCategory, i) => {
            let url = generateCategoryUrl(subCategory?.name);
            return (
              <>
                <Link href={url.href} as={url.as}>
                  <a>
                    <RoundCard key={i} name={get(subCategory,'name')} image={get(subCategory,'image')}/>
                  </a>
                </Link>
              </>
            );
          })
        ) : (
          <p>No SubCategory</p>
        )}
      </div>
    </>
  );
};
ParentCategories.propTypes = {
  categories: PropTypes.object.isRequired,
};
export default ParentCategories;
