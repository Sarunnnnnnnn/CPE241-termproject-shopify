import { useState, useEffect } from "react";
import UploadImage from "../../components/seller/uploadProductImage";
import addImage from "../../assets/addImage.svg";
import deleteIcon from "../../assets/delete.svg";
import axios from "axios";

interface Product {
  name: string;
  description: string;
  imageUrl?: string;
  category: string;
  subcategory: string;
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


  const [price, setPrice] = useState("");
  const [weight, setWeight] = useState("");

  const handleNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setName(event.target.value);
  };

  const handleDescriptionChange = (
    event: React.ChangeEvent<HTMLTextAreaElement>
  ) => {
    setDescription(event.target.value);
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (name && description) {
      

      const newProduct = {
        name,
        description,
        category: selectedCategoryId, // เพิ่มค่าหมวดหมู่หลักที่เลือกให้กับ newProduct
        subcategory: selectedSubcategory,
        unitprice,
        unitweight,
        price,
        weight,
        quantity,
      };

      const headers = {
        Authorization: `Bearer ${localStorage.getItem("access_token")}`,
        "Access-Control-Allow-Origin": "*",
      };

      try {
        await axios.post("http://localhost:3001/addProduct", newProduct, {
          headers,
        });
        onProductAdd(newProduct);
        setName("");
        setDescription("");
        setSelectedCategoryId("");
        
      } catch (error) {
        // Handle the error
        console.error("Error submitting data:", error);
      }
    }
  };

  const [selectedCategoryId, setSelectedCategoryId] = useState("");
  const [selectedSubcategory, setSelectedSubcategory] = useState("");

  const handleCategoryChange = (
    event: React.ChangeEvent<HTMLSelectElement>
  ) => {
    setSelectedCategoryId(event.target.value);
  };

  const handleSubcategoryChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedSubcategory(event.target.value);
  };


  const [variations, setVariations] = useState<Variation[]>([]);
  const [selectedVariation, setSelectedVariation] = useState<Variation | null>(
    null
  );

  const handleVariationChange = (
    event: React.ChangeEvent<HTMLSelectElement>
  ) => {
    const selectedId = Number(event.target.value);
    const variation = variations.find((v) => v.id === selectedId);
    setSelectedVariation(variation ?? null);

    if (variation) {
      setUnitPrice(variation.unitPrice ?? 0);
      setUnitWeight(variation.unitWeight ?? 0);
      setQuantity(variation.quantity ?? 1);
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

  const handleAddImageChange = () => {
    setShowImageOption(true);
  };

  const handleImageOptionChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const files = event.target.files;
    if (files) {
      const newImageOption = Array.from(files);
      setImageOption(newImageOption);
    }
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

  interface Option {
    name?: string;
    price?: number;
    weight?: number;
    stock?: number;
    images?: File[];
  }

  const [options, setOptions] = useState<Option[]>([]);
  const [currentOption, setCurrentOption] = useState<Option | null>(null);

  const handleAddOption = () => {
    if (options.length >= 30) {
      return;
    }
    setOptions([...options, currentOption ?? {}]);
    setCurrentOption(null);
  };

  const handleOptionChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, files } = e.target;
    setCurrentOption((prevOption) => ({
      ...prevOption,
      [name]: files ? Array.from(files) : value,
    }));
  };

  const handleDeleleOption = (index: number) => {
    const updatedOptions = [...options];
    updatedOptions.splice(index, 1);
    setOptions(updatedOptions);
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="ml-[50px] mt-[140px]">
        <div className="font-general">
          <div className="text-[24px] font-medium">Add New Product</div>
          <div className="font-medium mt-[15px] ml-[15px]">
            Product Information
          </div>
          <div className="grid col-2 gap-x-[25px] gap-y-[15px] mt-[30px] text-[14px] ml-[10px]">
            <label
              htmlFor="product-name"
              className="col-start-1 flex justify-end items-center font-medium"
            >
              *Product Name
            </label>
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

            <label
              htmlFor="product-description"
              className="col-start-1 flex justify-end mt-[6px] font-medium"
            >
              *Product Description
            </label>
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

            <label
              htmlFor="product-image"
              className="flex justify-end mt-[6px] font-medium"
            >
              *Product Image
            </label>
            <UploadImage />

            <label
              htmlFor="product-category"
              className="col-start-1 flex justify-end items-center font-medium"
            >
              *Category
            </label>
            <select
              id="category"
              name="category"
              className="col-start-2 w-[250px] border-[1px] border-[#AFAFAF] h-[30px] rounded-[5px] pl-[10px]"
              onChange={handleCategoryChange}
              value={selectedCategoryId}
            >
              <option value="">-- select category --</option>
              {category()
                .sort((a, b) => a.name.localeCompare(b.name))
                .map((category) => (
                  <option key={category.id} value={category.name}>
                    {category.name}
                  </option>
                ))}
            </select>

            <label
              htmlFor="subcategory"
              className="col-start-1 flex justify-end items-center font-medium"
            >
              *Subcategory
            </label>
            <select
              id="subcategory"
              name="subcategory"
              className="col-start-2 w-[250px] border-[1px] border-[#AFAFAF] h-[30px] rounded-[5px] pl-[10px]"
              onChange={handleSubcategoryChange}
              value={selectedSubcategory}
            >
              <option value="">-- select subcategory --</option>
              {category()
                .find((category) => category.name === selectedCategoryId)
                ?.subcategories.sort((a, b) => a.name.localeCompare(b.name))
                .map((subcategory) => (
                  <option key={subcategory.id} value={subcategory.name}>
                    {subcategory.name}
                  </option>
                ))}
            </select>

            <label
              htmlFor="product-variation"
              className="col-start-1 flex justify-end items-center font-medium"
            >
              Variation
            </label>
            <select
              id="product-variation"
              name="product-variation"
              className="col-start-2 w-[250px] border-[1px] border-[#AFAFAF] h-[30px] rounded-[5px] pl-[10px]"
              onChange={handleVariationChange}
            >
              <option value="">-- select variation --</option>
              {variation()
                .sort((a, b) => a.name.localeCompare(b.name))
                .map((variation) => (
                  <option key={variation.id} value={variation.id}>
                    {variation.name}
                  </option>
                ))}
            </select>

            {selectedVariation && (
              <>
                <label
                  htmlFor="product-options"
                  className="col-start-1 flex justify-end font-medium mt-[28px]"
                >
                  *Option
                </label>

                <div className="">
                  {options.map((option, index) => (
                    <div className="flex flex-col gap-[15px]">
                      <div key={index} className="flex flex-row gap-[15px]">
                        <div className="flex flex-col gap-[3px]">
                          <label
                            htmlFor={`option-name-${index}`}
                            className="items-end font-medium"
                          >
                            *Option name
                          </label>
                          <input
                            id={`option-name-${index}`}
                            name={`option-name-${index}`}
                            value={option.name}
                            type="text"
                            required
                            maxLength={30}
                            onChange={handleOptionChange}
                            className="w-[140px] border-[1px] border-[#AFAFAF] h-[30px] rounded-[5px] pl-[10px]"
                            disabled={!selectedVariation}
                          />
                        </div>

                        <div className="flex flex-col gap-[3px]">
                          <label
                            htmlFor={`option-price-${index}`}
                            className="items-end font-medium"
                          >
                            *Price (THB)
                          </label>
                          <input
                            id={`option-price-${index}`}
                            name={`option-price-${index}`}
                            value={option.price}
                            type="number"
                            required
                            onChange={handleOptionChange}
                            className="w-[140px] border-[1px] border-[#AFAFAF] h-[30px] rounded-[5px] pl-[10px]"
                            disabled={!selectedVariation}
                          />
                        </div>

                        <div className="flex flex-col gap-[3px]">
                          <label
                            htmlFor={`option-weight-${index}`}
                            className="items-end font-medium"
                          >
                            *Weight (g)
                          </label>
                          <input
                            id={`option-weight-${index}`}
                            name={`option-weight-${index}`}
                            value={option.weight}
                            type="number"
                            required
                            onChange={handleOptionChange}
                            className="w-[140px] border-[1px] border-[#AFAFAF] h-[30px] rounded-[5px] pl-[10px]"
                            disabled={!selectedVariation}
                          />
                        </div>

                        <div className="flex flex-col gap-[3px]">
                          <label
                            htmlFor={`option-stock-${index}`}
                            className="items-end font-medium"
                          >
                            *Stock
                          </label>
                          <input
                            id={`option-stock-${index}`}
                            name={`option-stock-${index}`}
                            value={option.stock}
                            type="number"
                            required
                            onChange={handleOptionChange}
                            className="w-[140px] border-[1px] border-[#AFAFAF] h-[30px] rounded-[5px] pl-[10px]"
                            disabled={!selectedVariation}
                          />
                        </div>

                        <div className="mt-[28px]">
                          <button
                            className="hover:underline font-medium"
                            onClick={handleAddImageChange}
                          >
                            Add Image
                          </button>
                        </div>

                        <div className="mt-[28px]">
                          <button
                            className="hover:underline font-medium text-[#FE0202]"
                            onClick={() => {
                              handleDeleleOption(index);
                            }}
                          >
                            Delete
                          </button>
                        </div>
                      </div>

                      <div className="col-start-2">
                        {imageOption.map((image, imageIndex) => (
                          <div key={imageIndex} className="relative">
                            <img
                              src={URL.createObjectURL(image)}
                              alt="productImageOption"
                              className="mb-[15px] h-[120px] w-[120px] object-cover rounded-lg border-[1px] border-[#AFAFAF]"
                            />
                            <img
                              src={deleteIcon}
                              alt="deleteIcon"
                              onClick={() =>
                                handleDeleteImageOption(imageIndex)
                              }
                              className="absolute top-[5px] left-[95px] h-[20px] cursor-pointer opacity-50 hover:opacity-100 hover:duration-500"
                            />
                          </div>
                        ))}

                        {showImageOption && imageOption.length < 1 && (
                          <label
                            htmlFor="imageOption-upload"
                            className="cursor-pointer mb-[15px]"
                          >
                            <div className="mb-[15px] h-[120px] w-[120px] bg-gray-100 rounded-lg flex items-center justify-center border-[1px] border-[#AFAFAF]">
                              <div className="flex flex-col items-center justify-center">
                                <img src={addImage} alt="addImageIcon" />
                                <div className="absolute text-[12px] text-gray-400 mt-[90px]">
                                  Upload Image
                                </div>
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
                    </div>
                  ))}

                  <div className="col-start-2">
                    <button
                      className="py-1 px-3 rounded-lg border-[1px] border-[#48466D] hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-300 focus:ring-offset-2"
                      onClick={handleAddOption}
                    >
                      Add Option
                    </button>
                  </div>
                </div>
              </>
            )}

            {!selectedVariation && (
              <>
                <label
                  htmlFor="product-price"
                  className="col-start-1 flex justify-end items-center font-medium"
                >
                  *Unit Price
                </label>
                <input
                  id="product-price"
                  name="product-price"
                  type="number"
                  required
                  value={price}
                  onChange={(e) => setPrice(e.target.value)}
                  className="col-start-2 w-[250px] border-[1px] border-[#AFAFAF] h-[30px] rounded-[5px] pl-[10px]"
                />

                <label
                  htmlFor="product-weight"
                  className="col-start-1 flex justify-end items-center font-medium"
                >
                  *Unit Weight
                </label>
                <input
                  id="product-weight"
                  name="product-weight"
                  type="number"
                  required
                  value={weight}
                  onChange={(e) => setWeight(e.target.value)}
                  // onChange={handleUnitweightChange}
                  className="col-start-2 w-[250px] border-[1px] border-[#AFAFAF] h-[30px] rounded-[5px] pl-[10px]"
                />

                <label
                  htmlFor="product-quantity"
                  className="col-start-1 flex justify-end items-center font-medium"
                >
                  *Quantity
                </label>
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
