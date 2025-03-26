import React from "react";
import { FaInstagram, FaLinkedin } from "react-icons/fa";
import { FaFacebook } from "react-icons/fa6";

import { Link } from "react-router";
import Logo from "./img/Logo.png";
import FooterBg from "./img/footer-Bg.png";
const Footer = () => {
  return (
    <>
      <footer className="relative  text-white font-Montserrat">
        <img
          src={FooterBg}
          alt=""
          className="w-full  absolute top-0 left-0 h-full object-cover"
        />

        <div className="  w-full  grid grid-cols-2 md:grid-cols-3 gap-10 py-8 md:px-16 px-8 text-[18px] font-[400] relative  z-10 ">
          <div>
            <img
              src={Logo}
              alt=""
              className=" md:w-[12rem] md:h-[3rem] w-[7rem]  h-[2rem]  object-cover mt-3 "
            />
            <p className="mt-3 md:text-base text-xs  font-serif">
              Ever wanted to buy a book but could not because it was too
              expensive? worry not! because Bookchor is here! Bookchor, these
              days in news,is being called as the Robinhood of the world of
              books.
            </p>
          </div>
          <div>
            <h3 className="text-[20px] font-[600] mt-16">SUPPORT</h3>
            <p className="md:text-base text-xs mt-2">Call: 917888XXXX</p>
            <p className="text-base">Email:booksi@.com</p>
          </div>
          <div>
            <div className="  mt-6 text-[24px] ">
              <h3 className=" text-[18px] md:text-[20px] font-[600] mt-16 items-center justify-center flex">
                Get touch with us
              </h3>

              <ul className="flex md:text-3xl text-2xl gap-3 mt-4 text-[#ff4452]  items-center justify-center ">
                <Link
                  to={"https://www.facebook.com/"}
                  className="hover:scale-110  transition-all duration-300"
                >
                  <li>
                    <FaFacebook />{" "}
                  </li>
                </Link>
                <Link
                  to={"https://www.instagram.com/?next=%2F&hl=en"}
                  className="hover:scale-110 transition-all duration-300 "
                >
                  <li>
                    <FaInstagram />
                  </li>
                </Link>
                <Link
                  to={
                    "https://www.linkedin.com/feed/?trk=guest_homepage-basic_google-one-tap-submit"
                  }
                  className="hover:scale-110 transition-all duration-300"
                >
                  <li>
                    <FaLinkedin />
                  </li>
                </Link>
              </ul>
            </div>
          </div>
        </div>

        <p className="text-xs md:text-xl font-[400] mx-auto text-center relative  z-10">
          &copy; 2024 Team'7 Design. All rights reserved.{" "}
        </p>
      </footer>
    </>
  );
};

export default Footer;

