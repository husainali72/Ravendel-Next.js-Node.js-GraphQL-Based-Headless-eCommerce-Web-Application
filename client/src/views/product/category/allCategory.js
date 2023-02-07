import React, { useState, useEffect } from "react";
import {
  Grid,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  TableContainer,
  IconButton,
  TextField,
  FormControl,
  Select,
  Tooltip,
  Box,
  TablePagination,
  TableSortLabel
} from "@mui/material";
import clsx from "clsx";
import { useDispatch, useSelector } from "react-redux";
import viewStyles from "../../viewStyles.js";
import {
  categoryDeleteAction,
  categoryUpdateAction,
  categoryAddAction,
} from "../../../store/action/";
import { bucketBaseURL } from "../../../utils/helper";
import { getUpdatedUrl } from "../../../utils/service";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import { convertDateToStringFormat } from "../../utils/convertDate";
import {
  Alert,
  Loading,
  URLComponent,
  TextInput,
  CardBlocks,
  CardBlocksWithAction,
} from "../../components";
import theme from "../../../theme/index.js";
import { ThemeProvider } from "@mui/material/styles";
import { categoriesAction } from "../../../store/action/";
import { isEmpty } from "../../../utils/helper";
import { get } from "lodash";
import { validate } from "../../components/validate";
import { ALERT_SUCCESS } from "../../../store/reducers/alertReducer.js";
import { stableSort, getComparator } from "../../components/sorting";
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
const AllCategoryComponent = () => {
  const classes = viewStyles();
  const dispatch = useDispatch();
  const products = useSelector((state) => state.products);
  const [categories, setCategories] = useState([]);
  const [singlecategory, setSingleCategory] = useState(categoryObject);
  const [editMode, setEditmode] = useState(false);
  const [featuredImage, setfeaturedImage] = useState(null);
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);
  const [loading, setloading] = useState(false);
  const [order, setOrder] = React.useState('asc');
  const [orderBy, setOrderBy] = React.useState('date');
  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  useEffect(() => {
    if (isEmpty(get(products, "categories"))) {
      dispatch(categoriesAction());
    }
  }, []);

  useEffect(() => {
    if (!isEmpty(get(products, "categories"))) {
      setCategories(products.categories);
      cancelCat();
    }
  }, [get(products, "categories")]);

  useEffect(() => {
    setloading(get(products, "loading"));
  }, [get(products, "loading")]);

  const editCategory = (cat) => {
    setEditmode(true);
    setfeaturedImage(null);
    if (cat.image && cat.image.original) {
      setfeaturedImage(bucketBaseURL + cat.image.original);
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
    var errors = validate(["name"], singlecategory);

    if (!isEmpty(errors)) {
      dispatch({
        type: ALERT_SUCCESS,
        payload: {
          boolean: false,
          message: errors,
          error: true,
        },
      });
    }
    else {
      dispatch(categoryUpdateAction(singlecategory));
      setEditmode(false);
      setSingleCategory(categoryObject);
    }

  };

  const addCat = () => {
    var errors = validate(["name"], singlecategory);

    if (!isEmpty(errors)) {
      dispatch({
        type: ALERT_SUCCESS,
        payload: {
          boolean: false,
          message: errors,
          error: true,
        },
      });
    }
    else {
      dispatch(categoryAddAction(singlecategory));
    }

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

  const isUrlExist = async (url) => {
    let updatedUrl = await getUpdatedUrl("ProductCat", url);
    setSingleCategory({
      ...singlecategory,
      url: updatedUrl,
    });
  };

  return (
    <>
      <Alert />
      {loading ? <Loading /> : null}
      <Grid container className={classes.mainrow} spacing={2}>
        <Grid item md={6} xs={12}>
          <CardBlocks
            title="All Categories"
            nomargin
            titleTypographyProps={{ variant: "subtitle" }}
            className={classes.Cardheader}
          >
            <TableContainer className={classes.container}>
              <Table
                stickyHeader
                aria-label="All-Categories-Table"
                size="small"
              >
                <TableHead>
                  <TableRow>
                    <TableCell sortDirection="desc" variant="contained" color="primary">
                      <Tooltip enterDelay={300} title="Sort">
                        <TableSortLabel active direction={order} onClick={() => {
                          setOrder(order === "asc" ? "desc" : "asc")
                          setOrderBy("date")
                        }}>
                          Date
                        </TableSortLabel>
                      </Tooltip>
                    </TableCell>
                    <TableCell sortDirection="desc" variant="contained" color="primary">
                      <Tooltip enterDelay={300} title="Sort">
                        <TableSortLabel active direction={order} onClick={() => {
                          setOrder(order === "asc" ? "desc" : "asc")
                          setOrderBy("name")
                        }}>
                          Name
                        </TableSortLabel>
                      </Tooltip>
                    </TableCell>


                    <TableCell variant="contained" color="primary">Actions</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>

                  {categories &&
                    stableSort(categories, getComparator(order, orderBy))
                      .slice(
                        page * rowsPerPage,
                        page * rowsPerPage + rowsPerPage
                      )
                      .map((cat) => (

                        <TableRow key={cat.id} hover>

                          <TableCell>
                            {convertDateToStringFormat(cat.date)}
                          </TableCell>
                          <TableCell>{cat.name}</TableCell>

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
                                  dispatch(categoryDeleteAction(cat.id))
                                }
                                disabled
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
              count={categories.length || 0}
              rowsPerPage={rowsPerPage || 10}
              page={page || 0}
              onPageChange={handleChangePage}
              onRowsPerPageChange={handleChangeRowsPerPage}
            />
          </CardBlocks>
        </Grid>

        <Grid item md={6} xs={12}>
          <form>
            <CardBlocksWithAction
              title={`${editMode ? "Edit" : "Add"} Category`}
              successBtnLable={editMode ? "Update" : "Add"}
              successBtnOnChange={editMode ? updateCat : addCat}
              cancelBtnOnChange={cancelCat}
              nomargin
            >
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

              <Box component="div" mb={singlecategory.url ? 2 : 0}>
                <URLComponent
                  url={singlecategory.url}
                  onInputChange={(updatedUrl) => {
                    setSingleCategory({ ...singlecategory, url: updatedUrl });
                  }}
                  pageUrl="category"
                  tableUrl="ProductCat"
                />
              </Box>

              <Box component="div" mb={2}>
                <FormControl variant="outlined" fullWidth>
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
              </Box>

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
                label="Short Description"
                name="description"
                variant="outlined"
                className={clsx(classes.marginBottom, classes.width100)}
                multiline
                rows={3}
                value={singlecategory.description}
                onChange={handleChange}
              />

              <Box component="div" mb={2}>
                <TextInput
                  value={singlecategory.meta.title}
                  label="Meta Title"
                  name="metatitle"
                  onInputChange={(e) => {
                    setSingleCategory({
                      ...singlecategory,
                      meta: {
                        ...singlecategory.meta,
                        title: e.target.value,
                      },
                    });
                  }}
                />
              </Box>

              <Box component="div" mb={2}>
                <TextInput
                  value={singlecategory.meta.keywords}
                  label="Meta Keyword"
                  name="metakeyword"
                  onInputChange={(e) => {
                    setSingleCategory({
                      ...singlecategory,
                      meta: {
                        ...singlecategory.meta,
                        keywords: e.target.value,
                      },
                    });
                  }}
                />
              </Box>

              <Box component="div" mb={2}>
                <TextInput
                  value={singlecategory.meta.description}
                  label="Meta Description"
                  name="metadescription"
                  onInputChange={(e) => {
                    setSingleCategory({
                      ...singlecategory,
                      meta: {
                        ...singlecategory.meta,
                        description: e.target.value,
                      },
                    });
                  }}
                  multiline
                  rows={3}
                />
              </Box>
            </CardBlocksWithAction>
          </form>
        </Grid>
      </Grid>
    </>
  );
};

const AllCategory = () => {
  return (
    <ThemeProvider theme={theme}>
      <AllCategoryComponent />
    </ThemeProvider>
  );
};
export default AllCategory;
