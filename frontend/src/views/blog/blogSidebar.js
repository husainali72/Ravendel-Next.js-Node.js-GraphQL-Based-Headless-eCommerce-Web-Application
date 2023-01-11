import React, { Fragment, useEffect } from "react";
import {
  Typography,
  Box,
  FormControl,
  InputAdornment,
  InputLabel,
  Input,
  Divider,
  Chip,
  List,
  ListItem,
  ListItemText,
} from"@mui/material";
import SearchIcon from "@material-ui/icons/Search";
import { blogtagsAction, blogsAction } from "../../store/action/blogAction";
import { isEmpty } from "../../utils/helper";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import {app_router_base_url} from '../../utils/helper';

const BlogSidebar = () => {
  const dispatch = useDispatch();
  const blogs = useSelector((state) => state.blogs);

  useEffect(() => {
    if (isEmpty(blogs.blogs)) {
      dispatch(blogsAction());
    }

    if (isEmpty(blogs.tags)) {
      dispatch(blogtagsAction());
    }
  }, []);

  return (
    <Fragment>
      <Box component="div" className="filter-wrapper">
        <FormControl className="width-100">
          <InputLabel htmlFor="search-input">Search</InputLabel>
          <Input
            id="search-input"
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
          Recent Blogs
        </Typography>
        <List component="nav" aria-label="recents-blogs">
          {blogs.blogs.lenght > 0 ?
            blogs.blogs
              .sort((a, b) =>
                Date.parse("1970-01-01T" + b.date) >
                Date.parse("1970-01-01T" + a.date)
                  ? 1
                  : -1
              )
              .slice(0, 3)
              .map((blog, index) => (
                <Link to={`${app_router_base_url}blog/${blog.id}`} key={index}>
                  <ListItem button>
                    <ListItemText
                      primary={blog.title}
                      className="text-capitalize"
                    />
                  </ListItem>
                </Link>
              )) : (
                <Typography variant="body2">
                  No recent blogs found
                </Typography>
              )}
        </List>
      </Box>

      <Divider className="margin-top-2 margin-bottom-2" />

      <Box component="div" className="filter-wrapper">
        <Typography variant="h4" className="fillter-header">
          Tags
        </Typography>
        <Box>
          {blogs.tags.lenght > 0 ? (
            blogs.tags.map((tag, index) => (
              <Link to={`${app_router_base_url}tag${tag.url}`} key={index}>
                <Chip label={tag.name} className="chips-tags" />
              </Link>
            ))
          ) : (
            <Typography variant="body2">
              No tags found
            </Typography>
          )}
        </Box>
      </Box>
    </Fragment>
  );
};

export default BlogSidebar;
