import Link from "next/link";
import PropTypes from "prop-types";
import { generateCategoryUrl } from "../../utills/helpers";

const CategoryLink = ({ url, children }) => (
  <Link href={generateCategoryUrl(url)?.href} as={generateCategoryUrl(url)?.as}>
    {children}
  </Link>
);
CategoryLink.propTypes = {
  url: PropTypes.string.isRequired,
  children: PropTypes.element.isRequired,
};
export default CategoryLink;
