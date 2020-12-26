import React, { useState } from "react";
import ImageIcon from "@material-ui/icons/Image";
import viewStyles from "../../viewStyles";

const GalleryImageSelection = ({ onAddGalleryImage, onRemoveGalleryImage }) => {
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
    setGallery(gallery.filter((galleryImg) => galleryImg !== img));
    onRemoveGalleryImage(gallery.filter((galleryImg) => galleryImg !== img));
  };

  return (
    <>
      <div className={classes.galleryImgOuterBox}>
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
        name='gallery_image'
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

export default GalleryImageSelection;
