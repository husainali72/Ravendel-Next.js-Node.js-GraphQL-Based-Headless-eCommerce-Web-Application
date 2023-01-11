import React, { Fragment } from "react";
import { Typography, Box, Container } from"@mui/material";
import Slider from "react-slick";
import ProductCard from "./productcard";

const RelatedProducts = ({ relatedProduct, title }) => {
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

  return (
    <Fragment>
      <section className="home-product-listing">
        <Container>
          <Box display="flex" justifyContent="center">
            <Typography variant="h2" className="section-title">
              {title}
            </Typography>
          </Box>
          <Slider {...settings}>
            {relatedProduct.length > 0 ? (
              relatedProduct.map(
                (product, index) =>
                  product.status === "Publish" && (
                    <ProductCard
                      productDetail={product}
                      index={index}
                      key={index}
                    />
                  )
              )
            ) : (
              <Typography variant="h2" className="section-title">
                No products found
              </Typography>
            )}
          </Slider>
        </Container>
      </section>
    </Fragment>
  );
};

export default RelatedProducts;
