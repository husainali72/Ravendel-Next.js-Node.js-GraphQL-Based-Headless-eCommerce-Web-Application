import React, { Fragment } from "react";
import Slider from "react-slick";

const GalleryImagesComponents = props => {
  const settings = {
    customPaging: function(i) {
      return (
        <a>
          <img
            src={props.galleryImages[i].image}
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
        <Slider {...settings}>
          {props.galleryImages &&
            props.galleryImages.map((gallery, index) => (
              <div key={index}>
                <img
                  src={gallery.image}
                  alt="gallery"
                  className="gallery-image"
                />
              </div>
            ))}
        </Slider>
      </div>
    </Fragment>
  );
};

export default GalleryImagesComponents;
