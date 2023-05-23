import React, { useState, useEffect } from "react";
import { Grid, Box, FormControlLabel, Checkbox, Collapse } from "@mui/material";
import AddCircleRoundedIcon from "@mui/icons-material/AddCircleRounded";
import RemoveCircleRoundedIcon from "@mui/icons-material/RemoveCircleRounded";
import FiberManualRecordTwoToneIcon from "@mui/icons-material/FiberManualRecordTwoTone";
import { useSelector, useDispatch } from "react-redux";
import { unflatten } from "../../../utils/helper";
import { categoriesAction } from "../../../store/action";
import _, { indexOf } from "lodash";

const EditCategoriesComponent = ({ onCategoryChange, selectedCategories }) => {
  const dispatch = useDispatch();
  const products = useSelector((state) => state.products);
  const [catList, setCatList] = useState([]);
  const [collapseCategory, setcollapseCategory] = useState({});

  useEffect(() => {
    dispatch(categoriesAction());
  }, []);

  useEffect(() => {
    if (products.categories.length && selectedCategories.length) {
      var selectedCat = JSON.parse(JSON.stringify(products.categories));
      if (selectedCat && selectedCat.length) {
        selectedCat.map((cat) => {
          if (~selectedCategories.indexOf(cat.id)) {
            cat.checked = true;
          } else {
            cat.checked = false;
          }
        });
        setCatList(unflatten(selectedCat));
      }
    }
  }, [products.categories, selectedCategories]);

  const collapseToggle = (category) => {
    category.open = !category.open;
    setcollapseCategory({ ...collapseCategory, [category.id]: category.open });
  };

  const handleCategeryCheckbox = (category) => {
    category.checked = !category.checked;
    var items = selectedCategories
    if (category.checked) {
      items.push(category.id)
    } else {
      items = items.filter((value) => value !== category.id)
    }
    onCategoryChange(items);
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
          <Grid container alignItems="center" key={cat.name}>
            <Grid item>
              <Box mr={2}>
                <FiberManualRecordTwoToneIcon />
              </Box>
            </Grid>
            <Grid item>
              <FormControlLabel
                control={
                  <Checkbox
                    color="primary"
                    checked={cat.checked}
                    name="categoryIds"
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
          <Grid container alignItems="center" className="category-dropdown">
            <Grid item>
              <Box mr={2}>
                <span
                  className="toggle-icon"
                  onClick={() => collapseToggle(cat)}
                >
                  {collapseCategory[cat.id] ? (
                    <RemoveCircleRoundedIcon
                      style={{ fontSize: 22 }}
                      className="expand-right"
                    />
                  ) : (
                    <AddCircleRoundedIcon
                      style={{ fontSize: 22 }}
                      className="expand-right"
                    />
                  )}
                </span>
              </Box>
            </Grid>
            <Grid item>
              <FormControlLabel
                control={
                  <Checkbox
                    color="primary"
                    checked={cat.checked}
                    name="categoryIds"
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
              timeout="auto"
              unmountOnExit
              className="submenu-sidebar"
            >
              {menuListing(cat.children)}
            </Collapse>
          </Box>
        </Grid>
      );
    });
  };

  return <>{catList && catList.length ? menuListing(catList) : null}</>;
};

export default EditCategoriesComponent;
