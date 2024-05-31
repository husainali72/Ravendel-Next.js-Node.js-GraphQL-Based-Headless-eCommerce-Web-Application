import Carousel from "react-bootstrap/Carousel";
import { getImage } from "../../utills/helpers";
import { useState } from "react";
import { get } from "lodash";
import Image from "next/image";
import PropTypes from "prop-types";
const Homebanner = ({ settings, slider }) => {
  const [imageSrc, setImageSrc] = useState("");
  const imageType = get(settings, "imageStorage.status");
  const handleImageError = (e) => {
    // Handle the image loading error by setting a fallback image source
    if (e) {
      setImageSrc("https://dummyimage.com/300");
    } else {
      setImageSrc("");
    }
  };
  return (
    <>
      <Carousel >
        {slider.map((slide, i) => (
          <Carousel.Item key={i}>
            <a href={slide.link} rel="noreferrer" target={slide.open_in_tab ? '_blank' : ''}>
              <Image
                src={
                  imageSrc
                    ? imageSrc
                    : getImage(get(slide, "image"), imageType, true)
                }
                width={1920}
                height={520}
                sx={{ alignItems: "center", mt: 0 }}
                className="d-block w-100"
                alt={`slider`}
                onError={handleImageError}
              />
            </a>
          </Carousel.Item>
        ))}
      </Carousel>
    </>
  );
};
Homebanner.propTypes = {
  settings: PropTypes.object.isRequired,
  slider: PropTypes.array.isRequired,
};
export default Homebanner;
