import React, { Fragment, useEffect, useState } from "react";
import { Typography, Box, Grid, Container } from "@material-ui/core";
import ProductCard from "./productcard";
import { isEmpty } from "../../utils/helper";
import Loading from "./loading";

const ProductGrid = (props) => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    // var products = [];
    // var onSaleCount = 0;
    // var productcount = 0;
    // if (!isEmpty(props.allProducts)) {
    //   for (var i = 0; i < props.allProducts.length; i++) {
    //     if (props.allProducts[i].status === "Publish") {
    //       if (props.onSale) {
    //         if (props.allProducts[i].pricing.sellprice > 0) {
    //           products.push(props.allProducts[i]);
    //           onSaleCount++;
    //           if (onSaleCount > 7) {
    //             break;
    //           }
    //         }
    //       } else {
    //         products.push(props.allProducts[i]);
    //         productcount++;
    //         // if (productcount > 7) {
    //         //   break;
    //         // }
    //       }
    //     }
    //   }
    //   setProducts(products);
    // }
    setProducts(props.allProducts);
  }, [props.allProducts]);

  return (
    <Fragment>
      {!products.length ? <Loading /> : ""}

      <section className="home-product-listing">
        <Container>
          {props.title && (
            <Box display="flex" justifyContent="center">
              <Typography variant="h2" className="section-title">
                {props.title}
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
