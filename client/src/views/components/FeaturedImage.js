import React from "react";
import { Box } from "@material-ui/core";
import ImageIcon from "@material-ui/icons/Image";
import viewStyles from "../viewStyles";
import { isEmpty } from "../../utils/helper";
import NoImagePlaceholder from '../../assets/images/no-image-placeholder.png'
import UserPlaceholder from '../../assets/images/user-placeholder.png'

const FeaturedImageComponent = ({ image, feautedImageChange, user }) => {
  const classes = viewStyles();

  return (
    <>
      <Box className={classes.feautedImageBox}>
        {!isEmpty(image) ? (
          <img
            src={image}
            className={classes.feautedImageBoxPreview}
            alt='featured'
          />
        ) : (
          <img
            src={
              user
                ? UserPlaceholder
                : NoImagePlaceholder
            }
            className={classes.feautedImageBoxPreview}
            alt='featured'
          />
        )}
      </Box>
      <input
        accept='image/*'
        className={classes.input}
        style={{ display: "none" }}
        id='featured-image'
        name='feature_image'
        type='file'
        onChange={(e) => feautedImageChange(e)}
      />
      <label htmlFor='featured-image' className={classes.feautedImage}>
        <ImageIcon />{" "}
        {!isEmpty(image) ? "Change Featured Image" : "Set Featured Image"}
      </label>
    </>
  );
};

export default FeaturedImageComponent;
