import React, { useState, useEffect } from 'react';
import Ad1 from "../../images/gadgetad.jpg";
import Ad2 from "../../images/johnsonad.jpg";
import Ad3 from "../../images/nescafead.jpg";
import Ad4 from "../../images/samsungad.jpg"
import Ad5 from "../../images/sofaad.jpg";
import Ad6 from "../../images/airfryerad.jpg";
import Ad7 from "../../images/skincaread.jpg";
import Ad8 from "../../images/airpodsad.jpg";
import './ad.css';

const ad = [Ad1, Ad2, Ad3, Ad4];
const ad2 = [Ad5, Ad6, Ad7, Ad8];

const SlideShow: React.FC = () => {
    const [index, setIndex] = useState(0);

    useEffect(() => {
        const interval = setInterval(() => {
            setIndex((prevIndex) => (prevIndex === ad.length - 1 ? 0 : prevIndex + 1));
        }, 5000);
        return () => clearInterval(interval);
    }, []);

    return (
        <div className="flex justify-center gap-[10px] mt-[25px]">
            <div className="relative h-[300px] w-[700px]">
                {ad.map((image, i) => (
                    <img
                        key={i}
                        src={image}
                        alt="slideshow"
                        className={`absolute top-0 left-0 h-full w-full transition-opacity duration-1000 ${index === i ? 'opacity-100' : 'opacity-0'}`}
                    />
                ))}
            </div>
            <div className="relative h-[300px] w-[400px]">
                {ad2.map((image, i) => (
                    <img
                        key={i}
                        src={image}
                        alt="slideshow"
                        className={`absolute top-0 left-0 h-full w-full transition-opacity duration-1000 ${index === i ? 'opacity-100' : 'opacity-0'}`}
                    />
                ))}
            </div>
        </div>
    );
};

export default SlideShow;
