import { Link } from "react-router-dom";
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
import { useState, useEffect } from "react";

interface Photo {
    id: number;
    src: string;
    item: string;
    unitprice: number;
    sold: number;
}

const photos: Photo[] = [
    {
        id: 1,
        src: sneakers,
        item: "Sneakers",
        unitprice: 100,
        sold: 516,
    },
    {
        id: 2,
        src: cardigan,
        item: "Cardigan Coat",
        unitprice: 49,
        sold: 1156,
    },
    {
        id: 3,
        src: steamer,
        item: "Handheld Steamer",
        unitprice: 16,
        sold: 59,
    },
    {
        id: 4,
        src: mascara,
        item: "Browit Mascara",
        unitprice: 8,
        sold: 594,
    },
    {
        id: 5,
        src: applewatch,
        item: "Apple Watch",
        unitprice: 600,
        sold: 124,
    },
    {
        id: 6,
        src: eletricgrillpot,
        item: "Electric Grill and Pot",
        unitprice: 23,
        sold: 785,
    },
    {
        id: 7,
        src: mouse,
        item: "Logitech MX Master 3",
        unitprice: 54,
        sold: 49,
    },
    {
        id: 8,
        src: brushset,
        item: "Jovina Brush Set",
        unitprice: 21,
        sold: 2469,
    },
    {
        id: 9,
        src: lightstrip,
        item: "Philips Hue Lightstrip",
        unitprice: 16,
        sold: 75,
    },
    {
        id: 10,
        src: ricecooker,
        item: "Toshiba Rice Cooker",
        unitprice: 15,
        sold: 143,
    },
    {
        id: 11,
        src: bottle,
        item: "Gallon Water Bottle",
        unitprice: 10,
        sold: 4956,
    },
    {
        id: 12,
        src: sportbar,
        item: "Sport Bra",
        unitprice: 20,
        sold: 1245,
    },
    {
        id: 1,
        src: sneakers,
        item: "Sneakers",
        unitprice: 100,
        sold: 516,
    },
    {
        id: 2,
        src: cardigan,
        item: "Cardigan Coat",
        unitprice: 49,
        sold: 1156,
    },
    {
        id: 3,
        src: steamer,
        item: "Handheld Steamer",
        unitprice: 16,
        sold: 59,
    },
    {
        id: 4,
        src: mascara,
        item: "Browit Mascara",
        unitprice: 8,
        sold: 594,
    },
    {
        id: 5,
        src: applewatch,
        item: "Apple Watch",
        unitprice: 600,
        sold: 124,
    },
    {
        id: 6,
        src: eletricgrillpot,
        item: "Electric Grill and Pot",
        unitprice: 23,
        sold: 785,
    },
    {
        id: 7,
        src: mouse,
        item: "Logitech MX Master 3",
        unitprice: 54,
        sold: 49,
    },
    {
        id: 8,
        src: brushset,
        item: "Jovina Brush Set",
        unitprice: 21,
        sold: 2469,
    },
    {
        id: 9,
        src: lightstrip,
        item: "Philips Hue Lightstrip",
        unitprice: 16,
        sold: 75,
    },
    {
        id: 10,
        src: ricecooker,
        item: "Toshiba Rice Cooker",
        unitprice: 15,
        sold: 143,
    },
    {
        id: 11,
        src: bottle,
        item: "Gallon Water Bottle",
        unitprice: 10,
        sold: 4956,
    },
    {
        id: 12,
        src: sportbar,
        item: "Sport Bra",
        unitprice: 20,
        sold: 1245,
    },
    {
        id: 1,
        src: sneakers,
        item: "Sneakers",
        unitprice: 100,
        sold: 516,
    },
    {
        id: 2,
        src: cardigan,
        item: "Cardigan Coat",
        unitprice: 49,
        sold: 1156,
    },
    {
        id: 3,
        src: steamer,
        item: "Handheld Steamer",
        unitprice: 16,
        sold: 59,
    },
    {
        id: 4,
        src: mascara,
        item: "Browit Mascara",
        unitprice: 8,
        sold: 594,
    },
    {
        id: 5,
        src: applewatch,
        item: "Apple Watch",
        unitprice: 600,
        sold: 124,
    },
    {
        id: 6,
        src: eletricgrillpot,
        item: "Electric Grill and Pot",
        unitprice: 23,
        sold: 785,
    },
    {
        id: 7,
        src: mouse,
        item: "Logitech MX Master 3",
        unitprice: 54,
        sold: 49,
    },
    {
        id: 8,
        src: brushset,
        item: "Jovina Brush Set",
        unitprice: 21,
        sold: 2469,
    },
    {
        id: 9,
        src: lightstrip,
        item: "Philips Hue Lightstrip",
        unitprice: 16,
        sold: 75,
    },
    {
        id: 10,
        src: ricecooker,
        item: "Toshiba Rice Cooker",
        unitprice: 15,
        sold: 143,
    },
    {
        id: 11,
        src: bottle,
        item: "Gallon Water Bottle",
        unitprice: 10,
        sold: 4956,
    },
    {
        id: 12,
        src: sportbar,
        item: "Sport Bra",
        unitprice: 20,
        sold: 1245,
    },
    {
        id: 1,
        src: sneakers,
        item: "Sneakers",
        unitprice: 100,
        sold: 516,
    },
    {
        id: 2,
        src: cardigan,
        item: "Cardigan Coat",
        unitprice: 49,
        sold: 1156,
    },
    {
        id: 3,
        src: steamer,
        item: "Handheld Steamer",
        unitprice: 16,
        sold: 59,
    },
    {
        id: 4,
        src: mascara,
        item: "Browit Mascara",
        unitprice: 8,
        sold: 594,
    },
    {
        id: 5,
        src: applewatch,
        item: "Apple Watch",
        unitprice: 600,
        sold: 124,
    },
    {
        id: 6,
        src: eletricgrillpot,
        item: "Electric Grill and Pot",
        unitprice: 23,
        sold: 785,
    },
    {
        id: 7,
        src: mouse,
        item: "Logitech MX Master 3",
        unitprice: 54,
        sold: 49,
    },
    {
        id: 8,
        src: brushset,
        item: "Jovina Brush Set",
        unitprice: 21,
        sold: 2469,
    },
    {
        id: 9,
        src: lightstrip,
        item: "Philips Hue Lightstrip",
        unitprice: 16,
        sold: 75,
    },
    {
        id: 10,
        src: ricecooker,
        item: "Toshiba Rice Cooker",
        unitprice: 15,
        sold: 143,
    },
    {
        id: 11,
        src: bottle,
        item: "Gallon Water Bottle",
        unitprice: 10,
        sold: 4956,
    },
    {
        id: 12,
        src: sportbar,
        item: "Sport Bra",
        unitprice: 20,
        sold: 1245,
    },
];

