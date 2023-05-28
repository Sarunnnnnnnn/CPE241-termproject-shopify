import { useState } from "react";
import next from "../../assets/next.svg";
import nextArrow from "../../assets/nextArrow.svg";
import backArrow from "../../assets/backArrow.svg";
import clothes1 from "../../images/clothes1.jpg";
import clothes2 from "../../images/clothes2.jpg";
import clothes3 from "../../images/clothes3.jpg";
import clothes4 from "../../images/clothes4.jpg";
import clothes5 from "../../images/clothes5.jpg";
import clothes6 from "../../images/clothes6.jpg";
import clothes7 from "../../images/clothes7.jpg";
import clothes8 from "../../images/clothes8.jpg";
import shipping from "../../assets/shipping.svg";

type ProductInfo = {
    id: number;
    category: string;
    subCategory: string;
    product_name: string;
    images: Record<string, string>;
    rating: number;
    numberOfRating: number;
    sold: number;
    shop_district: string;
    shop_province: string;
    variation1?: string;
    option1?: string;
    variation2?: string;
    option2?: string;
    unitprice: number;
    unitweight: number;
    stock: number;
};

const products: ProductInfo[] = [
    {
        id: 1,
        category: "clothes",
        subCategory: "tops",
        product_name: "เสื้อกล้ามไหมพรมถักลายตาราง เสื้อกั๊กหญิง สไตล์ย้อนยุคเกาหลี ส่งฟรีนะจ้ะ 2 ตัว 20 8 ตัว 100 จ้า",
        images: { clothes1, clothes2, clothes3, },
        rating: 4.5,
        numberOfRating: 100,
        sold: 10,
        shop_district: "Bangmod",
        shop_province: "Bangkok",
        variation1: "Pattern",
        option1: "A001",
        variation2: "Size",
        option2: "S",
        unitprice: 150,
        unitweight: 200,
        stock: 115,
    },
    {
        id: 2,
        category: "clothes",
        subCategory: "tops",
        product_name: "เสื้อกล้ามไหมพรมถักลายตาราง เสื้อกั๊กหญิง สไตล์ย้อนยุคเกาหลี ส่งฟรีนะจ้ะ 2 ตัว 20 8 ตัว 100 จ้า",
        images: { clothes1, clothes2, clothes4, },
        rating: 4.5,
        numberOfRating: 100,
        sold: 10,
        shop_district: "Bangmod",
        shop_province: "Bangkok",
        variation1: "Pattern",
        option1: "A001",
        variation2: "Size",
        option2: "M",
        unitprice: 150,
        unitweight: 225,
        stock: 12,
    },
    {
        id: 3,
        category: "clothes",
        subCategory: "tops",
        product_name: "เสื้อกล้ามไหมพรมถักลายตาราง เสื้อกั๊กหญิง สไตล์ย้อนยุคเกาหลี ส่งฟรีนะจ้ะ 2 ตัว 20 8 ตัว 100 จ้า",
        images: { clothes1, clothes2, clothes5, },
        rating: 4.5,
        numberOfRating: 100,
        sold: 10,
        shop_district: "Bangmod",
        shop_province: "Bangkok",
        variation1: "Pattern",
        option1: "A001",
        variation2: "Size",
        option2: "L",
        unitprice: 200,
        unitweight: 250,
        stock: 162,
    },
];

