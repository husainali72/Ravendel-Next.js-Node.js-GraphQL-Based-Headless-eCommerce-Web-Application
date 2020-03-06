import React, { Fragment, useState } from "react";
import { Button, Zoom, Typography, Box, Container } from "@material-ui/core";
import Slider from "react-slick";
import { Link } from "react-router-dom";

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

  const [prodIndex, setProdIndex] = useState("");

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
                <div
                  className="product-card"
                  onMouseOver={() => setProdIndex(index)}
                  onMouseOut={() => setProdIndex("")}
                  key={index}
                >
                  <div className="product-image-wrapper">
                    <img src={product.featured_image} alt="product" />
                    <Zoom in={index === prodIndex ? true : false}>
                      <div className="hover-content">
                        <Link to={`/product/${product.name}`}>
                          <Button
                            variant="contained"
                            color="secondary"
                            size="small"
                            className="product-btn"
                          >
                            View
                          </Button>
                        </Link>
                        <Button
                          variant="contained"
                          color="primary"
                          size="small"
                          className="product-btn"
                        >
                          {" "}
                          Add To Cart
                        </Button>
                      </div>
                    </Zoom>
                  </div>
                  <div className="product-details">
                    <span className="product-category">{product.category}</span>

                    <a href="google.com" target="_blank">
                      <h3 className="product-title">{product.title}</h3>
                    </a>

                    <p className="product-price">
                      <span className={product.sale_price && "has-sale-price"}>
                        ${product.price.toFixed(2)}
                      </span>
                      {product.sale_price && (
                        <span className="sale-price">
                          ${product.sale_price.toFixed(2)}
                        </span>
                      )}
                    </p>
                  </div>
                </div>
              ))}
          </Slider>
        </Container>
      </section>
    </Fragment>
  );
};

export default ProductSlider;
