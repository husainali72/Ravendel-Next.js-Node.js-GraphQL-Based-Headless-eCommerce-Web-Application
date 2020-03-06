import React, { Fragment, useState } from "react";
import { connect } from "react-redux";
import {
  Button,
  Zoom,
  Typography,
  Box,
  Container,
  Grid,
  ListItem,
  List,
  Collapse,
  Slider,
  Divider
} from "@material-ui/core";
import { Link } from "react-router-dom";

const Shop = props => {
  const [prodIndex, setProdIndex] = useState("");

  var categories = {
    category: [
      {
        name: "Catergory First"
      },
      {
        name: "Category Second"
      },
      {
        name: "Catergory Third",
        children: [
          {
            name: "category 1"
          },
          {
            name: "category 2"
          },
          {
            name: "category 3"
          }
        ]
      }
    ]
  };

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

  const [catName, setCatName] = useState("");
  const [priceRange, ssetPriceRange] = React.useState([20, 37]);

  const priceChange = (event, newValue) => {
    ssetPriceRange(newValue);
  };

  const handleClick = name => {
    if (name === catName) {
      setCatName("");
    } else {
      setCatName(name);
    }
  };

  const categoryListing = categories => {
    return categories.map(cat => {
      if (!cat.children) {
        return (
          <ListItem disableGutters key={cat.name}>
            <Typography variant="button" className="category-fillter">
              {cat.name}
            </Typography>
          </ListItem>
        );
      }
      return (
        <div key={cat.name}>
          <ListItem disableGutters onClick={() => handleClick(cat.name)}>
            <Typography variant="button" className="category-fillter">
              {cat.name}
            </Typography>
            {/* {catName === cat.name ? <ExpandLess /> : <ExpandMore />} */}
          </ListItem>
          <Collapse
            in={catName === cat.name ? true : false}
            timeout="auto"
            unmountOnExit
            className="subcategory-collapse"
          >
            {categoryListing(cat.children)}
          </Collapse>
        </div>
      );
    });
  };

  return (
    <Fragment>
      <Box
        component="div"
        display="flex"
        justifyContent="center"
        alignItems="center"
        className="page-header"
      >
        <Typography variant="h1">Shop</Typography>
      </Box>
      <Container>
        <Grid container className="shop-row" spacing={4}>
          <Grid item lg={3} md={4}>
            <Box component="div" className="filter-wrapper">
              <Typography variant="h3" className="fillter-header">
                Categories
              </Typography>
              <List component="nav" dense>
                {categoryListing(categories.category)}
              </List>
            </Box>
            <Divider />
            <Box component="div" className="filter-wrapper">
              <Typography variant="h3" className="fillter-header">
                Fillter by
              </Typography>

              <Typography id="price-slider" gutterBottom>
                Price
              </Typography>
              <Slider
                value={priceRange}
                onChange={priceChange}
                valueLabelDisplay="auto"
                aria-labelledby="price-slider"
              />
              <Typography variant="h6">
                Range: ${priceRange[0]} - ${priceRange[1]}
              </Typography>
            </Box>
            <Divider />
            <Box component="div" className="filter-wrapper">
              <Typography variant="h3" className="fillter-header">
                Brands
              </Typography>
              <List component="nav" dense>
                <ListItem disableGutters>
                  <Typography variant="button" className="category-fillter">
                    Brand 1
                  </Typography>
                </ListItem>
                <ListItem disableGutters>
                  <Typography variant="button" className="category-fillter">
                    Brand 2
                  </Typography>
                </ListItem>
                <ListItem disableGutters>
                  <Typography variant="button" className="category-fillter">
                    Brand 3
                  </Typography>
                </ListItem>
              </List>
            </Box>
          </Grid>

          <Grid item lg={9} md={8}>
            <Grid container spacing={4}>
              {products &&
                products.map((product, index) => (
                  <Grid item lg={4} md={6} sm={6} key={index}>
                    <div
                      className="product-card"
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
          </Grid>
        </Grid>
      </Container>
    </Fragment>
  );
};

const mapStateToProps = state => ({
  settings: state.settings
});

export default connect(mapStateToProps)(Shop);
