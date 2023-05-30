import React, { useState } from 'react';
import axios from 'axios';
import {useNavigate} from 'react-router-dom';
import { Link } from 'react-router-dom';
//const navigate = useNavigate();
interface LoginFormProps {
  onSubmit: (user: { email: string, password: string }) => void;
}

const CustomerLoginForm = ({ onSubmit }: LoginFormProps) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loginError, setLoginError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    try {
      const response = await axios({
        method: 'post',
        url: 'http://localhost:3001/login',
        headers: {
          'Content-Type': 'application/json',
          "Access-Control-Allow-Origin":"*"
        },
        data: {
          email: email,
          password: password
        }
      });
  
      const user = response.data;
  
      if (user.status=="1") {
        onSubmit(user);
        localStorage.setItem("access_token",response.data.access_token);
        navigate('/Home');
      } else {
        setLoginError('Invalid email or password.');
      }
    } catch (error) {
      console.error(error);
      setLoginError('Please try again');
    }
  };
  return (
    <div className=" m-4  bg-white  max-w-md mx-auto p-4  ">
      <h1 className="text-3xl font-bold m-4 text-[#48466D] ml-[260px] ">Shopify</h1>
      <h1 className="text-[28px] font-bold m-4 p-4 mb-5 text-[#48466D] ml-[260px] ">Login</h1>
      <form onSubmit={handleSubmit} className='grid grid-cols-2 gap-4 '>
        <label className='col-start-1 text-[#48466D] font-semibold flex justify-end'>
          Email:
        </label>
        <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} className='col-start-2 border-2 rounded border-gray-500 hover:border-[#48466D]' />
        <br />
        <label className='col-start-1 text-[#48466D] font-semibold flex justify-end'>
          Password:
        </label>
        <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} className='col-start-2 border-2 rounded border-gray-500 hover:border-[#48466D]' />
        <br />
        <button type="submit" className='justify-end m-4 w-24 rounded-md border bg-[#48466D] px-5 py-2 text-sm font-medium text-white hover:bg-[#605d91] transition duration-300 ml-[50px] '>Sign in</button>
      </form>
      {loginError && <div className="text-red-500 ml-[250px]">{loginError}</div>}
      <Link to="/signup" className=" font-poppins">
      <button type="submit" className='justify-end m-1 w-21  rounded-md border bg-[#7773b8] px-5 py-2 text-[12px] font-medium text-white hover:bg-[#605d91] transition duration-300 ml-[270px] '>Sign up</button>
      </Link>
    </div>
  );
};

export default CustomerLoginForm;
