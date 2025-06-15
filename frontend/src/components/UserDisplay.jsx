import Axios from 'axios';
import React, { useEffect, useState } from 'react'

const CustomerDisplay = () => {

    const [userData,setUserData] = useState([]);
    useEffect(() =>{
        const userFetch = async() =>{
            try{
                    const response = (await Axios.get('http://localhost:5000/api/users',{
                        headers:{
                            Authorization:`Bearer ${localStorage.getItem("token")}`
                        }
                    }));
                    setUserData(response.data);
                }
                catch(err){
                    console.log("error is:",err);
                }
            }
            userFetch();
        },[])
  return (
    <div className='w-full mt-5'>
      <table className='w-full text-center'>
        <thead>
          <tr className='border-b border-gray-500'>
            <th className='px-4 py-4'>Customer ID</th>
            <th className='px-4 py-4'>Name</th>
            <th className='px-4 py-4'>Email</th>
            <th className='px-4 py-4'>Type</th>
            <th className='px-4 py-4'>Join Date</th>
          </tr>
        </thead>
        <tbody>
          {
            userData.map((user,index) => <tr key={index} className='border-b'>
              <td className="px-4 py-2 flex">{user.isAdmin ? <i class="fa-solid fa-user text-purple-600 pr-3 pt-1"></i> : <i class="fa-solid fa-user pr-3 pt-1"></i>}{user._id}</td>
              <td className="px-4 py-2">{user.name}</td>
              <td className="px-4 py-2">{user.email}</td>
              <td className="px-4 py-2">{user.isAdmin ? "Admin":"Customer"}</td>
              <td className="px-4 py-2">{new Date(user.createdAt).getDay()}/{new Date(user.createdAt).getMonth()}/{new Date(user.createdAt).getFullYear()}</td>
            </tr>)
          }
        </tbody>
      </table>
    </div>
  )
}

export default CustomerDisplay
