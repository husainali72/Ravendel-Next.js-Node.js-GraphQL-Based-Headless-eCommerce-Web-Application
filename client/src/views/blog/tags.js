import React, { useState, useEffect } from "react";
import {
  Grid,
  TextField,
  Box,

} from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import viewStyles from "../viewStyles.js";
import {
  blogtagAddAction,
  blogtagUpdateAction,
  blogtagDeleteAction,
} from "../../store/action/";
import { isEmpty } from "../../utils/helper.js";
import theme from "../../theme/index.js";
import { ThemeProvider } from "@mui/material/styles";
import { validate } from "../components/validate";
import { ALERT_SUCCESS } from "../../store/reducers/alertReducer";
import TableComponent from "../components/table.js";
import ActionButton from "../components/actionbutton.js";
import { get } from 'lodash'
import {
  CardBlocksWithAction,
} from "../components";
import { blogtagsAction } from "../../store/action/";
var tagObject = {
  name: "",
  url: "",
};
const AllTagsComponent = () => {
  const classes = viewStyles();
  const dispatch = useDispatch();
  const blogState = useSelector((state) => state.blogs);
  const [singleTag, setSingleTag] = useState(tagObject);
  const [filtered, setfilterdData] = useState([])
  const [editMode, setEditmode] = useState(false);
  const columndata = [
    { name: 'date', title: "Date", sortingactive: true },
    { name: 'name', title: "Name", sortingactive: true },

    {
      name: 'actions', title: "Actions", sortingactive: false,
      component: ActionButton,
      buttonOnClick: (type, id) => {
        if (type === 'edit') {

          let cat = blogState.tags.find(item => item.id === id);

          editTag(cat)
        } else if (type === "delete") {
          dispatch(blogtagDeleteAction(id))
        }
      }
    },]

  useEffect(() => {
    dispatch(blogtagsAction());
  }, []);
  useEffect(() => {
    if (!isEmpty(blogState, 'blog')) {
      setfilterdData(blogState.tags)
    } else {
      setfilterdData([])
    }
  }, [get(blogState, 'tags')]);

  const editTag = (tag) => {
    setEditmode(true);
    setSingleTag({ ...singleTag, ...tag });
  };

  const handleChange = (e) => {
    setSingleTag({ ...singleTag, [e.target.name]: e.target.value });
  };

  const updateTag = () => {
    var errors = validate(["url", "name"], singleTag);
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
      dispatch(blogtagUpdateAction(singleTag));
      setEditmode(false);
      setSingleTag(tagObject);
    }

  };

  const addTag = () => {
    var errors = validate(["url", "name"], singleTag);
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
      dispatch(blogtagAddAction(singleTag));
      setSingleTag(tagObject);
    }

  };

  const cancelTag = () => {
    document.forms[0].reset();
    setEditmode(false);
    setSingleTag(tagObject);
  };
  const handleOnChangeSearch = (filtereData) => {

    setfilterdData(filtereData)
  }

  return (

    <>
      <Grid container className={classes.mainrow} spacing={2}>
        <Grid item md={6} xs={12}>
          <TableComponent
            loading={blogState.loading}
            columns={columndata}
            rows={filtered}
            searchdata={blogState.tags}
            handleOnChangeSearch={handleOnChangeSearch}
            classname="noclass"
            title="All Tags"
          />
        </Grid>
        <Grid item md={6} xs={12}>
          <form>
            <CardBlocksWithAction
              title={`${editMode ? "Edit" : "Add"} Tag`}
              successBtnLable={editMode ? "Update" : "Add"}
              successBtnOnChange={editMode ? updateTag : addTag}
              cancelBtnOnChange={cancelTag}
              nomargin
            >
              <Box component="div" mb={2}>
                <TextField
                  label="Name"
                  name="name"
                  variant="outlined"
                  onChange={handleChange}
                  value={singleTag.name}
                  fullWidth
                />
              </Box>
              <Box component="div" mb={2}>
                <TextField
                  label="Url"
                  name="url"
                  variant="outlined"
                  onChange={handleChange}
                  value={singleTag.url}
                  fullWidth
                />
              </Box>
            </CardBlocksWithAction>
          </form>
        </Grid>
      </Grid>
    </>
  );
};

const AllTags = () => {
  return (
    <ThemeProvider theme={theme}>
      <AllTagsComponent />
    </ThemeProvider>
  );
};
export default AllTags;
