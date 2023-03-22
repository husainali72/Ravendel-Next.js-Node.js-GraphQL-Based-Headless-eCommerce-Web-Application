import React from "react";
import { Box } from "@mui/material";
import ImageIcon from "@mui/icons-material/Image";
import viewStyles from "../viewStyles";
import { isEmpty, bucketBaseURL } from "../../utils/helper";
import NoImagePlaceholder from "../../assets/images/no-image-placeholder.png";
import UserPlaceholder from "../../assets/images/user-placeholder.png";
import theme from "../../theme/index.js";
import { ThemeProvider } from "@mui/material/styles";
const FeaturedImageComponentTheme = ({ image, feautedImageChange, user }) => {
  const classes = viewStyles();

  return (
    <>
      <Box className={classes.feautedImageBox}>
        {!isEmpty(image) ? (
          <img
            src={image}
            className={classes.feautedImageBoxPreview}
            alt="featured"
          />
        ) : (
          <img
            src={user ? UserPlaceholder : NoImagePlaceholder}
            className={classes.feautedImageBoxPreview}
            alt="featured"
          />
        )}
      </Box>
      <input
        accept="image/*"
        className={classes.input}
        style={{ display: "none" }}
        id="featured-image"
        name="feature_image"
        type="file"
        onChange={(e) => feautedImageChange(e)}
      />
      <label htmlFor="featured-image" className={classes.feautedImage}>
        <ImageIcon />{" "}
        {!isEmpty(image) ? "Change Featured Image" : "Set Featured Image"}
      </label>
    </>
  );
};

const FeaturedImageComponent = ({ image, feautedImageChange, user }) => {
  return (
    <ThemeProvider theme={theme}>
      <FeaturedImageComponentTheme
        image={image}
        feautedImageChange={feautedImageChange}
        user={user}
      />
    </ThemeProvider>
  );
};
export default FeaturedImageComponent;
