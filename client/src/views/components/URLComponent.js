import React, { useState } from "react";
import { isEmpty } from "../../utils/helper";
import { Button } from "@mui/material";
import { getUpdatedUrl } from "../../utils/service";
import viewStyles from "../viewStyles";
import Loading from "./Loading";

import theme from "../../theme";
import { ThemeProvider } from "@mui/material/styles";
const URLComponentTheme = ({ url, onInputChange, pageUrl, tableUrl }) => {
  const classes = viewStyles();
  const [editPremalink, setEditPermalink] = useState(false);
  const [loading, setLoading] = useState(false);
  const changePermalink = () => {
    if (editPremalink) {
      isUrlExist(url);
    }

    setEditPermalink(!editPremalink);
  };

  const isUrlExist = async (url) => {
    setLoading(true);
    onInputChange(url);
    setLoading(false);
  };

  return (
    <>
      {loading ? <Loading /> : null}
      {!isEmpty(url) ? (
        <span style={{ marginBottom: 10, display: "block" }}>
          <strong>Link: </strong>
          {window.location.origin}/{pageUrl}/{editPremalink === false && url}
          {editPremalink === true && (
            <input
              id="url"
              name="url"
              value={url}
              onChange={(e) => {
                if (!isEmpty(e.target.value)) {
                  onInputChange(e.target.value);
                }
              }}
              variant="outlined"
              className={classes.editpermalinkInput}
            />
          )}
          <Button
            color="primary"
            variant="contained"
            onClick={changePermalink}
            className={classes.editpermalinkInputBtn}
            style={{ marginLeft: "20px" }}
          >
            {editPremalink ? "Ok" : "Edit"}
          </Button>
        </span>
      ) : null}
    </>
  );
};

const URLComponent = ({ url, onInputChange, pageUrl, tableUrl }) => {
  return (
    <ThemeProvider theme={theme}>
      <URLComponentTheme
        url={url}
        onInputChange={onInputChange}
        pageUrl={pageUrl}
        tableUrl={tableUrl}
      />
    </ThemeProvider>
  );
};
export default URLComponent;
