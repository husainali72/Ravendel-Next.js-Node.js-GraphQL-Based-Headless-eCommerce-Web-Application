import React from "react";
import { Typography, Box } from "@material-ui/core";

const PageTitle = props => {
  return (
    <Box
      component="div"
      display="flex"
      justifyContent="center"
      alignItems="center"
      className="page-header"
    >
      <Typography variant="h1">{props.title}</Typography>
    </Box>
  );
};

export default PageTitle;
