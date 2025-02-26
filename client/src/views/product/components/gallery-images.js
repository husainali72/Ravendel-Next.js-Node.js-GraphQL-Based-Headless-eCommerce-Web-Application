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

  const swapImagePosition = (e, i) => {
    e.preventDefault();
    if(gallery){
      let galleryImages = [...gallery];
      [galleryImages[i], galleryImages[i+1]] = [galleryImages[i+1], galleryImages[i]];
      setGallery([...galleryImages]);
    }
  }

  return (
    <>
      <div className={classes.galleryImgOuterBox}>
        {(gallery && gallery.length > 1)
          ? gallery.map((img, index) => (
            <div key={index} className={classes.galleryImgBox + " gallery_image"}>
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
                (gallery.length > 1 &&  gallery.length !== (index + 1)) &&
                <button className="icon-btn" onClick={(e) => swapImagePosition(e, index)}><SwapHorizRoundedIcon/></button>
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
