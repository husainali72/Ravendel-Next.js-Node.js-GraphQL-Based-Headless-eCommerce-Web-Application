/* eslint-disable react/prop-types */
import Link from "next/link";
import Container from "react-bootstrap/Container";
import ProductImage from "../imageComponent";
import { get } from "lodash";
const FeatureBrand = ({ brands }) => {
  return (
    <section className="product-cart-section">
      <Container>
        <h4 className="theme-color mb-2">
          Featured <span className="black-color">Brands</span>
        </h4>
        <div className="brand-container">
          {brands?.length > 0 ? (
            brands?.map((item, i) => {
              return (
                <div className="brand-card-container" key={i}>
                  <div className="category-card-image brand-card-image">
                    <Link
                      href={`/brands/[brand]?url=${item?.url}`}
                      as={`/brands/${item?.url}`}
                    >
                      <ProductImage src={get(item, "brand_logo", "")} />
                    </Link>
                  </div>
                  <div>
                    <p className="brand-card-title">{item?.name}</p>
                  </div>
                </div>
              );
            })
          ) : (
            <p>No Brands Available</p>
          )}
        </div>
      </Container>
    </section>
  );
};
export default FeatureBrand;
