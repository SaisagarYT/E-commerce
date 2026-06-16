import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import BACKEND_BASE_URL from "../../api/api";

const Shop = () => {
const [data, setData] = useState([]);
const [loading, setLoading] = useState(true);
const [search, setSearch] = useState("");

useEffect(() => {
const fetchProducts = async () => {
try {
const res = await axios.get(
`${BACKEND_BASE_URL}/api/products`
);

    setData(res.data);
  } catch (err) {
    console.log(err.message);
  } finally {
    setLoading(false);
  }
};

fetchProducts();

}, []);

const ratingDetails = (x) =>
Array.from({ length: Math.floor(Number(x)) });

const filteredProducts = data.filter((item) =>
item.name.toLowerCase().includes(search.toLowerCase())
);

if (loading) {
return ( <div className="w-screen h-screen flex justify-center items-center"> <h1 className="text-3xl font-bold text-[#0A2138]">
Loading Products... </h1> </div>
);
}

return ( <div className="w-screen min-h-screen bg-white px-10 py-8 max-md:px-4">
  {/* Header */}
  <div className="mb-10">

    <h1 className="text-5xl font-black text-[#0A2138]">
      SHOP
    </h1>

    <p className="text-gray-500 mt-2">
      Discover premium products curated for you.
    </p>

  </div>

  {/* Search + Filter */}
  <div className="flex justify-between items-center mb-10 max-md:flex-col gap-4">

    <div className="w-[400px] max-md:w-full h-12 border border-gray-200 rounded-full flex items-center px-4">

      <i className="fa-solid fa-magnifying-glass text-[#E56627]"></i>

      <input
        type="text"
        placeholder="Search products..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="ml-3 w-full outline-none"
      />

    </div>

    <div className="flex items-center gap-4">

      <p className="text-gray-500">
        {filteredProducts.length} Products
      </p>

      <button
        className="
        px-5
        py-2
        border
        border-[#0A2138]
        rounded-full
        text-[#0A2138]
        hover:bg-[#0A2138]
        hover:text-white
        transition-all
        "
      >
        Filters
      </button>

    </div>

  </div>

  {/* Products Grid */}
  <div className="grid grid-cols-5 gap-6 max-xl:grid-cols-4 max-lg:grid-cols-3 max-md:grid-cols-2 max-sm:grid-cols-1">

    {filteredProducts.map((item) => (

      <Link
        key={item._id}
        to={`/product/detail/${item._id}`}
      >

        <div
          className="
          bg-white
          border
          border-gray-200
          rounded-3xl
          overflow-hidden
          hover:border-[#E56627]
          transition-all
          duration-300
          group
          "
        >

          {/* Product Image */}
          <div className="relative overflow-hidden">

            <img
              className="
              w-full
              h-[280px]
              object-cover
              group-hover:scale-105
              transition-all
              duration-500
              "
              src={item.image}
              alt={item.name}
            />

            {/* Discount Badge */}
            <div
              className="
              absolute
              top-3
              left-3
              bg-[#41EA41]
              text-[#0A2138]
              text-xs
              font-bold
              px-3
              py-1
              rounded-full
              "
            >
              SALE
            </div>

            {/* Quick View */}
            <button
              className="
              absolute
              bottom-3
              left-1/2
              -translate-x-1/2
              opacity-0
              group-hover:opacity-100
              transition-all
              bg-[#E56627]
              text-white
              px-4
              py-2
              rounded-full
              text-sm
              "
            >
              Quick View
            </button>

          </div>

          {/* Details */}
          <div className="p-4">

            <h2
              className="
              font-bold
              text-[#0A2138]
              text-lg
              truncate
              "
            >
              {item.name}
            </h2>

            {/* Rating */}
            <div className="flex items-center gap-2 mt-2">

              <div className="flex text-[#E56627]">

                {ratingDetails(item.rating).map((_, i) => (
                  <i
                    key={i}
                    className="fa-solid fa-star text-[12px]"
                  ></i>
                ))}

              </div>

              <span className="text-sm text-gray-500">
                {item.rating}/5
              </span>

            </div>

            {/* Reviews */}
            <p className="text-gray-500 text-sm mt-1">
              {item.numReviews || 0} Reviews
            </p>

            {/* Price */}
            <div className="flex justify-between items-center mt-4">

              <h3 className="text-2xl font-black text-[#E56627]">
                ₹{item.price}
              </h3>

              <span
                className="
                bg-[#41EA41]/20
                text-[#0A2138]
                text-xs
                px-3
                py-1
                rounded-full
                font-semibold
                "
              >
                In Stock
              </span>

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
