import logo from '../../assets/logo.svg';
import { Link } from 'react-router-dom';
import profile from '../../assets/profile.svg';
import { FC, useState, useEffect } from "react";
import axios from "axios";
//import down from '../../assets/down.svg';

const Navbar = () => {
    const [ownerData, setOwnerData] = useState({
        owner_firstname: '',
        owner_lastname: '',
        owner_email: '',
        image:'',
        shop_name:''
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


    return (
        <nav className="fixed top-0 left-0 w-full bg-white z-50">
            <div className="flex items-center px-[70px] pt-[5px] h-[70px]">
                <Link to="/homeSeller" className="mr-[20px]">
                    <img src={logo} alt="Logo" className="w-[230px]" />
                </Link>
                <div className="font-general font-medium text-[20px] flex w-full justify-center">{ownerData.shop_name}</div>
                <div className="flex items-center justify-center gap-[10px] mr-[20px]" >
                 {ownerData.image && (
                <div className="w-[50px] rounded-full overflow-hidden">
                <img src={`data:image/png;base64,${ownerData.image}`} alt="Owner" />
                </div>
                   )}
                    <div className="font-general" > {ownerData.owner_firstname}</div>
                   
                </div>
            </div>
            <div className="border-b border-[#48466D] mx-[56px]"></div>
        </nav>
    )
}

export default Navbar;
