import React,{ useState, useEffect } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router";
import Loder from "../../Layouts/Loder/Loder";
import { GrLanguage } from "react-icons/gr";
import { HiShoppingCart } from "react-icons/hi2";
import { FaHeart } from "react-icons/fa";
import { useSelector } from "react-redux";
import toast from "react-hot-toast";

const ViewBookDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [Data, setData] = useState();
  const [isFavourite, setIsFavourite] = useState(false);
  const isLoggedIn = useSelector((state) => state.auth.isLoggrdIn);
  const role = useSelector((state) => state.auth.role);

  const headers = {
    id: localStorage.getItem("id"),
    authorization: `Bearer ${localStorage.getItem("token")}`,
    bookid: id,
  };
  useEffect(() => {
    const fetchData = async () => {
      try {
        const bookResponse = await axios.get(
          `http://localhost:1000/api/v1/get-book-by-id/${id}`
        );
        setData(bookResponse.data.data);

        const favResponse = await axios.get(
          "http://localhost:1000/api/v1/get-favorite-book",
          {
            headers          }
        );
        const favBooks = favResponse.data.data;
        const isFav = favBooks.some((book) => book._id === id);
        setIsFavourite(isFav);
      } catch (error) {
        console.error("Failed to fetch data", error);
      }
    };
    fetchData();
  }, [id]);
  const handleFavourites = async () => {
    try {
      if (isFavourite) {
        const res = await axios.put(
          "http://localhost:1000/api/v1/remove-book-to-favourite",
          {},
          { headers }
        );
        toast.success(res.data.message);
        setIsFavourite(false);
      } else {
        const res = await axios.put(
          "http://localhost:1000/api/v1/add-book-to-favourite",
          {},
          { headers }
        );
        toast.success(res.data.message);
        setIsFavourite(true);
      }
    } catch (error) {
      toast.error("Failed to update favourites");
    }
  };

  const handleCart = async () => {
    try {
      const response = await axios.put(
        "http://localhost:1000/api/v1/add-to-cart",
        {},
        { headers }
      );
      toast.success(response.data.message);
      navigate("/cart");
    } catch (error) {
      toast.error("Failed to add to cart");
    }
  };

  return (
    <>
      {Data ? (
        <div className="md:px-10 px-4 py-8 bg-zinc-900 flex md:flex-row flex-col h-auto">
          <div className="lg:w-2/5 md:w-full w-2/3 m-auto">
            <div className="justify-around flex bg-zinc-800 rounded px-9 md:py-16 py-8">
              <img
                src={Data.url}
                alt="Book"
                className="lg:h-[66vh] md:h-[35vh] h-[32vh] rounded"
              />
              {isLoggedIn === true && role === "user" && (
                <div className="flex flex-col items-center w-10 ml-3">
                  <button
                    className="p-2 bg-white rounded-full md:text-xl text-base lg:text-3xl lg:hover:text-4xl md:hover:text-3xl hover:text-xl transition-all duration-500 text-center"
                    onClick={handleFavourites}
                  >
                    <FaHeart
                      className={isFavourite ? "text-red-500" : "text-black"}
                    />
                  </button>
                </div>
              )}
            </div>
          </div>

          <div className="px-4 gap-8 lg:w-3/6 w-full">
            <h1 className="lg:text-3xl md:text-2xl text-xl text-white mt-3">
              {Data.title}
            </h1>
            <p className="text-zinc-400 mt-3 text-xs lg:text-lg md:text-sm">
              <span className="text-white text-sm lg:text-lg md:text-base">By :</span>{" "}
              {Data.author}
            </p>
            <p className="text-zinc-500 mt-3 lg:text-lg md:text-xs text-xs text-justify">
              <span className="text-white text-sm lg:text-lg md:text-base">
                Description:
              </span>{" "}
              {Data.desc.slice(0, 400)}...
            </p>
            <p className="text-zinc-400 mt-4 flex items-center justify-start text-sm lg:text-xl md:text-lg">
              <GrLanguage className="me-3 text-white text-sm lg:text-xl md:text-lg" />
              {Data.language}
            </p>
            <p className="text-zinc-100 mt-4 tetx-3xl font-semibold text-sm md:text-lg lg:text-xl">
              Price: ₹{Data.price}
            </p>

            {isLoggedIn === true && role === "user" && (
              <div className="mt-6 flex gap-4">
                <button
                  className="lg:text-lg md:text-sm text-base font-semibold rounded-md bg-[#ff4452] py-2 md:px-8 w-full lg:w-2/6 flex items-center justify-center hover:bg-[#ff6674] hover:scale-95 hover:shadow-sm hover:shadow-slate-300 text-white transition-all duration-300"
                  onClick={handleCart}
                >
                  Add to cart <HiShoppingCart className="ml-3 text-2xl" />
                </button>
              </div>
            )}
          </div>
        </div>
      ) : (
        <div className="h-screen bg-zinc-900 flex items-center justify-center">
          <Loder />
        </div>
      )}
    </>
  );
};

export default ViewBookDetails;
