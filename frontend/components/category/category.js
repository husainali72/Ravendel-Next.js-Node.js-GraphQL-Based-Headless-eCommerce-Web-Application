import Container from "react-bootstrap/Container";
import { MdChevronLeft, MdChevronRight } from "react-icons/md";
import { useEffect, useRef, useState } from "react";
import useResizeObserver from "@react-hook/resize-observer";
import { capitalize, get } from "lodash";
import ProductImage from "../../components/imageComponent";
import PropTypes from "prop-types";
import CategoryLink from "./categoryLink";
const Category = ({ category }) => {
  const [showSlider, setShowSlider] = useState(false);
  const [inlineSize, setInlineSize] = useState(0);
  const slider = useRef();
  const slideLeft = () => {
    slider.current.scrollLeft = get(slider, "current.scrollLeft") - 500;
  };
  const slideRight = () => {
    slider.current.scrollLeft = get(slider, "current.scrollLeft") + 500;
  };
  const bool =
    get(slider, "current.offsetWidth") < get(slider, "current.scrollWidth");
  useEffect(() => {
    setShowSlider(bool);
  }, [inlineSize]);

  useResizeObserver(slider, (entry) => {
    const { inlineSize } = get(entry, "contentBoxSize[0]");
    setInlineSize(inlineSize);
  });
  return (
    <section className="product-cart-section">
      <Container className="container">
        {showSlider ? (
          <MdChevronLeft
            onClick={slideLeft}
            className="cat-left-icon"
            size={24}
          />
        ) : null}
        <div>
          <h4 className="theme-color my-3">
            Products <span className="black-color">Category</span>
          </h4>
          <div
            className={
              showSlider
                ? "category pro-cat px-3"
                : " pro-cat category categoryShow "
            }
            ref={slider}
          >
            {category?.length > 0 ? (
              category?.map((item, i) => {
                return (
                  <>
                    <CategoryLink url={item?.url}>
                      <div className="category-cards" key={i}>
                        <div className="category-card-image">
                          <ProductImage src={get(item, "thumbnail_image")} />
                        </div>

                        <div className="card-body">
                          <p className="card-title category-card-title">
                            {capitalize(item?.name)}
                          </p>
                        </div>
                      </div>
                    </CategoryLink>
                  </>
                );
              })
            ) : (
              <p>No Category Found</p>
            )}
          </div>
        </div>
        {showSlider ? (
          <MdChevronRight
            onClick={slideRight}
            className="cat-right-icon"
            size={24}
          />
        ) : null}
      </Container>
    </section>
  );
};
Category.propTypes = {
  category: PropTypes.array.isRequired,
};
export default Category;
