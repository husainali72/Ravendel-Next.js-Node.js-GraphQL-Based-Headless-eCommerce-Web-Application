import React, { Fragment, useState, useEffect } from "react";
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
  Button,
  TextField,
  CardActions,
  FormControl,
  Select,
  Tooltip,
  Box,
  TablePagination
} from "@material-ui/core";
import Alert from "../utils/Alert";
import Loading from "../utils/loading";
import clsx from "clsx";
import { connect } from "react-redux";
import viewStyles from "../viewStyles.js";
import {
  blogtagsAction,
  blogtagAddAction,
  blogtagUpdateAction,
  blogtagDeleteAction
} from "../../store/action/";
import { isEmpty } from "../../utils/helper";
import DeleteIcon from "@material-ui/icons/Delete";
import EditIcon from "@material-ui/icons/Edit";
import convertDefault from "../utils/convertDate";

var tagObject = {
  name: "",
  url: ""
};
const AllTags = props => {
  const classes = viewStyles();
  const [singleTag, setSingleTag] = useState(tagObject);
  const [editMode, setEditmode] = useState(false);
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = event => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  useEffect(() => {
    if (isEmpty(props.blogState.tags)) {
      props.blogtagsAction();
    }
  }, [props.blogState.tags]);

  const editTag = tag => {
    setEditmode(true);
    setSingleTag({ ...singleTag, ...tag });
  };

  const handleChange = e => {
    setSingleTag({ ...singleTag, [e.target.name]: e.target.value });
  };

  const updateTag = () => {
    props.blogtagUpdateAction(singleTag);
    setEditmode(false);
    setSingleTag(tagObject);
  };

  const addTag = () => {
    props.blogtagAddAction(singleTag);
    setSingleTag(tagObject);
  };

  const cancelTag = () => {
    document.forms[0].reset();
    setEditmode(false);
    setSingleTag(tagObject);
  };

  return (
    <Fragment>
      <Alert />
      {props.blogState.loading && <Loading />}
      <Grid container className={classes.mainrow} spacing={3}>
        <Grid item md={6}>
          <Card>
            <CardHeader title="All Tags" />
            <CardContent>
              <TableContainer className={classes.container}>
                <Table stickyHeader aria-label="Tags-table" size="small">
                  <TableHead>
                    <TableRow>
                      <TableCell>Name</TableCell>
                      <TableCell>Date</TableCell>
                      <TableCell>Actions</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {props.blogState.tags
                      .slice(
                        page * rowsPerPage,
                        page * rowsPerPage + rowsPerPage
                      )
                      .map(tag => (
                        <TableRow key={tag.id} hover>
                          <TableCell>{tag.name}</TableCell>
                          <TableCell>{convertDefault(tag.date)}</TableCell>
                          <TableCell>
                            <Tooltip title="Edit Tag" aria-label="edit">
                              <IconButton
                                aria-label="Edit"
                                onClick={() => editTag(tag)}
                              >
                                <EditIcon />
                              </IconButton>
                            </Tooltip>
                            <Tooltip title="Delete Tag" aria-label="delete">
                              <IconButton
                                aria-label="Delete"
                                className={classes.deleteicon}
                                onClick={() =>
                                  props.blogtagDeleteAction(tag.id)
                                }
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
                count={props.blogState.tags.length}
                rowsPerPage={rowsPerPage}
                page={page}
                onChangePage={handleChangePage}
                onChangeRowsPerPage={handleChangeRowsPerPage}
              />
            </CardContent>
          </Card>
        </Grid>

        <Grid item md={6}>
          <form>
            <Card>
              <CardHeader title={`${editMode ? "Edit" : "Add"} Tag`} />
              <Divider />
              <CardContent>
                <TextField
                  label="Name"
                  name="name"
                  variant="outlined"
                  className={clsx(classes.marginBottom, classes.width100)}
                  onChange={handleChange}
                  value={singleTag.name}
                />
                <TextField
                  label="Url"
                  name="url"
                  variant="outlined"
                  className={clsx(classes.marginBottom, classes.width100)}
                  onChange={handleChange}
                  value={singleTag.url}
                />
              </CardContent>
              <CardActions>
                <Button
                  size="small"
                  color="primary"
                  onClick={editMode ? updateTag : addTag}
                  variant="contained"
                >
                  {editMode ? "Update" : "Add"}
                </Button>
                <Button
                  size="small"
                  onClick={cancelTag}
                  variant="contained"
                  className={classes.cancelBtn}
                >
                  Cancel
                </Button>
              </CardActions>
            </Card>
          </form>
        </Grid>
      </Grid>
    </Fragment>
  );
};

const mapStateToProps = state => {
  return { blogState: state.blogs };
};

const mapDispatchToProps = {
  blogtagsAction,
  blogtagAddAction,
  blogtagUpdateAction,
  blogtagDeleteAction
};

export default connect(mapStateToProps, mapDispatchToProps)(AllTags);
