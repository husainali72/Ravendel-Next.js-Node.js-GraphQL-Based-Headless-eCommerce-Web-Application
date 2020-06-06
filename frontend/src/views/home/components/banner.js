import React, { Fragment, useState, useEffect } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { Typography, Button, Container, Box } from "@material-ui/core";
import Slider from "react-slick";

const Banner = (props) => {
  console.log("sliders", props.sliders);
  // const [bannerSlider, setBannerSlider] = useState([
  //   {
  //     image: "https://colorlib.com/preview/theme/essence/img/bg-img/bg-1.jpg",
  //     link: "/category/CategoryFirst",
  //   },
  //   {
  //     image: "https://colorlib.com/preview/theme/winter/img/banner_img.png",
  //     link: "/category/CategorySecond",
  //   },
  // ]);

  const [bannerSlider, setBannerSlider] = useState([]);

  useEffect(() => {
    setBannerSlider(props.sliders);
  }, [props.sliders]);

  function SampleNextArrow(props) {
    const { className, style, onClick } = props;
    return (
      <div
        className={className}
        style={{ ...style, right: "10px" }}
        onClick={onClick}
      />
    );
  }

  function SamplePrevArrow(props) {
    const { className, style, onClick } = props;
    return (
      <div
        className={className}
        style={{ ...style, left: "10px" }}
        onClick={onClick}
      />
    );
  }

  const settings = {
    dots: true,
    dotsClass: "slick-dots slick-thumb",
    infinite: true,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    speed: 1000,
    autoplaySpeed: 4000,
    cssEase: "linear",
    nextArrow: <SampleNextArrow />,
    prevArrow: <SamplePrevArrow />,
  };

  return (
    <Fragment>
      <Box component="div" className="home-slider-banner">
        <Slider {...settings}>
          {bannerSlider &&
            bannerSlider.map((slide, index) => (
              <div key={index}>
                {slide.open_in_tab ? (
                  <a href={slide.link} target="_blank">
                    {slide.image && (
                      <img
                        src={slide.image.original}
                        alt="slide"
                        className="slide-image"
                      />
                    )}
                  </a>
                ) : (
                  <Link to={slide.link}>
                    {slide.image && (
                      <img
                        src={slide.image.original}
                        alt="slide"
                        className="slide-image"
                      />
                    )}
                  </Link>
                )}
              </div>
            ))}
        </Slider>
      </Box>
      {/* <Box
        component="div"
        className="home-banner"
        display="flex"
        justify="flex-start"
        alignItems="center"
      >
        <Container>
          <Box component="span">
            <Typography variant="h1" component="h2" className="banner-heading">
              New Collection
            </Typography>
          </Box>
          <Button variant="contained" color="primary">
            <Link to="/shop">Shop Now</Link>
          </Button>
        </Container>
      </Box> */}
    </Fragment>
  );
};

const mapStateToProps = (state) => ({
  settings: state.settings,
});

export default connect(mapStateToProps)(Banner);
