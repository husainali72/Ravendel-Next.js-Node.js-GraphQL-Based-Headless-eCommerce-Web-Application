import React, { useState } from "react";
import ImageIcon from "@material-ui/icons/Image";
import viewStyles from "../../viewStyles";

const EditGalleryImageSelection = ({ onAddGalleryImage, onRemoveGalleryImage, product, onRemoveOldImage }) => {
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
    if(img._id){
      let galleryImages = product.gallery_image.filter(
        (galleryImg) => galleryImg._id !== img._id
      );
      let removed_image = product.removed_image || [];
      removed_image.push(img._id);
      
      onRemoveOldImage(galleryImages, removed_image);
    }else{
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
                              src={img.thumbnail}
                              className={classes.galleryImg}
                              alt="gallery-img"
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
