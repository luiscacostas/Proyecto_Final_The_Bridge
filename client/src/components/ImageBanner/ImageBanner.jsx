import React from 'react';
import { Slide } from 'react-slideshow-image';
import 'react-slideshow-image/dist/styles.css';
import imagen1 from '../../assets/9149ca7d-a4cc-482e-af50-617684c9c068.webp';
import imagen2 from '../../assets/127277b5-3687-442e-a894-4ddc254e38af.webp';
import imagen3 from '../../assets/ab7dc8da-827d-43b9-8dcf-91457ba9e8ca.webp';
  
const ImageBanner = () => {
      const images = [
          imagen1,
          imagen2,
          imagen3
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