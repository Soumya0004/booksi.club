import { useState, useEffect } from "react";
import React from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router";
import Loder from "../../Layouts/Loder/Loder";
import { GrLanguage } from "react-icons/gr";
import { HiShoppingCart } from "react-icons/hi2";
import { FaHeart, FaEdit } from "react-icons/fa";
import { useSelector } from "react-redux";
import { RiDeleteBin5Fill } from "react-icons/ri";
import toast from "react-hot-toast";
import { Link } from "react-router";
const BACKEND_API = import.meta.env.VITE_BACKEND_API;

const ViewBookDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [Data, setData] = useState();
  const isLoggedIn = useSelector((state) => state.auth.isLoggrdIn);
  const role = useSelector((state) => state.auth.role);

  useEffect(() => {
    const fetch = async () => {
      const response = await axios.get(
        `${BACKEND_API}/api/v1/get-book-by-id/${id}`
      );

      setData(response.data.data);
    };
    fetch();
  }, []);
  const headers = {
    id: localStorage.getItem("id"),
    authorization: `Bearer ${localStorage.getItem("token")}`,
    bookid: id,
  };
  const handleFavourites = async () => {
    const response = await axios.put(
      `${BACKEND_API}/api/v1/add-book-to-favourite`,
      {},
      { headers }
    );
    toast.success(response.data.message);
  };
  const handleCart = async () => {
    const response = await axios.put(
      `${BACKEND_API}/api/v1/add-to-cart`,
      {},
      { headers }
    );
    toast.success(response.data.message);
  };
  const deletebook = async () => {
    const res = await axios.delete(`${BACKEND_API}/api/v1/delete-book`, {
      headers,
    });
    toast(res.data.message);
    navigate("/all-books");
  };

  return (
    <>
      {Data && (
        <div className="md:px-10 px- py-8 bg-zinc-900  flex  md:flex-row flex-col  h-auto   ">
          <div className="  lg:w-2/5 md:w-full w-2/3 m-auto    ">
            <div className=" justify-around flex bg-zinc-800 rounded  px-9  md:py-16 py-8">
              <img
                src={Data.url}
                alt=" Book Image"
                className="lg:h-[66vh] md:h-[35vh] h-[32vh] rounded"
              />
              {isLoggedIn === true && role === "user" && (
                <div className="flex flex-col items-center  w-10 ml-3 ">
                  <button
                    className="p-2 bg-white rounded-full md:text-xl text-base lg:text-3xl lg:hover:text-4xl md:hover:text-3xl hover:text-xl hover:text-red-500  text-black  transition-all duration-500 text-center   "
                    onClick={handleFavourites}
                  >
                    <FaHeart />
                  </button>
                </div>
              )}
            </div>
          </div>

          <div className="px-4 gap-8  lg:w-3/6  w-full ">
            <h1 className="lg:text-3xl md:text-2xl text-xl text-white mt-3  ">
              {Data.title}
            </h1>
            <p className=" text-zinc-400 mt-3 text-xs lg:text-lg md:text-sm">
              {" "}
              <span className="text-white text-sm lg:text-lg md:text-base">
                By :
              </span>{" "}
              {Data.author}
            </p>
            <p className=" text-zinc-500 mt-3 lg:text-lg md:text-xs text-xs text-justify ">
              <span className="text-white text-sm lg:text-lg md:text-base ">
                Descreption:
              </span>{" "}
              {Data.desc.slice(0, 400)}...
            </p>
            <p className=" text-zinc-400 mt-4 flex items-center justify-start text-sm lg:text-xl md:text-lg">
              <GrLanguage className=" me-3 text-white text-sm lg:text-xl md:text-lg " />
              {Data.language}
            </p>
            <p className=" text-zinc-100 mt-4 tetx-3xl font-semibold text-sm md:text-lg lg:text-xl ">
              Price: ₹{Data.price}
              
              {""}
            </p>

            {isLoggedIn === true && role === "user" && (
              <div className=" mt-6 flex gap-4    ">
                <button
                  className="    lg:text-lg md:text-sm text-base font-semibold   rounded-md bg-[#ff4452]  lg:mt-0     py-2 md:px-8  w-full lg:w-2/6   flex items-center justify-center  hover:bg-[#ff6674] hover:scale-95 hover:shadow-sm hover:shadow-slate-300     text-white transition-all duration-300 "
                  onClick={handleCart}
                >
                  Add to cart <HiShoppingCart className="ml-3 text-2xl" />{" "}
                </button>
              </div>
            )}
          </div>
        </div>
      )}
      {!Data && (
        <div className="h-screen bg-zinc-900 flex items-center justify-center">
          <Loder />
          {""}
        </div>
      )}
    </>
  );
};

export default ViewBookDetails;