const ProductComponent = () => {
    const uniqueProducts = products.reduce((acc: ProductInfo[], product) => {
        const existingProduct = acc.find(
            (p) =>
                p.product_name === product.product_name &&
                p.category === product.category &&
                p.subCategory === product.subCategory
        );
        if (!existingProduct) {
            acc.push({ ...product });
        }
        return acc;
    }, [] as ProductInfo[]);

    const [currentPhotoIndex, setCurrentPhotoIndex] = useState(0);
    const [selectedPhoto, setSelectedPhoto] = useState("");

    const handlePhotoClick = (key: string) => {
        setSelectedPhoto(key);
    };

    return (
        <div className="mr-[200px]">
            <div className="mt-[85px] ml-[110px]">
                <div className="flex items-center gap-[8px] text-[14px]">
                    <div className="font-lightgray">shopify</div>
                    <img src={next} alt="Arrow" className="h-[9px]" />
                    <div className="font-lightgray">{products[0].category}</div>
                    <img src={next} alt="Arrow" className="h-[9px]" />
                    <div className="font-lightgray">{products[0].subCategory}</div>
                    <img src={next} alt="Arrow" className="h-[9px]" />
                    <div className="font-general">{products[0].product_name}</div>
                </div>
            </div>
            <div className="flex ml-[200px] mt-[25px]">
                <div className="flex flex-col">
                    <div className="relative h-[450px] w-[450px] overflow-hidden">
                        <img
                            key={selectedPhoto || Object.keys(products[0].images)[0]}
                            src={products[0].images[selectedPhoto || Object.keys(products[0].images)[0]]}
                            alt={`product-${selectedPhoto || Object.keys(products[0].images)[0]}`}
                            className="absolute h-full w-full object-cover" />
                    </div>
                    <div className="relative w-[450px] mt-[7px]">
                        <div>
                            {currentPhotoIndex > 0 && (
                                <button onClick={() => setCurrentPhotoIndex(currentPhotoIndex - 1)} className="absolute z-10 left-[-20px] top-1/2 transform -translate-y-1/2" >
                                    <img src={backArrow} alt="previous" className="h-[35px]" />
                                </button>
                            )}
                        </div>
                        <div className="grid grid-cols-4 gap-[7px] h-[105px]">
                            {Object.keys(products[currentPhotoIndex].images).slice(currentPhotoIndex, currentPhotoIndex + 4).map((key) => (
                                <div className="relative" onClick={() => handlePhotoClick(key)}>
                                    <img
                                        src={products[0].images[key]}
                                        alt={`clothes${key}`}
                                        className="absolute h-full w-full object-cover cursor-pointer"
                                    />
                                </div>
                            ))}
                        </div>
                        <div>
                            {currentPhotoIndex < Object.keys(products[currentPhotoIndex].images).length - 4 && (
                                <button onClick={() => setCurrentPhotoIndex(currentPhotoIndex + 1)} className="absolute z-10 right-[-20px] top-1/2 transform -translate-y-1/2">
                                    <img src={nextArrow} alt="next" className="h-[35px]" />
                                </button>
                            )}
                        </div>
                    </div>
                </div>
                <div className="flex flex-col ml-[50px]">
                    <div className="font-heavygray text-[22px]">{products[0].product_name}</div>
                    <div className="flex mt-[10px] gap-[10px] items-center">
                        <div className="font-general text-[18px] font-medium">{products[0].rating}</div>
                        <div className="font-midgray text-[24px] font-extralight mx-[5px]">|</div>
                        <div className="font-general text-[18px] font-medium">{products[0].numberOfRating}</div>
                        <div className="font-midgray text-[16px]">Reviews</div>
                        <div className="font-midgray text-[24px] font-extralight mx-[5px]">|</div>
                        <div className="font-general text-[18px] font-medium">{products[0].sold}</div>
                        <div className="font-midgray text-[16px]">Sold</div>
                    </div>
                    <div className="font-general text-[32px] my-[15px]">100THB - 250THB</div>
                    <div className="flex relative items-center mt-[15px]">
                        <div className="font-lightgray text-[16px]">Shipping</div>
                        <div className="absolute font-orange text-[16px] ml-[120px]">Free Shipping</div>
                        <img src={shipping} alt="shipping" className="absolute ml-[240px]" />
                    </div>
                    <div className="flex relative mt-[15px]">
                        <div className="font-lightgray text-[16px]">From</div>
                        <div className="absolute font-general text-[16px] ml-[120px]">{products[0].shop_district}, {products[0].shop_province}</div>
                    </div>
                    <div className="flex relative mt-[15px]">
                        <div className="font-lightgray text-[16px]">Pattern</div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProductComponent;
