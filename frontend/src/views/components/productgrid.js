import React, { Fragment, useEffect, useState } from "react";
import { Typography, Box, Grid, Container } from "@material-ui/core";
import ProductCard from "./productcard";
import { isEmpty } from "../../utils/helper";
import Loading from "./loading";

const ProductGrid = ({allProducts, title}) => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    setProducts(allProducts);
  }, [allProducts]);

  return (
    <Fragment>
      {!products.length ? <Loading /> : ""}

      <section className="home-product-listing">
        <Container>
          {title && (
            <Box display="flex" justifyContent="center">
              <Typography variant="h2" className="section-title">
                {title}
              </Typography>
            </Box>
          )}
          <Grid container spacing={5}>
            {products &&
              products.map((product, index) =>
                product.status === "Publish" ? (
                  <Fragment key={index}>
                    <Grid item lg={3} md={4} sm={4} xs={6}>
                      <ProductCard
                        productDetail={product}
                        index={index}
                        key={index}
                        GirdProductView={true}
                      />
                    </Grid>
                  </Fragment>
                ) : (
                  ""
                )
              )}
          </Grid>
        </Container>
      </section>
    </Fragment>
  );
};

export default ProductGrid;
