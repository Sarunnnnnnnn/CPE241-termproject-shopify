import React, { useState } from "react";
import adidas from "../../assets/adidasLogo.jpg";
import ari from "../../assets/ariLogo.jpg";
import nike from "../../assets/nikeLogo.jpg";
import underamour from "../../assets/underarmourLogo.jpg";
import sabina from "../../assets/sabinaLogo.jpg";
import eveandboy from "../../assets/eveandboyLogo.jpg";
import cerave from "../../assets/ceraveLogo.jpg";
import maybelline from "../../assets/maybellinenewyorkLogo.png";
import garnier from "../../assets/garnierLogo.jpg";
import loreal from "../../assets/lorealparisLogo.jpg";
import pantene from "../../assets/panteneLogo.jpg";
import kleenex from "../../assets/kleenexLogo.jpg";
import downy from "../../assets/downyLogo.jpg";
import mamypoko from "../../assets/mamypokoLogo.jpg";
import focus from "../../assets/focusLogo.png";
import eloop from "../../assets/eloopLogo.jpg";
import studio7 from "../../assets/studio7Logo.jpg";
import samsung from "../../assets/samsungLogo.jpg";
import hisense from "../../assets/hisenseLogo.jpg";
import xiaomi from "../../assets/xiaomiLogo.jpg";
import dyson from "../../assets/dysonLogo.jpg";
import tefal from "../../assets/tefalLogo.jpg";
import electrolux from "../../assets/electroluxLogo.jpg";
import philips from "../../assets/philipsLogo.jpg";
import hafele from "../../assets/hafeleLogo.jpg";
import nescafe from "../../assets/nescafeLogo.jpg";
import foremost from "../../assets/foremostLogo.jpg";
import lays from "../../assets/laysLogo.jpg";
import nextArrow from "../../assets/nextArrow.svg";
import backArrow from "../../assets/backArrow.svg";
import { Link } from "react-router-dom";

interface Photo {
    id: number;
    src: string;
}

const photos: Photo[] = [
    { id: 1, src: adidas, },
    { id: 2, src: ari, },
    { id: 3, src: nike, },
    { id: 4, src: underamour, },
    { id: 5, src: sabina, },
    { id: 6, src: eveandboy, },
    { id: 7, src: cerave, },
    { id: 8, src: maybelline, },
    { id: 9, src: garnier, },
    { id: 10, src: loreal, },
    { id: 11, src: pantene, },
    { id: 12, src: kleenex, },
    { id: 13, src: downy, },
    { id: 14, src: mamypoko, },
    { id: 15, src: focus, },
    { id: 16, src: eloop, },
    { id: 17, src: studio7, },
    { id: 18, src: samsung, },
    { id: 19, src: hisense, },
    { id: 20, src: xiaomi, },
    { id: 21, src: dyson, },
    { id: 22, src: tefal, },
    { id: 23, src: electrolux, },
    { id: 24, src: philips, },
    { id: 25, src: hafele, },
    { id: 26, src: nescafe, },
    { id: 27, src: foremost, },
    { id: 28, src: lays, },
];

const shuffledPhotos = photos.sort(() => Math.random() - 0.5);
const selectedPhotos = shuffledPhotos.slice(0, 24);

const BrandAd = () => {
    const [currentPhotoIndex, setCurrentPhotoIndex] = useState(0);

    return (
        <div className="flex justify-center my-[30px] relative">
            <div className="mr-[10px]">
                {currentPhotoIndex > 7 && (
                    <button onClick={() => setCurrentPhotoIndex(currentPhotoIndex - 8)} className="absolute z-10 left-[180px] top-1/2 transform -translate-y-1/2" >
                        <img src={backArrow} alt="previous" className="h-[40px]" />
                    </button>
                )}
            </div>
            <div>
                <div className="flex gap-[35px]">
                    {selectedPhotos.slice(currentPhotoIndex, currentPhotoIndex + 4).map((photo) => (
                        <div key={`top-${photo.id}`}>
                            <img
                                src={photo.src}
                                alt={`photo-${photo.id}-1`}
                                className="w-[250px] h-[125px]"
                            />
                        </div>
                    ))}
                </div>
                <div className="flex gap-[35px]">
                    {selectedPhotos.slice(currentPhotoIndex + 4, currentPhotoIndex + 8).map((photo) => (
                        <div key={`bottom-${photo.id}`}>
                            <img
                                src={photo.src}
                                alt={`photo-${photo.id}-2`}
                                className="w-[250px] h-[125px]"
                            />
                        </div>
                    ))}
                </div>
            </div>
            <div className="ml-[10px]">
                {currentPhotoIndex < selectedPhotos.length - 8 && (
                    <button onClick={() => setCurrentPhotoIndex(currentPhotoIndex + 8)} className="absolute z-10 right-[180px] top-1/2 transform -translate-y-1/2" >
                        <img src={nextArrow} alt="next" className="h-[40px]" />
                    </button>
                )}
            </div>
        </div>
    );
};

export default BrandAd;
