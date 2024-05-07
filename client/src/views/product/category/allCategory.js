import React, { useState, useEffect } from "react";
import { Grid, TextField, FormControl, Select, Box } from "@mui/material";
import clsx from "clsx";
import { useDispatch, useSelector } from "react-redux";
import viewStyles from "../../viewStyles.js";
import {
  categoryDeleteAction,
  categoryUpdateAction,
  categoryAddAction,
} from "../../../store/action/";
import { baseUrl, bucketBaseURL, getBaseUrl } from "../../../utils/helper";
import { getUpdatedUrl, query } from "../../../utils/service";
import NoImagePlaceholder from "../../../assets/images/no-image-placeholder.png";
import UserPlaceholder from "../../../assets/images/user-placeholder.png";
import ImageIcon from "@mui/icons-material/Image";
import {
  Alert,
  Loading,
  URLComponent,
  TextInput,
  CardBlocksWithAction,
  CardBlocks,
  FeaturedImageComponent,
} from "../../components";
import theme from "../../../theme/index.js";
import { ThemeProvider } from "@mui/material/styles";
import { categoriesAction } from "../../../store/action/";
import { isEmpty } from "../../../utils/helper";
import { get } from "lodash";
import { validate } from "../../components/validate";
import { ALERT_SUCCESS } from "../../../store/reducers/alertReducer.js";
import TableComponent from "../../components/table.js";
import ActionButton from "../../components/actionbutton.js";
import ValidUrlComponent from "../../components/ValidUrlComponent.js";
import { CHECK_VALID_URL } from "../../../queries/productQuery.js";
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
  const setting = useSelector((state) => state.settings);
  const [singlecategory, setSingleCategory] = useState(categoryObject);
  const [editMode, setEditmode] = useState(false);
  const [isUrlChanged, setIsUrlChanged] = useState(false);
  const [featuredImage, setfeaturedImage] = useState(null);
  const [filtered, setfilterdData] = useState([]);
  const [loading, setloading] = useState(false);
  const columndata = [
    {
      name: "date",
      title: "date",
      sortingactive: true,
    },
    {
      name: "name",
      title: "name",
      sortingactive: true,
    },
    {
      name: "actions",
      title: "Actions",
      sortingactive: false,
      component: ActionButton,
      buttonOnClick: (type, id) => {
        if (type === "edit") {
          let cat = categories.find((item) => item.id === id);

          editCategory(cat);
        } else if (type === "delete") {
          dispatch(categoryDeleteAction(id));
        }
      },
    },
  ];
  useEffect(() => {
    if (isEmpty(get(products, "categories"))) {
      dispatch(categoriesAction());
    }
  }, []);
  useEffect(() => {
    if (!isEmpty(get(products, "categories"))) {
      setCategories(products.categories);
      setfilterdData(products.categories);
      cancelCat();
    } else {
      setCategories([]);
      setfilterdData([]);
    }
  }, [get(products, "categories")]);

  useEffect(() => {
    setloading(get(products, "loading"));
  }, [get(products, "loading")]);

  const editCategory = (cat) => {
    setEditmode(true);
    setfeaturedImage(null);
    if (cat.image) {
      setfeaturedImage(getBaseUrl(setting) + cat.image);
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
    } else {
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
    } else {
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
    const files = get(e, "target.files", []);

    if (files.length > 0) {
      setfeaturedImage(URL.createObjectURL(files[0]));
      setSingleCategory({
        ...singlecategory,
        image: files,
      });
    } else {
      setfeaturedImage(featuredImage);
    }
  };

  const updatefileChange = (e) => {
    const files = get(e, 'target.files', []);

    if (files.length > 0) {
      setfeaturedImage(URL.createObjectURL(files[0]));
      setSingleCategory({
        ...singlecategory,
        update_image: files,
      });
    } else {
      setfeaturedImage(featuredImage);
    }
  };

  // const isUrlExist = async (url) => {
  //   if (url) {
  //     setSingleCategory({
  //       ...singlecategory,
  //       url: url,
  //     });
  //     if (!isUrlChanged) {
  //       setIsUrlChanged(true)
  //     }
  //   }
  // };
  const isUrlExist = async (url) => {
    if (url && !editMode) {
      updateUrlOnBlur(url)
    }
  };
  const updateUrl = async (URL, setEditPermalink) => {
    if (singlecategory?.id) {
      await query(CHECK_VALID_URL, { url: URL, entryId: singlecategory?.id }).then(res => {
        if (get(res, 'data.validateUrl.url')) {
          const newUrl = get(res, 'data.validateUrl.url')
          setSingleCategory({
            ...singlecategory,
            url: newUrl,
          });
          setEditPermalink((previous) => !previous)
        }
      });
    } else {
      await query(CHECK_VALID_URL, { url: URL }).then(res => {
        if (get(res, 'data.validateUrl.url')) {
          const newUrl = get(res, 'data.validateUrl.url')
          setSingleCategory({
            ...singlecategory,
            url: newUrl,
          });
          setEditPermalink((previous) => !previous)
        }
      });
    }
  }
  const updateUrlOnBlur = async (URL) => {
    if (URL) {
      await query(CHECK_VALID_URL, { url: URL }).then(res => {
        if (get(res, 'data.validateUrl.url')) {
          const newUrl = get(res, 'data.validateUrl.url')
          setSingleCategory({
            ...singlecategory,
            url: newUrl,
          });
          setIsUrlChanged(true)
        }
      });
    } 
  }
  const handleOnChangeSearch = (filtereData) => {
    setfilterdData(filtereData);
  };
  return (
    <>
      <Alert />
      {loading ? <Loading /> : null}
      <Grid container className={classes.mainrow} spacing={2}>
        <Grid item lg={6} xs={12}>
          <TableComponent
            loading={loading}
            columns={columndata}
            rows={filtered}
            searchdata={categories}
            handleOnChangeSearch={handleOnChangeSearch}
            showDeleteButton={true}
            classname="table-container"
            searchbydate={true}
            title="All Category"
          />
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
                  !singlecategory.url || singlecategory.url !== e.target.value
                    ? (!isUrlChanged && isUrlExist(singlecategory.name))
                    : null
                }
              />
              <Box component="div" mb={singlecategory.url ? 2 : 0}>
                {/* <URLComponent
                  url={singlecategory.url}
                  onInputChange={(updatedUrl) => {
                    setSingleCategory({ ...singlecategory, url: updatedUrl });
                  }}
                  pageUrl="category"
                  tableUrl="ProductCat"
                /> */}
                <ValidUrlComponent
                  url={singlecategory.url}
                  onSubmit={updateUrl}
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

              {editMode ? (
                <Box component="span">
                  <CardBlocks title="Change Category Image">
                    <FeaturedImageComponent
                      image={featuredImage}
                      feautedImageChange={(e) => updatefileChange(e)}
                    />
                  </CardBlocks>
                </Box>
              ) : (
                <Box component="span">
                  <CardBlocks
                    title="Choose Category Image"
                    className={classes.flex1}
                  >
                    <FeaturedImageComponent
                      image={featuredImage}
                      feautedImageChange={(e) => fileChange(e)}
                    // style={{marginBottom: '200px'}}
                    />
                  </CardBlocks>
                </Box>
              )}

              <TextField
                label="Short Description"
                name="description"
                variant="outlined"
                className={clsx(
                  classes.marginBottom,
                  classes.width100,
                  classes.marginTop1
                )}
                multiline
                rows={3}
                value={singlecategory.description}
                onChange={handleChange}
                style={{ marginRight: "20px" }}
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
