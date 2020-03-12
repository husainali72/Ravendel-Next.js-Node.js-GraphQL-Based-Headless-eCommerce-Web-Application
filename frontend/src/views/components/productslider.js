import React, { Fragment } from "react";
import { Typography, Box, Container } from "@material-ui/core";
import Slider from "react-slick";
import ProductCard from "./productcard";

const ProductSlider = props => {
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
          slidesToShow: 3,
          slidesToScroll: 1
        }
      },
      {
        breakpoint: 992,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1
        }
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1
        }
      }
    ]
  };

  return (
    <Fragment>
      <section className="home-product-listing">
        <Container>
          <Box display="flex" justifyContent="center">
            <Typography variant="h2" className="section-title">
              {props.title}
            </Typography>
          </Box>
          <Slider {...settings}>
            {props.allProducts &&
              props.allProducts.map((product, index) => (
                <ProductCard
                  productDetail={product}
                  index={index}
                  key={index}
                />
              ))}
          </Slider>
        </Container>
      </section>
    </Fragment>
  );
};

export default ProductSlider;
