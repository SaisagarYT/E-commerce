import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Navigate } from 'react-router-dom';

const Profile = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  const token = localStorage.getItem("token");

  useEffect(() => {
    if (!token) {
      setLoading(false);
      return;
    }
    const fetchData = async () => {
      try {
        const res = await axios.get(`http://localhost:5000/api/users/profile`, {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });
        setData(res.data);
      } catch (error) {
        console.error("Error fetching user", error);
        setData(null);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [token]);

  if (!token) {
    return <Navigate to="/login" />;
  }

  if (loading) {
    return <div>Loading profile...</div>;
  }

  if (!data) {
    return <div>Error loading profile.</div>;
  }

  return (
    <div className='w-screen h-screen'>
        <Link to="/">
            <div className='w-8 h-8 bg-white text-black absolute flex items-center justify-center text-2xl rounded-full right-5 cursor-pointer top-5'>
                <i class="fa-solid fa-xmark"></i>
            </div>
        </Link>
      <div className='w-full flex items-center justify-center overflow-hidden h-[50%] bg-black' style={{ objectFit: "cover" }}>
        <img
          src={data.profile}
          className='w-50 h-50 object-cover rounded-full'
          alt=""
        />
      </div>
      <div className='w-full h-[50%] flex flex-col items-center'>
        <h1 className='text-3xl font-bold'>{data.name}</h1>
        <p className='text-2xl font-medium'>{data.email}</p>
        {data.isAdmin && <p className='text-black flex items-center gap-1'><div className="w-3 h-3 rounded-full animate-bounce bg-green-500"></div>Admin User</p>}
        <div className='pl-8 pr-8 pt-3 pb-3 border rounded-[5px] bg-black text-white font-medium cursor-pointer' onClick={() => {localStorage.removeItem('token');window.location.href="/login"}}>
            <p>Logout</p>
        </div>
      </div>
    </div>
  );
};

export default Profile;
