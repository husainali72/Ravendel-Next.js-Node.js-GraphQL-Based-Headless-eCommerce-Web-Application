import React, { useState, useEffect } from "react";
import {
  Typography,
  Box,
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
import { set } from "lodash";

import { useLocation } from "react-router-dom";

import { getQueryString } from "../../utils/helper";

import jumpTo, { go } from "../../utils/navigation";

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

const FilterSideBar = (props) => {
  const [priceRange, setPriceRange] = useState([0, 2000]);
  const [catName, setCatName] = useState("");
  const [filterToggle, setFilterToggle] = useState(false);
  const [brands, setbrands] = useState([]);
  const [FILTER_CONFIG, SET_FILTER_CONFIG] = useState({
    category: [],
    brand: [],
  });

  let location = useLocation();

  const runFilterOnChange = () => {
    let queryString = "?";
    let brandParam = [];
    FILTER_CONFIG.brand = [];
    for (let i in brands) {
      if (brands[i].checked) {
        brandParam.push(encodeURIComponent(brands[i].name));
        FILTER_CONFIG.brand.push(brands[i].id);
      }
    }

    if (brandParam.length) {
      queryString += `brand=${brandParam.join(",")}`;
    }

    jumpTo(`${location.pathname}${queryString}`);
    props.getfilteredProducts(FILTER_CONFIG);
  };

  useEffect(() => {
    if (props.brands.length && props.currentCat) {
      FILTER_CONFIG.category = [props.currentCat];
      let url_brands = getQueryString(location.search, "brand");
      FILTER_CONFIG.brand = [];
      if (url_brands) {
        for (let single_param of url_brands.split(",")) {
          for (let brand of props.brands) {
            if (brand.name === single_param) {
              brand.checked = true;
              FILTER_CONFIG.brand.push(brand.id);
              break;
            }
          }
        }
      }

      setbrands(props.brands);
      props.getfilteredProducts(FILTER_CONFIG);
    }
  }, [props.brands, props.currentCat]);

  const filterBrand = (e, i) => {
    brands[i].checked = e.target.checked;
    runFilterOnChange();
    setbrands(brands);
  };

  const priceChange = (event, newValue) => {
    setPriceRange(newValue);
    if (props.onPriceChange) {
      props.onPriceChange(newValue);
    }
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

  const openFillters = () => {
    var element = document.getElementsByClassName("left-sidebar")[0];
    if (element.classList.contains("open-left-sidebar")) {
      element.classList.remove("open-left-sidebar");
      setFilterToggle(false);
    } else {
      element.classList.add("open-left-sidebar");
      setFilterToggle(true);
    }
  };

  return (
    <Box component="div" className="fillter-sidebar">
      <p className="filterheading-mobile" onClick={openFillters}>
        <span>Fillters</span>
        <span>
          <Icon className="fillter-toggle-butn">
            {filterToggle ? "keyboard_arrow_down" : "keyboard_arrow_up"}
          </Icon>
        </span>
      </p>
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
            min={0}
            max={500}
            step={10}
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
                {brands.map((brand, i) => (
                  <ListItem disableGutters key={brand.id}>
                    <FormControlLabel
                      control={
                        <Checkbox
                          color="primary"
                          checked={brand.checked}
                          onChange={(e) => filterBrand(e, i)}
                        />
                      }
                      label={
                        <Typography
                          variant="button"
                          className="filter-checkbox-label"
                        >
                          {brand.name}
                        </Typography>
                      }
                    />
                  </ListItem>
                ))}
              </List>
            </ExpansionPanelDetails>
          </ExpansionPanel>
        </Box>
        <Divider />
        <Box component="div" className="filter-wrapper">
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
  );
};

export default FilterSideBar;
