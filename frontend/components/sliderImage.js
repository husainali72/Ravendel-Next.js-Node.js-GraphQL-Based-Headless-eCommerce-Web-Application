import React, { useEffect, useState } from "react";
import Slider from "react-slick";
import { GlassMagnifier } from "react-image-magnifiers";
import ProductImage from "./imageComponent";
import PropTypes from "prop-types";
import NoImagePlaceHolder from "../components/images/NoImagePlaceHolder.png";
import { get } from "lodash";
const GalleryImageSlider = ({ galleryImages, variantSelect, comboData }) => {
  const [imgError, setImgError] = useState([]);
  const settings = {
    customPaging: function (i) {
      return (
        <a>
          <ProductImage
            src={getGalleryImage(galleryImages, "[i]", "")}
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

  return (
    <>
      {galleryImages?.length ? (
        <Slider {...settings}>
          {galleryImages.map((gallery, index) => (
            <div key={index}>
              <ProductImage
                src={getGalleryImage(gallery)}
                className="gallery-image"
                alt=""
              />
              <GlassMagnifier
                imageSrc={
                  -1 === imgError?.indexOf(index)
                    ? getMagnifierImg(gallery)
                    : NoImagePlaceHolder?.src
                }
                imageAlt="Example"
                className="gallery-image"
                magnifierSize={1025 > window?.innerWidth ? "60%" : "30%"}
                magnifierBorderSize={5}
                magnifierBorderColor="rgba(0, 0, 0, .5)"
              />
            </div>
          ))}
        </Slider>
      ) : (
        <ProductImage src="" className="gallery-image" alt="" />
      )}
    </>
  );
};
GalleryImageSlider.propTypes = {
  galleryImages: PropTypes.array.isRequired,
  variantSelect: PropTypes.bool.isRequired,
  comboData: PropTypes.array.isRequired,
};
export default GalleryImageSlider;
