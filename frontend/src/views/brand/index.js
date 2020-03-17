import React, { Fragment, useState, useEffect } from "react";
import { connect } from "react-redux";
import { Container, Grid, Typography, Box } from "@material-ui/core";
import PageTitle from "../components/pageTitle";
import ProductGrid from "../components/productgrid";
import Logo from "../../assets/images/logo.png";

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

const Brand = props => {
  const [brandName, setBrandName] = useState(props.match.params.name);

  useEffect(() => {
    setBrandName(props.match.params.name);
  }, [props.match.params.name]);

  return (
    <Fragment>
      <PageTitle title={brandName} />
      <Container>
        <Grid conatiner spacing={2} className="margin-top-3 margin-bottom-3">
          <Grid itme md={12} sm={12} xs={12}>
            <Box className="text-center">
              <img
                src={props.brandlogo ? props.brandlogo : Logo}
                alt="Logo"
                className="brandLogo"
              />
            </Box>
            <Typography variant="subtitle1">
              Brand Description is simply dummy text of the printing and
              typesetting industry. Lorem Ipsum has been the industry's standard
              dummy text ever since the 1500s, when an unknown printer took a
              galley of type and scrambled it to make a type specimen book. It
              has survived not only five centuries, but also the leap into
              electronic typesetting, remaining essentially unchanged. It was
              popularised in the 1960s with the release of Letraset sheets
              containing Lorem Ipsum passages, and more recently with desktop
              publishing software like Aldus PageMaker including versions of
              Lorem Ipsum.
            </Typography>
          </Grid>
          <Grid itme md={12} sm={12} xs={12}>
            <ProductGrid allProducts={products} />
          </Grid>
        </Grid>
      </Container>
    </Fragment>
  );
};

const mapStateToProps = state => ({
  settings: state.settings
});

export default connect(mapStateToProps)(Brand);
