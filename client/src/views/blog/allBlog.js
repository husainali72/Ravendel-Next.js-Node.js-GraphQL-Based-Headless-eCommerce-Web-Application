import React, { Fragment, useEffect } from "react";
import {
  Grid,
  Card,
  CardHeader,
  CardContent,
  Divider,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  TableContainer,
  IconButton,
  Avatar,
  Button,
  Backdrop,
  CircularProgress
} from "@material-ui/core";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { blogsAction, blogDeleteAction } from "../../store/action";
import jumpTo from "../../utils/navigation";
import { isEmpty } from "../../utils/helper";
import Alert from "../utils/Alert";
import PeopleIcon from "@material-ui/icons/People";
import DeleteIcon from "@material-ui/icons/Delete";
import EditIcon from "@material-ui/icons/Edit";
import palette from "../../theme/palette";
import { makeStyles } from "@material-ui/styles";

const useStyles = makeStyles(theme => ({
  mainrow: {
    padding: theme.spacing(4)
  },
  deleteicon: {
    color: palette.error.dark
  },
  avatar: {
    width: "50px",
    height: "50px",
    borderRadius: "100%"
  },
  addUserBtn: {
    background: palette.success.main,
    color: "#fff"
  },
  backdrop: {
    zIndex: theme.zIndex.drawer + 1,
    color: "#fff"
  },
  avtarTd: {
    width: "50px"
  },
  container: {
    maxHeight: 440
  }
}));

const AllBlog = props => {
  const classes = useStyles();

  useEffect(() => {
    if (isEmpty(props.blogs.blogs)) {
      props.blogsAction();
    }
  }, []);

  return (
    <Fragment>
      <Alert />
      <Grid container spacing={4} className={classes.mainrow}>
        <Grid item lg={12}>
          <Card>
            {props.blogs.loading && (
              <Backdrop className={classes.backdrop} open={true}>
                <CircularProgress color="inherit" /> Loading
              </Backdrop>
            )}

            <CardHeader
              action={
                <Link to="/add-blog">
                  <Button
                    color="primary"
                    className={classes.addUserBtn}
                    size="small"
                    variant="contained"
                  >
                    Add Blog
                  </Button>
                </Link>
              }
              title="All Blogs"
            />
            <Divider />
            <CardContent>
              <TableContainer className={classes.container}>
                <Table>
                  <TableHead>
                    <TableRow>
                      <TableCell className={classes.avtarTd}>
                        <PeopleIcon />
                      </TableCell>
                      <TableCell>Title</TableCell>
                      <TableCell>Date</TableCell>
                      <TableCell>Actions</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {props.blogs.blogs.map(blog => (
                      <TableRow key={blog.id}>
                        <TableCell>
                          <Avatar
                            alt={blog.name}
                            src={
                              blog.feature_image && blog.feature_image.thumbnail
                            }
                          />
                        </TableCell>
                        <TableCell>{blog.title}</TableCell>
                        <TableCell>{blog.date}</TableCell>
                        <TableCell>
                          <IconButton
                            aria-label="Edit"
                            onClick={() => jumpTo(`edit-blog/${blog.id}`)}
                          >
                            <EditIcon />
                          </IconButton>
                          <IconButton
                            aria-label="Delete"
                            className={classes.deleteicon}
                            onClick={() => props.blogDeleteAction(blog.id)}
                          >
                            <DeleteIcon />
                          </IconButton>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Fragment>
  );
};

const mapStateToProps = state => {
  return { blogs: state.blogs };
};

const mapDispatchToProps = {
  blogsAction,
  blogDeleteAction
};

export default connect(mapStateToProps, mapDispatchToProps)(AllBlog);
