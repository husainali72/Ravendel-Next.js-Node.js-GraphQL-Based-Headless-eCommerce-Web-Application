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
import { getQueryString, isEmpty } from "../../utils/helper";
import jumpTo, { go } from "../../utils/navigation";
import { useSelector } from "react-redux";

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
  const [attributes, setattributes] = useState([]);

  const [FILTER_CONFIG, SET_FILTER_CONFIG] = useState({
    category: [],
    brand: [],
    attribute: [],
  });

  let location = useLocation();

  const runFilterOnChange = () => {
    let queryString = "?";
    let brandQueryString = "";
    let brandParam = [];
    FILTER_CONFIG.brand = [];

    for (let i in brands) {
      if (brands[i].checked) {
        brandParam.push(encodeURIComponent(brands[i].name));
        FILTER_CONFIG.brand.push(brands[i]._id);
      }
    }

    if (brandParam.length) {
      brandQueryString += `Brand=${brandParam.join(",")}`;
    }

    FILTER_CONFIG.attribute = [];
    let attributeParam = [];
    let attrQueryString = [];
    for (let attr of attributes) {
      attributeParam = [];
      for (let val of attr.values) {
        if (val.checked) {
          attributeParam.push(encodeURIComponent(val.name));
          //FILTER_CONFIG.attribute.push(val.id);
          FILTER_CONFIG.attribute.push({
            attribute_id: attr.id,
            attribute_value_id: val.id,
          });
        }
      }

      if (attributeParam.length) {
        attrQueryString.push(
          `${encodeURIComponent(attr.name)}=${attributeParam.join(",")}`
        );
      }
    }

    if (brandQueryString) {
      queryString += brandQueryString;
      if (attrQueryString.length) {
        queryString += "&" + attrQueryString.join("&");
      }
    } else {
      queryString += attrQueryString.join("&");
    }

    jumpTo(`${location.pathname}${queryString}`);
    props.getfilteredProducts(FILTER_CONFIG);
  };

  const attributeValues = [];
  useEffect(() => {
    if (props.currentCat) {
      FILTER_CONFIG.category = [props.currentCat];
      let url_brands = getQueryString(location.search, "Brand");

      FILTER_CONFIG.brand = [];

      if (url_brands) {
        url_brands = url_brands.split(",");
      } else {
        url_brands = [];
      }

      for (let brand of props.filter_brands) {
        if (~url_brands.indexOf(brand.brandMaster.name)) {
          brand.brandMaster.checked = true;
          FILTER_CONFIG.brand.push(brand.brandMaster._id);
        }

        brand.brandMaster.checked = brand.brandMaster.checked || false;
        brands.push(brand.brandMaster);
      }

      let attributeObj = {};
      if (props.filtered_attributes.length) {
        for (const attr_data of props.filtered_attributes) {
          attributeValues.push(attr_data._id.attribute_value_id);
          attributeObj[attr_data._id.attribute_id] = {
            id: attr_data.attributeMaster._id,
            name: attr_data.attributeMaster.name,
            values: attr_data.attributeMaster.values,
          };
        }

        for (let attr_obj of Object.values(attributeObj)) {
          let is_param = [];
          let attribute_Obj = {
            id: attr_obj.id,
            name: attr_obj.name,
            values: [],
          };

          is_param = getQueryString(location.search, attr_obj.name);
          if (is_param) {
            is_param = is_param.split(",");
          } else {
            is_param = [];
          }

          for (let val of attr_obj.values) {
            if (~attributeValues.indexOf(val._id)) {
              if (~is_param.indexOf(val.name)) {
                val.checked = true;
                //FILTER_CONFIG.attribute.push(val._id);
                FILTER_CONFIG.attribute.push({
                  attribute_id: attr_obj.id,
                  attribute_value_id: val._id,
                });
              }

              attribute_Obj.values.push({
                id: val._id,
                name: val.name,
                checked: val.checked || false,
              });
            }
          }

          attributes.push(attribute_Obj);
        }

        setattributes(attributes);
      }

      setbrands(brands);
      props.getfilteredProducts(FILTER_CONFIG);
    }
  }, [props.currentCat]);

  const filterBrand = (e, i) => {
    brands[i].checked = e.target.checked;
    runFilterOnChange();
    setbrands(brands);
  };

  const filterAttribute = (e, p, i) => {
    attributes[p].values[i].checked = e.target.checked;
    runFilterOnChange();
    setattributes(attributes);
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
                  <ListItem disableGutters key={brand._id}>
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
          {attributes.map((attr, p) => (
            <ExpansionPanel key={attr.id}>
              <ExpansionPanelSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls="color-content"
                id="color-filter-header"
              >
                <Typography variant="h4" className="fillter-subheader">
                  {attr.name}
                </Typography>
              </ExpansionPanelSummary>
              <ExpansionPanelDetails>
                <List>
                  {attr.values.map((val, i) => (
                    <ListItem disableGutters key={val.id}>
                      <FormControlLabel
                        control={
                          <Checkbox
                            color="primary"
                            checked={val.checked}
                            onChange={(e) => filterAttribute(e, p, i)}
                          />
                        }
                        label={
                          <Typography
                            variant="button"
                            className="filter-checkbox-label"
                          >
                            {val.name}
                          </Typography>
                        }
                      />
                    </ListItem>
                  ))}
                </List>
              </ExpansionPanelDetails>
            </ExpansionPanel>
          ))}
        </Box>
      </Box>
    </Box>
  );
};

export default FilterSideBar;
