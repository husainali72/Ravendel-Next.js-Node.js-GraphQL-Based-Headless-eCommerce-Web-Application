import React from "react";
import clsx from "clsx";
import PropTypes from "prop-types";
import { makeStyles } from "@material-ui/styles";
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
  CircularProgress
} from "@material-ui/core";
import ArrowRightIcon from "@material-ui/icons/ArrowRight";
import { Link } from "react-router-dom";
import convertDefault from "../../../utils/convertDate";

const LatestProducts = props => {
  const { className, ...rest } = props;
  const classes = useStyles();

  return (
    <Card {...rest} className={clsx(classes.root, className)}>
      <CardHeader title="Latest Products" />
      <Divider />
      <CardContent className={classes.content}>
        <List>
          {!props.products ? (
            <ListItem>
              <CircularProgress />
            </ListItem>
          ) : (
            props.products.slice(0, 2).map((product, i) => (
              <ListItem divider={i < 1} key={product.id}>
                <ListItemAvatar>
                  <img
                    alt="Product"
                    className={classes.image}
                    src={
                      product.feature_image && product.feature_image.thumbnail
                    }
                  />
                </ListItemAvatar>
                <ListItemText
                  primary={product.name}
                  secondary={`Updated ${convertDefault(product.date)}`}
                />
              </ListItem>
            ))
          )}
        </List>
      </CardContent>
      <Divider />
      <CardActions className={classes.actions}>
        <Link to="/all-products">
          <Button color="primary" size="small" variant="text">
            View all <ArrowRightIcon />
          </Button>
        </Link>
      </CardActions>
    </Card>
  );
};

const useStyles = makeStyles(() => ({
  root: {
    height: "100%"
  },
  content: {
    padding: 0
  },
  image: {
    height: 48,
    width: 48
  },
  actions: {
    justifyContent: "flex-end"
  }
}));

LatestProducts.propTypes = {
  className: PropTypes.string
};

export default LatestProducts;
