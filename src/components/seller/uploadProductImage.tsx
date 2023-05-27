import React, { useState } from "react";
import addImage from "../../assets/addImage.svg";
import deleteIcon from "../../assets/delete.svg";

const UploadImage = () => {
    const [images, setImages] = useState<File[]>([]);

    const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const files = event.target.files;
        if (files) {
            // Convert FileList to Array and append to existing images array
            setImages([...images, ...Array.from(files).slice(0, 5 - images.length)]);
        }
    };

    const handleImageDelete = (index: number) => {
        // Create a copy of the images array and remove the image at the specified index
        const updatedImages = [...images];
        updatedImages.splice(index, 1);
        setImages(updatedImages);
    };

    return (
        <div className="flex flex-wrap">
            {images.map((image, index) => (
                <div key={index} className="relative mr-3">
                    <img
                        className="h-[120px] w-[120px] object-cover rounded-lg border-[1px] border-[#AFAFAF]"
                        src={URL.createObjectURL(image)}
                        alt={`Product Image ${index}`}
                    />
                    <img
                        className="absolute top-[5px] right-[5px] h-[20px] cursor-pointer opacity-50 hover:opacity-100 hover:duration-500"
                        src={deleteIcon} 
                        alt="deleteIcon"
                        onClick={() => handleImageDelete(index)} />
                </div>
            ))}
            {images.length < 5 && (
                <label htmlFor="image-upload" className="cursor-pointer">
                    <div className="h-[120px] w-[120px] bg-gray-100 rounded-lg flex items-center justify-center border-[1px] border-[#AFAFAF]">
                        <div className="flex flex-col items-center justify-center">
                            <img src={addImage} alt="addImageIcon" />
                            <div className="absolute text-[12px] text-gray-400 mt-[90px]">Upload Image</div>
                        </div>
                        <input
                            id="image-upload"
                            name="image-upload"
                            type="file"
                            required
                            className="sr-only"
                            accept="image/*"
                            onChange={handleImageChange}
                            multiple
                        />
                    </div>
                </label>
            )}
        </div>
    );
};

export default UploadImage;
