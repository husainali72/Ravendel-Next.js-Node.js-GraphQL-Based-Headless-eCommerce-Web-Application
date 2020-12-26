import React, { useState } from "react";
import { isEmpty } from "../../utils/helper";
import { Button } from "@material-ui/core";
import { getUpdatedUrl } from "../../utils/service";
import viewStyles from "../viewStyles";
import Loading from "./Loading";

const URLComponent = ({ url, onInputChange, pageUrl, tableUrl }) => {
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
    let updatedUrl = await getUpdatedUrl(tableUrl, url);
    onInputChange(updatedUrl);
    setLoading(false);
  };

  return (
    <>
      {loading ? <Loading /> : null}
      {!isEmpty(url) ? (
        <span style={{ marginBottom: 10, display: "block" }}>
          <strong>Link: </strong>
          {window.location.origin}/{pageUrl}/
          {editPremalink === false && url}
          {editPremalink === true && (
            <input
              id='url'
              name='url'
              value={url}
              onChange={(e) => {
                if(!isEmpty(e.target.value)){
                  onInputChange(e.target.value)
                }
              }}
              variant='outlined'
              className={classes.editpermalinkInput}
            />
          )}
          <Button
            color='primary'
            variant='contained'
            onClick={changePermalink}
            className={classes.editpermalinkInputBtn}
          >
            {editPremalink ? "Ok" : "Edit"}
          </Button>
        </span>
      ) : null}
    </>
  );
};

export default URLComponent;
