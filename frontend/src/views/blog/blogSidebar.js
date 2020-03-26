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
  ListItemText
} from "@material-ui/core";
import SearchIcon from "@material-ui/icons/Search";
import { blogtagsAction, blogsAction } from "../../store/action/blogAction";
import { isEmpty } from "../../utils/helper";
import { connect } from "react-redux";
import { Link } from "react-router-dom";

const BlogSidebar = props => {
  useEffect(() => {
    if (isEmpty(props.blogs.blogs)) {
      props.blogsAction();
    }
  }, []);

  useEffect(() => {
    if (isEmpty(props.blogs.tags)) {
      props.blogtagsAction();
    }
  }, [props.blogs.tags]);

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
          {props.blogs.blogs &&
            props.blogs.blogs
              .sort((a, b) =>
                Date.parse("1970-01-01T" + b.date) >
                Date.parse("1970-01-01T" + a.date)
                  ? 1
                  : -1
              )
              .slice(0, 3)
              .map((blog, index) => (
                <Link to={`/blog/${blog.id}`} key={index}>
                  <ListItem button>
                    <ListItemText
                      primary={blog.title}
                      className="text-capitalize"
                    />
                  </ListItem>
                </Link>
              ))}
        </List>
      </Box>

      <Divider className="margin-top-2 margin-bottom-2" />

      <Box component="div" className="filter-wrapper">
        <Typography variant="h4" className="fillter-header">
          Tags
        </Typography>
        <Box>
          {props.blogs.tags &&
            props.blogs.tags.map((tag, index) => (
              <Link to={`/tag${tag.url}`} key={index}>
                <Chip label={tag.name} className="chips-tags" />
              </Link>
            ))}
        </Box>
      </Box>
    </Fragment>
  );
};

const mapStateToProps = state => ({
  blogs: state.blogs
});

const mapDispatchToProps = {
  blogtagsAction,
  blogsAction
};

export default connect(mapStateToProps, mapDispatchToProps)(BlogSidebar);
