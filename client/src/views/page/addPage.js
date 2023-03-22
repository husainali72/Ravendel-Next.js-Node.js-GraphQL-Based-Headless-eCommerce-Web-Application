import React, { useState, useEffect } from "react";
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
import TinymceEditor from "./TinymceEditor.js";
import {
  Alert,
  Loading,
  TopBar,
  TextInput,
  StyledRadio,
  CardBlocks,
} from "../components";
import viewStyles from "../viewStyles";
import { pageAddAction } from "../../store/action/pageAction.js";
import { client_app_route_url } from "../../utils/helper";
import theme from "../../theme";
import { ThemeProvider } from "@mui/material/styles";
import { useNavigate } from "react-router-dom";
import { validate } from "../components/validate";
import { isEmpty } from "../../utils/helper";
import { ALERT_SUCCESS } from "../../store/reducers/alertReducer";
var defaultObj = {
  status: "Publish",
  title: "",
  meta: {
    title: "",
    description: "",
    keywords: "",
  },
};

const AddPageTheme = (props) => {
  const classes = viewStyles();
  const theme = useTheme();
  const isSmall = useMediaQuery(theme.breakpoints.down("sm"));
  const pageState = useSelector((state) => state.pages);

  const [editPremalink, setEditPermalink] = useState(false);
  const [page, setPage] = useState(defaultObj);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  useEffect(() => {
    if (pageState.page.content !== undefined) {
      setPage({ ...page, content: pageState.page.content });
    }
  }, [pageState.page.content]);

  useEffect(() => {
    if (pageState.success) {
      document.forms[0].reset();
      setPage(defaultObj);
    }
  }, [pageState.success]);

  useEffect(() => {
    var slugVal = page.title.replace(/[^A-Z0-9]/gi, "-");
    setPage({ ...page, url: slugVal.toLowerCase() });
  }, [page.title]);

  const addPage = (e) => {
    e.preventDefault();
    var errors = validate(["title"], page);

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
      dispatch(pageAddAction(page, navigate));

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

  return (
    <>
      <Alert />
      {pageState.loading ? <Loading /> : null}
      <form>
        <TopBar
          title="Add Page"
          onSubmit={addPage}
          submitTitle="Add"
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
                />
              </Box>

              <Box component="div" mb={2}>
                {page.title ? (
                  <span style={{ marginBottom: 10, display: "block" }}>
                    <strong>Link: </strong>
                    https://www.google.com/product/
                    {editPremalink === false && page.url}
                    {editPremalink === true && (
                      <input
                        id="url"
                        name="url"
                        value={page.url}
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
              </Box>

              <Box component="div">
                <TinymceEditor />
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

// export default AddPage;
const AddPage = () => {
  return (
    <ThemeProvider theme={theme}>
      <AddPageTheme />
    </ThemeProvider>
  );
};
export default AddPage;
