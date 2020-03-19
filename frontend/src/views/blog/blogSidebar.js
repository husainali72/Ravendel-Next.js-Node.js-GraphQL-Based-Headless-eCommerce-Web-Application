import React, { Fragment, useState } from "react";
import {
  Typography,
  Box,
  Icon,
  ListItem,
  List,
  Collapse,
  FormControl,
  InputAdornment,
  InputLabel,
  Input,
  Divider
} from "@material-ui/core";
import SearchIcon from "@material-ui/icons/Search";

const BlogSidebar = () => {
  const [catName, setCatName] = useState("");

  var categories = {
    category: [
      {
        name: "Tag First"
      },
      {
        name: "Tag Second"
      },
      {
        name: "Tag Third",
        children: [
          {
            name: "Sub Tag 1"
          },
          {
            name: "Sub Tag 2"
          },
          {
            name: "Sub Tag 3"
          }
        ]
      }
    ]
  };

  const handleKeyPress = e => {
    if (e.key === "Enter") {
      console.log("Enter pressed");
    }
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
            <Box
              display="flex"
              justifyContent="space-between"
              className="width-100"
            >
              <Typography variant="button" className="category-fillter">
                {cat.name}
              </Typography>
              <Icon>
                {catName === cat.name
                  ? "keyboard_arrow_up"
                  : "keyboard_arrow_down"}
              </Icon>
            </Box>
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
      <Box component="div" className="filter-wrapper">
        <FormControl className="width-100">
          <InputLabel htmlFor="search-input">Search</InputLabel>
          <Input
            id="search-input"
            onKeyPress={handleKeyPress}
            startAdornment={
              <InputAdornment position="start">
                <SearchIcon />
              </InputAdornment>
            }
          />
        </FormControl>
      </Box>
      <Divider className="margin-top-2 margin-bottom-2" />
      <Box component="div" className="filter-wrapper">
        <Typography variant="h4" className="fillter-header">
          Tags
        </Typography>
        <List component="nav" dense>
          {categoryListing(categories.category)}
        </List>
      </Box>
    </Fragment>
  );
};

export default BlogSidebar;
