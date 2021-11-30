import React from 'react'
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from "react-responsive-carousel";
import styles from "react-responsive-carousel/lib/styles/carousel.min.css";
export default function CarouselComponent() {
    return (
      <Carousel 
      showArrows={true} 
      showThumbs={false} 
      showStatus={true} 
      showIndicators={true}
      stopOnHover={true}
      useKeyboardArrows={true}
      autoPlay emulateTouch={true} infiniteLoop={true} dynamicHeight={true} autoFocus={true}>
        <div>
          <img src="/images/p1.jpg" />
          <p className="legend">Nike Shirt</p>
        </div>
        <div>
          <img src="/images/p2.jpg" />
          <p className="legend">Adidas T-shirt</p>
        </div>
        <div>
          <img src="/images/p3.jpg" />
          <p className="legend">Lacoste Shirt</p>
        </div>
      </Carousel>
    );
}

