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
  feature_image: null,
  thumbnail_cat_image: null,
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
  const [singleCategory, setSingleCategory] = useState(categoryObject);
  const [editMode, setEditmode] = useState(false);
  const [isUrlChanged, setIsUrlChanged] = useState(false);
  const [filtered, setfilterdData] = useState([]);
  const [loading, setloading] = useState(false);
  const columndata = [
    {
      name: "date",
      type: "date",
      title: "date",
      sortingactive: true,
    },
    {
      name: "name",
      type: "text",
      title: "name",
      sortingactive: true,
    },
    {
      name: "actions",
      type: "actions",
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
  const getImage = (image) => {
    if (image) {
      return getBaseUrl(setting) + image;
    }
  };
  const editCategory = (cat) => {
    setEditmode(true);
    setSingleCategory({
      ...singleCategory,
      feature_image: null,
      thumbnail_cat_image: null,
    });
    setSingleCategory({
      ...singleCategory,
      ...cat,
      feature_image: getImage(cat?.image),
      thumbnail_cat_image: getImage(cat?.thumbnail_image),
    });
  };
  const handleChange = (e) => {
    if (e.target.name === "parentId" && !e.target.value) {
      setSingleCategory({ ...singleCategory, [e.target.name]: null });
      return;
    }
    setSingleCategory({ ...singleCategory, [e.target.name]: e.target.value });
  };
  const updateCat = () => {
    var errors = validate(["name"], singleCategory);

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
      if (singleCategory?.feature_image) {
        delete singleCategory?.feature_image;
      }
      if (singleCategory?.thumbnail_cat_image) {
        delete singleCategory?.thumbnail_cat_image;
      }
      dispatch(categoryUpdateAction(singleCategory));
      setEditmode(false);
      setSingleCategory(categoryObject);
    }
  };
  const addCat = () => {
    var errors = validate(["name"], singleCategory);
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
      if (singleCategory?.feature_image) {
        delete singleCategory?.feature_image;
      }
      if (singleCategory?.thumbnail_cat_image) {
        delete singleCategory?.thumbnail_cat_image;
      }
      dispatch(categoryAddAction(singleCategory));
    }
  };
  const cancelCat = () => {
    document.forms[0].reset();
    setEditmode(false);
    setSingleCategory(categoryObject);
    setIsUrlChanged(false);
  };
  const handleFileChange = (e, apiName) => {
    const files = get(e, "target.files", []);
    const name = get(e, "target.name", "");
    if (files.length > 0) {
      setSingleCategory({
        ...singleCategory,
        [apiName]: files,
        [name]: URL.createObjectURL(files[0]),
      });
    }
  };

  const isUrlExist = async (url) => {
    if (url && !editMode) {
      updateUrlOnBlur(url);
    }
  };
  const updateUrl = async (URL, setEditPermalink) => {
    if (singleCategory?.id) {
      await query(CHECK_VALID_URL, {
        url: URL,
        entryId: singleCategory?.id,
      }).then((res) => {
        if (get(res, "data.validateUrl.url")) {
          const newUrl = get(res, "data.validateUrl.url");
          setSingleCategory({
            ...singleCategory,
            url: newUrl,
          });
          setEditPermalink((previous) => !previous);
        }
      });
    } else {
      await query(CHECK_VALID_URL, { url: URL }).then((res) => {
        if (get(res, "data.validateUrl.url")) {
          const newUrl = get(res, "data.validateUrl.url");
          setSingleCategory({
            ...singleCategory,
            url: newUrl,
          });
          setEditPermalink((previous) => !previous);
        }
      });
    }
  };
  const updateUrlOnBlur = async (URL) => {
    if (URL) {
      await query(CHECK_VALID_URL, { url: URL }).then((res) => {
        if (get(res, "data.validateUrl.url")) {
          const newUrl = get(res, "data.validateUrl.url");
          setSingleCategory({
            ...singleCategory,
            url: newUrl,
          });
          setIsUrlChanged(true);
        }
      });
    }
  };
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
                value={singleCategory.name}
                onBlur={(e) =>
                  !singleCategory.url || singleCategory.url !== e.target.value
                    ? !isUrlChanged && isUrlExist(singleCategory.name)
                    : null
                }
              />
              <Box component="div" mb={singleCategory.url ? 2 : 0}>
                <ValidUrlComponent
                  url={singleCategory.url}
                  onSubmit={updateUrl}
                  onInputChange={(updatedUrl) => {
                    setSingleCategory({ ...singleCategory, url: updatedUrl });
                  }}
                  pageUrl="collection"
                  tableUrl="ProductCat"
                />
              </Box>
              <Box component="div" mb={2}>
                <FormControl variant="outlined" fullWidth>
                  <span className={classes.selectCatLabel}>Parent</span>
                  <Select
                    native
                    value={
                      singleCategory.parentId === null
                        ? ""
                        : singleCategory.parentId
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
                            editMode && cat.id === singleCategory.id
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
                      image={get(singleCategory, "feature_image")}
                      feautedImageChange={(e) =>
                        handleFileChange(e, "upload_image")
                      }
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
                      image={get(singleCategory, "feature_image")}
                      feautedImageChange={(e) => handleFileChange(e, "image")}
                    />
                  </CardBlocks>
                </Box>
              )}
              {editMode ? (
                <Box component="span">
                  <CardBlocks title="Change Thumbnail Image">
                    <FeaturedImageComponent
                      image={get(singleCategory, "thumbnail_cat_image")}
                      feautedImageChange={(e) =>
                        handleFileChange(e, "upload_thumbnail_image")
                      }
                      text="Thumbnail"
                      name="thumbnail_cat_image"
                      id="thumnail-image"
                    />
                  </CardBlocks>
                </Box>
              ) : (
                <Box component="span">
                  <CardBlocks
                    title="Choose Thumbnail Image"
                    className={classes.flex1}
                  >
                    <FeaturedImageComponent
                      image={get(singleCategory, "thumbnail_cat_image")}
                      feautedImageChange={(e) =>
                        handleFileChange(e, "thumbnail_image")
                      }
                      // style={{marginBottom: '200px'}}
                      id="thumnail-image"
                      name="thumbnail_cat_image"
                      text="Thumbnail"
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
                value={singleCategory.description}
                onChange={handleChange}
                style={{ marginRight: "20px" }}
              />

              <Box component="div" mb={2}>
                <TextInput
                  value={singleCategory.meta.title}
                  label="Meta Title"
                  name="metatitle"
                  onInputChange={(e) => {
                    setSingleCategory({
                      ...singleCategory,
                      meta: {
                        ...singleCategory.meta,
                        title: e.target.value,
                      },
                    });
                  }}
                />
              </Box>
              <Box component="div" mb={2}>
                <TextInput
                  value={singleCategory.meta.keywords}
                  label="Meta Keyword"
                  name="metakeyword"
                  onInputChange={(e) => {
                    setSingleCategory({
                      ...singleCategory,
                      meta: {
                        ...singleCategory.meta,
                        keywords: e.target.value,
                      },
                    });
                  }}
                />
              </Box>
              <Box component="div" mb={2}>
                <TextInput
                  value={singleCategory.meta.description}
                  label="Meta Description"
                  name="metadescription"
                  onInputChange={(e) => {
                    setSingleCategory({
                      ...singleCategory,
                      meta: {
                        ...singleCategory.meta,
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
