import React, { useState, useEffect } from "react";
import {
  Grid,
  Box,
  FormControlLabel,
  Checkbox,
  Collapse,
} from "@material-ui/core";
import AddCircleRoundedIcon from "@material-ui/icons/AddCircleRounded";
import RemoveCircleRoundedIcon from "@material-ui/icons/RemoveCircleRounded";
import FiberManualRecordTwoToneIcon from "@material-ui/icons/FiberManualRecordTwoTone";
import { useSelector, useDispatch } from "react-redux";
import { unflatten } from "../../../utils/helper";
import { categoriesAction } from "../../../store/action/";
import _, { indexOf } from "lodash";

const CategoriesComponent = ({ onCategoryChange }) => {
  const dispatch = useDispatch();
  const products = useSelector((state) => state.products);
  const [collapseCategory, setcollapseCategory] = useState({});
  const [productCats, setproductCats] = useState([]);

  useEffect(() => {
    dispatch(categoriesAction());
  }, []);

  useEffect(() => {
    if (products.categories && products.categories.length) {
      setproductCats(_.cloneDeep(products.categories));
    }
  }, [products.categories, products.products]);

  const collapseToggle = (category) => {
    category.open = !category.open;
    setcollapseCategory({ ...collapseCategory, [category.id]: category.open });
  };

  const handleCategeryCheckbox = (category) => {
    category.checked = !category.checked;
    var items = document.getElementsByName("categoryIds");
    var selectedItems = [];
    for (let i in items) {
      if (items[i].type === "checkbox" && items[i].checked === true)
        selectedItems.push(items[i].value);
    }
    onCategoryChange(selectedItems);
  };

  const checkedChildernChecked = (cat) => {
    var checked = cat.children.filter((child) => child.checked === true);
    if (!cat.checked) {
      if (checked.length) {
        return true;
      } else {
        return false;
      }
    } else {
      return false;
    }
  };

  const menuListing = (categories) => {
    return categories.map((cat) => {
      if (!cat.children.length) {
        return (
          <Grid container alignItems='center' key={cat.name}>
            <Grid item>
              <Box mr={2}>
                <FiberManualRecordTwoToneIcon />
              </Box>
            </Grid>
            <Grid item>
              <FormControlLabel
                control={
                  <Checkbox
                    color='primary'
                    checked={cat.checked}
                    name='categoryIds'
                    onChange={(e) => handleCategeryCheckbox(cat)}
                    value={cat.id}
                  />
                }
                label={cat.name}
              />
            </Grid>
          </Grid>
        );
      }
      return (
        <Grid key={cat.name}>
          <Grid container alignItems='center' className='category-dropdown'>
            <Grid item>
              <Box mr={2}>
                <span
                  className='toggle-icon'
                  onClick={() => collapseToggle(cat)}
                >
                  {collapseCategory[cat.id] ? (
                    <RemoveCircleRoundedIcon
                      style={{ fontSize: 22 }}
                      className='expand-right'
                    />
                  ) : (
                    <AddCircleRoundedIcon
                      style={{ fontSize: 22 }}
                      className='expand-right'
                    />
                  )}
                </span>
              </Box>
            </Grid>
            <Grid item>
              <FormControlLabel
                control={
                  <Checkbox
                    color='primary'
                    checked={cat.checked}
                    name='categoryIds'
                    onChange={(e) => handleCategeryCheckbox(cat)}
                    value={cat.id}
                    indeterminate={checkedChildernChecked(cat)}
                  />
                }
                label={cat.name}
              />
            </Grid>
          </Grid>
          <Box ml={4}>
            <Collapse
              in={collapseCategory[cat.id]}
              timeout='auto'
              unmountOnExit
              className='submenu-sidebar'
            >
              {menuListing(cat.children)}
            </Collapse>
          </Box>
        </Grid>
      );
    });
  };

  return <>{menuListing(unflatten(productCats))}</>;
};

export default CategoriesComponent;
