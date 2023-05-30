import { useState } from 'react';
import axios from 'axios';
import addImage from '../../assets/addImage.svg';

interface ShippingCompany {
    id: number;
    name: string;
}

const shippingCompany = (): ShippingCompany[] => [
    { id: 1, name: 'Kerry Express' },
    { id: 2, name: 'Flash Express' },
    { id: 3, name: 'J&T Express' },
    { id: 4, name: 'DHL Express' },
    { id: 5, name: 'Thailand Post' },
];

function ShopProfile() {
    const [formData, setFormData] = useState({
        shopname: '',
        shipcom: '',
        
    });

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        try {
          const response = await axios.post(
            'http://localhost:3001/shopSeller',
            {
              shopname: formData.shopname,
              shipcom: formData.shipcom,
              imageBase64: imageUrl.split(',')[1]
            },
            {
              headers: {
                Authorization: `Bearer ${localStorage.getItem('access_token')}`,
                'Access-Control-Allow-Origin': '*',
              },
            }
          );
          console.log(response.data.message);
          window.location.reload();
        } catch (error) {
          console.error(error);
        }
      };

    const handleChange = (event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        setFormData({
            ...formData,
            [event.target.name]: event.target.value
        });
    };

    const [imageUrl, setImageUrl] = useState<string>("");

    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
          const reader = new FileReader();
          reader.onload = (e) => {
            const base64 = btoa(e.target?.result as string);
            setImageUrl(`data:image/png;base64,${base64}`);
          };
          reader.readAsBinaryString(e.target.files[0]);
        }
      };

    const handleEditImage = () => {
        const fileInput = document.querySelector<HTMLInputElement>('#shop-logo');
        if (fileInput) {
            fileInput.value = '';
        }
        setImageUrl('');
    };

    return (
        <form onSubmit={handleSubmit} className="w-full">
            <div className="mt-[140px] font-general">
                <div className="ml-[50px] text-[24px] font-medium">Shop Profile</div>
                <div className="relative flex items-center justify-center mt-[50px]">
                    {imageUrl ? (
                        <div>
                            <img
                                src={imageUrl}
                                alt="shop-logo"
                                className="w-[130px] h-[130px] rounded-full object-cover" />
                            <button
                                type="button"
                                className="absolute mt-[10px] text-[14px] hover:text-red-500 transition duration-300 ml-[10px]"
                                onClick={handleEditImage}
                            >
                                Change Image
                            </button>
                        </div>
                    ) : (
                        <label htmlFor="shop-logo" className="cursor-pointer">
                            <div className="flex items-center justify-center rounded-full w-[130px] h-[130px] bg-[#D9D9D9] hover:bg-[#dfdfdf]">
                                <img src={addImage} alt="addImageIcon" />
                                <input
                                    id="shop-logo"
                                    name="shop-logo"
                                    type="file"
                                    required
                                    className="sr-only"
                                    accept="image/*"
                                    onChange={handleImageChange}
                                />
                            </div>
                        </label>
                    )}
                </div>
                <div className="grid col-2 gap-x-[25px] gap-y-[20px] items-center mt-[65px]">
                    <label htmlFor="shopname" className="col-start-1 font-medium flex justify-end">Shop Name</label>
                    <input
                        name="shopname"
                        id="shopname"
                        type="text"
                        value={formData.shopname}
                        onChange={handleChange}
                        required
                        className="col-start-2 w-[400px] text-[15px] border-[1px] border-[#AFAFAF] h-[30px] rounded-[5px] pl-[10px]"
                        placeholder="name your shop..."
                    />
                    <label htmlFor="shipcom" className="col-start-1 font-medium flex justify-end">Shipping Company</label>
                    <select
                        name="shipcom"
                        id="shipcom"
                        value={formData.shipcom}
                        onChange={handleChange}
                        required
                        className="col-start-2 w-[400px] text-[15px] border-[1px] border-[#AFAFAF] h-[30px] rounded-[5px] pl-[10px]"
                    >
                        <option value="">--Select Shipping Company--</option>
                        {shippingCompany().sort((a, b) => a.name.localeCompare(b.name)).map((shippingCompany) => (
                            <option key={shippingCompany.id} value={shippingCompany.id}>
                                {shippingCompany.name}
                            </option>
                        ))}
                    </select>
                </div>
                <div className="flex justify-center mt-[65px]">
                    <button
                        type="submit"
                        className="w-[100px] rounded-md bg-[#48466D] px-1 py-2 text-sm text-white hover:bg-[#605d91] transition duration-300;"
                    >
                        Update
                    </button>
                </div>
            </div >
        </form>
    );
}

export default ShopProfile;
