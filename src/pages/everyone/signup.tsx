import { useState } from 'react';
import axios from 'axios';
import {useNavigate} from 'react-router-dom';
function Signup() {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        email: '',
        password: '',
        gen: '',
        phone: '',
        dob: '',
    });

    // Handle form submission
    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        try {
            const response = await axios.post('http://localhost:3001/signup', {
                fname: formData.firstName,
                lname: formData.lastName,
                email: formData.email,
                password: formData.password,
                gen:formData.gen,
                phone:formData.phone,
                dob:formData.dob
            });
            console.log(response.data.message);
            navigate('/login');
        } catch (error) {
            console.error(error);
        }
    };

    // Handle form input changes
    const handleChange = (event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        setFormData({
            ...formData,
            [event.target.name]: event.target.value
        });
    };

    return (
        <div className="container m-4 p-4 bg-white mx-auto max-w-md">
        <h1 className="text-3xl font-bold m-4 p-4 mb-8 text-[#48466D] ml-[220px]">Sign Up</h1>
        <form onSubmit={handleSubmit} className='grid cols-2 gap-4 '>
            <label htmlFor="firstName" className='col-start-1 text-[#48466D] font-semibold flex justify-end'>First Name:</label>
            <input type="text" id="firstName" name="firstName" value={formData.firstName} onChange={handleChange} required className='col-start-2 border-2 rounded border-gray-500 hover:border-[#48466D] '/>

            <label htmlFor="lastName" className='col-start-1 text-[#48466D] font-semibold flex justify-end'>Last Name:</label>
            <input type="text" id="lastName" name="lastName" value={formData.lastName} onChange={handleChange} required className='col-start-2 border-2 rounded border-gray-500 hover:border-[#48466D]'/>

            <label htmlFor="email" className='col-start-1 text-[#48466D] font-semibold flex justify-end'>Email:</label>
            <input type="email" id="email" name="email" value={formData.email} onChange={handleChange} required className='col-start-2 border-2 rounded border-gray-500 hover:border-[#48466D]'/>

            <label htmlFor="password" className='col-start-1 text-[#48466D] font-semibold flex justify-end'>Password:</label>
            <input type="password" id="password" name="password" value={formData.password} onChange={handleChange} required className='col-start-2 border-2 rounded border-gray-500 hover:border-[#48466D]'/>

            <label htmlFor="gen" className='col-start-1 text-[#48466D] font-semibold flex justify-end'>Gender:</label>
            <select id="gen" name="gen" value={formData.gen} onChange={handleChange} required className='col-start-2 border-2 rounded border-gray-500 hover:border-[#48466D]'>
                <option value="">Select Gender</option>
                <option value="male">Male</option>
                <option value="female">Female</option>
                <option value="other">Other</option>
            </select>

            <label htmlFor="phone" className='col-start-1 text-[#48466D] font-semibold flex justify-end'>Phone Number:</label>
            <input type="tel" id="phone" name="phone" value={formData.phone} onChange={handleChange} pattern="[0-9]+" maxLength={10} required className='col-start-2 border-2 rounded border-gray-500 hover:border-[#48466D]'/>

            <label htmlFor="dob" className='col-start-1 text-[#48466D] font-semibold flex justify-end'>Date of Birth:</label>
            <input type="date" id="dob" name="dob" value={formData.dob} onChange={handleChange} required className='col-start-2 border-2 rounded border-gray-500 hover:border-[#48466D]'/>

            <button type="submit" className='col-start-2 w-24  rounded-md border bg-[#48466D] px-1 py-2 text-sm font-medium text-white hover:bg-[#605d91] transition duration-300; ml-[60px] mt-3'>Sign up</button>
        </form>
        </div>
    );
}
export default Signup;
