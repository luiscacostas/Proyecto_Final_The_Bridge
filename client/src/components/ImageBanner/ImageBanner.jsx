import React from 'react';
import { Slide } from 'react-slideshow-image';
import 'react-slideshow-image/dist/styles.css';
import imagen1 from '../../assets/banner5.webp';
import imagen3 from '../../assets/banner4.webp';

  
const ImageBanner = () => {
      const images = [
          imagen1,
          imagen3
      ];

    return (
        <div className="slide-container">
            <Slide>
                {images.map((image, index) => (
                    <div className="each-slide" key={index}>
                        <div className='banner' style={{
                            'backgroundImage': `url(${image})`,
                        }}>
                        </div>
                    </div>
                ))}
            </Slide>
        </div>
    );
};

export default ImageBanner;