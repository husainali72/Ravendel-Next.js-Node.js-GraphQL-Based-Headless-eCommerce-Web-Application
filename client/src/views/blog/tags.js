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
  categoriesAction,
  categoryDeleteAction,
  categoryUpdateAction,
  categoryAddAction
} from "../../store/action/";
import { isEmpty } from "../../utils/helper";
import DeleteIcon from "@material-ui/icons/Delete";
import EditIcon from "@material-ui/icons/Edit";
import convertDefault from "../utils/convertDate";

var categoryObject = {
  name: "",
  parentId: null,
  metadescription: "",
  metakeyword: "",
  metatitle: "",
  url: ""
};
const AllTags = props => {
  const classes = viewStyles();
  const [tags, setTags] = useState([]);
  const [singleTag, setSingleTag] = useState(categoryObject);
  const [editMode, setEditmode] = useState(false);
  const [featuredImage, setfeaturedImage] = useState(null);
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
    if (isEmpty(props.products.categories)) {
      props.categoriesAction();
    }
  }, []);

  useEffect(() => {
    setTags(props.products.categories);
  }, [props.products.categories]);

  const editTag = cat => {
    setEditmode(true);
    setSingleTag({ ...singleTag, ...cat });
  };

  const handleChange = e => {
    if (e.target.name === "parentId" && !e.target.value) {
      setSingleTag({ ...singleTag, [e.target.name]: null });
      return;
    }
    setSingleTag({ ...singleTag, [e.target.name]: e.target.value });
  };

  const updateTag = () => {
    props.categoryUpdateAction(singleTag);
    setEditmode(false);
    setSingleTag(categoryObject);
  };

  const addTag = () => {
    props.categoryAddAction(singleTag);
    setSingleTag(categoryObject);
  };

  const cancelTag = () => {
    document.forms[0].reset();
    setEditmode(false);
    setSingleTag(categoryObject);
  };

  const fileChange = e => {
    setfeaturedImage(null);
    setfeaturedImage(URL.createObjectURL(e.target.files[0]));
    setSingleTag({ ...singleTag, [e.target.name]: e.target.files });
  };

  return (
    <Fragment>
      <Alert />
      {props.products.loading && <Loading />}
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
                    {tags &&
                      tags
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
                                    props.categoryDeleteAction(tag.id)
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
                count={tags.length}
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
  return { products: state.products };
};

const mapDispatchToProps = {
  categoriesAction,
  categoryDeleteAction,
  categoryUpdateAction,
  categoryAddAction
};

export default connect(mapStateToProps, mapDispatchToProps)(AllTags);
