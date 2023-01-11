import React, { Fragment } from "react";
import { connect } from "react-redux";
import { makeStyles } from "@material-ui/core/styles";
import {
  Typography,
  ButtonBase,
  Grid,
  Box,
  Container,
} from"@mui/material";
import { Link } from "react-router-dom";
import PlaceHolder from "../../assets/images/product-placeholder.jpg";
import { app_router_base_url, bucketBaseURL } from "../../utils/helper";

const CategoryListing = ({ allCategories, title }) => {
  const classes = useStyles();

  return (
    <Fragment>
      <section className="home-category-section">
        <Container>
          <Box display="flex" justifyContent="center">
            <Typography variant="h2" className="section-title">
              {title}
            </Typography>
          </Box>
          <Box
            component="div"
            className={classes.categoryListingWrapper}
            display="flex"
          >
            <Grid container spacing={4}>
              {allCategories &&
                allCategories.map((category, index) => (
                  <Fragment key={index}>
                    {category.parentId === null && (
                      <Grid item lg={3} md={3} sm={6} xs={6}>
                        <Link
                          to={`${app_router_base_url}category/${category.url}`}
                        >
                          <ButtonBase
                            focusRipple
                            className={classes.image}
                            focusVisibleClassName={classes.focusVisible}
                          >
                            <span
                              className={classes.imageSrc}
                              style={{
                                backgroundImage: `url(${
                                  category.image
                                    ? bucketBaseURL + category.image.large
                                    : PlaceHolder
                                })`,
                              }}
                            />
                            <span className={classes.imageBackdrop} />
                            <span className={classes.imageButton}>
                              <Typography
                                component="span"
                                variant="subtitle1"
                                color="inherit"
                                className={classes.imageTitle}
                              >
                                {category.name}
                                <span className={classes.imageMarked} />
                              </Typography>
                            </span>
                          </ButtonBase>
                        </Link>
                      </Grid>
                    )}
                  </Fragment>
                ))}
            </Grid>
          </Box>
        </Container>
      </section>
    </Fragment>
  );
};

const useStyles = makeStyles((theme) => ({
  categoryListingWrapper: {
    display: "flex",
    flexWrap: "wrap",
    minWidth: "100%",
  },
  image: {
    position: "relative",
    height: 200,
    width: "100%",
    "&:hover, &$focusVisible": {
      zIndex: 1,
      "& $imageBackdrop": {
        opacity: 0.1,
      },
      "& $imageMarked": {
        opacity: 0,
      },
      "& $imageTitle": {
        border: "4px solid currentColor",
        backgroundColor: "#3a3a3a57",
      },
    },
  },
  focusVisible: {},
  imageButton: {
    position: "absolute",
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    color: theme.palette.common.white,
  },
  imageSrc: {
    position: "absolute",
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    backgroundSize: "cover",
    backgroundPosition: "center 40%",
  },
  imageBackdrop: {
    position: "absolute",
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    // backgroundColor: theme.palette.common.black,
    backgroundColor: "#3a3a3a",
    opacity: 0.4,
    transition: theme.transitions.create("opacity"),
  },
  imageTitle: {
    position: "relative",
    padding: `${theme.spacing(2)}px ${theme.spacing(4)}px ${
      theme.spacing(1) + 6
    }px`,
    fontWeight: "bold",
    textTransform: "uppercase",
  },
  imageMarked: {
    height: 3,
    width: 18,
    backgroundColor: theme.palette.common.white,
    position: "absolute",
    bottom: -2,
    left: "calc(50% - 9px)",
    transition: theme.transitions.create("opacity"),
  },
}));

export default CategoryListing;
