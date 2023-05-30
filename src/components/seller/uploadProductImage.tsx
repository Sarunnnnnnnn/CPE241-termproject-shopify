import React, { useState } from "react";
import addImage from "../../assets/addImage.svg";
import deleteIcon from "../../assets/delete.svg";

const UploadImage = () => {
    const [images, setImages] = useState<string[]>([]); // เปลี่ยน type เป็น string

const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
  const files = event.target.files;
  if (files) {
    const updatedImages: string[] = [];

    // สร้าง Promise เพื่ออ่านและแปลงภาพเป็น base64
    const readFileAsBase64 = (file: File): Promise<string> => {
      return new Promise((resolve, reject) => {
        const reader = new FileReader();

        reader.onload = () => {
          const base64String = reader.result as string;
          resolve(base64String);
        };

        reader.onerror = reject;
        reader.readAsDataURL(file);
      });
    };

    // สร้างอาร์เรย์ของ promises สำหรับอ่านและแปลงภาพเป็น base64
    const promises: Promise<string>[] = Array.from(files)
      .slice(0, 5 - images.length)
      .map((file) => readFileAsBase64(file));

    // รัน promises และรอให้ทุกอันเสร็จสิ้น
    Promise.all(promises)
      .then((base64Strings) => {
        // นำ base64Strings มาเก็บในอาร์เรย์ updatedImages
        updatedImages.push(...base64Strings);
        setImages([...images, ...updatedImages]);
      })
      .catch((error) => {
        console.error('Error reading files:', error);
      });
  }
};

const handleImageDelete = (index: number) => {
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
                        src={image}
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
