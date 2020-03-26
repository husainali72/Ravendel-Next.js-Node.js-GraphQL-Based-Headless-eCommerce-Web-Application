import React, { Fragment } from "react";
import Slider from "react-slick";
import PlaceHolder from "../../assets/images/product-placeholder.jpg";

const GalleryImagesComponents = props => {
  const settings = {
    customPaging: function(i) {
      return (
        <a>
          <img
            src={props.galleryImages[i].thumbnail}
            alt="Thumbnail"
            className="thumbnail-image"
          />
        </a>
      );
    },
    dots: true,
    dotsClass: "slick-dots slick-thumb",
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1
  };

  return (
    <Fragment>
      <div className="singleroduct-gallery-slider">
        {props.galleryImages && props.galleryImages.length ? (
          <Slider {...settings}>
            {props.galleryImages.map((gallery, index) => (
              <div key={index}>
                <img
                  src={gallery.large}
                  alt="gallery"
                  className="gallery-image"
                />
              </div>
            ))}
          </Slider>
        ) : (
          <img
            src={PlaceHolder}
            alt="Placeholder"
            className="single-placholder-image"
          />
        )}
      </div>
    </Fragment>
  );
};

export default GalleryImagesComponents;
