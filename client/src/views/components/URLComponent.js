import React from 'react';
import {isEmpty} from '../../utils/helper';
import { Button } from "@material-ui/core";
import viewStyles from "../viewStyles";

const URLComponent = ({url, editPremalink, changePermalink, onInputChange}) => {
    const classes = viewStyles();
    return (
        <>
               {!isEmpty(url) ? (
                  <span style={{ marginBottom: 10, display: "block" }}>
                    <strong>Link: </strong>
                    {window.location.origin}/blog/
                    {editPremalink === false && url}
                    {editPremalink === true && (
                      <input
                        id='url'
                        name='url'
                        value={url}
                        onChange={onInputChange}
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
    )
}

export default URLComponent;