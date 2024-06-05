import noImg from '../topproduct/images/no-img.png'
import ReactImageFallback from 'react-image-fallback'
import React from 'react';
import "./index.scss";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
export default function () {
  var settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay:true,
    arrows: false
  };
  const banners = [
    { image: "img/controlpanel/right_layout/banner_jnt.png" },
    { image: "img/controlpanel/right_layout/banner_jnt.png" }
  ]
  const showFallBack = () => {
    if (banners) {
      return banners.map((item, index) => {
        return (
          <ReactImageFallback
            key={index}
            src={item.image}
            fallbackImage={noImg}
            alt="img bottm img"
            className="product-image"
          />
        )
      })
    }
  }
  return (
    <div>
      <Slider {...settings}>
          {showFallBack()}
      </Slider>

    </div>
  )
}