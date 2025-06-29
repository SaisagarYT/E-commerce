import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const Shop = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await axios.get("http://localhost:5000/api/products");
        setData(res.data);
      } catch (err) {
        console.log(err.message)
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, []);

  const ratingDetails = (x) =>
    Array.from({ length: Math.floor(Number(x)) });

  if (loading) return <p>Loading...</p>;

  return (
    <div className="p-10 w-screen">
      <h1 className="text-2xl font-bold mb-4">SHOP</h1>
      <div className="w-full flex flex-wrap justify-between gap-5">
        {data.map((item, index) => (
          <Link key={index} to={`/product/detail/${item._id}`}>
            <div
              className="w-[200px] h-[280px] rounded-2xl overflow-hidden border border-gray-400 shadow-2xl transform transition-transform duration-300 hover:rotate-temp"
            >
              <img
                className="w-full h-[60%] object-cover"
                src={item.image}
                alt={item.name}
              />
              <div className="w-full p-2">
                <p className="font-medium text-[16px]">{item.name}</p>
                <div className="flex gap-2 items-center">
                  {ratingDetails(item.rating).map((_, i) => (
                    <i
                      key={i}
                      className="fa-solid fa-star text-[12px] text-yellow-500"
                    ></i>
                  ))}
                  <p className="text-gray-500 text-[12px]">{item.rating}/5</p>
                </div>
                <div className="flex w-full justify-between items-center pl-1 pr-4">
                  <p className="text-gray-500 text-[12px]">
                    {item.numReviews} reviews
                  </p>
                  <p className="font-bold">
                    {item.price}
                    <i className="fa-solid fa-indian-rupee-sign text-[12px]"></i>
                  </p>
                </div>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Shop;
