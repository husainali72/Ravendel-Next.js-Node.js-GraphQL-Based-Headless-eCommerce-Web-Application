import React from "react";
import {
  Box,
  Card,
  Divider,
  CardHeader,
  CardContent,
  Button,
  CardActions,
} from "@material-ui/core";
import viewStyles from "../viewStyles";

const CardBlocksWithAction = ({
  title,
  children,
  nomargin,
  successBtnLable,
  successBtnOnChange,
  cancelLabel,
  cancelBtnOnChange,
  ...other
}) => {
  const classes = viewStyles();
  return (
    <Box component='span' m={nomargin ? 0 : 1} {...other}>
      <Card>
        <CardHeader title={title} />
        <Divider />
        <CardContent>
          {children}

          <CardActions>
            <Button
              size='small'
              color='primary'
              onClick={successBtnOnChange}
              variant='contained'
            >
              {successBtnLable}
            </Button>
            <Button
              size='small'
              onClick={cancelBtnOnChange}
              variant='contained'
              className={classes.cancelBtn}
            >
              {cancelLabel ? cancelLabel : "Cancel"}
            </Button>
          </CardActions>
        </CardContent>
      </Card>
    </Box>
  );
};

export default CardBlocksWithAction;
