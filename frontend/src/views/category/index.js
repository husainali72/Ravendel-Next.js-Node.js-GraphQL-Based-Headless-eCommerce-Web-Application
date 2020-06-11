import React, { Fragment, useState, useEffect } from "react";
import PageTitle from "../components/pageTitle";
import ProductCard from "../components/productcard";
import { connect } from "react-redux";
import {
  productsAction,
  catProductAction,
} from "../../store/action/productAction";
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
  Icon,
  ExpansionPanel,
  ExpansionPanelSummary,
  ExpansionPanelDetails,
  Checkbox,
  FormControlLabel,
} from "@material-ui/core";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import { isEmpty } from "../../utils/helper";
import Loading from "../components/loading";
import { Helmet } from "react-helmet";

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

const Category = (props) => {
  const [catName, setCatName] = useState("");
  const [priceRange, ssetPriceRange] = React.useState([20, 37]);
  const [categoryDetail, setCategoryDetail] = useState({
    name: "",
    products: [],
    image: {},
    description: "",
    meta: {
      title: "",
      keywords: "",
      description: "",
    },
  });

  useEffect(() => {
    if (isEmpty(props.products.products)) {
      props.productsAction();
    }
  }, []);

  useEffect(() => {
    props.catProductAction(`${props.match.params.url}`);
  }, [props.match.params.url]);

  useEffect(() => {
    setCategoryDetail(props.products.singleCategoryDetails);
  }, [props.products.singleCategoryDetails]);

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

      {categoryDetail.meta && (
        <Helmet>
          <title>{categoryDetail.meta.title}</title>
          <meta name="description" content={categoryDetail.meta.description} />
          <meta name="keywords" content={categoryDetail.meta.keywords} />
        </Helmet>
      )}

      <PageTitle title={categoryDetail.name} />
      <Container>
        <Grid container className="margin-top-3 margin-bottom-3" spacing={4}>
          <Grid item lg={3} md={4} sm={4} xs={12} className="left-sidebar">
            <Box component="div" className="fillter-sidebar">
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
                      aria-controls="brand-content"
                      id="brand-filter-header"
                    >
                      <Typography variant="h4" className="fillter-subheader">
                        Brands
                      </Typography>
                    </ExpansionPanelSummary>
                    <ExpansionPanelDetails>
                      <List>
                        <ListItem disableGutters>
                          <FormControlLabel
                            control={
                              <Checkbox color="primary" value="brand1" />
                            }
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
                            control={
                              <Checkbox color="primary" value="brand2" />
                            }
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
                            control={
                              <Checkbox color="primary" value="brand3" />
                            }
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
                  {/* <ExpansionPanel defaultExpanded> */}
                  <ExpansionPanel>
                    <ExpansionPanelSummary
                      expandIcon={<ExpandMoreIcon />}
                      aria-controls="color-content"
                      id="color-filter-header"
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
            </Box>
          </Grid>

          <Grid item lg={9} md={8} sm={8} xs={12}>
            <Box mb={3}>
              <Typography variant="subtitle1">
                {categoryDetail.description}
              </Typography>
            </Box>

            <Grid container spacing={4} className="right-sidebar">
              {!isEmpty(categoryDetail.products) ? (
                categoryDetail.products.map((product, index) => (
                  <Grid item lg={4} md={6} sm={6} key={index}>
                    <ProductCard
                      productDetail={product}
                      index={index}
                      key={index}
                    />
                  </Grid>
                ))
              ) : (
                <Grid item md={12}>
                  <Typography variant="h3" className="text-center">
                    No Products Available
                  </Typography>
                </Grid>
              )}
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
  catProductAction,
};

export default connect(mapStateToProps, mapDispatchToProps)(Category);
