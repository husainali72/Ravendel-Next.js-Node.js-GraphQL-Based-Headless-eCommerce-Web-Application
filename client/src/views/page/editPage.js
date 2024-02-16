import React, { Fragment, useState, useEffect } from "react";
import {
  Grid,
  Button,
  Box,
  RadioGroup,
  FormControlLabel,
  useMediaQuery,
} from "@mui/material";
import { useTheme } from "@mui/styles";
import { useDispatch, useSelector } from "react-redux";
import { pageUpdateAction, pageAction, pageAddAction } from "../../store/action/";
import TinymceEditor from "./TinymceEditor.js";
import { isEmpty, client_app_route_url } from "../../utils/helper";
import viewStyles from "../viewStyles";
import { ThemeProvider } from "@mui/material/styles";
import theme from "../../theme/index";
import { get } from "lodash";
import { useNavigate, useParams } from "react-router-dom";
import { validate } from "../components/validate";
import { ALERT_SUCCESS } from "../../store/reducers/alertReducer";
import {
  Alert,
  Loading,
  TopBar,
  TextInput,
  StyledRadio,
  CardBlocks,
  URLComponent,
} from "../components";

var defaultObj = {
  status: "Publish",
  title: "",
  url: "",
  content: "",
  meta: {
    title: "",
    description: "",
    keywords: "",
  },
};

const EditPageComponent = ({ params }) => {
  const PAGEID = params.id || "";
  const theme = useTheme();
  const isSmall = useMediaQuery(theme.breakpoints.down("sm"));
  const classes = viewStyles();
  const dispatch = useDispatch();
  const pageState = useSelector((state) => state.pages);
  const [editPremalink, setEditPermalink] = useState(false);
  const [page, setPage] = useState(defaultObj);
  const navigate = useNavigate();
  const [loading, setloading] = useState(false);

  useEffect(() => {
    if (!PAGEID){
    if (pageState.success) {
      // document.forms[0]?.reset();
      setPage(defaultObj);
    }}
    if (pageState.page.content !== undefined) {
      setPage({ ...page, content: pageState.page.content });
    }
  }, [pageState.success, pageState.page.content]);

  useEffect(() => {
    if (!PAGEID){
    var slugVal = page.title.replace(/[^A-Z0-9]/gi, "-");
    setPage({ ...page, url: slugVal.toLowerCase() });
  }}, [page.title]);

  useEffect(() => {
    if (PAGEID){
    dispatch(pageAction(PAGEID));
  }}, [params]);

  useEffect(() => {
    if (PAGEID){
    if (!isEmpty(get(pageState, "page"))) {
      setPage({ ...page, ...pageState.page });
    } 
  } else {
    setPage(defaultObj)
  }}, [get(pageState, "page"), PAGEID]);

  useEffect(() => {
    setloading(get(pageState, "loading"));
  }, [get(pageState, "loading")]);

  const addUpdatePage = (e) => {
    e.preventDefault();
    var errors = validate(["content", "title"], page);

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
      if (PAGEID){
      dispatch(pageUpdateAction(page, navigate));
    }
    else {
      dispatch(pageAddAction(page, navigate));
    }
    }
  };
  const handleChange = (e) => {
    setPage({ ...page, [e.target.name]: e.target.value });
  };

  const changePermalink = () => {
    setEditPermalink(!editPremalink);
  };

  const metaChange = (e) => {
    setPage({
      ...page,
      meta: { ...page.meta, [e.target.name]: e.target.value },
    });
  };
  const isUrlExist = async (url) => {
    setPage({
      ...page,
      url: url,
    });

  };
  return (
    <>
      <Alert />
      {loading ? <Loading /> : null}
      <form>
        <TopBar
          title={PAGEID ? "Edit Page" : "Add Page"}
          onSubmit={addUpdatePage}
          submitTitle={PAGEID ? "Update" : "Add"}
          backLink={`${client_app_route_url}all-pages`}
        />
        <Grid
          container
          spacing={isSmall ? 2 : 3}
          className={classes.secondmainrow}
        >
          <Grid item lg={9} md={12} xs={12}>
            <CardBlocks title="Page Information" nomargin>
              <Box component="div" mb={2}>
                <TextInput
                  value={page.title}
                  label="Title"
                  name="title"
                  onInputChange={handleChange}
                  onBlur={(e) => !page.url || page.url !== e.target.value ? isUrlExist(page.title) : null
                  }
                />
              </Box>

              <Box component="div" mb={2}>
                <URLComponent
                  url={page.url}
                  onInputChange={(updatedUrl) => {
                    setPage({
                      ...page,
                      url: updatedUrl,
                    });
                  }}
                  pageUrl="page"
                  tableUrl="Page"
                />
              </Box>
              <Box component="div">
                <TinymceEditor value={page.content} onEditorChange={(value) =>
                  setPage({ ...page, ["content"]: value })
                } />
              </Box>
            </CardBlocks>

            <CardBlocks title="Meta Information">
              <Grid container spacing={3}>
                <Grid item md={6} xs={12}>
                  <TextInput
                    label="Meta Title"
                    name="title"
                    value={page.meta.title}
                    onInputChange={metaChange}
                  />
                </Grid>

                <Grid item md={6} xs={12}>
                  <TextInput
                    label="Meta Keyword"
                    name="keywords"
                    value={page.meta.keywords}
                    onInputChange={metaChange}
                  />
                </Grid>

                <Grid item md={12} xs={12}>
                  <TextInput
                    label="Description"
                    name="description"
                    value={page.meta.description}
                    onInputChange={metaChange}
                    multiline
                    rows="4"
                  />
                </Grid>
              </Grid>
            </CardBlocks>
          </Grid>

          <Grid item lg={3} md={12} xs={12}>
            <CardBlocks title="Status" nomargin>
              <RadioGroup
                defaultValue="Publish"
                name="status"
                onChange={handleChange}
                row
                value={page.status}
              >
                <FormControlLabel
                  value="Publish"
                  control={<StyledRadio />}
                  label="Publish"
                />
                <FormControlLabel
                  value="Draft"
                  control={<StyledRadio />}
                  label="Draft"
                />
              </RadioGroup>
            </CardBlocks>
          </Grid>
        </Grid>
      </form>
    </>
  );
};

export default function EditPage() {
  const params = useParams();
  return (
    <ThemeProvider theme={theme}>
      <EditPageComponent params={params} />
    </ThemeProvider>
  );
}
