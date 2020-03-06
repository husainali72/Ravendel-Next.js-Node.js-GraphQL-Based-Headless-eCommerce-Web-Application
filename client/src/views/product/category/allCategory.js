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
import Alert from "../../utils/Alert";
import Loading from "../../utils/loading";
import clsx from "clsx";
import { connect } from "react-redux";
import viewStyles from "../../viewStyles.js";
import {
  categoriesAction,
  categoryDeleteAction,
  categoryUpdateAction,
  categoryAddAction
} from "../../../store/action/";
import { isEmpty } from "../../../utils/helper";
import DeleteIcon from "@material-ui/icons/Delete";
import EditIcon from "@material-ui/icons/Edit";
import convertDefault from "../../utils/convertDate";

var categoryObject = {
  name: "",
  parentId: null,
  metadescription: "",
  metakeyword: "",
  metatitle: "",
  url: ""
};
const AllCategory = props => {
  const classes = viewStyles();
  const [categories, setCategories] = useState([]);
  const [singlecategory, setSingleCategory] = useState(categoryObject);
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
    setCategories(props.products.categories);
  }, [props.products.categories]);

  const editCategory = cat => {
    setEditmode(true);
    setSingleCategory({ ...singlecategory, ...cat });
  };

  const handleChange = e => {
    if (e.target.name === "parentId" && !e.target.value) {
      setSingleCategory({ ...singlecategory, [e.target.name]: null });
      return;
    }
    setSingleCategory({ ...singlecategory, [e.target.name]: e.target.value });
  };

  const updateCat = () => {
    props.categoryUpdateAction(singlecategory);
    setEditmode(false);
    setSingleCategory(categoryObject);
  };

  const addCat = () => {
    props.categoryAddAction(singlecategory);
    setSingleCategory(categoryObject);
  };

  const cancelCat = () => {
    document.forms[0].reset();
    setEditmode(false);
    setSingleCategory(categoryObject);
  };

  const fileChange = e => {
    setfeaturedImage(null);
    setfeaturedImage(URL.createObjectURL(e.target.files[0]));
    setSingleCategory({ ...singlecategory, [e.target.name]: e.target.files });
  };

  return (
    <Fragment>
      <Alert />
      {props.products.loading && <Loading />}
      <Grid container className={classes.mainrow} spacing={3}>
        <Grid item md={6}>
          <Card>
            <CardHeader title="All Categories" />
            <CardContent>
              <TableContainer className={classes.container}>
                <Table
                  stickyHeader
                  aria-label="sticky table and Dense Table"
                  size="small"
                >
                  <TableHead>
                    <TableRow>
                      <TableCell>Name</TableCell>
                      <TableCell>Date</TableCell>
                      <TableCell>Actions</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {categories &&
                      categories
                        .slice(
                          page * rowsPerPage,
                          page * rowsPerPage + rowsPerPage
                        )
                        .map(cat => (
                          <TableRow key={cat.id} hover>
                            <TableCell>{cat.name}</TableCell>
                            <TableCell>{convertDefault(cat.date)}</TableCell>
                            <TableCell>
                              <Tooltip title="Edit Category" aria-label="edit">
                                <IconButton
                                  aria-label="Edit"
                                  onClick={() => editCategory(cat)}
                                >
                                  <EditIcon />
                                </IconButton>
                              </Tooltip>
                              <Tooltip
                                title="Delete Category"
                                aria-label="delete"
                              >
                                <IconButton
                                  aria-label="Delete"
                                  className={classes.deleteicon}
                                  onClick={() =>
                                    props.categoryDeleteAction(cat.id)
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
                count={categories.length}
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
              <CardHeader title={`${editMode ? "Edit" : "Add"} Category`} />
              <Divider />
              <CardContent>
                <TextField
                  label="Name"
                  name="name"
                  variant="outlined"
                  className={clsx(classes.marginBottom, classes.width100)}
                  onChange={handleChange}
                  value={singlecategory.name}
                />
                <FormControl
                  variant="outlined"
                  className={clsx(classes.marginBottom, classes.width100)}
                >
                  <span className={classes.selectCatLabel}>Parent</span>
                  <Select
                    native
                    value={
                      singlecategory.parentId === null
                        ? ""
                        : singlecategory.parentId
                    }
                    onChange={handleChange}
                    inputProps={{
                      name: "parentId"
                    }}
                  >
                    <option value="">---Select---</option>
                    {categories &&
                      categories.map(cat => (
                        <option
                          key={cat.id}
                          value={cat.id}
                          disabled={
                            editMode && cat.id === singlecategory.id
                              ? true
                              : false
                          }
                        >
                          {cat.name}
                        </option>
                      ))}
                  </Select>
                </FormControl>
                <TextField
                  label="Url"
                  name="url"
                  variant="outlined"
                  className={clsx(classes.marginBottom, classes.width100)}
                  onChange={handleChange}
                  value={singlecategory.url}
                />
                <Grid container>
                  <Grid item className={classes.flex1}>
                    <TextField
                      helperText="Featured Image"
                      name="feature_image"
                      variant="outlined"
                      className={clsx(
                        classes.marginBottom,
                        classes.width100,
                        "top-helper"
                      )}
                      onChange={fileChange}
                      type="file"
                    />
                  </Grid>
                  <Grid item>
                    {featuredImage !== null && (
                      <Box className={classes.logoImageBox}>
                        <img
                          src={featuredImage}
                          className={classes.logoImagePreview}
                        />
                      </Box>
                    )}
                  </Grid>
                </Grid>
                <TextField
                  label="Meta Title"
                  name="metatitle"
                  variant="outlined"
                  className={clsx(classes.marginBottom, classes.width100)}
                  onChange={handleChange}
                  value={singlecategory.metatitle}
                />
                <TextField
                  label="Meta Keyword"
                  name="metakeyword"
                  variant="outlined"
                  className={clsx(classes.marginBottom, classes.width100)}
                  onChange={handleChange}
                  value={singlecategory.metakeyword}
                />
                <TextField
                  label="Meta Description"
                  name="metadescription"
                  variant="outlined"
                  className={clsx(classes.marginBottom, classes.width100)}
                  onChange={handleChange}
                  value={singlecategory.metadescription}
                />
              </CardContent>
              <CardActions>
                <Button
                  size="small"
                  color="primary"
                  onClick={editMode ? updateCat : addCat}
                  variant="contained"
                >
                  {editMode ? "Update" : "Add"}
                </Button>
                <Button
                  size="small"
                  onClick={cancelCat}
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

export default connect(mapStateToProps, mapDispatchToProps)(AllCategory);
