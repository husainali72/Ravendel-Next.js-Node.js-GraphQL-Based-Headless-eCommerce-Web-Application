import React from "react";
import { Box } from "@material-ui/core";
import ImageIcon from "@material-ui/icons/Image";
import viewStyles from "../viewStyles";
import {isEmpty} from '../../utils/helper';

const FeaturedImageComponent = ({ image, feautedImageChange }) => {
  const classes = viewStyles();

  return (
    <>
      {!isEmpty(image) ? (
        <Box className={classes.feautedImageBox}>
          <img
            src={image}
            className={classes.feautedImageBoxPreview}
            alt='featured'
          />
        </Box>
      ): null}
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
