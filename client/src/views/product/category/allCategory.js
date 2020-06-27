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
  TablePagination,
} from "@material-ui/core";
import Loading from "../../utils/loading";
import clsx from "clsx";
import { connect } from "react-redux";
import viewStyles from "../../viewStyles.js";
import {
  categoriesAction,
  categoryDeleteAction,
  categoryUpdateAction,
  categoryAddAction,
} from "../../../store/action/";
import { isEmpty } from "../../../utils/helper";
import service, { getUpdatedUrl } from "../../../utils/service";
import DeleteIcon from "@material-ui/icons/Delete";
import EditIcon from "@material-ui/icons/Edit";
import convertDefault from "../../utils/convertDate";

var categoryObject = {
  name: "",
  parentId: null,
  description: "",
  url: "",
  meta: {
    title: "",
    description: "",
    keywords: "",
  },
};
const AllCategory = (props) => {
  const classes = viewStyles();
  const [categories, setCategories] = useState([]);
  const [singlecategory, setSingleCategory] = useState(categoryObject);
  const [editMode, setEditmode] = useState(false);
  const [featuredImage, setfeaturedImage] = useState(null);
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);
  const [editPremalink, setEditPermalink] = useState(false);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  useEffect(() => {
    if (!props.products.categories.length) {
      props.categoriesAction();
    }
  }, []);

  useEffect(() => {
    setCategories(props.products.categories);
    cancelCat();
  }, [props.products.categories]);

  const editCategory = (cat) => {
    setEditmode(true);
    setfeaturedImage(null);
    if (cat.image && cat.image.original) {
      setfeaturedImage(cat.image.original);
    }
    setSingleCategory({ ...singlecategory, ...cat });
  };

  const handleChange = (e) => {
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
  };

  const cancelCat = () => {
    document.forms[0].reset();
    setEditmode(false);
    setfeaturedImage(null);
    setSingleCategory(categoryObject);
  };

  const fileChange = (e) => {
    setfeaturedImage(null);
    setfeaturedImage(URL.createObjectURL(e.target.files[0]));
    setSingleCategory({
      ...singlecategory,
      [e.target.name]: e.target.files,
    });
  };

  const changePermalink = () => {
    if (editPremalink) {
      isUrlExist(singlecategory.url);
    }
    setEditPermalink(!editPremalink);
  };

  const isUrlExist = async (url) => {
    let updatedUrl = await getUpdatedUrl("ProductCat", url);
    setSingleCategory({
      ...singlecategory,
      url: updatedUrl,
    });
  };

  return (
    <Fragment>
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
                        .map((cat) => (
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
                  onBlur={(e) =>
                    !singlecategory.url && isUrlExist(singlecategory.name)
                  }
                />

                {singlecategory.url ? (
                  <span style={{ marginBottom: 10, display: "block" }}>
                    <strong>Link: </strong>
                    {window.location.origin}/category/
                    {editPremalink === false && singlecategory.url}
                    {editPremalink === true && (
                      <input
                        id="url"
                        name="url"
                        value={singlecategory.url}
                        onChange={handleChange}
                        variant="outlined"
                        className={classes.editpermalinkInput}
                      />
                    )}
                    <Button
                      color="primary"
                      variant="contained"
                      onClick={changePermalink}
                      className={classes.editpermalinkInputBtn}
                    >
                      {editPremalink ? "Ok" : "Edit"}
                    </Button>
                  </span>
                ) : null}
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
                      name: "parentId",
                    }}
                  >
                    <option value="">---Select---</option>
                    {categories &&
                      categories.map((cat) => (
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
                {/* <TextField
                  label="Url"
                  name="url"
                  variant="outlined"
                  className={clsx(classes.marginBottom, classes.width100)}
                  onChange={handleChange}
                  value={singlecategory.url}
                /> */}
                <Grid container>
                  <Grid item className={classes.flex1}>
                    {editMode ? (
                      <TextField
                        helperText="Featured Image"
                        name="update_image"
                        variant="outlined"
                        className={clsx(
                          classes.marginBottom,
                          classes.width100,
                          "top-helper"
                        )}
                        onChange={fileChange}
                        type="file"
                      />
                    ) : (
                      <TextField
                        helperText="Featured Image"
                        name="image"
                        variant="outlined"
                        className={clsx(
                          classes.marginBottom,
                          classes.width100,
                          "top-helper"
                        )}
                        onChange={fileChange}
                        type="file"
                      />
                    )}
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
                  id="short-description"
                  label="Short Description"
                  name="description"
                  variant="outlined"
                  className={clsx(classes.marginBottom, classes.width100)}
                  multiline
                  rows="4"
                  value={singlecategory.description}
                  onChange={handleChange}
                />
                <TextField
                  label="Meta Title"
                  name="metatitle"
                  variant="outlined"
                  className={clsx(classes.marginBottom, classes.width100)}
                  value={singlecategory.meta.title}
                  onChange={(e) =>
                    setSingleCategory({
                      ...singlecategory,
                      meta: {
                        ...singlecategory.meta,
                        title: e.target.value,
                      },
                    })
                  }
                />
                <TextField
                  label="Meta Keyword"
                  name="metakeyword"
                  variant="outlined"
                  className={clsx(classes.marginBottom, classes.width100)}
                  value={singlecategory.meta.keywords}
                  onChange={(e) =>
                    setSingleCategory({
                      ...singlecategory,
                      meta: {
                        ...singlecategory.meta,
                        keywords: e.target.value,
                      },
                    })
                  }
                />
                <TextField
                  label="Meta Description"
                  name="metadescription"
                  variant="outlined"
                  className={clsx(classes.marginBottom, classes.width100)}
                  value={singlecategory.meta.description}
                  onChange={(e) =>
                    setSingleCategory({
                      ...singlecategory,
                      meta: {
                        ...singlecategory.meta,
                        description: e.target.value,
                      },
                    })
                  }
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

const mapStateToProps = (state) => {
  return { products: state.products };
};

const mapDispatchToProps = {
  categoriesAction,
  categoryDeleteAction,
  categoryUpdateAction,
  categoryAddAction,
};

export default connect(mapStateToProps, mapDispatchToProps)(AllCategory);
