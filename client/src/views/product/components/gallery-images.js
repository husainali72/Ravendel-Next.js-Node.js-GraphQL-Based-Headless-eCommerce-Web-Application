import React, { useState } from "react";
import ImageIcon from "@mui/icons-material/Image";
import SwapHorizRoundedIcon from '@mui/icons-material/SwapHorizRounded';
import viewStyles from "../../viewStyles";
import NoImagePlaceHolder from "../../../assets/images/NoImagePlaceHolder.png";
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

  const isEven = (n) => {
    return n % 2 === 0;
  }

  const swapImagePosition = (i) => {
    
  }

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
                src={img ? img : NoImagePlaceHolder}
                className={classes.galleryImg}
                alt='product-gallery-img'
              />
              {
                !isEven &&
                <button onClick={() => swapImagePosition(index)}><SwapHorizRoundedIcon/></button>
              }
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
