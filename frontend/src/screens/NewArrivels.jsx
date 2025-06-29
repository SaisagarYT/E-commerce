import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const NewArrivels = () => {
  const [data, setData] = useState([]);
  useEffect(() => {
    try {
      const fetchProducts = async () => {
        const res = await axios.get("http://localhost:5000/api/products");
        setData(res.data);
      };
      fetchProducts();
    } catch (err) {
      console.log(err.message);
    }
    }, []);
    let ratingDetails = (x) =>{
    let rate = Number(x);
    let roundedRate = Math.floor(rate);
    let list = [];
    for(let i = 0;i < roundedRate;i++){
    list.push(i);
    }
    return list;
    }
  return (
    <div className="p-10 w-screen">
      <h1 className="text-2xl font-bold">NEW ARRIVELS</h1>
      <div className="w-full h-full flex flex-wrap justify-between gap-5">
        {data.map((item, index) =>
          item.productType == "new" ? (
            <Link key={index} to={`/product/detail/${item._id}`}>
              <div
                className="w-50 rounded-2xl h-70 box overflow-hidden border border-gray-400 shadow-2xl"
                onMouseLeave={(e) =>
                  e.currentTarget.classList.remove("rotate-temp")
                }
                onMouseEnter={(e) =>
                  e.currentTarget.classList.add("rotate-temp")
                }
              >
                <img
                  className="w-full h-[60%] object-cover"
                  src={item.image}
                  alt=""
                />
                <div className="w-full p-2">
                  <p className="font-medium text-[16px]">{item.name}</p>
                  <div className="flex gap-2 items-center">
                    {ratingDetails(item.rating).map((x, index) => (
                      <i
                        key={index}
                        className="fa-solid fa-star text-[12px] text-yellow-500"
                      ></i>
                    ))}
                    <p className="text-gray-500 text-[12px]">{item.rating}/5</p>
                  </div>
                  <div className="flex w-full justify-between items-center pl-1 pr-4">
                    <p className="text-gray-500 text-[12px]">
                      {item.numReviews}reviews
                    </p>
                    <p className="font-bold">
                      {item.price}
                      <i className="fa-solid fa-indian-rupee-sign text-[12px]"></i>
                    </p>
                  </div>
                </div>
              </div>
            </Link>
          ) : (
            ""
          )
        )}
      </div>
    </div>
  );
};

export default NewArrivels;
