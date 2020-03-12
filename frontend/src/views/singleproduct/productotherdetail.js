import React, { Fragment } from "react";
import { Grid, Container, Typography, Box } from "@material-ui/core";
import RelatedProducts from "../components/relatedproduct";

const ProductOtherDetails = props => {
  const products = [
    {
      featured_image:
        "https://colorlib.com/preview/theme/essence/img/bg-img/bg-2.jpg",
      title: "Product First",
      price: 12,
      category: "category",
      description: "Product first lorem ipsom dolr sit"
    },
    {
      featured_image:
        "https://colorlib.com/preview/theme/essence/img/bg-img/bg-4.jpg",
      title: "Product Second",
      price: 12,
      category: "category",
      description: "Product second lorem ipsom dolr sit",
      sale_price: 10
    },
    {
      featured_image:
        "https://colorlib.com/preview/theme/essence/img/bg-img/bg-3.jpg",
      title: "Product Third",
      price: 12,
      category: "category",
      description: "Product third lorem ipsom dolr sit"
    },
    {
      featured_image:
        "https://colorlib.com/preview/theme/essence/img/bg-img/bg-2.jpg",
      title: "Product Fourth",
      price: 12,
      category: "category",
      description: "Product first lorem ipsom dolr sit"
    },
    {
      featured_image:
        "https://colorlib.com/preview/theme/essence/img/bg-img/bg-4.jpg",
      title: "Product Fifth",
      price: 12,
      category: "category",
      description: "Product second lorem ipsom dolr sit",
      sale_price: 10
    },
    {
      featured_image:
        "https://colorlib.com/preview/theme/essence/img/bg-img/bg-3.jpg",
      title: "Product Sixth",
      price: 12,
      category: "category",
      description: "Product third lorem ipsom dolr sit"
    }
  ];

  return (
    <Fragment>
      <section className="product-other-detail">
        <Container>
          <Grid container spacing={3}>
            {props.details.description && (
              <Grid item md={12}>
                <Box>
                  <Box display="flex" justifyContent="center">
                    <Typography variant="h2" className="section-title">
                      description
                    </Typography>
                  </Box>
                  <Typography variant="body1" className="product-description">
                    {props.details.description}
                  </Typography>
                </Box>
              </Grid>
            )}

            <Grid item md={12} className="related-products-wrapper">
              <RelatedProducts
                relatedProduct={products}
                title="Related Products"
              />
            </Grid>
          </Grid>
        </Container>
      </section>
    </Fragment>
  );
};

export default ProductOtherDetails;