const Recommended = () => {
    const [itemsToShow, setItemsToShow] = useState(12);
    const [showButton, setShowButton] = useState(true);

    const handleShowMore = () => {
        setItemsToShow(itemsToShow + 12);
    };

    useEffect(() => {
        if (itemsToShow >= photos.length) {
            setShowButton(false);
        } else {
            setShowButton(true);
        }
    }, [itemsToShow]);

    return (
        <div className="mb-[80px]">
            <div className="mb-[50px]">
                <div className="mt-[40px] mb-[20px] text-center bg-[#48466D] py-[5px] mx-[200px]">
                    <div className="font-poppins text-white font-medium text-[18px]">
                        RECOMMENDED FOR YOU
                    </div>
                </div>
                <div className="grid grid-cols-6 gap-[15px] mx-[200px]">
                    {photos.slice(0, itemsToShow).map((photo) => (
                        <Link to={`/product/${photo.id}`}>
                            <img
                                key={photo.id}
                                src={photo.src}
                                alt={`photo-${photo.id}`}
                            />
                            <div className="pb-[7px] shadow-md">
                                <div className="mx-[10px]">
                                    <div className="font-general font-medium text-[12px] mt-[5px]">{photo.item}</div>
                                    <div className="flex mt-[7px] items-end">
                                        <div className="font-general font-medium text-[16px]">${photo.unitprice}</div>
                                        <div className="flex flex-grow justify-end">
                                            <div className="font-general font-normal text-[12px]">{photo.sold} sold</div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </Link>
                    ))}
                </div>
            </div>
            {showButton && (
                <div className="flex justify-center">
                    <button onClick={handleShowMore} className="bg-[#48466D] text-white font-poppins font-medium text-[14px] py-[10px] px-[20px] rounded-[10px]">See more</button>
                </div>
            )}
        </div>
    );
};

export default Recommended;
