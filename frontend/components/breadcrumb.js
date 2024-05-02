/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import Link from "next/link";
import { useRouter } from "next/router";
import { Container } from "react-bootstrap";
import { generateCategoryUrl } from "../utills/helpers";
import { get } from "lodash";
const CategoryBreadCrumb = ({ breadCrumbs }) => {
  const router = useRouter();
  return (
    <nav className="breadcrumb-nav" aria-label="breadcrumb" style={{}}>
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
                  <p style={{ marginLeft: "10px", marginRight: "10px" }}>
                    {">"}
                  </p>
                  <Link
                    href={get(breadCrumb, "url.href")}
                    as={get(breadCrumb, "url.as")}
                    style={{ marginLeft: "10px" }}
                  >
                    <li className="breadcrumb-item page-active breadcrumb-link">
                      {breadCrumb?.name}
                    </li>
                  </Link>
                </>
              );
            })}
        </ol>
      </Container>
    </nav>
  );
};
export default CategoryBreadCrumb;
