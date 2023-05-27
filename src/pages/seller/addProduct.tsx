import { useState, useEffect } from "react";
import UploadImage from "../../components/seller/uploadProductImage";
import addImage from "../../assets/addImage.svg";
import deleteIcon from "../../assets/delete.svg";

interface Product {
  name: string;
  description: string;
  imageUrl?: string;
  unitprice: number;
  unitweight: number;
  quantity: number;
}

interface Props {
  onProductAdd: (product: Product) => void;
}

interface Category {
  name: string;
  id: number;
  subcategories: Subcategory[];
}

interface Subcategory {
  name: string;
  id: number;
  categoryId: number;
}

const category = (): Category[] => [
  {
    name: "Electronics",
    id: 1,
    subcategories: [
      { name: "Mobile Phones", id: 1, categoryId: 1 },
      { name: "Laptops", id: 2, categoryId: 1 },
      { name: "Tablets", id: 3, categoryId: 1 },
      { name: "Desktops", id: 4, categoryId: 1 },
    ],
  },
  {
    name: "Clothes",
    id: 2,
    subcategories: [
      { name: "Tops", id: 1, categoryId: 2 },
      { name: "Bottoms", id: 2, categoryId: 2 },
      { name: "Dresses", id: 3, categoryId: 2 },
      { name: "Jackets", id: 4, categoryId: 2 },
      { name: "Underwear", id: 5, categoryId: 2 },
      { name: "Swimwear", id: 6, categoryId: 2 },
      { name: "Sleepwear", id: 7, categoryId: 2 },
    ],
  },
  {
    name: "Shoes",
    id: 3,
    subcategories: [
      { name: "Sneakers", id: 1, categoryId: 3 },
      { name: "Boots", id: 2, categoryId: 3 },
      { name: "Sandals", id: 3, categoryId: 3 },
      { name: "Slippers", id: 4, categoryId: 3 },
    ],
  },
  {
    name: "Beauty",
    id: 4,
    subcategories: [
      { name: "Makeup", id: 1, categoryId: 4 },
      { name: "Skincare", id: 2, categoryId: 4 },
      { name: "Perfume", id: 3, categoryId: 4 },
      { name: "Haircare", id: 4, categoryId: 4 },
      { name: "Bath & Body", id: 5, categoryId: 4 },
      { name: "Nails", id: 6, categoryId: 4 },
    ],
  },
];

interface Variation {
  id: number;
  name: string;
  unitPrice?: number; // add the unitPrice property
  unitWeight?: number;
  quantity?: number;
}

const variation = (): Variation[] => [
  { name: "Color", id: 1 },
  { name: "Size", id: 2 },
  { name: "Material", id: 3 },
  { name: "Option", id: 4 },
  { name: "Model", id: 5 },
  { name: "Pattern", id: 6 },
];

