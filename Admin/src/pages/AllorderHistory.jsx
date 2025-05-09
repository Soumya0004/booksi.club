import axios from "axios";
import React, { useEffect, useState } from "react";
import Loder from "../Layouts/Loder/Loder";
import { FaUser } from "react-icons/fa6";
import { Link } from "react-router-dom";
import { FaCheck } from "react-icons/fa";
import toast from "react-hot-toast";
import { IoOpenOutline } from "react-icons/io5";
import Userdata from "./userdata";

const AllorderHistory = () => {
  const [Allorders, setAllorders] = useState([]);
  const [Options, setOptions] = useState(-1);
  const [Values, setValues] = useState({ status: "" });
  const [userDiv, setuserDiv] = useState("hidden");
  const [userDivData, setuserDivData] = useState();

  const headers = {
    id: localStorage.getItem("id"),
    authorization: `Bearer ${localStorage.getItem("token")}`,
  };

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const res = await axios.get(
          "http://localhost:1000/api/v1/get-all-orders",
          { headers }
        );
        setAllorders(res.data.data);
      } catch (error) {
        console.error("Error fetching orders:", error);
      }
    };
    fetchOrders();
  }, []);

  const change = (e) => {
    setValues({ status: e.target.value });
  };

  const submitChanges = async (i) => {
    const id = Allorders[i]?._id;
    if (!id) {
      toast.error("Invalid order ID");
      return;
    }

    try {
      const res = await axios.put(
        `http://localhost:1000/api/v1/update-status/${id}`,
        Values,
        { headers }
      );
      toast.success(res.data.message);
      setAllorders((prevOrders) =>
        prevOrders.map((order, index) =>
          index === i ? { ...order, status: Values.status } : order
        )
      );
      setOptions(-1);
    } catch (error) {
      console.error("Error updating status:", error);
      toast.error("Failed to update order status");
    }
  };

  return (
    <>
      {!Allorders.length ? (
        <div className="h-[100%] flex items-center justify-center">
          <Loder />
        </div>
      ) : (
        <div className="p-4 text-zinc-100">
          <h1 className="text-3xl font-semibold mb-6">📜 All Order History</h1>

          <div className="mt-4 bg-zinc-800 w-full rounded py-2 px-4 flex gap-2">
            <div className=" w-[1rem]">
              <h1 className="text-center">SL.</h1>
            </div>
            <div className="w-[10rem] md:w-[13rem] lg:w-[16rem]">
              <h1 className="">Book</h1>
            </div>
            <div className="w-[12rem] hidden md:block lg:w-[19.5rem]">
              <h1 className="">Description</h1>
            </div>

            <div className="w-[4rem] md:w-[7rem] lg:w-[14rem]">
              <h1 className="">Price</h1>
            </div>
            <div className="w-[6rem] md:w-[7rem] lg:w-[15rem]">
              <h1 className="">Status</h1>
            </div>
            <div className="w-[1rem]  hidden md:block ">
              <h1 className="">
                <FaUser />
              </h1>
            </div>
          </div>

          {Allorders.map((order, i) => (
            <div
              key={order?._id || i}
              className="bg-zinc-800 w-full rounded py-2 px-4 flex gap-4 hover:bg-zinc-900 transition-all duration-300"
            >
              <div className="w-[3%] md:w-[.3rem] lg:w-[1rem]">{i + 1}</div>

              {/* Display multiple books per order */}
              <div className="w-[12rem] md:w-[13rem] lg:w-[15rem]">
                {order.books && order.books.length > 0 ? (
                  <ul>
                    {order.books.map((book) => (
                      <li key={book._id}>
                        <Link
                          to={`/view-book-details/${book._id}`}
                          className="hover:text-blue-300 text-[.8rem] md:text-xs lg:text-base"
                        >
                          {book.title}
                        </Link>
                      </li>
                    ))}
                  </ul>
                ) : (
                  <span className="text-red-400">Books Not Available</span>
                )}
              </div>

              <div className="hidden md:block w-[12rem] text-[.8rem] md:text-xs lg:text-base lg:w-[19rem]">
                {order.books && order.books.length > 0
                  ? `${order.books[0].desc.slice(0, 50)}...`
                  : "No description"}
              </div>

              <div className="w-[4rem] md:w-[6rem] text-[.8rem] md:text-xs lg:text-base lg:w-[13rem]">
                ₹
                {order.books && order.books.length > 0
                  ? order.books.reduce((acc, book) => acc + (book.price || 0), 0)
                  : "N/A"}
              </div>

              {/*  Status update dropdown */}
              <div className="w-[6rem] md:w-[7rem] text-[.8rem] md:text-xs lg:text-base lg:w-[15rem]">
                <button
                  className="hover:scale-105 transition-all duration-300"
                  onClick={() => setOptions(i)}
                >
                  {order.status === "Order placed" ? (
                    <span className="text-green-500">{order.status}</span>
                  ) : order.status === "Canceled" ? (
                    <span className="text-red-500">{order.status}</span>
                  ) : (
                    order.status
                  )}
                </button>

                {Options === i && (
                  <div className="mt-3">
                    <select
                      className="bg-gray-800"
                      onChange={change}
                      value={Values.status}
                    >
                      {[
                        "Order placed",
                        "Out for delivery",
                        "Delivered",
                        "Canceled",
                      ].map((status, index) => (
                        <option key={index} value={status}>
                          {status}
                        </option>
                      ))}
                    </select>
                    <button
                      className="text-green-500 hover:text-purple-600 mx-2 "
                      onClick={() => submitChanges(i)}
                    >
                      <FaCheck />
                    </button>
                  </div>
                )}
              </div>

              <div className="w-[1rem] ">
                <button
                  className="text-[.8rem] md:text-xs lg:text-base hover:text-orange-500"
                  onClick={() => {
                    setuserDiv("fixed");
                    setuserDivData(order.user);
                  }}
                >
                  <IoOpenOutline />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {userDivData && (
        <Userdata
          userDivData={userDivData}
          userDiv={userDiv}
          setuserDiv={setuserDiv}
        />
      )}
    </>
  );
};

export default AllorderHistory;
