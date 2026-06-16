import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import city from '../assets/pexels-misael-garcia-832776-1707820.jpg';
import BACKEND_BASE_URL from '../../api/api';

const Register = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();
    
    if (!name || !email || !password) {
      toast.error('Please fill in all fields');
      return;
    }

    setLoading(true);
    try {
      const res = await axios.post(`${BACKEND_BASE_URL}/api/users/register`, {
        name,
        email,
        password,
      });
      
      if (res.data.token) {
        localStorage.setItem("token", res.data.token);
        toast.success('Registration successful! Welcome!');
        setTimeout(() => navigate('/'), 1500);
      }
    } catch (err) {
      const errorMsg = err.response?.data?.message || err.message || 'Registration failed';
      toast.error(errorMsg);
      console.error('Register error:', err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className='w-screen h-screen flex justify-between bg-gray-100 items-center rounded-2xl'>
      <div className='w-1/2 relative'>
        <div className='w-full h-full flex-col bg-gray-900 absolute flex justify-center items-center opacity-80'>
          <h1 className='text-4xl font-bold text-white'>Welcome to Fastrail</h1>
          <p className='text-xl text-white w-1/2 text-center pt-5'>Fresh groceries and organic produce, delivered to your doorstep.</p>
        </div>
        <img src={city} className='w-full object-cover' alt="img" />
      </div>
      <form onSubmit={handleRegister} className='flex px-60 flex-col gap-3 items-center w-1/2 h-full justify-center border p-2'>
        <h1 className='font-bold text-2xl'>Create your account</h1>
        <p className='text-sm'>Already have an account? <a className='underline font-medium' href='/login'>Sign in</a></p>
        
        <div className='w-full flex flex-col gap-2'>
          <label className='text-sm font-medium'>Full Name</label>
          <input 
            className='w-full bg-white text-sm border font-normal h-10 outline-0 rounded-[5px] indent-2'
            type="text" 
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Your full name"
            disabled={loading}
            required
          />
        </div>

        <div className='w-full flex flex-col gap-2'>
          <label className='text-sm font-medium'>Email Address</label>
          <input 
            className='w-full bg-white text-sm border font-normal h-10 outline-0 rounded-[5px] indent-2'
            type="email" 
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="your.email@example.com"
            disabled={loading}
            required
          />
        </div>

        <div className='w-full flex flex-col gap-2'>
          <label className='text-sm font-medium'>Password</label>
          <input 
            className='w-full border h-10 bg-white outline-0 text-sm rounded-[5px] indent-2'
            type="password" 
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Enter a strong password"
            disabled={loading}
            required
          />
        </div>

        <button 
          className='w-full mt-2 bg-black text-white h-12 rounded-2xl cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed' 
          type="submit"
          disabled={loading}
        >
          {loading ? 'Creating account...' : 'Sign Up'}
        </button>
      </form>
    </div>
  );
};

export default Register;