const AddProductForm: React.FC<Props> = ({ onProductAdd }) => {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [imageUrl, setImage] = useState<File | null>(null);
  const [unitprice, setUnitPrice] = useState(0);
  const [unitweight, setUnitWeight] = useState(0);
  const [quantity, setQuantity] = useState(1);

  const handleNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setName(event.target.value);
  };

  const handleDescriptionChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setDescription(event.target.value);
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (name && description) {
      const imageUrl = await UploadImage();
      const newProduct: Product = {
        name,
        description,
        // imageUrl,
        unitprice,
        unitweight,
        quantity,
      };
      onProductAdd(newProduct);
      setName("");
      setDescription("");
      setImage(null);
    }
  };

  const [selectedCategoryId, setSelectedCategoryId] = useState(""); // เพิ่ม state สำหรับเก็บค่า category ที่ถูกเลือก

  // เพิ่ม function สำหรับ handle เมื่อเลือก category ใน dropdown
  const handleCategoryChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedCategoryId(event.target.value);
  };

  const [variations, setVariations] = useState<Variation[]>([]);
  const [selectedVariation, setSelectedVariation] = useState<Variation | null>(null);

  const handleVariationChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedId = Number(event.target.value);
    const variation = variations.find((v) => v.id === selectedId);
    setSelectedVariation(variation ?? null);

    if (variation) {
      setUnitPrice(variation.unitPrice ?? 0)
      setUnitWeight(variation.unitWeight ?? 0)
      setQuantity(variation.quantity ?? 1)
    }
  };

  useEffect(() => {
    const fetchVariations = async () => {
      const variations = await getVariations();
      setVariations(variations);
    };
    fetchVariations();
  }, []);

  const getVariations = async (): Promise<Variation[]> => {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(variation());
      }, 1000);
    });
  };

  const [showImageOption, setShowImageOption] = useState(false);
  const [imageOption, setImageOption] = useState<File[]>([]);
  const [optionList, setOptionList] = useState<string[]>([]);

  const handleAddImageOption = () => {
    setShowImageOption(true);
  };

  const handleImageOptionChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (files) {
      const newImageOption = Array.from(files);
      setImageOption([...imageOption, ...newImageOption]);
    }
  };

  const handleAddOption = () => {
    const optionInput = document.getElementById('product-options') as HTMLInputElement;
    const optionValue = optionInput.value.trim();
    if (optionValue && optionList.length < 30) {
      setOptionList([...optionList, optionValue]);
      optionInput.value = '';
    }
  };

  const handleDeleteOption = (index: number) => {
    const updatedOptions = [...optionList];
    updatedOptions.splice(index, 1);
    setOptionList(updatedOptions);
  };

  const handleDeleteImageOption = (index: number) => {
    const updatedImages = [...imageOption];
    updatedImages.splice(index, 1);
    setImageOption(updatedImages);
  };

  const handleCancel = () => {
    setName("");
    setDescription("");
    setImage(null);
    setSelectedCategoryId("");
    setSelectedVariation(null);
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="ml-[50px] mt-[140px]">
        <div className="font-general">
          <div className="text-[24px] font-medium">Add New Product</div>
          <div className="font-medium mt-[15px] ml-[15px]">Product Information</div>
          <div className="grid col-2 gap-x-[25px] gap-y-[15px] mt-[30px] text-[14px] ml-[10px]">

            <label htmlFor="product-name" className="col-start-1 flex justify-end items-center font-medium">*Product Name</label>
            <input
              id="product-name"
              name="product-name"
              type="text"
              required
              value={name}
              onChange={handleNameChange}
              className="col-start-2 w-[600px] border-[1px] border-[#AFAFAF] h-[30px] rounded-[5px] pl-[10px]"
              placeholder="name your product..."
            />

            <label htmlFor="product-description" className="col-start-1 flex justify-end mt-[6px] font-medium">*Product Description</label>
            <textarea
              id="product-description"
              name="product-description"
              required
              value={description}
              onChange={handleDescriptionChange}
              className="col-start-2 w-[600px] border-[1px] border-[#AFAFAF] rounded-lg px-[10px] py-[5px]"
              placeholder="describe your product..."
              rows={5}
            />

            <label htmlFor="product-image" className="flex justify-end mt-[6px] font-medium">*Product Image</label>
            <UploadImage />

            <label htmlFor="product-category" className="col-start-1 flex justify-end items-center font-medium">*Category</label>
            <select
              id="category"
              name="category"
              className="col-start-2 w-[250px] border-[1px] border-[#AFAFAF] h-[30px] rounded-[5px] pl-[10px]"
              onChange={handleCategoryChange} // เพิ่ม event listener เมื่อเลือก category
            >
              <option value="">-- select category --</option>
              {category().sort((a, b) => a.name.localeCompare(b.name)).map((category) => (
                <option key={category.id} value={category.id}>
                  {category.name}
                </option>
              ))}
            </select>

            <label htmlFor="subcategory" className="col-start-1 flex justify-end items-center font-medium">*Subcategory</label>
            <select
              id="subcategory"
              name="subcategory"
              className="col-start-2 w-[250px] border-[1px] border-[#AFAFAF] h-[30px] rounded-[5px] pl-[10px]"
            >
              <option value="">-- select subcategory --</option>
              {category()
                .find((category) => category.id === Number(selectedCategoryId)) // หา category ที่ถูกเลือก
                ?.subcategories.sort((a, b) => a.name.localeCompare(b.name)) // เรียง subcategories ตามชื่อใน ascending order
                .map((subcategory) => (
                  <option key={subcategory.id} value={subcategory.id}>
                    {subcategory.name}
                  </option>
                ))}
            </select>

            <label htmlFor="product-variation" className="col-start-1 flex justify-end items-center font-medium">Variation</label>
            <select
              id="product-variation"
              name="product-variation"
              className="col-start-2 w-[250px] border-[1px] border-[#AFAFAF] h-[30px] rounded-[5px] pl-[10px]"
              onChange={handleVariationChange} // เพิ่ม event listener เมื่อเลือก variation
            >
              <option value="">-- select variation --</option>
              {variation().sort((a, b) => a.name.localeCompare(b.name)).map((variation) => (
                <option key={variation.id} value={variation.id}>
                  {variation.name}
                </option>
              ))}
            </select>

            {selectedVariation && (
              <>
                <label htmlFor="product-options" className="col-start-1 flex justify-end font-medium mt-[28px]">*Option</label>

                <div className="flex flex-row gap-[15px]">
                  <div className="flex flex-col gap-[3px]">
                    <label htmlFor="product-options" className="items-end font-medium">
                      *Option name
                    </label>
                    <input
                      id="product-options"
                      name="product-options"
                      type="text"
                      required
                      maxLength={30}
                      className="w-[140px] border-[1px] border-[#AFAFAF] h-[30px] rounded-[5px] pl-[10px]"
                    />
                  </div>

                  <div className="flex flex-col gap-[3px]">
                    <label htmlFor="product-price" className="items-end font-medium">
                      *Price (THB)
                    </label>
                    <input
                      id="product-price"
                      name="product-price"
                      type="number"
                      required
                      className="w-[140px] border-[1px] border-[#AFAFAF] h-[30px] rounded-[5px] pl-[10px]"
                      disabled={!selectedVariation} // ถ้าไม่ได้เลือก variation จะไม่สามารถกรอก price ได้
                    />
                  </div>

                  <div className="flex flex-col gap-[3px]">
                    <label htmlFor="product-weight" className="items-end font-medium">
                      *Weight (g)
                    </label>
                    <input
                      id="product-weight"
                      name="product-weight"
                      type="number"
                      required
                      className="w-[140px] border-[1px] border-[#AFAFAF] h-[30px] rounded-[5px] pl-[10px]"
                      disabled={!selectedVariation} // ถ้าไม่ได้เลือก variation จะไม่สามารถกรอก weight ได้
                    />
                  </div>

                  <div className="flex flex-col gap-[3px]">
                    <label htmlFor="product-stock" className="items-end font-medium">
                      *Stock
                    </label>
                    <input
                      id="product-stock"
                      name="product-stock"
                      type="number"
                      required
                      className="w-[140px] border-[1px] border-[#AFAFAF] h-[30px] rounded-[5px] pl-[10px]"
                      disabled={!selectedVariation}
                    />
                  </div>

                  <div className="mt-[28px]">
                    <button
                      className="hover:underline mr-[15px] font-medium"
                      onClick={handleAddImageOption}
                    >
                      Add Image
                    </button>

                    <button
                      className="hover:underline font-medium text-[#FE0202]"
                      // onClick={handleDeleteOption}
                    >
                      Delete
                    </button>
                  </div>
                </div>

                <div className="col-start-2 flex flex-row">
                  {imageOption.map((image, index) => (
                    <div key={index} className="relative">
                      <img
                        src={URL.createObjectURL(image)}
                        alt="productImageOption"
                        className="mb-[15px] h-[120px] w-[120px] object-cover rounded-lg border-[1px] border-[#AFAFAF]"
                      />
                      <img
                        src={deleteIcon}
                        alt="deleteIcon"
                        onClick={() => handleDeleteImageOption(index)}
                        className="absolute top-[5px] right-[5px] h-[20px] cursor-pointer opacity-50 hover:opacity-100 hover:duration-500"
                      />
                    </div>
                  ))}

                  {showImageOption && imageOption.length < 1 && (
                    <label htmlFor="imageOption-upload" className="cursor-pointer mb-[15px]">
                      <div className="h-[120px] w-[120px] bg-gray-100 rounded-lg flex items-center justify-center border-[1px] border-[#AFAFAF]">
                        <div className="flex flex-col items-center justify-center">
                          <img src={addImage} alt="addImageIcon" />
                          <div className="absolute text-[12px] text-gray-400 mt-[90px]">Upload Image</div>
                        </div>
                        <input
                          id="imageOption-upload"
                          name="imageOption-upload"
                          type="file"
                          required
                          className="sr-only"
                          accept="image/*"
                          onChange={handleImageOptionChange}
                          multiple
                        />
                      </div>
                    </label>
                  )}
                </div>

                <div className="col-start-2 mt-[-15px]">
                  <button
                    className="py-1 px-3 rounded-lg border-[1px] border-[#48466D] hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-300 focus:ring-offset-2"
                    onClick={handleAddOption}
                  >
                    Add Option
                  </button>
                </div>
              </>
            )}

            {!selectedVariation && (
              <>
                <label htmlFor="product-price" className="col-start-1 flex justify-end items-center font-medium">*Unit Price</label>
                <input
                  id="product-price"
                  name="product-price"
                  type="number"
                  required
                  // onChange={handleUnitpriceChange}
                  className="col-start-2 w-[250px] border-[1px] border-[#AFAFAF] h-[30px] rounded-[5px] pl-[10px]"
                />

                <label htmlFor="product-weight" className="col-start-1 flex justify-end items-center font-medium">*Unit Weight</label>
                <input
                  id="product-weight"
                  name="product-weight"
                  type="number"
                  required
                  // onChange={handleUnitweightChange}
                  className="col-start-2 w-[250px] border-[1px] border-[#AFAFAF] h-[30px] rounded-[5px] pl-[10px]"
                />

                <label htmlFor="product-quantity" className="col-start-1 flex justify-end items-center font-medium">*Quantity</label>
                <input
                  id="product-quantity"
                  name="product-quantity"
                  type="number"
                  required
                  // onChange={handleQuantityChange}
                  className="col-start-2 w-[250px] border-[1px] border-[#AFAFAF] h-[30px] rounded-[5px] pl-[10px]"
                />
              </>
            )}
          </div>
        </div>
      </div>
      <div className="my-[50px] font-general font-medium text-[14px] flex justify-center">
        <button
          type="button"
          onClick={handleCancel}
          className="bg-gray-300 text-gray-700 py-2 px-5 rounded-lg hover:bg-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-300 focus:ring-offset-2 mr-[20px]"
        >
          Cancel
        </button>

        <button
          type="submit"
          className="bg-[#48466D] text-white py-2 px-4 rounded-lg hover:bg-[#211f57] focus:outline-none focus:ring-2 focus:ring-[#211f57] focus:ring-offset-2"
        >
          Save and Publish
        </button>
      </div>
    </form>
  );
};

export default AddProductForm;
