import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import city from '../assets/pexels-misael-garcia-832776-1707820.jpg';
import BACKEND_BASE_URL from '../../api/api';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(`${BACKEND_BASE_URL}/api/users/login`, {
        email,
        password,
      });
      localStorage.setItem("token", res.data.token);
      navigate('/');
    } catch (err){
      console.error(err.response?.data?.message || err.message);
    }
  };

  return (
    <div className='w-screen h-screen flex justify-between bg-gray-100  items-center rounded-2xl'>
      <div className='w-1/2 relative'>
        <div className='w-full h-full flex flex-col bg-gray-900 absolute justify-center items-center opacity-80'>
          <h1 className='text-4xl font-bold text-white'>Welcome back to Fastrail</h1>
          <p className='text-xl text-white w-1/2 text-center pt-5'>Fresh groceries and organic produce, delivered to your doorstep.</p>
        </div>
        <img src={city} className='w-full object-cover ' alt="img" />
      </div>
        <form onSubmit={handleLogin} className='flex px-60 flex-col gap-3 items-center w-1/2 h-full justify-center border p-2'>
          <h1 className='font-bold text-2xl'>Sign in to your account</h1>
          <p className='text-sm'>Don't have an account? <a className='underline font-medium' href='/register'>Create one</a></p>
          <div className='w-full flex flex-col gap-2'>
            <h1 className='text-sm font-medium'>Email Address</h1>
            <input 
                className='w-full bg-white text-sm border font-normal h-10 outline-0 rounded-[5px] indent-2'
                type="email" 
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Email"
                required
            />
          </div>
          <div className='w-full flex flex-col gap-2'>
            <h1 className='text-sm font-medium'>Password</h1>
            <input 
                className='w-full border h-10 bg-white outline-0 text-sm rounded-[5px] indent-2'
                type="password" 
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Password"
                required
            />
          </div>
          <button className='w-full mt-2 bg-black text-white h-12 rounded-2xl cursor-pointer' type="submit">Login</button>
          <div className='w-full flex flex-col justify-between '>
            <a href="/forget" className='text-blue-900 hover:underline text-center'>Forget password?</a>
          </div>
        </form>
    </div>
  );
};

export default Login;
