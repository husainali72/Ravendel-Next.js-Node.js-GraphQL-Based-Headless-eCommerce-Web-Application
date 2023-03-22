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
import { pageUpdateAction, pageAction } from "../../store/action/";
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
} from "../components";

var defaultObj = {
  status: "Publish",
  title: "",
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
    dispatch(pageAction(PAGEID));
  }, [params]);

  useEffect(() => {
    if (!isEmpty(get(pageState, "page"))) {
      setPage({ ...page, ...pageState.page });
    }
  }, [get(pageState, "page")]);

  useEffect(() => {
    setloading(get(pageState, "loading"));
  }, [get(pageState, "loading")]);

  const updatePage = (e) => {
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
      dispatch(pageUpdateAction(page, navigate));
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
      {loading ? <Loading /> : null}
      <form>
        <TopBar
          title="Edit Page"
          onSubmit={updatePage}
          submitTitle="Update"
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
                      style={{marginLeft: "20px"}}
                    >
                      {editPremalink ? "Ok" : "Edit"}
                    </Button>
                  </span>
                ) : null}
              </Box>
              <Box component="div">
                <TinymceEditor value={page.content} />
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
