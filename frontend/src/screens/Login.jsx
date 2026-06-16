import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import city from '../assets/pexels-misael-garcia-832776-1707820.jpg';
import BACKEND_BASE_URL from '../../api/api';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    
    if (!email || !password) {
      toast.error('Please enter email and password');
      return;
    }

    setLoading(true);
    try {
      const res = await axios.post(`${BACKEND_BASE_URL}/api/users/login`, {
        email,
        password,
      });
      
      if (res.data.token) {
        localStorage.setItem("token", res.data.token);
        toast.success(`Welcome back, ${res.data.user.name}!`);
        setTimeout(() => navigate('/'), 1500);
      }
    } catch (err) {
      const errorMsg = err.response?.data?.message || err.message || 'Login failed';
      toast.error(errorMsg);
      console.error('Login error:', err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className='w-screen h-screen flex justify-between bg-gray-100 items-center rounded-2xl'>
      <div className='w-1/2 relative'>
        <div className='w-full h-full flex flex-col bg-gray-900 absolute justify-center items-center opacity-80'>
          <h1 className='text-4xl font-bold text-white'>Welcome back to Fastrail</h1>
          <p className='text-xl text-white w-1/2 text-center pt-5'>Fresh groceries and organic produce, delivered to your doorstep.</p>
        </div>
        <img src={city} className='w-full object-cover' alt="img" />
      </div>
      <form onSubmit={handleLogin} className='flex px-60 flex-col gap-3 items-center w-1/2 h-full justify-center border p-2'>
        <h1 className='font-bold text-2xl'>Sign in to your account</h1>
        <p className='text-sm'>Don't have an account? <a className='underline font-medium' href='/register'>Create one</a></p>
        
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
            placeholder="Enter your password"
            disabled={loading}
            required
          />
        </div>

        <button 
          className='w-full mt-2 bg-black text-white h-12 rounded-2xl cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed' 
          type="submit"
          disabled={loading}
        >
          {loading ? 'Signing in...' : 'Login'}
        </button>
        
        <div className='w-full flex flex-col justify-between'>
          <a href="/forget" className='text-blue-900 hover:underline text-center'>Forgot password?</a>
        </div>
      </form>
    </div>
  );
};

export default Login;
