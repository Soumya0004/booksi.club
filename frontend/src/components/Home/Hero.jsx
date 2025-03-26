import React from "react";
import { Link } from "react-router";
import HeroImg from "./img/hero.png";

const Hero = () => {
  return (
    <>
      <div className="h-auto md:h-[76vh] flex flex-col md:flex-row  items-center mt-10 md:mt-0  lg:ml-20">
        <div className="md:w-3/6 mb-10 md:m-0 w-full justify-center flex flex-col items-center lg:items-start  ">
          <h1 className="lg:text-6xl text-2xl font-semibold text-white ">
            Discover your next Great Ready
          </h1>
          <p className="mt-4 md:text-md text-sm  text-center  lg:text-2xl text-white  md:text-left">
            Uncover captivation stories, enriching knowledge ,and endless
            inspriation in our curated collection of books
          </p>

          <div className="mt-7 hover:scale-95 transition-all duration-300">
            <Link
              to="/all-books"
              className="text-white lg:text-2xl   border border-[#ff4455]  rounded-md lg:px-4 lg:py-2 px-6 py-2 bg-[#ff2233] hover:bg-zinc-900 transition-all duration-300 md:mr-[9rem] font-semibold hover:shadow-slate-100 hover:shadow-sm " 
            >
              Discover Books
            </Link>
          </div>
        </div>
        <div className="md:w-3/6 w-full flex  justify-center  md:ml-0 ">
          <img
            src={HeroImg}
            alt="heroImg"
            className="object-cover h-[18rem] lg:h-3/6  flex items-center justify-center  "
          />

          {/* <HeroBook /> */}
        </div>
      </div>
    </>
  );
};

export default Hero;

// <div className='lg:w-3/6 w-full '>
//     <img   src={HeroImg} alt="heroImg"  className='rounded-full object-cover h-auto lg:[100%] flex items-center justify-center '/>

{
  /* <HeroBook /> */
}
{
  /* </div> */
}

// h-auto md:h-[50vh]  md:flex-row   mt-4 md:mt-0  flex items-center  w-full
