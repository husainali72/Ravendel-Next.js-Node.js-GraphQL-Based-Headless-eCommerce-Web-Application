import React from "react";
import { Box, Card, Divider, CardHeader, CardContent } from "@material-ui/core";

const CardBlocks = ({ title, children, nomargin, ...other }) => {
  return (
    <Box component='span' m={nomargin ? 0 : 1} {...other}>
      <Card>
        <CardHeader title={title} />
        <Divider />
        <CardContent>{children}</CardContent>
      </Card>
    </Box>
  );
};

export default CardBlocks;
