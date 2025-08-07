import React, { useState, useEffect } from "react";
import Loder from "../Layouts/Loder/Loder";
import axios from "axios";
import { RiDeleteBin5Line } from "react-icons/ri";
import { useNavigate, useLocation } from "react-router";
import toast from "react-hot-toast";
import { loadStripe } from "@stripe/stripe-js";

const stripePromise = loadStripe("pk_test_51R4FG6Gv2pMJ1VmOUefNrSvlaPuXAoYnRiNYFwWSyjU61XDlBQQBlQc6IoWiMrfpy3bonBr11SLQfe7aF57Yfntm00vkYoz3X6"); // Stripe public key
const BACKEND_API = import.meta.env.VITE_BACKEND_API;

const Cart = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [Cart, setCarts] = useState([]);
  const [Total, setTotal] = useState(0);
  const [loading, setLoading] = useState(true);

  const headers = {
    id: localStorage.getItem("id"),
    authorization: `Bearer ${localStorage.getItem("token")}`,
  };

  useEffect(() => {
    const fetchCart = async () => {
      try {
        setLoading(true);
        const response = await axios.get(`${BACKEND_API}/api/v1/get-user-cart`, { headers });
        setCarts(response.data.data || []);
      } catch (error) {
        toast.error("Failed to load cart items");
      } finally {
        setLoading(false);
      }
    };
    fetchCart();
  }, []);

  useEffect(() => {
    if (location.search.includes("success=true")) {
      toast.success("Payment successful! Order added to history.");
    }
    if (location.search.includes("canceled=true")) {
      toast.error("Payment canceled. Try again!");
    }
  }, [location.search]);

  const deleteItem = async (bookId) => {
  try {
    const response = await axios.put(`${BACKEND_API}/api/v1/remove-to-cart/${bookId}`, {}, { headers });

    if (response.data.status === "Success" && response.data.data) {
      setCarts(response.data.data); 
      toast.success("Item removed from cart");
    } else {
      toast.error("Failed to update cart");
    }
  } catch (error) {
    toast.error("Failed to remove item");
  }
};


  useEffect(() => {
    const total = Cart.reduce((sum, item) => sum + (item.price || 0), 0);
    setTotal(total);
  }, [Cart]);

  const PlaceOrder = async () => {
    try {
      const stripe = await stripePromise;
      const userId = localStorage.getItem("id");
      if (!userId) {
        toast.error("User not found. Please log in again.");
        return;
      }
      const res = await axios.post(`${BACKEND_API}/api/v1/create-checkout-session`, { order: Cart, userId }, { headers });
      const result = await stripe.redirectToCheckout({ sessionId: res.data.sessionId });
      if (result.error) {
        toast.error(result.error.message);
      } else {
        navigate("/profile/orderHistory?success=true");
      }
    } catch (error) {
      toast.error("Payment failed, try again.");
    }
  };

  return (
    <div className="bg-zinc-900 px-12 h-auto py-8">
      {loading ? (
        <div className="h-screen w-full flex items-center justify-center bg-zinc-900">
          <Loder />
        </div>
      ) : Cart.length === 0 ? (
        <div className="h-screen flex items-center justify-center flex-col bg-zinc-900">
          <h1 className="text-5xl font-semibold text-zinc-700">Empty Cart</h1>
        </div>
      ) : (
        <>
          <h1 className="text-4xl font-semibold text-zinc-700 p-3">Your Cart</h1>
          {Cart.map((item, i) => (
            <div key={i} className="w-full my-4 rounded flex flex-col md:flex-row p-5 bg-zinc-800 justify-between items-center">
              <img src={item.url} alt="/" className="h-[20vh] md:h-[10vh] object-cover" />
              <div className="w-full md:w-auto pl-3 lg:text-xl md:text-sm text-base">
                <h1 className="font-semibold text-zinc-100 text-start mt-2">{item.title}</h1>
                <p className="text-zinc-300 mt-2 hidden lg:block">{item.desc?.slice(0, 80)}...</p>
              </div>
              <div className="flex mt-4 w-full md:w-auto items-center justify-center">
                <h2 className="text-zinc-100 text-xl">₹ {item.price}</h2>
                <button className="bg-red-100 text-red-700 border-red-700 rounded-full p-2 ms-12" onClick={() => deleteItem(item._id)}>
                  <RiDeleteBin5Line />
                </button>
              </div>
            </div>
          ))}
          <div className="mt-4 w-full flex items-center justify-end">
            <div className="p-4 bg-zinc-800 rounded">
              <h1 className="text-2xl text-zinc-200 font-semibold">Total Amount</h1>
              <div className="mt-3 flex items-center justify-between text-xl text-zinc-200">
                <h2>{Cart.length} Books - ₹{Total}</h2>
              </div>
              <div className="w-full mt-3">
                <button onClick={PlaceOrder} className="bg-zinc-100 rounded-full px-4 py-2 flex justify-center w-full font-semibold hover:bg-zinc-900 hover:text-white transition-all duration-300">
                  Proceed to Payment
                </button>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default Cart;
