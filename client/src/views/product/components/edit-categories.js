import React, { useState, useEffect, useCallback } from "react";
import { Grid, Box, FormControlLabel, Checkbox, Collapse } from "@mui/material";
import AddCircleRoundedIcon from "@mui/icons-material/AddCircleRounded";
import RemoveCircleRoundedIcon from "@mui/icons-material/RemoveCircleRounded";
import FiberManualRecordTwoToneIcon from "@mui/icons-material/FiberManualRecordTwoTone";
import { useSelector, useDispatch } from "react-redux";
import { unflatten } from "../../../utils/helper";
import { categoriesAction } from "../../../store/action";

const EditCategoriesComponent = ({ onCategoryChange, selectedCategories }) => {
  const dispatch = useDispatch();
  const products = useSelector((state) => state.products);
  const [catList, setCatList] = useState([]);
  const [collapseCategory, setcollapseCategory] = useState({});
  const [checkedCategory, setCheckedCategory] = useState([]);
   // Function to update children's checked status recursively
  const updateChildrenChecked = (children, checked) => {
    return children.map((child) => {
      const updatedChild = { ...child, checked };
      if (child.children && child.children.length > 0) {
        updatedChild.children = updateChildrenChecked(child.children, checked);
      }
      return updatedChild;
    });
  };

  useEffect(() => {
    dispatch(categoriesAction());
  }, []);
  useEffect(() => {
    if (products?.categories?.length) {
      let selectedCat = JSON.parse(JSON.stringify(products.categories))?.map(
        (cat) => ({
          ...cat,
          checked:
            checkedCategory?.find((checkedCat) => checkedCat?.id === cat?.id)
              ?.checked || false,
        })
      );
      let allCheckedCategory = [];
      if (!checkedCategory || checkedCategory.length === 0) {
        if (selectedCategories && selectedCategories.length > 0) {
          selectedCategories.forEach((selected) => {
            let foundCat = selectedCat?.find((cat) => cat?.id === selected?.id);
            if (foundCat) {
              if (selected?.checked) {
                allCheckedCategory.push(selected);
              }
              foundCat.checked = selected?.checked || false;
            }
          });
        } else {
          selectedCat.forEach((cat) => {
            cat.checked = false;
          });
        }
        setCheckedCategory([...allCheckedCategory]);
      }
      let updatedCategory = unflatten(selectedCat);
      updatedCategory = updatedCategory?.map((singleCategory) => {
        if (singleCategory.checked && singleCategory.children?.length > 0) {
          const singleselectedCategory = selectedCategories?.find(
            (item) => item?.id === singleCategory?.id
          );
          if (singleselectedCategory?.checked) {
            // Update all children
            const updatedChildren = updateChildrenChecked(
              singleCategory.children,
              selectedCategories
            );
            // Create a new object with updated children
            const updatedCategoryWithChildren = {
              ...singleCategory,
              children: updatedChildren,
            };
            // Update parent
            updatedCategoryWithChildren.checked =
              singleselectedCategory.checked;
            return updatedCategoryWithChildren;
          }
        }
        return singleCategory;
      });
      setCatList(updatedCategory);
    }
  }, [products.categories, selectedCategories, checkedCategory]);

// Function to handle collapse/expand of categories
  const collapseToggle = (category) => {
    const updatedCollapseCategory = { ...collapseCategory };
    let selectedCategory = checkedCategory;
    const updateParentsCollapseState = (cat) => {
      updatedCollapseCategory[cat?.id] = true;
      if (!selectedCategory?.some((item) => item?.id === cat?.id)) {
        selectedCategory.push(cat);
      }
      setCheckedCategory(selectedCategory);
      if (cat.parentId) {
        const parentCategory = flattenParentCategories(catList)?.find(
          (parent) => parent?.id === cat?.parentId
        );
        if (parentCategory) {
          updateParentsCollapseState(parentCategory);
        }
      }
    };
    updateParentsCollapseState(category);
    setcollapseCategory(updatedCollapseCategory);
  };

  const updateChildCategories = (cat, isChecked) => {
    let selectedCategory = checkedCategory;
    cat?.children.forEach((child) => {
      child.checked = isChecked;
      if (isChecked) {
        if (!selectedCategory?.some((item) => item.id === child.id)) {
          selectedCategory.push(child);
        } else {
          let index = selectedCategory.findIndex(
            (item) => item?.id === child?.id
          );
          selectedCategory[index].checked = isChecked;
        }
      } else if (!isChecked) {
        selectedCategory = selectedCategory.filter((item) => {
          if (item?.id === child?.id) {
            item.checked = false;
            return false;
          }
          return true;
        });
      }
      if (child?.children?.length) {
        updateChildCategories(child, isChecked);
      }
    });
    setCheckedCategory(selectedCategory);
  };
  const flattenParentCategories = (categories, parentName = null) => {
    return categories.reduce((flattened, category) => {
      const flatCategory = {
        id: category?.id,
        name: category?.name,
        parentId: parentName,
        url: category.url,
        description: category.description,
        image: category.image,
        meta: category.meta,
        date: category.date,
        updated: category.updated,
        __typename: category.__typename,
        checked: category.checked,
        children: category.children,
      };

      flattened.push(flatCategory);

      if (category.children && category.children.length > 0) {
        flattened.push(
          ...flattenParentCategories(category.children, category.id)
        );
      }

      return flattened;
    }, []);
  };
  const flattenChildCategories = (category) => {
    let result = [];
    if (category?.children && category?.children?.length) {
      category?.children?.forEach((child) => {
        result.push(child);
        result = result.concat(flattenChildCategories(child));
      });
    }
    return result;
  };
const handleCategoryCheckbox = (category) => {
    const updatedCategory = { ...category, checked: !category.checked };
    let updatedCategories = catList.map((cat) => {
      return cat.id === category.id ? updatedCategory : cat;
    });
    let updatedList = [];

    if (updatedCategory.checked) {
      updateChildCategories(updatedCategory, true);
    } else {
      updateChildCategories(updatedCategory, false);
    }
    let newCheckedCategory = checkedCategory.filter((item) => {
      return item.id !== category.id;
    });
    if (!updatedCategory.checked && category.parentId) {
      const uncheckParentCategories = (categoryId) => {
        const flattenedCategories = flattenParentCategories(catList);
        const parentCategory = flattenedCategories?.find(
          (parent) => parent.id === categoryId
        );
        if (parentCategory) {
          const updatedParent = { ...parentCategory, checked: false };
          newCheckedCategory = newCheckedCategory?.map((item) => {
            if (item?.id === updatedParent?.id) {
              return { ...item, checked: false }; // Update checked status to false
            } else {
              return item; // Keep other items unchanged
            }
          });
          updatedList = updatedCategories.map((cat) =>
            cat.id === parentCategory.id ? updatedParent : cat
          );
          // setCatList(updatedList);

          if (parentCategory.parentId) {
            uncheckParentCategories(parentCategory.parentId);
          }
        }
      };
      if (!updatedCategory.checked) {
        uncheckParentCategories(category.parentId);
      }
    }
    setCatList(updatedCategories);

    if (
      updatedCategory.checked &&
      category?.children?.length &&
      hasCheckedChild(category)
    ) {
      newCheckedCategory.push({ ...updatedCategory });
    } else if (!category?.children?.length && updatedCategory?.checked) {
      newCheckedCategory.push({ ...updatedCategory });
    }

    if (updatedCategory.checked && category.parentId) {
      const flattenedCategories = flattenParentCategories(catList);
      const uncheckParentCategories = (parentId) => {
        if (!parentId) return;
        const parentCategory = flattenedCategories?.find(
          (parent) => parent.id === parentId
        );
        if (
          parentCategory &&
          !newCheckedCategory?.some((item) => item.id === parentCategory?.id)
        ) {
          newCheckedCategory.push(parentCategory);
          uncheckParentCategories(parentCategory.parentId);
        } else if (parentCategory?.parentId) {
          uncheckParentCategories(parentCategory.parentId);
        }
      };
      const updateCheckedStatus = (categories, parentId) => {
        return categories.map((category) => {
          if (category.id === parentId) {
            return { ...category, checked: true };
          } else if (category.children && category.children.length > 0) {
            const updatedChildren = updateCheckedStatus(
              category.children,
              parentId
            );
            return { ...category, children: updatedChildren };
          }
          return category;
        });
      };
      const checkParentCategories = (parentId, allUpdatedCategories) => {
        const flattenedParentCategories =
          flattenParentCategories(allUpdatedCategories);
        const parentCategory = flattenedParentCategories?.find(
          (parent) => parent.id === parentId
        );
        if (parentCategory && parentCategory?.children?.length > 0) {
          const allNotChildrenChecked = parentCategory.children.some(
            (child) => {
              return child?.id === updatedCategory?.id
                ? !updatedCategory?.checked
                : !child.checked;
            }
          );
          if (!allNotChildrenChecked) {
            updatedCategories = updateCheckedStatus(
              updatedCategories,
              parentId
            );
            setCatList(updatedCategories);
            newCheckedCategory = newCheckedCategory?.map((newcategory) => {
              if (newcategory?.id === parentId) {
                return { ...newcategory, checked: true };
              }
              return newcategory;
            });
            if (parentCategory.parentId) {
              checkParentCategories(parentCategory.parentId, updatedCategories);
            }
          }
        }
      };

      checkParentCategories(category.parentId, updatedCategories);
      uncheckParentCategories(category.parentId);
    }

    const flattenedCategories = flattenChildCategories(category);
    if (!updatedCategory.checked && category.children.length > 0) {
      newCheckedCategory = newCheckedCategory.filter((item) => {
        return !flattenedCategories.some((child) => child.id === item.id);
      });
    }
    newCheckedCategory = newCheckedCategory.filter((child) => {
      if (child?.checked && child?.children?.length) {
        return hasCheckedChild(child);
      } else {
        return true;
      }
    });
    setCheckedCategory(newCheckedCategory);
    onCategoryChange(newCheckedCategory);
  };
  const hasCheckedChild = (cat) => {
    if (cat.checked) {
      return true;
    }
    if (cat?.children && Array.isArray(cat.children)) {
      for (const child of cat.children) {
        if (hasCheckedChild(child)) {
          return true;
        }
      }
    }
    return false;
  };
  const checkedChildernChecked = (cat) => {
    var checked = hasCheckedChild(cat);
    if (!cat.checked) {
      if (checked) {
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
      if (!cat?.children?.length) {
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
                    onChange={(e) => handleCategoryCheckbox(cat)}
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
                    <>
                      <RemoveCircleRoundedIcon
                        style={{ fontSize: 22 }}
                        className="expand-right"
                      />
                    </>
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
                    onChange={(e) => handleCategoryCheckbox(cat)}
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
              {menuListing(cat?.children)}
            </Collapse>
          </Box>
        </Grid>
      );
    });
  };
  return <>{catList && catList.length ? menuListing(catList) : null}</>;
};

export default EditCategoriesComponent;
