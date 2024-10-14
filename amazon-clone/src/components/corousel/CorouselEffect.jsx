import React from 'react'
import img from './image/data'
import { Carousel } from 'react-responsive-carousel'
import "react-responsive-carousel/lib/styles/carousel.min.css";
import classes from './Corousel.module.css'

function CorouselEffect() {
  return (
    <div>
      <Carousel
        autoPlay={true}
        infiniteLoop={true}
        showIndicators={false}
        showThumbs={false}
      >
        {
          img.map((imagesLink) => {
            return <img src={imagesLink} alt="carousel" />
          })
        }
      </Carousel>
      <div className={classes.hero__image}></div>

    </div>
  )
}

export default CorouselEffect