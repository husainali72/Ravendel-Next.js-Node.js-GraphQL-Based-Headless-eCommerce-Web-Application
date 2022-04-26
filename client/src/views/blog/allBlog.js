import React, { Fragment, useEffect, useState } from "react";
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
  TablePagination,
  IconButton,
  Avatar,
  Button,
} from "@material-ui/core";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { blogsAction, blogDeleteAction } from "../../store/action";
import jumpTo from "../../utils/navigation";
import { isEmpty, bucketBaseURL } from "../../utils/helper";
import Alert from "../utils/Alert";
import PeopleIcon from "@material-ui/icons/People";
import DeleteIcon from "@material-ui/icons/Delete";
import EditIcon from "@material-ui/icons/Edit";
import viewStyles from "../viewStyles";
import {convertDateToStringFormat} from "../utils/convertDate";
import {Loading} from '../components';
import {client_app_route_url} from '../../utils/helper';

const AllBlog = () => {
  const classes = viewStyles();
  const dispatch = useDispatch();
  const blogs = useSelector(state => state.blogs);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  useEffect(() => {
    if (isEmpty(blogs.blogs)) {
      dispatch(blogsAction());
    }
  }, []);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = event => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  return (
    <Fragment>
      <Alert />
      <Grid container spacing={4} className={classes.mainrow}>
        <Grid item lg={12}>
          <Card>
            {blogs.loading ? <Loading /> : null}

            <CardHeader
              action={
                <Link to={`${client_app_route_url}add-blog`}>
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
                <Table
                  stickyHeader
                  aria-label="blogs-table"
                  size="small"
                >
                  <TableHead>
                    <TableRow>
                      <TableCell className={classes.avtarTd}>
                        <PeopleIcon />
                      </TableCell>
                      <TableCell>Title</TableCell>
                      <TableCell>Status</TableCell>
                      <TableCell>Date</TableCell>
                      <TableCell>Actions</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {blogs.blogs
                      .slice(
                        page * rowsPerPage,
                        page * rowsPerPage + rowsPerPage
                      )
                      .map(blog => (
                        <TableRow key={blog.id} hover>
                          <TableCell>
                            <Avatar
                              alt={blog.name}
                              src={`${bucketBaseURL}${
                                blog.feature_image &&
                                blog.feature_image.thumbnail
                              }`}
                            />
                          </TableCell>
                          <TableCell>{blog.title}</TableCell>
                          <TableCell>{blog.status}</TableCell>
                          <TableCell>{convertDateToStringFormat(blog.date)}</TableCell>
                          <TableCell>
                            <IconButton
                              aria-label="Edit"
                              onClick={() => jumpTo(`${client_app_route_url}edit-blog/${blog.id}`)}
                            >
                              <EditIcon />
                            </IconButton>
                            <IconButton
                              aria-label="Delete"
                              className={classes.deleteicon}
                              onClick={() => dispatch(blogDeleteAction(blog.id))}
                              disabled
                            >
                              <DeleteIcon />
                            </IconButton>
                          </TableCell>
                        </TableRow>
                      ))}
                  </TableBody>
                </Table>
              </TableContainer>
              <TablePagination
                rowsPerPageOptions={[5, 10, 20]}
                component="div"
                count={blogs.blogs.length}
                rowsPerPage={rowsPerPage}
                page={page}
                onChangePage={handleChangePage}
                onChangeRowsPerPage={handleChangeRowsPerPage}
              />
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Fragment>
  );
};

export default AllBlog;
