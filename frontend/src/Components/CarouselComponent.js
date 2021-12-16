import React from 'react'
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from "react-responsive-carousel";
export default function CarouselComponent() {
    return (
      <Carousel
        showArrows={true}
        showThumbs={false}
        showStatus={true}
        showIndicators={true}
        stopOnHover={true}
        useKeyboardArrows={true}
        autoPlay
        emulateTouch={true}
        infiniteLoop={true}
        dynamicHeight={true}
        autoFocus={true}
      >
        <div>
          <img src="/images/p13.jpg" alt="p13" />
          <p className="legend">Nike Shirt</p>
        </div>
        <div>
          <img src="/images/p18.jpg" alt="p13" />
          <p className="legend">Adidas T-shirt</p>
        </div>
        <div>
          <img src="/images/p10.jpg" alt="p13" />
          <p className="legend">Lacoste Shirt</p>
        </div>
      </Carousel>
    );
}

