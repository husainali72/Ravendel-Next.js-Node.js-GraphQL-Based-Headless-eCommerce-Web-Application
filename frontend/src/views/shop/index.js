import React, { Fragment, useState, useEffect } from "react";
import { connect } from "react-redux";
import {
  Typography,
  Box,
  Container,
  Grid,
  ListItem,
  List,
  Collapse,
  Slider,
  Divider,
  ExpansionPanel,
  ExpansionPanelSummary,
  ExpansionPanelDetails,
  Checkbox,
  FormControlLabel,
  Icon,
} from "@material-ui/core";
import ProductCard from "../components/productcard";
import PageTitle from "../components/pageTitle";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import {
  productsAction,
  categoriesAction,
} from "../../store/action/productAction";
import { isEmpty } from "../../utils/helper";
import Loading from "../components/loading";

const Shop = (props) => {
  useEffect(() => {
    if (isEmpty(props.products.products)) {
      props.productsAction();
    }
  }, []);

  useEffect(() => {
    if (isEmpty(props.products.categories)) {
      props.categoriesAction();
    }
  }, []);

  const categories = [
    {
      url: "https://colorlib.com/preview/theme/essence/img/bg-img/bg-2.jpg",
      title: "Cloths",
      width: "40%",
    },
    {
      url: "https://colorlib.com/preview/theme/essence/img/bg-img/bg-3.jpg",
      title: "Shoes",
      width: "30%",
    },
    {
      url: "https://colorlib.com/preview/theme/essence/img/bg-img/bg-4.jpg",
      title: "Accessories",
      width: "30%",
      children: [
        {
          url: "https://colorlib.com/preview/theme/essence/img/bg-img/bg-2.jpg",
          title: "Cloths Sub",
          width: "40%",
        },
        {
          url: "https://colorlib.com/preview/theme/essence/img/bg-img/bg-3.jpg",
          title: "Shoes Sub",
          width: "30%",
        },
      ],
    },
  ];
  const [catName, setCatName] = useState("");
  const [priceRange, ssetPriceRange] = React.useState([20, 37]);

  const priceChange = (event, newValue) => {
    ssetPriceRange(newValue);
  };

  const handleClick = (title) => {
    if (title === catName) {
      setCatName("");
    } else {
      setCatName(title);
    }
  };

  const categoryListing = (categoriesParameter) => {
    return categoriesParameter.map((cat) => {
      if (!cat.children) {
        return (
          <ListItem disableGutters key={cat.title}>
            <Typography variant="button" className="category-fillter">
              {cat.title}
            </Typography>
          </ListItem>
        );
      }
      return (
        <div key={cat.title}>
          <ListItem disableGutters onClick={() => handleClick(cat.title)}>
            <Box
              display="flex"
              justifyContent="space-between"
              className="width-100"
            >
              <Typography
                variant="button"
                className="category-fillter"
                edge="start"
              >
                {cat.title}
              </Typography>

              <Icon edge="end" onClick={() => handleClick(cat.title)}>
                {catName === cat.title
                  ? "keyboard_arrow_up"
                  : "keyboard_arrow_down"}
              </Icon>
            </Box>
          </ListItem>
          <Collapse
            in={catName === cat.title ? true : false}
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
      {props.products.loading && <Loading />}
      <PageTitle title="Shop" />
      <Container>
        <Grid container className="shop-row" spacing={4}>
          <Grid item lg={3} md={4} sm={4} xs={12} className="left-sidebar">
            <Box component="div" className="filter-wrapper">
              <Typography variant="h3" className="fillter-header">
                Categories
              </Typography>
              <List component="nav" dense>
                {categoryListing(categories)}
              </List>
            </Box>
            <Box component="div" className="filter-wrapper">
              <Typography variant="h3" className="fillter-header">
                Fillter by
              </Typography>
              <Box className="price-box-fillter">
                <Typography
                  variant="h4"
                  id="price-slider"
                  gutterBottom
                  className="fillter-subheader"
                >
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
            </Box>

            <Box component="div" className="expansionPanelwrapper">
              <Divider />
              <Box component="div" className="filter-wrapper">
                <ExpansionPanel>
                  <ExpansionPanelSummary
                    expandIcon={<ExpandMoreIcon />}
                    aria-controls="panel1a-content"
                    id="panel1a-header"
                  >
                    <Typography variant="h4" className="fillter-subheader">
                      Brands
                    </Typography>
                  </ExpansionPanelSummary>
                  <ExpansionPanelDetails>
                    <List>
                      <ListItem disableGutters>
                        <FormControlLabel
                          control={<Checkbox color="primary" value="brand1" />}
                          label={
                            <Typography
                              variant="button"
                              className="filter-checkbox-label"
                            >
                              Brand 1
                            </Typography>
                          }
                        />
                      </ListItem>
                      <ListItem disableGutters>
                        <FormControlLabel
                          control={<Checkbox color="primary" value="brand2" />}
                          label={
                            <Typography
                              variant="button"
                              className="filter-checkbox-label"
                            >
                              Brand 2
                            </Typography>
                          }
                        />
                      </ListItem>
                      <ListItem disableGutters>
                        <FormControlLabel
                          control={<Checkbox color="primary" value="brand3" />}
                          label={
                            <Typography
                              variant="button"
                              className="filter-checkbox-label"
                            >
                              Brand 3
                            </Typography>
                          }
                        />
                      </ListItem>
                    </List>
                  </ExpansionPanelDetails>
                </ExpansionPanel>
              </Box>
              <Divider />
              <Box component="div" className="filter-wrapper">
                <ExpansionPanel>
                  <ExpansionPanelSummary
                    expandIcon={<ExpandMoreIcon />}
                    aria-controls="panel1a-content"
                    id="panel1a-header"
                  >
                    <Typography variant="h4" className="fillter-subheader">
                      Colors
                    </Typography>
                  </ExpansionPanelSummary>
                  <ExpansionPanelDetails>
                    <List>
                      <ListItem disableGutters>
                        <FormControlLabel
                          control={<Checkbox color="primary" value="red" />}
                          label={
                            <Typography
                              variant="button"
                              className="filter-checkbox-label"
                            >
                              Red
                            </Typography>
                          }
                        />
                      </ListItem>
                      <ListItem disableGutters>
                        <FormControlLabel
                          control={<Checkbox color="primary" value="black" />}
                          label={
                            <Typography
                              variant="button"
                              className="filter-checkbox-label"
                            >
                              Black
                            </Typography>
                          }
                        />
                      </ListItem>
                      <ListItem disableGutters>
                        <FormControlLabel
                          control={<Checkbox color="primary" value="Green" />}
                          label={
                            <Typography
                              variant="button"
                              className="filter-checkbox-label"
                            >
                              Green
                            </Typography>
                          }
                        />
                      </ListItem>
                    </List>
                  </ExpansionPanelDetails>
                </ExpansionPanel>
              </Box>
            </Box>
          </Grid>

          <Grid item lg={9} md={8} sm={8} xs={12} className="right-sidebar">
            <Grid container spacing={4}>
              {props.products.products &&
                props.products.products.map((product, index) => (
                  <Fragment key={index}>
                    {product.status === "Publish" && (
                      <Grid item lg={4} md={6} sm={6}>
                        <ProductCard
                          productDetail={product}
                          categories={props.products.categories}
                          index={index}
                          key={index}
                          GirdProductView={true}
                        />
                      </Grid>
                    )}
                  </Fragment>
                ))}
            </Grid>
          </Grid>
        </Grid>
      </Container>
    </Fragment>
  );
};

const mapStateToProps = (state) => {
  return {
    products: state.products,
    categories: state.categories,
  };
};

const mapDispatchToProps = {
  productsAction,
  categoriesAction,
};

export default connect(mapStateToProps, mapDispatchToProps)(Shop);
