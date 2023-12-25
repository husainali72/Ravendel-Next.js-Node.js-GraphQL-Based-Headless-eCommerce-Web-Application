import React, { useState } from "react";
import ImageIcon from "@mui/icons-material/Image";
import viewStyles from "../../viewStyles";
import { baseUrl, bucketBaseURL, getBaseUrl, imageOnError } from "../../../utils/helper";


const EditGalleryImageSelection = ({ onAddGalleryImage, onRemoveGalleryImage, product, onRemoveOldImage, setting }) => {
  const classes = viewStyles();
  const [gallery, setGallery] = useState([]);

  const addgalleryImg = (e) => {
    var imagesRes = [...e.target.files];
    var images = [];
    for (let i in imagesRes) {
      images.push(URL.createObjectURL(imagesRes[i]));
    }
    setGallery([...gallery, ...images]);
    onAddGalleryImage(e);
  };

  const removeImage = (img) => {
    if (img) {
      let galleryImages = product.gallery_image.filter(
        (galleryImg) => galleryImg !== img
      );
      let removed_image = product.removed_image || [];
      removed_image.push(img);

      onRemoveOldImage(galleryImages, removed_image);
    } else {
      onRemoveGalleryImage(gallery.filter((galleryImg) => galleryImg !== img));
    }
    setGallery(gallery.filter((galleryImg) => galleryImg !== img));
  };

  return (
    <>
      <div className={classes.galleryImgOuterBox}>
        {product.gallery_image && product.gallery_image.length > 0 ?
          product.gallery_image.map((img, index) => (
            <div key={index} className={classes.galleryImgBox}>
              <span
                className={classes.galleryImgRemove}
                onClick={() => removeImage(img)}
              >
                x
              </span>
              <img
                src={`${getBaseUrl(setting)}${img}`}
                className={classes.galleryImg}
                alt="gallery-img"
                onError={imageOnError}
              />
            </div>
          ))
          : null}
        {gallery
          ? gallery.map((img, index) => (
            <div key={index} className={classes.galleryImgBox}>
              <span
                className={classes.galleryImgRemove}
                onClick={() => removeImage(img)}
              >
                x
              </span>
              <img
                src={img}
                className={classes.galleryImg}
                alt='product-gallery-img'
                onError={imageOnError}
              />
            </div>
          ))
          : null}
      </div>
      <input
        accept='image/*'
        className={classes.input}
        style={{ display: "none" }}
        id='Gallery-Image'
        name='update_gallery_image'
        type='file'
        onChange={addgalleryImg}
        multiple={true}
      />
      <label htmlFor='Gallery-Image' className={classes.feautedImage}>
        <ImageIcon /> {" Add Gallery Images"}
      </label>
    </>
  );
};

export default EditGalleryImageSelection;
