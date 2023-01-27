import React, { Fragment, useState, useEffect } from "react";
import {
  Grid,
  TextField,
  Box,
  RadioGroup,
  FormControlLabel,
  useMediaQuery,
} from "@mui/material";
import { useTheme } from "@mui/styles";
import { useSelector, useDispatch } from "react-redux";
import { blogUpdateAction, blogAction } from "../../store/action/";
import { isEmpty, client_app_route_url } from "../../utils/helper";
import viewStyles from "../viewStyles";
import {
  Alert,
  Loading,
  TopBar,
  StyledRadio,
  CardBlocks,
  TinymceEditor,
} from "../components";
import { ThemeProvider } from "@mui/material/styles";
import theme from "../../theme";
const defaultObj = {
  title: "",
  content: "",
  status: "Publish",
};
const EditFAQComponenet = ({ params }) => {
  const FAQId = params.id || "-";
  const classes = viewStyles();
  const theme = useTheme();
  const isSmall = useMediaQuery(theme.breakpoints.down("sm"));
  const dispatch = useDispatch();
  const blogState = useSelector((state) => state.blogs);
  const [faq, setFaq] = useState(defaultObj);

  useEffect(() => {
    if (blogState.id !== FAQId) {
      dispatch(blogAction(FAQId));
    }
    return () => {
      setFaq(defaultObj);
    };
  }, []);

  useEffect(() => {
    if (!isEmpty(blogState.blog)) {
      setFaq({ ...faq, ...blogState.blog });
    }
  }, [blogState.blog]);

  const updateFaq = (e) => {
    e.preventDefault();
    dispatch(blogUpdateAction(faq));
  };

  const handleChange = (e) => {
    setFaq({ ...faq, [e.target.name]: e.target.value });
  };

  return (
    <>
      <Alert />
      {blogState.loading ? <Loading /> : null}
      <form>
        <TopBar
          title="Edit FAQ"
          onSubmit={updateFaq}
          submitTitle="Update"
          backLink={`${client_app_route_url}all-faq`}
        />

        <Grid
          container
          spacing={isSmall ? 2 : 3}
          className={classes.secondmainrow}
        >
          <Grid item lg={9} md={12} xs={12}>
            <CardBlocks title="FAQ Information" nomargin>
              <Box component="div" mb={2}>
                <TextField
                  id="title"
                  label="Title"
                  name="title"
                  onChange={handleChange}
                  variant="outlined"
                  value={faq.title}
                  fullWidth
                />
              </Box>
              <Box component="div">
                {!blogState.loading ? (
                  <TinymceEditor
                    value={faq.content}
                    onEditorChange={(value) =>
                      setFaq({ ...faq, ["content"]: value })
                    }
                  />
                ) : null}
              </Box>
            </CardBlocks>
          </Grid>

          <Grid item lg={3} md={12} xs={12}>
            <CardBlocks title="Status" nomargin>
              <RadioGroup
                defaultValue="Publish"
                name="status"
                onChange={handleChange}
                row
                value={faq.status}
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

const EditFAQ = () => {
  return (
    <ThemeProvider theme={theme}>
      <EditFAQComponenet />
    </ThemeProvider>
  );
};
export default EditFAQ;
