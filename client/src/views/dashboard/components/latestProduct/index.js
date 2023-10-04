import React from "react";
import {
  Card,
  CardHeader,
  CardContent,
  CardActions,
  Button,
  Divider,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  CircularProgress,
  Box,
  Typography,
} from "@mui/material";
import ArrowRightIcon from "@mui/icons-material/ArrowRight";
import { Link } from "react-router-dom";
import { convertDateToStringFormat } from "../../../utils/convertDate";
import DashboardStyles from "../../dashboard-styles";
import { client_app_route_url, } from "../../../../utils/helper";
import NoImagePlaceholder from "../../../../assets/images/NoImagePlaceHolder.png";
import theme from "../../../../theme";
import { ThemeProvider } from "@mui/material/styles";
const LatestProductsTheme = ({ products, loader, bucketBaseURL }) => {
  const classes = DashboardStyles();
  const imageOnError = (event) => {
    event.target.src = NoImagePlaceholder

  }
  return (
    <Card className={classes.root}>
      <CardHeader
        title="Latest Products"
        titleTypographyProps={{ variant: "subtitle" }}
        className={classes.Cardheader}
      />
      <Divider />
      <CardContent className={classes.content}>
        {loader ? (
          <Box component="div" display="flex" justifyContent="center" p={2}>
            <CircularProgress size={20} />
          </Box>
        ) : !products.length ? (
          <Box component="div" display="flex" justifyContent="center" p={2}>
            <Typography className={classes.noRecordFound} variant="caption">
              No Records Found
            </Typography>
          </Box>
        ) : (
          <List>
            {products.slice(0, 2).map((product, i) => (
              <ListItem divider={i < 1} key={i}>
                <ListItemAvatar>
                  <img
                    alt="Product"
                    className={classes.productImage}
                    src={
                      product.feature_image
                        ? bucketBaseURL + product.feature_image
                        : NoImagePlaceholder

                    }
                    onError={imageOnError}
                  />
                </ListItemAvatar>
                <ListItemText
                  primary={product.name}
                  secondary={`Updated ${convertDateToStringFormat(
                    product.date
                  )}`}
                />
              </ListItem>
            ))}
          </List>
        )}
      </CardContent>
      {products ? (
        <>
          <Divider />
          <CardActions className="flex-end">
            <Link to={`${client_app_route_url}all-products`}>
              <Button color="primary" size="small" variant="text">
                View all <ArrowRightIcon />
              </Button>
            </Link>
          </CardActions>
        </>
      ) : null}
    </Card>
  );
};

const LatestProducts = ({ products, loader, bucketBaseURL }) => {
  return (
    <ThemeProvider theme={theme}>
      <LatestProductsTheme products={products} loader={loader} bucketBaseURL={bucketBaseURL} />
    </ThemeProvider>
  );
};
export default LatestProducts;
