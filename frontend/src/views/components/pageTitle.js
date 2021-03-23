import React from "react";
import { Typography, Box } from "@material-ui/core";

const PageTitle = ({title}) => {
  return (
    <Box
      component="div"
      display="flex"
      justifyContent="center"
      alignItems="center"
      className="page-header"
    >
      <Typography variant="h1">{title}</Typography>
    </Box>
  );
}; 

export default PageTitle;
