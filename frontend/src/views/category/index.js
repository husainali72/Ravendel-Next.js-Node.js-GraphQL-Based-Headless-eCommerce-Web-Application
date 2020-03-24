import React, { Fragment, useState, useEffect } from "react";
import PageTitle from "../components/pageTitle";
import ProductCard from "../components/productcard";
import { connect } from "react-redux";
import {
  productsAction,
  categoriesAction
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
  FormControlLabel
} from "@material-ui/core";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import { isEmpty } from "../../utils/helper";
import Loading from "../components/loading";

const categories = [
  {
    url: "https://colorlib.com/preview/theme/essence/img/bg-img/bg-2.jpg",
    title: "Cloths",
    width: "40%"
  },
  {
    url: "https://colorlib.com/preview/theme/essence/img/bg-img/bg-3.jpg",
    title: "Shoes",
    width: "30%"
  },
  {
    url: "https://colorlib.com/preview/theme/essence/img/bg-img/bg-4.jpg",
    title: "Accessories",
    width: "30%",
    children: [
      {
        url: "https://colorlib.com/preview/theme/essence/img/bg-img/bg-2.jpg",
        title: "Cloths Sub",
        width: "40%"
      },
      {
        url: "https://colorlib.com/preview/theme/essence/img/bg-img/bg-3.jpg",
        title: "Shoes Sub",
        width: "30%"
      }
    ]
  }
];

const Category = props => {
  const [category, setCategory] = useState({});
  const [catName, setCatName] = useState("");
  const [priceRange, ssetPriceRange] = React.useState([20, 37]);

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

  useEffect(() => {
    props.products.categories.map(cat => {
      if (cat.id === props.match.params.id) {
        setCategory({ ...cat });
      }
    });
  }, [props.match.params.id, props.products.products]);

  const priceChange = (event, newValue) => {
    ssetPriceRange(newValue);
  };

  const handleClick = title => {
    if (title === catName) {
      setCatName("");
    } else {
      setCatName(title);
    }
  };

  const categoryListing = categoriesParameter => {
    return categoriesParameter.map(cat => {
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
      <PageTitle title={category.name} />
      <Container>
        <Grid container className="margin-top-3 margin-bottom-3" spacing={4}>
          <Grid item md={12} xs={12} sm={12}>
            <Typography variant="subtitle1">
              Lorem Ipsum is simply dummy text of the printing and typesetting
              industry. Lorem Ipsum has been the industry's standard dummy text
              ever since the 1500s, when an unknown printer took a galley of
              type and scrambled it to make a type specimen book. It has
              survived not only five centuries, but also the leap into
              electronic typesetting, remaining essentially unchanged. It was
              popularised in the 1960s with the release of Letraset sheets
              containing Lorem Ipsum passages, and more recently with desktop
              publishing software like Aldus PageMaker including versions of
              Lorem Ipsum.
            </Typography>
          </Grid>

          <Grid item md={12} sm={12} xs={12}>
            <Divider />
          </Grid>

          <Grid item lg={3} md={4} sm={4} xs={12}>
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
                <ExpansionPanel defaultExpanded>
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
                <ExpansionPanel defaultExpanded>
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
          <Grid item lg={9} md={8} sm={8} xs={12}>
            {/* <Grid container spacing={4}>
              {products &&
                products.map((product, index) => (
                  <Grid item lg={4} md={6} sm={6} key={index}>
                    <ProductCard
                      productDetail={product}
                      index={index}
                      key={index}
                    />
                  </Grid>
                ))}
            </Grid> */}
          </Grid>
        </Grid>
      </Container>
    </Fragment>
  );
};

const mapStateToProps = state => {
  return {
    products: state.products,
    categories: state.categories
  };
};

const mapDispatchToProps = {
  productsAction,
  categoriesAction
};

export default connect(mapStateToProps, mapDispatchToProps)(Category);
