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
} from "@material-ui/core";
import ArrowRightIcon from "@material-ui/icons/ArrowRight";
import { Link } from "react-router-dom";
import {convertDateToStringFormat} from "../../../utils/convertDate";
import DashboardStyles from "../../dashboard-styles";

const LatestProducts = ({ products, loader }) => {
  const classes = DashboardStyles();

  return (
    <Card className={classes.root}>
      <CardHeader title="Latest Products" />
      <Divider />
      <CardContent className={classes.content}>
        {loader ? (
          <Box component="div" display="flex" justifyContent="center" p={2}>
            <CircularProgress size={20} />
          </Box>
        ) : !products ? (
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
                      product.feature_image && product.feature_image.thumbnail
                        ? product.feature_image.thumbnail
                        : "https://www.hbwebsol.com/wp-content/uploads/2020/07/category_dummy.png"
                    }
                  />
                </ListItemAvatar>
                <ListItemText
                  primary={product.name}
                  secondary={`Updated ${convertDateToStringFormat(product.date)}`}
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
            <Link to="/all-products">
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

export default LatestProducts;
