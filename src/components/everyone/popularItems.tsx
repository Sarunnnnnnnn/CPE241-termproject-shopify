import React, { useState } from "react";
import sneakers from "../../images/sneakers.jpg";
import cardigan from "../../images/cardigancoat.jpg";
import steamer from "../../images/handheldsteamer.jpg";
import mascara from "../../images/mascara.jpg";
import applewatch from "../../images/applewatch.jpg";
import eletricgrillpot from "../../images/eletricgrillpot.jpg";
import mouse from "../../images/logitechmouse.jpg";
import brushset from "../../images/brushset.jpg"
import lightstrip from "../../images/lightstrip.jpg";
import ricecooker from "../../images/ricecooker.jpg";
import bottle from "../../images/waterbottle.jpg";
import sportbar from "../../images/sportbra.jpg";
import whitening from "../../images/28Dwhitening.jpg";
import nextArrow from "../../assets/nextArrow.svg";
import backArrow from "../../assets/backArrow.svg";
import { Link } from "react-router-dom";

interface Photo {
    id: number;
    src: string;
    item: string;
}

const photos: Photo[] = [
    {
        id: 1,
        src: sneakers,
        item: "Sneakers",
    },
    {
        id: 2,
        src: cardigan,
        item: "Cardigan Coat",
    },
    {
        id: 3,
        src: steamer,
        item: "Handheld Steamer",
    },
    {
        id: 4,
        src: mascara,
        item: "Browit Mascara",
    },
    {
        id: 5,
        src: applewatch,
        item: "Apple Watch",
    },
    {
        id: 6,
        src: eletricgrillpot,
        item: "Electric Grill and Pot",
    },
    {
        id: 7,
        src: mouse,
        item: "Logitech MX Master 3",
    },
    {
        id: 8,
        src: brushset,
        item: "Jovina Brush Set",
    },
    {
        id: 9,
        src: lightstrip,
        item: "Philips Hue Lightstrip",
    },
    {
        id: 10,
        src: ricecooker,
        item: "Toshiba Rice Cooker",
    },
    {
        id: 11,
        src: bottle,
        item: "Gallon Water Bottle",
    },
    {
        id: 12,
        src: sportbar,
        item: "Sport Bra",
    },
    {
        id: 13,
        src: whitening,
        item: "Dr.Pong 28D Whitening",
    },
    {
        id: 14,
        src: cardigan,
        item: "Cardigan Coat",
    },
    {
        id: 15,
        src: steamer,
        item: "Handheld Steamer",
    },
    {
        id: 16,
        src: mascara,
        item: "Browit Mascara",
    },
    {
        id: 17,
        src: applewatch,
        item: "Apple Watch",
    },
    {
        id: 18,
        src: bottle,
        item: "Gallon Water Bottle",
    },
];

const PopularItems = () => {
    const [currentPhotoIndex, setCurrentPhotoIndex] = useState(0);

    return (
        <div className="relative">
            <div className="mt-[25px] mb-[10px] ml-[205px]">
                <Link to="/popularItems" className="font-general font-medium text-[18px]">
                    POPULAR ITEMS
                </Link>
            </div>
            <div className="flex justify-center">
                {currentPhotoIndex > 5 && (
                    <button onClick={() => setCurrentPhotoIndex(currentPhotoIndex - 1)} className="absolute z-5 left-[180px] top-1/2 transform -translate-y-1/2" >
                        <img src={backArrow} alt="previous" className="h-[40px]" />
                    </button>
                )}
                <div className="flex gap-[30px]">
                    {photos.slice(currentPhotoIndex, currentPhotoIndex + 6).map((photo) => (
                        <div>
                            <div>
                                <img
                                    key={photo.id}
                                    src={photo.src}
                                    alt={`photo-${photo.id}`}
                                    className="w-[160px] h-[160px]"
                                />
                            </div>
                            <div className="text-center mt-[15px] font-gray text-[14px] font-medium">{photo.item}</div>
                        </div>
                    ))}
                </div>
                {currentPhotoIndex < photos.length - 6 && (
                    <button onClick={() => setCurrentPhotoIndex(currentPhotoIndex + 1)} className="absolute z-5 right-[180px] top-1/2 transform -translate-y-1/2" >
                        <img src={nextArrow} alt="next" className="h-[40px]" />
                    </button>
                )}
            </div>
        </div>
    );
};

export default PopularItems;
