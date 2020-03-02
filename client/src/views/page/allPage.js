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
  TablePagination,
  TableContainer,
  IconButton,
  Avatar,
  Button,
  Tooltip
} from "@material-ui/core";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { blogsAction, blogDeleteAction } from "../../store/action";
import jumpTo from "../../utils/navigation";
import { isEmpty } from "../../utils/helper";
import Alert from "../utils/Alert";
import Loading from "../utils/loading";
import PeopleIcon from "@material-ui/icons/People";
import DeleteIcon from "@material-ui/icons/Delete";
import EditIcon from "@material-ui/icons/Edit";
import viewStyles from "../viewStyles";

const AllPages = props => {
  const classes = viewStyles();

  useEffect(() => {
    if (isEmpty(props.blogs.blogs)) {
      props.blogsAction();
    }
  }, []);

  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);

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
            {props.blogs.loading && <Loading />}

            <CardHeader
              action={
                <Link to="/add-page">
                  <Button
                    color="primary"
                    className={classes.addUserBtn}
                    size="small"
                    variant="contained"
                  >
                    Add New Page
                  </Button>
                </Link>
              }
              title="All Pages"
            />
            <Divider />
            <CardContent>
              <TableContainer className={classes.container}>
                <Table
                  stickyHeader
                  aria-label="sticky table and Dense Table"
                  size="small"
                >
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
                    {props.blogs.blogs
                      .slice(
                        page * rowsPerPage,
                        page * rowsPerPage + rowsPerPage
                      )
                      .map(blog => (
                        <TableRow key={blog.id} hover>
                          <TableCell>
                            <Avatar
                              alt={blog.name}
                              src={
                                blog.feature_image &&
                                blog.feature_image.thumbnail
                              }
                            />
                          </TableCell>
                          <TableCell>{blog.title}</TableCell>
                          <TableCell>{blog.date}</TableCell>
                          <TableCell>
                            <Tooltip title="Edit Page" aria-label="edit">
                              <IconButton
                                aria-label="Edit"
                                onClick={() => jumpTo(`edit-page/${blog.id}`)}
                              >
                                <EditIcon />
                              </IconButton>
                            </Tooltip>
                            <Tooltip title="Delete Page" aria-label="delete">
                              <IconButton
                                aria-label="Delete"
                                className={classes.deleteicon}
                                onClick={() => props.blogDeleteAction(blog.id)}
                              >
                                <DeleteIcon />
                              </IconButton>
                            </Tooltip>
                          </TableCell>
                        </TableRow>
                      ))}
                  </TableBody>
                </Table>
              </TableContainer>
              <TablePagination
                rowsPerPageOptions={[5, 10, 20]}
                component="div"
                count={props.blogs.blogs.length}
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

const mapStateToProps = state => {
  return { blogs: state.blogs };
};

const mapDispatchToProps = {
  blogsAction,
  blogDeleteAction
};

export default connect(mapStateToProps, mapDispatchToProps)(AllPages);
