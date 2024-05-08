import React, { useState } from "react";
import { isEmpty } from "../../utils/helper";
import { Button } from "@mui/material";
import { getUpdatedUrl } from "../../utils/service";
import viewStyles from "../viewStyles";
import Loading from "./Loading";

import theme from "../../theme";
import { ThemeProvider } from "@mui/material/styles";
const URLComponentTheme = ({ url, onInputChange, pageUrl, tableUrl, onBlur, onSubmit }) => {
  const classes = viewStyles();
  const [editPremalink, setEditPermalink] = useState(false);
  const [loading, setLoading] = useState(false);
  const changePermalink = async () => {
    if (editPremalink) {
      // isUrlExist(url);
      await onSubmit(url, setEditPermalink)
    }
    if(!editPremalink){
      setEditPermalink(!editPremalink);
    }
  };
  // const changePermalink = () => {
  //   if (editPremalink) {
  //     isUrlExist(url);
  //   }

  //   setEditPermalink(!editPremalink);
  // };

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
              onBlur={onBlur}
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

const ValidUrlComponent = ({ url, onInputChange, pageUrl, tableUrl, onBlur, onSubmit }) => {
  return (
    <ThemeProvider theme={theme}>
      <URLComponentTheme
        url={url}
        onInputChange={onInputChange}
        pageUrl={pageUrl}
        onBlur={onBlur}
        tableUrl={tableUrl}
        onSubmit={onSubmit}
      />
    </ThemeProvider>
  );
};
export default ValidUrlComponent;
