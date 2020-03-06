import React, { Fragment, useState } from "react";
import {
  Button,
  Zoom,
  Typography,
  Box,
  Grid,
  Container
} from "@material-ui/core";
import { Link } from "react-router-dom";

const ProductGrid = props => {
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
          <Grid container spacing={5}>
            {props.allProducts &&
              props.allProducts.map((product, index) => (
                <Grid item lg={3} md={6} sm={6} key={index}>
                  <div
                    className="product-card product-grid-view"
                    onMouseOver={() => setProdIndex(index)}
                    onMouseOut={() => setProdIndex("")}
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
                            Add To Cart
                          </Button>
                        </div>
                      </Zoom>
                    </div>
                    <div className="product-details">
                      <span className="product-category">
                        {product.category}
                      </span>

                      <a href="google.com" target="_blank">
                        <h3 className="product-title">{product.title}</h3>
                      </a>

                      <p className="product-price">
                        <span
                          className={product.sale_price && "has-sale-price"}
                        >
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
                </Grid>
              ))}
          </Grid>
        </Container>
      </section>
    </Fragment>
  );
};

export default ProductGrid;
