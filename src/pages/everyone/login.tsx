import React, { useState } from 'react';
import axios from 'axios';

interface LoginFormProps {
  onSubmit: (username: string, password: string) => void;
}

export const handleLoginFormSubmit = (username: string, password: string) => {
  
  };

const CustomerLoginForm = ({ onSubmit }: LoginFormProps) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [registerStatus, setregisterStatus] = useState('');

  

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    onSubmit(username, password);
  };

  return (
    <div className="container m-4  bg-white  max-w-md mx-auto p-4 ">
    <h1 className="text-3xl font-bold m-4 p-4 mb-8 text-[#48466D] flex justify-start">Customer Login</h1>
    <form onSubmit={handleSubmit} className='grid grid-cols-2 gap-4'>
      <label className='col-start-1 text-[#48466D] font-semibold flex justify-end'>
        Username:
      </label>
        <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} className='col-start-2 border-2 rounded border-gray-500 hover:border-[#48466D]' />
      <br />
      <label className='col-start-1 text-[#48466D] font-semibold flex justify-end'>
        Password:
      </label>
        <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} className='col-start-2 border-2 rounded border-gray-500 hover:border-[#48466D]' />
      <br />
      <button type="submit" className='justify-end m-4 w-20 text-center items-center rounded-md border bg-[#48466D] px-5 py-2 text-sm font-medium text-white hover:bg-[#605d91] transition duration-300'>Submit</button>
    </form>
    </div>
  );
};

export default CustomerLoginForm;