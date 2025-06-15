import React from 'react'
import axios from 'axios';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import city from '../assets/pexels-misael-garcia-832776-1707820.jpg';
const Register = () => {
    const [email, setEmail] = useState('');
    const [name, setName] = useState('');
    const [password, setPassword] = useState('');
    const [c_pass, setCpass] = useState('');
    const navigate = useNavigate();

    const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post('http://localhost:5000/api/users/register', {
        name,
        email,
        password,
      });
      localStorage.setItem("token", res.data.token);
      window.alert("Login successful");
      navigate('/login');
    } catch (err){
      console.error(err.response?.data?.message || err.message);
      alert('Login failed');
    }
  };
  return (
    <div className='w-screen h-screen flex justify-center items-center rounded-2xl'>
        <img src={city} className='w-80 h-120.5 rounded-bl-2xl rounded-tl-2xl' alt="img" />
        <form onSubmit={handleLogin} className='flex flex-col gap-3 items-center w-100 h-120 border p-2'>
            <input 
                className='w-full border h-10 outline-0 rounded-[5px] indent-2'
                type="text" 
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Name"
                required
            />
        <input 
            className='w-full border h-10 outline-0 rounded-[5px] indent-2'
            type="email" 
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Email"
            required
        />
        <input 
            className='w-full border h-10 outline-0 rounded-[5px] indent-2'
            type="password" 
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Password"
            required
        />
        <input 
            className='w-full border h-10 outline-0 rounded-[5px] indent-2'
            type="password" 
            value={c_pass}
            onChange={(e) => setCpass(e.target.value)}
            placeholder="Confirm Password"
            required
        />
        <button className='w-full bg-black text-white h-10 cursor-pointer' type="submit">Login</button>
        <div className='w-full flex flex-col justify-between h-[40%]'>
            <a href="/forget" className='text-blue-900 hover:underline'>Forget password?</a>
            <div className=''>
            <p className='text-center text-[14px]'>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Repellendus tempore, voluptate ea?</p>
            <p className='text-center text-[12px]'>All rights are reserved by SGSS.</p>
            </div>
        </div>
        </form>
    </div>
  )
}

export default Register
