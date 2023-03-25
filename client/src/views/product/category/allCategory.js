import React, { useState, useEffect } from "react";
import {
  Grid,
  TextField,
  FormControl,
  Select,
  Box,

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
import NoImagePlaceholder from "../../../assets/images/no-image-placeholder.png"
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
  const [filtered, setfilterdData] = useState([])
  const [loading, setloading] = useState(false);
  const columndata = [
    {
      name: 'date',
      title: "date",
      sortingactive: true
    },
    {
      name: 'name',
      title: "name",
      sortingactive: true
    },
    {
      name: 'actions',
      title: "Actions",
      sortingactive: false,
      component: ActionButton,
      buttonOnClick: (type, id) => {
        if (type === 'edit') {

          let cat = categories.find(item => item.id === id);

          editCategory(cat)
        } else if (type === "delete") {
          dispatch(categoryDeleteAction(id))
        }
      }
    },]
  useEffect(() => {
    if (isEmpty(get(products, "categories"))) {
      dispatch(categoriesAction());
    }
  }, []);
  useEffect(() => {
    if (!isEmpty(get(products, "categories"))) {
      setCategories(products.categories);
      setfilterdData(products.categories)
      cancelCat();
    }
  }, [get(products, "categories")]);

  useEffect(() => {
    setloading(get(products, "loading"));
  }, [get(products, "loading")]);

  const editCategory = (cat) => {
    setEditmode(true);
    setfeaturedImage(null);
    if (cat.image) {
      setfeaturedImage(bucketBaseURL + cat.image);
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
      "image": e.target.files,
    });
  };

  const updatefileChange = (e) => {
    setSingleCategory({
      ...singlecategory,
      "update_image": e.target.files,
    });
    setfeaturedImage(null);
    setfeaturedImage(URL.createObjectURL(e.target.files[0]));

  };

  const isUrlExist = async (url) => {
    let updatedUrl = await getUpdatedUrl("ProductCat", url);
    setSingleCategory({
      ...singlecategory,
      url: updatedUrl,
    });
  };
  const handleOnChangeSearch = (filtereData) => {
    setfilterdData(filtereData)
  }
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
                  !singlecategory.url || singlecategory.url !== e.target.value ? isUrlExist(singlecategory.name) : null

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

              {editMode ?
                <Box component="span">
                  <CardBlocks title="Change Category Image" >
                    <FeaturedImageComponent
                      image={featuredImage}
                      feautedImageChange={(e) => updatefileChange(e)}
                    />
                  </CardBlocks>
                 </Box>
                 :
                <Box component="span" >
<CardBlocks title="Choose Category Image" className={classes.flex1}>
                  <FeaturedImageComponent
                    image={featuredImage}
                    feautedImageChange={(e) => fileChange(e)}
                    // style={{marginBottom: '200px'}}
                  />
                  </CardBlocks>
                </Box>}

              <TextField
                label="Short Description"
                name="description"
                variant="outlined"
                className={clsx(classes.marginBottom, classes.width100, classes.marginTop1)}
                multiline
                rows={3}
                value={singlecategory.description}
                onChange={handleChange}
                style={{marginRight: '20px'}}
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
