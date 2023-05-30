import { useState,useEffect } from "react";
import axios from 'axios';
interface Address {
  id: number;
  fullName: string;
  addressDesc: string;
  province: string;
  district: string;
  subdistrict: string;
  postalCode: string;
  phoneNumber: string;
}

const MyAddress = () => {
  const [showForm, setShowForm] = useState(false);
  const [fullName, setFullName] = useState('');
  const [addressDesc, setAddressDesc] = useState('');
  const [province, setProvince] = useState('');
  const [district, setDistrict] = useState('');
  const [subdistrict, setSubdistrict] = useState('');
  const [postalCode, setPostalCode] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [editingId, setEditingId] = useState<number | null>(null);
  const [addresses, setAddresses] = useState<Address[]>([]);
  const [inputValue, setInputValue] = useState('');
  
  const handleAddAddress = () => {
    if (!showForm) {
      setShowForm(true);
    }
  };


  const handleCancel = () => {
    setShowForm(false);
    setFullName("");
    setAddressDesc("");
    setProvince("");
    setDistrict("");
    setSubdistrict("");
    setPostalCode("");
    setPhoneNumber("");
    setEditingId(null);
  };

 const handleSave = async () => {
    if (
      !fullName ||
      !addressDesc ||
      !province ||
      !district ||
      !postalCode ||
      !phoneNumber ||
      !subdistrict
    ) {
      alert('Please fill in all the required information.');
      return;
    }

    try {
      const addressData = {
        fullName,
        addressDesc,
        province,
        district,
        subdistrict,
        postalCode,
        phoneNumber,
      };

      const headers = {
        Authorization: `Bearer ${localStorage.getItem('access_token')}`,
        'Access-Control-Allow-Origin': '*',
      };

      if (editingId === null) {
        const response = await axios.post('http://localhost:3001/addAddress', addressData, { headers });
        const newAddress: Address = response.data; // Assuming the API returns the newly added address
        setAddresses([...addresses, newAddress]);
        alert('Address added successfully.');
      } 
      window.location.reload();
      
      handleCancel();
    } catch (error) {
      console.error(error);
      alert('An error occurred while saving the address.');
    }
  };

  const [ownerData, setOwnerData] = useState({
    shop_address_details: '',
    shop_district: '',
    shop_province: '',
    shop_sub_district: '',
    shop_zip_code:'',
    shop_tel_no: '',
    shop_id: '',
    owner_firstname: '',
    owner_lastname: ''
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.post('http://localhost:3001/get_shop', null, {
          headers: {
            'Authorization': 'Bearer ' + localStorage.getItem('access_token'),
            "Access-Control-Allow-Origin":"*"
          },
        });
        setOwnerData(response.data); 
        console.log(response.data); 
      } catch (error) {
        console.error(error);
      }
    };
    
    fetchData();
  }, [localStorage.getItem('access_token')]);


  const handleEdit = (address: Address) => {
    setShowForm(true);

  };

  const handleDelete = async (account: Address) => {
    try {
      const { fullName, addressDesc, province, district, subdistrict, postalCode ,phoneNumber} = account;
  
      const headers = {
        Authorization: `Bearer ${localStorage.getItem('access_token')}`,
        'Access-Control-Allow-Origin': '*',
      };
  
      await axios.post('http://localhost:3001/deleteAddress', { fullName, addressDesc, province, district, subdistrict, postalCode ,phoneNumber}, { headers });
  
      alert('Account deleted successfully.');
      window.location.reload();
    } catch (error) {
      console.error(error);
      alert('An error occurred while deleting the account.');
    }
  };

  return (
    <div className="container py-4 ml-[80px] mt-[100px]"> <div className="text-[24px] font-simibold text-[#48466D] not-italic font-medium md:font-medium mb-4 font-general "> My Address</div>
      {!ownerData.shop_district && (
      <div className="max-w-screen-lg">
    
        <button
          className=" justify-center rounded-md border bg-[#48466D] px-5 py-2 text-sm font-medium text-white hover:bg-[#605d91] transition duration-300; ml-[900px]"
          onClick={handleAddAddress}
        >
          Add Address
        </button>
        <div className="border-b border-gray-200 mt-4  "> </div>
        </div>
      ) }
        <div>
          {ownerData.shop_district && (
            <div key={ownerData.shop_id} >
              <div className="border max-w-screen-xl p-4 my-4 ">
                <div className="m-3 text-[16px] text-[#52525B]">
                <p className="font-bold ">{ownerData.owner_firstname} {ownerData.owner_lastname}</p>
                <p>{ownerData.shop_address_details}</p>
                <p>
                  {ownerData.shop_province}, {ownerData.shop_district} {ownerData.shop_sub_district} {ownerData.shop_zip_code}
                </p>
                <p>{ownerData.shop_tel_no}</p>
                </div>
                <div className="flex justify-end mt-4">
                  <button
                    className="justify-center rounded-md border border-[#48466D] bg-white px-6 py-2 text-sm font-medium text-[#48466D] hover:bg-[#605d91] hover:text-white transition duration-300; mr-2"
                    onClick={() => handleEdit({
                      id: 0, // Set the appropriate ID value here
                      fullName: ownerData.owner_firstname,
                      addressDesc: ownerData.shop_address_details,
                      province: ownerData.shop_province,
                      district: ownerData.shop_district, // Set the appropriate phone number value here
                      subdistrict: ownerData.shop_sub_district,
                      postalCode: ownerData.shop_zip_code,
                      phoneNumber:ownerData.shop_tel_no
                    })
                  }
                  >
                    Edit
                  </button>
                  <button
                    className=" justify-center rounded-md border bg-[#48466D] px-5 py-[7.5px] text-sm font-medium text-white hover:bg-[#605d91] transition duration-300"
                    onClick={() => handleDelete({
                      id: 0, // Set the appropriate ID value here
                      fullName: ownerData.owner_firstname,
                      addressDesc: ownerData.shop_address_details,
                      province: ownerData.shop_province,
                      district: ownerData.shop_district, // Set the appropriate phone number value here
                      subdistrict: ownerData.shop_sub_district,
                      postalCode: ownerData.shop_zip_code,
                      phoneNumber:ownerData.shop_tel_no
                    })
                  }
                  >
                    Delete
                  </button>
                </div>
              </div>
            </div>
          )}
          
        </div>
      
      {showForm && (
        <div className="fixed z-15 inset-0 overflow-y-auto mt-[70px]">
          <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
            {/* Background Overlay */}
            <div
              className="fixed inset-0 transition-opacity"
              aria-hidden="true"
            >
              <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
            </div>

            {/* Popup Container */}
            <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full " >
              <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4 ">
                {/* Form Content */}
                <div className="text-center text-[#48466D] not-italic font-semibold text-[24px] mt-2">Add /Edit Address</div>
                <div className="sm:flex sm:items-start mx-4 mt-2">
                  <div className=" justify-items-center ">
                  
                    <form >
                      <div className="mb-4 ">
                        <label
                          className="block  font-simibold text-[#48466D] not-italic font-bold mb-2 "
                          htmlFor="fullName"
                        >
                          Full Name
                        </label>
                        <input
                          className="border rounded-lg w-[430px] py-2 px-3 text-[#48466D] leading-tight focus:outline-none focus:shadow-outline"
                          type="text"
                          value={fullName}
                          onChange={(e) => setFullName(e.target.value)}
                          id="fullName"
                          placeholder="Full Name"
                        />
                      </div>
                      <div className="mb-4">
                        <label
                          className="block text-[#48466D] font-bold mb-2 "
                          htmlFor="addressDesc"
                        >
                          Address Description
                        </label>
                        <textarea
                          className="border rounded-lg w-[430px] py-2 px-3 text-[#48466D] leading-tight focus:outline-none focus:shadow-outline"
                          value={addressDesc}
                          onChange={(e) => setAddressDesc(e.target.value)}
                          id="addressDesc"
                          placeholder="Address Description"
                        ></textarea>
                      </div>
                      <div className="mb-4">
                        <label
                          className="block text-[#48466D] font-bold mb-2"
                          htmlFor="province"
                        >
                          Province
                        </label>
                        <select
                          className="border rounded-lg py-2 px-3 text-[#48466D] leading-tight focus:outline-none focus:shadow-outline"
                          value={province}
                          onChange={(e) => setProvince(e.target.value)}
                        >
                          <option value="">--Select Province--</option>
                          <option value="Bangkok">Bangkok</option>
                          <option value="Chiang Mai">Chiang Mai</option>
                          <option value="Phuket">Phuket</option>
                        </select>
                      </div>
                      <div className="mb-4">
                        <label
                          className="block text-[#48466D] font-bold mb-2"
                          htmlFor=" District:"
                        >
                          District:
                        </label>
                        <select
                          className="border rounded-lg py-2 px-4 text-[#48466D] leading-tight focus:outline-none focus:shadow-outline"
                          value={district}
                          onChange={(e) => setDistrict(e.target.value)} 
                        >
                          <option value="">--Select District--</option>
                          {province === "Bangkok" && (
                            <>
                              <option value="Bang Kapi">Bang Kapi</option>
                              <option value="Lat Phrao">Lat Phrao</option>
                              <option value="Watthana">Watthana</option>
                            </>
                          )}
                          {province === "Chiang Mai" && (
                            <>
                              <option value="Mueang Chiang Mai">
                                Mueang Chiang Mai
                              </option>
                              <option value="San Sai">San Sai</option>
                              <option value="Hang Dong">Hang Dong</option>
                            </>
                          )}
                          {province === "Phuket" && (
                            <>
                              <option value="Mueang Phuket">
                                Mueang Phuket
                              </option>
                              <option value="Kathu">Kathu</option>
                              <option value="Thalang">Thalang</option>
                            </>
                          )}
                        </select>
                      </div>

                      <div className="mb-4 ">
                        <label
                          className="block  font-simibold text-[#48466D] not-italic font-bold mb-2 "
                          htmlFor="subdistrict"
                        >
                          Subdistrict
                        </label>
                        <input
                          className="border rounded-lg w-[430px] py-2 px-3 text-[#48466D] leading-tight focus:outline-none focus:shadow-outline"
                          type="text"
                          value={subdistrict}
                          onChange={(e) => setSubdistrict(e.target.value)}
                          id="subdistrict"
                          placeholder="Sub-District"
                        />
                      </div>
                      <div className="mb-4">
                        <label
                          className="block text-[#48466D] font-bold mb-2"
                          htmlFor="postalCode"
                        >
                          Postal Code
                        </label>
                        <input
                            className="border rounded-lg py-2 px-3 text-[#48466D] leading-tight focus:outline-none focus:shadow-outline"
                            type="number"
                            value={postalCode}
                            onChange={(e) => {
                              if (e.target.value.length <= 5) {
                                setPostalCode(e.target.value);
                              }
                            }}
                            id="postalCode"
                            placeholder="Postal Code"
                            required 
                      
                        />
                        
                      </div>
                      <div className="mb-4">
                        <label
                          className="block text-[#48466D] font-bold mb-2"
                          htmlFor="phoneNumber"
                        >
                          Phone Number
                        </label>
                        <input
                          className="border rounded-lg py-2 px-3 text-[#48466D] leading-tight focus:outline-none focus:shadow-outline appearance-none"
                          type="number"
                          value={phoneNumber}
                          onChange={(e) => {
                            if (e.target.value.length <= 10) {
                              setPhoneNumber(e.target.value);
                            }
                          }}
                          id="phoneNumber"
                          placeholder="Phone Number"
                      
                        />
                      </div>
                
                    </form>
                  </div>
                </div>
              </div>
              <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
                <button
                  type="button"
                  className="mt-3 w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-5 py-2 bg-[#48466D] text-base font-medium text-white hover:bg-[#605d91] transition duration-300; focus:outline-none focus:ring-2 focus:ring-offset-2 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
                  onClick={handleSave}
                >
                  Save
                </button>
                <button
                  type="button"
                  className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 sm:mt-0 sm:w-auto sm:text-sm"
                  onClick={handleCancel}
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
export default MyAddress;
