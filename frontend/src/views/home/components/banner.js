import React, { Fragment, useState } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { Typography, Button, Container, Box } from "@material-ui/core";
import Slider from "react-slick";

const Banner = props => {
  const [bannerSlider, setBannerSlider] = useState([
    {
      image: "https://colorlib.com/preview/theme/essence/img/bg-img/bg-1.jpg",
      url: "/category/CategoryFirst"
    },
    {
      image: "https://colorlib.com/preview/theme/winter/img/banner_img.png",
      url: "/category/CategorySecond"
    }
  ]);

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
    prevArrow: <SamplePrevArrow />
  };

  return (
    <Fragment>
      <Box component="div" className="home-slider-banner">
        <Slider {...settings}>
          {bannerSlider &&
            bannerSlider.map((slide, index) => (
              <div key={index}>
                <Link to={slide.url}>
                  <img src={slide.image} alt="slide" className="slide-image" />
                </Link>
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

const mapStateToProps = state => ({
  settings: state.settings
});

export default connect(mapStateToProps)(Banner);
