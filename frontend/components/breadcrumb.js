import Link from "next/link";
import { Container } from "react-bootstrap";
import { get } from "lodash";
import CategoryLink from "./category/categoryLink";
import PropTypes from "prop-types";
const CategoryBreadCrumb = ({ breadCrumbs, className }) => {
  return (
    <nav className={`breadcrumb-nav ${className}`} aria-label="breadcrumb" style={{}}>
      <Container>
        <ol className="breadcrumb" style={{ cursor: "pointer" }}>
          <li className="breadcrumb-item page-active">
            <Link href="/" className="breadcrumb-link">
              Home
            </Link>
          </li>
          {breadCrumbs &&
            breadCrumbs?.length > 0 &&
            breadCrumbs?.map((breadCrumb) => {
              return (
                <>
                  <p style={{ marginLeft: "4px", marginRight: "6px", fontWeight: 500, color: '#888' }}>
                    {"/"}
                  </p>
                  <CategoryLink url={get(breadCrumb, "url")}>
                    <li className="breadcrumb-item page-active breadcrumb-link">
                      {breadCrumb?.name}
                    </li>
                  </CategoryLink>
                </>
              );
            })}
        </ol>
      </Container>
    </nav>
  );
};
CategoryBreadCrumb.propTypes = {
  breadCrumbs: PropTypes.array,
  className: PropTypes.string
};
export default CategoryBreadCrumb;
