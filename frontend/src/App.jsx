import React, { useEffect } from "react";
import Home from "./pages/Home";
import Navbar from "./Layouts/Navbar/Navbar";
import Footer from "./Layouts/Footer/Footer";
import { Routes, Route } from "react-router-dom";
import Allbooks from "./pages/Allbooks";
import Login from "./pages/Login";
import SignUp from "./pages/SignUp";
import Profile from "./pages/Profile";
import Cart from "./pages/Cart";
import ViewBookDetails from "./components/viewbookDetails/ViewBookDetails";
import { useDispatch, useSelector } from "react-redux";
import { authActions } from "./store/auth";
import UserOrserHistory from "./components/profile/UserOrserHistory";
import Setting from "./components/profile/Setting";
import Fev from "./components/profile/Fev";
import AboutUs from "./pages/AboutUs.jsx";

const App = () => {
  const dispatch = useDispatch();
  const role = useSelector((state) => state.auth.role);

  useEffect(() => {
    if (
      localStorage.getItem("id") &&
      localStorage.getItem("token") &&
      localStorage.getItem("role")
    ) {
      dispatch(authActions.login());
      dispatch(authActions.changeRole(localStorage.getItem("role")));
    }
  }, []);
  return (
    <>
      <Navbar />
      <Routes>
        <Route exact path="/" element={<Home />} />
        <Route path="/all-books" element={<Allbooks />} />
        <Route path="/about_Us" element={<AboutUs />} />
        <Route path="/logIn" element={<Login />} />

        <Route path="/signup" element={<SignUp />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/profile" element={<Profile />}>
          {role === "user" && <Route index element={<Fev />} />}

          <Route path="/profile/orderHistory" element={<UserOrserHistory />} />
          <Route path="/profile/settings" element={<Setting />} />
        </Route>
        <Route path="/view-book-details/:id" element={<ViewBookDetails />} />
      </Routes>

      <Footer />
    </>
  );
};

export default App;
