import React from 'react';
import { Slide } from 'react-slideshow-image';
import 'react-slideshow-image/dist/styles.css';
import imagen1 from '../../assets/banner5.webp';
import imagen2 from '../../assets/banner6.webp';
import imagen3 from '../../assets/banner7.webp';
import imagen4 from '../../assets/imagen1.jpeg';
  
const ImageBanner = () => {
      const images = [
          imagen1,
          imagen2,
          imagen3,
          imagen4
      ];

    return (
        <div className="slide-container">
            <Slide>
                {images.map((image, index) => (
                    <div className="each-slide" key={index}>
                        <div style={{
                            'backgroundImage': `url(${image})`,
                            'height': '400px',
                            'backgroundSize': 'cover',
                        }}>
                        </div>
                    </div>
                ))}
            </Slide>
        </div>
    );
};

export default ImageBanner;