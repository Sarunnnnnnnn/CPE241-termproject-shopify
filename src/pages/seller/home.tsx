import { FC, useState, useEffect } from "react";
import axios from "axios";
import { useLocation } from "react-router-dom";

const Home: FC = () => {
  const [ownerData, setOwnerData] = useState({
    owner_firstname: '',
    owner_lastname: '',
    owner_email: '',
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.post('http://localhost:3001/get_user_seller', null, {
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

  return (
    <div className="ml-10 text-[#48466D] not-italic font-medium md:font-medium">
      <header className=" ">
        <div className="container mx-auto py-4 px-8">
          <h1 className="text-[24px] font-simibold mt-6 ">Home</h1>
          <h1 className="text-[20px] font-simibold mt-[30px]">Task List</h1>
          <p>Welcome {ownerData.owner_firstname} ({ownerData.owner_email})</p>
        </div>
      </header>

      <main className="container  px-8 ">
        <div className="grid grid-cols-4 gap-4 text-center">
          <div className="bg-gray-100 p-4 rounded-lg ">
            <h2 className="text-4xl font-bold text-[#48466D]">0</h2>
            <h2 className="text-lg font-simibold mt-4 ">Pending Order</h2>
          </div>

          <div className="bg-gray-100 p-4 rounded-lg">
            <p className="text-4xl font-bold text-[#48466D]">0</p>
            <h2 className="text-lg font-simibold mt-4">To-Process Shipment</h2>
          </div>

          <div className="bg-gray-100 p-4 rounded-lg">
            <h1 className="text-4xl font-bold text-[#48466D]">0</h1>
            <h2 className="text-lg font-simibold mt-4">Processed Shipment</h2>
          </div>

          <div className="bg-gray-100 p-4 rounded-lg">
            <h1 className="text-4xl font-bold text-[#48466D]">0</h1>
            <h2 className="text-lg font-simibold mt-4">Sold out Products</h2>
          </div>
        </div>
      </main>
    </div>
  );
};
export default Home;
