/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from "react";
import Slider from "react-slick";
import { GlassMagnifier } from "react-image-magnifiers";
import ProductImage from "./imageComponent";
import PropTypes from "prop-types";
import { get } from "lodash";
import { getImage, imageOnError } from "../utills/helpers";
import { useSelector } from "react-redux";
import ReactImageMagnify from "react-image-magnify";
const GalleryImageSlider = ({ galleryImages, variantSelect, comboData, showMagnifiedImageState }) => {
  const [imgError, setImgError] = useState([]);
  const [imageType, setImageType] = useState([]);
  const setting = useSelector(state => state.setting)
  const [showMagnifiedImage, setShowMagnifiedImage] = showMagnifiedImageState;


  useEffect(()=>{
    let type=get(setting,'setting.imageStorage.status','')
    setImageType(type)
  },[setting])
  const settings = {
    customPaging: function (i) {
      return (
        <a>
          <ProductImage
            src={getGalleryImage(galleryImages[i])}
            className="thumbnail-image"
            alt="Thumbnail"
          />
        </a>
      );
    },
    dots: true,
    dotsClass: "slick-dots slick-thumb",
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    // vertical: true,
    slidesToScroll: 1,
    touchMove: false,
  };
  useEffect(() => {
    galleryImages?.map((gallery, index) => {
      const img = new Image();
      img.src = getMagnifierImg(gallery);
      img.onerror = () => {
        setImgError((prevErrors) => [...prevErrors, index]);
      };
    });
  }, [galleryImages]);
  const getGalleryImage = (gallery) => {
    if (!variantSelect || !comboData?.length) {
      return gallery;
    }

    const image = get(comboData,'[0].image');
    return image && image?.length ? image : gallery;
  };
  const getMagnifierImg = (gallery) => {
    if (!variantSelect || !comboData || comboData?.length === 0) {
      return gallery;
    }
    const { image: comboImageData } = comboData[0];
    if (
      1 < comboData?.length ||
      !comboImageData ||
      0 === comboImageData?.length
    ) {
      return gallery;
    }
    return comboImageData;
  };
const getImageSrc = (gallery, imageType, variantSelect, comboData) => {
  if (!variantSelect) {
    return getImage(gallery, imageType);
  }
  if (comboData?.length && variantSelect) {
    if (comboData.length > 1) {
      return getImage(gallery, imageType);
    }
    if (get(comboData,'[0].image')?.length) {
      return getImage(get(comboData,'[0].image'), imageType);
    }
  }
  return getImage(gallery, imageType);
};
  return (
    <>
      {galleryImages?.length >= 1 ? (
        <>
          <Slider {...settings}>
            {galleryImages?.map((gallery, index) => (
              <div key={index}>
                <ReactImageMagnify {...{
                    smallImage: {
                        isFluidWidth: true,
                        src: getImageSrc(gallery, imageType, variantSelect, comboData)
                    },
                    largeImage: {
                        src: getImageSrc(gallery, imageType, variantSelect, comboData),
                        width: 1200,
                        height: 1800
                    },
                    enlargedImagePortalId: "myPortal"
                }} />
              </div>
            ))}
          </Slider>
          
        </>
      ) : (
        <ProductImage src="" className="gallery-image single" alt="" />
      )}
    </>
  );
};
GalleryImageSlider.propTypes = {
  galleryImages: PropTypes.array.isRequired,
  variantSelect: PropTypes.bool.isRequired,
  comboData: PropTypes.array.isRequired,
  showMagnifiedImageState: PropTypes.array.isRequired
};
export default GalleryImageSlider;
