import React, { Fragment, useState, useEffect } from "react";
import { Typography, Box, Container } from "@material-ui/core";
import Slider from "react-slick";
import ProductCard from "./productcard";
import SectionLoading from "./sectionLoading";
import { isEmpty } from "../../utils/helper";

const ProductSlider = (props) => {
  const settings = {
    infinite: true,
    slidesToShow: 4,
    speed: 600,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 4000,
    centerPadding: 50,
    responsive: [
      {
        breakpoint: 1025,
        settings: {
          slidesToShow: 4,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
        },
      },
    ],
  };

  const [products, setProducts] = useState([]);

  useEffect(() => {
    var products = [];
    if (!isEmpty(props.allProducts)) {
      props.allProducts.map((product) => {
        if (product.status === "Publish") {
          if (props.featuredProducts) {
            if (product.featured_product) {
              products.push(product);
            }
          } else {
            products.push(product);
          }
        }
      });
      setProducts(products);
    }
  }, [props.allProducts]);

  return (
    <Fragment>
      <section className="home-product-listing with-slider">
        {props.allProducts.length < 0 ? (
          <SectionLoading />
        ) : (
          <Container>
            <Box display="flex" justifyContent="center">
              <Typography variant="h2" className="section-title">
                {props.title}
              </Typography>
            </Box>
            <Slider {...settings}>
              {products &&
                products
                  .sort((a, b) => (a.date > b.date ? 1 : -1))
                  .map((product, index) => (
                    <ProductCard
                      productDetail={product}
                      index={index}
                      key={index}
                    />
                  ))}
            </Slider>
          </Container>
        )}
      </section>
    </Fragment>
  );
};

export default ProductSlider;
