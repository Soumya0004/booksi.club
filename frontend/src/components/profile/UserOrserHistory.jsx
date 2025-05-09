import axios from "axios";
import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import Loder from "../../Layouts/Loder/Loder";

const UserOrderHistory = () => {
  const [orderHistory, setOrderHistory] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const location = useLocation();

  // ✅ Get success message from URL
  const successMessage = new URLSearchParams(location.search).get("success");

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const headers = {
          id: localStorage.getItem("id"),
          authorization: `Bearer ${localStorage.getItem("token")}`,
        };

        // ✅ Fetch orders with populated book data
        const res = await axios.get(
          "http://localhost:1000/api/v1/get-order-history",
          { headers }
        );

        setOrderHistory(res.data.data);
      } catch (err) {
        console.error("Error fetching order history:", err);
        setError("Failed to load order history. Please try again.");
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, []);

  if (loading) {
    return (
      <div className="h-full flex items-center justify-center bg-zinc-900">
        <Loder />
      </div>
    );
  }

  if (error) {
    return (
      <div className="h-full flex items-center justify-center text-red-500">
        {error}
      </div>
    );
  }

  return (
    <div className="p-4 text-zinc-100">
      <h1 className="text-3xl font-semibold mb-6">📜 Your Order History</h1>

      {/* ✅ Show success message if payment was successful */}
      {successMessage === "true" && (
        <div className="bg-green-600 text-white py-2 px-4 mb-4 rounded-lg">
          ✅ Your payment was successful! Order has been placed.
        </div>
      )}

      {orderHistory.length === 0 ? (
        <p className="text-zinc-500 text-lg">No orders found.</p>
      ) : (
        <>
          {/* Table Header */}
          <div className="mt-4 bg-zinc-800 w-full rounded py-2 px-4 flex gap-2">
            <div className=" w-[1rem]">
              <h1 className="text-center">Sl.</h1>
            </div>
            <div className="w-[13rem] md:w-[13rem] lg:w-[15rem]">
              <h1 className="">Book</h1>
            </div>
            <div className="w-[14rem] hidden md:block lg:w-[19.5rem]">
              <h1 className="">Description</h1>
            </div>
            <div className="w-[5rem] md:w-[7rem] lg:w-[14rem]">
              <h1 className="">Price</h1>
            </div>
            <div className="w-[6rem] md:w-[6rem] lg:w-[13.5rem]">
              <h1 className="">Status</h1>
            </div>
            <div className="lg:w-[1rem]  hidden md:block ">
              <h1 className="">Model</h1>
            </div>
          </div>

          {/* Orders List */}
          {orderHistory.map((order, i) => (
            <div
              key={order._id}
              className="bg-zinc-800 w-full rounded py-2 px-4 flex gap-4 hover:bg-zinc-900 transition-all duration-300"
            >
              <div className=" w-[3%] md:w-[.3rem] lg:w-[1rem]">{i + 1}</div>

              {/*  Display multiple books per order */}
              <div className="w-[12rem] md:w-[13rem] lg:w-[15rem]">
                {order.books && order.books.length > 0 ? (
                  <ul>
                    {order.books.map((book) => (
                      <li key={book._id}>
                        <Link
                          to={`/view-book-details/${book._id}`}
                          className="hover:text-blue-300 text-[.8rem] md:text-xs lg:text-base "
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
                {order.books && order.books.length > 0
                  ? `₹${order.books.reduce((acc, book) => acc + (book.price || 0), 0)}`
                  : "N/A"}
              </div>

              <div className="w-[6rem] md:w-[7rem] text-[.8rem] md:text-xs lg:text-base lg:w-[15rem]">
                {order.status === "Order placed" ? (
                  <span className="text-green-500">{order.status}</span>
                ) : order.status === "Canceled" ? (
                  <span className="text-red-500">{order.status}</span>
                ) : (
                  order.status
                )}
              </div>

              <div className="md:w-[5%] w-none hidden md:block">
              <h1 className="text-sm text-zinc-400">COD</h1>
              </div>
            </div>
          ))}
        </>
      )}
    </div>
  );
};

export default UserOrderHistory;
