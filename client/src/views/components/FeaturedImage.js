import React from "react";
import { Box } from "@mui/material";
import ImageIcon from "@mui/icons-material/Image";
import viewStyles from "../viewStyles";
import { isEmpty, bucketBaseURL } from "../../utils/helper";
import NoImagePlaceholder from "../../assets/images/no-image-placeholder.png";
import UserPlaceholder from "../../assets/images/user-placeholder.png";
import theme from "../../theme/index.js";
import { ThemeProvider } from "@mui/material/styles";
import NoImagePlaceHolder from "../../assets/images/NoImagePlaceHolder.png"
const FeaturedImageComponentTheme = ({ image, feautedImageChange, user, text,name }) => {
  const classes = viewStyles();

  const imageOnError = (event) => {
    event.target.src = NoImagePlaceHolder
  }

  return (
    <>
      <Box className={classes.feautedImageBox}>
        {!isEmpty(image) ? (
          <img
            src={image}
            className={classes.feautedImageBoxPreview}
            alt="featured"
            onError={imageOnError}
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
        name={name}
        id="featured-image"
        // name="feature_image"
        type="file"
        onChange={(e) => feautedImageChange(e)}
      />
      <label htmlFor="featured-image" className={classes.feautedImage}>
        <ImageIcon />{" "}
        {!isEmpty(image) ? `Change ${text||'Feature'} Image` : `Set ${text||'Feature'} Image`}
      </label>
    </>
  );
};

const FeaturedImageComponent = ({ image, feautedImageChange, user, text ,name}) => {
  console.log(name)
  return (
    <ThemeProvider theme={theme}>
      <FeaturedImageComponentTheme
      name={name}
        image={image}
        feautedImageChange={feautedImageChange}
        user={user}
        text={text}
      />
    </ThemeProvider>
  );
};
export default FeaturedImageComponent;
