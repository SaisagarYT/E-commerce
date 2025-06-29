import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { jwtDecode } from 'jwt-decode';
import { Navigate } from 'react-router-dom';

const Admin = ({ children }) => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  const token = localStorage.getItem("token");

  useEffect(() => {
    if (!token) {
      setLoading(false);
      return;
    }

    let decoded;
    try {
      decoded = jwtDecode(token);
    } catch (error) {
      console.error("Invalid token", error);
      setLoading(false);
      return;
    }

    const userId = decoded.id;

    const fetchData = async () => {
      try {
        const res = await axios.get(`http://localhost:5000/api/users/user/${userId}`, {
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

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!data || !data.isAdmin) {
    return <Navigate to="/" />;
  }

  return children;
};

export default Admin;
