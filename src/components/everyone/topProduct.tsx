import { Link } from "react-router-dom";
import { useState } from "react";
import backArrow from "../../assets/backArrow.svg";
import nextArrow from "../../assets/nextArrow.svg";
import product1 from "../../images/brushset.jpg";

interface Photo {
    id: number;
    src: string;
    item: string;
    monthlysales: number;
}

const photos: Photo[] = [
    { id: 1, src: product1, item: "Product 1", monthlysales: 12.5 },
    { id: 1, src: product1, item: "Product 1", monthlysales: 12.5 },
    { id: 1, src: product1, item: "Product 1", monthlysales: 12.5 },
    { id: 1, src: product1, item: "Product 1", monthlysales: 12.5 },
    { id: 1, src: product1, item: "Product 1", monthlysales: 12.5 },
    { id: 1, src: product1, item: "Product 1", monthlysales: 12.5 },
    { id: 1, src: product1, item: "Product 1", monthlysales: 12.5 },
    { id: 1, src: product1, item: "Product 1", monthlysales: 12.5 },
    { id: 1, src: product1, item: "Product 1", monthlysales: 12.5 },
    { id: 1, src: product1, item: "Product 1", monthlysales: 12.5 },
    { id: 1, src: product1, item: "Product 1", monthlysales: 12.5 },
    { id: 1, src: product1, item: "Product 1", monthlysales: 12.5 },
    { id: 1, src: product1, item: "Product 1", monthlysales: 12.5 },
    { id: 1, src: product1, item: "Product 1", monthlysales: 12.5 },
    { id: 1, src: product1, item: "Product 1", monthlysales: 12.5 },
    { id: 1, src: product1, item: "Product 1", monthlysales: 12.5 },
    { id: 1, src: product1, item: "Product 1", monthlysales: 12.5 },
    { id: 1, src: product1, item: "Product 1", monthlysales: 12.5 },
]

const TopProduct = () => {
    const [currentPhotoIndex, setCurrentPhotoIndex] = useState(0);

    return (
        <div className="mb-[25px] relative">
            <div className="mb-[25px] ml-[205px]">
                <Link to="/popularItems" className="font-general font-medium text-[18px]">
                    TOP PRODUCTS
                </Link>
            </div>
            <div className="flex justify-center relative">
                {currentPhotoIndex > 5 && (
                    <button onClick={() => setCurrentPhotoIndex(currentPhotoIndex - 1)} className="absolute z-10 left-[180px] top-1/2 transform -translate-y-1/2">
                        <img src={backArrow} alt="previous" className="h-[40px]" />
                    </button>
                )}
                <div className="flex gap-[30px]">
                    {photos.slice(currentPhotoIndex, currentPhotoIndex + 6).map((photo) => (
                        <Link to="/category" key={photo.id}>
                            <div className="relative">
                                <img
                                    src={photo.src}
                                    alt={`photo-${photo.id}`}
                                    className="w-[160px] h-[160px]"
                                />
                                <div className="absolute bottom-0 left-0 right-0 mx-auto text-center bg-[#48466D] opacity-40 py-[2px]">
                                    <div className="font-poppins text-white text-[12px] font-light">Monthly Sales {photo.monthlysales}k+</div>
                                </div>
                            </div>
                            <div className="font-gray font-medium text-[14px] mt-[5px]">{photo.item}</div>
                        </Link>
                    ))}
                </div>
                {currentPhotoIndex < photos.length - 6 && (
                    <button onClick={() => setCurrentPhotoIndex(currentPhotoIndex + 1)} className="absolute z-5 right-[180px] top-1/2 transform -translate-y-1/2">
                        <img src={nextArrow} alt="next" className="h-[40px]" />
                    </button>
                )}
            </div>
        </div>
    );
};

export default TopProduct;

