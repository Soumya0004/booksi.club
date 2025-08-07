import axios from "axios";
import React, { useState } from "react";
import toast from "react-hot-toast";
import { Link } from "react-router-dom";
const BACKEND_API = import.meta.env.VITE_BACKEND_API;

const BookCart = ({ data, favourite }) => {
  const [loading, setLoading] = useState(false);

  const headers = {
    id: localStorage.getItem("id"),
    authorization: `Bearer ${localStorage.getItem("token")}`,
    bookid: data._id,
  };

  const handleRemoveBack = async () => {
    setLoading(true);
    try {
      const response = await axios.put(
        `${BACKEND_API}/api/v1/remove-book-to-favourite`,
        {},
        { headers }
      );
      toast.success(response.data.message);
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to remove book");
    }
    setLoading(false);
  };

  return (
    <div className="bg-zinc-800 rounded-xl py-2 px-5 md:px-3 flex flex-col h-[43vh] md:h-[40vh] lg:h-[48vh] hover:scale-105 transition-all duration-500">
      <Link to={`/view-book-details/${data._id}`}>
        <div>
          <div className="hover:shadow-lg hover:shadow-[#ffffff0d] duration-300 bg-zinc-900 rounded-xl flex items-center justify-center">
            <img
              src={data.url}
              alt="book"
              className="lg:h-[30vh] md:h-[23vh] h-[11rem]"
            />
          </div>
          <div className="overflow-hidden">
            <h2 className="mt-2 font-semibold lg:text-xs md:text-xs text-xs text-white w-[12rem]">
              {data.title}
            </h2>
            {!favourite && (
              <p className="mt-3 text-zinc-400 font-semibold lg:text-[.7rem] md:text-[.7rem] text-[.6rem]">
                {data.author}
              </p>
            )}
            <p className="mt-2 text-zinc-400 font-semibold lg:text-[1rem] md:text-[.7rem] text-[.6rem]">
              ₹{data.price}
            </p>
          </div>
        </div>
      </Link>

      {favourite && (
        <button
          className="bg-[#ff4455] rounded-md py-2 px-2 text-xs lg:text-sm mt-4 text-white font-semibold border border-[#ff4455] hover:bg-zinc-900 transition-all duration-300 shadow-xl disabled:opacity-50"
          onClick={handleRemoveBack}
          disabled={loading}
        >
          {loading ? "Removing..." : "Remove Favourite"}
        </button>
      )}
    </div>
  );
};

export default BookCart;
